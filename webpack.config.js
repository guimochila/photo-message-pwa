const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');

module.exports = {
  entry: './app/src/main.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[contentHash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      filename: './index.html',
    }),
    new GenerateSW({
      swDest: './sw.js',
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: /\.(css|js)/,
          handler: 'CacheFirst',
        },
        {
          urlPattern: /^https:\/\/cdnjs\.cloudflare\.com\/ajax\/libs\/font-awesome.*/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'fontawesome',
          },
        },
      ],
    }),
  ],
};
