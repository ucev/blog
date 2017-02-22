const mysql = require('mysql');
const fs = require('fs');
const _configs = require(__dirname + '/configs');
const dbconfig = _configs.dbconfig;
const fileconfig = _configs.fileconfig;

//const conn = mysql.createConnection(dbconfig);

const ReadWriteLock = require('rwlock');
const lock = new ReadWriteLock();

var __this_callback = undefined;

function transactionFail(funcname, conn) {
  console.log(funcname);
  conn.rollback((err) => {
    conn.end((err) => {

    });
  })
  console.log('fail');
}

/**
 * 
 */
function addData(tbname, datas) {
  var conn = mysql.createConnection(dbconfig);
  var datalength = datas.length;
  var curlength = 0;
  for (let data of datas) {
    lock.writeLock(tbname, function(cb) {
      var dt = data;
      conn.query(`insert into ${tbname} set ?`, [dt], (err, results, fields) => {
        if (err) {
          transactionFail(addData);
          return;
        }
        ++curlength;
        if (curlength == datalength) {
          conn.commit((err) => {
            if (err) {
              transactionFail('addData 2', conn);
              return;
            }
            conn.end((err) => {

            });
          })
        }
        cb();
      })
    })
  }
}

function addDatas(tableDatas) {
  for (let tbname in tableDatas) {
    addData(tbname, tableDatas[tbname]);
  }
}

function readfile(callback = undefined) {
  __this_callback = callback;
  var file = fs.createReadStream(fileconfig.data + 'tabledatas.json', {encoding: 'utf8'});
  var data = '';
  file.on('data', (chunk) => {
    data += chunk;
  })
  file.on('end', () => {
    console.log('end');
    var tableDatas = JSON.parse(data);
    addDatas(tableDatas);
  })
}

module.exports = readfile;