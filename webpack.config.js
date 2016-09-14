var ExtractTextPlugin = require('extract-text-webpack-plugin');
var WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  entry: './resources/assets/js/admin/routes.js',
  output: {
    path: './public/admin/js',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: { presets: [ 'es2015', 'react', 'stage-2' ] }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('css!sass')
      }
    ]
  },
  plugins: [
    new WebpackNotifierPlugin(),
    new ExtractTextPlugin('../css/style.css', {
        allChunks: true
    })
  ]
};
