const mysql = require('mysql');
const configs = require('../config/base.config.js');
const ReadWriteLock = require('rwlock');

const RECOUNT_ARTICLE_GROUP_SQL = `
            update categories as ct
            left join
            (select category, count(*) as cnt from articles group by category) as cp
            on ct.id = cp.category
            set ct.articlecnt = if(isnull(cp.cnt), 0, cp.cnt)
`;

class Articles {
  constructor() {
    this.dbname = 'articles';
    this.dbconfig = configs.database_config;
    this.step = configs.query_config.step;
    this.lock = new ReadWriteLock();
  }

  add(datas, succ, fail) {
    if (datas.add) {
      var dt = {
        title: datas.title, 
        content: datas.content,
        descp: datas.descp,
        label: datas.label,
        addtime: datas.addtime,
        modtime: datas.addtime,
        category: 0 // 默认值
      }
      this.__add(dt, succ, fail);
    } else {
      var id = datas.id;
      var dt = {
        content: datas.content,
        title: datas.title,
        descp: datas.descp,
        label: datas.label,
        modtime: datas.modtime,
      }
      this.__modify(id, dt, succ, fail);
    }
  }

  delete(id, succ, fail) {
    var targetLabel = '';
    var conn = mysql.createConnection(this.dbconfig);
    var del = new Promise((resolve, reject) => {
      conn.beginTransaction((err) => {
        if (err) {reject(err)};
        resolve();
      })
    })
    del.then(() => {
      return new Promise((resolve, reject) => {
        conn.query(`select label from ${this.dbname} where id = ?`, [id],
          (err, results, fields) => {
            if (err) {reject(err)};
            targetLabel = results[0].label;
            resolve(results[0].label);
          }
        )
      })
    }).then(() => {
      return new Promise((resolve, reject) => {
        conn.query(`delete from ${this.dbname} where id = ?`, [id],
          (err, results, fields) => {
            if (err) {reject(err);};
            resolve();
          }
        )
      })
    }).then(() => {
      return new Promise((resolve, reject) => {
        conn.query(`update labels set articles = articles - 1 where name in ?`,
          [[targetLabel.split(',')]], (err, results, fields) => {
            if (err) {reject(err)};
            resolve();
          }
        )
      })
    }).then(() => {
      conn.commit((err) => {
        if (err) {throw err; return;}
        conn.end((err) => {});
        succ();
      })
    }).catch((err) => {
      conn.rollback((err) => {
        conn.end((err) =>{});
      })
      fail();
    })
  }

  getsingle({id = 0, client = false} = {}, succ, fail) {
    var queryfields = client ? ['*'] : ['id', 'title', 'category', 'label', 'state', 'top', 'pageview'];
    var conn = mysql.createConnection(this.dbconfig);
    var query = new Promise((resolve, reject) => {
      conn.query(`select ?? from ${this.dbname} where id = ?`, [queryfields, id], (err, results, fields) => {
        if (err) {reject()};
        resolve(results[0]);
      })
    });
    query.then(
      (res) => {
        succ(res);
      }
    ).catch((err) => {
      fail();
    }).finally(() => {
      conn.end((err) => {});
    });
  }

