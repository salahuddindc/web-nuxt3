<template>
  <div class="calculator mt-12 mb-8">
    <div class="main-content">
      <AppFiatCalculator :allCoins="allCoins" :exchangeCurrencies="exchangeCurrencies" @update-coin="setSelectedPair" />
      <a-card :bordered="false" :bodyStyle="{ padding: '24px' }" class="mt-8">
           <h2 class="mb-2 secondary-black font-sm-28 font-xs-20 lh-md-47 lh-sm-35 lh-xs-28 fw-5 col-alignment"
          v-if="activeCoinFullName">
          <img :src="activeCoinIcon" height="40px" class="mr-4" v-if="activeCoinIcon" />
          {{ activeCoinFullName }} {{ $t('contract.price') }} <span
            class="font-lg-24 font-md-24 font-sm-16 lh-35 secondary-gray">({{ activeCoin
            }})</span>
        </h2>
        <h5 class="mb-5 fw-6 secondary-black" v-if="lastPrice">$ {{ lastPrice }} <span class="font-24 fw-5 ml-1"
            :class="percentage > 0 ? 'success-active' : 'red-active'">
            {{ percentage > 0 ? "+" + percentage : percentage }}%
          </span> </h5>
      <div id="Chart" class="currency-curve">
          <AppLoading height="450px" backgroundColor="white" iconSize="32px" v-if="fetchingGraphData" />
          <div v-else>
            <AppLineChart :data="chartData" elementId="market-detail-chart" width="100%" :x-data="xChartData"
              show-x-axis height="450px" :show-mark-linke="false" have-grid-options show-text-tip
              :toolTipOptions="{ text1: 'deal.time', text2: 'contract.price', symbol: 'USDT' }" :key="chartKey" />
          </div>
        </div> 
      </a-card>
      <PopularFiatConversions :activeCoin="activeCoin" :fullName="activeCoinFullName"
        :exchangeCurrencies="exchangeCurrencies" />
      <PopularCurrencyConversions :cryptoCurrencies="allCoins" />
      <a-card :bordered="false" :bodyStyle="{ padding: '24px' }" class="mt-8">
        <PublicFaqs :channelid="commonProblemsChannelId" :subtitle="channelSubtitle.calculatorFaqs"
          :calculatorFaqsOptions="calculatorFaqsOptions" :hasCalculatorFaqs="true" />
      </a-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { channelSubtitle, commonProblemsChannelId } from "~/utils/constants"
import PopularCurrencyConversions from './PopularCurrencyConversions.vue'
import PopularFiatConversions from './PopularFiatConversions.vue'

export default {
  components: {   PopularFiatConversions, PopularCurrencyConversions },
  data() {
    return {
      screenWidth: null,
      chartKey: 0,
      activeCoin: 'BTC',
      activeFiat: 'USD',
      selectedCurrency1: "usdt",
      channelSubtitle,
      commonProblemsChannelId,
      loading: false,
    }
  },
  computed: {
    ...mapGetters("market", ["getQuotationDailyData", "getCurrencyGraphData"]),
    ...mapGetters("general", ["fetchingGraphData", "fetchingGraphData"]),
    chartData: function () {
      return this.graphData.map((data) => {
        return {
          time: global_get_local_time(data.t).format("HH:mm"),
          value: data.c
        }
      })
    },
    lastPrice() {
      const lastObject =
        this.graphData.length > 0
          ? this.graphData[this.graphData.length - 1]
          : {};
      const c = lastObject.c;
      return c;
    },
    percentage() {
      const firstObject = this.graphData.length > 0 ? this.graphData[0] : {};
      const lastPrice = this.lastPrice;
      const firstPrice = firstObject.c;

      const ptg = ((lastPrice - firstPrice) / firstPrice) * 100;
      return ptg.toFixed(2);
    },

    xChartData: function () {
      return this.graphData.map((data) => global_get_local_time(data.t).format("HH:mm"))
    },
    yChartData: function () {
      return this.graphData.map((data) => data.c)
    },
    graphData() {
 
      const data = JSON.parse(JSON.stringify(this.getCurrencyGraphData));
      return data ? data.reverse() : [];
    },
    allCoins() {
      const cryptoCurr = this.$store.state.symbleinfos.filter((citem) => {
        return citem.itype == 0;
      })
      return cryptoCurr
    },
    activeCoinFullName() {
      const name = this.$store.state.currencyinfos.find(coin => coin.currencyname == this.activeCoin)
      return name?.fullname
    },
    exchangeCurrencies() {
      return this.$store.state.hex_client_exchange.infos
    },
    activeCoinIcon() {
      const coin = this.allCoins.find(coin => coin.fcurrencyname == this.activeCoin) || {} //activeCoin
      return coin.icon || ''
    },
    activeCoinRate() {
      const coin = this.getQuotationDailyData?.find(coin => coin.symble.split('/')[0] == this.activeCoin)
      return coin ? coin.c : ''
    },
    calculatorFaqsOptions() {
      return {
        coin: this.activeCoin,
        fiat: this.activeFiat
      }
    }
  },
  methods: {
    ...mapActions("market", ["fetchCurrencyGraphData", "fetchQuotationDailyData"]),

    setSelectedPair(coin, fiat) {

      this.activeCoin = coin
      this.activeFiat = fiat
      this.getGraphData()

    },
    async getGraphData(type = 0) {

      const graphData = {
        fName: this.activeCoin,
        tName: this.selectedCurrency1,
        type: type,
      };
      this.fetchCurrencyGraphData(graphData);

    },
  },
  created() {

    this.fetchQuotationDailyData({ pageIndex: 1, pageSize: 200 })

  },
  watch: {
    screenWidth(val) {
      this.chartKey++
    },
  },
  mounted() {
    const _self = this
    window.addEventListener("resize", () => {
      _self.screenWidth = window.innerWidth
    });
  }
}
</script>

<style lang="scss" scoped>
.currency-curve {
  width: 100% !important;
  height: 450px;
}
</style>