const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    "./entry.js"
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/build/'
  },
  module: {
    loaders: [{ //基本css
      test: /\.css$/,
      loader: "style!css"
    }, { //babel-loader
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/, //这两种文件不编译
      loaders: ['react-hot', 'babel'] // 'babel-loader' is also a legal name to reference
    }, { //bootstrap-webpack
      test: /\.(woff|woff2)$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff"
    }, {
      test: /\.ttf$/,
      loader: "file-loader"
    }, {
      test: /\.eot$/,
      loader: "file-loader"
    }, {
      test: /\.svg$/,
      loader: "file-loader"
    }, { //确保加载完jquery在加载bootstrap
      test: /\/bootstrap\/js\//,
      loader: 'imports?jQuery=jquery'
    }]
  },
  babel: {
    presets: ['react', 'es2015']
  }
};
