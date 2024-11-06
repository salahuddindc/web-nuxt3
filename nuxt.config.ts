
import path from 'path'
// import { serverPort } from path.resolve(__dirname, 'utils/constants.js')

const { serverPort } = require(path.resolve(__dirname, 'utils/constants.js'))


export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  devServer: {
    port: serverPort,
  },

  css: [

    '@/assets/scss/main.scss',
  ],

  vite: {
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            'primary-color': '#FFA500', // Using CSS variables
            'success-color': '#0ecb81',
            'error-color': '#e63550',
            'btn-border-radius-base': '6px',
            'btn-default-color': '#fff',
            // 'btn-height-base':'44px'
            // Add more Ant Design variables as needed
          },
          javascriptEnabled: true,
        },
      },
    },
  },

  modules: ['@nuxtjs/i18n'],
  i18n: {
    vueI18n: './i18n.config.js' // if you are using custom path, default
  }

})