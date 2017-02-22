const mysql = require('mysql');
const fs = require('fs');
const ReadWriteLock = require('rwlock');
const lock = new ReadWriteLock();
const _configs = require(__dirname + '/configs');
const dbconfig = _configs.dbconfig;
const fileconfig = _configs.fileconfig;
const configs = {
  host: dbconfig.host,
  user: dbconfig.user,
  password: dbconfig.password
};
const database = dbconfig.database;
const conn = mysql.createConnection(configs);
var __this_callback = undefined;

function transactionFail(funcname) {
  console.log(funcname);
  conn.rollback((err) => {
    conn.end((err) => {
    });
  });
}

function saveToFile(datas) {
  var file = fs.createWriteStream(fileconfig.data + 'tabledatas.json', {defaultEncoding: 'utf8'});
  file.write(JSON.stringify(datas));
  __this_callback();
}

function useDatabase() {
  conn.query(`use ${database}`, (err, results, fields) => {
    if (err) {
      transactionFail('useDatabase');
      return;
    }
    dumpTableData();
  })
}

function dumpTableData() {
  var queryfield = `Tables_in_${database}`;
  conn.query(`show tables`, (err, results, fields) => {
    if (err) {
      transactionFail('dumpTableData 1');
      return;
    }
    var datas = {};
    var tbnames = [];
    var tablecnt = results.length;
    var curpos = 0;
    const lockKey = "table_data";
    for (let row of results) {
      var _tbname = row[queryfield];
      lock.writeLock(lockKey, function(cb) {
        var tbname = _tbname;
        conn.query(`select * from ${tbname}`, (err, results, fields) => {
          if (err) {
            transactionFail('dumpTableData 2');
            return;
          }
          datas[tbname] = results;
          ++curpos;
          if (curpos == tablecnt) {
            saveToFile(datas);
            conn.commit((err) => {
              if (err) {
                transactionFail('dumpTableData 3');
                return;
              }
              conn.end((err) => {
              })
            })
          }
        })
        cb();
      })
    }
  })
}

function dumpdata(callback = undefined) {
  __this_callback = callback;
  conn.beginTransaction((err) => {
    if (err) {
      transactionFail('dumpdata 1');
      return;
    }
    conn.query('show databases', (err, results, fields) => {
      if (err) {
        transactionFail('dumpdata 2');
        return;
      }
      var f = results.filter((row) => (row['Database'] == database));
      if (f.length == 0) {
        transactionFail('dumpdata 3');
        return;
      }
      useDatabase();
    })
  });
}

module.exports = dumpdata;