const express = require('express');
const router = express.Router();
const enterControl = require('./entercontrol');
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});
const configs = require('../config/base.config');

function transactionError(res, conn) {
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
        transactionError(res, conn);
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
      transactionError(res, conn);
      return;
    }
    if (results.length > 0) {
      let hotmark = results[0].hotmark + addval;
      let articles = results[0].articles + 1;
      conn.query('update labels set hotmark = ?, articles = ? where name = ?', 
        [hotmark, articles, label],
        (err, results, fields) => {
          if (err) {
            transactionError(res, conn);
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
            transactionError(res, conn);
            return;
          }
          updateLabels(res, conn, addval, labels, ord + 1);
        }
      );
    }
  });
}

router.get('/articles', (req, res, next) => {
  res.render('admin/articles', {
    title: '文章管理',
    avatar: req.session.avatar
  });
});

router.get('/photos', (req, res, next) => {
  res.render('admin/photos', {
    title: '照片管理',
    avatar: req.session.avatar
  });
});

router.get('/labels', (req, res, next) => {
  res.render('admin/labels', {
    title: '标签管理',
    avatar: req.session.avatar
  });
});

router.get('/categories', (req, res, next) => {
  res.render('admin/categories', {
    title: '类别管理',
    avatar: req.session.avatar
  })
});

router.get('/articles/add', (req, res, next) => {
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.connect();
  conn.query('select name from labels', (err, results, fields) => {
    var labels = results.map((row) => (row.name));
    res.render('admin/article_edit', {
      title: '添加文章',
      avatar: req.session.avatar,
      labels: JSON.stringify(labels)
    });
    conn.end((err) => {

    });
  });
});

router.post('/articles/add', (req, res, next) => {
  var content = req.body.md.trim();
  var descp = req.body.descp;
  var label = req.body.label;
  var h1 = content.substring(0, content.indexOf('\n')).trim();
  var title = h1.split(/\s+/).slice(1).join(' ');
  var addtime = Math.floor(new Date().getTime() / 1000);
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.connect();
  conn.beginTransaction((err) => {
    conn.query("insert into articles set ?", {
      title: title,
      content: content,
      descp: descp,
      category: 0,
      label: label,
      addtime: addtime,
      modtime: addtime
    }, (err, results, fields) => {
      if (err) {
        transactionError(res, conn);
        return;
      }
      updateLabels(res, conn, configs.label_hotmark_rule.add, label.split(','));
    });
  });
});

router.get('/articles/modify', (req, res, next) => {
  var id = Number(req.query.id);
  if (isNaN(id)) {
    res.redirect('/admin');
  } else {
    const mysql = require('mysql');
    const conn = mysql.createConnection(configs.database_config);
    conn.query('select * from articles where id = ?', [id],
      (err, results, fields) => {
        if (results.length > 0) {
          const row = results[0];
          const content = row.content;
          const current_labels = row.label;
          conn.query('select name from labels', (err, results, fields) => {
            var labels = results.map((r) => (r.name));
            res.render('admin/article_edit', {
              title: '修改文章',
              avatar: req.session.avatar,
              type: 'edit',
              id: id,
              content: encodeURIComponent(content),
              labels: JSON.stringify(labels),
              current_labels: current_labels
            });
            conn.end((err) => {
            });
          });
        } else {
          res.redirect('/admin');
        }
      }
    );
  }
});

router.post('/articles/modify', (req, res, next) => {
  var content = req.body.md.trim();
  var descp = req.body.descp;
  var label = req.body.label;
  var id = req.body.id;
  var h1 = content.substring(0, content.indexOf('\n')).trim();
  var title = h1.split(/\s+/).slice(1).join(' ');
  var modtime = Math.floor(new Date().getTime() / 1000);
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.connect();
  conn.beginTransaction((err) => {
    conn.query('update articles set title = ?, content = ?, descp = ?, label = ?, modtime = ? where id = ?', 
      [title, content, descp, label, modtime, id],
      (err, results, fields) => {
        if (err) {
          console.log(err);
          transactionError(res, conn);
          return;
        }
        updateLabels(res, conn, configs.label_hotmark_rule.add, label.split(','));
      }
    );
  });
});

const ajax_request = require('./ajax_admin');
router.use('/datas', ajax_request);

router.get('/', (req, res, next) => {
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  var now = Math.floor(new Date().getTime() / 1000);
  var today = enterControl.clearDateTime(new Date());
  today = Math.floor(today.getTime() / 1000);
  conn.query(`select * from uservisit where time > ?`, [today], (err, results, fields) => {
    var pv, uv, ip;
    pv = results.length;
    var uvs = [], ips = [], pvPerHour = [];
    for (var i = 0; i < 24; i++) {
      pvPerHour[i] = 0;
    }
    results.forEach((row) => {
      pvPerHour[Math.ceil((row.time - today) / 3600)]++;
      if (uvs.indexOf(row.uv) == -1) {
        uvs.push(row.uv);
      }
      if (ips.indexOf(row.ip) == -1) {
        ips.push(row.ip);
      }
    })
    uv = uvs.length;
    ip = ips.length;
    conn.query(`select count(*) as cnt from visithistory where date = ?`, [today], (err, results, fields) => {
      var querysql, querydata;
      if (results[0].cnt == 0) {
        querysql = `insert into visithistory set ?`;
        querydata = [{pv: pv, uv: uv, ip: ip, date: today}];
      } else {
        querysql = `update visithistory set ? where date = ?`;
        querydate = [{pv: pv, uv: uv, ip: ip}, today];
      }
      conn.query(querysql, querydata, (err, results, fields) => {
        conn.end((err) => {
        })
        res.render('admin/index', {
          title: '首页',
          avatar: req.session.avatar,
          pv: pv,
          uv: uv,
          pvPerHour: JSON.stringify(pvPerHour)
        });
      })
    })
  })
});

module.exports = router;
