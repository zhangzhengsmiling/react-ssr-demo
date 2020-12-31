
const webpackConfigBase = {
	mode:'development',
	resolve: {
		extensions: ['.jsx', '.js', '.less', '.scss', '.sass', 'css', '.json'],
	},
	module: {
		rules: [{
		   test:   /(.js|.jsx)$/,
		   loader:'babel-loader',
		   exclude: /node_modules/,
		   options: {
			   presets: ['@babel/preset-react',['@babel/preset-env']]
		   }
	   }]
	}
}

module.exports = webpackConfigBase;
