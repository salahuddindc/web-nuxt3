const url = {
    verifyUserInfo: "/userapi/v1.0/usercommon/verifyuserinfo.get",
    marketTrades: "",
    marketDepth: "/transactionapi/v1.0/quotation/marketing.depth.get",
    changeLeverage: "/transactioncontract/v1.0/trading/change.multiple",
    placeOrder: "/transactioncontract/v1.0/trading/order.create",
    searchOrder: "/transactioncontract/v1.0/trading/order.search",
    cancelOrder: "/transactionapi/v1.0/trading/order.cancel",
    contractCancelOrder: "/transactioncontract/v1.0/trading/order.cancel",
    contractAssets: "/userapi/v1.0/usercontract/user.contractassets.new.infos"
};

export default {
    async verifyUserInfo({ commit, dispatch }, params) {
        //this is just sample
        params.metadata = {
            // loader: 'loadingStrategyInfo',
            end_point: url.verifyUserInfo,
        };

        const response = await dispatch("makeApiCall", params);
        const object = response.data;
        commit("setTempUser", object);
        return response;
    },

    async fetchMarketTrades({ commit, dispatch }, params) {
        //this is just sample
        params.metadata = {
            loader: 'loadingMarketTrades',
            end_point: url.marketTrades,
        };

        const response = await dispatch("makeApiCall", params);
        const object = response.data;
        commit('setMarketTrades', object)
        return object;
    },
    async fetchMarketDepth({ commit, dispatch }, params) {
        //this is just sample
        params.metadata = {
            loader: 'loadingMarketDepth',
            end_point: url.marketDepth,
        };

        const response = await dispatch("makeApiCall", params);
        const object = response.data;
        commit('setMarketDepth', object)
        return object;
    },
    async submitChangeLeverage({ commit, dispatch }, params) {
        //this is just sample
        params.metadata = {
            loader: 'changingLeverage',
            end_point: url.changeLeverage,
        }

        const response = await dispatch("makeApiCall", params)
        return response
    },

    async placeOrder({ commit, dispatch }, params) {
        // orderType
        // 1: Opening limit order, 2: Opening market order, 3: Opening plan order,
        // 4: Closing limit, 5: Closing market price, 6: Closing plan order, 7: Mandatory Close long, 8: forced close
        params.metadata = {
            loader: 'placingOrder',
            end_point: url.placeOrder,
        }

        const response = await dispatch("makeApiCall", params)
        return response
    },
    async contractCancelOrder({ commit, dispatch }, params) {

        params.metadata = {
            loader: 'cancellingOrder',
            end_point: url.contractCancelOrder,
        }

        const response = await dispatch("makeApiCall", params)
        return response
    },


    async fetchOrders({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'fetchingOrders',
            end_point: url.searchOrder,
        }
        const response = await dispatch("makeApiCall", params)
        // console.log('changingLeverage:response', response)
        return response
    },
    async fetchContractAssets({ commit, dispatch }, params) {
        params.metadata = {
            loader: 'fetchingOrders',
            end_point: url.contractAssets,
        }
        const response = await dispatch("makeApiCall", params)
        if (response.code == 200) {
            const responseData = response.data || []
            console.log('getContractAssesInfos:: DATA', responseData);
            const contractAsset = responseData.length > 0 ? responseData[0] : {}
            commit('setContractAssets', contractAsset)
        }
        // console.log('changingLeverage:response', response)
        return response
    },

    async makeApiCall({ rootState, rootGetters }, params) {
        try {
            const general = rootState.general;
            const metadata = params.metadata;

            const loader = metadata ? metadata.loader : null;

            if (loader) {
                general[loader] = true;
            }

            params.lang = rootGetters.currentLang;
            const end_point = metadata.end_point;

            delete params["metadata"];
            const response = await this.$axios.post(end_point, params, {});
            console.log('changingLeverage:response', response)
            if (loader) {
                general[loader] = false
            }

            if (response.code && response.code != 200) {
                throw Error(response);
            }
            return response;
        } catch (error) {
            console.error("auth store in makeApiCall function", error);
            return error;
        }
    },
};
