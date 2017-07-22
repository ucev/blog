const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const port = require('./website/config/base.config').website_info.port;


function copyJs(fname) {
  return {
    entry: [
      path.resolve(__dirname, './src/js/', fname)
    ],
    output: {
      path: path.resolve(__dirname, './website/public/js'),
      publicPath: '/js',
      filename: fname
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
        filename: fname
      })
    ]
  }
}

module.exports = [{
  entry: {
    client_struct:
    [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${port}`,
      path.resolve(__dirname, './src/js/client_struct.js')
    ],
    my_struct: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${port}`,
      path.resolve(__dirname, './src/js/my_struct.js')
    ]
  },
  output: {
    library: 'MyStructs',
    path: path.resolve(__dirname, './website/public/js'),
    publicPath: '/js',
    filename: '[name].min.js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './website/public'),
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
            presets: ['es2015', 'react']
          }
        }]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],
  resolve: {
    extensions: ['.js']
  }
},
copyJs('admin.js'),
copyJs('article_edit.js'),
copyJs('base.js'),
{
  entry: {
    admin: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${port}`,
      path.resolve(__dirname, './src/css/admin.scss')
    ],
    article_edit: [
      'react-hot-loader/patch',
      `webpack-dev-server/client?http://localhost:${port}`,
      path.resolve(__dirname, './src/css/article_edit.scss')
    ],
    base: path.resolve(__dirname, './src/css/base.scss'),
    md: path.resolve(__dirname, './src/css/md.scss'),
  },
  output: {
    path: path.resolve(__dirname, './website/public/css'),
    publicPath: '/css',
    filename: '[name].css'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, './website/public'),
    publicPath: '/',
    hot: true,
    port: port,
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
    })
  ]
}]