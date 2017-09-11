const path = require('path')
const webpack = require('webpack')
const webpackDevServer = require('koa-webpack-dev-middleware')
const webpackConfig = require(path.join(__dirname, '../../webpack.dev.config'))

const compiler = webpack(webpackConfig)
const server = webpackDevServer(compiler)

module.exports = server;
