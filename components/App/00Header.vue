<template>
    <div>


        <NuxtLink href="/">
            home App00Header
        </NuxtLink>
        <NuxtLink href="/about">
            about App00Header
        </NuxtLink>

        <button @click="checkPubsub">
            check pubsub
        </button>
        <button @click="subscribeWithSocket">
            socket subscription
        </button>

    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        checkPubsub() {
            this.$pubsub.publish('checkPubsub', { id: 1, name: 'Salah-ud-Din' })
        },
        subscribeWithSocket() {

            console.log("this>socket", this.$socket);
            
            let substr = "market.1.tickers"; 
            this.$socket.invoke({ sub: substr, type: this.$socket.type.quotation_daily_getall, })

            substr = `market.btcusdt.kline.1min`
            this.$socket.invoke({ sub: substr, type: this.$socket.type.quotation_kline_get })

            substr = "indexprice.btcyx.detail";
            this.$socket.invoke({ sub: substr, type: this.$socket.type.usercontract_contract_getindexprice, })

            this.$socket.invoke({ "type": "game", "sub": "game.0.detal" })
            this.$socket.invoke({ "type": "gameplayer", "sub": `game.player.321211221.detal` })
            this.$socket.invoke({ "type": "gameroom", "sub": `game.room.001.detal` })



        }
    },
    mounted () {
        
        fiatpaymenttypeget();
    },


}
</script>

<style lang="scss" scoped>
a {
    font-size: 22px;
}
</style>