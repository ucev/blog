const mysql = require('promise-mysql');
const configs = require('../config/base.config.js');
const ReadWriteLock = require('rwlock');
const __log = require('../utils/log');

const RECOUNT_ARTICLE_GROUP_SQL = `
            update categories as ct
            left join
            (select category, count(*) as cnt from articles group by category) as cp
            on ct.id = cp.category
            set ct.articlecnt = if(isnull(cp.cnt), 0, cp.cnt)
`;

class Articles {
  constructor() {
    this.dbname = 'articles';
    this.dbconfig = configs.database_config;
    this.step = configs.query_config.step;
    this.lock = new ReadWriteLock();
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
        category: 0 // 默认值
      }
      return this.__add(dt);
    } else {
      var id = datas.id;
      var dt = {
        content: datas.content,
        title: datas.title,
        descp: datas.descp,
        label: datas.label,
        modtime: datas.modtime,
      }
      return this.__modify(id, dt);
    }
  }

  async delete(ids) {
    var targetLabel = '';
    var conn = await mysql.createConnection(this.dbconfig);
    try {
      await conn.beginTransaction()
      await this.__updateLabelsOnDeleteArticle(conn, ids)
      await conn.query(`delete from ${this.dbname} where id in ?`, [[ids]])
      await conn.commit()
      conn.end()
      return Promise.resolve()
    } catch (err) {
      await conn.rollback()
      conn.end()
      return Promise.reject(err)
    }
  }

  async getsingle({ id = 0, queryfields } = {}) {
    queryfields = queryfields ? queryfields : ['*'];
    var conn = await mysql.createConnection(this.dbconfig);
    try {
      var results = await conn.query(`select ?? from ${this.dbname} where id = ?`, [queryfields, id])
      var article = results[0]
      conn.end()
      return Promise.resolve(article)
    } catch (err) {
      conn.end()
      return Promise.reject(err)
    }
  }

  async getByCond({ where = {}, start = 0, client = true, queryfields = ['*'] } = {}) {
    var conn = await mysql.createConnection(this.dbconfig)
    var returnData = {
      total: 0,
      current: start,
      data: []
    };
    var whereArgs = [];
    var whereSql = '';
    // 对模糊搜索的支持
    if ('args' in where) {
      var escapedVal = conn.escape(`%${where['args']}%`);
      whereSql += (` AND (title like ${escapedVal} or label like ${escapedVal})`);
    } else {
      for (let key in where) {
        if (key == 'label') {
          var s = (` AND ${conn.escapeId(key)} like ` + conn.escape(`%${where[key]}%`));
          whereSql += s;
        } else {
          whereSql += (' AND ' + conn.escapeId(key) + ' = ?');
          whereArgs.push(where[key]);
        }
      }
    }
    if (client) {
      whereSql += (` AND state = 'on' `);
    }
    try {
      var results = await conn.query(`select count(*) as cnt from articles where 1 ${whereSql}`, [...whereArgs])
      var totalcnt = results[0].cnt
      returnData.total = Math.ceil(totalcnt / this.step)
      var data = await conn.query(`select ?? from ${this.dbname} where 1 ${whereSql} order by id desc limit ?, ?`, [queryfields, ...whereArgs, start * this.step, this.step])
      returnData.data = data;
      conn.end()
      return Promise.resolve(returnData)
    } catch (err) {
      conn.end()
      return Promise.reject(err)
    }
  }

  async getall() {
    var conn = await mysql.createConnection(this.dbconfig);
    try {
      var arts = await conn.query(`select title, content from ${this.dbname} order by id asc`)
      conn.end()
      return Promise.resolve(arts)
    } catch (err) {
      conn.end()
      return Promise.reject()
    }
  }

  async move(ids, gid) {
    var conn = await mysql.createConnection(this.dbconfig);
    try {
      await conn.beginTransaction()
      await conn.query(`update ${this.dbname} set category = ? where id in ?`, [gid, [ids]])
      await conn.query(RECOUNT_ARTICLE_GROUP_SQL)
      await conn.commit()
      conn.end()
      return Promise.resolve()
    } catch (err) {
      await conn.rollback()
      conn.end()
      return Promise.reject()
    }
  }

  async updateState(ids, state) {
    var conn = await mysql.createConnection(this.dbconfig);
    try {
      await conn.query(`update ${this.dbname} set state = ? where id in ?`, [state, [ids]])
      conn.end()
      return Promise.resolve()
    } catch (err) {
      conn.end()
      return Promise.reject()
    }
  }

  async updateOrder({ id, ord }) {
    if (Number(ord) < 0) {
      return Promise.reject();
    }
    var conn = await mysql.createConnection(this.dbconfig);
    try {
      await conn.query(`update ${this.dbname} set suborder = ? where id = ?`, [ord, id])
      conn.end()
      return Promise.resolve()
    } catch (err) {
      conn.end()
      return Promise.resolve()
    }
  }

  async view(id) {
    var conn = await mysql.createConnection(this.dbconfig);
    try {
      var results = await conn.query(`select * from ${this.dbname} where id = ?`, [id])
      var article = results[0]
      var labels = article.label;
      var uplabel = this.__updateLabels(conn, labels, configs.label_hotmark_rule.view);
      var uppv = this.__increasePageView(conn, id);
      await Promise.all([uplabel, uppv]);
      conn.end()
      return Promise.resolve(article)
    } catch (err) {
      conn.end()
      return Promise.reject(err)
    }
  }

  async __add(datas) {
    var conn = await mysql.createConnection(this.dbconfig);
    try {
      await conn.beginTransaction()
      await conn.query(`insert into ${this.dbname} set ?`, [datas])
      await this.__updateLabels(conn, datas.label, configs.label_hotmark_rule.add, true, true);
      await conn.commit()
      conn.end()
      return Promise.resolve()
    } catch (err) {
      await conn.rollback()
      conn.end()
      return Promise.reject()
    }
  }

  async __modify(id, datas) {
    var oldLabels = [];
    var conn = await mysql.createConnection(this.dbconfig);
    try {
      await conn.beginTransaction()
      var results = await conn.query(`select label from ${this.dbname} where id = ?`, [id])
      oldLabels = results[0].label.split(',');
      await conn.query(`update ${this.dbname} set ? where id = ?`, [datas, id])
      await this.__updateLabels(conn, datas.label, configs.label_hotmark_rule.add, false, true, oldLabels);
      await conn.commit()
      conn.end()
      return Promise.resolve()
    } catch (err) {
      await conn.rollback()
      conn.end()
      return Promise.reject()
    }
  }

  async __updateLabelsOnDeleteArticle(conn, ids) {
    try {
      var results = await conn.query(`select label from ${this.dbname} where id in ?`, [[ids]])
      var labelObj = {};
      var labels = [].concat(...(results.map((row) => (row.label.split(',')))));
      labels.forEach((label) => {
        if (label in labelObj) {
          labelObj[label] += 1;
        } else {
          labelObj[label] = 1;
        }
      })
      labels = Object.getOwnPropertyNames(labelObj)
      var ps = labels.map((label) => {
        var data = labelObj[label]
        return conn.query(`update labels set articles = if (articles - ? > 0, articles - ?, 0) where name = ?`, [data, data, label])
      })
      return Promise.all(ps);
    } catch (err) {
      return Promise.reject()
    }
  }

  async __insertNewLabels(conn, labels, sval, /*是否报告错误*/isRej) {
    labels = labels.filter((label) => {
      return label.trim() != '';
    })
    var len = labels.length;
    if (len == 0) {
      return Promise.resolve()
    }
    var sql = 'insert into labels(name, hotmark, addtime) values '
    var addtime = Math.floor(new Date().getTime() / 1000)
    var tip = '(?, ' + conn.escape(sval) + ', ' + conn.escape(addtime) + ')';
    for (var i = 0; i < len - 1; i++) {
      sql += tip + ',';
    }
    sql += tip;
    try {
      await conn.query(sql, labels)
      return Promise.resolve()
    } catch (err) {
      return Promise.reject()
    }
  }

  async __updateExistingLabels(conn, labels, sval, /*是否报告错误*/isRej) {
    if (labels.length == 0) {
      return Promise.resolve()
    }
    try {
      await conn.query('update labels set hotmark = hotmark + ? where name in ?', [sval, [labels]])
      return Promise.resolve()
    } catch (err) {
      return Promise.reject()
    }
  }

  // 需要再详查
  async __updateLabels(conn, labels, sval, /*是否更新已经存在的标签*/upOld = true, /*是否产生错误*/isRej = false, /*更新之前的label*/oldLabels = []) {
    try {
      var results = await conn.query(`select name from labels`)
      var _eLabels = results.map((label) => (label.name));
      if (labels == '' || labels == undefined) {
        return Promise.resolve()
      }
      if (typeof labels == 'string')
        labels = labels.split(',');
      var labelsNew = [],
        labelsExists = [],    // label 存在，且 article 没有这个label 
        labelsExistsOld = []; // label 存在，且 article 有这个 label 
      labels.forEach((label) => {
        if (_eLabels.indexOf(label) == -1) {
          labelsNew.push(label);
        } else if (oldLabels.indexOf(label) == -1) {
          labelsExists.push(label);
        } else {
          labelsExistsOld.push(label);
        }
      })
      var promises = [];
      // 插入新标签
      promises.push(this.__insertNewLabels(conn, labelsNew, sval, isRej));
      promises.push(this.__updateExistingLabels(conn, labelsExists, sval, isRej));
      if (upOld) {
        promises.push(this.__updateExistingLabels(conn, labelsExistsOld, sval, isRej));
      }
      return Promise.all(promises);
    } catch (error) {
      return Promise.reject(error)
    }
  }

  __increasePageView(conn, id) {
    return conn.query(`update ${this.dbname} set pageview = pageview + 1 where id = ?`, [id])
  }
}

module.exports = Articles;