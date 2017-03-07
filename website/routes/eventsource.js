const express = require('express');
const router = express.Router();
const __log = require('../utils/log');
const fs = require('fs');
const ReadWriteLock = require('rwlock');
const __lock = new ReadWriteLock();
const path = require('path');

const __root_dir = '../public/docs';

const Articles = require('../class/article.db');
const __articles = new Articles();

var __currentActivity = {};

router.get('/test', (req, res, next) => {
  try {
    res.type('text/event-stream');
  } catch(e) {

  }
  setTimeout(function() {
    __log.debug(new Date().toString());
    res.status(200).send("data:" + new Date().toString() + "\n\n");
  }, 5000);
})

router.get('/outputArticle', (req, res, next) => {
  var token = req.query.token;
  var openid = req.session.openid;
  res.type('text/event-stream');
  /*
  __log.debug('token: ' + token + ',  openid: ' + openid);
  if (!(openid in __currentActivity)) {
    __currentActivity[openid] = {};
  }
  var obj = __currentActivity[openid];
  if (!(token in obj)) {
    obj[token] = {
      'export': false,
      'import': false
    }
  }
  __log.debug(obj[token].export == true ? "TRUE" : "FALSE");
  if (obj[token].export == false) {
    obj[token].export = true;
    res.type('text/event-stream');
  } else {
    res.status(200).send('data:pregressing\n\n');
    return;
  }
  setTimeout(() => {
    res.status(200).send('data:succ\n\n');
  }, 15000);*/
  __articles.getall(
    (arts) => {
      var lockKey = 'dump article';
      var len = arts.length;
      for (var i = 0; i < len; i++) {
        (function(pos) {
          var art = arts[pos];
          __lock.writeLock(lockKey, function (cb) {
            var newpath = path.join(__dirname, __root_dir, art.title + '.md');
            __log.debug(newpath);
            var ws = fs.createWriteStream(newpath, {defaultEncoding: 'utf8'});
            ws.on('close', () => {
            })
            ws.write(art.content, () => {
              if (pos == len - 1) {
                res.send('data:succ\n\n');
              }
              cb();
            });
          })
        })(i);
      }
      //res.send('data:succ\n\n');
    },
    () => {
      res.send('data:fail\n\n');
    }
  )
});

module.exports = router;