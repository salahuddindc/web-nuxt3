let storage = {
     
    /*
    * set 存储方法
    * @ param {String}     key 键
    * @ param {String}     value 值，
    * @ param {String}     expired 过期时间，以毫秒为单位，非必须
    */
    set(key, val, expired) {

        let obj = {

            data: val,
            time: Date.now(),
            expired
        }
        window.localStorage.setItem(key, JSON.stringify(obj));

    },

    /*
    * set 獲取方法
    * @ param {String}     key 键
    */
    get(key) {

        let val = window.localStorage.getItem(key);
        if (!val) {

            return val;
        }
        val = JSON.parse(val);
        if (Date.now() - val.time > val.expired) {

            window.localStorage.removeItem(key);
            return null
        }

        return val.data;
    },
   /*
    * remove 刪除方法
    * @ param {String}     key 键
    */
    remove(key) {

        window.localStorage.removeItem(key);
    },

}

import { defineNuxtPlugin } from '#app'
 

export default defineNuxtPlugin((nuxtApp) => {
  // Provide `np` globally in Nuxt 3 without attaching it to globalProperties
  nuxtApp.provide('storage', storage)
})