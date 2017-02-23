const crypto = require('crypto');
const configs = require('../config/base.config');

function md5(str) {
  var md5sum = crypto.createHash('md5');
  md5sum.update(str);
  return md5sum.digest('hex');
}

function clearDateTime(date) {
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date;
}

function getCookieExpire() {
  var d = new Date();
  d.setDate(d.getDate() + 1);
  d = clearDateTime(d);
  return d.getTime();
}

function userControl(req, res, next) {
  var ip = req.ip;
  var usercookie = req.cookies.usercookie;
  if (!usercookie) {
    var key = ip + ':' + new Date().getTime() + Math.floor(Math.random() * 1000);
    usercookie = md5(key);
    res.cookie('usercookie', usercookie, {path: '/', expire: getCookieExpire});
  }
  var time = Math.floor(new Date().getTime() / 1000);
  var today = Math.floor(clearDateTime(new Date()).getTime());
  const mysql = require('mysql');
  const conn = mysql.createConnection(configs.database_config);
  conn.query('insert into uservisit set ?', [{
      usercookie: usercookie,
      ip: ip,
      time: time
    }], (err, results, fields) => {
      conn.end((err) => {

      });
    }
  )
  next();
}

function adminControl(req, res, next) {
  var this_session = undefined;
  if (configs.website_info.debug) {
    this_session = configs.website_info.debug_session;
  } else {
    this_session = configs.qqlogin.allowed_openid;
  }
  if (req.session.openid == this_session) {
    next();
  } else {
    res.redirect('/login');
  }
}

exports.userControl = userControl;
exports.adminControl = adminControl;
exports.clearDateTime = clearDateTime;