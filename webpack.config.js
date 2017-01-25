module.exports = {
  entry: "./entry.js",
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders:
    [
      {
        test: [/\.js?$/],
        exclude: /(node_modules)/,
        loaders: ["babel-loader"],
        presets: ["es2015"]
      }
    ]
  }
};
