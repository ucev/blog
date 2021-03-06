/* global __dirname */
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = [
  {
    entry: {
      client_struct: resolve('src/js/client-struct.js'),
      my_struct: resolve('src/js/my-struct.js'),
      article_edit: resolve('src/js/article-edit.js'),
    },
    output: {
      library: 'MyStructs',
      path: resolve('public'),
      publicPath: '/',
      filename: 'js/[name].min.js',
    },
    resolve: {
      alias: {
        $actions: resolve('src/js/redux/actions'),
        $components: resolve('src/js/components'),
        $reducers: resolve('src/js/redux/reducers'),
        $redux: resolve('src/js/redux'),
        $utils: resolve('src/js/redux/utils'),
        $css: resolve('src/css'),
      },
    },
  },
  {
    entry: {
      admin: resolve('src/js/admin.js'),
      base: resolve('src/js/base.js'),
    },
    output: {
      path: path.resolve(__dirname, '../public/js'),
      publicPath: '/js',
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: ExtractTextPlugin.extract({
            use: [
              {
                loader: 'raw-loader',
              },
            ],
          }),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin({
        filename: '[name].js',
      }),
    ],
  },
]
