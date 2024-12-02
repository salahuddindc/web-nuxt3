<template>
    <!-- Table is being moved here -->
    <div>
        <a-row :gutter="16" class="strategy-bot-filters px-6">
            <a-col :sm="19" :lg="16" :xl="20">
                <a-row :gutter="[16,8]">

                    <a-col :xs="24" :sm="7" :xl="4">
                        <hex-select ref="symbol" :showSearch="true" :type="$i18n.t('patch.Type')"
                            :order="filter.symbolTypes" v-if="filter.symbolTypes.length > 0" market="firstOneSelect"
                            @searchData="searchData" @clearCurrentState="clearCurrentState" />

                    </a-col>

                    <a-col :xs="24" :sm="8" :xl="5" :xxl="4">
                        <hex-select ref="daytype" :label="$i18n.t('patch.Type')" :type="$i18n.t('patch.Type')"
                            :order="filter.dayTypes" market="firstOneSelect" @searchData="searchData"
                            @clearCurrentState="clearCurrentState" />

                    </a-col>
                    <a-col :xs="24" :sm="6" :xl="4">
                        <hex-select ref="ratetype" :label="$i18n.t('patch.Type')" :type="$i18n.t('patch.Type')"
                            :order="filter.rateTypes" market="firstOneSelect" @searchData="searchData"
                            @clearCurrentState="clearCurrentState" />

                    </a-col>

                    <a-col :xs="24" :sm="3" :xl="2" :xxl="2">
                        <span @mouseover="hoverKey = 2" @mouseleave="hoverKey = -1">
                            <a-button block class="outline-btn fw-5 px-0" @click="resetSelect"> <a-icon type="reload" />
                                <!-- {{$t('deal_new.dn34')}} --></a-button>
                        </span>
                    </a-col>

                </a-row>
            </a-col>
            <a-col :sm="5" :lg="4" align="end" class="">
                <hex-select ref="ordertype" :label="$i18n.t('patch.Type')" :type="$i18n.t('patch.Type')"
                    :order="filter.orderTypes" v-if="filter.orderTypes.length > 0" market="firstOneSelect"
                    @searchData="searchData" @clearCurrentState="clearCurrentState" />

            </a-col>
        </a-row>
        <AppLoading v-if="loadingData" height="70vh" />
        <a-row :gutter="[30,10]" type="flex" class="strategy-cards px-6" v-else>

            <a-col :xs="24" :sm="12" :lg="8" :xl="6" v-for="(list, key) in strategyBotData" :key="key">
                <nuxt-link :to="list.redirecTo">
                    <TradingBotCard :list="list" :cardId="key"/>
                </nuxt-link>
            </a-col>

        </a-row>
        <a-row>
            <a-col :lg="24" align="center">
                <a-button class="refresh-btn mt-2" @click="refreshData"><img src="/images/synchronize.svg" class="mr-2"
                        height="22px" />{{ $t('confirm.con13')
                    }}</a-button>
            </a-col>
        </a-row>


    </div>
    <!-- Table is ended above  -->
</template>
<script>
import moment from 'moment';
import AppTooltip from '@/components/App/AppTooltip.vue'


import select from "@/components/security/deal_select";
import AppLoading from '@/components/AppLoading.vue';
import TradingBotCard from './TradingBotCard.vue';

