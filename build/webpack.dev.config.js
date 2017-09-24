const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const port = require('../config/base.config').website_info.port
const merge = require('webpack-merge')
const baseConfigs = require('./webpack.base.config')

var webpackConfig = []

function convertToHotLoader(entry, name) {
  var newEntry = {}
  for (var k in entry) {
    newEntry[k] = [
      'react-hot-loader/patch',
      `webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true&name=${name}`,
      entry[k]
    ]
  }
  return newEntry
}

webpackConfig[0] = merge(baseConfigs[0], {
  name: 'react_struct',
  entry: convertToHotLoader(baseConfigs[0].entry, this.name),
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../public'),
    hot: true,
    port: port,
    publicPath: '/',
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ],
  resolve: {
    extensions: ['.js']
  }
})

webpackConfig[1] = merge(baseConfigs[1])

webpackConfig[2] = merge(baseConfigs[2], {
  name: '__css',
  entry: convertToHotLoader(baseConfigs[2].entry, this.name),
})

module.exports = webpackConfig

/*
{
  name: '__css',
  entry: {
    admin: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true&name=__css',
      path.resolve(__dirname, '../src/css/admin.scss')
    ],
    article_edit: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true&name=__css',
      path.resolve(__dirname, '../src/css/article_edit.scss')
    ],
    base: [
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true&name=__css',
      path.resolve(__dirname, '../src/css/base.scss')
    ],
    md: [
    'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true&name=__css',
    path.resolve(__dirname, '../src/css/md.scss')
  ],
  },
  output: {
    path: path.resolve(__dirname, '../public/css'),
    publicPath: '/css',
    filename: '[name].css'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../public'),
    hot: true,
    port: port,
    publicPath: '/',
    historyApiFallback: true
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: {
          }
        }, {
          loader: 'sass-loader'
        }]
      })
    }]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ExtractTextPlugin({
      filename: '[name].css'
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    })
  ]
}*/