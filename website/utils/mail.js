const nodemailer = require('nodemailer');
const util = require('util');
const mailconfig = require('../config/base.config').mail_config;

var lastErrorTime = -1;
var errorCnt = 0;

function error_report(url, msg) {
  var now = Date.now();
  if (now - lastErrorTime < 60 * 10 * 1000) {
    return;
  }
  var preTime = lastErrorTime;
  lastErrorTime = now;
  var transport = nodemailer.createTransport(mailconfig.connect);
  var mailOptions = {
    from: mailconfig.admin,
    to: mailconfig.admin,
    subject: 'Error Report',
    text: 'ERROR REPORT',
    html: util.format(error_tpl, url, msg)
  };
  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      //
      lastErrorTime = preTime;
      console.log("error");
    } else {
      console.log(`mail sent: ${info.response}`);
    }
  })
}

const error_tpl = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta charset = "utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>ERROR REPORT!</title>
  </head>
  <body>
    <table>
    <tr>
      <th>标题</th>
      <td>ERROR REPORT</td>
    <tr>
      <th>网址</th>
      <td>%s</td>
    </tr>
    <tr>
      <th>错误信息</th>
      <td>%s</td>
    </tr>
    </table>
  </body>
</html>
`;

exports.error_report = error_report;
exports.error_tpl = error_tpl;