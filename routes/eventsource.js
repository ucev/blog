/* global __dirname */
const router = new require('koa-router')()
const __log = require('../utils/log')
const fs = require('then-fs')
// const ReadWriteLock = require('rwlock')
// const __lock = new ReadWriteLock()
const path = require('path')
const archiver = require('archiver')
const moment = require('moment')
const busboy = require('koa-busboy')
const send = require('koa-send')
const uploader = busboy()

const Readable = require('stream').Readable

const __root_dir = '../public/docs'

const Articles = require('../class/article.db')
const __articles = new Articles()

class EventSourceStream extends Readable {
  constructor () {
    super(arguments)
  }
  /* eslint-disable no-unused-vars */
  _read (data) {}
  /* eslint-enable no-unused-vars */
}

const sse = (stream, event, data) => {
  return stream.push(`event:${event}\ndata:${data}\n\n`)
}

async function createDirs (dirpath) {
  let pathComp = dirpath.split(path.sep)
  let currpath = dirpath[0] === '/' ? '/' : ''
  for (let c of pathComp) {
    currpath = path.join(currpath, c)
    try {
      await fs.access(currpath)
    } catch (err) {
      await fs.mkdir(currpath)
    }
  }
  return true
}

router.post('/outputArticle/download', async ctx => {
  const request = ctx.request.body
  const token = request.token
  const date = moment().format('YYYYMMDD')
  const filename = `${token}.zip`
  const rootdir = path.resolve(__dirname, __root_dir, date)
  const filepath = path.join(rootdir, filename)
  ctx.attachment(filepath)
  await send(ctx, token + '.zip', { root: rootdir })
})

router.get('/outputArticle', async ctx => {
  ctx.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    Connection: 'keep-alive',
  })
  const stream = new EventSourceStream()
  ctx.body = stream
  try {
    const token = ctx.query.token
    // const openid = ctx.session.openid
    const date = moment().format('YYYYMMDD')
    const targetDir = path.join(__dirname, __root_dir, date)
    await createDirs(targetDir)
    const targetZip = fs.createWriteStream(path.join(targetDir, token + '.zip'))
    const archive = archiver('zip', {
      zlib: { level: 9 },
    })
    targetZip.on('close', function () {
      sse(stream, 'message', 'succ')
      sse(stream, 'message', 'close')
    })
    archive.pipe(targetZip)
    const arts = await __articles.getall()
    // const lockKey = 'dump article'
    const len = arts.length
    for (let i = 0; i < len; i++) {
      (function (pos) {
        const art = arts[pos]
        // __lock.writeLock(lockKey, function(cb) {
        archive.append(art.content, { name: art.title + '.md' })
        // cb();
        if (pos == len - 1) {
          archive.finalize()
          sse(stream, 'message', 'wait')
        }
        // });
      })(i)
    }
  } catch (err) {
    console.log(err)
    sse(stream, 'message', 'fail')
    sse(stream, 'message', 'close')
  }
})

router.post('/importArticle', uploader, async ctx => {
  try {
    var files = ctx.request.files
    console.log(files)
    var addtime = Math.floor(new Date().getTime() / 1000)
    var ps = files.map(f => {
      return (function (f) {
        var fname = f.filename
        var title = fname.substr(0, fname.indexOf('.md'))
        var fpath = f.path
        return new Promise(resolve => {
          var content = ''
          var rs = fs.createReadStream(fpath, { encoding: 'utf8' })
          rs.on('data', chunk => {
            content += chunk
          })
          rs.on('error', () => {})
          rs.on('end', () => {
            __articles
              .add({
                title: title,
                content: content,
                descp: '',
                label: '',
                addtime: addtime,
                modtime: addtime,
                add: true,
              })
              .then(() => {
                resolve({ tp: 'succ', title: fname })
              })
              .catch(err => {
                console.log(err)
                resolve({ tp: 'fail', title: fname })
              })
          })
        })
      })(f)
    })
    var datas = await Promise.all(ps)
    __log.debug(datas)
    console.log(datas)
    var succ = []
    var allSucc = true
    for (var dt of datas) {
      if (dt.tp == 'succ') {
        succ.push(dt.title)
      } else {
        allSucc = false
      }
    }
    __log.debug(succ)
    if (allSucc) {
      ctx.body = { code: 0, msg: '导入成功', data: succ }
    } else {
      ctx.body = { code: 1, msg: '导入失败', data: succ }
    }
  } catch (err) {
    console.log(err)
    ctx.body = { code: 1, msg: '添加失败', data: [] }
  }
})

module.exports = router
