const webpack = require("webpack");

module.exports = function override(config) {

  config.resolve.fallback = {
    ...config.resolve.fallback,
    util: require.resolve("util/"),
    fs: false,
    path: false,
    process: require.resolve("process/browser.js"),
  };

  config.plugins = [
    ...(config.plugins || []),

    new webpack.ProvidePlugin({
      process: "process/browser.js",
    }),
  ];

  return config;
};