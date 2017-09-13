const Koa = require('koa')
const path = require('path')
const process = require('process')

const koaStatic = require('koa-static')
const Router = require('koa-router')
const views = require('koa-views')
const bodyparser = require('koa-bodyparser')
const onerror = require('koa-onerror')
const json = require('koa-json')
const logger = require('koa-logger')
const session = require('koa-session') 
const koaConvert = require('koa-convert')

const configs = require('./config/base.config')

const index = require('./routes/index')
const articles = require('./routes/articles')
const admin = require('./routes/admin')
const mobiles = require('./routes/mobiles')
const users = require('./routes/users')
const login = require('./routes/login')
const es = require('./routes/eventsource')

var enterControl = require('./routes/entercontrol')

const DEBUG_MODE = configs.website_info.debug

const mail = require('./utils/mail')

/*
//var logger = require('morgan');
var logger = require('./utils/log4js');

const __log = require('./utils/log');

*/

var app
app = new Koa()

onerror(app)

app.use(logger())
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(session(configs.session, app))
// view engine setup
app.use(views(path.join(__dirname, 'views'), {
  extension: 'pug'
}))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public/images', 'logo.png')));
//app.use(logger('dev'));

// hmr
if (process.env.NODE_ENV == 'DEV') {
  const koaWebpack = require('koa-webpack')
  const config = require('./build/webpack.dev.config')
  app.use(koaWebpack({
    config: config,
    dev: {
      publicPath: '/',
      stats: {
        color: true
      }
    },
    hot: {
      reload: true
    }
  }))
}

// static files
app.use(koaStatic(path.join(__dirname, 'public')));
app.use(koaStatic(path.join(__dirname, 'node_modules/chart.js/dist')));
app.use(koaStatic(path.join(__dirname, 'node_modules/prismjs')))
app.use(koaStatic(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(koaStatic(path.join(__dirname, 'node_modules/markdown-it/dist')));
app.use(koaStatic(path.join(__dirname, 'node_modules/markdown-it-classy/dist')));
app.use(koaStatic(path.join(__dirname, 'node_modules/react/dist')));
app.use(koaStatic(path.join(__dirname, 'node_modules/react-dom/dist')));
//app.use(koaStatic(path.join(__dirname, 'node_modules/simplemde')));
app.use(koaStatic(path.join(__dirname, 'node_modules/template_js')));
app.use(koaStatic(path.join(__dirname, 'node_modules/jquery/dist')));

// 404/ 500...
app.use(async (ctx, next) => {
  try {
    await next()
    if (parseInt(ctx.status) == 404) {
      ctx.throw('Not Found', 404)
    }
  } catch (error) {
    console.log(error)
    error.status = error.status || 500
    error.url = ctx.originalUrl
    if (error.status != 404) {
      try {
        mail.error_report(ctx.originalUrl, error.message)
      } catch (err) {
      }
    }
    await ctx.render('error', {debug: DEBUG_MODE, error: error})
  }
})

const router = new Router()
router.use('/articles', articles.routes(), articles.allowedMethods())
router.use('/admin', admin.routes(), admin.allowedMethods())
router.use('/mobiles', mobiles.routes(), mobiles.allowedMethods())
router.use('/users', users.routes(), users.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())
router.use('/es', es.routes(), es.allowedMethods())
app.use(router.routes())
app.use(index.routes(), index.allowedMethods())

app.listen(configs.website_info.port)

module.exports = app;
