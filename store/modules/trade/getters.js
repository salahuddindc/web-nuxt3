


const getSymbolInfo = (state, getters, rootState, rootGetters) => {

    const symbolInfo = state.symbolInfo ? state.symbolInfo : {}
    const currency = rootGetters.getCurrencyinfos.find(info => symbolInfo.descriptions ? symbolInfo.descriptions.includes(info.currencyname) : null)
    symbolInfo.currency = currency ? currency : {}
    return symbolInfo
}


const getMarketTrades = (state) => {
    return state.MarketTrades ? state.MarketTrades : []
}
const getMarketDepth = (state) => {
    return state.marketDepth ? state.marketDepth : []
}

const triggerOrderOpened = (state) => {
    return state.triggerOrderOpened
}

const getSocketTradeDetail = (state) => {
    const detail = state.socketTradeDetail.data ? state.socketTradeDetail : { data: [] }
    return detail
}
const getSocketTradeDetailData = (state) => {
    return state.socketTradeDetailData ? state.socketTradeDetailData : []
}

const getKlineLastBar = (state) => {
    return state.lastBar ? state.lastBar : {}
}

const getAssets = (state, obj) => {
    return state.assets
}
const getPrevSymbolName = (state, obj) => {
    return state.prevSymbolName
}
const getContractAssets = (state) => {
    return state.contractAssets
}
export default {
    getMarketDepth,
    getSymbolInfo,
    getMarketTrades,
    triggerOrderOpened,
    getSocketTradeDetail,
    getSocketTradeDetailData,
    getKlineLastBar,
    getAssets,
    getPrevSymbolName,
    getContractAssets
}
