const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const merge = require('webpack-merge')
const baseConfigs = require('./webpack.base.config')

var webpackConfig = []

webpackConfig[0] = merge(baseConfigs[0], {
  mode: 'production',
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
          MiniCssExtractPlugin.loader,
          'css-loader?-minimize',
          'sass-loader?outputStyle=uncompressed',
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
    new MiniCssExtractPlugin({
      filename: 'css/[name].min.css'
    })
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  }
});

webpackConfig[1] = merge(baseConfigs[1], {
  optimization: {
    minimize: false,
  }
})

module.exports = webpackConfig
