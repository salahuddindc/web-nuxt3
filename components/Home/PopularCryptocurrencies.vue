<template>
    <div class="popular-cryptocurrencies mt-xs-6 mt-sm-12">
        <div class="main-content">
            <h2 class="popular-currencies lh-32 fw-6 secondary-black mb-xs-3 mb-sm-10">{{ $t('details.det13') }}</h2>
            <a-row :gutter="24">
                <a-col :xs="24" :sm="24" :md="16" :xl="16">
                    <a-card class="left-card first-table" :bordered="false">
                        <a-tabs default-active-key="1" v-model="activeTab" @change="changeTab">
                            <a-tab-pane key="0">
                                <span slot="tab">
                                    {{ $t('marketdetail.markdet1') }}
                                    <p v-show="activeTab == '0'" class="tab-bottom-line mb-0"></p>

                                </span>
                                <trade :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate"
                                    :marketdata="getDataArray" tab="2" :loading="marketDataLoading" />
                            </a-tab-pane>
                            <a-tab-pane key="1">
                                <span slot="tab">
                                    {{ $t('tabkeys.tab19') }}
                                    <p v-show="activeTab == '1'" class="tab-bottom-line mb-0"></p>

                                </span>
                                <trade :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate"
                                    :loading="marketDataLoading" :marketdata="getDataArray" tab="0" />

                                <a-row>
                                    <a-col :xs="24" :sm="0">
                                        <nuxt-link to="/market">
                                            <p class="mb-0 text-center pointer font-14 lh-18 fw-5 mt-3">{{ $t('public.ph49')
                                                }} <a-icon type="right" class="arrow-icon ml-1" style="font-size:12px" /></p>
                                        </nuxt-link>
                                    </a-col>
                                </a-row>
                            </a-tab-pane>
                            <a-tab-pane key="2">
                                <span slot="tab">
                                    {{ $t('tabkeys.tab20') }}
                                    <p v-show="activeTab == '2'" class="tab-bottom-line mb-0"></p>

                                </span>
                                <trade :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate"
                                    :loading="marketDataLoading" :marketdata="getDataArray" tab="-1" />
                                <a-row>
                                    <a-col :xs="24" :sm="0">
                                        <nuxt-link to="/market">
                                            <p class="mb-0 text-center pointer font-14 lh-18 fw-5 mt-3">{{ $t('public.ph49')
                                                }} <a-icon type="right" class="arrow-icon ml-1" style="font-size:12px" /></p>
                                        </nuxt-link>
                                    </a-col>
                                </a-row>
                            </a-tab-pane>
                            <a-tab-pane key="3">
                                <span slot="tab">
                                    {{ $t('tabkeys.tab21') }}
                                    <p v-show="activeTab == '3'" class="tab-bottom-line mb-0"></p>

                                </span>
                                <trade :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate"
                                    :loading="marketDataLoading" :marketdata="getDataArray" tab="1" />
                                <a-row>
                                    <a-col :xs="24" :sm="0">
                                        <nuxt-link to="/market">
                                            <p class="mb-0 text-center pointer font-14 lh-18 fw-5 mt-3">{{ $t('public.ph49')
                                                }} <a-icon type="right" class="arrow-icon ml-1" style="font-size:12px" /></p>
                                        </nuxt-link>
                                    </a-col>
                                </a-row>
                            </a-tab-pane>
                            <span slot="tabBarExtraContent">
                                <nuxt-link to="/market">
                                    <p class="mb-0 text-right pointer view-all pr-10 fw-5">{{ $t('public.ph49') }}
                                        <a-icon type="right" class="arrow-icon ml-1" /></p>
                                </nuxt-link>
                            </span>
                        </a-tabs>

                    </a-card>
                </a-col>
                <a-col :xs="0" :sm="0" :md="8" :xl="8" class="second-col ">
                    <a-card class="left-card" :bordered="false">
                        <a-tabs default-active-key="1" v-model="tab">
                            <a-tab-pane key="0">
                                <span slot="tab">
                                    {{ $t('tabkeys.tab22') }}
                                    <p v-show="tab == '0'" class="tab-bottom-line mb-0"></p>

                                </span>
                                <RightTabs :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate"
                                    :loading="marketDataLoading" :marketdata="marketdata_futrue" tab="0" key="0" />
                            </a-tab-pane>
                            <a-tab-pane key="1">
                                <span slot="tab">
                                    {{ $t('tabkeys.tab23') }}
                                    <p v-show="tab == '1'" class="tab-bottom-line mb-0"></p>

                                </span>
                                <RightTabs :getSymble="getSymble" :getClientExchangeRate="getClientExchangeRate"
                                    :loading="marketDataLoading" :marketdata="marketdata_futrue" tab="1" key="1" />
                            </a-tab-pane>

                        </a-tabs>
                    </a-card>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
