const webpack = require("webpack");

module.exports = function override(config) {

  config.resolve.fallback = {
    ...config.resolve.fallback,

    util: require.resolve("util/"),
    process: require.resolve("process/browser.js"),

    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),

    fs: false,
    path: false,
  };

  config.plugins = [
    ...(config.plugins || []),

    new webpack.ProvidePlugin({
      process: "process/browser.js",
    }),
  ];

  return config;
};