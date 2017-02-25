const mysql = require('mysql');
const configs = require('../config/base.config.js');


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

  getsingle(id, succ, fail) {
    var conn = mysql.createConnection(this.dbconfig);
    var queryfields = ['id', 'title', 'category', 'label', 'state', 'top', 'pageview'];
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

  getByCond({where = {}, start = 0} = {}, succ = function(){}, fail= function(){}) {
    var returnData = {
      total: 0,
      current: start,
      data: []
    };
    var conn = mysql.createConnection(this.dbconfig);
    var queryfields = ['id', 'title', 'category', 'label', 'state', 'top', 'pageview'];
    var whereArgs = [];
    var whereSql = '';
    for (let key in where) {
      whereSql += (' And ' + conn.escapeId(key) + ' = ?');
      whereArgs.push(where[key]);
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
      conn.query(`select ?? from ${this.dbname} where 1 ${whereSql} limit ?, ?`,
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
}

module.exports = Articles;