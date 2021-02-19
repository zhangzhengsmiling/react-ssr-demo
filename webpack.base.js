const path = require('path');

const webpackConfigBase = {
	mode:'development',
	resolve: {
		extensions: ['.jsx', '.js', '.less', '.scss', '.sass', '.css', '.json'],
		alias: {
			"@": path.resolve(__dirname),
			// "@": path.resolve(__dirname, 'containers/preview/src'),
			// layout: path.resolve(__dirname, 'containers/preview/src/layout'),
			// components: path.resolve(__dirname, 'containers/preview/src/components/'),
			// assets: path.resolve(__dirname, 'containers/preview/public/assets'),
			// pages: path.resolve(__dirname, 'containers/preview/src/pages/'),
			// utils: path.resolve(__dirname, 'containers/preview/src/utils/'),
			// packages:path.resolve(__dirname, 'containers/packages')
		}
	},
	module: {
		rules: [{
		   test:   /(.js|.jsx)$/,
		   loader:'babel-loader',
		   exclude: /node_modules/,
		   options: {
				 presets: ['@babel/preset-react',['@babel/preset-env']],
				 plugins: ['@babel/plugin-proposal-class-properties']
		   }
	   }, {
			test:   /(.ts|.tsx)$/,
			loader:'ts-loader',
			exclude: /node_modules/,
		}]
	}
}

module.exports = webpackConfigBase;
