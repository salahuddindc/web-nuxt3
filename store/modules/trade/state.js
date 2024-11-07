export default () => ({

    symbolInfo: {},
    prevSymbolName: null,
    tempData: {}, //need to store temprary data
    MarketTrades: false,
    marketDepth: false,
    triggerOrderOpened: false,
    socketTradeDetail: {}, //data.data
    contractAssets: {},
    socketTradeDetailData: [],
    assets: {
        unrealizedPnl: 0,
        roi: 0, // %
        availableUsdt: 0
    },
    lastBar: {
        time: null,
        high: null,
        low: null,
        open: null,
        close: null
    }
})
