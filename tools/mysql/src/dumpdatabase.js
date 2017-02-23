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

var __this_callback = undefined;

const conn = mysql.createConnection(configs);

/**
 * 保存数据库结构到文件
 * 也是正确流程的退出点
 */
function saveDatabaseStruct(structs) {
  var file = fs.createWriteStream(fileconfig.data + 'database.sql', {defaultEncoding: 'utf8'});
  for (let struct in structs) {
    file.write(`drop table ${struct} if exists;\n`);
    file.write(structs[struct] + ';\n');
  }
  __this_callback(false);
}

function transactionFail(funcname) {
  console.log(funcname);
  conn.rollback((err) => {
    closeConn();
  });
  /**
   * 错误流程的退出点
   */
  __this_callback(false);
}

function closeConn() {
  conn.end((err) => {
  });
}

function createDatabase() {
  conn.query(`create database ${database} character set utf8`, (err, results, fields) => {
    if (err) {
      transactionFail('createDatabase');
      return;
    }
    useDatabase();
  });
}

function useDatabase() {
  conn.query(`use ${database}`, (err, results, fields) => {
    if (err) {
      transactionFail('useDatabase');
      return;
    }
    dumpDatabase();
  });
}

function dumpDatabase() {
  var queryfield = `Tables_in_${database}`;
  conn.query(`show tables`, (err, results, fields) => {
    if (err) {
      transactionFail('dumpDatabase 1');
      return;
    }
    var tableStructs = {};
    var tbcnt = results.length;
    var current_cnt = 0;
    const lockKey = 'dump_table';
    for (let row of results) {
      var tbname = row[queryfield];
      conn.query(`show create table ${tbname}`, (err, results, fields) => {
        if (err) {
	        transactionFail('dumpDatabase 2');
	        return;
	      }
      	var row = results[0];
      	lock.writeLock(lockKey, function(cb) {
      	  tableStructs[row['Table']] = row['Create Table'];
      	  ++current_cnt;
      	  if (current_cnt == tbcnt) {
      	    closeConn();
            saveDatabaseStruct(tableStructs);
      	  }
      	  cb();
      	});
      });
    }
  });
}

/**
 * 参数为回掉函数
 * 回掉函数的参数为 boolean 值
 * 用来表明数据库的结构是否成功导出
 * 主函数执行完毕后即执行回调函数
 */
function dump(callback = undefined) {
  __this_callback = callback;
  conn.beginTransaction((err) => {
    conn.query('show databases', (err, results, fields) => {
      if (err) {
        transactionFail('beginTransaction');
        return;
      }
      var c = results.filter((row) => (row['Database'] == database));
      if (c.length == 0) {
        createDatabase();
      } else {
        useDatabase();
      }
    });
  });
}

module.exports = dump;
