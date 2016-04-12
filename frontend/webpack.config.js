const path = require('path');

module.exports = {
  entry: "./entry.js",
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: "style!css"
    }, {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/, //这两种文件不编译
      loader: 'babel', // 'babel-loader' is also a legal name to reference
      query: {
        presets: ['react', 'es2015']
      }
    }]
  }
};
