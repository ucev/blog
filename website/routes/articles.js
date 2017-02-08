const express = require('express');
const router = express.Router();

const configs = require('../config/base.config');

router.get('/view/:id', (req, res, next) => {
  const id = req.params.id;
  const md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
  });
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.connect();
  conn.query("select * from articles where id = ?", [id], (err, results, fields) => {
    if (err) throw err;
    const result = results[0];
    res.render('article', {title: result.title, 
      websiteInfo: configs.website_info,
      md: md.render(result.content)}
    );
  });
});

router.get('/', (req, res, next) => {
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.connect();
  conn.query("select * from articles", (err, results, fields) => {
    if (err) throw err;
    conn.end((err) => {
    });
    res.render('article_list', {title: "文章列表", websiteInfo:configs.website_info, datas: results});
  });
});

module.exports = router;