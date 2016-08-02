// webpack.server.config.js
console.log("Running SSR Config");
module.exports = {  
  entry: {
    component: "./web/static/js/containers/index.js",
  },
  output: {
    path: "./priv/static/js",
    filename: "reph.js",
    library: "reph",
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
console.log("Done Running SSR Config");