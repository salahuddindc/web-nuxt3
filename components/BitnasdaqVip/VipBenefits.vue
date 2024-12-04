<template>
    <div class="vip-benefits">
        <div class="main-content">
            <p class="main-heading mb-2 text-black fw-5 mt-6">{{$t('vip_pro.benifits')}}</p>
            <p class="main-desc text-black fw-4 mb-0">{{$t('vip_pro.bitnasdaq_vip')}}</p>
            <a-row :gutter="45" class="w-100" type="flex">
                <a-col :xs="12" :sm="6" :lg="6" v-for="(list, key) in getBenefitsList" :key="key">
                    <img :src="list.img" class="mt-6"/>
                    <p class="benefit-title text-black fw-5 mb-2">{{ list.title }}</p>
                    <p class="main-desc text-black fw-4">{{ list.desc }}</p>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            getBenefitsList: [
                {
                    img: '/images/vip-benefit1.svg',
                    title: this.$t('activity.vip_7'),
                    desc: this.$t('whopping_reduction_on_trading_fee')
                },
                {
                    img: '/images/vip-benefit2.svg',
                    title: this.$t('activity.vip_accountmanager'),
                    desc: this.$t('premier_gift_and_offers')
                },
                {
                    img: '/images/vip-benefit3.svg',
                    title: this.$t('trade_more_win_more'),
                    desc: this.$t('bigger_your_trading_volume')
                },
                {
                    img: '/images/vip-benefit4.svg',
                    title: this.$t('dedicated_support_for_vip'),
                    desc: this.$t('with_the_higher_vip_level_enjoy_exclusive')
                }
            ],


        } },


}
</script>

<style></style>
