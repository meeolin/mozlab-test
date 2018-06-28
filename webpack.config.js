const NODE_ENV = process.env.NODE_ENV || 'development';

// configs
const JavaScriptConf = require('./config/javascript');
const TypeScriptConf = require('./config/typescript');
const SassConf = require('./config/sass');

const path = require('path');
const webpack = require('webpack');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');

const mainConfig = {
  context: path.resolve(__dirname, './src'),

  entry: {
    app: './app/app.ts',
    vendors: './app/vendors.ts',
    polyfills: './app/polyfills.ts',
  },

  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, './dest'),
    publicPath: '/',
  },

  resolve: {
    extensions: ['.ts', '.js', '.scss', '.sass', '.css', '.jade', '.pug'],
    modules: ['node_modules'],
  },

  // plugins
  plugins: [
    new CommonsChunkPlugin({
      names: ['app', 'polyfills', 'vendors'],
      minChunks: module => /node_modules/.test(module.resource),
      filename: 'js/[name].js',
    }),

    new webpack.DefinePlugin({
      // Environment helpers
      'process.env': {
        ENV: JSON.stringify(NODE_ENV),
      },
    }),

    // Workaround needed for angular 2 angular/angular#11580
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core/,
      './src' // location of your src
    ),

    new CopyWebpackPlugin([
      { from: 'img', to: '../dest/img' },
    ]),

    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'MozLab Test',
      chunksSortMode: 'dependency',
      metadata: {
        isDevServer: isWebpackDevServer(),
      },
      inject: 'head',
    }),
  ],

  // module
  module: {
    rules: [
      {
        test: /\.(jpg|gif|svg|png)$/,
        loader: 'file-loader?name=./[path][name].[ext]',
      },

      {
        test: /\.(svg|eot|otf|ttf|woff)$/,
        include: path.resolve(__dirname, './src/fonts/'),
        loader: 'file-loader?name=./[path][name].[ext]',
      },

      {
        test: /\.pug$/,
        use: [
          {loader: 'raw-loader'},
          {
            loader: 'pug-html-loader',
            query: {
              basedir: path.resolve(__dirname),
              doctype: 'html',
              plugins: ['pug-plugin-ng'],
            },
          },
          {
            loader: 'webpack-append',
            // TODO relocate to separate config and fix problem with query routing
            query: 'include /node_modules/bemto.pug/bemto.pug',
          },
        ],
      },
    ],
  },


  devtool: NODE_ENV === 'development' ? 'cheap-module-source-map' : '',
  watch: NODE_ENV === 'development',

  node: {
    global: true,
    crypto: 'empty',
    process: true,
    module: false,
    clearImmediate: false,
    setImmediate: false,
  },

  devServer: {
    contentBase: path.join(__dirname, './dest'),
    historyApiFallback: true,
    port: 9000,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
  },
};

function isWebpackDevServer() {
  return process.argv[1] && !! (/webpack-dev-server/.exec(process.argv[1]));
}

module.exports = merge(mainConfig, JavaScriptConf, TypeScriptConf, SassConf);

if (NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true,
      },
    })
  );
} else {
  module.exports.plugins.push(
    new WebpackNotifierPlugin({ alwaysNotify: true })
  );
}
