const router = new require('koa-router')()

const Articles = require('../class/article.db')
const __articles = new Articles()


router.get('/articles/get', async (ctx, next) => {
  const start = ctx.query.start
  var where = {
    state: 'on'
  };
  try {
    var res = await __articles.getByCond({ where: where, start: start, queryfields: ['id', 'title', 'pageview', 'modtime', 'descp'] })
    ctx.body = { code: 0, msg: '获取成功', data: res }
  } catch (err) {
    console.log(err)
    ctx.body = { code: 1, msg: '获取失败' }
  }
})

router.get('/articles/search', async (ctx, next) => {
  var start = ctx.query.p ? ctx.query.p : 0
  // 查找的参数
  var args = ctx.query.args
  var where = {
    state: 'on',
    args: args
  }
  try {
    var res = await __articles.getByCond({ where: where, start: start, queryfields: ['id', 'title', 'pageview', 'label', 'modtime', 'descp'] })
    ctx.body = { code: 0, msg: '获取成功', data: res }
  } catch (err) {
    ctx.body = { code: 1, msg: '获取失败' }
  }
})

module.exports = router;