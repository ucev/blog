const mysql = require('promise-mysql');
const configs = require('../config/base.config.js');

class FluxRecord {
  constructor() {
    this.today_tbname = 'uservisit';
    this.his_tbname = 'visithistory';
    this.dbconfig = configs.database_config;
  }

  async fluxOfToday(day) {
    try {
      var fluxData, pvPerHour;
      var conn = await mysql.createConnection(this.dbconfig)
      await conn.beginTransaction()
      var results = await conn.query(`select * from ${this.today_tbname} where time > ?`, [day])
      var pv, uv, ip
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
      fluxData = { pv: pv, uv: uv, ip: ip };
      pvPerHour = _pvPerHour;
      var datecnt = await conn.query(`select count(*) from ${this.his_tbname} where date = ?`,
          [day])
      var querysql, querydata
      if (datacnt.length == 0) {
        querysql = `insert into visithistory set ?`;
        fluxData.date = day;
        querydata = fluxData;
      } else {
        querysql = `update visithistory set ? where date = ?`;
        querydata = [fluxData, day];
      }
      await conn.query(querysql, querydata)
      await conn.commit()
      conn.end()
      var returnVal = fluxData
      returnVal.pvPerHour = pvPerHour
      return Promise.resolve(returnVal)
    } catch (err) {
      if (conn) {
        await conn.rollback()
        conn.end()
      }
      return Promise.reject(err)
    }
  }

  async visit(datas) {
    try {
      var usercookie = datas.usercookie;
      var ip = datas.ip;
      var time = datas.time;
      var conn = await mysql.createConnection(this.dbconfig);
      await conn.query(`insert into ${this.today_tbname} set ?`, {
              usercookie: usercookie,
              ip: ip,
              time: time
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
}

module.exports = FluxRecord;