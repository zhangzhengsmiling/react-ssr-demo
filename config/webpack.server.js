const path = require('path');
const nodeExternals = require('webpack-node-externals');
const webpackConfigBase = require('./webpack.base');
const { merge } = require('webpack-merge');

const webpackConfigClient = {
  target:'node',
  entry: path.resolve(__dirname, '../server/index.js'),
  output: {
    filename:'bundle.js',
    path:path.resolve(__dirname,'../build')
  },
  // webpack-node-externals的目的是为了防止node_modules目录下的第三方模块被打包进去
  // 因为nodejs默认会去node_modules目录下去寻找和使用第三方模块。
  // externals: [nodeExternals()],  //保持node中require的引用方式
  // plugins: [new MiniCssExtractPlugin()],
  module: {
    rules: [
      {
        test: /\.less?$/,
        // include: /node_modules/,
        use: ['isomorphic-style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            esModule: false,
          }
        } , {
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
        use: ['isomorphic-style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 1,
            esModule: false,
          }
        }],
      }
    ]
  },
}

module.exports = merge({}, webpackConfigClient, webpackConfigBase);
