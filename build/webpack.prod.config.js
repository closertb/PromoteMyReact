const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const args = process.argv;

module.exports = {
  entry: './src/index.js',
  devtool: 'inline-source-map',
  mode: 'production',
  output: {
    filename: 'bundle.[hash].js',
    chunkFilename: 'async.bundle[chunkhash].js',
    path: path.resolve(__dirname, '../dist')
  },

  module: {
    rules: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel-loader',
      query: {
        presets: ['env', 'react']
      }
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000
      }
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    }, {
      test: /\.scss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
    }, {
      test: /\.less$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
    }]
  },
  // 公共js单独打包
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ],
    splitChunks: {
      name: true,
      minSize: 30000,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          // name: 'vendor',
          chunks: 'all'
        },
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './index.ejs'
    }),
    new MiniCssExtractPlugin({
      filename: './index.[hash].css' //文件目录会放入output.path里
    }),
    // 热更新，热更新不是热加载
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
};