export default {
    name: 'StrategyBotTable',
    components: {
        "hex-select": select,
        AppTooltip,
        AppLoading,
        VNodes: {
            functional: true,
            render: (h, ctx) => ctx.props.vnodes,
        }, 
        TradingBotCard
    },
    props: {
        strategyType: {
            type: Number,
            default: 1 //1:spot, 2:margin, 3:future
        }
    },
    computed: {

        api() {
            return {
                dayType: this.filter.dayTypes[this.filter.dayType].id,
                rateType: this.filter.rateTypes[this.filter.rateType].id,
                orderType: this.filter.orderTypes[this.filter.orderType-1].id,
                pageSize: this.page.pagesize,
                pageIndex: this.page.pageindex,
                strategyType: this.strategyType,
                ctid: this.filter.ctid
            }

        },
    },
    data() {
        return {
            hasSCurrency: true,
            hoverKey: -1,
            //FOR SYMBOLS SELECT OPEN SEARCH AND CLOSE
            searchValue: '',
            open: false,
            loadingData: false,
            strategyBotData: [],
            daytypetext: "daytype",
            ratetypetext: 'ratetype',
            ordertypeext: 'ordertype',
            strategyBotColumns: [
                {
                    title: this.$t('titles.title1'),
                    dataIndex: 'rank',
                    scopedSlots: { customRender: 'rank' },
                    width: 100
                },
                {
                    title: this.$t('titles.title2'),
                    dataIndex: 'contract',
                    scopedSlots: { customRender: 'contract' },
                    width: 120

                },
                {
                    title: 'P&L',
                    dataIndex: 'incomerate',
                    scopedSlots: { customRender: 'pl' },
                    width: 100
                },
                {
                    title: 'P&L (USD)',
                    dataIndex: 'profit',
                    scopedSlots: { customRender: 'plusd' },
                    width: 100
                },
                {
                    title: this.$t('titles.title3'),
                    dataIndex: 'running_time',
                    width: 120
                },
                {
                    title: this.$t('titles.title4'),
                    dataIndex: 'copynum',
                    width: 100
                },
                {
                    title: this.$t('titles.title5'),
                    dataIndex: 'tradenum',
                    width: 100
                },
                {
                    title: this.$t('titles.title6'),
                    dataIndex: 'action',
                    scopedSlots: { customRender: 'action' },
                    align: 'end',
                    width: 120
                },
            ],
            //HERE TYPE MEANS INDEX I.E DAYTYPES IS ARRAY FOR SELECT OPTIONS AND DAYTYPE WITHOUT S IS INDEX SELECTED SELECT OPTION
            filter: {
                dayTypes: [{ id: -1, value: this.$t('texts.txt2'), type: "daytype" }, { id: 0, value: this.$t('texts.txt3'), type: "daytype", }, { id: 1, value: this.$t('texts.txt4'), type: "daytype" }, { id: 2, value: this.$t('texts.txt5'), type: "daytype" }],
                dayType: 0,
                rateTypes: [{ id: 0, value: this.$t('texts.txt6'), type: "ratetype" }, { id: 1, value: 'P&L-0-5%', type: "ratetype" }, { id: 2, value: 'P&L-5-10%', type: "ratetype" }, { id: 3, value: 'P&L-10-20%', type: "ratetype" }, { id: 4, value: 'P&L-20-50%', type: "ratetype" }, { id: 5, value: 'P&L-50-70%', type: "ratetype" }, { id: 6, value: 'P&L-70-100%', type: "ratetype" }, { id: 7, value: 'P&L-100%', type: "ratetype" }],
                rateType: 0,
                orderTypes: [{ id: 1, value: this.$t('texts.txt7'), type: "ordertype" }, { id: 2, value: this.$t('texts.txt8'), type: "ordertype" }, { id: 3, value: this.$t('texts.txt9'), type: "ordertype" }, { id: 4, value: this.$t('texts.txt10'), type: "ordertype" }],
                orderType: 1,
                ctid: 0,
                symbolTypes: [],

            },
            page: {
                pageindex: 1,
                current: 1,
                pagesize: 8,
                total: 0,
                hasnextpage: true
            },
            bg: {
                buy: "rgba(74,196,158,0.000089)",
                buydark: "rgba(74,196,158,0.45)",
                buyline: "rgba(74,196,158,0.85)",
                sell: "rgba(255,129,141,000089)",
                selldark: "rgba(255,129,141,0.0045)",
                sellline: "rgba(255,129,141,0.85)",
            },
        }
    },
    emits: ['onBotReceived'],
    methods: {
        getCurrencyIcon(item) {
            this.hasSCurrency = Boolean(item.symbolText.split('/')[1])
            console.log("this.hasSC", this.hasSCurrency)
            return this.$store.state.currencyinfos.filter(coin => coin.currencyname == item.symbolText.split('/')[1])[0]?.icon;
        },
        //RESETTING ALL SEARCH TO 0 INDEX WILL BE REFLECTED IN COMPUTED AS API
        resetSelect() {
            this.filter.dayType = 0
            this.filter.rateType = 0
            this.filter.orderType = 1
            this.filter.ctid = 0
            this.getData()
        },
        searchData(val) {
            //用于存子组件传过来数据
            if (val.type === 'daytype') {
                this.filter.dayType = val.id
            }
            if (val.type === 'ratetype') {
                this.filter.rateType = val.id
            }
            if (val.type === 'ordertype') {
                this.filter.orderType = val.id
            }
            if (val.type === 'symbol') {
                this.filter.ctid = val.id
            }
            //   this.searchParam[val.type] = val;
            this.getData()
        },

        clearCurrentState(id) {
            this.searchParam[id] = {};
        },
        // Search Select Functions Start
        //FILTER OUT WITH RESPECT TO VALUE IN INPUT OF SELECT
        // filterSelf(str) {
        //     const _self = this;
        //     if (_self.searchValue !== '') {
        //         return (str.indexOf(_self.searchValue.toLowerCase()) !== -1)
        //     }
        //     return true
        // },
        //FOR OPENING AND CLOSING OF SELECT INNER DIV
        setOpen(bool) {
            if (this.open == bool) {
                return
            }
            if (!bool) {
                setTimeout(() => {
                    this.open = bool
                    this.searchValue = '';
                }, 100);
            }
            else {
                this.open = bool;
            }
        },
        //PUTTING FOCUS TO INPUT INSIDE THE SELECT FOR SEARCHING
        onOpen() {
            this.open = true
            if (this.open == true) {
                setTimeout(() => {
                    this.$refs.symbolSearch?.focus()
                }, 100);
            }
        },
        // SYMBOLS SEARCH FUNCTION ENDED

        setSymbol() {
            //GETTING SYMBOLS BASED ON STRATEGY 0 FOR SPOT AND MARGIN AND 1 FOR FUTURE SYMBOLS
            this.filter.symbolTypes = this.$store.state.symbleinfos.map(item => {
                item.value = item.descriptions
                item.type = 'symbol'
                return item;

            }).filter((item) => {
                if (this.strategyType == 1 || this.strategyType == 2) {
                    return item.itype === 0
                }
                else {
                    return item.itype == 1
                }

            });
            //ADDING ALL SYMBOL TO SYMBOLS AT 0 INDEX
            this.filter.symbolTypes.unshift({ value: this.$t('all_symbols'), id: 0, type: 'symbol' });
            console.log(this.filter.symbolTypes)
        },
        refreshData() {
            if (this.page.hasnextpage) {
                this.page.pageindex++
            } else {
                this.page.pageindex = 1
            }

            this.handleChange(this.page.pageindex)
        },
        handleChange(val) {
            this.loading = true;
            this.page.pageindex = val
            this.getData()
        },

        async getData() {
            this.loadingData = true
            await this.$store.dispatch('querytopstrategy_get', this.api).then((data) => {

                if (data) {
                    this.$emit('onBotReceived')

                    this.page.total = data.data.totalitemcount
                    this.page.current = data.data.currentpageindex
                    this.page.hasnextpage = data.data.hasnextpage
                    this.strategyBotData = data.data.pagedata.map((item, index) => {
                        //FIND SYMBOL FROM STATE AND SETTING ICON AND TEXT OF SYMBOL
                        const Symbol = this.$store.state.symbleinfos.find((symbol) => symbol.id == item.ctid) || {}
                        const coinid = (Symbol.fcurrencyname + '_' + Symbol.tcurrencyname).toLowerCase()

                        let redirecTo = '/deal-pro/' + coinid
                        if (this.strategyType == 1) {
                            redirecTo = '/deal-pro/' + coinid
                        } else if (this.strategyType == 2) {
                            redirecTo = '/margin-pro/' + coinid
                        }
                        else if (this.strategyType == 3) {
                            redirecTo = '/contract-pro/' + coinid
                        }

                        item.redirecTo = redirecTo + '?strategy-bot-id=' + item.id

                        item.symbolImg = Symbol.icon
                        item.symbolText = this.strategyType == 3 ? Symbol.fcurrencyname : Symbol.descriptions
                        item.borrowmultiple = Symbol.borrowmultiple > 0 && this.strategyType == 2 ? Symbol.borrowmultiple : false
                        //CALCULATE RUNNING TIME
                        let createTime = moment.tz(item.createtime, 'Etc/GMT').local();
                        let nowTime = moment();
                        var duration = moment.duration(nowTime.diff(createTime));
                        var days = Math.floor(duration.asDays());
                        var hours = duration.hours();
                        var minutes = duration.minutes();
                        item.running_time = `${days}D ${hours}H ${minutes}M`
                        item.bgColor = '#FAFAFA'
                        //RANK IMAGE VALIDATION
                        if (index < 3) {
                            item.rankImg = `/images/rank_${++index}.svg`
                            item.bgColor = index == 1 ? 'linear-gradient(270deg, #FFF7E9 0%, rgba(255, 218, 154, 0.67) 46.5%, #FFEED0 100%)' : index == 2 ? 'linear-gradient(90deg, #F4F4F4 0%, #DDDDDD 56%, #F4F4F4 100%)' : 'linear-gradient(90deg, #FFF5EC 0%, rgba(226, 177, 133, 0.51) 55.5%, #FFF5EC 99.5%)'
                        }
                        item.rank = ++index;
                        //COPYNUM TO SHOW IN CURRENCY FORMAT HAVING , AND TRIMMING THE VALUES OF INCOME PROFIT
                        item.copynum = item.copynum.toLocaleString()
                        item.incomerate = item.incomerate.toFixed(2)
                        item.profit = item.profit.toFixed(2)
                        return item;
                    })
                }
            }).finally(() => {
                this.loadingData = false
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
        },
        getElementId(key) {
            let type = 'future';
            if (this.strategyType == 1) {
                type = 'spot'
            } else if (this.strategyType == 2) {
                type = 'margin'
            }
            return `${type}-chart-${key + 1}`
        }

    },
    async mounted() {
        //SETTING SYMBOLS FROM STATE ACCORDING TO SPOT,MARGIN,FUTURE
        this.setSymbol();
        // GETTING INITIAL DATA THIS FUNCTION @CHNAGE ON ALL SEARCH SELECT BOXES  AND ALSO RESET FUNCTION
        await this.getData()
    },
}
</script>
<style scoped>
.usdt-img {
    border: 0.5px solid #FFFFFF;
    position: relative;
    left: -3px;
}
</style>