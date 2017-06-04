const mysql = require('mysql');
const configs = require('../config/base.config.js');
const fs = require('fs');
const path = require('path');
const uploadPhotoDir = path.join(__dirname, '../public/images/blog');

const RECOUNT_PHOTO_GROUP_SQL = `
             update photogroups as pg 
             left join
             (select photogroup as gid, count(*) as cnt from photos group by photogroup) as cp
             on pg.id = cp.gid
             set pg.count = if(isnull(cp.cnt), 0, cp.cnt)
`;

// articlecnt is not set

class Photos {
  constructor() {
    this.dbname = 'photos';
    this.dbconfig = configs.database_config;
  }

  add(datas) {
    var file = datas.file;
    var name = datas.name;
    var addtime = datas.addtime;
    var photogroup = datas.photogroup || 1;
    var newpath = path.join(uploadPhotoDir, name);
    fs.rename(datas.file, newpath, (err) => {
      if (err) {
        fail();
        return;
      }
    })
    var conn = mysql.createConnection(this.dbconfig);
    var add = new Promise((resolve, reject) => {
      conn.query(`insert into ${this.dbname} set ?`, {
          name: name, title: name ,photogroup: photogroup, addtime: addtime
        }, (err, results, fields) => {
          if (err) reject();
          resolve();
        }
      )
    });
    return add.then(() => {
      return new Promise((resolve, reject) => {
        conn.query(`select count(*) as cnt from ${this.dbname} where photogroup = ?`, [photogroup],
          (err, results, fields) => {
            if (err) reject();
            resolve(results[0].cnt);
          }
        )
      })
    }).then((cnt) => {
      return new Promise((resolve, reject) => {
        conn.query(`update photogroups set count = ? where id = ?`, [cnt, photogroup],
          (err, results, fields) => {
            //if (err) reject();
            resolve();
          }
        )
      })
    }).then(() => {
    }).catch(() => {
      fs.unlink(newpath, (err) => {});
    }).finally(() => {
      conn.end((err) => {});
    })
  }

  delete(ids) {
    var conn = mysql.createConnection(this.dbconfig);
    var del = new Promise((resolve, reject) => {
      conn.beginTransaction((err) => {
        if (err) reject();
        resolve();
      })
    })
    return del.then(() => {
      return new Promise((resolve, reject) => {
        conn.query(`delete from ${this.dbname} where id in ?`, [[ids]],
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
    }).catch(() => {
      conn.rollback(() => {
        conn.end(() => {});
      })
    })
  }

  get({where = {}} = {}) {
    var conn = mysql.createConnection(this.dbconfig);
    var whereSql = '';
    var whereParams = [];
    for (let key in where) {
      whereSql += (' AND ' + conn.escapeId(key) + ' = ?');
      whereParams.push(where[key]);
    }
    var queryfields = ['id', 'name', 'title'];
    var gt = new Promise((resolve, reject) => {
      conn.query(`select ?? from ${this.dbname} where 1 ${whereSql} order by id asc`,
        [queryfields, ...whereParams], (err, results, fields) => {
          if (err) {reject()};
          resolve(results);
        }
      )
    })
    return gt.finally(() => {
      conn.end((err) => {});
    })
  }

  move(datas) {
    var ids = datas.ids;
    var photogroup = datas.photogroup;
    var conn = mysql.createConnection(this.dbconfig);
    var move = new Promise((resolve, reject) => {
      conn.beginTransaction((err) => {
        if (err) {reject()};
        resolve();
      })
    })
    return move.then(() => {
      return new Promise((resolve, reject) => {
        conn.query(`update ${this.dbname} set photogroup = ? where id in ?`, [photogroup, [ids]],
          (err, results, fields) => {
            if (err) {reject()};
            resolve();
          }
        )
      })
    }).then(() => {
      return new Promise((resolve, reject) => {
        conn.query(RECOUNT_PHOTO_GROUP_SQL, (err, results, fields) => {
          if (err) {reject()};
          resolve();
        })
      })
    }).then(() => {
      conn.commit((err) => {
        if (err) {throw err;}
        conn.end((err) => {});
      })
    }).catch(() => {
      conn.rollback((err) => {
        conn.end((err) => {});
      })
    })
  }

  rename(datas, succ, fail) {
    var id = datas.id;
    var title = datas.title;
    var conn = mysql.createConnection(this.dbconfig);
    var rename = new Promise((resolve, reject) => {
      conn.query(`update ${this.dbname} set title = ? where id = ?`, [title, id], 
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

module.exports = Photos;