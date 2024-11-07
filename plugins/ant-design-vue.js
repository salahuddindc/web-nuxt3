import { defineNuxtPlugin } from '#app'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less'
import * as Icons from '@ant-design/icons-vue';

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Antd)

    // Register each icon globally
    Object.keys(Icons).forEach((key) => {
        nuxtApp.vueApp.component(key, Icons[key]);
    });

})
