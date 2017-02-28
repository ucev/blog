const configs = require('../config/base.config');
const DEBUG_MODE = configs.website_info.debug;

function debug_log(str) {
  if (DEBUG_MODE) {
    console.log('----------------------debug: ' + str);
  }
}

var __log = {
  debug: debug_log
}

module.exports = __log;