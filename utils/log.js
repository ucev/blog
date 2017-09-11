const configs = require('../config/base.config');
const utils = require('util');
const DEBUG_MODE = configs.website_info.debug;

function debug_log(o) {
  if (DEBUG_MODE) {
    if (typeof o == 'string') {
      console.log('----------------------debug: ' + o);
    } else {
      console.log(utils.inspect(o));
    }
  }
}

var __log = {
  debug: debug_log
}

module.exports = __log;