const url = {
    investmentPlanSatistics: '/userapi/v1.0/finance/investmentplansatistics.get',
    financeGetProduct:'/userapi/v1.0/finance/product.get',
    financeProducts:'/userapi/v1.0/finance/product.getlist'
}



export default {
    async fetchInvestmentPlanSatistics({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.investmentPlanSatistics
        }
        const response = await dispatch('makeApiCall', params)
        const data = response.data
        commit('setInvestmentPlanSatistics', data)
    },
    async fetch3YearsBnqPlan({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.financeGetProduct
        }
        const response = await dispatch('makeApiCall', params)
        const data = response.data
        commit('set3YearsBnqPlan', data)
    },
    async fetchBnqWealthManagementPlan({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.financeGetProduct
        }
        const response = await dispatch('makeApiCall', params)
        const data = response.data
        commit('setBnqWealthManagementPlan', data)
    }, 
    async fetchFinanceProducts({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.financeProducts
        }
        const response = await dispatch('makeApiCall', params)
        const data = response.data
        commit('setFinanceProducts', data)
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
            console.error('auth store in makeApiCall function', error)
            return error
        }
    }
}



