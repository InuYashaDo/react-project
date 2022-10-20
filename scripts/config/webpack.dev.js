const Webpack = require('webpack');
const path = require('path');
const ErrorOverlayWebpackPlugin = require('error-overlay-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { SERVER_HOST, SERVER_PORT } = require('../conf');
const proxySettings = require('../proxy');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    host: SERVER_HOST,
    port: SERVER_PORT,
    hot: true,
    open: true,
    compress: true,
    client: {
      logging: 'none',
      overlay: false,
    },
    proxy: {
      ...proxySettings,
    },
    historyApiFallback: true,
  },
  plugins: [
    new ErrorOverlayWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:5040'],
        notes: [
          'Some additional notes to be displayed upon successful compilation',
        ],
      },
      onErrors: (severity, errors) => {
        if (severity !== 'error') {
          return;
        }
      },
      // should the console be cleared between each compilation?
      // default is true
      clearConsole: true,
    }),
    new Webpack.HotModuleReplacementPlugin(),
  ],
  stats: 'none',
  devtool: 'cheap-module-source-map',
});
