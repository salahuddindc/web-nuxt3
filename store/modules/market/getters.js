
const getCurrencyDetail = (state, getters, rootState, rootGetters) => {
    const detail = state.currencyDetail
    try {
        //there may be an error if shordescription not have proper json format
        //so try catch is added for smooth code execution
        const desc = JSON.parse(detail.shortdescription)
        detail.shortdescription = desc
        const currencyName = desc ? desc.currencyname : ''
        const currencyInfos = rootState.currencyinfos
        const currencyInfo = currencyInfos.find((currencyInfo) => currencyInfo.currencyname.includes(currencyName.toUpperCase()))
        detail.fullname = currencyInfo.fullname
    } catch (error) {
        // //console.log('currencyInfo getCurrencyDetail: ', error)
    }
    return detail ? detail : {}
}

const getCurrencyGraphData = (state, getters, rootState, rootGetters) => {
    return state.currencyGraphData
}
const getQuotationDetails = (state, getters, rootState, rootGetters) => {
    return state.quotationDetails
}
const getQuotationDailyData = (state, getters, rootState, rootGetters) => {
    return state.quotationDailyData
}

const getContractAllMarketList = (state, getters, rootState, rootGetters) => {
    return state.contractMarketPriceList || []
}


const getCurrentMarketPrice = (state, getters, rootState, rootGetters) => {
    const marketPrice = state.currentMarketPrice.c ? state.currentMarketPrice : {}
    const closingPrice = marketPrice.c
    // console.log('closingPrice', closingPrice);
    if (closingPrice == state.prevMarketPrice) {
        marketPrice.direction = 0
    } else if (closingPrice < state.prevMarketPrice) {
        marketPrice.direction = 1
    } else {
        marketPrice.direction = -1
    }
    marketPrice.price = marketPrice.c
    // console.log('getter: symble', marketPrice.symble);
    return marketPrice
}


const getSpotMarkets = (state, getters, rootState, rootGetters) => {
    //when itype will be equal to 0
    // symbol should be currencyName/yx
    const cryptoCurrencies = rootState.symbleinfos
    const currencyInfos = rootState.currencyinfos
    const dailyData = state.quotationDailyData ? state.quotationDailyData : []

    const updatedArr = []

    cryptoCurrencies.map(currency => {

        const matchedItem = dailyData.find((d) => d.ctid == currency.id && d.itype == 0)
        if (matchedItem) {
            const symble = matchedItem.symble.split('/')
            const s = symble[0]
            const coinName = symble.join('_')
            const currencyInfo = currencyInfos.find((currencyInfo) => currencyInfo.currencyname.includes(s.toUpperCase()))
            const redirecTo = '/trade/spot/' + coinName
            if (currencyInfo)
                matchedItem.fullname = currencyInfo.fullname
            matchedItem.redirecTo = redirecTo
            updatedArr.push(matchedItem)
        }
    })
    return updatedArr
}
const getMarginMarkets = (state, getters, rootState, rootGetters) => {
    //when itype will be equal to 0
    // symbol should be currencyName/yx
    const cryptoCurrencies = rootState.symbleinfos
    const currencyInfos = rootState.currencyinfos
    const dailyData = state.quotationDailyData ? state.quotationDailyData : []

    const updatedArr = []

    cryptoCurrencies.map(currency => {

        const matchedItem = dailyData.find((d) => d.ctid == currency.id && d.itype == 0 && currency.borrowmultiple > 0)
        if (matchedItem) {
            const symble = matchedItem.symble.split('/')
            const s = symble[0]
            const coinName = symble.join('_')
            const currencyInfo = currencyInfos.find((currencyInfo) => currencyInfo.currencyname.includes(s.toUpperCase()))
            const redirecTo = '/trade/spot/' + coinName
            if (currencyInfo)
                matchedItem.fullname = currencyInfo.fullname
            matchedItem.redirecTo = redirecTo
            matchedItem.borrowmultiple = currency.borrowmultiple
            updatedArr.push(matchedItem)
        }
    })
    return updatedArr
}
const getFutureMarkets = (state, getters, rootState, rootGetters) => {
    //when itype will be equal to 0
    // symbol should be currencyName/yx
    const cryptoCurrencies = rootState.symbleinfos
    const currencyInfos = rootState.currencyinfos
    const dailyData = state.quotationDailyData ? state.quotationDailyData : []

    const updatedArr = []

    cryptoCurrencies.map(currency => {

        const matchedItem = dailyData.find((d) => d.ctid == currency.id && d.itype == 1)
        if (matchedItem) {
            const symble = matchedItem.symble.split('/')
            const s = symble[0]
            const coinName = symble.join('_')
            const currencyInfo = currencyInfos.find((currencyInfo) => currencyInfo.currencyname.includes(s.toUpperCase()))
            const redirecTo = '/trade/spot/' + coinName
            if (currencyInfo)
                matchedItem.fullname = currencyInfo.fullname
            matchedItem.redirecTo = redirecTo
            updatedArr.push(matchedItem)
        }
    })
    return updatedArr
}

