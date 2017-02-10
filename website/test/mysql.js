const configs = require('../config/base.config');
const mysql = require('mysql');
const conn = mysql.createConnection(configs.database_config);
conn.connect();
conn.query('select name from labels', (err, results, fields) => {
  console.log(results);
  let labels = results.map((r) => (r.name));
  console.log(labels);
  conn.end((err) => {

  });
});