const path = require('path');
const webpack = require('webpack');

module.exports = {
  devServer: {
    stats: 'errors-only'
  },
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './app/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json',
        include: path.join(__dirname, 'app')
      },
      {
        test: /\.css$/,
        loader: 'style!css'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.less$/,
        loaders: ['style', 'css', 'less']
      },
      {
        test: /\.png$/,
        loader: 'url?.[ext]&mimetype=image/png'
      },
      {
        test: /\.gif$/,
        loader: 'url-loader?mimetype=image/png'
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file'
      },
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: path.join(__dirname, 'app')
      }
    ]
  }
};
