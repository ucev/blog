const router = new require('koa-router')()

/* GET users listing. */
router.get('/', async (ctx, next) => {
  ctx.send('respond with a resource');
});

module.exports = router;
