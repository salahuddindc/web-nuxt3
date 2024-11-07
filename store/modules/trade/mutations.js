

const setSymbolInfo = (state, object) => {
    state.symbolInfo = object
}
const setMarketTrades = (state, object) => {
    state.MarketTrades = object
}
const setMarketDepth = (state, object) => {
    state.marketDepth = object
}
const setTriggerOrderOpened = (state, bool) => {
    state.triggerOrderOpened = bool
}

const setSocketTradeDetail = (state, obj) => {
    state.socketTradeDetail = obj
}

const setSocketTradeDetailData = (state, data) => {
    if (state.socketTradeDetailData.length == 0 || data.length == 0) {
        state.socketTradeDetailData = data
    } else {
        state.socketTradeDetailData.unshift(data)
    }



    if (state.socketTradeDetailData.length > 100) {
        state.socketTradeDetailData.pop();
    }

}
const setKlineLastBar = (state, obj) => {
    state.lastBar = obj
}
const setTempData = (state, obj) => {
    state.tempData = obj
}
const setAssets = (state, obj) => {
    state.assets = obj
}
const setContractAssets = (state, obj) => {
    state.contractAssets = obj
}

const setPrevSymbolName = (state, obj) => {
    state.prevSymbolName = obj
}




export default {
    setSymbolInfo,
    setMarketTrades,
    setMarketDepth,
    setTriggerOrderOpened,
    setSocketTradeDetail,
    setSocketTradeDetailData,
    setKlineLastBar,
    setTempData,
    setAssets,
    setPrevSymbolName,
    setContractAssets
}
