const url = {
    userNickNameAvatar: '/comapi/v1.0/com/usernikenameavatar.get'
}

export default {
    setLoadingArticlesList({ commit }, payload) {
        commit('setLoadingArticlesList', payload)
    },

    setLoadingArticleDetail({ commit }, payload) {
        commit('setLoadingArticleDetail', payload)
    },

    setLoadingRelatedArticles({ commit }, payload) {
        commit('setLoadingRelatedArticles', payload)
    },

    setLoadingMainChannels({ commit }, payload) {
        commit('setLoadingMainChannels', payload)
    },

    setLaodingLatestArticles({ commit }, payload) {
        commit('setLaodingLatestArticles', payload)
    },

    setLoadingRecommendArticles({ commit }, payload) {
        commit('setLoadingRecommendArticles', payload)
    },

    //trade
    setLoadingMarketTrades({ commit }, payload) {
        commit('setLoadingMarketTrades', payload)
    },
    setloadingMarketDepth({ commit }, payload) {
        commit('setloadingMarketDepth', payload)
    },
    //market
    setLoadingQuotationDailyData({ commit }, payload) {
        commit('setLoadingQuotationDailyData', payload)
    },

    async fetchUserNickNameAvatar({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingNickNameAvatar',
            end_point: url.userNickNameAvatar
        }
        const response = await dispatch('makeApiCall', params);
        const object = response.data
        commit('setUserNickNameAvatar', object)
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
