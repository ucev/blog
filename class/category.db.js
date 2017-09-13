const mysql = require('promise-mysql');
const configs = require('../config/base.config.js');
const __log = require('../utils/log');

// articlecnt is not set

class Categories {
  constructor() {
    this.dbname = 'categories';
    this.tb_article = 'articles';
    this.dbconfig = configs.database_config;
  }

  async add({ name, parent, descp, addtime } = {}) {
    if (name.trim() == '') {
      return Promise.reject(new Error(`name can't be empty`))
    }
    try {
      var conn = await mysql.createConnection(this.dbconfig)
      await conn.query(`insert into ${this.dbname} set ?`, {
                name: name,
                parent: parent,
                descp: descp,
                addtime: addtime
              })
      conn.end()
      return Promise.resolve()
    } catch (err) {
      if (conn) {
        conn.end()
      }
      return Promise.reject(err)
    }
  }

  async delete(id) {
    if (id < 1) {
      return Promise.reject(`id must > 0`)
    }
    try {
      var conn = await mysql.createConnection(this.dbconfig)
      await conn.beginTransaction()
      var del1 = conn.query(`delete from ${this.dbname} where id = ?`, [id])
      var del2 = conn.query(`update ${this.dbname} set parent = 0 where parent = ?`, [id])
      var del3 = conn.query(`update articles set category = 0 where category = ?`, [id])
      await Promise.all([del1, del2, del3])
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

  async get() {
    try {
      var conn = await mysql.createConnection(this.dbconfig)
      var results = await conn.query(`select * from ${this.dbname} order by mainorder asc`)
      conn.end()
      return Promise.resolve(results)
    } catch (err) {
      if (conn) {
        conn.end()
      }
      return Promise.reject(err)
    }
  }

  async getById({ id, queryfields } = {}) {
    try {
      queryfields = queryfields ? queryfields : ['*']
      var conn = await mysql.createConnection(this.dbconfig)
      var results = await conn.query(`select ?? from ${this.dbname} where id = ?`, [queryfields, id])
      conn.end()
      return Promise.resolve(results[0])
    } catch (err) {
      if (conn) {
        conn.end()
      }
      return Promise.reject(err)
    }
  }

  async __getTreeArticle(id, conn) {
    try {
      var results = await conn.query(`select * from ${this.tb_article} where category = ? order by suborder`, [id])
      var arts = results.map((art) => {
        return { title: art.title, id: art.id, seq: art.suborder, type: 'art' }
      })
      return Promise.resolve(arts)
    } catch (err) {
      return Promise.resolve(err)
    }
  }

  async __getTreeDir(id, conn) {
    try {
      var results = await conn.query(`select * from ${this.dbname} where parent = ?`, [id])
      var dirs = results.map((dir) => {
        return { title: dir.name, id: dir.id, seq: dir.suborder, preface: dir.preface, type: 'dir' }
      })
      return Promise.resolve(dirs)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async __getTree(dir, conn, ids, prefaces) {
    try {
      var that = this
      var dirs = await this.__getTreeDir(dir.id, conn);
      var arts = await this.__getTreeArticle(dir.id, conn);
      arts = arts.filter(art => !prefaces.has(art.id))
      dir.childs = Array.from([...dirs, ...arts]).sort((a, b) => a.suborder > b.suborder)
      var subdirs = dirs.map(function(d) {
        var id = d.id;
        prefaces.add(d.preface);
        if (!ids.has(id)) {
          ids.add(id);
          return that.__getTree(d, conn, ids, prefaces);
        }
      })
      return Promise.all(subdirs)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async getTree(id) {
    try {
      var idGets = new Set(), prefaces = new Set()
      var conn = await mysql.createConnection(this.dbconfig)
      var results = await conn.query(`select * from ${this.dbname} where id = ?`, [id])
      var dir = results[0];
      var root = { title: dir.name, id: dir.id, seq: dir.suborder, type: 'dir' };
      var cats = root;
      idGets.add(dir.id);
      prefaces.add(dir.preface);
      await this.__getTree(cats, conn, idGets, prefaces)
      conn.end()
      return Promise.resolve(cats);
    } catch (err) {
      if (conn) {
        conn.end()
      }
      return Promise.reject(err)
    }
  }

  async __setPreface(conn, id, preface) {
    try {
      await conn.query(`update ${this.tb_article} left join (select preface from ${this.dbname} where id = ?) as preface on ${this.tb_article}.id = preface.preface set ${this.tb_article}.suborder = 0`, [id])
      await conn.query(`update ${this.dbname} set preface = ? where id = ?`, [preface, id])
      await conn.query(`update ${this.tb_article} set suborder = -1 where id = ?`, [preface])
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(er)
    }
  }

  async __cancelPreface(conn, id) {
    try {
      await conn.query(`update ${this.tb_article} left join (select preface from ${this.dbname} where id = ?) as p on ${this.tb_article}.id = p.preface set ${this.tb_article}.suborder = 0`, [id])
      await conn.query(`update ${this.dbname} set preface = 0 where id = ?`, [id])
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async setPreface({ id, preface, isSet }) {
    try {
      var conn = await mysql.createConnection(this.dbconfig)
      await conn.beginTransaction()
      if (isSet === true) {
        await this.__setPreface(conn, id, preface);
      } else {
        await this.__cancelPreface(conn, id);
      }
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

  async update({ id, data = {} } = {}) {

    try {
      var conn = await mysql.createConnection(this.dbconfig)
      await conn.query(`update ${this.dbname} set ? where id = ?`, [data, id])
      conn.end()
      return Promise.resolve()
    } catch (err) {
      if (conn) {
        conn.end()
      }
      return Promise.reject(err)
    }
  }
}

module.exports = Categories;