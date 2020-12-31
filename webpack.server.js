const path = require('path');    //node的path模块
const nodeExternals = require('webpack-node-externals');
const webpackConfigBase = require('./webpack.base');
const { merge } = require('webpack-merge');

const webpackConfigClient = {
	target:'node',
	entry:'./server/index.js',             //入口
	output: {                     //打包出口
		filename:'bundle.js',     //打包后的文件名
		path:path.resolve(__dirname,'build')    //存放到根目录的build文件夹
	},
	// webpack-node-externals的目的是为了防止node_modules目录下的第三方模块被打包进去，因为nodejs默认会去node_modules目录下去寻找和使用第三方模块。
	externals: [nodeExternals()],  //保持node中require的引用方式
	module: {
		rules: [{
			test: /\.less?$/,
			use: ['ignore-loader'],
		}]
	}
}

module.exports = merge({}, webpackConfigBase, webpackConfigClient);
