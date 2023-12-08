const path = require("path");

module.exports = function override(config, env) {
  // Add your customizations here

  // For example, alias to resolve absolute imports
  config.resolve.alias = {
    ...config.resolve.alias,
    "@components": path.resolve(__dirname, "src/components"),
    "@utils": path.resolve(__dirname, "src/utils"),
    // Add more aliases as needed
  };

  return config;
};
