const mysql = require('promise-mysql');
const configs = require('../config/base.config.js');
const fs = require('then-fs');
const move = require('move-concurrently')
const path = require('path');
const uploadPhotoDir = path.resolve(__dirname, '../public/images/blog');

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
    try {
      var file = datas.file
      var name = datas.name
      var addtime = datas.addtime
      var photogroup = datas.photogroup || 1
      try {
        await fs.access(uploadPhotoDir)
      } catch(err) {
        await fs.mkdir(uploadPhotoDir)
      }
      console.log("here")
      var newpath = path.join(uploadPhotoDir, name)
      await this.savePhoto(file, newpath)
      var conn = await mysql.createConnection(this.dbconfig)
      await conn.beginTransaction()
      await conn.query(`insert into ${this.dbname} set ?`, {
                  name: name,
                  title: name,
                  photogroup: photogroup,
                  addtime: addtime
                })
      var results = await conn.query(`select count(*) as cnt from ${this.dbname} where photogroup = ?`, [photogroup])
      var gcount = results[0].cnt
      await conn.query(`update photogroups set count = ? where id = ?`, [gcount, photogroup])
      await conn.commit()
      conn.end()
      return Promise.resolve()
    } catch (err) {
      if (conn) {
        await conn.rollback()
        conn.end()
      }
      fs.unlink(newpath, (err) => {})
      return Promise.reject(err)
    }
  }

  /**
   * 此处没有把储存的图片删掉
   * 可单独写一个脚本进行
   */
  async delete(ids) {
    try {
      var conn = await mysql.createConnection(this.dbconfig)
      await conn.beginTransaction()
      await conn.query(`delete from ${this.dbname} where id in ?`, [[ids]])
      await conn.query(RECOUNT_PHOTO_GROUP_SQL)
      await conn.commit()
      conn.end()
      return Promise.resolve()
    } catch (err) {
      if (conn) {
        await conn.rollback()
        conn.end()
      }
      return Promise.reject()
    }
  }

  async get({where = {}} = {}) {
    try {
      var conn = await mysql.createConnection(this.dbconfig);
      var whereSql = '';
      var whereParams = [];
      for (let key in where) {
        whereSql += (' AND ' + conn.escapeId(key) + ' = ?');
        whereParams.push(where[key]);
      }
      var queryfields = ['id', 'name', 'title'];
      var results = await conn.query(`select ?? from ${this.dbname} where 1 ${whereSql} order by id asc`, [queryfields, ...whereParams])
      conn.end()
      return Promise.resolve(results)
    } catch (err) {
      if (conn) {
        conn.end()
      }
      return Promise.reject(err)
    }
  }

  async move(datas) {
    try {
      var ids = datas.ids
      var photogroup = datas.photogroup
      var conn = await mysql.createConnection(this.dbconfig)
      await conn.beginTransaction()
      await conn.query(`update ${this.dbname} set photogroup = ? where id in ?`, [photogroup, [ids]])
      await conn.query(RECOUNT_PHOTO_GROUP_SQL)
      await conn.commit()
      conn.end()
      return Promise.resolve()
    } catch (err) {
      if (conn) {
        await conn.rollback()
        conn.end()
      }
      return Promise.reject(err)
    }
  }

  async rename(datas) {
    try {
      var id = datas.id
      var title = datas.title
      var conn = await mysql.createConnection(this.dbconfig)
      await conn.query(`update ${this.dbname} set title = ? where id = ?`, [title, id])
      conn.end()
      return Promise.resolve()
    } catch (err) {
      if (conn) {
        conn.end()
      }
      return Promise.reject(err)
    }
  }

  async savePhoto(fdata, fpath) {
    await move(fdata, fpath).then(() => {
      return Promise.resolve()
    }).catch(() => {
      return Promise.reject()
    })
  }
}

module.exports = Photos