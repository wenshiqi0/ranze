const { join } = require('path');

module.exports = {
  mode: "development",
  entry: "./src/index.ts",
  output: {
    path: join(__dirname, "./out/client/"),
    filename: "index.js"
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.tsx?$/, loader: "ts-loader" }
    ]
  }
};