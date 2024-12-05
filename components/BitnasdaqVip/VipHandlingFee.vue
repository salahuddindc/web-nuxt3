<template>
    <div class="vip-handling-fee mt-10">
        <div class="main-content">
            <p class="main-heading mb-2 text-black fw-5">{{ $t('vip_pro.vip_level') }}</p>
            <p class="main-desc text-black fw-4 mb-0">{{ $t('vip_pro.vip_note2') }}</p>
            <a-tabs default-active-key="1" class="mt-6">
                <a-tab-pane key="1" :tab="$t('tabkeys.tab59')">

                    <a-table :columns="vipLevelColums" :data-source="vipLevels" :pagination="false"
                        :row-key="record => record.key" :loading="loading">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'name'">
                                <p class="col-alignment mb-0 vip-txt fw-5">
                                    <!-- <img src="/images/vip1.svg" class="mr-2" /> -->
                                    {{ record.name.charAt(0).toUpperCase() + record.name.slice(1) }}
                                </p>
                            </template>
                            <template v-if="column.key === 'or'">
                                <p class="col-alignment mb-0 ">/</p>
                            </template>
                            <template v-if="column.key === 'amount'">
                                <p class="col-alignment mb-0 vip-txt fw-5">{{ record.amout }}</p>
                            </template>
                            <template v-if="column.key === 'spotTradingVolume'">
                                <p class="col-alignment mb-0 vip-txt fw-5">{{ record.spot_min }}-{{ record.spot_max
                                    }}</p>
                            </template>
                            <template v-if="column.key === 'futureTradingVolume'">
                                <p class=" mb-0 vip-txt fw-5">{{ record.future_min }}-{{ record.future_max }}</p>
                            </template>
                        </template>
                    </a-table>

                </a-tab-pane>
                <a-tab-pane key="2" :tab="$t('person.pd30')" force-render>

                    <a-table :columns="withdrawColums" :data-source="currencies" :pagination="false"
                        :row-key="record => record.key" :loading="loading">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'token'">
                                <p class="col-alignment mb-0 vip-txt fw-5"><img :src="record.icon" height="24"
                                        width="24" class="mr-2" />{{ record.currencyname }}<span
                                        class="wing-token fw-5 ml-1">{{
                                            record.fullname }}</span></p>
                            </template>
                            <template v-if="column.key === 'borrowrate'">
                                <p class="col-alignment mb-0 vip-txt fw-5">{{ record.borrowrate * 100 }}%</p>
                            </template>
                            <template v-if="column.key === 'free'">
                                <p class=" mb-0 vip-txt fw-5">{{ $t('express.exp27') }}</p>
                            </template>
                            <template v-if="column.key === 'network'">
                                <p class="col-alignment mb-0 vip-txt fw-5" v-for="(item, key) in record.mainChains"
                                    :key="key">{{ item.tokenfullname }}<span v-if="item.tokentype != ''">({{
                                        item.tokentype.toUpperCase() }})</span></p>
                            </template>
                            <template v-if="column.key === 'minimumWithdraw'">
                                <p class="mb-0 vip-txt fw-5" v-for="(item, key) in record.mainChains" :key="key">{{
                                    item.minwithdrawalamount }}</p>
                            </template>
                            <template v-if="column.key === 'withdrawFee'">
                                <p class=" mb-0 vip-txt fw-5" v-for="(item, key) in record.mainChains" :key="key">{{
                                    item.withdrawalfee }}</p>
                            </template>

                        </template>
                    </a-table>

                </a-tab-pane>
                <a-tab-pane key="3" :tab="$t('tabkeys.tab58')">

                    <a-table :columns="tradingColums" :data-source="vipLevels" :pagination="false"
                        :row-key="record => record.key" :loading="loading">
                        <template #bodyCell="{ column, record, index }">
                            <template v-if="column.key === 'vipLevel'">
                                <p class="col-alignment mb-0 vip-txt fw-5">
                                    <!-- <img src="/images/vip1.svg" class="mr-2" /> -->
                                    {{ record.name.charAt(0).toUpperCase() + record.name.slice(1) }}
                                </p>
                            </template>
                            <template v-if="column.key === 'spotFee'">
                                <p class=" mb-0 vip-txt fw-5"> {{ ((10 - index - 1) * 0.1 * 100 * spotMaker).toFixed(2)
                                    }}%/{{ ((10 - index - 1) * 0.1 * 100 * spotTaker).toFixed(2) }}%</p>
                            </template>
                            <template v-if="column.key === 'futureFee'">
                                <p class=" mb-0 vip-txt fw-5">{{ ((10 - index - 1) * 0.1 * 100 * futureMaker).toFixed(2)
                                    }}%/{{ ((10 - index - 1) * 0.1 * 100 * futureTaker).toFixed(2) }}%</p>
                            </template>
                        </template>
                    </a-table>
                </a-tab-pane>
            </a-tabs>
        </div>

    </div>
