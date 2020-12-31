
const webpackConfigBase = {
	mode:'development',           //开发模式
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
	   }]
	}
}

module.exports = webpackConfigBase;
