// webpack.config.js
const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: {
    app: path.resolve(__dirname, 'client', 'app-client.js')/*,
     vendor: ['react', 'react-dom']*/
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'static', 'js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'client'),
          path.resolve(__dirname, 'server'),
          path.resolve(__dirname, 'config'),
        ],
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: 'babel_cache',
          presets: ['react', 'es2015'],
          plugins: ['transform-object-rest-spread']
        }
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'client'),
        loader: ExtractTextPlugin.extract('style', 'css-loader')
      },
      {
        test: /\.png$/,
        include: path.resolve(__dirname, 'client'),
        loader: 'url-loader?name=img/img-[has:6].[ext]'
      },
      // Font Definitions
      {
        test: /\.(eot|svg|ttf|woff|woff2)+(\?v=\d+\.\d+\.\d+)*$/,
        loader: 'file-loader?name=public/fonts/[name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development'),
      'process.env.SERVER_NAME': JSON.stringify(process.env.SERVER_NAME) || JSON.stringify('localhost'),
      'process.env.SERVER_PORT': JSON.stringify(process.env.SERVER_PORT) || 85
    }),
    new ExtractTextPlugin('styles.css')
    /*,
     new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')*/
  ]
};


if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'eval'
}

module.exports = config;
