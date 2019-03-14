module.exports = {
    entry: ["./src/index.js"],
    mode: "development",
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel-loader'
        }
      ]
    }
  }.gitignore
