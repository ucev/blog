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
  console.log('---------------' + url);
  request(url, (err, r, body) => {
    var params = body.split("&");
    var token = params[0].split("=")[1];
    var expire = params[1].split("=")[1];
    var refresh = params[2].split("=")[1];
    var url = "https://graph.qq.com/oauth2.0/me?access_token=" + token + '&callback=f';
    request(url, (err, r, body) => {
      body = body.match(/{[\s\S]*?}/)[0];
      body = JSON.parse(body);
      var openid = body.openid;
      res.send(openid);
    });
  });
});

router.get('/', (req, res, next) => {
  var url = `https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101383430&redirect_uri=${loginConfig.redirect_url}&state=${loginConfig.state}`;
  res.redirect(url);
})

module.exports = router;
