const KoaRouter = require('koa-router')
const router = new KoaRouter()

const Articles = require('../class/article.db');
const __articles = new Articles();
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
__markdown.use(require('markdown-it-extensible-fence'))

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
    pagerParams.push({ page: current - 1, title: '上一页' });
  }
  for (var i = 1; i <= len; i++) {
    pagerParams.push({ page: start + i - 1, title: start + i });
  }
  if (current + 1 < total) {
    pagerParams.push({ page: current + 1, title: '下一页' });
  }
  return pagerParams;
}

function __searchStyleTitle(title, args) {
  return title.replace(new RegExp('(' + args + ')'), '<strong>$1</strong>')
}

router.get('/category/:cid', async (ctx, next) => {
  var cid = ctx.params.cid
  try {
    var data = await __categories.getById({
          id: cid,
          queryfields: ['preface']
        })
    ctx.redirect(`/articles/category/${cid}/${data.preface}`)
  } catch (err) {
    ctx.redirect(`/articles/category/${cid}/0`);
  }
})

router.get('/category/:cid/:id', async (ctx, next) => {
  var cid = ctx.params.cid;
  var aid = ctx.params.id;
  function response(tree, article) {
    var content = __markdown.render(article && article.content ? article.content : '');
    return ctx.render('category', {
            title: article.title,
            websiteInfo: configs.website_info,
            tree: tree,
            content: content,
            aid: aid,
            cid: cid,
            debug: configs.website_info.debug
          })
  }
  var tree = {}, art = {}
  try {
    tree = await __categories.getTree(cid)
    art = await __articles.getsingle({
      id: aid,
      queryfields: ['title', 'content']
    })
  } catch (err) {
    console.log(err)
  }
  await response(tree, art)
})

router.get('/category', async (ctx, next) => {
  function responde(cats) {
    return ctx.render('category_list', {
            title: '文章类别',
            websiteInfo: configs.website_info,
            categories: cats
          })
  }
  try {
    var cats = __categories.get()
    await responde(cats)
  } catch (err) {
    await responde([])
  }
})

// 😢 for later
router.get('/view/:id', enterControl.userControl, async (ctx, next) => {
  var id = ctx.params.id
  try {
    var article = await __articles.view(id)
    await ctx.render('article', {
            title: article.title,
            websiteInfo: configs.website_info,
            md: __markdown.render(article.content),
            aid: id,
            debug: configs.website_info.debug
          })
  } catch (err) {
    console.log(err)
    ctx.redirect('/')
  }
})

router.get('/search', async (ctx, next) => {
  var start = ctx.query.p ? ctx.query.p : 0
  // 查找的参数
  var args = ctx.query.args
  if (args == undefined || args.trim() == '') {
    return ctx.redirect('/articles')
  }
  __log.debug(args);
  try {
    var arts = await __articles.getByCond({
          where: { args: args },
          start: start,
          queryfields: ['id', 'title', 'pageview', 'modtime', 'descp', 'label']
        })
    await ctx.render('article_search', {
      title: '文章查找',
      websiteInfo: configs.website_info,
      datas: arts.data,
      current: arts.current,
      pager: __pager(arts.current, arts.total),
      pagerurl: `?args=${args}&p=`,
      args: args
    })
  } catch (err) {
    ctx.redirect('/articles')
  }
})

router.use('/data', clientAjax.routes(), clientAjax.allowedMethods())

router.get('/', async (ctx, next) => {
  var start = ctx.query.p ? ctx.query.p : 0;
  function response(arts, cats) {
    return ctx.render('article_list', {
      title: '文章列表',
      websiteInfo: configs.website_info,
      datas: arts.data,
      categories: cats,
      current: arts.current,
      pager: __pager(arts.current, arts.total),
      pagerurl: '?p='
    })
  }
  var arts = [], cats = []
  try {
    arts = await __articles.getByCond({
          where: {},
          start: start
        })
    cats = await __categories.get()
  } catch (err) {
  }
  await response(arts, cats)
});

module.exports = router
