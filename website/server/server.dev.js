const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const webpackConfig = require(path.join(__dirname, '../../webpack.dev.config'));

const compiler = webpack(webpackConfig);
const server = new webpackDevServer(compiler, {
  contentBase: path.join(__dirname, '../public'),
  stats: {
    color: true
  }
})

module.exports = server;
