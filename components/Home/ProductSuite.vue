<template>
  <div class="product-suite mt-xs-6 mt-sm-12">
    <div class="main-content">
        <h2 class="mb-3 lh-xs-28 lh-sm-48 secondary-black fw-6 text-center">{{$t('copytrade.product_suit')}}</h2>
        <h6 class="fw-4 mb-xs-6 lh-16 text-center secondary-gray">{{$t('copytrade.product_suit_note')}}</h6>
        <a-row :gutter="24" v-if="items">
            <a-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6" v-for="(item,key) in items" :key="key" class="second-col">

                <a-card class="product-card pointer" @click="redirect(item)" :bordered="false">
                    <nuxtImg :src="item.img" class="mb-5" width="82px" height="82px" loading="lazy"/>
                    <h4 class="fw-5 secondary-black lh-24 mb-xs-3 mb-sm-4">{{ item.title }}</h4>
                    <h6 class="fw-4 secondary-gray mb-0 lh-24">{{ item.desc }}</h6>
                </a-card>

            </a-col>
        </a-row>
    </div>
  </div>
</template>

<script>
import { btcCtid } from '~/plugins/constants'
import crypto from "@/plugins/axios/crypto"
export default {
data() {
    return {
        items: [
            {
                id:1,
                img: '/images/product-suite1.svg',
                title: this.$t('lv4form.lvf1'),
                link: '/p2p/buy-and-sell',
                desc: this.$t('bitapp.bta1')
            },
            {
                id:2,
                img: '/images/product-suite2.svg',
                title: this.$t('bitapp.spot_and_future'),
                link: `/contract-pro/btc_yx`,
                desc: this.$t('bitapp.bta2')
            },
            {
                id:3,
                img: '/images/product-suite3.svg',
                title: this.$t('demo_account'),
                link:  '',
                desc: this.$t('bitapp.bta8')
            },
            {
                id:4,
                img: '/images/product-suite4.svg',
                title: this.$t('stratergybot.sb1'),
                link: '/trading-bot',
                desc: this.$t('bitapp.bta4')
            }
        ]
    }
},
methods:{
    redirect(product){
        if(product.id==3){
            if (this.$userinfo) {
                var loginkey=crypto.md5String(this.$userinfo.uid+this.$userinfo.secretkey);
                const urlToRedirect="https://test.bitnasdaq.com/deal/btc_usdt?userid="+this.$userinfo.uid+"&loginkey="+loginkey+""
                window.open(urlToRedirect, '_blank');
            } else {
                this.$router.push("/login?returnurl=" + this.$route.path);
            }
        }
        else{
            this.$router.push(product.link);
        }
    }
}
}
</script>

<style>

</style>
