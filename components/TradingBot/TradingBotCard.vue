<template>
    <div class="trading-bot-card" :key="screenWidth">
        <a-card :bordered="false" class="st-card mb-xs-2 mb-sm-6" :bodyStyle="{ padding: '24px' }">
            <a-row :gutter="16">
                <a-col :lg="24">
                    <h6 class="fw-5 lh-19 mb-2 col-alignment "><img :src="list.symbolImg" height="16px"
                            class="rounded" /> <img :src="getCurrencyIcon(list)" height="16px" class="rounded usdt-img"
                            v-if="hasSCurrency" /> <span class="secondary-black"
                            :class="hasSCurrency ? 'ml-1' : 'ml-2'">{{
                                list.symbolText }}</span>
                        <a-tag class="bot-tag ml-3 font-12 fw-5" v-if="list.borrowmultiple">
                            {{ list.borrowmultiple }}x</a-tag>
                        <template v-else-if="list.strategytype == 3 || list.strategytype == 4">
                            <!-- for future -->
                            <span class="symbolTo ml-1 fw-5">
                                {{ $t('home_page.future_home') }} -
                                <span class="success-active" v-if="list.directiontype == 1">
                                    {{ $t('security.cc7') }}
                                </span>
                                <span class="red-active" v-else-if="list.directiontype == -1">
                                    {{ $t('security.cc8') }}
                                </span>
                                <a-tag class="bot-tag ml-2 font-12 fw-5">
                                    {{ list.multiple }}x</a-tag>
                            </span>
                        </template>
                    </h6>
                    <p class="lh-21 secondary-black mb-0 fw-5 col-alignment"> <img src="/images/person-icon.png" alt=""
                            class="pr-1" height="22">

                        <AppTooltip textClass="fw-5  secondary-black lh-21"
                            :title="`${list.copynum}  ${$t('user_copy')}  ${list.tradenum} ${$t('trade_times')}`"
                            :text="`${list.copynum}<span class='secondary-gray'>/${list.tradenum}</span>`"
                            placement="top">

                        </AppTooltip>
                    </p>
                </a-col>
            </a-row>
            <a-row :gutter="16" class="my-3 col-alignment">
                <a-col :xs="12" :lg="12">
                    <p class="lh-14 secondary-gray mb-0 fw-5">7-day profit</p>
                    <h4 class="lh-36 fw-6 mb-0" :class="list.incomerate < 0 ? 'red-active' : 'success-active'">
                        {{ list.incomerate }}%</h4>
                    <h6 class="fw-6 lh-14 secondary-black mb-0">${{ show_no(list.profit) }}</h6>
                </a-col>
                <a-col :xs="12" :lg="12">
                    <div>
                        <LineChart :data="getChartData(list)" :elementId="getElementId(cardId, list)"
                            :showTextTip="true" v-if="getChartData(list).length > 0" height="80px" :width="chartWidth"
                            :toolTipOptions="{ text1: 'deal.time', text2: 'contract.price', symbol: 'USDT' }" />
                    </div>
                </a-col>
            </a-row>
            <a-row :gutter="16" class=" mb-1">
                <a-col :xs="10" :lg="10">
                    <p class="secondary-gray lh-21 fw-5 mb-0">{{ $t('lastes_trade') }}</p>
                </a-col>
                <a-col :xs="14" :lg="14" align="end">
                    <p class="secondary-black lh-21 fw-5 mb-0">
                        {{ global_get_local_time(list.lasttradetime).format('YYYY-MM-DD HH:mm:ss') }}

                    </p>
                </a-col>

            </a-row>
            <a-row :gutter="16" class="mb-1">
                <a-col :xs="10" :lg="10">
                    <p class="secondary-gray lh-21 fw-5 mb-0">{{ $t('titles.title30') }}</p>
                </a-col>
                <a-col :xs="14" :lg="14" align="end">
                    <p class="secondary-black lh-21 fw-5 mb-0">{{ list.running_time }}</p>
                </a-col>

            </a-row>
            <a-row :gutter="16" class="mb-1">
                <a-col :sm="12">
                    <p class="secondary-gray lh-21 fw-5 mb-0">{{ $t('investment_amount') }}</p>
                </a-col>
                <a-col :sm="12" align="end">
                    <p class="secondary-black lh-21 fw-5 mb-0">{{ show_no(list.tamount) }} USDT</p>
                </a-col>

            </a-row>
            <a-row :gutter="16" class="">
                <a-col :xs="10" :lg="10">
                    <p class="secondary-gray lh-21 fw-5 mb-0">{{ $t('bot_creator') }}</p>
                </a-col>
                <a-col :xs="14" :lg="14" align="end">
                    <p class="secondary-black lh-21 fw-5 mb-0 text-truncate"><img :src="list.avatar" height="16px"
                            width="16px" class="rounded mr-1" />{{ list.nikename }}</p>
                </a-col>

            </a-row>
            <a-row class="pt-4">
                <a-col :xs="24" :lg="24" :xl="24" :xxl="24"><nuxt-link :to="list.redirecTo"><a-button
                            class="primary-btn" block>{{
                                $t('copy_strategy')
                            }}</a-button></nuxt-link></a-col>
            </a-row>

        </a-card>
    </div>
</template>

<script>
import AppTooltip from '@/components/App/AppTooltip.vue'
import LineChart from '@/components/App/LineChart.vue'
export default {
    components: {
        AppTooltip,
        LineChart,
    },
    props: {
        list: {
            type: Object,
            default: () => { }
        },
        cardId: {
            type: Number
        },
    },
    data() {
        return {
            hasSCurrency: true,
            screenWidth: window.innerWidth
        }
    },
    computed: {
        chartWidth() {
            if (this.screenWidth < 425) {
                return '120px';
            }
            else if (this.screenWidth < 600) {
                return '180px';
            } else if (this.screenWidth < 1210) {
                return '135px';
            } else if (this.screenWidth < 1441) {
                return '145px';
            } else{
                return '170px'
            }
        }
    },
    watch: {
        screenWidth(val) {
            console.log("width change", val)
            this.handleResize()
        }
    },
    methods: {
        getChartData(obj) {
            const data = obj.datas || []
            return data.map((d) => {
                return {
                    value: d.income,
                    time: this.global_get_local_time(d.time).format('YYYY-MM-DD HH:mm')
                }
            }).reverse()
        },
        handleResize() {
            this.screenWidth = window.innerWidth;
        },
        getElementId(cardId, list) {
            let type = 'future';
            if (list.strategytype == 1) {
                type = 'spot'
            } else if (list.strategytype == 2) {
                type = 'margin'
            }
            return `${type}-chart-${cardId + 1}`
        },
        getCurrencyIcon(item) {
            this.hasSCurrency = Boolean(item.symbolText.split('/')[1])
            return this.$store.state.currencyinfos.filter(coin => coin.currencyname == item.symbolText.split('/')[1])[0]?.icon;
        },
    },
    mounted() {
        window.addEventListener('resize', this.handleResize);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    },
}
</script>

<style></style>