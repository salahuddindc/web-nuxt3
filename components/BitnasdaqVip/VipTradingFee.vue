<template>
    <div class="vip-trading-fee mt-6">
        <div class="main-content">
            <p class="main-heading mb-3 text-black fw-5">{{ $t('vip_pro.vip_trading_fee') }}</p>
            <a-row :gutter="[16,16]" class="mt-6">
                <a-col :xs="24" :sm="12" :lg="12" :xl="12">
                    <a-card class="left-fee-card">
                        <a-row :gutter="16">
                            <a-col :xs="10" :lg="11">
                                <p class="main-desc text-black spot-margin-fee">{{ $t('vip_pro.vip_mspot') }}</p>
                                <a-row :gutter="16">
                                    <a-col :lg="12">
                                        <p class="main-desc mb-2 text-black">{{ $t('vip_pro.vip_maker') }}</p>
                                        <p class="fee-text mb-0 text-black fw-5">{{ makerFee }}%
                                            <span class="fw-4 ml-2"> {{ spotCrossMaker }}%</span>
                                        </p>
                                    </a-col>
                                    <a-col :lg="12">
                                        <p class="main-desc mb-2 text-black">{{ $t('vip_pro.vip_taker') }}</p>
                                        <p class="fee-text mb-0 text-black fw-5">
                                            {{ takerFee }}%
                                            <span class="fw-4 ml-2">{{ spotCrossTaker }}%</span>
                                        </p>
                                    </a-col>
                                </a-row>
                            </a-col>
                            <a-col :xs="2" :lg="1" align="center" class="px-0">
                                <a-divider type="vertical" class="vip-trading-divider" />
                            </a-col>
                            <a-col :xs="12" :lg="12">
                                <a-row>
                                    <a-col :xs="24" :sm="16" :lg="16">
                                        <p class="main-desc text-black spot-margin-fee">
                                            {{ $t('vip_pro.vip_future_fee') }}</p>

                                    </a-col>
                                    <a-col :xs="24" :sm="8" :lg="8">
                                        <AppSelect ref="WaddressWaddressWaddress" @update-currency="onSymbolChange"
                                            :type="0" market="Select" :order="symbolDetails" />
                                    </a-col>
                                </a-row>

                                <a-row :gutter="16">
                                    <a-col :lg="12">
                                        <p class="main-desc mb-2 text-black">{{ $t('vip_pro.vip_maker') }}</p>
                                        <p class="fee-text mb-0 text-black fw-5">{{ futureMaker }} <span
                                                class="fw-4 ml-2">{{ futureCrossMaker }}</span></p>
                                    </a-col>
                                    <a-col :lg="12">
                                        <p class="main-desc mb-2 text-black">{{ $t('vip_pro.vip_taker') }}</p>
                                        <p class="fee-text mb-0 text-black fw-5">{{ futureTaker }} <span
                                                class="fw-4 ml-2">{{ futureCrossTaker }}</span></p>
                                    </a-col>
                                </a-row>
                            </a-col>
                        </a-row>
                    </a-card>

                </a-col>
                <a-col :xs="24" :sm="12" :lg="12" :xl="12">
                    <a-card class="right-fee-card">
                        <a-row :gutter="[16,24]">
                            <a-col :xs="10" :sm="8" :lg="8" :xl="7" align="center">
                                <img :src="vipimage" class="mb-3" height="78px" />
                                <p class="main-desc text-black mb-1 fw-5 right-col-first-title">{{
                                    global_string_split($userinfo.email) }}</p>
                                <p class="sub-main-desc mb-0">{{ $t('vipprogram.vip3') }}</p>
                            </a-col>
                            <a-col :xs="2" :sm="2" :lg="2" :xl="2">
                                <a-divider type="vertical" class="vip-trading-divider mr-0 ml-3" />
                            </a-col>
                            <a-col :xs="12" :sm="14" :lg="14" :xl="15">
                                <div class="vip-status px-0">
                                    <a-row :gutter="16">
                                        <!-- description.title4 -->
                                        <a-col :xs="8" :lg="8" :xl="8" class="pr-0">
                                            <p class="recharge-fee mb-0">{{ $t('tabkeys.tab2') }}</p>
                                        </a-col>
                                        <a-col :xs="16" :lg="16" :xl="16" align="end" class="pl-0">
                                            <p class="text-black fw-5 mb-0 text-truncate">{{ vipInfo.rechargeamount
                                                }}/{{
                                                    vipInfo.nexleverrechargeamount }} USDT</p>
                                        </a-col>
                                        <a-col :xs="24" :lg="24"> <a-progress
                                                :percent="percentage(vipInfo.rechargeamount, vipInfo.nexleverrechargeamount)"
                                                class="status-progress mt-0" /></a-col>
                                    </a-row>
                                    <a-row :gutter="16">
                                        <a-col :xs="8" :lg="8" :xl="10" class="pr-0">
                                            <p class="recharge-fee mb-0">{{ $t('spot_margin_transaction') }}</p>
                                        </a-col>
                                        <a-col :xs="16" :lg="16" :xl="14" align="end" class="pl-0">
                                            <p class="text-black fw-5 mb-0 text-truncate">{{ vipInfo.spotamount }}/{{
                                                vipInfo.nexleverspotamount }} USDT</p>
                                        </a-col>
                                        <a-col :xs="24" :lg="24"> <a-progress
                                                :percent="percentage(vipInfo.spotamount, vipInfo.nexleverspotamount)"
                                                class="status-progress mt-0" /></a-col>
                                    </a-row>
                                    <a-row :gutter="16">
                                        <a-col :xs="8" :lg="6" :xl="8" class="pr-0">
                                            <p class="recharge-fee mb-0">{{ $t('rewardhub.rew17') }}</p>
                                        </a-col>
                                        <a-col :xs="16" :lg="18" :xl="16" align="end" class="pl-0">
                                            <p class="text-black fw-5 mb-0 text-truncate">{{ vipInfo.futrueamount }}/{{
                                                vipInfo.nexleverfutureamount }} USDT</p>
                                        </a-col>
                                        <a-col :xs="24" :lg="24"> <a-progress
                                                :percent="percentage(vipInfo.futrueamount, vipInfo.nexleverfutureamount)"
                                                class="status-progress mt-0 mb-0" /></a-col>
                                    </a-row>
                                </div>
                            </a-col>
                        </a-row>
                    </a-card>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script> 

 
