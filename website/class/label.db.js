const mysql = require('mysql');
const configs = require('../config/base.config.js');

class Labels {
  constructor() {
    this.dbname = 'labels';
    this.dbconfig = configs.database_config;
  }

  get(succ, fail) {
    var conn = mysql.createConnection(this.dbconfig);
    var gt = new Promise((resolve, reject) => {
      conn.query(`select * from ${this.dbname}`, (err, results, fields) => {
        if (err) reject();
        resolve(results);
      })
    })
    gt.then((data) => {
      succ(data);
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