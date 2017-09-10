const router = new require('koa-router')()

const configs = require('../config/base.config')
const __log = require('../utils/log')

const Labels = require('../class/label.db')
const __labels = new Labels()

function searchPageResponse(ctx, data) {
  return ctx.render('mobiles/search', {
          title: '文章查找',
          websiteInfo: configs.website_info,
          labels: data
        })
}

router.get('/search', async (ctx, next) => {
  try {
    var labels = await __labels.getall({})
    await searchPageResponse(ctx, labels)
  } catch (err) {
    await searchPageResponse(ctx, [])
  }
})

module.exports = router;