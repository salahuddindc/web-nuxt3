import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/vue-tel-input.css'

export default defineNuxtPlugin((nuxtApp) => {
  // Optional: define global options here if needed
  const globalOptions = {
    mode: 'international',
    dropdownOptions: {
      showSearchBox: true,
      showFlags: true,
      showDialCodeInList: true,
      showDialCode: true,
    },
  }

  nuxtApp.vueApp.use(VueTelInput, globalOptions)
})
