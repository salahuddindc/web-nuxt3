const url = {
    expertGet: '/transactionapi/v1.0/copytrade/expert.get',
    hideShowAssets: '/transactionapi/v1.0/copytrade/hide.update',
    tradersList: '/transactionapi/v1.0/copytrade/expertlist.get',
    applyCreate: '/transactionapi/v1.0/copytrade/apply.create',
    copyTradeTags: '/transactionapi/v1.0/copytrade/tags.get',
    copyTradeCreate: '/transactionapi/v1.0/copytrade/copytrade.create',
    expertFollowers: '/transactionapi/v1.0/copytrade/followerusers.get',
    expertTrades: '/transactionapi/v1.0/copytrade/experttrading.get',
    expertTradesHistory: '/transactionapi/v1.0/copytrade/experttradehistory.get',
    followersUserTrade: '/transactionapi/v1.0/copytrade/followeruserstrading.get',
    followerUsersTradeHistory: '/transactionapi/v1.0/copytrade/followeruserstradehistory.get',
    profitSharing: '/transactionapi/v1.0/copytrade/billingdetail.get',
    adjustProfitRatio: '/transactionapi/v1.0/copytrade/ratio.change',
    bestFollowers: '/transactionapi/v1.0/copytrade/followerbest.get',
    bestExperts: '/transactionapi/v1.0/copytrade/expertbest.get',

    // User Center


    myFollowerData: '/transactionapi/v1.0/copytrade/myfollowerdata.get',
    myFollowerExperts: '/transactionapi/v1.0/copytrade/myfollowerexperts.get',
    myTrades: '/transactionapi/v1.0/copytrade/trading.get',
    myTradeHistory: '/transactionapi/v1.0/copytrade/historytrade.get',
    userProfitSharing: '/transactionapi/v1.0/copytrade/userbillingdetail.get',
    changeAmount: '/transactionapi/v1.0/copytrade/copytrade.changeamount',
    changeTradeStatus: '/transactionapi/v1.0/copytrade/copytradestatus.change'

}
export default {
    async fetchAuthExpertData({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.expertGet
        }
        const response = await dispatch('makeApiCall', params)
        const object = response.data
        console.log('response:fetchAuthExpertData', response);
        commit('setAuthExpertData', object)
        return response
    },
    async fetchExpertData({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.expertGet,
            loader: 'loadingExpertData'
        }
        const response = await dispatch('makeApiCall', params)

        console.log('fetchExpertData::response', response);
        const object = response.data
        commit('setExpertData', object)
        return response
    },
    async fetchTraderByRoi({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.tradersList,
            loader: 'loadingRoiTraders'
        }
        const response = await dispatch('makeApiCall', params)
        const dataObject = response.data || {}
        const tradersList = dataObject.pagedata || []
        console.log('fetchTraderByRoi::response', dataObject);
        commit('setRoiTraders', tradersList)
        return response
    },
    async fetchTradersByProfitAndLoss({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.tradersList,
            loader: 'loadingProfitAndLossTraders'
        }
        const response = await dispatch('makeApiCall', params)
        const dataObject = response.data || {}
        const tradersList = dataObject.pagedata || []
        commit('setTradersByProfitAndLoss', tradersList)
        return response
    },
    async fetchNewTraders({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.tradersList,
            loader: 'loadingNewTraders'
        }
        const response = await dispatch('makeApiCall', params)
        const dataObject = response.data || {}
        const tradersList = dataObject.pagedata || []
        commit('setNewTraders', tradersList)
        return response
    },
    async fetchAllTraders({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.tradersList,
            loader: 'loadingAllTraders'
        }
        const response = await dispatch('makeApiCall', params)
        const dataObject = response.data || {}
        const tradersList = dataObject.pagedata || []
        const pagination = {
            currentPageIndex: dataObject.currentpageindex,
            hasNextPage: dataObject.hasnextpage,
            hasPreviousPage: dataObject.haspreviouspage,
            pageSize: dataObject.pagesize,
            totalItemCount: dataObject.totalitemcount,
            totalPageCount: dataObject.totalpagecount
        }
        commit('setAllTraders', tradersList)
        commit('setAllTraderPagination', pagination)
        return response
    },
    async fetchBestFollowers({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.bestFollowers,
            loader: 'loadingBestFollowers'
        }
        const response = await dispatch('makeApiCall', params)
        const dataObject = response.data || {}
        const tradersList = dataObject.pagedata || []
        const pagination = {
            currentPageIndex: dataObject.currentpageindex,
            hasNextPage: dataObject.hasnextpage,
            hasPreviousPage: dataObject.haspreviouspage,
            pageSize: dataObject.pagesize,
            totalItemCount: dataObject.totalitemcount,
            totalPageCount: dataObject.totalpagecount
        }
        commit('setBestFollowers', tradersList)
        commit('setBestFollowersPagination', pagination)
        return response
    },
    async fetchBestExperts({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.bestExperts,
            loader: 'loadingBestExperts'
        }
        const response = await dispatch('makeApiCall', params)
        const array = response.data || []

        commit('setBestExperts', array)
        return response
    },
    async submitHideShowAssets({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.hideShowAssets
        }
        const response = await dispatch('makeApiCall', params)
        return response
    },
    async submitTraderApplication({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.applyCreate
        }
        const response = await dispatch('makeApiCall', params)
        return response
    },
    async fetchCopyTradeTags({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.copyTradeTags
        }
        const response = await dispatch('makeApiCall', params)
        const data = response.data || []
        commit('setTags', data)
        return response
    },
    async submitCopyTradeForm({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.copyTradeCreate
        }
        const response = await dispatch('makeApiCall', params)
        const data = response.data || []
        return response
    },
    async fetchExpertFollowers({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.expertFollowers,
            loader: 'loadingMyFollowers'
        }
        const response = await dispatch('makeApiCall', params)
        const dataObject = response.data || {}
        const pagination = {
            currentPageIndex: dataObject.currentpageindex,
            hasNextPage: dataObject.hasnextpage,
            hasPreviousPage: dataObject.haspreviouspage,
            pageSize: dataObject.pagesize,
            totalItemCount: dataObject.totalitemcount,
            totalPageCount: dataObject.totalpagecount
        }
        const followers = dataObject.pagedata || []
        commit('setExpertFollowers', followers)
        commit('setExpertFollowersPagination', pagination)
        return response
    },
    async fetchExpertTrades({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.expertTrades,
            loader: 'loadingEpertTrades'
        }
        const response = await dispatch('makeApiCall', params)
        const trades = response.data || []
        commit('setExpertTrades', trades)
        return response
    },
    async fetchExpertTradesHistory({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.expertTradesHistory,
            loader: 'loadingExpertTradeHistory'
        }
        const response = await dispatch('makeApiCall', params)
        const dataObject = response.data || {}
        const trades = dataObject.pagedata || []

        const pagination = {
            currentPageIndex: dataObject.currentpageindex,
            hasNextPage: dataObject.hasnextpage,
            hasPreviousPage: dataObject.haspreviouspage,
            pageSize: dataObject.pagesize,
            totalItemCount: dataObject.totalitemcount,
            totalPageCount: dataObject.totalpagecount
        }

        commit('setExpertTradesHistory', trades)
        commit('setExpertTradesHistoryPagination', pagination)

        return response
    },
    async fetchFollowersUserTrade({ commit, dispatch }, params) {

        params.metadata = {
            end_point: url.followersUserTrade,
            loader: 'loadingFollowerUserTrade'
        }

        const response = await dispatch('makeApiCall', params)
        const dataObject = response.data || {}
        const tradeList = dataObject.pagedata || []

        const pagination = {
            currentPageIndex: dataObject.currentpageindex,
            hasNextPage: dataObject.hasnextpage,
            hasPreviousPage: dataObject.haspreviouspage,
            pageSize: dataObject.pagesize,
            totalItemCount: dataObject.totalitemcount,
            totalPageCount: dataObject.totalpagecount
        }

        commit('setFollowerUserTrade', tradeList)
        commit('setFollowerUserTradePagination', pagination)
        return response
    },
    async fetchFollowerUsersTradeHistory({ commit, dispatch }, params) {

        params.metadata = {
            end_point: url.followerUsersTradeHistory,
            loader: 'loadingFollowerUserTradeHistory'
        }

        const response = await dispatch('makeApiCall', params)
        const dataObject = response.data || {}
        const tradeList = dataObject.pagedata || []

        const pagination = {
            currentPageIndex: dataObject.currentpageindex,
            hasNextPage: dataObject.hasnextpage,
            hasPreviousPage: dataObject.haspreviouspage,
            pageSize: dataObject.pagesize,
            totalItemCount: dataObject.totalitemcount,
            totalPageCount: dataObject.totalpagecount
        }

        commit('setFollowerUserTradeHistory', tradeList)
        commit('setFollowerUserTradeHistoryPagination', pagination)
        return response
    },
    async fetchProfitSharing({ commit, dispatch }, params) {

        params.metadata = {
            end_point: url.profitSharing,
            loader: 'loadingProfitSharing'
        }

        const response = await dispatch('makeApiCall', params)
        const dataObject = response.data || {}
        const profitSharingList = dataObject.pagedata || []

        const pagination = {
            currentPageIndex: dataObject.currentpageindex,
            hasNextPage: dataObject.hasnextpage,
            hasPreviousPage: dataObject.haspreviouspage,
            pageSize: dataObject.pagesize,
            totalItemCount: dataObject.totalitemcount,
            totalPageCount: dataObject.totalpagecount
        }

        commit('setProfitSharing', profitSharingList)
        commit('setProfitSharingPagination', pagination)
        return response
    },
    async fetchMyFollowerData({ commit, dispatch }, params) {

        params.metadata = {
            end_point: url.myFollowerData,
            loader: 'loadingMyFollowerData'
        }

        const response = await dispatch('makeApiCall', params)
        const dataObject = response.data || {}

        commit('setMyFollowerData', dataObject)
        return response
    },
    async fetchMyFollowerExperts({ commit, dispatch }, params) {

        params.metadata = {
            end_point: url.myFollowerExperts,
            loader: 'loadingMyFollowerExperts'
        }

        const response = await dispatch('makeApiCall', params)
        const followerExpertList = response.data || []

        commit('setMyFollowerExperts', followerExpertList)
        return response
    },
    async fetchMyTrades({ commit, dispatch }, params) {

        params.metadata = {
            end_point: url.myTrades,
            loader: 'loadingMyTrades'
        }

        const response = await dispatch('makeApiCall', params)
        console.log('response::', response);

        const trades = response.data || []

        commit('setMyTrades', trades)
        return response
    },
    async fetchMyTradeHistory({ commit, dispatch }, params) {

        params.metadata = {
            end_point: url.myTradeHistory,
            loader: 'loadingMyTradeHistory'
        }

        const response = await dispatch('makeApiCall', params)
        console.log('response::fetchMyTradeHistory', response);

        const dataObject = response.data || {}
        const trades = dataObject.pagedata || []
        const pagination = {
            currentPageIndex: dataObject.currentpageindex,
            hasNextPage: dataObject.hasnextpage,
            hasPreviousPage: dataObject.haspreviouspage,
            pageSize: dataObject.pagesize,
            totalItemCount: dataObject.totalitemcount,
            totalPageCount: dataObject.totalpagecount
        }
        commit('setMyTradeHistory', trades)
        commit('setMyTradeHistoryPagination', pagination)
        return response
    },
    async submitTraderProfitRatio({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.adjustProfitRatio
        }
        const response = await dispatch('makeApiCall', params)
        return response
    },
    async updateExpertAmount({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.changeAmount,
            loader: 'updatingExpertAmount'
        }
        const response = await dispatch('makeApiCall', params)
        return response
    },
    async updateExpertStatus({ commit, dispatch }, params) {
        params.metadata = {
            end_point: url.changeTradeStatus,
            loader: 'updatingExpertStatus'
        }
        const response = await dispatch('makeApiCall', params)
        console.log('responseresponseresponse updateExpertStatus', response);
        return response
    },
    async fetchUserProfitSharing({ commit, dispatch }, params) {

        params.metadata = {
            end_point: url.userProfitSharing,
            loader: 'loadingUserProfitSharing'
        }

        const response = await dispatch('makeApiCall', params)
        const dataObject = response.data || {}
        const trades = dataObject.pagedata || []
        const pagination = {
            currentPageIndex: dataObject.currentpageindex,
            hasNextPage: dataObject.hasnextpage,
            hasPreviousPage: dataObject.haspreviouspage,
            pageSize: dataObject.pagesize,
            totalItemCount: dataObject.totalitemcount,
            totalPageCount: dataObject.totalpagecount
        }
        commit('setUserProfitSharing', trades)
        commit('setUserProfitSharingPagination', pagination)
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
                //throw Error(response)
            }
            return response
        } catch (error) {
            console.log('error:', error)
            return error
        }
    },

}