/* eslint-disable */
const { VuetifyProgressiveModule } = require("vuetify-loader");

module.exports = {
  transpileDependencies: ["vuetify"],
  chainWebpack: config => {
    config.module
      .rule("vue")
      .use("vue-loader")
      .loader("vue-loader")
      .tap(options => {
        options.compilerOptions.modules = [VuetifyProgressiveModule];
        return options;
      });
    const imagesRule = config.module.rule("images");
    imagesRule.uses.clear();
    config.module
      .rule("images")
      .test(/\.(png|jpe?g|gif|webp)(\?.*)?$/)
      .oneOf("progressiveImages")
      .test(/\.(png|jpe?g|gif)$/)
      .resourceQuery(/vuetify-preload/)
      .use("progressiveLoader")
      .loader("vuetify-loader/progressive-loader")
      .end()
      .use("notProgressive")
      .loader("url-loader")
      .options({
        limit: 8000,
        fallback: {
          loader: "file-loader",
          options: { name: "img/[name].[hash:8].[ext]" }
        }
      })
      .end();
    config.module
      .rule("images")
      .oneOf("imagesOther")
      .merge({
        loader: "url-loader",
        options: {
          limit: 8000,
          fallback: {
            loader: "file-loader",
            options: { name: "img/[name].[hash:8].[ext]" }
          }
        }
      });
  }
};
