const express = require('express');
const router = express.Router();

const Articles = require('../class/article.db');
const __articles = new Articles();


router.get('/articles/get', (req, res, next) => {
  const start = req.query.start;
  var where = {
    state: 'on'
  };
  __articles.getByCond({where: where, start: start, queryfields: ['id', 'title', 'pageview', 'modtime', 'descp']}, 
    function(r) {
      res.json({code: 0, msg: '获取成功', data: r});
    },
    function() {
      res.json({code: 1, msg: '获取失败'});
    }
  )
});

router.get('/articles/search', (req, res, next) => {
  var start = req.query.p ? req.query.p : 0;
  // 查找的参数
  var args = req.query.args;
  var where = {
    state: 'on',
    args: args
  };
  __articles.getByCond({where: where, start: start, queryfields: ['id', 'title', 'pageview', 'label', 'modtime', 'descp']}, 
    function(r) {
      res.json({code: 0, msg: '获取成功', data: r});
    },
    function() {
      res.json({code: 1, msg: '获取失败'});
    }
  )
});

module.exports = router;