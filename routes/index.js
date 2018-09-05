var router = require('koa-router')()

/* GET home page. */
router.get('/about', async ctx => {
  await ctx.render('about', { title: '欢迎来到张帅的博客' })
})

router.get('/', async ctx => {
  ctx.redirect('/about')
})

module.exports = router
