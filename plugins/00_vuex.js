import store from '~/store'

export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.use(store); 
    // Optionally provide it to make it easier to access later
    nuxtApp.provide('store', store);
})
