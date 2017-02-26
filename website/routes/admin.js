const express = require('express');
const router = express.Router();
const enterControl = require('./entercontrol');
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});

const Articles = require('../class/article.db');
const __articles = new Articles();
const Labels = require('../class/label.db');
const __labels = new Labels();
const FluxRecord = require('../class/fluxrecord');
const __fluxrecord = new FluxRecord();

const configs = require('../config/base.config');


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
  function response(labels) {
    res.render('admin/article_edit', {
        title: '添加文章',
        avatar: req.session.avatar,
        labels: JSON.stringify(labels)
      }
    )
  }
  __labels.getNames(
    response,
    response
  )
});

router.post('/articles/add', (req, res, next) => {
  var content = req.body.md.trim();
  var descp = req.body.descp;
  descp = descp.replace(/<[^]+>/g, '');
  var label = req.body.label;
  var h1 = content.substring(0, content.indexOf('\n')).trim();
  var title = h1.split(/\s+/).slice(1).join(' ');
  var addtime = Math.floor(new Date().getTime() / 1000);
  __articles.add({
      title: title,
      content: content,
      descp: descp,
      label: label,
      addtime: addtime,
      modtime: addtime,
      add: true
    },
    () => {
      res.json({code: 0, msg: '添加成功'});
    },
    () => {
      res.json({code: 1, msg: '添加失败'});
    }
  )
});

router.get('/articles/modify', (req, res, next) => {
  var id = Number(req.query.id);
  function response(article, labels) {
    res.render('admin/article_edit', {
        title: '修改文章',
        avatar: req.session.avatar,
        type: 'edit',
        id: article.id,
        content: encodeURIComponent(article.content),
        labels: JSON.stringify(labels),
        current_labels: article.label
      }
    )
  }
  if (isNaN(id)) {
    res.redirect('/admin');
  } else {
    __articles.getsingle(
      {id: id, client: true},
      (article) => {
        __labels.getNames(
          (labels) => {response(article, labels);},
          (labels) => {response(article, labels);}
        )
      },
      () => {
        res.redirect('/admin');
      }
    )
  }
});

router.post('/articles/modify', (req, res, next) => {
  var content = req.body.md.trim();
  var descp = req.body.descp;
  descp = descp.replace(/<[^]+>/g, '');
  var label = req.body.label;
  var id = req.body.id;
  var h1 = content.substring(0, content.indexOf('\n')).trim();
  var title = h1.split(/\s+/).slice(1).join(' ');
  var modtime = Math.floor(new Date().getTime() / 1000);
  __articles.add({
      content: content,
      title: title,
      descp: descp,
      label: label,
      modtime: modtime,
      id: id,
      add: false
    },
    () => {
      res.json({code: 0, msg: '更新成功'});
    },
    () => {
      res.json({code: 1, msg: '更新失败'});
    }
  )
});

const ajax_request = require('./ajax_admin');
router.use('/datas', ajax_request);

router.get('/', (req, res, next) => {
  function response(data) {
    res.render('admin/index', {
        title: '首页',
        avatar: req.session.avatar,
        pv: data.pv,
        uv: data.uv,
        pvPerHour: JSON.stringify(data.pvPerHour)
      }
    )
  }
  var today = enterControl.clearDateTime(new Date());
  today = Math.floor(today.getTime() / 1000);
  __fluxrecord.fluxOfToday(
    today,
    response,
    function() {
      var data = {};
      data.pv = 0;
      data.uv = 0;
      data.pvPerHour = [];
      for (var i = 0; i < 24; i++) {
        data.pvPerHour.push(0);
      }
      response(data);
    }
  )
});

module.exports = router;
