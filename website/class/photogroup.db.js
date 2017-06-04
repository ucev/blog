const mysql = require('mysql');
const configs = require('../config/base.config.js');

const RECOUNT_PHOTO_GROUP_SQL = `
             update photogroups as pg 
             left join
             (select photogroup as gid, count(*) as cnt from photos group by photogroup) as cp
             on pg.id = cp.gid
             set pg.count = if(isnull(cp.cnt), 0, cp.cnt)
`;

class PhotoGroups {
  constructor() {
    this.dbname = 'photogroups';
    this.dbconfig = configs.database_config;
  }

  add(datas) {
    var name = datas.name;
    var addtime = datas.addtime;
    var conn = mysql.createConnection(this.dbconfig);
    var add = new Promise((resolve, reject) => {
      conn.query(`insert into ${this.dbname} set ?`, {
          name: name, addtime: addtime
        }, (err, results, fields) => {
          if (err) reject();
          resolve();
        }
      )
    })
    return add.finally(() => {
      conn.end((err) => {});
    })
  }

  delete(gid) {
    if (gid < 2) {
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
    return del.then(() => {
      return new Promise((resolve, reject) => {
        conn.query(`update photos set photogroup = 1 where photogroup = ?`, [gid],
          (err, results, fields) => {
            if (err) reject();
            resolve();
          }
        )
      })
    }).then(() => {
      return new Promise((resolve, reject) => {
        conn.query(`delete from ${this.dbname} where id = ?`, [gid],
          (err, results, fields) => {
            if (err) reject();
            resolve();
          }
        )
      })
    }).then(() => {
      return new Promise((resolve, reject) => {
        conn.query(RECOUNT_PHOTO_GROUP_SQL, (err, results, fields) => {
          if (err) reject();
          resolve();
        })
      })
    }).then(() => {
      conn.commit((err) => {
        if (err) {throw err;}
        conn.end((err) => {});
      })
    }).catch((err) => {
      conn.rollback((err) => {
        conn.end((err) => {});
      })
    })
  }

  get() {
    var conn = mysql.createConnection(this.dbconfig);
    var queryfields = ['id', 'name', 'count'];
    var allgroup = {'id': -1, name: '全部分组', count: 0};
    var gt = new Promise((resolve, reject) => {
      conn.query(`select ?? from ${this.dbname}`, [[queryfields]], (err, results, fields) => {
        if (err) reject();
        resolve(results);
      })
    })
    return gt.then((data) => {
      var cnt = data.reduce((sum, i) => (sum += i.count), 0);
      allgroup.count = cnt;
      return Promise.resolve([allgroup, ...data]);
    }).catch(() => {
      return Promise.reject([allgroup]);
    }).finally(() => {
      conn.end((err) => {});
    })
  }

  rename(datas) {
    var id = datas.id;
    var name = datas.name;
    var conn = mysql.createConnection(this.dbconfig);
    var rename = new Promise((resolve, reject) => {
      conn.query(`update ${this.dbname} set name = ? where id = ?`, [name, id],
        (err, results, fields) => {
          if (err) reject();
          resolve();
        }
      )
    })
    return rename.finally(() => {
      conn.end((err) => {});
    })
  }

}

module.exports = PhotoGroups;