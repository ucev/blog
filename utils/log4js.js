var config = require('../config/base.config')
const log4js = require('koa-log4')

if (config.website_info.debug) {
  log4js.configure({
    appenders: {
      out: { type: 'console' },
    },
    categories: {
      default: {
        appenders: ['out'],
        level: 'debug',
      },
    },
  })
} else {
  log4js.configure({
    appenders: {
      out: {
        type: 'file',
        filename: './log/logfile.log',
        maxLogSize: 1024000,
        backups: 3,
        category: 'normal',
      },
    },
    categories: {
      default: {
        appenders: ['out'],
        level: 'warn',
      },
    },
  })
}

module.exports = log4js

//module.exports = log4js.connectLogger(logger, { level: log4js.levels.INFO, format: ':method :url' });
