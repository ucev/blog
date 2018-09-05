const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const port = require('../config/base.config').website_info.port
const merge = require('webpack-merge')
const baseConfigs = require('./webpack.base.config')

var webpackConfig = []

function convertToHotLoader(entry, name) {
  var newEntry = {}
  for (var k in entry) {
    newEntry[k] = [
      'react-hot-loader/patch',
      `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true&name=${k}`,
      entry[k]
    ]
  }
  return newEntry
}

function convertToArray(entry) {
  let newEntry = {}
  for (let k in entry) {
    newEntry[k] = [
      entry[k],
    ]
  }
  return newEntry
}

const configName0 = 'react_struct'
const configName1 = 'plain_js'
webpackConfig[0] = merge(baseConfigs[0], {
  name: configName0,
  entry: convertToHotLoader(baseConfigs[0].entry, configName0),
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../public'),
    hot: true,
    port: port,
    publicPath: '/',
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [ '@babel/react', '@babel/env']
          }
        }]
      },
      {
        test: /\.css$|\.scss/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
  ],
  resolve: {
    extensions: ['.js']
  },
  optimization: {
    minimize: false,
  }
})

webpackConfig[1] = merge(baseConfigs[1], {
  name: configName1,
  entry: convertToArray(baseConfigs[1].entry),
  mode: 'development',
  optimization: {
    minimize: false,
  }
})

module.exports = webpackConfig
