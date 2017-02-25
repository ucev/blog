const express = require('express');
const router = express.Router();

const Articles =  require('../class/article.db');
const __articles =  new Articles();

const configs = require('../config/base.config');

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
  var start = req.query.start ? req.query.start : 0;
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
          datas: arts.data
        }
      )
    },
    () => {
      res.redirect('/');
    }
  )
});

module.exports = router;