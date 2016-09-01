var path = require('path');
var webpack = require('webpack');
// var CompressionPlugin = require("compression-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const Autoprefixer = require("autoprefixer");

var env = process.env.MIX_ENV || 'dev';
var prod = env === 'prod';

var entry = ['./web/static/js/index.js', './web/static/styles/app.css'];
var publicPath = 'http://localhost:4001/';

var plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    __PROD__: prod
  }),
  new ExtractTextPlugin("../css/app.css")
];

if (prod) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
  plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }));
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
}

var loaders;
if(prod) {
  loaders = ['babel?presets[]=es2015,presets[]=stage-2,presets[]=react'];
} else {
  loaders = ['react-hot', 'babel?presets[]=es2015,presets[]=stage-2,presets[]=react'];
}

module.exports = {
  devtool: prod ? null : 'eval-sourcemaps',
  color: true,
  entry: prod ? entry : [
      'webpack-dev-server/client?' + publicPath,
      'webpack/hot/only-dev-server'
    ].concat(entry),
  output: {
    path: path.join(__dirname, './priv/static/js'),
    filename: 'app.js',
    publicPath: publicPath
  },
  plugins: plugins,
  module: {
    loaders: [
      {
        test: /\.js|\.jsx?/,
        loaders: loaders,
        exclude: /node_modules/
      }, {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
      }, {
          test: /\.less$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
      }, {
        test: /\.png$/,
        loader: "url?" + [
          "limit=100000",
          "mimetype=image/png"
        ].join("&"),
      }, {
        test: /\.gif$/,
        loader: "url?" + [
          "limit=100000",
          "mimetype=image/gif"
        ].join("&"),
      }, {
        test: /\.jpg$/,
        loader: "file?name=images/[name].[ext]",
      }, {
        test: /\.(woff|woff2)$/,
        loader: "url?" + [
          "limit=10000",
          "mimetype=application/font-woff",
          "name=fonts/[name].[ext]"
        ].join("&"),
      }, {
        test: /\.ttf$/,
        loader: "url?" + [
          "limit=10000",
          "mimetype=application/octet-stream",
          "name=fonts/[name].[ext]"
        ].join("&"),
      }, {
        test: /\.eot$/,
        loader: "url?" + [
          "limit=10000",
          "name=fonts/[name].[ext]"
        ].join("&"),
      }, {
        test: /\.svg$/,
        loader: "url?" + [
          "limit=10000",
          "mimetype=image/svg+xml",
          "name=images/[name].[ext]"
        ].join("&"),
      }
    ]
  },
  postcss: [
    Autoprefixer({
      browsers: ["last 2 versions"]
    })
  ],
  resolve: {
    extensions: ['', '.js', '.jsx', '.css'],
    modulesDirectories: ["node_modules", __dirname + "/web/static/js"],
    alias: {
      styles: __dirname + "/web/static/styles"
    }
  }
};
