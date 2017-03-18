const mysql = require('mysql');
const configs = require('../config/base.config.js');
const __log = require('../utils/log');

// articlecnt is not set

class Categories {
  constructor() {
    this.dbname = 'categories';
    this.tb_article = 'articles';
    this.dbconfig = configs.database_config;
  }

  add({name, parent, descp, addtime} = {}, succ, fail) {
    if (name.trim() == '') {
      fail();
      return;
    }
    var conn = mysql.createConnection(this.dbconfig);
    var add = new Promise((resolve, reject) => {
      conn.query(`insert into ${this.dbname} set ?`, {
          name: name,
          parent: parent, 
          descp: descp,
          addtime: addtime
        }, (err, results, fields) => {
          if (err) reject();
          resolve();
        }
      )
    })
    add.then(() => {
      succ();
    }).catch(() => {
      fail();
    }).finally(() => {
      conn.end((err) => {});
    })
  }

  delete(id, succ, fail) {
    if (id < 1) {
      fail();
      return;
    }
    var conn = mysql.createConnection(this.dbconfig);
    var del = new Promise((resolve, reject) => {
      conn.beginTransaction((err) => {
        if (err) reject();
        resolve();
      })
    })
    del.then(() => {
      var del1 = new Promise((resolve, reject) => {
        conn.query(`delete from ${this.dbname} where id = ?`, [id],
          (err, results, fields) => {
            if (err) {reject()};
            resolve();
          }
        )
      })
      var del2 = new Promise((resolve, reject) => {
        conn.query(`update ${this.dbname} set parent = 0 where parent = ?`, [id],
          (err, results, fields) => {
            if (err) {reject()};
            resolve();
          }
        )
      })
      var del3 = new Promise((resolve, reject) => {
        conn.query(`update articles set category = 0 where category = ?`, [id],
          (err, results, fields) => {
            if (err) {reject()};
            resolve();
          }
        )
      })
      return Promise.all([del1, del2, del3]);
    }).then(() => {
      conn.commit((err) => {
        if (err) {throw err;}
        conn.end((err) => {});
        succ();
      })
    }).catch((err) => {
      conn.rollback((err) => {
        conn.end((err) => {});
      })
      fail();
    })
  }

  get(succ, fail) {
    var conn = mysql.createConnection(this.dbconfig);
    var gt = new Promise((resolve, reject) => {
      conn.query(`select * from ${this.dbname} order by mainorder asc`, (err, results, fields) => {
        if (err) reject();
        resolve(results);
      })
    })
    gt.then((results) => {
      succ(results);
    }).catch(() => {
      fail();
    }).finally(() => {
      conn.end((err) => {});
    })
  }

  getById({id, queryfields} = {}, succ, fail) {
    queryfields = queryfields ? queryfields : ['*'];
    var conn = mysql.createConnection(this.dbconfig);
    var get = new Promise((resolve, reject) => {
      conn.query(`select ?? from ${this.dbname} where id = ?`, [queryfields, id], (err, results, fields) => {
        if (err || results.length == 0) {throw err;reject();}
        resolve(results[0]);
      })
    })
    get.then((cat) => {
      succ(cat);
    }).catch((err) => {
      __log.debug(err);
      fail();
    })
  }

  __getTreeArticle(id, conn) {
    return new Promise((resolve, reject) => {
      conn.query(`select * from ${this.tb_article} where category = ? order by suborder`, [id], (err, results, fields) => {
        if (err) {
          throw err;
          resolve([]);
        }
        var arts = results.map((art) => {
          return {title: art.title, id: art.id, seq: art.suborder, type: 'art'}
        })
        resolve(arts);
      })
    })
  }

  __getTreeDir(id, conn) {
    return new Promise((resolve, reject) => {
      conn.query(`select * from ${this.dbname} where parent = ?`, [id], (err, results, fields) => {
        if (err) {
          throw err;
          resolve([]);
        }
        var dirs = results.map((dir) => {
          return {title: dir.name, id: dir.id, seq: dir.suborder, preface: dir.preface, type: 'dir'}
        })
        resolve(dirs);
      })
    })
  }

