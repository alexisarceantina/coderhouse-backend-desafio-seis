const path = require("path");
const nodeExternals = require("webpack-node-externals");
const NodemonPlugin = require("nodemon-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  target: "node",

  entry: {
    app: path.resolve(__dirname, "src", "server.js"),
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  externals: [nodeExternals()],

  experiments: {
    topLevelAwait: true,
  },

  plugins: [
    new NodemonPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/views"),
          to: path.resolve(__dirname, "dist/views"),
        },
      ],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          plugins: ["@babel/plugin-syntax-top-level-await"],
        },
      },
    ],
  },
};
