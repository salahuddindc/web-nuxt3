<template>
    <div class="mt-xs-6 mt-sm-12">
        <div class="main-content">
            <div class="copy-trading px-10 ">
                <a-row :gutter="16" class="col-alignment trading-row">
                    <a-col :sm="24" :md="13" :lg="11" :xl="9" :xxl="10" class="first-col">
                        <h2 class="fw-6 mb-3 secondary-black lh-32">{{ $t('stratergybot.sb1') }}</h2>
                        <h6 class="lh-16 fw-4 secondary-gray mb-xs-3 mb-sm-7">{{ $t('stratergybot.strategize') }}</h6>
                        <div class="trades-price">
                            <div class="trade-box" v-for="(trade, key) in getTrades" :key="key">
                                <h4 class="mb-1 secondary-black lh-36 fw-6">{{ trade.price }}</h4>
                                <p class="lh-16 fw-4 mb-xs-3 mb-sm-7 secondary-gray">{{ trade.trade }}</p>
                            </div>
                        </div>
                        <a-row>
                            <a-col :xs="0" :sm="24">
                                <nuxt-link to="/trading-bot">
                                    <a-button class="primary-btn px-5">{{ $t('deal_new.dn45') }}</a-button>
                                </nuxt-link>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col :sm="24" :md="11" :lg="13" :xl="14" :xxl="13" class="slider-row px-xs-0 px-sm-2">
                        <template v-if="loading">
                            <AppLoading height="133px" backgroundColor="transparent" />
                        </template>
                        <ClientOnly v-else>
                            <!-- <carousel :loop="false" :speed="1500" :autoplay="false"
                                :perPageCustom="[[320, 1], [375, 1], [425, 1], [575, 1], [767, 2], [992, 2], [1100, 2], [1200, 2], [1440, 2]]"
                                :navigationEnabled="true" :scrollPerPage="true" :paginationEnabled="false">
                                <slide v-for="(product, index) in StrategyDataa" :key="index">

                                    <div class="py-sm-16 mx-xs-0 mx-sm-2">
                                        <nuxt-link :to="product.redirecTo">
                                            <TradingBotCard :list="product" :cardId="index" />
                                        </nuxt-link>
                                    </div>

                                </slide>
                            </carousel> -->
                        </ClientOnly>
                    </a-col>
                    <a-col :xs="24" :sm="0">
                        <nuxt-link to="/trading-bot">
                            <p class="mb-0 text-center pointer font-14 lh-18 fw-5">{{ $t('public.ph49')
                                }}
                                <RightOutlined class="arrow-icon ml-1" style="font-size:12px" />
                            </p>
                        </nuxt-link>
                    </a-col>
                </a-row>
            </div>
        </div>
    </div>
</template>

<script>
// import carousel from '@/plugins/carousel/Carousel';
// import slide from '@/plugins/carousel/Slide';
import moment from 'moment';
import 'moment-timezone';


export default {
    components: {
        // carousel, slide, 

    },
    data() {
        return {
            imgLoaded: false,
            loading: true,
            StrategyDataa: [],
            bg: {
                buy: "rgba(74,196,158,0.000089)",
                buydark: "rgba(74,196,158,0.45)",
                buyline: "rgba(74,196,158,0.85)",
                sell: "rgba(255,129,141,000089)",
                selldark: "rgba(255,129,141,0.0045)",
                sellline: "rgba(255,129,141,0.85)",
            },
            getTrades: [
                {
                    price: '50+',
                    trade: this.$t('copytrade.traders')
                },
                {
                    price: '10,000+',
                    trade: this.$t('copytrade.followers')
                },
                {
                    price: '$5,000,000+',
                    trade: this.$t('copytrade.aum_follower')
                }
            ]
        }
    },
    methods: {
        getSymble(s) {
            const symble = s.toLowerCase();
            //console.log('symb:', s);

            const obj = this.$store.state.symbleinfos.find((sinfo) => sinfo.descriptions.toLowerCase().includes(symble))
            //console.log('objJJ: ', obj)
            const des = obj.descriptions.split("/");
            return {
                from: des[0],
                to: des[1],
            };
        },


        getStrategies() {
            this.$store.dispatch('querytopstrategy_get', { pageIndex: 1, pageSize: 30, orderType: 1 }).then((data) => {
                if (data) {
                    this.loading = false
                    let StrategyDataa = data.data.pagedata;
                    StrategyDataa = StrategyDataa.map(item => {
                        const Symbol = this.$store.state.symbleinfos.find((symbol) => symbol.id == item.ctid)
                        if (Symbol) {
                            item.fcurrencyname = Symbol.fcurrencyname
                            let createTime = moment.tz(item.createtime, 'Etc/GMT').local();
                            let nowTime = moment();
                            var duration = moment.duration(nowTime.diff(createTime));
                            var days = Math.floor(duration.asDays());
                            var hours = duration.hours();
                            var minutes = duration.minutes();
                            item.running_time = `${days}D ${hours}H ${minutes}M`
                            item.copynum = item.copynum.toLocaleString()
                            item.incomerate = item.incomerate.toFixed(2)
                            item.profit = item.profit.toFixed(2)
                            item.tradenum = parseInt(item.tradenum)
                            item.borrowmultiple = Symbol.borrowmultiple > 0 && item.strategytype == 2 ? Symbol.borrowmultiple : false
                            item.symbolText = item.strategytype == 2 || item.strategytype == 1 ? Symbol.descriptions : Symbol.fcurrencyname
                            item.symbolImg = Symbol.icon
                            const coinid = (Symbol.fcurrencyname + '_' + Symbol.tcurrencyname).toLowerCase()
                            let redirecTo = '/deal-pro/' + coinid
                            if (item.strategytype == 1) {
                                redirecTo = '/deal-pro/' + coinid
                            } else if (item.strategytype == 2) {
                                redirecTo = '/margin-pro/' + coinid
                            }
                            else if (item.strategytype == 3) {
                                redirecTo = '/contract-pro/' + coinid
                            }

                            item.redirecTo = redirecTo + '?strategy-bot-id=' + item.id
                            return item;
                        }
                        return undefined;

                    }).filter(item => item != undefined)

                    this.StrategyDataa = StrategyDataa.reverse()


                }
            })

        },
        getChartData(obj) {
            const data = obj.datas || []
            return data.map((d) => {
                return {
                    value: d.income,
                    time: d.time
                }
            }).reverse()
        }
    },
    mounted() {
        this.getStrategies()
    }
}
</script>
