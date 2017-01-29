// webpack.config.js
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let nodeModules = {};

fs.readdirSync(path.resolve(__dirname, 'node_modules'))
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => {
    nodeModules[mod] = `commonjs ${mod}`;
  });

const config = {
  entry: {
    server: path.resolve(__dirname, 'src', 'lib', 'server')
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'src', 'dist'),
    filename: 'server.js'
  },
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel',
        exclude: /node_modules/,
        query: {
          cacheDirectory: 'babel_server_cache',
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        loader: ExtractTextPlugin.extract('style', 'css-loader')
      },
      {
        test: /\.png$/,
        include: path.resolve(__dirname, 'src'),
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
     new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
     new webpack.HotModuleReplacementPlugin()*/
  ]
};

/*if (false && process.env.NODE_ENV !== 'production') {
 config.entry = [
 'webpack/hot/dev-server',
 'webpack-hot-middleware/client',
 './src/lib/server'
 ]
 config.output = {
 path: '/',
 publicPath: `http://localhost:${process.env.PORT || 8080}/scripts/`,
 filename: 'bundle.js'
 }
 }*/

module.exports = config;
