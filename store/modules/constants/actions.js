const url = {
    constants: '/comapi/v1.0/com/constants.getconstantsinfo',
}

import * as CryptoJS from 'crypto-js'

export default {
    async fetchConstants({ commit, dispatch }, params) {

        params.metadata = {
            end_point: url.constants,
            storeDataInCache: true
        }
        const response = await dispatch('makeApiCall', params)
        const object = JSON.parse(response.data)
        if (response.code == 200) {
            commit('setConstants', object)
            if (object.left_time > 0) {
                if (location.pathname != '/maintenance') {
                    location.href = '/maintenance'
                }
                return
            }
        }
    },
    async isBuyBnq({ commit, dispatch }, params) {

        params.metadata = {
            end_point: url.constants
        }
        const response = await dispatch('makeApiCall', params)
        const object = response.data
        if (response.code == 200) {
            commit('setIsBnq', object)
        }
    },
    async fetchAdjustmentCoefficients({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.constants
        }
        const response = await dispatch('makeApiCall', params)
        const object = JSON.parse(response.data)
        if (response.code == 200) {
            commit('setAdjustmentCoefficients', object)
        }
    },
    async makeApiCall({ rootState, rootGetters }, params) {
        try {

            const general = rootState.general
            const metadata = params.metadata

            const loader = metadata ? metadata.loader : null

            if (loader) {
                general[loader] = true
            }
            const shouldStoreDataInCache = metadata.storeDataInCache

            params.lang = rootGetters.currentLang
            const end_point = metadata.end_point

            delete params['metadata']
            let response = null
            const paramsMD5 = CryptoJS.MD5(JSON.stringify(params)).toString()

            if (shouldStoreDataInCache && process.client && window.localStorage.getItem(paramsMD5) && (new Date().getTime() < (new Date(JSON.parse(window.localStorage.getItem(paramsMD5)).expireTime).getTime() + (60 * 60 * 1000)))) {
                response = JSON.parse(window.localStorage.getItem(paramsMD5))
                if (loader) {
                    general[loader] = false
                }
            } else {
                response = await this.$axios.post(end_point, params, {})

                if (loader) {
                    general[loader] = false
                }

                if (response.code && response.code != 200) {
                    throw Error(response)
                }
 
                if (process.client && response.data && shouldStoreDataInCache) {
                    let storageData = response
                    storageData.expireTime = new Date()
                    window.localStorage.setItem(paramsMD5, JSON.stringify(storageData));
                }
            }
 
            return response
        } catch (error) {
            console.error('auth store in makeApiCall function', error)
            return error
        }
    }
}



