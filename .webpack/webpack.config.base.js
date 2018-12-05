const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const path = require('path');
const webpack = require('webpack');

const environment = require('../scripts/environment');

const rules = require('./rules.js');

console.info('\x1b[36m', 'ENV variables', '\x1b[0m');
console.log('\x1b[1m', environment, '\x1b[0m', '\n');

module.exports = {
  devtool: 'source-map',

  context: process.cwd(),

  stats: 'minimal',

  entry: {
    app: ['babel-polyfill', './src/index.tsx'],
  },

  output: {
    path: path.join(__dirname, '../build/dist'),
    publicPath: '/',
  },

  module: {
    rules,
  },

  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.ts', '.tsx', '.js'],
  },

  plugins: [
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify(environment),
    }),
    new CopyWebpackPlugin([{from: './public', to: './'}]),
    new HtmlWebpackPlugin({
      environment,
      inject: true,
      template: 'src/index.ejs',
    }),
  ],
};
