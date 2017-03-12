var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');

var admin = require('./routes/admin');
var articles = require('./routes/articles');
var index = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var es = require('./routes/eventsource');

var enterControl = require('./routes/entercontrol');

var configs = require('./config/base.config');
const DEBUG_MODE = configs.website_info.debug;


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
Date.prototype.format = function (fmt) { //author: meizz
  var o = {
    "M+": this.getMonth() + 1, //月份
    "d+": this.getDate(), //日
    "h+": this.getHours(), //小时
    "m+": this.getMinutes(), //分
    "s+": this.getSeconds(), //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "S": this.getMilliseconds() //毫秒
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cookieSession(configs.session));
app.use(express.static(path.join(__dirname, 'public')));

// nodejs modules
app.use(express.static(path.join(__dirname, 'node_modules/chart.js/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/prismjs')))
app.use(express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/markdown-it/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/markdown-it-classy/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/react/dist')));
app.use(express.static(path.join(__dirname, 'node_modules/react-dom/dist')));
//app.use(express.static(path.join(__dirname, 'node_modules/simplemde')));
app.use(express.static(path.join(__dirname, 'node_modules/template_js')));

app.use('/admin', enterControl.adminControl);
app.use('/admin', admin);
app.use('/articles', enterControl.userControl);
app.use('/articles', articles);
app.use('/users', users);
app.use('/login', login);
app.use('/es', es);
app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.redirect('/');/*
  var err = new Error('Not Found');
  err.status = 404;
  next(err);*/
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(configs.website_info.port);

module.exports = app;
