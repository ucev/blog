const express = require('express');
const router = express.Router();
const configs = require('../config/base.config');


router.get('/articles/get', (req, res, next) => {
  var a = Number(req.query.start);
  const start = isNaN(a) ? 0 : a;
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.query('select id, title, category, label, state, top, pageview from articles', 
    (err, results, fields) => {
      res.json({code: 0, msg: '获取成功', data: results});
      conn.end((err) => {

      });
    }
  );
});

module.exports = router;