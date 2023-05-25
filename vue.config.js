const { defineConfig } = require("@vue/cli-service");
module.exports = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "Collab Book";
      return args;
    });
  },
};
