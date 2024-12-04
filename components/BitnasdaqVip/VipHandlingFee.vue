<template>
    <div class="vip-handling-fee mt-10">
        <div class="main-content">
            <p class="main-heading mb-2 text-black fw-5">{{ $t('vip_pro.vip_level') }}</p>
            <p class="main-desc text-black fw-4 mb-0">{{ $t('vip_pro.vip_note2') }}</p>
            <a-tabs default-active-key="1" class="mt-6" @change="onTabChange">
                <a-tab-pane key="1" :tab="$t('tabkeys.tab59')">
                    <a-row class="">
                        <VipTables :vipColumns="vipLevelColums" :vipData="vipLevels">
                            <template #vipLevel="{ row }">
                                <p class="col-alignment mb-0 vip-txt fw-5">
                                    <!-- <img src="/images/vip1.svg" class="mr-2" /> -->
                                    {{ row.name.charAt(0).toUpperCase() + row.name.slice(1) }}
                                </p>
                            </template>
                            <template #or="{ row }">
                                <p class="col-alignment mb-0 ">/</p>
                            </template>
                            <template #amount="{ row }">
                                <p class="col-alignment mb-0 vip-txt fw-5">{{ row.amout }}</p>
                            </template>
                            <template #spotTradingVolume="{ row }">
                                <p class="col-alignment mb-0 vip-txt fw-5">{{ row.spot_min }}-{{ row.spot_max }}</p>
                            </template>
                            <template #futureTradingVolume="{ row }">
                                <p class=" mb-0 vip-txt fw-5">{{ row.future_min }}-{{ row.future_max }}</p>
                            </template>
                        </VipTables>
                    </a-row>
                </a-tab-pane>
                <a-tab-pane key="2" :tab="$t('person.pd30')" force-render>
                    <a-row class="">
                        <VipTables :vipColumns="withdrawColums" :vipData="currencies" v-if="!loading">
                            <template #token="{ row }">
                                <p class="col-alignment mb-0 vip-txt fw-5"><img :src="row.icon" height="24" width="24"
                                        class="mr-2" />{{ row.currencyname }}<span class="wing-token fw-5 ml-1">{{
                                            row.fullname }}</span></p>
                            </template>
                            <template #borrowrate="{ row }">
                                <p class="col-alignment mb-0 vip-txt fw-5">{{ row.borrowrate * 100 }}%</p>
                            </template>
                            <template #free="{ row }">
                                <p class=" mb-0 vip-txt fw-5">{{ $t('express.exp27') }}</p>
                            </template>
                            <template #network="{ row }">
                                <p class="col-alignment mb-0 vip-txt fw-5" v-for="(item, key) in row.mainChains"
                                    :key="key">{{ item.tokenfullname }}<span v-if="item.tokentype != ''">({{
                                        item.tokentype.toUpperCase() }})</span></p>
                            </template>
                            <template #minimumWithdraw="{ row }">
                                <p class="mb-0 vip-txt fw-5" v-for="(item, key) in row.mainChains" :key="key">{{
                                    item.minwithdrawalamount }}</p>
                            </template>
                            <template #withdrawFee="{ row }">
                                <p class=" mb-0 vip-txt fw-5" v-for="(item, key) in row.mainChains" :key="key">{{
                                    item.withdrawalfee }}</p>
                            </template>
                        </VipTables>
                    </a-row>
                </a-tab-pane>
                <a-tab-pane key="3" :tab="$t('tabkeys.tab58')">
                    <VipTables :vipColumns="tradingColums" :vipData="vipLevels">
                        <template #vipLevel="{ row }">
                            <p class="col-alignment mb-0 vip-txt fw-5">
                                <!-- <img src="/images/vip1.svg" class="mr-2" /> -->
                                {{ row.name.charAt(0).toUpperCase() + row.name.slice(1) }}
                            </p>
                        </template>
                        <template #spotFee="{ index }">
                            <p class=" mb-0 vip-txt fw-5"> {{ ((10 - index - 1) * 0.1 * 100 * spotMaker).toFixed(2)
                                }}%/{{ ((10 - index - 1) * 0.1 * 100 * spotTaker).toFixed(2) }}%</p>
                        </template>
                        <template #futureFee="{ index }">
                            <p class=" mb-0 vip-txt fw-5">{{ ((10 - index - 1) * 0.1 * 100 * futureMaker).toFixed(2)
                                }}%/{{ ((10 - index - 1) * 0.1 * 100 * futureTaker).toFixed(2) }}%</p>
                        </template>
                    </VipTables>
                </a-tab-pane>
            </a-tabs>
        </div>

    </div>
