const url = {
    articleInfo: "/comapi/v1.0/com/article.info.get",
    flashkDate: "/transactionapi/v1.0/quotation/flashkdate.get", //graph data
    dailyGetAllQuotation: "/transactionapi/v1.0/quotation/daily.getall.pages",
    markAsFavorite: "/userapi/v1.0/user/user.self.selection.add",
    removeFromFavorite: "/userapi/v1.0/user/user.self.selection.delete",
    favoriteList: "/userapi/v1.0/user/user.self.selection.getlist",
    quotationDetails: "/transactionapi/v1.0/quotation/daily.get", //btc total assets
    marketsentiment: "/transactionapi/v1.0/bi/marketsentiment.get"
}


export default {
    async fetchCurrencyDetail({ commit, dispatch }, params) { //complete detail of currency
        params.end_point = url.articleInfo
        const response = await dispatch('makeApiCall', params);
        const object = response.data
        commit('setCurrencyDetail', object)
    },
    async fetchQuotationDetails({ commit, dispatch }, params) { //BTC assets 
        params.end_point = url.quotationDetails
        const response = await dispatch('makeApiCall', params);
        const object = response.data;
        commit('setQuotationDetails', object)
    },
    async fetchCurrencyGraphData({ commit, dispatch }, params) { //current currency graph data
        params.end_point = url.flashkDate
        params.loader = 'fetchingGraphData'
        const response = await dispatch('makeApiCall', params);
        const object = response.data
        commit('setCurrencyGraphData', object)
    },

    async fetchQuotationDailyData({ commit, dispatch }, params) { //fetch daily quotation detail
        params.end_point = url.dailyGetAllQuotation
        params.loader = 'loadingQuotationDailyData'
        const [response] = await Promise.all([
            dispatch('makeApiCall', params),
            dispatch('fetchFavoriteList', { type: 0 })
        ]);
        const responseArray = response.data.pagedata || []

        commit('setQuotationDailyData', responseArray)
    },
    async markAsFavorite({ commit, state, rootState, rootGetters, dispatch }, params) {
        params.end_point = url.markAsFavorite
        params.loader = 'addOrRemovingFromFavorite'
        const response = await dispatch('makeApiCall', params)

        if (response.code == 200) {
            await dispatch('fetchFavoriteList', { type: 0 })
            commit('setMarkAsFavorite', true)
        }

        return response
    },

    async removeFromFavorite({ commit, state, rootState, rootGetters, dispatch }, params) {
        params.end_point = url.removeFromFavorite
        params.loader = 'addOrRemovingFromFavorite'
        const response = await dispatch('makeApiCall', params);

        if (response.code == 200) {
            await dispatch('fetchFavoriteList', { type: 0 })
            commit('setMarkAsFavorite', false)
        }

        return response
    },

    async fetchFavoriteList({ commit, state, rootState, rootGetters, dispatch }, params) {
        params.end_point = url.favoriteList
        params.loader = 'fetchingFavoriteList'
        const response = await dispatch('makeApiCall', params);

        if (response.code == 200) {
            commit('setFavoriteList', response.data)
        }
        return response
    },
    async fetchMarketSentiment({ commit, dispatch }, params) {
        params.end_point = url.marketsentiment
        const response = await dispatch('makeApiCall', params);

        if (response.code == 200) {
            commit('setMarketSentiment', response.data)
            console.log(response, "qqqqqqq")
        }
        return response
    },

    async makeApiCall({ commit, rootState, rootGetters }, params) {
        try {
            const { $axios } = useNuxtApp();

            const loader = params.loader ? params.loader : null

            const general = rootState.general

            if (loader) {
                general[loader] = true
            }


            params.lang = rootGetters.currentLang
            params.end_point = params.end_point ? params.end_point : url.channels
            const response = await $axios.post(params.end_point, params, {})

            if (loader) {
                general[loader] = false
            }

            if (response.code && response.code != 200) {
                throw Error(response)
            }
            return response
        } catch (error) {
            console.error('market store in makeApiCall function', error)
            return error
        }
    }

}

