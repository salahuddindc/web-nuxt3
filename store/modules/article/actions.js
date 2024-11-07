import * as CryptoJS from 'crypto-js';;
const url = {
    articleInfo: "/comapi/v1.0/com/article.info.get",
    supportNotSupport: "/comapi/v1.0/com/articledata.create",
    channels: "/comapi/v1.0/com/article.channels",
    searchArticle: "/comapi/v1.0/com/article.search",
    createComment: "/comapi/v1.0/com/comment.create",
    getArticleComments: "/comapi/v1.0/com/articlecommont.get",
    getCommissionRank: "/userapi/v1.0/user/integral.user.getcommissionranks"
}

export default {
    async fetchArticleChannels({ commit, dispatch }, params) {
        params.loader = 'loadingMainChannels'
        params.storeDataInCache = true
        const response = await dispatch('makeApiCall', params);
        const channelObject = response.data
        console.log("childerrrrrnnnn ", channelObject)
        commit('setArticleChannels', channelObject)
    },
    async fetchAnnouncement({ commit, dispatch }, params) {
        params.end_point = url.searchArticle
        params.storeDataInCache = true
        params.loader = 'loadingMainChannels'
        params.storeDataInCache = true
        const response = await dispatch('makeApiCall', params);
        console.log("announcement", response)

        const channelObject = response.data ? response.data.pagedata : []
        commit('setAnnouncement', channelObject)
        return response
    },
    async fetchArticles({ commit, dispatch }, params) {

        params.end_point = url.searchArticle
        params.storeDataInCache = true
        params.loader = 'loadingArticles'
        const response = await dispatch('makeApiCall', params)
        return response
    },
    async fetchSubItems({ commit, dispatch }, params) {
        params.end_point = url.searchArticle
        params.loader = 'loadingArticlesList'
        params.storeDataInCache = false
        const response = await dispatch('makeApiCall', params)
        const data = response.data
        let subItems = []
        if (data) {

            subItems = data.pagedata ? data.pagedata : []
            const object = {
                currentPageIndex: params.pageIndex,
                hasNextPage: data.hasnextpage,
                hasPreviousPage: data.haspreviouspage,
                pageSize: params.pageSize,
                totalItemCount: data.totalitemcount,
                totalPageCount: data.totalpagecount,
            };
            commit('setSubItemPagination', object)
        }
        commit('setSubItems', subItems)
        return response
    },
    async onSearch({ commit, dispatch }, params) {
        params.end_point = url.searchArticle
        params.loader = 'loadingArticlesList'
        params.storeDataInCache = true
        const response = await dispatch('makeApiCall', params);
        const data = response.data;
        let searchResults = [];
        if (data) {
            searchResults = data.pagedata ? data.pagedata : [];
        }
        commit('setSearchResults', searchResults)
    },


    async fetchLatestArticles({ commit, dispatch }, params) {
        params.end_point = url.searchArticle
        params.loader = 'laodingLatestArticles'
        params.storeDataInCache = true
        const response = await dispatch('makeApiCall', params)
        console.log(params,"all article")
        let articles = []
        if (response.data) {
            articles = response.data.pagedata ? response.data.pagedata : []
        }
        commit('setLatestArticles', articles)

    },

    async fetchRecomendArticles({ commit, dispatch }, params) {
        params.end_point = url.searchArticle
        params.loader = 'loadingRecommendArticles'
        params.storeDataInCache = true
        const response = await dispatch('makeApiCall', params)
        let articles = []
        if (response.data) {
            articles = response.data.pagedata ? response.data.pagedata : []
        }
        commit('setRecomendArticles', articles)
    },

    async fetchChannelInfo({ commit, dispatch }, params) {
        params.end_point = url.articleInfo
        const object = { //to get related articles
            ...params,
            channelID: params.subChannel,
        }
        params.loader = 'loadingArticleDetail'
        // params.storeDataInCache = true

        const [response] = await Promise.all([
            dispatch('makeApiCall', params),
            dispatch('fetchSubItems', object)
        ])
        const subItem = response.data
        commit('setSubItem', subItem)
    },
    async fetchFaqs({ commit, dispatch }, params) {
        params.end_point = url.articleInfo;
        params.loader = 'loadingArticleDetail';
        params.storeDataInCache = false;
    
        const response = await dispatch('makeApiCall', params);
        const faqs = response.data;
    
        commit('setFaqsParams', {
          coin: params.coin,
          fiat: params.fiat,
          isCalculator: params.isCalculator
        });
        commit('setFaqs', faqs);
        return response
      },
    async fetchBullishBearishData({ commit, dispatch }, payload) {
        const params = {
            end_point: url.articleInfo,
            articleID: payload.articleID
        };
        params.storeDataInCache = false
        return await dispatch('makeApiCall', params)
    },

    async submitComment({ commit, dispatch }, params) {
        params.end_point = url.createComment
        params.loader = 'creatingArticleComment'
        params.storeDataInCache = false
        const response = await dispatch('makeApiCall', params)
        if (response.code == 200) {
            dispatch('fetchComments', { articleID: params.articleID, pageIndex: 1, pageSize: 10 })
        }
        return response
    },
    async fetchComments({ commit, dispatch }, params) {
        params.end_point = url.getArticleComments
        params.loader = 'loadingComments'
        params.storeDataInCache = true
        const response = await dispatch('makeApiCall', params)

        let comments = []
        const data = response.data
        if (data) {
            comments = data.pagedata ? data.pagedata : []
            const object = {
                currentPageIndex: data.currentpageindex,
                hasNextPage: data.hasnextpage,
                hasPreviousPage: data.haspreviouspage,
                pageSize: data.pagesize,
                totalItemCount: data.totalitemcount,
                totalPageCount: data.totalpagecount,
            }
            commit('setCommentsPagination', object)
        }

        commit('setArticleComments', comments)
        return response
    },


    saveCurrentChannelToState({ commit }, payload) {
        commit('setCurrentChannel', payload)
    },

    async saveSupportNotSupport({ commit, dispatch }, params) {
        params.end_point = url.supportNotSupport
        let loader = 'notSupporting'
        if (params.isSupport) {
            loader = 'supporting'
        }

        params.loader = loader
        params.storeDataInCache = false
        const response = await dispatch('makeApiCall', params)
        return response
    },

    // commission rank on recommend page
    async fetchCommissionRank({ commit, dispatch }, params) {
        params.end_point = url.getCommissionRank
        params.loader = 'loadingMainChannels'
        params.storeDataInCache = true
        const response = await dispatch('makeApiCall', params);
        const channelObject = response.data
        console.log("childerrrrrnnnn ", channelObject)
        commit('setCommissionRank', channelObject)
    },

    //home page top section data
    async fetchPromotions({ commit, dispatch }, params) {
        params.end_point = url.searchArticle

        params.loader = 'loadingPromotions'
        params.storeDataInCache = true
        const response = await dispatch('makeApiCall', params)
        const footerData = response.data ? response.data.pagedata : []

        commit('setPromotions', footerData)
        return response
    },

    //footer channel
    async fetchFooterData({ commit, dispatch }, params) {
        params.end_point = url.channels

        params.loader = 'loadingFooterData'
        params.storeDataInCache = true

        const response = await dispatch('makeApiCall', params)
        const footerData = response.data ? response.data.children : []

        commit('setFooterData', footerData)
        return response
    },


    //     updateSelectedKey({ commit }, { selectedKey, hoverKey }) {
    //   commit('setSelectedKey', selectedKey);
    //   commit('sethoverkey', hoverKey);
    // },

    async makeApiCall({ rootState, rootGetters }, params) {
        try {
            const loader = params.loader ? params.loader : null
            const general = rootState.general
            if (loader) {
                general[loader] = true
            }
            params.lang = rootGetters.currentLang
            params.end_point = params.end_point ? params.end_point : url.channels
            const shouldStoreDataInCache = params.storeDataInCache
            let response;
            const paramsMD5 = CryptoJS.MD5(JSON.stringify(params)).toString()
            if (shouldStoreDataInCache && process.client && window.localStorage.getItem(paramsMD5) && (new Date().getTime() < (new Date(JSON.parse(window.localStorage.getItem(paramsMD5)).expireTime).getTime() + (60 * 60 * 1000)))) {
                response = JSON.parse(window.localStorage.getItem(paramsMD5))
                if (loader) {
                    general[loader] = false
                }
                return response

            }
            else {
                response = await this.$axios.post(params.end_point, params, {})
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
                return response
            }
        } catch (error) {
            console.error('Error occurred in makeApiCall function:', error.message);
            console.error('Error stack trace:', error.stack);
            return error;
        }

    }

}
