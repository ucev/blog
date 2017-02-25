/**
 * 没有创建数据库的语句
 */
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

const createDatabaseSql = `create database ${database} character set utf8mb4 collate utf8mb4_unicode_ci`;

var __this_callback = undefined;

const conn = mysql.createConnection(configs);

/**
 * 保存数据库结构到文件
 * 也是正确流程的退出点
 */
function saveDatabaseStruct(structs) {
  return new Promise((resolve, reject) => {
    var file = fs.createWriteStream(fileconfig.data + 'database.sql', {defaultEncoding: 'utf8'});
    file.write(`create database if not exists ${database} character set utf8mb4 collate utf8mb4_unicode_ci;\n`);
    file.write(`alter database ${database} character set utf8mb4 collate utf8mb4_unicode_ci;\n`);
    file.write(`use ${database};\n`)
    for (let struct in structs) {
      file.write(`drop table if exists ${struct};\n`);
      file.write(structs[struct] + ';\n');
    }
    resolve(true);
  })
}

function dumpDatabase() {
  return new Promise((resolve, reject) => {
    var queryfield = `Tables_in_${database}`;
    conn.query(`show tables`, (err, results, fields) => {
      if (err) {
        reject(err);
      }
      var tableStructs = {};
      var tbcnt = results.length;
      var current_cnt = 0;
      const lockKey = 'dump_table';
      for (let row of results) {
        var tbname = row[queryfield];
        conn.query(`show create table ${tbname}`, (err, results, fields) => {
          if (err) {
            reject(err);
  	      }
        	var row = results[0];
        	lock.writeLock(lockKey, function(cb) {
        	  tableStructs[row['Table']] = row['Create Table'];
      	    ++current_cnt;
        	  cb();
      	    if (current_cnt == tbcnt) {
              resolve(tableStructs);
        	  }
        	});
        });
      }
    });
  });
}

function start() {
  const transac = new Promise((resolve, reject) => {
    conn.beginTransaction((err) => {
      conn.query('show databases', (err, results, fields) => {
        if (err) {
          reject(err);
        }
        var c = results.filter((row) => (row['Database'] == database));
        resolve(c.length == 0);
      });
    });
  });
  transac.then((createDatabase) => {
      return new Promise((resolve, reject) => {
        if (createDatabase) {
          conn.query(createDatabaseSql, (err, results, fields) => {
            if (err) {
              reject(err);
            }
            resolve();
          });
        } else {
          resolve();
        }
      })
    }).then(() => {
      return new Promise((resolve, reject) => { 
        conn.query(`use ${database}`, (err, results, fields) => {
          if (err) {
            reject(err);
          }
          resolve();
        });
      })
    }).then(() => {
      return dumpDatabase();
    }).then((tableStructs) => {
      return saveDatabaseStruct(tableStructs);
    }).then((succ) => {
      return new Promise((resolve, reject) => {
        conn.commit((err) => {
          if (err) {
            reject(err);
          }
          resolve(succ);
        })
      });
    }).then((succ) => {
      conn.end((err) => {});
      __this_callback(succ);
    }).catch((e) => {
      conn.rollback((err) => {
      })
    });
}

function enterpos(callback) {
  __this_callback = callback;
  start();
}

module.exports = enterpos; 