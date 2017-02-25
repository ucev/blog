const mysql = require('mysql');
const configs = require('../config/base.config.js');

// articlecnt is not set

class Categories {
  constructor() {
    this.dbname = 'categories';
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
      conn.query(`select * from ${this.dbname}`, (err, results, fields) => {
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

  update({id: id, name: name, parent: parent, descp: descp} = {}, succ, fail) {
    var conn = mysql.createConnection(this.dbconfig);
    var upd = new Promise((resolve, reject) => {
      conn.query(`update ${this.dbname} set ? where id = ?`, [
          {name: name, parent: parent, descp: descp},
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