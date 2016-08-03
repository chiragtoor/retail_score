// webpack.server.config.js
console.log("RUNNING webpack.server.config.js");

module.exports = {  
  entry: {
    component: "./web/static/js/containers/index.js",
  },
  output: {
    path: "./priv/static/js",
    filename: "server.js",
    library: "server",
    libraryTarget: "commonjs2"
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        plugins: ["transform-decorators-legacy"],
        presets: ["react", "es2015", "stage-2"],
      }
    }],
  },
  resolve: {
    extensions: ["", ".js"],
    modulesDirectories: ["node_modules", __dirname + "/web/static/js"]
  }
};

console.log("DONE webpack.server.config.js");