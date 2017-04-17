module.exports = {
  entry: "./entry.js",
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders:[{
      test: /\.css$/,
      loader: 'style!css?sourceMap'
    }, {
      test: /\.js?$/,
      exclude: /(node_modules)/,
      loader: "babel-loader",
      presets: "es2015"
    }, {
      test: /\.(eot|svg|ttf|woff(2)?)(\?v=\d+\.\d+\.\d+)?/,
      loader: 'url'
    }]
  }
  
};