export default {
     
    props: {
        vipInfo: Object,
        default: () => { }
    },
    data() {
        return {
            selectedIndex: 0,

        }
    },
    computed: {
        prevVipLevel() {
            if (this.vipInfo?.viplevel == 0) {
                return 0;
            }
            return 1;
        },
        vipimage() {
            return "/images/vipv-" + this.vipInfo?.viplevel + ".svg";
        },

        makerFee() {
            const buyfee = this.symbleinfo?.buyfee
            let fee = cutZero(((buyfee * 100) * (10 - this.vipInfo.viplevel) * 0.1 || 0).toFixed(4))
            console.log('feefeefee', fee);

            return fee
        },
        takerFee() {
            let fee = cutZero(((this.symbleinfo?.takerbuyfee * 100) * (10 - this.vipInfo.viplevel) * 0.1 || 0).toFixed(4))
            return fee || 0
        },

        spotCrossMaker() {
            const level = this.vipInfo.viplevel || 0
            let fee = 0
            const makerFee = this.symbleinfo.buyfee || 0
            if (level == 0) {
                fee = cutZero(((10 - level) * 10 * makerFee).toFixed(4))
            } else {
                fee = cutZero(((10 - (level - 1)) * 10 * makerFee).toFixed(4))
            }
            return fee || 0
        },
        spotCrossTaker() {
            const level = this.vipInfo.viplevel || 0
            let fee = 0
            const takerFee = this.symbleinfo.takerbuyfee || 0
            if (level == 0) {
                fee = cutZero(((10 - level) * 10 * takerFee).toFixed(4))
            } else {
                fee = cutZero(((10 - (level - 1)) * 10 * takerFee).toFixed(4))
            }
            return fee || 0
        },
        futureMaker() {
            const symbol = getSymbol('fcurrencyname', this.symbleinfo.fcurrencyname, 1)
            const buyfee = symbol.buyfee
            if (!buyfee) {
                return 'N/A'
            }
            let fee = cutZero((((buyfee * 100) * (10 - this.vipInfo.viplevel) * 0.1) || 0).toFixed(4))
            return fee + '%'
        },

        futureTaker() {
            const symbol = getSymbol('fcurrencyname', this.symbleinfo.fcurrencyname, 1)
            const takerbuyfee = symbol.takerbuyfee
            if (!takerbuyfee) {
                return 'N/A'
            }
            let fee = cutZero((((takerbuyfee * 100) * (10 - this.vipInfo.viplevel) * 0.1 )|| 0).toFixed(4))
            return fee + '%'
        },

        futureCrossMaker() {
            const symbol = getSymbol('fcurrencyname', this.symbleinfo.fcurrencyname, 1)
            const makerFee = symbol.buyfee
            if (!makerFee) {
                return 'N/A'
            }
            const level = this.vipInfo.viplevel || 0
            let fee = 0
            if (level == 0) {
                fee = cutZero(((10 - level) * 10 * makerFee).toFixed(4))
            } else {
                fee = cutZero(((10 - (level - 1)) * 10 * makerFee).toFixed(4))
            }
            return fee + '%'
        },
        futureCrossTaker() {
            const symbol = getSymbol('fcurrencyname', this.symbleinfo.fcurrencyname, 1)
            const takerbuyfee = symbol.takerbuyfee
            if (!takerbuyfee) {
                return 'N/A'
            }
            const level = this.vipInfo.viplevel || 0
            let fee = 0
            if (level == 0) {
                fee = cutZero(((10 - level) * 10 * takerbuyfee).toFixed(4))
            } else {
                fee = cutZero(((10 - (level - 1)) * 10 * takerbuyfee).toFixed(4))
            }
            return fee + '%'
        },


        symbolDetails() {
            return this.$store.state.symbleinfos.filter((symble) => symble.itype == 0).map((item) => {
                return {
                    ...item,
                    id: item.id,
                    value: item.descriptions.split('/')[0],
                    type: 'currencyid',
                    icon: item.icon
                }
            })
        },
        symbleinfo() {
            return this.symbolDetails[this.selectedIndex] || {}
        }
    },
    methods: {
        percentage(amount, nextAmount) {
            return parseInt((amount / (nextAmount + amount) * 100))
        },
        onSymbolChange(index) {
            this.selectedIndex = index
        },
    },
}
</script>

<style></style>
