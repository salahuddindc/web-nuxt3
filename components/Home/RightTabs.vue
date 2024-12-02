<template>
    <div>
        <a-table :columns="columns" :pagination="false" :data-source="topgainers.slice(0, 7)" rowKey="ctid"
            :customRow="goDeal" :loading="loading" class="mt-2" :rowClassName="() => { return 'pointer' }">
            <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'pair'">
                    <div>
                        <span><span class="symbolFrom secondary-black fw-6">{{ getSymble(record.symble).from }}</span><span
                                class="symbolTo fw-5 secondary-gray">
                                {{ $t('deal_new.dn10') }}</span></span>
                    </div>
                </template>


                <template v-if="column.key === 'lastPrice'">
                    <div>
                        <p class="mb-0">{{ global_get_tofixed(record.c, global_get_decimal(record.symble).p) }}</p>

                        <span class="second-txt fw-5"> ≈ {{ $store.getters.get_client_exchange_rate_name.mark }}{{
                            getClientExchangeRate(record) }}</span>
                    </div>
                </template>

                <template v-if="column.key === 'changes'">
                    <div>
                        <span v-if="tab == '2'" :class="record.c - record.o < 0 ? 'red-active' : 'up-dark'">
                            ${{ numFormatter(record.c * record.v) }}
                            <img :src="record.c - record.o < 0 ? '/images/red-up-arrow.svg' : '/images/green-blue-up-arrow.svg'"
                                height="12" width="auto" class="ml-1 mb-1" /></span>
                        <span v-else :class="record.c - record.o < 0 ? 'red-active' : 'up-dark'">{{ getlimitprice(record) }}%<img
                                :src="record.c - record.o < 0 ? '/images/red-up-arrow.svg' : '/images/green-blue-up-arrow.svg'"
                                height="12" width="auto" class="ml-1 mb-1" /></span>
                    </div>
                </template>
            </template>
        </a-table>
    </div>
</template>

<script>

export default {
    props: {
        marketdata: {
            type: Array
        },
        getSymble: {
            type: Function
        },
        getClientExchangeRate: {
            type: Function
        },
        tab: {
            type: String
        },
        loading: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            topgainers: [],
            columns:
                [
                    {
                        title: this.$t("tableskeys.tk11"),
                        dataIndex: 'pair',
                        key: 'pair',
                        width: 120,
                    },
                    {
                        title: this.$t("tableskeys.tk2"),
                        dataIndex: 'lastPrice',
                        key: 'lastPrice',
                        width: 80,
                    },
                    {
                        title: this.tab == 2 ? 'Total 24h Vol' : this.$t('texts.txt41'),
                        dataIndex: 'changes',
                        key: 'changes',
                        width: 90,
                        align: 'end'
                    },
                ]
        }
    },
    watch: {
        marketdata: function (val) {
            this.manageTabsData()
        }
    },
    methods: {
        getlimitprice(item) {
            return (
                (item.c - item.o < 0 ? "-" : "+") +
                global_get_limitprice(item)
            );
        },
        topGainers(data) {
            const array = data.concat([]);
            array.sort((a, b) => {
                const x = a.c - a.o < 0 ? -1 : 1;
                const y = b.c - b.o < 0 ? -1 : 1;
                return y * parseFloat(global_get_limitprice(b)) - x * parseFloat(global_get_limitprice(a))
            })
            return array;
        },
        goDeal(row) {


            return {
                on: {
                    click: event => {
                        var coinid = '' + row.symble + ''
                        coinid = coinid.replace('/', '_').toLowerCase();
                        const ctype = row.itype == 1 ? 'contract' : (row.itype == -1) ? 'margin' : 'spot'
                        const ctid = row.ctid

                        if (ctype == 'contract') {
                            this.$router.push({ path: `/contract-pro/${coinid}` })
                        }
                        else if (ctype == 'margin') {
                            this.$router.push({ path: `/margin-pro/${coinid}` })
                        }
                        else {
                            this.$router.push({ path: `/deal-pro/${coinid}` })
                        }
                    }
                }
            };
        },
        losers(data) {
            const array = data.concat([]);
            array.sort((a, b) => {
                const x = a.c - a.o < 0 ? -1 : 1;
                const y = b.c - b.o < 0 ? -1 : 1;
                return x * parseFloat(global_get_limitprice(a)) - y * parseFloat(global_get_limitprice(b))
            })
            return array;
        },
        volume(data) {
            const array = data.concat([]);
            array.sort((a, b) => {
                return (b.v * b.c) - (a.v * a.c);
            })
            return array;
        },

        manageTabsData() {
            if (this.tab == "0") {
                this.topgainers = this.topGainers(this.marketdata);
            }
            else if (this.tab == "1") {
                this.topgainers = this.losers(this.marketdata);
            }
            else if (this.tab == "2") {
                this.topgainers = this.volume(this.marketdata);
            }
        }
    },
    mounted() {
        this.manageTabsData()
    }
}
</script>
