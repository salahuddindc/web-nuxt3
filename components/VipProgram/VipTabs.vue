<template>
    <div class="vip-tabs my-3">
        <a-card class="tabs-card" :bordered="false">
            <a-tabs default-active-key="1">

                <a-tab-pane key="2" :tab="$t('tabkeys.tab60')" force-render>
                    <a-table :columns="withdrawColums" :data-source="currencies" :pagination="true"
                        :rowKey="(record) => record.key" :loading="loading">
                        <template #bodyCell="{ column, record }">

                            <template v-if="column.key == 'token'">
                                <p class="col-alignment mb-0 vip-txt fw-5"><img :src="record.icon" height="24"
                                        width="24" class="mr-2" />{{ record.currencyname }}<span
                                        class="wing-token fw-5 ml-1">{{
                                            record.fullname }}</span></p>
                            </template>
                            <template v-if="column.key == 'borrowrate'">
                                <p class="col-alignment mb-0 vip-txt fw-5">{{ record.borrowrate * 100 }}%</p>
                            </template>
                            <template v-if="column.key == 'free'">
                                <p class=" mb-0 vip-txt fw-5">{{ $t('express.exp27') }}</p>
                            </template>
                            <template v-if="column.key == 'network'">
                                <p class="col-alignment mb-0 vip-txt fw-5" v-for="(item, key) in record.mainChains"
                                    :key="key">{{ item.tokenfullname }}<span v-if="item.tokentype != ''">({{
                                        item.tokentype.toUpperCase() }})</span></p>
                            </template>
                            <template v-if="column.key == 'minimumWithdraw'">
                                <p class="mb-0 vip-txt fw-5" v-for="(item, key) in record.mainChains" :key="key">{{
                                    item.minwithdrawalamount }}</p>
                            </template>
                            <template v-if="column.key == 'withdrawFee'">
                                <p class=" mb-0 vip-txt fw-5" v-for="(item, key) in record.mainChains" :key="key">{{
                                    item.withdrawalfee }}</p>
                            </template>
                        </template>
                    </a-table>

                </a-tab-pane>
                <a-tab-pane key="3" :tab="$t('tabkeys.tab58')">
                    <a-table :columns="tradingColums" :data-source="vipLevels" :pagination="true"
                        :rowKey="(record) => record.key" :loading="loading">
                        <template #bodyCell="{ column, record, index }">
                            <template v-if="column.key == 'vipLevel'">
                                <p class="col-alignment mb-0 vip-txt fw-5">
                                    <NuxtImg src="/images/vip1.svg" />
 

                                    {{
                                        record.name.charAt(0).toUpperCase() + record.name.slice(1) }}
                                </p>
                            </template>
                            <template v-if="column.key == 'spotFee'">
                                <p class=" mb-0 vip-txt fw-5"> {{ ((10 - index - 1) * 0.1 * 100 * spotMaker).toFixed(2)
                                    }}%/{{ ((10 - index - 1) * 0.1 * 100 * spotTaker).toFixed(2) }}%</p>
                            </template>
                            <template v-if="column.key == 'futureFee'">
                                <p class=" mb-0 vip-txt fw-5">{{ ((10 - index - 1) * 0.1 * 100 * futureMaker).toFixed(2)
                                    }}%/{{ ((10 - index - 1) * 0.1 * 100 * futureTaker).toFixed(2) }}%</p>
                            </template>
                        </template>
                    </a-table>
                </a-tab-pane>
            </a-tabs>
        </a-card>
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
                    key: 'free',
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
                    dataIndex: 'vipLevel',
                    key: 'vipLevel',
                    width: 270,
                },
                {
                    title: this.$t('tableskeys.vt13'),
                    dataIndex: 'spotfee',
                    key: 'spotFee',
                    width: 280,
                },
                {
                    title: this.$t('tableskeys.vt14'),
                    dataIndex: 'futurefee',
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
                    this.currencies = newValue;
                    this.getMainChains();
                }
            },
            immediate: true
        }
    },
    methods: {
        callback(key) {

        },
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
                this.loading = true;
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
                this.loading = false;
                //console.log('Error', error.toString())
            }
        }
    },
    async mounted() {
        this.getVipLevels();
    }
}
</script>

<style></style>