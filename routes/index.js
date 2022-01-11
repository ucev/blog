var router = require('koa-router')()

/* GET home page. */
router.get('/about', async (ctx, next) => {
  await ctx.render('about', { title: '欢迎来到ucev优赛阁'});
});

router.get('/', async ctx => {
  ctx.redirect('/about')
})

module.exports = router
