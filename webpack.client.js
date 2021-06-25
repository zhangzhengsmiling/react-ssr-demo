const { merge } = require('webpack-merge');
const webpackConfigBase = require('./webpack.base');
const path = require('path');

const webpackConfigClient = {
  entry:'./client/index.js',
  output: {
    filename:'bundle.js',
    path:path.resolve(__dirname,'public'),
  },
  module: {
    rules: [
      {
        test: /\.less?$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            esModule: false,
          }
        }, {
          loader: 'less-loader',
          options: {
            lessOptions: {
              javascriptEnabled: true
            }
          }
        }],
      },
      {
        test: /\.css?$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            esModule: false,
          }
        }],
      }
    ]
  }
}

module.exports = merge({}, webpackConfigClient, webpackConfigBase);
