const mysql = require('mysql');
const configs = require('../config/base.config.js');
const __log = require('../utils/log');

class Labels {
  constructor() {
    this.dbname = 'labels';
    this.dbconfig = configs.database_config;
    this.step = configs.query_config.step;
  }

  get({ start, orderby = { lb: 'id', asc: 'asc' } }) {
    var returnData = {
      total: 0,
      current: start,
      data: []
    };
    var conn = mysql.createConnection(this.dbconfig);
    var gc = new Promise((resolve, reject) => {
      conn.query(`select count(*) as cnt from ${this.dbname}`, (err, results, fields) => {
        if (err) reject();
        resolve(results[0].cnt);
      })
    })
    gc.then((total) => {
      returnData.total = Math.ceil(total / this.step);
    })
    var gt = new Promise((resolve, reject) => {
      start = start * configs.query_config.step;
      __log.debug(JSON.stringify(orderby));
      var sql = `select * from ${this.dbname} order by ${conn.escapeId(orderby.lb)} ${this.__queryorder(orderby.asc)} limit ?, ?`;
      __log.debug(sql);
      conn.query(sql, [/*orderby.lb, orderby.asc, */start, this.step], (err, results, fields) => {
        if (err) reject();
        resolve(results);
      })
    })
    gt.then((data) => {
      returnData.data = data;
    })
    var p = Promise.all([gc, gt]);
    return p.then(() => {
      return Promise.resolve(returnData);
    }).catch(() => {
      return Promise.reject([]);
    }).finally(() => {
      conn.end((err) => { });
    })
  }

  getall({ orderby = { lb: 'id', asc: 'asc' }, queryfields = ['*'] }) {
    var conn = mysql.createConnection(this.dbconfig);
    var ga = new Promise((resolve, reject) => {
      conn.query(`select ?? from ${this.dbname} order by ${conn.escapeId(orderby.lb)} ${this.__queryorder(orderby.asc)}`, [[queryfields]], (err, results, fields) => {
        if (err) { reject(); }
        resolve(results);
      })
    })
    return ga.then((labels) => {
      return Promise.resolve(labels);
    }).catch((err) => {
      __log.debug(err);
    }).finally(() => {
      conn.end(() => { });
    })
  }

  getNames() {
    return this.getall({}).then((labels) => {
      var l = labels.map((label) => (label.name));
      return Promise.resolve(l);
    });
  }

  __queryorder(asc) {
    return ['asc', 'desc'].includes(asc) ? asc : 'asc';
  }
}

module.exports = Labels;