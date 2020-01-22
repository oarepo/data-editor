const path = require('path')

module.exports = {
  pluginOptions: {
    quasar: {
      importStrategy: 'manual',
      rtlSupport: false
    }
  },
  configureWebpack (cfg) {
    cfg.resolve.alias['@oarepo/data-editor'] =
      path.join(__dirname, 'library/index.js')
  },
  devServer: {
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true,
    before: function (app) {
      const morgan = require('morgan')
      app.use(morgan('combined'))
    }
  },
  publicPath: process.env.DEMO_DEPLOY_PATH || './',
  transpileDependencies: [
    'quasar'
  ]
}
