const mysql = require('mysql');
const fs = require('fs');
const _configs = require(__dirname + '/configs');
const dbconfig = _configs.dbconfig;
dbconfig.multipleStatements = true;
const fileconfig = _configs.fileconfig;
const conn = mysql.createConnection(dbconfig);
var filedata = '';

function importstruct(callback) {
  const file = fs.createReadStream(fileconfig.data + 'database.sql', {encoding: 'utf8'});
  file.on('data', (chunk) => {
    filedata += chunk;
  });
  file.on('end', () => {
  conn.connect((err) => {
      conn.query(filedata, (err, results, fields) => {
        if (err) {
          console.log(err);
        } else {
          console.log("succ");
          //
          callback();
        }
        conn.end((err) => {

        });
      })
    })
  })
}

module.exports = importstruct;