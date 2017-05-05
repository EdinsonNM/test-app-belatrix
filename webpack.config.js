var webpack = require('webpack'),
path = require('path'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports={
  entry:{
    app:'./src/index.ts'
  },
  output:{
    path:path.resolve(__dirname,'build'),
    filename:'bundle.js'
  },
  resolve:{
    extensions:['.ts','.txt','.html'],
    modules: ['node_modules', 'src']
  },
  devServer:{
    contentBase: path.resolve(__dirname, 'public'),
    host:'0.0.0.0',
    port:9000,
    inline:false
  },
  module:{
    loaders:[
       {
        test: /\.ts?$/,
        loader: 'ts-loader'
      },
      {
        test: /(\.txt|\.html)$/,
        use: 'raw-loader'
      }
    ]
  },
  externals: {},
	plugins:[
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, 'public/index.html'),
			hash: true,
			filename: 'index.html',
			inject: 'body'
		}),
		new CopyWebpackPlugin([]),
    
	],
	devtool: "source-map"
};
