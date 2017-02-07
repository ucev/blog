const express = require('express');
const router = express.Router();
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});
const configs = require('../config/base.config');

router.get('/add', (req, res, next) => {
  res.render('editfile', { title: '添加文章'});
});

router.post('/add', (req, res, next) => {
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.connect();
  conn.query("insert into articles set ?", {title: "first",
    content: req.body.md,
    category: 0,
    addtime: 0
  }, (err, results, fields) => {
    conn.end((err) => {

    });
    res.send("succ");
  });
});

module.exports = router;