import trade from './trade.vue'
import RightTabs from './RightTabs.vue'
export default {
    components: {
        trade,
        RightTabs
    },
    data() {
        return {
            tab: '1',
            favoritecoinlist: [],
            marketdata_futrue: [],
            marketdata_spot: [],
            marketdata_margin: [],
            marketdata: [],
            marketDataLoading: true,
            activeTab: "1",
            searchvalue: '',
            popularCurrenciesColumns: [
                {
                    title: this.$t('wallet.coin'),
                    dataIndex: "token",
                    key: "token",
                    scopedSlots: { customRender: "token" },
                    width: 140,
                },
                {
                    title: this.$t('legal.lgl3'),
                    dataIndex: "price",
                    key: "price",
                    scopedSlots: { customRender: "price" },
                    width: 120,
                },
                {
                    title: this.$t('public.24chan'),
                    dataIndex: "changes",
                    key: "changes",
                    scopedSlots: { customRender: "changes" },
                    width: 100,
                    align: 'end'
                },
            ],

        }
    },
    // computed
    computed: {
        getDataArray() {
            const _self = this;
            if (this.activeTab == "0") {
                if (_self.searchvalue != '') {
                    const filtered = _self.favoritecoinlist.filter(function (item) {
                        const str = (_self.getSymble(item.symble).from + "/" + _self.getSymble(item.symble).to).toLowerCase();
                        return str.indexOf(_self.searchvalue.toLowerCase()) !== -1;
                    });
                    return filtered
                }
                return this.favoritecoinlist
            }
            else {
                if (_self.searchvalue != '') {
                    const filtered = _self.marketdata.filter(function (item) {
                        const str = (_self.getSymble(item.symble).from + "/" + _self.getSymble(item.symble).to).toLowerCase();
                        return str.indexOf(_self.searchvalue.toLowerCase()) !== -1;
                    });
                    return filtered
                }
                return this.marketdata;
            }

        },
    },
    watch: {
        '$store.state.symbleinfos': {
            handler: function (newValue, oldValue) {
                if (this.marketdata.length == 0) {
                    this._getDailyAlL(2);
                }

            },
            immediate: true,
            deep: true
            ,
        }
    },
    methods: {
        connectsocket(itype) {
            let _self = this;
            this.$socket.uninvoke({
                sub: "market." + this.sockettype + ".tickers",
                type: _self.$socket.type.quotation_daily_getall,
            });
            this.sockettype = (itype == 2 ? 0 : itype);
            this.$socket.invoke({
                sub: "market." + this.sockettype + ".tickers",
                type: _self.$socket.type.quotation_daily_getall,
            });
            this.$socket.receive(_self.$socket.type.quotation_daily_getall, _self.callback);
        },
        callback(data) {
            let newdatas = [];
            this.marketdata.forEach((m) => {
                var datainfos = data.data.filter((item) => {
                    return item.ctid == m.ctid;
                });
                if (datainfos.length > 0) {
                    m.c = datainfos[0].c;
                    m.h = datainfos[0].h;
                    m.l = datainfos[0].l;
                    m.o = datainfos[0].o;
                    m.v = datainfos[0].v;
                    m.t = datainfos[0].t;
                }
                newdatas.push(m);
            });
            this.marketdata = [];
            this.marketdata = newdatas;
        },
        _getDailyAlL(itype) {
            const _self = this;
            let _symbles = this.$store.getters['getSymbleinfos'];
            if (_symbles.length == 0)
                return;
            if (itype == 2) {
                this.$store.dispatch('quotation_daily_getall', {
                    iscontract: itype,
                    displaylocation: 0,
                    pageIndex: 0,
                    pageSize: 300 //have to change
                }).then((res) => {
                    const data = res.data || {}
                    console.log(res, "resresresres")
                    _self.marketDataLoading = false;
                    _self.marketdata_spot = [];
                    _self.marketdata_recommend = [];
                    _self.marketdata_recommend_future = [];
                    _self.marketdata_margin = [];
                    _self.marketdata_futrue = [];
                    const market_data = data.pagedata

                    market_data.forEach(item => {
                        var symbledatas = _symbles.filter(citem => {
                            return citem.id == item.ctid
                        });
                        if (symbledatas.length > 0) {
                            if (symbledatas[0].itype == 0) {
                                _self.marketdata_spot.push(item);
                                if (symbledatas[0].property.slice(0, 1) == "1") {
                                    _self.marketdata_recommend.push(item);
                                }
                                if (symbledatas[0].borrowmultiple > 0) {
                                    item.borrowmultiple = symbledatas[0].borrowmultiple;
                                    _self.marketdata_margin.push(item);
                                }
                            } else {
                                _self.marketdata_futrue.push(item);
                            }
                        }
                    });
                    _self.changeTab(_self.activeTab);
                    this.loading = false;
                    _self.$nextTick(() => {
                        _self.connectsocket(itype);
                    });
                });
            } else {
                if (itype == 0) {
                    this.marketdata = this.marketdata_spot;
                }
                if (itype == 1) {
                    this.marketdata = this.marketdata_futrue;
                }
                if (itype == -1) {
                    this.marketdata = this.marketdata_margin;
                }
                this.connectsocket(itype);
            }
        },
        getSymble(s) {
            s = this.global_get_uppercase(s);
            s = s.split("/");
            return {
                from: s[0],
                to: s[1],
            };
        },
        getClientExchangeRate(tradeData) {
            if (tradeData.symble) {
                let symble = tradeData.symble.split("/");
                if (symble.length > 1) {
                    symble = symble[1];
                }
                return this.$store.getters.get_client_exchange_rate(
                    symble,
                    tradeData.c
                );
            }
        },
        getFavorites() {
            const _self = this;
            if (!this.$userinfo.uid) {
                return
            }
            console.log('im calling in market getFavorites ');
            _self.$store.dispatch('user_self_selection_getlist', { type: 0 }).then(({ data }) => {

                if (data) {
                    _self.favoritecoinlist = data;
                }
            })
        },


        changeTab(tab) {
            switch (tab) {
                case '0':
                    this.getFavorites();
                    break;
                case '1':
                    this._getDailyAlL(0);
                    break;
                case '2':
                    this._getDailyAlL(-1);
                    break;
                case '3':
                    this._getDailyAlL(1);
                    break;
            }
        },
    },

    mounted() {

    }

}
</script>

<style></style>
