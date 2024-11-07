import { gridProfitFees, gridProfitFeesRange } from "~/utils/helpers"


export default {

  getManualSettingValidationRules() {
    return {
      rules: {
        lower_price: [
          {
            required: true,
            message: 'Amount is required',
          },
          {
            validator: async (rule, value, callback) => {
              if (this.input.from === '') {
                callback(new Error('Amount is required!'))
              } else {
                if (parseFloat(this.input.from) < this.fminamount) {
                  callback(new Error(`Amount should be greater than ${this.fminamount}`))
                }
                else if (parseFloat(this.input.from) > this.fmaxamount) {
                  callback(new Error(`Amount should be less than ${this.fmaxamount}`))
                }
                else if (parseFloat(this.input.from) > this.canUseFrom) {
                  callback(new Error(`Amount is greater than {{ $t('deal.usable') }}`))
                }
                else {
                  callback()
                }

              }
            },
            trigger: 'blur',
          },
        ],
        upper_price: [
          {
            validator: async (rule, value, callback) => {
              if (this.input.to === '') {
                callback(new Error('Amount is required!'))
              } else {
                if (parseFloat(this.input.to) < this.tminamount) {
                  callback(new Error(`Amount should be greater than ${this.tminamount}`))
                }
                else if (parseFloat(this.input.to) > this.tmaxamount) {
                  callback(new Error(`Amount should be less than ${this.tmaxamount}`))
                }
                else {
                  callback()
                }

              }
            },
            trigger: 'blur',
          },
        ],
      },
    }
  },

  getStrategyInfo(state, getters, rootState, rootGetters) {
    const strategy = state.strategyInfo
    return strategy
  },


  getStrategyDiffRatio(state, getters, rootState, rootGetters) {

    const currentMarketPrice = rootGetters['market/getCurrentMarketPrice']

    const strategy = state.strategyInfo
    const percentage = gridProfitFees(strategy.maxprice, strategy.minprice, strategy.gridnum, currentMarketPrice)
    const diff_ratio = gridProfitFeesRange(percentage)

    return diff_ratio

  },

  strategyTradeOpened(state, getters, rootState, rootGetters) {
    return state.isStrategyTrade
  },

  horizentalStrategyFormHeight(state, getters, rootState, rootGetters) {
    return state.horizentalStrategyFormHeight
  },
  strategyTabPosition (state){
    return state.strategyTabPosition
  }
}
