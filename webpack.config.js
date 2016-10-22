const webpack = require('webpack')

module.exports = {
	context: `${__dirname}/src`,
	entry: './index.js',
	output: {
		path: `${__dirname}/public/scripts`,
		filename: 'webpack.js'
	},

	module: {
		loaders: [
			// babel-loader
			{
	      test: /(\.js|\.jsx)$/,
	      exclude: /(node_modules|bower_components)/,
	      loader: 'babel-loader',
	      query: {
	        presets: ['es2015', 'react'],
					plugins: [
						'transform-decorators-legacy',
						'transform-class-properties',
						"transform-flow-strip-types"
					]
	      }
			},

			// stylus-loader
			{
				test: /\.styl$/,
				loader: 'style-loader!css-loader!stylus-loader'
			},

			// svg-loader
			{
        test: /\.svg$/, loader: 'babel?presets[]=es2015,presets[]=react!svg-react'
      }
		]
	}
}
