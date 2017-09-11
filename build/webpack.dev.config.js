const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const port = require('../config/base.config').website_info.port;


function copyJs(fname) {
  return {
    entry: [
      path.resolve(__dirname, '../src/js/', fname)
    ],
    output: {
      path: path.resolve(__dirname, '../public/js'),
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

[{
  entry: {
    client_struct:
    [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true',
      path.resolve(__dirname, '../src/js/client_struct.js')
    ],
    my_struct: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true',
      path.resolve(__dirname, '../src/js/my_struct.js')
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
},
copyJs('admin.js'),
copyJs('article_edit.js'),
copyJs('base.js'),
{
  entry: {
    admin: [
      'react-hot-loader/patch',
      //'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true',
      path.resolve(__dirname, '../src/css/admin.scss')
    ],
    article_edit: [
      'react-hot-loader/patch',
      //'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true',
      path.resolve(__dirname, '../src/css/article_edit.scss')
    ],
    base: path.resolve(__dirname, '../src/css/base.scss'),
    md: path.resolve(__dirname, '../src/css/md.scss'),
  },
  output: {
    path: path.resolve(__dirname, '../public/css'),
    publicPath: '/css',
    filename: '[name].css'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '../public'),
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


/**
 * 单个 compiler 可以热重载，多个会无限重载，待修复
 * 还要把 style 的打包整合起来
 */ 
module.exports = [{
  name: "react-component-struct",
  entry: {
    client_struct:
    [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true',
      path.resolve(__dirname, '../src/js/client_struct.js')
    ],
    my_struct: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true',
      path.resolve(__dirname, '../src/js/my_struct.js')
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
}*/
]