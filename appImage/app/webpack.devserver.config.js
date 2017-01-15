// webpack.config.js
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const config = {
  entry: [
    'webpack/hot/dev-server',
    'webpack-hot-middleware/client',
    './src/dist/server'
  ],
  output: {
    path: '/',
    publicPath: `http://localhost:${process.env.PORT || 8080}/scripts/`,
    filename: 'bundle.js'
  },
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src', 'dist'),
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['react', 'es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development'),
      'process.env.SERVER_NAME': JSON.stringify(process.env.SERVER_NAME) || JSON.stringify('localhost'),
      'process.env.SERVER_PORT': JSON.stringify(process.env.SERVER_PORT) || 85
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = config;
