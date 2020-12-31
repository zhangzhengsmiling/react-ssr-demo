const { merge } = require('webpack-merge');
const webpackConfigBase = require('./webpack.base');
const path = require('path');

const webpackConfigClient = {
    entry:'./client/index.js',
    output: {
        filename:'index.js',
        path:path.resolve(__dirname,'public'),
    },
    resolve: {
		extensions: ['.jsx', '.js', '.less', '.scss', '.sass', 'css', '.json'],
	},
    module: {
        rules: [{
           test: /\.less?$/,
           use: ['style-loader', 'css-loader', 'less-loader'],
       }]
    }
}

module.exports = merge({}, webpackConfigBase, webpackConfigClient);
