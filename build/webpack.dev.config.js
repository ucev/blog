const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const port = require('../config/base.config').website_info.port;

module.exports = [{
  name: "react_struct",
  entry: {
    /*
    client_struct:
    [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true&name=react_struct',
      path.resolve(__dirname, '../src/js/client-struct.dev.js')
    ],*/
    my_struct: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true&name=react_struct',
      path.resolve(__dirname, '../src/js/my-struct.dev.js')
    ]
  },
  output: {
    library: 'MyStructs',
    path: path.resolve(__dirname, '../public/js'),
    publicPath: '/js',
    filename: '[name].min.js'
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
},/*
{
  name: "raw-jsfile",
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
},
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
]