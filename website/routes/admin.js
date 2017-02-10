const express = require('express');
const router = express.Router();
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});
const configs = require('../config/base.config');

function errorResponde(res, conn) {
    conn.rollback(() => {
      res.json({code: 1, msg: '添加失败'});
      conn.end((err) => {

      });
    });
}

function updateLabels(res, conn, addval, labels, ord = 0) {
  if (ord >= labels.length) {
    conn.commit((err) => {
      if (err) {
        errorResponde(res, conn);
        return;
      }
      res.json({code: 0, msg: '添加成功'});
    });
    conn.end((err) => {

    });
    return;
  }
  let label = labels[ord];
  conn.query('select * from labels where ? ', {name: label}, (err, results, fields) => {
    if (err) {
      errorResponde(res, conn);
      return;
    }
    if (results.length > 0) {
      let hotmark = results[0].hotmark + addval;
      let articles = results[0].articles + 1;
      conn.query('update labels set hotmark = ?, articles = ? where name = ?', 
        [hotmark, articles, label],
        (err, results, fields) => {
          if (err) {
            errorResponde(res, conn);
            return;
          }
          updateLabels(res, conn, addval, labels, ord + 1);
        }
      );
    } else {
      let hotmark = addval;
      let articles = 1;
      let addtime = Math.floor(new Date().getTime() / 1000);
      conn.query('insert into labels set ?', 
        {name: label, articles: articles, hotmark: hotmark, addtime: addtime},
        (err, results, fields) => {
          if (err) {
            errorResponde(res, conn);
            return;
          }
          updateLabels(res, conn, addval, labels, ord + 1);
        }
      );
    }
  });
}

router.get('/add', (req, res, next) => {
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.connect();
  conn.query('select name from labels', (err, results, fields) => {
    var labels = results.map((row) => (row.name));
    res.render('admin/article_edit', {
      title: '添加文章',
      labels: JSON.stringify(labels)
    });
    conn.end((err) => {

    });
  });
});

router.post('/add', (req, res, next) => {
  var content = req.body.md.trim();
  var label = req.body.label;
  var h1 = content.substring(0, content.indexOf('\n')).trim();
  var title = h1.split(/\s+/)[1];
  var addtime = Math.floor(new Date().getTime() / 1000);
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.connect();
  conn.beginTransaction((err) => {
    conn.query("insert into articles set ?", {
      title: title,
      content: content,
      category: 0,
      label: label,
      addtime: addtime
    }, (err, results, fields) => {
      if (err) return;
      updateLabels(res, conn, configs.label_hotmark_rule.add, label.split(','));
    });
  });
});

router.get('/login', (req, res, next) => {
  res.render('admin/login', {
    title: '登陆'
  });
});

router.get('/', (req, res, next) => {
  res.render('admin/index', {
    title: '后台首页'
  });
});

module.exports = router;
