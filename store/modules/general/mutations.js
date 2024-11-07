export default {
    setLoadingArticlesList(state, bool) {
        state.loadingArticlesList = bool
    },

    setLoadingArticleDetail(state, bool) {
        state.loadingArticleDetail = bool
    },

    setLoadingRelatedArticles(state, bool) {
        state.loadingRelatedArticles = bool
    },

    setLoadingMainChannels(state, bool) {
        state.loadingMainChannels = bool
    },

    setLaodingLatestArticles(state, bool) {
        state.laodingLatestArticles = bool
    },

    setLoadingRecommendArticles(state, bool) {
        state.loadingRecommendArticles = bool
    },
    setCreatingArticleComment(state, bool) {
        state.creatingArticleComment = bool
    },
    setLoadingComments(state, bool) {
        state.loadingComments = bool
    },


    //market
    setAddOrRemovingFromFavorite(state, bool) {
        state.addOrRemovingFromFavorite = bool
    },
    setFetchingGraphData(state, bool) {
        state.fetchingGraphData = bool
    },

    setfetchingFavoriteList(state, bool) {
        return state.fetchingFavoriteList = bool
    },

    //strategy
    setLoadingStrategyInfo(state, bool) {
        return state.loadingStrategyInfo = bool
    },

    //footer
    setLoadingFooterData(state, bool) {
        return state.loadingFooterData = bool
    },
    //promotions
    setLoadingPromotions(state, bool) {
        return state.loadingPromotions = bool
    },
    //trade
    setloadingMarketTrades(state, bool) {
        return state.loadingMarketTrades = bool
    },
    setloadingMarketDepth(state, bool) {
        return state.loadingMarketDepth = bool
    },
    setChangingLeverage(state, bool) {
        return state.changingLeverage = bool
    },



    //market
    setloadingQuotationDailyData(state, bool) {
        return state.loadingQuotationDailyData = bool
    },

    // square

    setloadingTopFollow(state, bool) {
        state.loadingTopFollow = bool
    },
    setloadingRecommend(state, bool) {
        state.loadingRecommend = bool
    },
    setUserDataLoader(state, bool) {
        state.userDataLoader = bool
    },
    // chat
    setAuthChatsLoader(state, bool) {
        state.loadingAuthChats = bool
    },

    // general

    setUserNickNameAvatar(state, obj) {
        state.userNickNameAvatar = obj
    },



}