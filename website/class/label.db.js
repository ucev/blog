const mysql = require('promise-mysql');
const configs = require('../config/base.config.js');
const __log = require('../utils/log');

class Labels {
  constructor() {
    this.dbname = 'labels';
    this.dbconfig = configs.database_config;
    this.step = configs.query_config.step;
  }

  async get({ start, orderby = { lb: 'id', asc: 'asc' } }) {
    var returnData = {
      total: 0,
      current: start,
      data: []
    };
    var conn = await mysql.createConnection(this.dbconfig);
    try {
      var results = await conn.query(`select count(*) as cnt from ${this.dbname}`)
      var lcnt = results[0].cnt
      returnData.total = Math.ceil(lcnt / this.step)
      start = start * configs.query_config.step
      var sql = `select * from ${this.dbname} order by ${conn.escapeId(orderby.lb)} ${this.__queryorder(orderby.asc)} limit ?, ?`;
      var data = await conn.query(sql, [/*orderby.lb, orderby.asc, */start, this.step])
      returnData.data = data;
      conn.end()
      return Promise.resolve(returnData);
    } catch (err) {
      conn.end()
      return Promise.reject(err)
    }
  }

  async getall({ orderby = { lb: 'id', asc: 'asc' }, queryfields = ['*'] }) {
    var conn = mysql.createConnection(this.dbconfig);
    try {
      var labels = await conn.query(`select ?? from ${this.dbname} order by ${conn.escapeId(orderby.lb)} ${this.__queryorder(orderby.asc)}`, [[queryfields]])
      conn.end()
      return Promise.resolve(labels);
    } catch (err) {
      conn.end()
      return Promise.reject()
    }
  }

  getNames() {
    try {
      return this.getall({}).then((labels) => {
        var l = labels.map((label) => (label.name));
        return Promise.resolve(l);
      });
    } catch (err) {
      return Promise.resolve([])
    }
  }

  __queryorder(asc) {
    return ['asc', 'desc'].includes(asc) ? asc : 'asc';
  }
}

module.exports = Labels;