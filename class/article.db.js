const mysql = require('promise-mysql')
const configs = require('../config/base.config.js')
const ReadWriteLock = require('rwlock')
// const __log = require('../utils/log')
const Categories = require('./category.db')

class Articles {
  constructor() {
    this.dbname = 'articles'
    this.dbconfig = configs.database_config
    this.step = configs.query_config.step
    this.lock = new ReadWriteLock()
  }

  add(datas) {
    if (datas.add) {
      var dt = {
        title: datas.title,
        content: datas.content,
        descp: datas.descp,
        label: datas.label,
        addtime: datas.addtime,
        modtime: datas.addtime,
        category: 0, // 默认值
      }
      return this.__add(dt)
    } else {
      var id = datas.id
      var dt = {
        content: datas.content,
        title: datas.title,
        descp: datas.descp,
        label: datas.label,
        modtime: datas.modtime,
      }
      return this.__modify(id, dt)
    }
  }

  async delete(ids) {
    try {
      var conn = await mysql.createConnection(this.dbconfig)
      await conn.beginTransaction()
      await this.__updateLabelsOnDeleteArticle(conn, ids)
      await conn.query(`delete from ${this.dbname} where id in ?`, [[ids]])
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

  async getsingle({ id = 0, queryfields } = {}) {
    try {
      queryfields = queryfields ? queryfields : ['*']
      var conn = await mysql.createConnection(this.dbconfig)
      var results = await conn.query(
        `select ?? from ${this.dbname} where id = ?`,
        [queryfields, id]
      )
      var article = results[0]
      conn.end()
      return Promise.resolve(article)
    } catch (err) {
      if (conn) {
        conn.end()
      }
      return Promise.reject(err)
    }
  }

  async getByCond({
    where = {},
    start = 0,
    client = true,
    queryfields = ['*'],
  } = {}) {
    try {
      var conn = await mysql.createConnection(this.dbconfig)
      var returnData = {
        total: 0,
        current: start,
        data: [],
      }
      var whereArgs = []
      var whereSql = ''
      // 对模糊搜索的支持
      if ('args' in where) {
        var escapedVal = conn.escape(`%${where['args']}%`)
        whereSql += ` AND (title like ${escapedVal} or label like ${escapedVal})`
      } else {
        for (let key in where) {
          if (key == 'label') {
            var s =
              ` AND ${conn.escapeId(key)} like ` +
              conn.escape(`%${where[key]}%`)
            whereSql += s
          } else {
            whereSql += ' AND ' + conn.escapeId(key) + ' = ?'
            whereArgs.push(where[key])
          }
        }
      }
      if (client) {
        whereSql += ` AND state = 'on' `
      }
      var results = await conn.query(
        `select count(*) as cnt from articles where 1 ${whereSql}`,
        [...whereArgs]
      )
      var totalcnt = results[0].cnt
      returnData.total = Math.ceil(totalcnt / this.step)
      var data = await conn.query(
        `select ?? from ${
          this.dbname
        } where 1 ${whereSql} order by id desc limit ?, ?`,
        [queryfields, ...whereArgs, start * this.step, this.step]
      )
      returnData.data = data
      conn.end()
      return Promise.resolve(returnData)
    } catch (err) {
      if (conn) {
        conn.end()
      }
      return Promise.reject(err)
    }
  }

  async getall() {
    try {
      var conn = await mysql.createConnection(this.dbconfig)
      var arts = await conn.query(
        `select title, content from ${this.dbname} order by id asc`
      )
      conn.end()
      return Promise.resolve(arts)
    } catch (err) {
      if (conn) {
        conn.end()
      }
      return Promise.reject(err)
    }
  }

  async move(ids, gid) {
    try {
      const categories = new Categories()
      await categories.moveArticles(ids, gid)
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  }

  async updateState(ids, state) {
    try {
      var conn = await mysql.createConnection(this.dbconfig)
      await conn.query(`update ${this.dbname} set state = ? where id in ?`, [
        state,
        [ids],
      ])
      conn.end()
      return Promise.resolve()
    } catch (err) {
      if (conn) {
        conn.end()
      }
      return Promise.reject(err)
    }
  }

  async updateOrder({ id, ord }) {
    if (Number(ord) < 0) {
      return Promise.reject(new Error(`order must > 0`))
    }
    try {
      var conn = await mysql.createConnection(this.dbconfig)
      await conn.query(`update ${this.dbname} set suborder = ? where id = ?`, [
        ord,
        id,
      ])
      conn.end()
      return Promise.resolve()
    } catch (err) {
      if (conn) {
        conn.end()
      }
      return Promise.resolve()
    }
  }

  async view(id) {
    try {
      var conn = await mysql.createConnection(this.dbconfig)
      var results = await conn.query(
        `select * from ${this.dbname} where id = ?`,
        [id]
      )
      var article = results[0]
      var labels = article.label
      var uplabel = this.__updateLabelHotmark(
        conn,
        labels,
        configs.label_hotmark_rule.view
      )
      var uppv = this.__increasePageView(conn, id)
      await Promise.all([uplabel, uppv])
      conn.end()
      return Promise.resolve(article)
    } catch (err) {
      if (conn) {
        conn.end()
      }
      return Promise.reject(err)
    }
  }

  async __add(datas) {
    try {
      var conn = await mysql.createConnection(this.dbconfig)
      await conn.beginTransaction()
      await conn.query(`insert into ${this.dbname} set ?`, [datas])
      await this.__updateLabels(
        conn,
        datas.label,
        configs.label_hotmark_rule.add
      )
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

  async __modify(id, datas) {
    try {
      var conn = await mysql.createConnection(this.dbconfig)
      var oldLabels = []
      await conn.beginTransaction()
      var results = await conn.query(
        `select label from ${this.dbname} where id = ?`,
        [id]
      )
      oldLabels = results[0].label.split(',')
      await conn.query(`update ${this.dbname} set ? where id = ?`, [datas, id])
      await this.__updateLabels(
        conn,
        datas.label,
        configs.label_hotmark_rule.add,
        oldLabels
      )
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

  // update labels when deleting articles
  async __updateLabelsOnDeleteArticle(conn, ids) {
    try {
      var results = await conn.query(
        `select label from ${this.dbname} where id in ?`,
        [[ids]]
      )
      var labelObj = {}
      var labels = [].concat(...results.map(row => row.label.split(',')))
      labels.forEach(label => {
        if (label in labelObj) {
          labelObj[label] += 1
        } else {
          labelObj[label] = 1
        }
      })
      labels = Object.getOwnPropertyNames(labelObj)
      var ps = labels.map(label => {
        var data = labelObj[label]
        return conn.query(
          `update labels set articles = if (articles - ? > 0, articles - ?, 0) where name = ?`,
          [data, data, label]
        )
      })
      return Promise.all(ps)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  // add no-existed labels when adding/modifying articles
  async __insertNewLabels(conn, labels, sval) {
    try {
      labels = labels.filter(label => {
        return label.trim() != ''
      })
      var len = labels.length
      if (len == 0) {
        return Promise.resolve()
      }
      var sql = 'insert into labels(name, articles, hotmark, addtime) values '
      var addtime = Math.floor(new Date().getTime() / 1000)
      sval = Number(sval)
      var tip =
        '(?, 1, ' + conn.escape(sval) + ', ' + conn.escape(addtime) + ')'
      for (var i = 0; i < len - 1; i++) {
        sql += tip + ','
      }
      sql += tip
      await conn.query(sql, labels)
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(err)
    }
  }

  // add labels existed when modifying articles
  async __increaseExistingLabels(conn, labels, sval) {
    try {
      var ps = labels.map(label =>
        conn.query(
          `update labels set articles = articles + 1, hotmark = hotmark + ? where name = ?`,
          [sval, label]
        )
      )
      return Promise.all(ps)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  // delete labels existed when modifying articles
  async __decreaseExistingLabels(conn, labels) {
    try {
      var ps = labels.map(label =>
        conn.query(
          `update labels set articles = if (articles - 1 > 0, articles - 1, 0) where name = ?`,
          [label]
        )
      )
      return Promise.all(ps)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  // update labels when adding/modifying articles
  async __updateLabels(conn, labels, sval, oldLabels = []) {
    try {
      var results = await conn.query(`select name from labels`)
      var _eLabels = results.map(label => label.name)
      if (typeof labels == 'string') {
        labels = labels.split(',')
      }
      var labelsToAdd = [],
        labelsToIncrease = [],
        labelsToDecrease = []
      labels.forEach(label => {
        if (_eLabels.indexOf(label) === -1) {
          labelsToAdd.push(label)
        } else if (oldLabels.indexOf(label) === -1) {
          labelsToIncrease.push(label)
        }
      })
      labelsToDecrease = oldLabels.filter(label => labels.indexOf(label) === -1)
      var promises = [
        this.__insertNewLabels(conn, labelsToAdd, sval),
        this.__increaseExistingLabels(conn, labelsToIncrease, sval),
        this.__decreaseExistingLabels(conn, labelsToDecrease),
      ]
      return Promise.all(promises)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  // update labels' hotmark when reading an article
  async __updateLabelHotmark(conn, labels, sval) {
    try {
      if (typeof labels === 'string') {
        labels = labels.split(',')
      }
      var ps = labels.map(label =>
        conn.query(`update labels set hotmark = hotmark + ? where name = ?`, [
          sval,
          label,
        ])
      )
      return Promise.all(ps)
    } catch (err) {
      return Promise.reject(err)
    }
  }

  __increasePageView(conn, id) {
    return conn.query(
      `update ${this.dbname} set pageview = pageview + 1 where id = ?`,
      [id]
    )
  }
}

module.exports = Articles
