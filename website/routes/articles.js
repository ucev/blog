const express = require('express');
const router = express.Router();

const configs = require('../config/base.config');


// 这个扩展是从网上复制过来的
Date.prototype.format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

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
    res.render('article_list', {title: "文章列表", 
      websiteInfo:configs.website_info,
      datas: results});
  });
});

module.exports = router;