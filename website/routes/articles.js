const express = require('express');
const router = express.Router();

const Articles =  require('../class/article.db');
const __articles =  new Articles();
const Categories = require('../class/category.db');
const __categories = new Categories();

const __log = require('../utils/log');

const clientAjax = require('./ajax_client');
var enterControl = require('./entercontrol');


const __markdown = require('markdown-it')({
    html: true,
    linkify: true,
    typographer: true
  });

const configs = require('../config/base.config');

function __pager(current, total) {
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

function __searchStyleTitle(title, args) {
  return title.replace(new RegExp('(' + args + ')'), '<strong>$1</strong>')
}

router.get('/category/:cid', (req, res, next) => {
  var cid = req.params.cid;
  __categories.getById(
    {
      id: cid,
      queryfields: ['preface']
    },
    (data) => {
      __log.debug('preposition ' + JSON.stringify(data));
      res.redirect(`/articles/category/${cid}/${data.preface}`);
    },
    () => {
      res.redirect('/articles/category/${cid}/0');
    }
  )
})

router.get('/category/:cid/:id', (req, res, next) => {
  var cid = req.params.cid;
  var aid = req.params.id;
  function responde(tree, article) {
    __log.debug(tree);
    var content = __markdown.render(article.content ? article.content : '');
    res.render('category', {
      title: article.title ? article.title : (tree.title ? tree.title : '未知类别'),
      websiteInfo: configs.website_info,
      tree: tree,
      content: content,
      aid: aid,
      cid: cid,
      debug: configs.website_info.debug
    })
  }
  __categories.getTree(
    cid,
    (tree) => {
      tree = tree[0];
      __articles.getsingle(
        {
          id: aid,
          queryfields: ['title', 'content']
        },
        (art) => {
          responde(tree, art);
        },
        () => {
          responde(tree, {});
        }
      )
    },
    () => {
      responde({}, {});
    }
  )
})

router.get('/category', (req, res, next) => {
  function responde(cats) {
    res.render('category_list', {
      title: '文章类别',
      websiteInfo: configs.website_info,
      categories: cats
    });
  }
  __categories.get(
    (cats) => {
      responde(cats);
    },
    () => {
      responde([]);;
    }
  )
});

router.use('/view/:id', enterControl.userControl);
router.get('/view/:id', (req, res, next) => {
  var id = req.params.id;
  __articles.view(
    id,
    (article) => {
      res.render('article', {
          title: article.title,
          websiteInfo: configs.website_info,
          md: __markdown.render(article.content),
          aid: id,
          debug: configs.website_info.debug
        }
      )
    },
    () => {
      res.redirect('/');
    }
  )
});

router.get('/search', (req, res, next) => {
  var start = req.query.p ? req.query.p : 0;
  // 查找的参数
  var args = req.query.args;
  console.log(args);
  if (args == undefined || args.trim() == '') {
    res.redirect('/articles');
    return;
  }
  __log.debug(args);
  __articles.getByCond(
    {
      where: {args: args},
      start: start,
      queryfields: ['id', 'title', 'pageview', 'modtime', 'descp', 'label']
    },
    (arts) => {
      __log.debug(arts);
      res.render('article_search', {
        title: '文章查找',
        websiteInfo: configs.website_info,
        datas: arts.data,
        current: arts.current,
        pager: __pager(arts.current, arts.total),
        pagerurl: `?args=${args}&p=`,
        args: args
      })
    },
    () => {
      res.redirect('/articles');
    }
  )
})

router.use('/data', clientAjax);

router.get('/', (req, res, next) => {
  var start = req.query.p ? req.query.p : 0;
  function response(arts, cats) {
    res.render('article_list', {
      title: '文章列表',
      websiteInfo: configs.website_info,
      datas: arts.data,
      categories: cats,
      current: arts.current,
      pager: __pager(arts.current, arts.total),
      pagerurl: '?p='
    })
  }
  __articles.getByCond(
    {
      where: {},
      start: start,
    },
    (arts) => {
      __categories.get(
        (cats) => {
          response(arts, cats);
        },
        () => {
          response(arts, []);
        }
      )
    },
    () => {
      res.redirect('/');
    }
  )
});


module.exports = router;