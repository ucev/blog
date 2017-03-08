const express = require('express');
const router = express.Router();
const __log = require('../utils/log');
const fs = require('fs');
const ReadWriteLock = require('rwlock');
const __lock = new ReadWriteLock();
const path = require('path');
const archiver = require('archiver');
const multiparty = require('multiparty');

const __root_dir = '../public/docs';

const Articles = require('../class/article.db');
const __articles = new Articles();

function dirExists(dirpath) {
  return new Promise((resolve, reject) => {
    fs.exists(dirpath, (exists) => {
      if (!exists) {
        fs.mkdir(dirpath, (err) => {
          if (err) {
            __log.debug(err);
            reject();
          } else {
            resolve();
          }
        }) 
      } else {
        resolve();
      }
    })
  })
}

router.post('/outputArticle/download', (req, res, next) => {
  var token = req.body.token;
  var date = new Date().format('yyyyMMdd');
  var filepath = path.join(__dirname, __root_dir, date, token + '.zip');
  __log.debug(filepath);
  res.download(filepath);
})

router.get('/outputArticle', (req, res, next) => {
  var token = req.query.token;
  var openid = req.session.openid;
  res.type('text/event-stream');
  var date = new Date().format('yyyyMMdd');
  var targetDir = path.join(__dirname, __root_dir, date);
  __log.debug(targetDir);
  var pdir = dirExists(targetDir);
  pdir.then(() => {
    __log.debug('here');
    var targetZip = fs.createWriteStream(path.join(targetDir, token + '.zip'));
    var archive = archiver('zip', {
      zlib: {level: 9}
    })
    targetZip.on('close', function() {
      res.end('data:succ\n\n');
      return;
    })
    archive.pipe(targetZip);
    __log.debug('here1');
    __articles.getall(
      (arts) => {
        var lockKey = 'dump article';
        var len = arts.length;
        for (var i = 0; i < len; i++) {
          (function(pos) {
            var art = arts[pos];
            //__lock.writeLock(lockKey, function(cb) {
              archive.append(art.content, {name: art.title + '.md'});
              //cb();
              if (pos == len - 1) {
                archive.finalize();
              }
            //});
          })(i);
        }
      },
      () => {
        res.send('data:fail2\n\n');
      }
    )
  }).catch(() => {
    res.send('data:fail1\n\n');
  })
});

router.post('/importArticle', (req, res, next) => {
  var form = new multiparty.Form();
  form.parse(req, (err, fields, files) => {
    files = files.files;
    var addtime = Math.floor(new Date().getTime() / 1000);
    var ps = files.map((f) => {
      return (function(f) {
        var fname = f.originalFilename;
        var title = fname.substr(0, fname.indexOf('.md'));
        var fpath = f.path;
        return new Promise((resolve, reject) => {
          var content = '';
          var rs = fs.createReadStream(fpath, {encoding: 'utf8'});
          rs.on('data', (chunk) => {
            content += chunk;
          })
          rs.on('error', () => {
          })
          rs.on('end', () => {
            __articles.add({
              title: title,
              content: content,
              descp: '',
              label: '',
              addtime: addtime,
              modtime: addtime,
              add: true
            },
            () => {
              resolve();
            },
            () => {
              reject();
            }
            )
          })
        })
      })(f);
    })
    var pall = Promise.all(ps);
    pall.then(() => {
      res.json({code: 0, msg: '添加成功'});
    }).catch(() => {
      res.json({code: 1, msg: '添加失败'});
    })
  })
})

module.exports = router;