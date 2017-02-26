const express = require('express');
const router = express.Router();

const Articles =  require('../class/article.db');
const __articles =  new Articles();

const configs = require('../config/base.config');

function __pager(current, total) {
  console.log('-----------------' + current + ', ' + total);
  var start = current < 5 ? 0 : current - 5;
  var len;
  if (start + 10 <= total) {
    len = 10;
  } else if (total - 10 > 0) {
    start = total - 10;
    len = 10;
  } else {
    start = 0;
    len = total;
  }
  var pagerParams = [];
  if (current != 0) {
    pagerParams.push({page: current - 1, title: '上一页'});
  }
  for (var i = 1; i <= len; i++) {
    pagerParams.push({page: start + i - 1, title: start + i});
  }
  if (current + 1 < total) {
    pagerParams.push({page: current + 1, title: '下一页'});
  }
  return pagerParams;
}

router.get('/view/:id', (req, res, next) => {
  var id = req.params.id;
  var md = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
  });
  __articles.view(
    id,
    (article) => {
      res.render('article', {
          title: article.title,
          websiteInfo: configs.website_info,
          md: md.render(article.content),
          debug: configs.website_info.debug
        }
      )
    },
    () => {
      res.redirect('/');
    }
  )
});

router.get('/', (req, res, next) => {
  var start = req.query.p ? req.query.p : 0;
  __articles.getByCond(
    {
      where: {},
      start: start,
      client: true
    },
    (arts) => {
      res.render('article_list', {
          title: '文章列表',
          websiteInfo: configs.website_info,
          datas: arts.data,
          current: arts.current,
          pager: __pager(arts.current, arts.total)
        }
      )
    },
    () => {
      res.redirect('/');
    }
  )
});

module.exports = router;