const NODE_ENV = process.env.NODE_ENV || 'development';
const path = require('path');
const webpack = require('webpack');

module.exports = {
  plugins: [],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          path.resolve(__dirname, './src/js/vendors/'),
        ],
        use: [
          {loader: 'babel-loader'},
          {loader: 'import-glob'},
        ],
      },

      // linter
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          path.resolve(__dirname, './src/js/vendors/'),
        ],
        enforce: 'pre',
        use: NODE_ENV === 'production' ? [] : [
          {loader: 'eslint-loader'},
        ],
      },
    ],
  },
};
