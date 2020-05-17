/* eslint-disable */
const webpack = require('webpack');
const { join } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const DotEnvPlugin = require('dotenv-webpack');
const TerserPlugin = require('terser-webpack-plugin');

/** @type {webpack.Configuration} */
const config = {
  entry: ['react-hot-loader/patch', join(__dirname, 'src', 'index.tsx')],
  output: {
    path: join(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool:
    process.env.NODE_ENV === 'development' ? 'inline-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['react-hot-loader/webpack', 'ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(ttf|eot|svg|gif|jpg|png)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(__dirname, 'public', 'index.html'),
      favicon: join(__dirname, 'public', 'favicon.ico'),
    }),
    new DotEnvPlugin({
      systemvars: true,
      safe: true,
    }),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  performance: false,
  devServer: {
    historyApiFallback: true,
  },
};

module.exports = config;
