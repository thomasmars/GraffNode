// webpack.config.js
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');
let nodeModules = {};

fs.readdirSync(path.resolve(__dirname, 'node_modules'))
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(mod => { nodeModules[mod] = `commonjs ${mod}`; });

const config = {
  entry: {
    server: './src/lib/server'/*,
    vendor: ['react', 'react-dom']*/
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'src', 'dist'),
    filename: 'server.js'
  },
  externals: nodeModules,
  module: {
    loaders: [{
      test: /\.js$/,
      include: path.join(__dirname, 'src'),
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        cacheDirectory: 'babel_server_cache',
        presets: ['react', 'es2015']
      }
    },
      { test: /\.json$/, loader: 'json-loader'}
    ]
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js']
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) || JSON.stringify('development'),
      'process.env.SERVER_NAME': JSON.stringify(process.env.SERVER_NAME) || JSON.stringify('localhost'),
      'process.env.SERVER_PORT': JSON.stringify(process.env.SERVER_PORT) || 85
    })/*,
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