  getByCond({where = {}, start = 0, client = false} = {}, succ = function(){}, fail= function(){}) {
    var returnData = {
      total: 0,
      current: start,
      data: []
    };
    var conn = mysql.createConnection(this.dbconfig);
    var queryfields;
    if (!client) {
      queryfields = ['id', 'title', 'category', 'label', 'state', 'top', 'pageview'];
    } else {
      queryfields = ['*'];
    }
    var whereArgs = [];
    var whereSql = '';
    // 对模糊搜索的支持
    if ('args' in where) {
      var escapedVal = conn.escape(`%${where['args']}%`);
      whereSql += (` AND (title like ${escapedVal} or label like ${escapedVal})`);
      console.log('-------------' + whereSql);
    } else {
      for (let key in where) {
        if (key == 'label') {
          var s = (` AND ${conn.escapeId(key)} like ` + conn.escape(`%${where[key]}%`));
          whereSql += s;
        } else {
          whereSql += (' AND ' + conn.escapeId(key) + ' = ?');
          whereArgs.push(where[key]);
        }
      }
    }
    var queryCount = new Promise((resolve, reject) => {
      conn.query(`select count(*) as cnt from articles where 1 ${whereSql}`, 
        [...whereArgs], (err, results, fields) => {
          if (err) {
            reject();
          }
          resolve(results[0].cnt);
        }
      )
    })
    queryCount.then((total) => {
      returnData.total = Math.ceil(total / this.step);
    });
    var queryData = new Promise((resolve, reject) => {
      conn.query(`select ?? from ${this.dbname} where 1 ${whereSql} order by id desc limit ?, ?`,
        [queryfields, ...whereArgs, start * this.step, this.step], (err, results, fields) => {
          if (err) reject();
          resolve(results);
        }
      )
    })
    queryData.then((data) => {
      returnData.data = data;
    })
    var query = Promise.all([queryCount, queryData]).then(
      () => {
        succ(returnData);
      }
    ).catch((err) => {
      fail();
    }).finally(() => {
      conn.end((err) => {
        }
      )
    })
  }

  move(ids, gid, succ, fail) {
    var conn = mysql.createConnection(this.dbconfig);
    var update = new Promise((resolve, reject) => {
        conn.beginTransaction((err) => {
          if (err) {reject()};
          conn.query(`update ${this.dbname} set category = ? where id in ?`,
            [gid, [ids]], (err, results, fields) => {
              if (err) {reject()};
              resolve();
            }
          )
        })
      }
    )
    update.then(() => {
      return new Promise((resolve, reject) => {
        conn.query(RECOUNT_ARTICLE_GROUP_SQL, (err, results, fields) => {
          if (err) {reject()};
          resolve();
        })
      })
    }).then(() => {
      conn.commit((err) =>{
        conn.end((err) => {});
        succ();
      });
    }).catch((err) => {
      conn.rollback((err) => {
        conn.end((err) => {});
      })
      fail();
    }).finally(() => {
    })
  }

  updateState(ids, state, succ, fail) {
    var conn = mysql.createConnection(this.dbconfig);
    var update = new Promise((resolve, reject) => {
      conn.query(`update ${this.dbname} set state = ? where id in ?`,
        [state, [ids]],
        (err, results, fields) => {
          if (err) reject();
          resolve();
        }
      )
    });
    update.then(() => {
      succ();
    }).catch(() => {
      fail();
    }).finally(() => {
      conn.end((err) => {

      })
    })
  }

  view(id, succ, fail) {
    var conn = mysql.createConnection(this.dbconfig);
    var article;
    var view = new Promise((resolve, reject) => {
      conn.query(`select * from ${this.dbname} where id = ?`, [id],
        (err, results, fields) => {
          if (err) {reject();}
          resolve(results[0]);
        }
      )
    })
    view.then((data) => {
        article = data;
        var labels = article.label;
        var uplabel = this.__updateLabels(conn, labels, configs.label_hotmark_rule.view);
        var uppv = this.__increasePageView(conn, id);
        return Promise.all([uplabel, uppv]);
      }
    ).then(() => {
      succ(article);
    }).catch((err) => {
      // 暂时没有用
      fail();
    }).finally(() => {
      conn.end((err) => {});
    })
  }

  __add(datas, succ, fail) {
    var conn = mysql.createConnection(this.dbconfig);
    var add = new Promise((resolve, reject) => {
      conn.beginTransaction((err) => {
        if (err) {reject();}
        resolve();
      })
    })
    add.then(() => {
      return new Promise((resolve, reject) => {
        conn.query(`insert into ${this.dbname} set ?`, [datas],
          (err, results, fields) => {
            if (err) {throw err;reject()};
            resolve();
          }
        )
      })
    }).then(() => {
      return this.__updateLabels(conn, datas.label, configs.label_hotmark_rule.add, true, true);
    }).then(() => {
      conn.commit((err) => {
        if (err) {throw err; return;}
        conn.end((err) => {});
        succ();
      })
    }).catch((err) => {
      console.log(err);
      conn.rollback((err) => {
        conn.end((err) => {});
      })
      fail();
    })
  }

