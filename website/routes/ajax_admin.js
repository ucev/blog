const express = require('express');
const router = express.Router();
const configs = require('../config/base.config');

function strToNum(str) {
  var a = Number(str);
  return isNaN(a) ? 0 : a;
}

router.get('/articles/modify', (req, res, next) => {
  const id = strToNum(req.query.id);
  const state = req.query.state;
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.query('update articles set state = ? where id = ?', [state, id],
    (err, results, fields) => {
      conn.query('select id, title, category, label, state, top, pageview from articles where id = ?',
        [id],
        (err, results, fields) => {
          var row = results.length > 0 ? results[0] : {};
          res.json(row);
          conn.end((err) => {

          });
        }
      );
    }
  );
});

router.get('/articles/get', (req, res, next) => {
  const start = strToNum(req.query.start);
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.query('select id, title, category, label, state, top, pageview from articles limit ?, ?',
    [start, configs.query_config.step],  
    (err, results, fields) => {
      res.json({code: 0, msg: '获取成功', data: results});
      conn.end((err) => {

      });
    }
  );
});

module.exports = router;