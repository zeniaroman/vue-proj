module.exports = {
  publicPath: '/pubic',
  chainWebpack: (config) => {
    config
      .plugin('html')
      .tap((args) => {
        args[0].title = 'tripisler.com';
        return args;
      });
  },
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: false,
      runtimeOnly: false,
      compositionOnly: false,
      fullInstall: true
    }
  },
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      sass: {
        additionalData: `@import "~@/sass/main.sass"`
      }
    }
  }
}
