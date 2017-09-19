const router = new require('koa-router')()
const request = require('request-promise')
const configs = require('../config/base.config')
const loginConfig = configs.qqlogin

const __log = require('../utils/log')

// 错误处理
router.get('/redirect', async (ctx, next) => {
  try {
    var code = ctx.query.code
    var state = ctx.query.state
    var url = `https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=${loginConfig.appid}&client_secret=${loginConfig.secret}&code=${code}&redirect_uri=${loginConfig.redirect_url}`
    var res = await request(url)
    var params = res.split("&")
    var token = params[0].split("=")[1]
    var expire = params[1].split("=")[1]
    var refresh = params[2].split("=")[1]
    url = "https://graph.qq.com/oauth2.0/me?access_token=" + token
    res = await request(url)
    res = res.match(/{[\s\S]*?}/)[0]
    res = JSON.parse(res)
    var openid = res.openid
    ctx.session.openid = openid
    url = `https://graph.qq.com/user/get_user_info?access_token=${token}&oauth_consumer_key=${loginConfig.appid}&openid=${openid}`
    res = await request(url)
    res = JSON.parse(res)
    ctx.session.avatar = res.figureurl_qq_1
    await next()
    ctx.redirect('/admin');
  } catch (err) {
    ctx.redirect('/')
  }
})

router.get('/logout', async (ctx, next) => {
  ctx.session.openid = undefined;
  await next()
  ctx.redirect('/admin');
})

router.get('/', async (ctx, next) => {
  if (configs.website_info.debug) {
    ctx.session.openid = configs.website_info.debug_session;
    ctx.session.avatar = configs.website_info.debug_avatar;
    await next()
    ctx.redirect('/admin');
  } else {
    var url = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101383430&redirect_uri=${loginConfig.redirect_url}&state=${loginConfig.state}`;
    ctx.redirect(url);
  }
})

module.exports = router;
