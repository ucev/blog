const express = require('express');
const router = express.Router();
const request = require('request');
const configs = require('../config/base.config');
const loginConfig = configs.qqlogin;

// 错误处理
router.get('/redirect', (req, res, next) => {
  var code = req.query.code;
  var state = req.query.state;
  var url = `https://graph.qq.com/oauth2.0/token?grant_type=authorization_code&client_id=${loginConfig.appid}&client_secret=${loginConfig.secret}&code=${code}&redirect_uri=${loginConfig.redirect_url}`;
  request(url, (err, r, body) => {
    var params = body.split("&");
    var token = params[0].split("=")[1];
    var expire = params[1].split("=")[1];
    var refresh = params[2].split("=")[1];
    var url = "https://graph.qq.com/oauth2.0/me?access_token=" + token;
    request(url, (err, r, body) => {
      body = body.match(/{[\s\S]*?}/)[0];
      body = JSON.parse(body);
      var openid = body.openid;
      //res.cookie('openid', openid, {path: '/'});
      req.session.openid = openid;
      var url = `https://graph.qq.com/user/get_user_info?access_token=${token}&oauth_consumer_key=${loginConfig.appid}&openid=${openid}`;
      request(url, (err, r, body) => {
        console.log('-----------------body: ' + body);
        body = JSON.parse(body);
        req.session.avatar = body.figureurl_qq_1;
        res.redirect('/admin');
      });
    });
  });
});

router.get('/logout', (req, res, next) => {
  req.session.openid = undefined;
  res.redirect('/admin');
})

router.get('/', (req, res, next) => {
  if (configs.website_info.debug) {
    req.session.openid = configs.website_info.debug_session;
    req.session.avatar = '/images/avatar.jpeg';
    res.redirect('/admin');
  } else {
    var url = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101383430&redirect_uri=${loginConfig.redirect_url}&state=${loginConfig.state}`;
    res.redirect(url);
  }
})

module.exports = router;
