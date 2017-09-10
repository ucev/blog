const mysql = require('promise-mysql');
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

  async add(datas) {
    var name = datas.name;
    var addtime = datas.addtime;
    var conn = await mysql.createConnection(this.dbconfig);
    try {
      await conn.query(`insert into ${this.dbname} set ?`, {
            name: name, addtime: addtime
          })
      conn.end()
      return Promise.resolve()
    } catch (err) {
      conn.end()
      return Promise.reject()
    }
  }

  async delete(gid) {
    if (gid < 2) {
      return Promise.reject()
    }
    var conn = await mysql.createConnection(this.dbconfig);
    try {
      await conn.beginTransaction()
      await conn.query(`update photos set photogroup = 1 where photogroup = ?`, [gid])
      await conn.query(`delete from ${this.dbname} where id = ?`, [gid])
      await conn.query(RECOUNT_PHOTO_GROUP_SQL)
      await conn.commit()
      await conn.end()
      return Promise.resolve()
    } catch (err) {
      await conn.rollback()
      await conn.end()
      return Promise.reject()
    }
  }

  async get() {
    var conn = await mysql.createConnection(this.dbconfig);
    var queryfields = ['id', 'name', 'count'];
    var allgroup = {'id': -1, name: '全部分组', count: 0};
    try {
      var data = conn.query(`select ?? from ${this.dbname}`, [[queryfields]])
      var cnt = data.reduce((sum, i) => (sum += i.count), 0);
      allgroup.count = cnt;
      conn.end()
      return Promise.resolve([allgroup, ...data]);
    } catch (err) {
      return Promise.reject([allgroup]);
    }
  }

  async rename(datas) {
    var id = datas.id;
    var name = datas.name;
    var conn = await mysql.createConnection(this.dbconfig);
    try {
      await conn.query(`update ${this.dbname} set name = ? where id = ?`, [name, id])
      conn.end()
      return Promise.resolve()
    } catch (err) {
      conn.end()
      return Promise.reject()
    }
  }

}

module.exports = PhotoGroups;