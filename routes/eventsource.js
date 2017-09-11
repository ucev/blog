const router = new require('koa-router')()
const __log = require('../utils/log');
const fs = require('fs');
const ReadWriteLock = require('rwlock');
const __lock = new ReadWriteLock();
const path = require('path');
const archiver = require('archiver');
const moment = require('moment');
const busboy = require('koa-busboy')
const uploader = busboy()

const __root_dir = '../public/docs';

const Articles = require('../class/article.db');
const __articles = new Articles();

function dirExists(dirpath) {
  return new Promise((resolve, reject) => {
    fs.exists(dirpath, (exists) => {
      if (!exists) {
        fs.mkdir(dirpath, (err) => {
          if (err) {
            reject();
          } else {
            resolve(true);
          }
        })
      } else {
        resolve(true);
      }
    })
  })
}

router.post('/outputArticle/download', async (ctx, next) => {
  var request = ctx.request.body
  var token = request.token
  var date = moment().format('YYYYMMDD')
  var filepath = path.join(__dirname, __root_dir, date, token + '.zip')
  return ctx.attachment(filepath)
})

router.get('/outputArticle', async (ctx, next) => {
  try {
    var token = ctx.query.token
    var openid = ctx.session.openid
    res.type = 'text/event-stream'
    var date = moment().format('YYYYMMDD')
    var targetDir = path.join(__dirname, __root_dir, date);
    var pdir = await dirExists(targetDir)
    var targetZip = fs.createWriteStream(path.join(targetDir, token + '.zip'));
    var archive = archiver('zip', {
      zlib: { level: 9 }
    })
    targetZip.on('close', function () {
      return ctx.body = 'data:succ\n\n'
    })
    archive.pipe(targetZip);
    var arts = await __articles.getall()
    var lockKey = 'dump article';
    var len = arts.length;
    for (var i = 0; i < len; i++) {
      (function (pos) {
        var art = arts[pos];
        //__lock.writeLock(lockKey, function(cb) {
        archive.append(art.content, { name: art.title + '.md' });
        //cb();
        if (pos == len - 1) {
          archive.finalize();
        }
        //});
      })(i);
    }
  } catch (err) {
    ctx.body = 'data:fail\n\n'
  }
});

router.post('/importArticle', uploader, async (ctx, next) => {
  try {
    var files = ctx.request.files
    var addtime = Math.floor(new Date().getTime() / 1000);
    var ps = files.map((f) => {
      return (function (f) {
        var fname = f.originalFilename;
        var title = fname.substr(0, fname.indexOf('.md'));
        var fpath = f.path;
        return new Promise((resolve, reject) => {
          var content = '';
          var rs = fs.createReadStream(fpath, { encoding: 'utf8' });
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
            }).then(() => {
              resolve({ 'tp': 'succ', 'title': fname });
            }).catch(() => {
              resolve({ 'tp': 'fail', 'title': fname });
            })
          })
        })
      })(f);
    })
    var datas = await Promise.all(ps);
    __log.debug(datas);
    var succ = [];
    var allSucc = true;
    for (var dt of datas) {
      if (dt.tp == 'succ') {
        succ.push(dt.title);
      } else {
        allSucc = false;
      }
    }
    __log.debug(succ);
    if (allSucc) {
      ctx.body = { code: 0, msg: '导入成功', data: succ }
    } else {
      ctx.body = { code: 1, msg: '导入失败', data: succ }
    }
  } catch (err) {
    ctx.body = { code: 1, msg: '添加失败', data: [] }
  }
})

module.exports = router;