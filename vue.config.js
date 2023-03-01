const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify", "vue-tel-input-vuetify"],
  pages: {
    index: {
      entry: "src/main.js",
      title: "Wise Stamp",
    },
  },
});