var path = require('path');
var webpack = require('webpack');
var node_modules = path.resolve(__dirname, 'node_modules');

var definePlugin = new webpack.DefinePlugin({
	__DEV__:true
});

module.exports = {
	devtool: 'source-map',
    
    entry: 
	{
        browser: "./component_src/browser.jsx"
    },
	
	resolve: {
		alias: {
			'react': path.join(__dirname, 'node_modules', 'react')
		}
	},
	resolveLoader: {
		'fallback': path.join(__dirname, 'node_modules')
	},
	output: {
		path: path.join(__dirname, 'app'),
		filename: 'boilerplate.js'
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel?presets[]=es2015',
			exclude: [node_modules],
			include: path.join(__dirname, 'component_src'),
		},{
			test: /\.css$/,
			loaders: ['style', 'css']
		}]
	},
	plugins:[new webpack.DefinePlugin({
		"process.env": {
			// This has effect on the react lib size
			//set to production for build
			"NODE_ENV": JSON.stringify("development")
		},
		__DEV__:true
	})]

};