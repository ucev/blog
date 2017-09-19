const router = new require('koa-router')()
const enterControl = require('./entercontrol');
const __log = require('../utils/log');
const md = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true
});

const Articles = require('../class/article.db');
const __articles = new Articles();
const Categories = require('../class/category.db');
const __categories = new Categories();
const Labels = require('../class/label.db');
const __labels = new Labels();
const FluxRecord = require('../class/fluxrecord');
const __fluxrecord = new FluxRecord();

const crypto = require('crypto');

const configs = require('../config/base.config');

function genToken(key) {
  key = String(key);
  var md5sum = crypto.createHash('md5');
  md5sum.update(key);
  return md5sum.digest('hex');
}

router.get('/articles', async (ctx, next) => {
  await ctx.render('admin/articles', {
    title: '文章管理',
    avatar: ctx.session.avatar
  });
});

router.get('/photos', async (ctx, next) => {
  await ctx.render('admin/photos', {
    title: '照片管理',
    avatar: ctx.session.avatar
  });
});

router.get('/labels', async (ctx, next) => {
  await ctx.render('admin/labels', {
    title: '标签管理',
    avatar: ctx.session.avatar
  });
});

router.get('/categories', async (ctx, next) => {
  await ctx.render('admin/categories', {
    title: '类别管理',
    avatar: ctx.session.avatar
  })
})

router.get('/categories/refact/:id', async (ctx, next) => {
  await ctx.render('admin/category_refact', {
    title: '文档整理',
    avatar: ctx.session.avatar,
  })
})

router.get('/articles/add', async (ctx, next) => {
  function response(labels) {
    return ctx.render('admin/article_edit', {
        title: '添加文章',
        avatar: ctx.session.avatar,
        labels: JSON.stringify(labels),
        content: "",
        type: "add"
      }
    )
  }
  try {
    var labels = await __labels.getNames()
    await response(labels)
  } catch (err) {
    await response([])
  }
});

router.post('/articles/add', async (ctx, next) => {
  var request = ctx.request.body
  var content = request.md.trim()
  var descp = request.descp
  descp = descp.replace(/<[^]+?>/g, '')
  var label = request.label
  var h1 = content.substring(0, content.indexOf('\n')).trim()
  var title = h1.split(/\s+/).slice(1).join(' ')
  var addtime = Math.floor(new Date().getTime() / 1000)
  try {
    await __articles.add({
            title: title,
            content: content,
            descp: descp,
            label: label,
            addtime: addtime,
            modtime: addtime,
            add: true
          })
    ctx.body = {code: 0, msg: '添加成功'}
  } catch (err) {
    ctx.body = {code: 1, msg: '添加失败'}
  }
})

router.get('/articles/modify', async (ctx, next) => {
  var id = Number(ctx.query.id);
  function response(article, labels) {
    return ctx.render('admin/article_edit', {
        title: '修改文章',
        avatar: ctx.session.avatar,
        type: 'edit',
        id: article.id,
        content: article.content,
        labels: JSON.stringify(labels),
        current_labels: article.label
      }
    )
  }
  if (isNaN(id)) {
    return ctx.redirect('/admin');
  }
  try {
    var article = await __articles.getsingle({
            id: id
          })
    try {
      var labels = await __labels.getNames()
      await response(article, labels)
    } catch (err) {
      await response(article, [])
    }
  } catch (err) {
    ctx.redirect('/admin')
  }
})

router.post('/articles/modify', async (ctx, next) => {
  var request = ctx.request.body
  var content = request.md.trim()
  var descp = request.descp
  descp = descp.replace(/<[^]+?>/g, '')
  var label = request.label
  var id = request.id
  var h1 = content.substring(0, content.indexOf('\n')).trim()
  var title = h1.split(/\s+/).slice(1).join(' ')
  var modtime = Math.floor(new Date().getTime() / 1000)
  try {
    await __articles.add({
            content: content,
            title: title,
            descp: descp,
            label: label,
            modtime: modtime,
            id: id,
            add: false
          })
    ctx.body = {code: 0, msg: '更新成功'}
  } catch (err) {
    console.log(err)
    ctx.body = {code: 1, msg: '更新失败'}
  }
})

router.get('/tools', async (ctx, next) => {
  var token = genToken(ctx.session.openid);
  await ctx.render('admin/tools', {
    title: '实用工具',
    token: token,
    avatar: ctx.session.avatar
  })
})

const ajax_request = require('./ajax_admin')
router.use('/datas', ajax_request.routes(), ajax_request.allowedMethods())

router.get('/', async (ctx, next) => {
  function response(data) {
    return ctx.render('admin/index', {
        title: '首页',
        avatar: ctx.session.avatar,
        pv: data.pv,
        uv: data.uv,
        pvPerHour: JSON.stringify(data.pvPerHour)
      }
    )
  }
  var today = enterControl.clearDateTime(new Date());
  today = Math.floor(today.getTime() / 1000);
  try {
    var data = await __fluxrecord.fluxOfToday(today)
    await response(data)
  } catch (err) {
    var data = {}
    data.pv = 0
    data.uv = 0
    data.pvPerHour = []
    for (var i = 0; i < 24; i++) {
      data.pvPerHour.push(0)
    }
    await response(data)
  }
})

module.exports = router
