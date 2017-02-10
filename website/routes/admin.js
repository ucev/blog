const express = require('express');
const router = express.Router();
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});
const configs = require('../config/base.config');

function updateLabels(conn, labels, ord = 0) {
  if (ord >= labels.length) {
    conn.end((err) => {

    });
    return;
  }
  let label = labels[ord];
  conn.query('select * from labels where ? ', {name: label}, (err, results, fields) => {
    if (results.length > 0) {
      let hotmark = results[0].hotmark + configs.label_hotmark_rule;
      let articles = results[0].articles + 1;
      conn.query('update labels set hotmark = ? where name = ?', 
        [homark, articles],
        (err, results, fields) => {
          updateLabels(conn, labels, ord + 1);
        }
      );
    } else {
      let hotmark = configs.label_hotmark_rule.add;
      let articles = 1;
      let addtime = Math.floor(new Date().getTime() / 1000);
      conn.query('insert into labels set ?', 
        {name: label, articles: articles, hotmark: hotmark, addtime: addtime},
        (err, results, fields) => {
          updateLabels(conn, labels, ord + 1);
        }
      );
    }
  });
}

router.get('/add', (req, res, next) => {
  res.render('admin/article_edit', { title: '添加文章'});
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
  conn.query("insert into articles set ?", {
    title: title,
    content: content,
    category: 0,
    label: label,
    addtime: addtime
  }, (err, results, fields) => {
    // 此处没有transaction，因为我对何种负荷下会出现更新错误不清楚
    updateLabels(conn, label.split(','));
    res.send("succ");
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
