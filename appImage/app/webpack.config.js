// webpack.config.js
const webpack = require('webpack');
const path = require('path');

const config = {
  entry: {
    app: path.join(__dirname, 'src', 'app-client.js')/*,
    vendor: ['react', 'react-dom']*/
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'src', 'static', 'js'),
    filename: 'bundle.js'
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
    })/*,
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')*/
  ]
};


if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'eval'
}

module.exports = config;
