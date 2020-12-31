const { merge } = require('webpack-merge');
const webpackConfigBase = require('./webpack.base');
const path = require('path')                    //node的path模块

const webpackConfigClient = {
    entry:'./client/index.js',              //入口
    output: {                                   //打包出口
        filename:'index.js',                    //打包后的文件名
        path:path.resolve(__dirname,'public')   //存放到根目录的build文件夹
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
