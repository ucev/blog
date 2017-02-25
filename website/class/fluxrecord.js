const mysql = require('mysql');
const configs = require('../config/base.config.js');

class FluxRecord {
  constructor() {
    this.today_tbname = 'uservisit';
    this.his_tbname = 'visithistory';
    this.dbconfig = configs.database_config;
  }

  fluxOfToday(day, succ, fail) {
    var conn = mysql.createConnection(this.dbconfig);
    var fluxData, pvPerHour;
    var flux = new Promise((resolve, reject) => {
      conn.beginTransaction((err) => {
        if (err) reject();
        resolve();
      })
    })
    flux.then(() => {
      return new Promise((resolve, reject) => {
        conn.query(`select * from ${this.today_tbname} where time > ?`, [day], (err, results, fields) => {
          var pv, uv, ip;
          pv = results.length;
          var uvs = [], ips = [], _pvPerHour = [];
          for (var i = 0; i < 24; i++) {
            _pvPerHour[i] = 0;
          }
          results.forEach((row) => {
            _pvPerHour[Math.ceil((row.time - day) / 3600)]++;
            if (uvs.indexOf(row.uv) == -1) {
              uvs.push(row.uv);
            }
            if (ips.indexOf(row.ip) == -1) {
              ips.push(row.ip);
            }
          })
          uv = uvs.length;
          ip = ips.length;
          fluxData = {pv: pv, uv: uv, ip: ip};
          pvPerHour = _pvPerHour;
          resolve();
        })
      })
    }).then(() => {
      return new Promise((resolve, reject) => {
        conn.query(`select count(*) from ${this.his_tbname} where date = ?`,
          [day], (err, results, fields) => {
            resolve(results.length != 0);
          }
        )
      })
    }).then((exists) => {
      var querysql, querydata;
      if (!exists) {
        querysql = `insert into visithistory set ?`;
        fluxData.date = day;
        querydata = fluxData;
      } else {
        querysql = `update visithistory set ? where date = ?`;
        querydata = [fluxData, day];
      }
      return new Promise((resolve, reject) => {
        conn.query(querysql, querydata, (err, results, fields) => {
          if (err) reject();
          resolve();
        })
      })
    }).then(() => {
      conn.commit((err) => {
        if (err) {throw err;return};
        conn.end((err) => {});
        var returnVal = fluxData;
        returnVal.pvPerHour = pvPerHour;
        succ(returnVal);
      })
    }).catch((err) => {
      conn.rollback((err) => {
        conn.end((err) => {});
      })
    })
  }

  visit(datas) {
    var usercookie = datas.usercookie;
    var ip = datas.ip;
    var time = datas.time;
    var conn = mysql.createConnection(this.dbconfig);
    var visit = new Promise((resolve, reject) => {
      conn.query(`insert into ${this.today_tbname} set ?`, {
          usercookie: usercookie, ip: ip, time: time
        }, (err, results, fields) => {
          resolve();
        }
      )
    })
    visit.finally(() => {
      conn.end((err) => {});
    })
  }
}

module.exports = FluxRecord;