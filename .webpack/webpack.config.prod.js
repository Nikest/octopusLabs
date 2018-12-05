const webpack = require('webpack');
const merge = require('webpack-merge');
const {DefinePlugin} = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const configBase = require('./webpack.config.base.js');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const configProd = {
  mode: process.env.NODE_ENV,

  devtool: 'nosources-source-map',

  output: {
    chunkFilename: '[name].[chunkhash].js',
    filename: '[name].[chunkhash].js',
  },

  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: {
            inline: false,
          },
          mangle: {
            safari10: true,
          },
        },
      }),
    ],
  },

  plugins: [
    new CleanWebpackPlugin(['./../build/dist'], {
      allowExternal: true,
      verbose: true,
    }),
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    // new BundleAnalyzerPlugin({ analyzerPort: 8891 }),
  ],
};

module.exports = merge(configBase, configProd);
