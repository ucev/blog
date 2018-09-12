const configs = require('../config/base.config')
const DEBUG_MODE = configs.website_info.debug

const mail = require('../utils/mail')

function cssError (url) {
  return `
/**
 * css file '${url}'not exist */
 */
`
}

function jsError (url) {
  return `
/**
 * js file '${url}'not exist
 */
console.error('js file ${url} not exist')
`
}

async function errroHandler (ctx, next) {
  try {
    await next()
    if (parseInt(ctx.status) == 404) {
      const originalUrl = ctx.originalUrl
      if (originalUrl.endsWith('css')) {
        console.log('---- css')
        ctx.body = cssError(originalUrl)
      } else if (originalUrl.endsWith('js')) {
        console.log('--- js')
        ctx.body = jsError(originalUrl)
      } else {
        console.error('--- not found')
        ctx.throw('Not Found', 404)
      }
    }
  } catch (error) {
    console.log(error)
    error.status = error.status || 500
    error.url = ctx.originalUrl
    if (error.status != 404 && !DEBUG_MODE) {
      try {
        mail.error_report(ctx.originalUrl, error.message)
      } catch (err) {
        // 错误处理
        console.log(err)
      }
    }
    await ctx.render('error', { debug: DEBUG_MODE, error: error })
  }
}

exports.errorHandler = errroHandler
