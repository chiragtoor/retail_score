console.log("RUNNING webpack.config.js");

var path = require('path');
var webpack = require('webpack');
// var CompressionPlugin = require("compression-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var env = process.env.MIX_ENV || 'dev';
var prod = env === 'prod';

var entry = ['./web/static/js/index.js', './web/static/styles/app.css'];
var publicPath = 'http://localhost:4001/';

var plugins = [
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    __PROD__: prod
  }),
  new ExtractTextPlugin('style.css', { allChunks: true })
];

if (prod) {
  plugins.push(new webpack.optimize.UglifyJsPlugin());
  // plugins.push(new CompressionPlugin({
  //           asset: "[path].gz[query]",
  //           algorithm: "gzip",
  //           test: /\.js$|\.html$/,
  //           minRatio: 0.8
  //       }));
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
      },
      {
        test: /\.css$/,
        loader: "style!css"
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      },
      {
        test: /\.(jpe|jpg|woff|woff2|eot|ttf|svg)(\?.*$|$)/,
        loaders: ["file-loader"]
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  }
};

console.log("DONE webpack.config.js");