const express = require('express');
const router = express.Router();

const configs = require('../config/base.config');
const __log = require('../utils/log');

const Labels = require('../class/label.db');
const __labels = new Labels();

function searchPageResponse(res, data) {
  res.render('mobiles/search', {
    title: '文章查找',
    websiteInfo: configs.website_info,
    labels: data
  })
}

router.get('/search', (req, res, next) => {
  __labels.getall({}).then((labels) => {
    searchPageResponse(res, labels);
  }).catch(() => {
    searchPageResponse(res, []);
  })
})

module.exports = router;