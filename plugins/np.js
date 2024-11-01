import { defineNuxtPlugin } from '#app'
import np from 'number-precision'

export default defineNuxtPlugin((nuxtApp) => {
  // Provide `np` globally in Nuxt 3 without attaching it to globalProperties
  nuxtApp.provide('np', np)
})
