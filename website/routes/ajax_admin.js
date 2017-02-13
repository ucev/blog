const express = require('express');
const router = express.Router();
const configs = require('../config/base.config');

function strToNum(str) {
  var a = Number(str);
  return isNaN(a) ? 0 : a;
}

function emptyString(str) {
  console.log('-----------str start');
  //str = str.trim();
  console.log('str: ' + str);
  var str =  (str === null || str === undefined) ? '' : str.trim();
  return (str === '' || str === '-1') ? '' : str;
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
          res.json({code: 0, msg: '更新成功', data: row});
          conn.end((err) => {

          });
        }
      );
    }
  );
});

router.get('/articles/get', (req, res, next) => {
  const current = strToNum(req.query.start);
  const start = current * configs.query_config.step;
  const state = emptyString(req.query.state);
  const category = strToNum(emptyString(req.query.category));
  const label = emptyString(req.query.label);
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  var wheres = ' where 1';
  var whereArgs = [];
  if ( state || category || label) {
    if (state) {
      wheres += ' AND state = ?';
      whereArgs.push(state);
     }
    if (category) {
      wheres += ' AND category = ?';
      whereArgs.push(category);
    }
    if (label) {
      wheres += ' AND label = ?';
      whereArgs.push(label);
    }
  }
  conn.query('select count(*) as total from articles' + wheres, whereArgs, (err, results, fields) => {
    const total = Math.ceil((results[0]['total'] + 1)/ configs.query_config.step);
    var sql = 'select id, title, category, label, state, top, pageview from articles ';
    sql += wheres;
    sql += ' limit ?, ?';
    conn.query(sql, [...whereArgs, start, configs.query_config.step], (err, results, fields) => {
        res.json({code: 0, msg: '获取成功', data: {
          total: total,
          current: current,
          data: results
        }});
        conn.end((err) => {

        });
      }
    );
  });
});

router.get('/photogroup/get', (req, res, next) => {
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.query('select id, name, count from photogroups order by id asc', (err, results, fields) => {
    res.json({
      code: 0,
      msg: '获取成功',
      data: results
    });
    conn.end((err) => {

    });
  });
});

router.get('/photogroup/modify', (req, res, next) => {
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  const groupname = req.query.groupname;
  const addtime = Math.floor((new Date().getTime()) / 1000);
  conn.query('insert into photogroups set ?', {
    name: groupname,
    addtime: addtime
  }, (err, results, fields) => {
    res.json({
      code: 0,
      msg: '更新成功'
    });
    conn.end((err) => {

    });
  });
});

module.exports = router;