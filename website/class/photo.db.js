const mysql = require('promise-mysql');
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

  async add(datas) {
    var file = datas.file
    var name = datas.name
    var addtime = datas.addtime
    var photogroup = datas.photogroup || 1
    var newpath = path.join(uploadPhotoDir, name)
    var conn
    try {
      await savePhoto(data.file, newpath)
      conn = await mysql.createConnection(this.dbconfig)
      await conn.beginTransaction()
      await conn.query(`insert into ${this.dbname} set ?`, {
                  name: name,
                  title: name,
                  photogroup: photogroup,
                  addtime: addtime
                })
      var gcount = await conn.query(`select count(*) as cnt from ${this.dbname} where photogroup = ?`, [photogroup])
      await conn.query(`update photogroups set count = ? where id = ?`, [gcount, photogroup])
      await conn.commit()
      conn.end()
      return Promise.resolve()
    } catch (err) {
      conn.rollback()
      conn.end()
      fs.unlink(newpath, (err) => {})
      return Promise.reject()
    }
  }

  async delete(ids) {
    var conn = await mysql.createConnection(this.dbconfig);
    try {
      await conn.beginTransaction()
      await conn.query(`delete from ${this.dbname} where id in ?`, [[ids]])
      await conn.query(RECOUNT_PHOTO_GROUP_SQL)
      await conn.commit()
      conn.end()
      return Promise.resolve()
    } catch (err) {
      await conn.rollback()
      conn.end()
      return Promise.reject()
    }
  }

  async get({where = {}} = {}) {
    var whereSql = '';
    var whereParams = [];
    for (let key in where) {
      whereSql += (' AND ' + conn.escapeId(key) + ' = ?');
      whereParams.push(where[key]);
    }
    var queryfields = ['id', 'name', 'title'];
    var conn = await mysql.createConnection(this.dbconfig);
    try {
      var results = await conn.query(`select ?? from ${this.dbname} where 1 ${whereSql} order by id asc`,
        [queryfields, ...whereParams])
      conn.end()
      return Promise.resolve(results)
    } catch (err) {
      conn.end()
      return reject()
    }
  }

  async move(datas) {
    var ids = datas.ids;
    var photogroup = datas.photogroup;
    var conn = await mysql.createConnection(this.dbconfig);
    try {
      await conn.beginTransaction()
      await conn.query(`update ${this.dbname} set photogroup = ? where id in ?`, [photogroup, [ids]])
      await conn.query(RECOUNT_PHOTO_GROUP_SQL)
      await conn.commit()
      conn.end()
      return Promise.resolve()
    } catch (err) {
      await conn.rollback()
      conn.end()
      return Promise.reject()
    }
  }

  async rename(datas) {
    var id = datas.id;
    var title = datas.title;
    var conn = await mysql.createConnection(this.dbconfig);
    try {
      await conn.query(`update ${this.dbname} set title = ? where id = ?`, [title, id])
      conn.end()
      return Promise.resolve()
    } catch (err) {
      conn.end()
      return Promise.reject()
    }
  }

  async savePhoto(fdata, fpath) {
    return new Promise((resolve, reject) => {
      fs.rename(fdata, fpath, (err) => {
        if (err) {
          resolve()
        }
        reject()
      })
    })
  }
}

module.exports = Photos;