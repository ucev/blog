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
      __log.debug('fail');
      __log.debug(err);
      fail();
    })
  }

  __getTreeArticle(id, conn) {
    __log.debug('__getTreeArticle');
    return new Promise((resolve, reject) => {
      conn.query(`select * from ${this.tb_article} where category = ? order by suborder`, [id], (err, results, fields) => {
        if (err) {
          __log.debug(JSON.stringify(err));
          resolve([]);
        }
        var arts = results.map((art) => {
          return {title: art.title, id: art.id, seq: art.suborder, type: 'art'}
        })
        __log.debug('arts: ' + JSON.stringify(arts));
        resolve(arts);
      })
    })
  }

  __getTreeDir(id, conn) {
    __log.debug('__getTreeDir');
    return new Promise((resolve, reject) => {
      conn.query(`select * from ${this.dbname} where parent = ?`, [id], (err, results, fields) => {
        if (err) {
          __log.debug(JSON.stringify(err));
          resolve([]);
        }
        var dirs = results.map((dir) => {
          return {title: dir.name, id: dir.id, seq: dir.suborder, type: 'dir'}
        })
        __log.debug('dirs: ' + JSON.stringify(dirs));
        resolve(dirs);
      })
    })
  }

  __getTree(dir, conn, ids) {
    __log.debug('__getTree');
    var tdir = this.__getTreeDir(dir.id, conn);
    var tart = this.__getTreeArticle(dir.id, conn);
    var _tree = Promise.all([tdir, tart]);
    return _tree.then(([dirs, arts] = datas) => {
      dir.childs = Array.from([...dirs, ...arts]).sort((a, b) => {
        return a.suborder > b.suborder;
      })
      __log.debug(JSON.stringify(dir));
      var subdirs = dirs.map((d) => {
        var id = d.id;
        if (!ids.includes(id)) {
          ids.push(id);
          return this.__getTree(d, conn, ids);
        }
      })
      return Promise.all(subdirs);
    })
  }

  getTree(id, succ, fail) {
    __log.debug('getTree');
    var cats;
    var idGets = [];
    var conn = mysql.createConnection(this.dbconfig);
    var tree = new Promise((resolve, reject) => {
      conn.query(`select * from ${this.dbname} where id = ?`, [id], (err, results, fields) => {
        if (err) {__log.debug(JSON.stringify(err));reject();};
        var dir = results[0];
        var root = {title: dir.name, id: dir.id, seq: dir.suborder, type: 'dir'};
        resolve(root);
      })
    })
    tree.then((dir) => {
      cats = dir;
      idGets.push(dir.id);
      __log.debug(JSON.stringify(dir));
      return this.__getTree(dir, conn, idGets);
    }).then((datas) => {
      __log.debug('succ');
      succ([cats]);
    }).catch((err) => {
      console.log(err);
      __log.debug('fail');
      fail([]);
    }).finally(() => {
      conn.end((err) => {});
    })
  }

  setPreface({id, preface, isSet}, succ, fail) {
    
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