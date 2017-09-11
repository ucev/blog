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

/*
var favicon = require('serve-favicon');
//var logger = require('morgan');
var logger = require('./utils/log4js');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');

var mail = require('./utils/mail');
const __log = require('./utils/log');

const DEBUG_MODE = configs.website_info.debug;
*/

/**
 * 用到的扩展😊 
 */
Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  );
};

var app
app = new Koa()

onerror(app)

app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(session(configs.session, app))
// view engine setup
app.use(views(path.join(__dirname, 'views'), {
  extension: 'pug'
}))

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public/images', 'logo.png')));
//app.use(logger('dev'));

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


const router = new Router()
router.use('/articles', articles.routes(), articles.allowedMethods())
router.use('/admin', admin.routes(), admin.allowedMethods())
router.use('/mobiles', mobiles.routes(), mobiles.allowedMethods())
router.use('/users', users.routes(), users.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())
router.use('/es', es.routes(), es.allowedMethods())
app.use(router.routes())
app.use(index.routes(), index.allowedMethods())

/*
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  err.url = req.originalUrl;
  err.status = err.status || 500;

  __log.debug("URL: ", req.originalUrl);
  __log.debug("ERR MSG: " , err.message);
  if (err.status != 404) {
    mail.error_report(req.originalUrl, err.message);
  }

  // render the error page
  res.status(err.status);
  res.render('error', {debug: DEBUG_MODE, err: err});
});
*/

if (process.env.NODE_ENV == 'DEV') {
  app.use(koaConvert(require('./server/server.dev.js')))
}

module.exports = app;
