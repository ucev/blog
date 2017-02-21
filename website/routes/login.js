const express = require('express');
const router = express.Router();
const configs = require('../config/base.config');
const loginConfig = configs.qqlogin;


router.get('/qqlogin', (req, res, next) => {
  res.redirect(`https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=101383430&redirect_uri=${loginConfig.redirect_url}&state=${configs.qqlogin.state}`);
})

router.get('/redirect', (req, res, next) => {
  var code = req.query.code;
  var state = req.query.state;
  var options = {
    protocal: 'https:',
    host: 'graph.qq.com',
    path: `/oauth2.0/token?grant_type=authorization_code&client_id=${loginConfig.appid}&client_secret=${loginConfig.secret}&code=${code}&redirect_uri=".$redirectUrl`
  }
  const http = require('http');
  http.require(options, (r) => {
    var data = '';
    r.on('data', (chunk) => {
      data += chunk;
    })
    r.on('end', () => {
      res.send(data);
    })
  })
  http.on('error', (err) => {
    res.send('error');
  })
})

module.exports = router;