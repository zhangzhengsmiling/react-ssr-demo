const path = require('path');
const rootDir = path.resolve(__dirname, '../');

const webpackConfigBase = {
	mode:'development',
	resolve: {
		extensions: ['.jsx', '.js', '.less', '.scss', '.sass', '.css', '.json'],
		alias: {
			"@": rootDir,
		}
	},
	module: {
		rules: [{
		   test:   /(.js|.jsx)$/,
		   loader:'babel-loader',
			 exclude: /node_modules/,
		   options: {
				 presets: ['@babel/preset-react',['@babel/preset-env']],
				 plugins: [
					'@babel/plugin-proposal-class-properties',
					["import", { 
						"libraryName": "antd",
						"libraryDirectory": "lib",  // libraryDirectory 默认为 lib
						"style": true ,
					}],
				],
				cacheDirectory: true
		   }
	   }, {
			test:   /(.ts|.tsx)$/,
			loader:'ts-loader',
			exclude: /node_modules/,
		}]
	}
}

module.exports = webpackConfigBase;
