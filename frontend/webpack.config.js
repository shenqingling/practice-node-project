const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:3000', // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    "./entry.js"
  ],
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
      loaders: ['react-hot', 'babel'], // 'babel-loader' is also a legal name to reference
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
    stats: {
      colors: true
    },
    hot: true,
    // proxy: {
    //   '*': 'http://127.0,0.1:3001'
    // }
  },
  babel: {
    presets: ['react', 'es2015']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
