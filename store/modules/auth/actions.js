const url = {
    verifyUserInfo: '/userapi/v1.0/usercommon/verifyuserinfo.get',
    deleteAccount: '/userapi/v1.0/user/useraccount.delete',
    googleVerifyCodeCheck: '/userapi/v1.0/user/user.google.verfiycode.check',
    emailVerifyCodeCheck: '/comapi/v1.0/com/email.verifycode.check',
    smsVerifyCodeCheck: '/comapi/v1.0/com/sms.verifycode.check',
    myVipInfo: '/userapi/v1.0/user/myvipinfo.get'
}

const login = () => {

}

const logout = () => {

}

export default {
    async verifyUserInfo({ commit, dispatch }, params) {
        params.metadata = {
            // loader: 'loadingStrategyInfo',
            end_point: url.verifyUserInfo
        }

        const response = await dispatch('makeApiCall', params);
        const object = response.data
        commit('setTempUser', object)
        return response
    },

    async deleteAccount({ commit, dispatch }, params) {

        const verifyCodeRes = await dispatch('verifyCode', params);
        const requiredParam = {}
        if (verifyCodeRes.code == 200) {
            requiredParam.metadata = {
                end_point: url.deleteAccount
            }

            return await dispatch('makeApiCall', requiredParam)
        }
        return verifyCodeRes
    },

    async verifyCode({ commit, dispatch }, params) {
        let endPoint = null
        const requiredParam = {}
        if (params.emailverifycode) {
            endPoint = url.emailVerifyCodeCheck
            requiredParam.verifyCode = params.emailverifycode
            requiredParam.email = params.email
        } else if (params.smsverifycode) {
            endPoint = url.smsVerifyCodeCheck
            requiredParam.verifyCode = params.smsverifycode
            requiredParam.phone = params.phone
        } else if (params.googleverifycode) {
            endPoint = url.googleVerifyCodeCheck
            requiredParam.verifyCode = params.googleverifycode
        }

        requiredParam.metadata = {
            end_point: endPoint
        }

        const res = await dispatch('makeApiCall', requiredParam);
        return res
    },
    async fetchMyVipInfo({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingMyVipInfo',
            end_point: url.myVipInfo
        }

        const response = await dispatch('makeApiCall', params);
        const object = response.data
        console.log('response fetchMyVipInfo', response);
        commit('setMyVipInfo', object)
        return response
    },

    async makeApiCall({ rootState, rootGetters }, params) {
        try {

            const general = rootState.general
            const metadata = params.metadata

            const loader = metadata ? metadata.loader : null

            if (loader) {
                general[loader] = true
            }

            params.lang = rootGetters.currentLang
            const end_point = metadata.end_point

            delete params['metadata']
            const response = await this.$axios.post(end_point, params, {})

            if (loader) {
                general[loader] = false
            }

            if (response.code && response.code != 200) {
                throw Error(response)
            }
            return response
        } catch (error) {
            console.log('error:', error)
            return error
        }
    }
}



