const webpack = require('webpack');
const merge = require('webpack-merge');

const configBase = require('./webpack.config.base.js');

const configDev = {
  mode: process.env.NODE_ENV,
  devtool: 'source-map',

  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],

  devServer: {
    contentBase: './www/',
    historyApiFallback: true,
    inline: true,
    watchContentBase: true,
    quiet: false,
    filename: `/application.js`,
    host: '0.0.0.0',
    compress: true,
    port: process.env['PORT'] || 3000,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
    },
  },
};

module.exports = merge(configBase, configDev);
