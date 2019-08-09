const path = require('path');

module.exports = {
  entry: ['./src/index.js', './src/main.scss'],
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
    // directories where to look for modules
    extensions: [".js", ".json", ".jsx", ".scss", ".css"],
    // extensions that are used
  },
  devtool: "source-map", // enum
  module: {
    rules: [
      {
        test: /\.scss$/,
        exclude: /(node_modules)/,
        use: [
          { loader: "style-loader"}, // creates style nodes from JS strings
          { loader: "css-loader"}, // translates CSS into CommonJS
          { 
            loader: "sass-loader", // compiles Sass to CSS, using Node Sass by default
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/env']
          }
        },
      },
    ]
  }
};