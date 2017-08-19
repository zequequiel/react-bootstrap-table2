import * as path from 'path';
import webpack from 'webpack';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const sourcePath = path.join(__dirname, 'packages/react-bootstrap-table2/src');
const examplePath = path.join(__dirname, 'packages/react-bootstrap-table2-example/src');
const exampleHTMLPath = path.join(__dirname, 'packages/react-bootstrap-table2-example/src/index.html');

module.exports = {
  entry: examplePath,
  devtool: '#eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    // progress: true,
    noInfo: true,
    stats: 'errors-only'
  },
  output: {
    path: path.join(__dirname, 'examples'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [ {
      enforce: 'pre',
      test: /\.js?$/,
      exclude: /node_modules/,
      include: [ sourcePath, examplePath ],
      loader: 'eslint-loader'
    }, {
      test: /\.js?$/,
      use: [ 'babel-loader' ],
      exclude: /node_modules/,
      include: [ sourcePath, examplePath ],
    }, {
      test: /\.css$/, 
      use: 'style-loader!css-loader'
    } ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: exampleHTMLPath
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};