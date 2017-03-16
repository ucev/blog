const express = require('express');
const router = express.Router();

const Articles = require('../class/article.db');
const __articles = new Articles();


router.get('/articles/get', (req, res, next) => {
  const start = req.query.start;
  var where = {
    state: 'on'
  };
  __articles.getByCond({where: where, start: start, client: true}, 
    function(r) {
      res.json({code: 0, msg: '获取成功', data: r});
    },
    function() {
      res.json({code: 1, msg: '获取失败'});
    }
  )
});

module.exports = router;