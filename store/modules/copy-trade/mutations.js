const setAuthExpertData = (state, object) => {
    state.expertAuthData = object
}
const setExpertData = (state, object) => {
    state.expertData = object
}

const setRoiTraders = (state, arrayData) => {
    return state.roiTraders = arrayData
}
const setTradersByProfitAndLoss = (state, arrayData) => {
    return state.tradersByProfitAndLoss = arrayData
}
const setNewTraders = (state, arrayData) => {
    return state.newTraders = arrayData
}

const setAllTraders = (state, arrayData) => {
    return state.allTraders = arrayData
}
const setAllTraderPagination = (state, obj) => {
    return state.allTraderPagination = obj
}
const setTags = (state, dataArray) => {
    return state.tags = dataArray
}

const setSelectedTrader = (state, obj) => {
    return state.selectedTrader = obj
}
const setExpertFollowers = (state, arrayData) => {
    return state.expertFollowers = arrayData
}

const setExpertFollowersPagination = (state, obj) => {
    return state.expertFollowersPagination = obj
}
const setSelectedDuration = (state, days) => {
    return state.selectedDuration = days
}
const setExpertTrades = (state, arrayData) => {
    return state.expertTrades = arrayData
}
const setExpertTradesHistory = (state, arrayData) => {
    return state.expertTradesHistory = arrayData
}
const setFollowerUserTrade = (state, arrayData) => {
    return state.followersUserTrade = arrayData
}
const setFollowerUserTradePagination = (state, obj) => {
    return state.followerUserTradePagination = obj
}
const setFollowerUserTradeHistory = (state, arrayData) => {
    return state.followerUserTradeHistory = arrayData
}
const setFollowerUserTradeHistoryPagination = (state, obj) => {
    return state.followerUserTradeHistoryPagination = obj
}

const setProfitSharing = (state, arrayData) => {
    return state.profitSharing = arrayData
}
const setProfitSharingPagination = (state, obj) => {
    return state.profitSharingPagination = obj
}

const setMyFollowerData = (state, obj) => {
    return state.myFollowerData = obj
}

const setMyFollowerExperts = (state, arrayData) => {
    return state.myFollowerExperts = arrayData
}

const setMyTrades = (state, arrayData) => {
    return state.myTrades = arrayData
}

const setMyTradeHistory = (state, arrayData) => {
    return state.myTradeHistory = arrayData
}
const setMyTradeHistoryPagination = (state, obj) => {
    return state.myTradeHistoryPagination = obj
}

const setUserProfitSharing = (state, arrayData) => {
    return state.userProfitSharing = arrayData
}
const setUserProfitSharingPagination = (state, obj) => {
    return state.userProfitSharingPagination = obj
}
const setBestFollowers = (state, arrayData) => {
    return state.bestFollowers = arrayData
}
const setBestFollowersPagination = (state, obj) => {
    return state.bestFollowersPagination = obj
}

const setBestExperts = (state, arrayData) => {
    return state.bestExperts = arrayData
}
const setExpertTradesHistoryPagination = (state, obj) => {
    return state.expertTradesHistoryPagination = obj
}
export default {
    setAuthExpertData,
    setRoiTraders,
    setTradersByProfitAndLoss,
    setNewTraders,
    setAllTraders,
    setAllTraderPagination,
    setTags,
    setExpertData,
    setSelectedTrader,
    setExpertFollowers,
    setExpertFollowersPagination,
    setSelectedDuration,
    setExpertTrades,
    setExpertTradesHistory,
    setFollowerUserTrade,
    setFollowerUserTradePagination,
    setFollowerUserTradeHistory,
    setFollowerUserTradeHistoryPagination,
    setProfitSharing,
    setProfitSharingPagination,
    setMyFollowerData,
    setMyFollowerExperts,
    setMyTrades,
    setMyTradeHistory,
    setMyTradeHistoryPagination,
    setUserProfitSharing,
    setUserProfitSharingPagination,
    setBestFollowers,
    setBestFollowersPagination,
    setBestExperts,
    setExpertTradesHistoryPagination
}
