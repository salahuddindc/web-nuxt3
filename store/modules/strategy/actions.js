const url = {
    strategyInfo: "/transactionapi/v1.0/strategy/strategyinfo.get",
    createStrategy: "/transactionapi/v1.0/strategy/strategy.create",

    // channels: "/comapi/v1.0/com/article.channels",
    // searchArticle: "/comapi/v1.0/com/article.search"
    // createStrategy: "​/transactionapi/v1.0/strategy/strategy.create",

}

export default {
    async fetchStrategyInfo({ commit, dispatch }, params) {

        params.metadata = {
            loader: 'loadingStrategyInfo',
            end_point: url.strategyInfo
        }

        const response = await dispatch('makeApiCall', params);
        const object = response.data
        commit('setStrategyInfo', object)
    },

    async submitStrategyRequest({ commit, dispatch }, params) { 
        params.metadata = {
            loader: 'creatingStrategy',
            end_point: url.createStrategy
        }
        const response = await dispatch('makeApiCall', params);
        return response
        // commit('setStrategyInfo', object)
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
            console.error('strategory store in makeApiCall function', error)
            return error
        }
    }

}