// getMarketByType({ state, getters, rootState, rootGetters }, 'spot')
const getCurrencySpotMarket = (state, getters, rootState, rootGetters) => {
    const market = getMarketByType({ state, getters, rootState, rootGetters }, 'spot')
    state.spotMarket = market
    //type will be 0
    const coinid = market.symble ? market.symble.replace('/', '_') : '';

    return {
        ...state.spotMarket,
        redirecTo: '/deal/' + coinid
    }
}

const getCurrencyMarginMarket = (state, getters, rootState, rootGetters) => {
    //type will be 0
    const market = getMarketByType({ state, getters, rootState, rootGetters }, 'margin', true)
    const coinid = market.symble ? market.symble.replace('/', '_') : '';
    return {
        ...market,
        redirecTo: '/margin/' + coinid
    }
}

const getCurrencyFutureMarket = (state, getters, rootState, rootGetters) => {
    //type will be 1
    const market = getMarketByType({ state, getters, rootState, rootGetters }, 'future')//type will be 0
    const coinid = market.symble ? market.symble.replace('/', '_') : ''

    return {
        ...market,
        redirecTo: '/contract/' + coinid
    }
}

const getCurrencyTradeData = (state, getters, rootState, rootGetters) => {
    const spot = getters.getCurrencySpotMarket
    const future = getters.getCurrencyFutureMarket
    const margin = getters.getCurrencyMarginMarket
    const array = []
    if (spot) {
        array.push(spot)
    }
    if (margin) {
        array.push(margin)
    }
    if (future) {
        array.push(future)
    }
    return array
}


function getMarketByType({ state, getters, rootState, rootGetters }, marketType = 'future', isMargin = false) {
    //1:future, 0:margin, spot
    let m_type = 0
    let m_title = ''
    if (marketType == 'future') {
        m_type = 1
        m_title = 'perpetual'
    } else if (marketType == 'spot') {
        m_type = 0
        m_title = 'spot'
    } else {
        m_type = 0
        m_title = 'margin'
    }
    const cryptoCurrencies = rootState.symbleinfos
    const currentCurrency = state.currentCurrency
    const dailyData = state.quotationDailyData ? state.quotationDailyData : []
    let updatedObject = ''

    cryptoCurrencies.map(currency => {
        const matchedItem = dailyData.find((daily) => {
            if (daily.ctid == currency.id && daily.itype == m_type && daily.symble.includes(currentCurrency)) {
                let object = daily
                let title = ''

                if (isMargin && currency.borrowmultiple > 0) {//margin market

                    title = `
          <img height="24px"  class="mr-2" src="${daily.logo}" />
          <span class="text-black text-uppercase">${daily.symble}</span>
          <span class="margin-trade-txt">${currency.borrowmultiple}X</span>
          `
                } else if (!isMargin) { //spot or future market


                    let symbleHtml = ''
                    if (marketType == 'future') {
                        symbleHtml = `<span class="text-black text-uppercase">${currentCurrency}</span> <span class="perpetual-txt">Perpetual</span>`
                    } else {
                        symbleHtml = `<span class="text-black text-uppercase">${daily.symble}</span> `
                    }

                    title = `
                <img height="24px"  class="mr-2" src="${daily.logo}" />
                  ${symbleHtml}`
                }

                object.markettitle = title
                return object
            }
        })

        if (matchedItem) {
            updatedObject = matchedItem
        }
    })
    return updatedObject
}

const getFavoriteList = (state, getters, rootState, rootGetters) => {
    return state.favoriteList
}
const currentMarketType = (state, getters, rootState, rootGetters) => {
    return state.currentMarketType
}
const lastBuyRate = (state) => {
    return state.lastBuyRate
}
const lastSellRate = (state) => {
    return state.lastSellRate
}
const getmarketSentimentData=(state)=>{
    return state.marketSentiment
}



export default {
    getCurrencyDetail,
    getCurrencyGraphData,
    getQuotationDailyData,
    getSpotMarkets,
    getCurrencySpotMarket,
    getCurrencyMarginMarket,
    getCurrencyFutureMarket,
    getCurrencyTradeData,
    getmarketSentimentData,
    getFavoriteList,
    getCurrentMarketPrice,
    currentMarketType,
    getFutureMarkets,
    getMarginMarkets,
    getContractAllMarketList,
    getQuotationDetails,
    lastBuyRate,
    lastSellRate
}
