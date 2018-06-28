const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_DEV = NODE_ENV === 'development';
const path = require('path');
const webpack = require('webpack');

const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;

module.exports = {
  plugins: NODE_ENV === 'production' ? [] : [
    new webpack.LoaderOptionsPlugin({
      test: /\.ts$/,
      options: {
        tslint: {
          tsConfigFile: path.resolve(__dirname, '../tslint.json'),
        },
      },
    }),

    /*
     * Do type checking in a separate process, so webpack don't need to wait.
     */
    new CheckerPlugin(),
  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            query: {
              configFileName: path.resolve(__dirname, IS_DEV ? '../tsconfig.json' : '../tsconfig.production.json'),
            },
          },
          {loader: 'angular2-template-loader'},
        ],
      },

      //linter
      {
        test: /\.ts$/,
        exclude: [
          /node_modules/,
          path.resolve(__dirname, '../src/js/vendors/'),
        ],
        enforce: 'pre',
        use: NODE_ENV === 'production' ? [] : [
          {loader: 'tslint-loader'},
        ],
      },
    ],
  },
};