</template>

<script>
import VipTables from './VipTables.vue'

export default {
    components: {
        VipTables
    },
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
                    dataIndex: 'vipLevel',
                    scopedSlots: { customRender: 'vipLevel' },
                    width: 180,
                },
                {
                    title: this.$t('tableskeys.vt2'),
                    dataIndex: 'amout',
                    scopedSlots: { customRender: 'amount' },
                    width: 160,
                },
                {
                    title: this.$t('tableskeys.vt3'),
                    dataIndex: 'or',
                    scopedSlots: { customRender: 'or' },
                    width: 100,
                },
                {
                    title: this.$t('tableskeys.vt4'),
                    dataIndex: 'tradingVolume',
                    scopedSlots: { customRender: 'spotTradingVolume' },
                    width: 220,
                },
                {
                    title: this.$t('tableskeys.vt3'),
                    dataIndex: 'or1',
                    scopedSlots: { customRender: 'or' },
                    width: 80,
                },
                {
                    title: this.$t('tableskeys.vt5'),
                    dataIndex: 'tradingUsdt',
                    scopedSlots: { customRender: 'futureTradingVolume' },
                    width: 180,
                    align: 'end'
                },
            ],
            withdrawColums: [
                {
                    title: this.$t('tableskeys.vt6'),
                    dataIndex: 'token',
                    scopedSlots: { customRender: 'token' },
                    width: 200,
                },
                {
                    title: this.$t('tableskeys.wa8'),
                    dataIndex: 'network',
                    scopedSlots: { customRender: 'network' },
                    width: 210,
                },
                {
                    title: this.$t('tableskeys.vt7'),
                    dataIndex: 'minimumWithdraw',
                    scopedSlots: { customRender: 'minimumWithdraw' },
                    width: 180,
                },
                {
                    title: this.$t('tableskeys.vt8'),
                    dataIndex: 'withdrawFee',
                    scopedSlots: { customRender: 'withdrawFee' },
                    width: 160,
                },
                {
                    title: this.$t('tableskeys.vt9'),
                    dataIndex: 'deposit',
                    scopedSlots: { customRender: 'free' },
                    width: 160,
                },
                {
                    title: this.$t('tableskeys.vt10'),
                    dataIndex: 'borrowRate',
                    scopedSlots: { customRender: 'borrowrate' },
                    width: 160,
                },
                {
                    title: this.$t('tableskeys.vt11'),
                    dataIndex: 'p2pFee',
                    scopedSlots: { customRender: 'free' },
                    width: 140,
                    align: 'end'

                },
            ],
            tradingColums: [
                {
                    title: this.$t('tableskeys.vt12'),
                    dataIndex: 'vipLevel',
                    scopedSlots: { customRender: 'vipLevel' },
                    width: 270,
                },
                {
                    title: this.$t('tableskeys.vt13'),
                    dataIndex: 'spotfee',
                    scopedSlots: { customRender: 'spotFee' },
                    width: 280,
                },
                {
                    title: this.$t('tableskeys.vt14'),
                    dataIndex: 'futurefee',
                    scopedSlots: { customRender: 'futureFee' },
                    width: 120,
                    align: 'end'

                },
            ]
        }
    },
    methods: {
        onTabChange(key) {
            console.log('keyeee', key);
            if (key == 2) {
                this.getMainChains()
            }

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
        await this.getVipLevels();
        //this.getMainChains();
        this.currencies = this.$store.state.currencyinfos;
    }
}
</script>

<style></style>
