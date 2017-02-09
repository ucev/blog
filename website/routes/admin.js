const express = require('express');
const router = express.Router();
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});
const configs = require('../config/base.config');

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
    conn.end((err) => {

    });
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
