const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const baseConfigs = require('./webpack.base.config')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var webpackConfig = []

webpackConfig[0] = merge(baseConfigs[0], {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }]
      },
      {
        test: /\.css$|\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }]
        })
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        drop_console: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].min.css'
    })
  ]
})

webpackConfig[1] = merge(baseConfigs[1])

// 疑问

webpackConfig[2] = Object.assign(baseConfigs[2], {
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
          options: {
            minimize: true
          }
        }, {
          loader: 'sass-loader'
        }]
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ]
})

module.exports = webpackConfig
