const path = require('path');

module.exports = {
  entry: "./entry.js",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "bundle.js"
  },
  module: {
    loaders: [{ //基本css
      test: /\.css$/,
      loader: "style!css"
    }, { //babel-loader
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/, //这两种文件不编译
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['react', 'es2015']
      }
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
  devServer: {
    contentBase: __dirname, // 当前服务目录
    port: 3000,
    inline: true, //
    historyApiFallback: true,
    status: {
      colors: true
    },
    // hot: true,
    // proxy: {
    //   '*': 'http://127.0,0.1:3001'
    // }
  }
};
