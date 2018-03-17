
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')
var config = {
  entry: './src/main.js',

  output: {
    path: `${__dirname}/assets`,
    publicPath: '/',
    filename: 'bundle.js'
  },

  devServer: {
    inline: true,
    host: 'localhost',
    port: 9000
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css-loader!sass-loader')
      }, {
        test: /\.(otf|png|jpg|jpeg|gif|svg|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000',
      }
    ],
  },
  plugins: [
      new ExtractTextPlugin({filename: 'styles.css', allChunks: true})
   ]
}

module.exports = config;
