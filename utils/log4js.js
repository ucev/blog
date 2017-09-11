var config = require('../config/base.config');
const log4js = require('log4js');

if (config.website_info.debug) {
  log4js.configure({
    appenders: [
      { type: 'console' }
    ]
  });
} else {
  log4js.configure({
    appenders: [
      //{ type: 'console' },
      {
        type: 'file',
        filename: './log/logfile.log',
        maxLogSize: 1024000,
        backups: 3,
        category: 'normal'
      }
    ]
  });
}

var logger = log4js.getLogger('normal');
logger.setLevel('info');

module.exports = log4js.connectLogger(logger, { level: log4js.levels.INFO, format: ':method :url' });