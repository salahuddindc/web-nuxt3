import path from 'path'

const { serverPort } = require(path.resolve(__dirname, 'utils/constants.js'))
const { uiTheme } = require(path.resolve(__dirname, 'utils/ui-theme.js'))




export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' }
      ],
    }
  },

  devServer: {
    port: serverPort,
  },

  css: [
    '@/assets/scss/main.scss',
    '@/assets/less/styles/base.less',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: uiTheme.variables,
          javascriptEnabled: true,
        },
      },
    },
  },

  modules: ['@nuxtjs/i18n', '@nuxt/image', '@nuxt/image'],
  i18n: {
    vueI18n: './i18n.config.js' // if you are using custom path, default
  }

})