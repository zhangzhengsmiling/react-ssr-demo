const path = require('path')    //node的path模块
const nodeExternals = require('webpack-node-externals')

module.exports = {
	target:'node',
	mode:'development',           //开发模式
	entry:'./server/index.js',             //入口
	output: {                     //打包出口
		filename:'bundle.js',     //打包后的文件名
		path:path.resolve(__dirname,'build')    //存放到根目录的build文件夹
	},
	// webpack-node-externals的目的是为了防止node_modules目录下的第三方模块被打包进去，因为nodejs默认会去node_modules目录下去寻找和使用第三方模块。
	externals: [nodeExternals()],  //保持node中require的引用方式
	resolve: {
		extensions: ['.jsx', '.js', '.less', '.scss', '.sass', 'css', '.json'],
	},
	module: {
		rules: [{                  //打包规则
		   test:   /\.js?$/,       //对所有js文件进行打包
		   loader:'babel-loader',  //使用babel-loader进行打包
		   exclude: /node_modules/,//不打包node_modules中的js文件
		   options: {
			   presets: ['@babel/preset-react',['@babel/preset-env']]
		   }
	   }, {
			test: /\.less?$/,
			use: ['ignore-loader'],
		}]
	}
}
