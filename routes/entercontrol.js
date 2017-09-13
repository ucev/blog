const crypto = require('crypto');
const configs = require('../config/base.config');

const FluxRecord = require('../class/fluxrecord');
const __fluxrecord = new FluxRecord();

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

async function userControl(ctx, next) {
  var ip = ctx.ip;
  var usercookie = ctx.cookies.get('usercookie');
  if (!usercookie) {
    var key = ip + ':' + new Date().getTime() + Math.floor(Math.random() * 1000);
    usercookie = md5(key);
    ctx.cookies.set('usercookie', usercookie, {path: '/', expire: getCookieExpire()});
  }
  var time = Math.floor(new Date().getTime() / 1000);
  try {
    __fluxrecord.visit({
            usercookie: usercookie,
            ip: ip,
            time: time
          })
  } catch (err) {}
  return next();
}

async function adminControl(ctx, next) {
  var this_session = undefined;
  if (configs.website_info.debug) {
    this_session = configs.website_info.debug_session;
  } else {
    this_session = configs.qqlogin.allowed_openid;
  }
  if (ctx.session.openid == this_session) {
    await next();
  } else {
    ctx.redirect('/login');
  }
}

exports.userControl = userControl;
exports.adminControl = adminControl;
exports.clearDateTime = clearDateTime;