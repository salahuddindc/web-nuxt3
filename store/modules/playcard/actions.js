

const url = {
    games: "/gameapi/v1.0/game/games.get",
    gamerooms: "/gameapi/v1.0/game/gamerooms.get",
    gameroominfo: "/gameapi/v1.0/game/gameroominfo.get",
    mybetorder: "/gameapi/v1.0/game/mybetorders.get",
    usergameassets: "/gameapi/v1.0/game/usergameassets.get",
    betcreate: '/gameapi/v1.0/game/bet.create',
    gamedata: '/gameapi/v1.0/game/games.data',
    billingdetail: '/userapi/v1.0/user/assets.record.getlist',
    usergamedata: '/gameapi/v1.0/game/gameuserinfo.get',
    topwinners:'/gameapi/v1.0/game/topwin.get'
}
export default {
    async fetchGamesData({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingGameData',
            end_point: url.gamedata
        }
        const response = await dispatch('makeApiCall', params);
        const object = response.data
        if (object) {
            commit('setGameData', object)
            return object.pagedata
        } else return {}
    },

    async fetchGames({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingGames',
            end_point: url.games
        }
        const response = await dispatch('makeApiCall', params);
        const object = response.data
        if (object) {
            if (params.mutateState) {
                commit('setGames', object.pagedata)
                // commit('setSelectedGame', object.pagedata[10])
            }
            return object.pagedata
        } else return []

    },

    async fetchSingleGames({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingGames',
            end_point: url.games
        }
        const response = await dispatch('makeApiCall', params);
        const object = response.data
        // commit('setGames', object.pagedata)
        return object.pagedata.length > 0 ? object.pagedata[0] : false
    },


    async fetchRooms({ commit, dispatch }, params) {

        params.metadata = {
            loader: 'loadingRooms',
            end_point: url.gamerooms
        }
        const response = await dispatch('makeApiCall', params);
        const object = response.data
        commit('setRooms', object)
        return object
    },

    async fetchRoomInfo({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingRoomInfo',
            end_point: url.gameroominfo
        }
        const response = await dispatch('makeApiCall', params);
        const object = response.data
        if(object){
            console.log(object, "object")
            commit('setRoomInfo', object)
            return object
        }
        else return {}

    },

    async fetchBlockHashes({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingHashes',
            end_point: url.games
        }
        const response = await dispatch('makeApiCall', params);
        const data = response.data
        let hashes = []
        if (data) {
            hashes = data.pagedata ? data.pagedata : []
            const object = {
                currentPageIndex: data.currentpageindex,
                hasNextPage: data.hasnextpage,
                hasPreviousPage: data.haspreviouspage,
                pageSize: data.pagesize,
                totalItemCount: data.totalitemcount,
                totalPageCount: data.totalpagecount,
            }
            commit('setHashPagination', object)
            commit('setBlockHashes', hashes)
            return data.pagedata
        } else return []
    },

    async fetchHashGameRoomInfo({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingHashGamesInfo',
            end_point: url.gameroominfo
        }
        const response = await dispatch('makeApiCall', params);
        const object = response.data
        commit('setHashGamesInfo', object)
        return object
    },

    async fetchPlayers({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingPlayers',
            end_point: url.mybetorder
        }
        const response = await dispatch('makeApiCall', params);
        const data = response.data
        let players = []
        if (data) {
            players = data.pagedata ? data.pagedata : []
            const object = {
                currentPageIndex: data.currentpageindex,
                hasNextPage: data.hasnextpage,
                hasPreviousPage: data.haspreviouspage,
                pageSize: data.pagesize,
                totalItemCount: data.totalitemcount,
                totalPageCount: data.totalpagecount,
            }
            commit('setPlayerPagination', object)
        }
        commit('setPlayers', players)
        return players
    },

    async fetchOpenBetting({ commit, dispatch }, params) {
        //console.log("dsafsadfasdfasdfsdafsdafsadfsadfasdfsdafsdafsdafsdafd")
        params.metadata = {
            loader: 'loadingOrders',
            end_point: url.mybetorder
        }
        const response = await dispatch('makeApiCall', params);
        const data = response.data
        let open = []
        if (data) {
            open = data.pagedata ? data.pagedata : []
            const object = {
                currentPageIndex: data.currentpageindex,
                hasNextPage: data.hasnextpage,
                hasPreviousPage: data.haspreviouspage,
                pageSize: data.pagesize,
                totalItemCount: data.totalitemcount,
                totalPageCount: data.totalpagecount,
            }
            commit('setOpenPagination', object)
        }
        commit('setOpenBetting', open)
        return open

    },

    async fetchHistoryBetting({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingOrders',
            end_point: url.mybetorder
        }
        const response = await dispatch('makeApiCall', params);
        const data = response.data
        let history = []
        if (data) {
            history = data.pagedata ? data.pagedata : []
            const object = {
                currentPageIndex: data.currentpageindex,
                hasNextPage: data.hasnextpage,
                hasPreviousPage: data.haspreviouspage,
                pageSize: data.pagesize,
                totalItemCount: data.totalitemcount,
                totalPageCount: data.totalpagecount,
            }
            commit('setHistoryPagination', object)
        }
        commit('setHistoryBetting', history)
        return history
    },
    async fetchBillingDetail({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingOrders',
            end_point: url.billingdetail
        }
        const response = await dispatch('makeApiCall', params);
        const data = response.data
        let billingdetail = []
        if (data) {
            billingdetail = data.pagedata ? data.pagedata : []
            const object = {
                currentPageIndex: data.currentpageindex,
                hasNextPage: data.hasnextpage,
                hasPreviousPage: data.haspreviouspage,
                pageSize: data.pagesize,
                totalItemCount: data.totalitemcount,
                totalPageCount: data.totalpagecount,
            }
            commit('setBillingPagination', object)
        }
        commit('setBillingDetail', billingdetail)
        return billingdetail
    },


    async fetchBettingOrders({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingOrders',
            end_point: url.mybetorder
        }
        const response = await dispatch('makeApiCall', params);

        const data = response.data
        let orders = []

        if (data) {

            orders = data.pagedata ? data.pagedata : []

            const object = {
                currentPageIndex: data.currentpageindex,
                hasNextPage: data.hasnextpage,
                hasPreviousPage: data.haspreviouspage,
                pageSize: data.pagesize,
                totalItemCount: data.totalitemcount,
                totalPageCount: data.totalpagecount,
            }

            commit('setListPagination', object)
        }


        commit('setBetOrders', orders)
        return orders
    },



    async fetchUserGameAssets({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingStrategyInfo',
            end_point: url.usergameassets
        }
        const response = await dispatch('makeApiCall', params);
        const object = response.data
        commit('setUserGameAssets', object)
        return object
    },
    async submitBetCreate({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'loadingBetCreate',
            end_point: url.betcreate
        }
        const response = await dispatch('makeApiCall', params);
        console.log(response, "betresponse")
        return response
    },
    async fetchUserGameData({ commit, dispatch }, params) {

        params.metadata = {
            loader: 'loadingUserGameData',
            end_point: url.usergamedata
        }
        const response = await dispatch('makeApiCall', params);
        const object = response.data
        //console.log("setGames")
        commit('setUserGameData', object)
        return object
    },
    async fetchTopWinners({ commit, dispatch }, params) {

        params.metadata = {
            loader: 'loadingTopWinners',
            end_point: url.topwinners
        }
        const response = await dispatch('makeApiCall', params);
        const object = response.data
        if(object){
            return object
        }
        else return []
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
            console.error('playcard store in makeApiCall function', error)
            return error
        }
    }

}
