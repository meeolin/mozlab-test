const NODE_ENV = process.env.NODE_ENV || 'development';

const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  plugins: [
    new ExtractTextPlugin('css/main.css'),
  ],

  module: {
    rules: [

      {
        test: /\.(sass|scss)$/,
        include: [
          path.resolve(__dirname, '../src/sass/'),
          path.resolve(__dirname, '../node-modules/'),
        ],
        loader: ExtractTextPlugin.extract([
          {
            loader: 'css-loader',
            options: {
              sourceMap: NODE_ENV !== 'production',
              importLoaders: 1,
              minimize: NODE_ENV === 'production',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: NODE_ENV !== 'production',
            },
          },
          {
            loader: 'postcss-loader',
          },
        ]),
      },

      {
        test: /\.(sass|scss)$/,
        include: [
          path.resolve(__dirname, '../src/app/'),
        ],
        loader: [
          {
            loader: 'raw-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: NODE_ENV !== 'production',
            },
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },

      {
        test: /\.css$/,
        include: [
          path.resolve(__dirname, '../node_modules/@angular/material/prebuilt-themes/'),
        ],
        loader: [
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
        ],
      },
    ]
  },
};
