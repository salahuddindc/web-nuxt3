

const setCurrencyDetail = (state, payload) => {
    state.currencyDetail = payload
}

const setCurrencyGraphData = (state, payload) => {
    state.currencyGraphData = payload
}

const setQuotationDailyData = (state, payloadArray) => {
    return state.quotationDailyData = payloadArray
}
const setCurrentCurrency = (state, currency) => {
    return state.currentCurrency = currency
}

const setMarkAsFavorite = (state, isFavorite) => {
    return state.spotMarket.self = isFavorite
}
const setFavoriteList = (state, data) => {
    return state.favoriteList = data
}

const setCurrentMarketPrice = (state, data) => {
    state.prevMarketPrice = state.currentMarketPrice.c
    return state.currentMarketPrice = data
}
const setCurrentMarketType = (state, data) => {
    return state.currentMarketType = data
}

const setLastBuyRate = (state, rate) => {
    return state.lastBuyRate = rate
}

const setLastSellRate = (state, rate) => {
    return state.lastSellRate = rate
}

const setContractAllMarketList = (state, data) => {
    return state.contractMarketPriceList = data
}
const setQuotationDetails = (state, data) => {
    return state.quotationDetails = data;
}
const setMarketSentiment = (state,data)=>{
    return state.marketSentiment = data
}
export default {
    setCurrencyDetail,
    setCurrencyGraphData,
    setQuotationDailyData,
    setCurrentCurrency,
    setMarkAsFavorite,
    setFavoriteList,
    setCurrentMarketPrice,
    setCurrentMarketType,
    setContractAllMarketList,
    setQuotationDetails,
    setLastBuyRate,
    setLastSellRate,
    setMarketSentiment
}