  __modify(id, datas, succ, fail) {
    var oldLabels = [];
    var conn = mysql.createConnection(this.dbconfig);
    var modify = new Promise((resolve, reject) => {
      conn.beginTransaction((err) => {
        if (err) reject();
        resolve();
      })
    })
    modify.then(() => {
      return new Promise((resolve, reject) => {
        conn.query(`select label from ${this.dbname} where id = ?`, [id],
          (err, results, fields) => {
            if (err) reject();
            oldLabels = results[0].label.split(',');
            resolve();
          }
        )
      })
    }).then(() => {
      return new Promise((resolve, reject) => {
        conn.query(`update ${this.dbname} set ? where id = ?`, [datas, id],
          (err, results, fields) => {
            if (err) {reject()};
            resolve();
          }
        )
      })
    }).then(() => {
      return this.__updateLabels(conn, datas.label, configs.label_hotmark_rule.add, false, true, oldLabels);
    }).then(() => {
      conn.commit((err) => {
        if (err) {throw err;return;}
        conn.end((err) => {});
        succ();
      })
    }).catch((err) => {
      conn.rollback((err) => {
        conn.end((err) => {})
      })
      fail();
    })
  }

  __insertNewLabels(conn, labels, sval, /*是否报告错误*/isRej) {
    return new Promise((resolve, reject) => {
      var len = labels.length;
      if (len == 0) {
        resolve();
      }
      var sql = 'insert into labels(name, hotmark, addtime) values ';
      var addtime = Math.floor(new Date().getTime() / 1000);
      var tip = '(?, ' + conn.escape(sval) + ', ' + conn.escape(addtime) +')';
      for (var i = 0; i < len - 1; i++) {
        sql += tip + ',';
      }
      sql += tip;
      conn.query(sql, labels, (err, results, fields) => {
        if (err && isRej) {reject();}
        resolve();
      })
    })
  }

  __updateExistingLabels(conn, labels, sval, /*是否报告错误*/isRej) {
    return new Promise((resolve, reject) => {
      if (labels.length == 0) {
        resolve();
      }
      conn.query('update labels set hotmark = hotmark + ? where name in ?',
        [sval, [labels]], (err, results, fields) => {
          if (err && isRej) {reject();}
          resolve();
        }
      )
    })
  }

  __updateLabels(conn, labels, sval, /*是否更新已经存在的标签*/upOld = true, /*是否产生错误*/isRej = false, /*更新之前的label*/oldLabels = []) {
    var p1 = new Promise((resolve, reject) => {
      conn.query(`select name from labels`, (err, results, fields) => {
        if (err && isRej) {reject()};
        var _eLabels = results.map((label) => (label.name));
        resolve(_eLabels);
      })
    })
    return p1.then((_eLabels) => {
      if (labels == '') {
        return new Promise((resolve, reject) => {
          resolve();
        })
      }
      if (typeof labels == 'string')
        labels = labels.split(',');
      var labelsNew = [], 
          labelsExists = [],    // label 存在，且 article 没有这个label 
          labelsExistsOld = []; // label 存在，且 article 有这个 label 
      labels.forEach((label) => {
        if (_eLabels.indexOf(label) == -1) {
          labelsNew.push(label);
        } else if (oldLabels.indexOf(label) == -1) {
          labelsExists.push(label);
        } else {
          labelsExistsOld.push(label);
        }
      })
      var promises = [];
      // 插入新标签
      promises.push(this.__insertNewLabels(conn, labelsNew, sval, isRej));
      promises.push(this.__updateExistingLabels(conn, labelsExists, sval, isRej));
      if (upOld) {
        promises.push(this.__updateExistingLabels(conn, labelsExistsOld, sval, isRej));
      }
      return Promise.all(promises);
    })
  }

  __increasePageView(conn, id) {
    return new Promise((resolve, reject) => {
      conn.query(`update ${this.dbname} set pageview = pageview + 1 where id = ?`, [id],
        (err, results, fields) => {
          // 😊
          resolve();
        }
      )
    })
  }
}

module.exports = Articles;