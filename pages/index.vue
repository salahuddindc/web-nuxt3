<template>
  <div>
    home


    <div style="border-bottom: 2px solid green; padding: 16px;" v-for="(socketDataFor, index) in socketDataForHtml"
      :key="index">

      <h4>
        <b>{{ socketDataFor.topic }}</b>
      </h4>
      {{ socketDataFor.data }}
    </div>


    baseUrl
    <p> {{ $baseUrl }}</p>
    $userassets
    <p> {{ $userassets }}</p>
    usersettings
    <p> {{ $usersettings }}</p>
    userinfo
    <p> {{ $userinfo }}</p>
    loggedIn
    <p> {{ loggedIn }}</p>
    global_get_fee
    <p> {{ global_get_fee_contract({ transactionamount: 3, fee: 5 }) }}</p>
    global_get_fee
    <p> {{ global_get_fee({ transactionamount: 3, fee: 5, ordertype: 6, direction: 1, tradeavgprice: 4 }) }}</p>
    cutZero
    <p> {{ cutZero(444.000) }}</p>
    global_get_replace_dot
    <p> {{ global_get_replace_dot(123.444) }}</p>
    global_get_uid
    <p> {{ global_get_uid('4343434343434344') }}...</p>
    i18n
    <p v-html="$t('game.help_desc')"> </p>
    global_get_order_type
    <p>{{ global_get_order_type(2) }} </p>





  </div>
</template>

<script>
export default {
  data() {
    return {
      socketDataForHtml: [],
    }
  },
  methods: {
    async getSymbols() {

      const j = {}
      await this.$store.dispatch('setUserInputttt', j)
    },
    socketData() {
      //invoked from Header component
      this.$socket.receive(this.$socket.type.quotation_daily_getall, (e) => {
        console.log('eeeeeeeee', e);
        this.socketDataForHtml.push({ data: JSON.stringify(e.data), topic: e.topic })
      })

      this.$socket.receive(this.$socket.type.usercontract_contract_getindexprice, (e) => {
        console.log('eeeeeeeee', e);
        this.socketDataForHtml.push({ data: JSON.stringify(e.data), topic: e.topic })
      })

      this.$socket.receive(this.$socket.type.quotation_kline_get, (e) => {
        console.log('eeeeeeeee', e);
        this.socketDataForHtml.push({ data: JSON.stringify(e.data), topic: e.topic })
      })

      this.$socket.receive('game', (e) => {
        console.log('gamegame', e);
        this.socketDataForHtml.push({ data: JSON.stringify(e.data), topic: e.topic })
      })

      this.$socket.receive('game', (e) => {
        console.log('gameplayer', e);
        this.socketDataForHtml.push({ data: JSON.stringify(e.data), topic: e.topic })
      })

      this.$socket.receive('gameroom', (e) => {
        console.log('gameplayer', e);
        this.socketDataForHtml.push({ data: JSON.stringify(e.data), topic: e.topic })
      })

    }
  },
  mounted() {
    getdecimalsinfos()
    const app = useNuxtApp()

    console.log('apppp', app);


    // this.getSymbols()
    global_refresh_user_settings()
    global_refresh_user_assets()
    // getSymbolInfos()


    this.socketData()
  },

}
</script>

<style lang="scss" scoped></style>