</template>

<script>
 

export default {
     
    computed: {
        spotMaker() {
            return this.$store.state.symbleinfos[0]?.buyfee
        },
        spotTaker() {
            return this.$store.state.symbleinfos[0]?.takerbuyfee
        },
        futureMaker() {
            return this.$store.state.symbleinfos[3]?.buyfee
        },
        futureTaker() {
            return this.$store.state.symbleinfos[3]?.takerbuyfee
        }
    },
    data() {
        return {
            loading: true,
            vipLevels: [],
            currencies: [],
            mainChains: [],
            vipLevelColums: [
                {
                    title: this.$t('tableskeys.vt1'),
                    key: 'name',
                    width: 180,
                },
                {
                    title: this.$t('tableskeys.vt2'),
                    key: 'amount',
                    width: 160,
                },
                {
                    title: this.$t('tableskeys.vt3'),
                    key: 'or',
                    width: 100,
                },
                {
                    title: this.$t('tableskeys.vt4'),
                    key: 'spotTradingVolume',
                    width: 220,
                },
                {
                    title: this.$t('tableskeys.vt3'),
                    key: 'or',
                    width: 80,
                },
                {
                    title: this.$t('tableskeys.vt5'),
                    key: 'futureTradingVolume',
                    width: 180,
                    align: 'end'
                },
            ],
            withdrawColums: [
                {
                    title: this.$t('tableskeys.vt6'),
                    dataIndex: 'token',
                    key: 'token',
                    width: 200,
                },
                {
                    title: this.$t('tableskeys.wa8'),
                    dataIndex: 'network',
                    key: 'network',
                    width: 210,
                },
                {
                    title: this.$t('tableskeys.vt7'),
                    dataIndex: 'minimumWithdraw',
                    key: 'minimumWithdraw',
                    width: 180,
                },
                {
                    title: this.$t('tableskeys.vt8'),
                    dataIndex: 'withdrawFee',
                    key: 'withdrawFee',
                    width: 160,
                },
                {
                    title: this.$t('tableskeys.vt9'),
                    dataIndex: 'deposit',
                    key: 'deposit',
                    width: 160,
                },
                {
                    title: this.$t('tableskeys.vt10'),
                    dataIndex: 'borrowRate',
                    key: 'borrowrate',
                    width: 160,
                },
                {
                    title: this.$t('tableskeys.vt11'),
                    dataIndex: 'p2pFee',
                    key: 'free',
                    width: 140,
                    align: 'end'

                },
            ],
            tradingColums: [
                {
                    title: this.$t('tableskeys.vt12'),
                    key: 'vipLevel',
                    width: 270,
                },
                {
                    title: this.$t('tableskeys.vt13'),
                    key: 'spotFee',
                    width: 280,
                },
                {
                    title: this.$t('tableskeys.vt14'),
                    key: 'futureFee',
                    width: 120,
                    align: 'end'

                },
            ]
        }
    },
    watch: {
        '$store.state.currencyinfos': {
            handler: function (newValue, oldValue) {
                if (newValue.length > 0) {
                    this.getVipLevels();
                    this.getMainChains();
                    this.currencies = this.$store.state.currencyinfos;
                }
            },
            immediate: true
        }
    },
    methods: {

        async getVipLevels() {
            try {
                const { data } = await this.$store.dispatch('com_constants_getconstantsinfo', { key: "Vip_ConfigSetting" })
                if (data) {
                    this.vipLevels = JSON.parse(data);
                }
            } catch (error) {
                //console.log('Error', error)
            }
        },
        async getMainChains() {
            try {
                const { data } = await this.$store.dispatch('com_constants_getconstantsinfo', {
                    key: "DepositAndWithdrawalConfiguration"
                })
                if (data) {
                    this.mainChains = eval('(' + data + ')');
                    this.currencies.filter(_c => {
                        const result = this.mainChains.filter(_m => _m.token.toUpperCase() == _c.currencyname)[0]
                        if (result) {
                            _c.mainChains = result.mainchains;
                        }
                        else {
                            _c.mainChains = [];
                        }
                    })
                    this.loading = false;
                }
            } catch (error) {
                //console.log('Error', error.toString())
            }
        }
    },
    async mounted() {

    }
}
</script>

<style></style>
