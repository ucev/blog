/* global __dirname */
const Koa = require('koa')
const path = require('path')
const process = require('process')

const koaStatic = require('koa-static')
const Router = require('koa-router')
const views = require('koa-views')
const bodyparser = require('koa-bodyparser')
const onerror = require('koa-onerror')
const json = require('koa-json')
const log4js = require('./utils/log4js')
// const logger = require('koa-logger')
// const log4js = require('koa-log4')
const session = require('koa-session')

const configs = require('./config/base.config')

const index = require('./routes/index')
const articles = require('./routes/articles')
const admin = require('./routes/admin')
const mobiles = require('./routes/mobiles')
const users = require('./routes/users')
const login = require('./routes/login')
const es = require('./routes/eventsource')

const enterControl = require('./routes/entercontrol')
const errorHandler = require('./routes/errorhandler')

var app
app = new Koa()

onerror(app)

app.keys = configs.session.keys
app.use(log4js.koaLogger(log4js.getLogger('normal'), { level: 'auto' }))
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
// app.use(favicon(path.join(__dirname, 'public/images', 'logo.png')));

// hmr
if (process.env.NODE_ENV == 'DEV') {
  const koaWebpack = require('koa-webpack')
  const Webpack = require('webpack')
  const wp_config = require('./build/webpack.dev.config')
  koaWebpack({
    compiler: Webpack(wp_config),
    devMiddleware: {
      lazy: false,
      publicPath: wp_config[0].devServer.publicPath,
      stats: {
        color: true,
      },
    },
    hotClient: {
      hmr: true,
      reload: true,
      autoConfigure: true,
      allEntries: true,
    },
  }).then((middleware) => {
    app.use(middleware)
  }).catch((err) => {
    console.log(err)
  })
}

// static files
app.use(koaStatic(path.join(__dirname, 'public')))
app.use(koaStatic(path.join(__dirname, 'node_modules/chart.js/dist')))
app.use(koaStatic(path.join(__dirname, 'node_modules/prismjs')))
app.use(koaStatic(path.join(__dirname, 'node_modules/jquery/dist')))
app.use(koaStatic(path.join(__dirname, 'node_modules/markdown-it/dist')))
app.use(koaStatic(path.join(__dirname, 'node_modules/markdown-it-classy/dist')))
app.use(koaStatic(path.join(__dirname, 'node_modules/react/dist')))
app.use(koaStatic(path.join(__dirname, 'node_modules/react-dom/dist')))
// app.use(koaStatic(path.join(__dirname, 'node_modules/simplemde')));
app.use(koaStatic(path.join(__dirname, 'node_modules/template_js')))
app.use(koaStatic(path.join(__dirname, 'node_modules/jquery/dist')))

// 404/ 500...
app.use(errorHandler.errorHandler)

const router = new Router()
router.use('/articles', articles.routes(), articles.allowedMethods())
router.use('/admin', enterControl.adminControl)
router.use('/admin', admin.routes(), admin.allowedMethods())
router.use('/mobiles', mobiles.routes(), mobiles.allowedMethods())
router.use('/users', users.routes(), users.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())
router.use('/es', es.routes(), es.allowedMethods())
app.use(router.routes())
app.use(index.routes(), index.allowedMethods())

app.listen(configs.website_info.port)

module.exports = app
