const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = [{
  entry: {
    client_struct: path.resolve(__dirname, '../src/js/client_struct.js'),
    my_struct: path.resolve(__dirname, '../src/js/my_struct.js')
  },
  output: {
    library: 'MyStructs',
    path: path.resolve(__dirname, '../public/js'),
    publicPath: '/js',
    filename: '[name].min.js'
  },
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
    })
  ]
}, {
  entry: {
    article_edit: path.resolve(__dirname, '../src/js/article_edit.js'),
    admin: path.resolve(__dirname, '../src/js/admin.js'),
    base: path.resolve(__dirname, '../src/js/base.js')
  },
  output: {
    path: path.resolve(__dirname, '../public/js'),
    publicPath: '/js',
    filename: '[name].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: ExtractTextPlugin.extract({
        use: [{
          loader: 'raw-loader'
        }]
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].js'
    })
  ]
}, {
  entry: {
    admin: path.resolve(__dirname, '../src/css/admin.scss'),
    article_edit: path.resolve(__dirname, '../src/css/article_edit.scss'),
    base: path.resolve(__dirname, '../src/css/base.scss'),
    md: path.resolve(__dirname, '../src/css/md.scss')
  },
  output: {
    library: 'Ope',
    path: path.resolve(__dirname, '../public/css'),
    publicPath: '/css',
    filename: '[name].css'
  },
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
}]