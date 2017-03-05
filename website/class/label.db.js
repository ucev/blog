const mysql = require('mysql');
const configs = require('../config/base.config.js');
const __log = require('../utils/log');

class Labels {
  constructor() {
    this.dbname = 'labels';
    this.dbconfig = configs.database_config;
    this.step = configs.query_config.step;
  }

  get({start, orderby = {lb: 'id', asc: 'asc'}}, succ, fail) {
    var returnData = {
      total: 0,
      current: start,
      data: []
    };
    if (!['asc', 'desc'].includes(orderby.asc)) {
      orderby.asc = 'asc';
    }
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
      var sql = `select * from ${this.dbname} order by ${conn.escapeId(orderby.lb)} ${orderby.asc} limit ?, ?`;
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
    p.then(() => {
      succ(returnData);
    }).catch(() => {
      fail([]);
    }).finally(() => {
      conn.end((err) => {});
    })
  }

  getNames(succ, fail) {
    this.get(
      function(labels) {
        var l = labels.map((label) => (label.name));
        succ(l);
      },
      fail
    )
  }
}

module.exports = Labels;