
 
import english from './en_us.json'
import chinese from './zh.json'
import japanese from './ja.json'
import korean from './ko.json'
export default defineI18nConfig(() => ({ 
    legacy: false,
    locale: 'en_us', 
    fallbackLocale: 'en_us', // Set fallback locale if a key is missing in another language
    warnHtmlMessage: false, // disable of the Detected HTML in message
     
    messages: {
        'en_us': english,
        'zh': chinese,
        'ja': japanese,
        'ko': korean
    }
}))


// export default defineNuxtPlugin((nuxtApp) => {
//     const i18n = createI18n({
//         legacy: false,
//         globalInjection: true,
//         locale: 'en_us',
//         fallbackLocale: 'en_us',
//         messages: {
//             'en_us': english,
//             'zh': chinese,
//             'ja': japanese,
//             'ko': korean
//         }
//     })
//     // nuxtApp.vueApp.use(i18n)
//     nuxtApp.vueApp.use(i18n)
// })

 