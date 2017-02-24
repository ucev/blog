const express = require('express');
const router = express.Router();
const ReadWriteLock = require('rwlock');
const lock = new ReadWriteLock();

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

function updateLabels(labels, conn) {
  if (labels == '') {
    conn.end((err) => {});
    return;
  }
  labels = labels.split(',');
  var cnt = labels.length;
  var curpos = 0;
  const lockKey = "LABEL";
  labels.forEach((label) => {
    conn.query('update labels set hotmark = hotmark + ? where name = ?', [configs.label_hotmark_rule.view, label],
    (err, results, fields) => {
        lock.writeLock(lockKey, function(cb) {
          curpos++;
          if (curpos >= cnt) {
            conn.end((err) => {});
          }
        })
      }
    )
  })
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
    if (err) {}
    const result = results[0];
    const labels = result.label;
    conn.query("update articles set pageview = pageview + 1 where id = ?", [id], (err, results, fields) => {
        updateLabels(labels, conn);
      }
    )
    res.render('article', {title: result.title, 
        websiteInfo: configs.website_info,
        aid: result.id,
        md: md.render(result.content),
        debug: configs.website_info.debug
      }
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