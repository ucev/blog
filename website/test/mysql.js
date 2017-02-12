const configs = require('../config/base.config');
const mysql = require('mysql');
const conn = mysql.createConnection(configs.database_config);
conn.connect();
conn.query('select count(*) as cnt from articles', (err, results, fields) => {
  console.log(results);
  conn.end((err) => {

  });
});