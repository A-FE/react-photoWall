/*
 * Webpack development server configuration
 *
 * This file is set up for serving the webpack-dev-server, which will watch for changes and recompile as required if
 * the subfolder /webpack-dev-server/ is visited. Visiting the root will not automatically reload.
 */
'use strict';
var webpack = require('webpack');

module.exports = {

  output: {
    filename: 'main.js',
    publicPath: '/assets/'      // 没有path路径，文件没有存储在磁盘上，而是存储在内存中
  },

  cache: true,
  debug: true,
  devtool: 'sourcemap',
  entry: [
      'webpack/hot/only-dev-server',        // 加载node_modules目录中的文件
      './src/components/ReactPhotoWallApp.js'
  ],

  stats: {
    colors: true,
    reasons: true
  },

  resolve: {
    extensions: ['', '.js', '.jsx'],
    alias: {                                // 为目录指定别名
      'styles': __dirname + '/src/styles',
      'mixins': __dirname + '/src/mixins',
      'components': __dirname + '/src/components/'
    }
  },
  module: {
    preLoaders: [{              // 提前解析模块
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'eslint-loader'   // 代码校验
    }],
    loaders: [{                 // 解析模块
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel-loader'  // 从右往左开始执行，react-hot：实时编译react组件的loader
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpg|woff|woff2)$/,
      loader: 'url-loader?limit=8192'
    }]
  },

  plugins: [    // 插件
    new webpack.HotModuleReplacementPlugin()        // 热更新插件
  ]

};
