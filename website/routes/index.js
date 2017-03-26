var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const configs = require('../config/base.config');

function getRandom(n) {
  n -= 1;
  var i = Math.random() * n;
  i = Math.floor(i);
  return i < n ? i : n;
}

/* GET home page. */
router.get('/about', function(req, res, next) {
  fs.readFile(path.join(__dirname, '../utils/images.json'), {encoding: 'utf8'}, (err, data) => {
    // 防止权限冲突导致不能正确读取，设置默认值
    // 见 ../utils/get_front_pic.js
    if (err) {
      var imageUrl = config.website_info.default_front_pic;
    } else {
      try {
        var imgs = JSON.parse(data);
        var pos = getRandom(imgs.length);
        var imgUrl = imgs[pos];
        imgUrl = imgUrl.match(/http:\/\/.+/) == null ? configs.website_info.default_front_pic : imgUrl;
      } catch (e) {
        imgUrl = configs.website_info.default_front_pic;
      }
    }
    res.render('index', { title: '欢迎来到张帅的博客', backgroundImg: imgUrl });
  });
});

router.get('/', (req, res, next) => {
  res.redirect('/articles');
})

module.exports = router;
