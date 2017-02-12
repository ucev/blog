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

router.get('/articles', (req, res, next) => {
  res.render('admin/articles', {
    title: '文章管理'
  });
});

router.get('/photos', (req, res, next) => {
  res.render('admin/photos', {
    title: '照片管理'
  });
});

router.get('/labels', (req, res, next) => {
  res.render('admin/labels', {
    title: '标签管理'
  });
});

router.get('/categories', (req, res, next) => {
  res.render('admin/categories', {
    title: '类别管理'
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
      labels: JSON.stringify(labels)
    });
    conn.end((err) => {

    });
  });
});

router.post('/articles/add', (req, res, next) => {
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

router.get('/articles/modify', (req, res, next) => {
  var i = Number(req.query.id);
  if (isNaN(i)) {
    res.redirect('/admin');
  } else {
    const mysql = require('mysql');
    const conn = mysql.createConnection(configs.database_config);
    conn.query('select * from articles where id = ?', [id],
      (err, results, fields) => {
        if (results.length > 0) {
          const row = results[0];
          res.render('admin/article_edit', {
            title: '修改文章',
            type: 'edit',
            content: row.content
          });
        } else {
          res.redirect('/admin');
        }
      }
    );
  }
});

router.post('/articles/modify', (req, res, next) => {

});

router.get('/login', (req, res, next) => {
  res.render('admin/login', {
    title: '登陆'
  });
});

const ajax_request = require('./ajax_admin');
router.use('/datas', ajax_request);

router.get('/', (req, res, next) => {
  res.render('admin/index', {
    title: '首页'
  });
});

module.exports = router;