  __getTree(dir, conn, ids, prefaces) {
    var tdir = this.__getTreeDir(dir.id, conn);
    var tart = this.__getTreeArticle(dir.id, conn);
    var _tree = Promise.all([tdir, tart]);
    return _tree.then(([dirs, arts] = datas) => {
      arts = arts.filter((art) => {
        return !prefaces.has(art.id);
      })
      dir.childs = Array.from([...dirs, ...arts]).sort((a, b) => {
        return a.suborder > b.suborder;
      })
      var subdirs = dirs.map((d) => {
        var id = d.id;
        prefaces.add(d.preface);
        if (!ids.has(id)) {
          ids.add(id);
          return this.__getTree(d, conn, ids, prefaces);
        }
      })
      return Promise.all(subdirs);
    })
  }

  getTree(id, succ, fail) {
    var cats;
    var idGets = new Set(), prefaces = new Set();
    var conn = mysql.createConnection(this.dbconfig);
    var tree = new Promise((resolve, reject) => {
      conn.query(`select * from ${this.dbname} where id = ?`, [id], (err, results, fields) => {
        if (err) {throw err;reject();};
        var dir = results[0];
        var root = {title: dir.name, id: dir.id, seq: dir.suborder, type: 'dir'};
        resolve(root);
      })
    })
    tree.then((dir) => {
      cats = dir;
      idGets.add(dir.id);
      prefaces.add(dir.preface);
      return this.__getTree(dir, conn, idGets, prefaces);
    }).then((datas) => {
      succ([cats]);
    }).catch((err) => {
      console.log(err);
      fail([]);
    }).finally(() => {
      conn.end((err) => {});
    })
  }

  __setPreface(conn, id, preface) {
    var p = new Promise((resolve, reject) => {
      conn.query(`update ${this.tb_article} left join (select preface from ${this.dbname} where id = ?) as preface on ${this.tb_article}.id = preface.preface set ${this.tb_article}.suborder = 0`, [id], (err, results, fields) => {
        if (err) {__log.debug('1: ' + err); throw err; reject();}
        resolve();
        //
      })
    })
    return p.then(() => {
      var p1 = new Promise((resolve, reject) => {
        conn.query(`update ${this.dbname} set preface = ? where id = ?`, [preface, id], (err, results, fields) => {
          if (err) {__log.debug('2: ' + err); throw err; reject();}
          resolve();
        })
      })
      var p2 = new Promise((resolve, reject) => {
        conn.query(`update ${this.tb_article} set suborder = -1 where id = ?`, [preface], (err, results, fields) => {
          if (err) {__log.debug('3: ' + err); throw err;reject();}
          resolve()
        })
      })
      return Promise.all([p1, p2]);
    }).catch((err) => {
      // ?
      return -1;
    });
  }

  __cancelPreface(conn, id) {
    var p1 = new Promise((resolve, reject) => {
      conn.query(`update ${this.tb_article} left join (select preface from ${this.dbname} where id = ?) as p on ${this.tb_article}.id = p.preface set ${this.tb_article}.suborder = 0`, [id], (err, results, fields) => {
        if (err) {__log.debug(err);throw err; reject();}
        resolve();
      })
    })
    return p1.then(() => {
      return new Promise((resolve, reject) => {
        conn.query(`update ${this.dbname} set preface = 0 where id = ?`, [id], (err, results, fields) => {
          if (err) {__log.debug(err); throw err; reject();}
          resolve();
        })
      })
    })
  }

  setPreface({id, preface, isSet}, succ, fail) {
    var conn = mysql.createConnection(this.dbconfig);
    var p = new Promise((resolve, reject) => {
      conn.beginTransaction((err) => {
        if (err) {throw err; reject();}
        resolve();
      })
    })
    p.then(() => {
      if (isSet === true) {
        return this.__setPreface(conn, id, preface);
      } else {
        return this.__cancelPreface(conn, id);
      }
    }).then(() => {
      conn.commit((err) => {
        if (err) {throw err; return;}
        conn.end(() => {
          succ();
        });
      })
    }).catch((err) => {
      __log.debug(err);
      conn.rollback((err) => {
        conn.end(() => {});
      })
      fail();
    })
  }

  update({id, data={}} = {}, succ, fail) {
    var conn = mysql.createConnection(this.dbconfig);
    var upd = new Promise((resolve, reject) => {
      conn.query(`update ${this.dbname} set ? where id = ?`, [
          data,
          id
        ], (err, results, fields) => {
          if (err) reject();
          resolve();
        }
      )
    })
    upd.then(() => {
      succ();
    }).catch(() => {
      fail();
    }).finally(() => {
      conn.end((err) => {});
    })
  }
}

module.exports = Categories;