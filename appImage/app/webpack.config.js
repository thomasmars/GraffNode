// webpack.config.js
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
    'static/js/bundle': path.join(__dirname, 'src', 'app-client.js')
    // 'dist/server': path.join(__dirname, 'src', 'lib', 'server.js')
  },
  output: {
    path: path.join(__dirname, 'src'),
    filename: '[name].js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      include: path.join(__dirname, 'src'),
      loader: ['babel-loader'],
      query: {
        cacheDirectory: 'babel_cache',
        presets: ['react', 'es2015']
      }
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development'),
      'process.env.SERVER_NAME': JSON.stringify(process.env.SERVER_NAME) || JSON.stringify('localhost'),
      'process.env.SERVER_PORT': JSON.stringify(process.env.SERVER_PORT) || 85
    })
  ]
};
