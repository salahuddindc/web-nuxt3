<template>
    <div id="fiat-calculator">
        <a-card :bordered="false" :bodyStyle="{ padding: '24px' }">
            <h1 class="fw-5 secondary-black font-lg-36 font-sm-26 font-xs-22 lh-31 mb-4 text-center">{{
                $t('contract.calculator') }} {{ fcurrency }}
                {{ $t('convert.con_to') }} {{ tcurrency }}</h1>
            <h6 class="secondary-gray fw-4 lh-20 mb-0 text-center mb-0">
                {{ $t('convert.calculator_heading', { from: fcurrency, to: tcurrency }) }}
            </h6>
            <div class="main-div position-relative">
                <div class="center-div">
                    <img src="/images/fiat-icon.svg" class="pointer" @click="swap" />
                </div>
                <a-form ref="calculatorForm">
                    <a-row :gutter="20" class="mt-11">
                        <a-col :lg="12">
                            <a-card :bodyStyle="{ padding: '14px 32px' }" class="form-card">
                                <AppFormModelItem name="from"
                                    :label="$t('convert.amount_in_bitcoin', { coin: fcurrency })">
                                    <a-input v-model:value="fromAmount" @change="calculateRate" ref="coinInput"
                                        type="number">
                                        <template #suffix>
                                            <span v-if="listCheck">
                                                <AppSelect :showSearch="true" :order="fromList" market="Select"
                                                    :type="fromIndex" ref="from-list-ref"
                                                    @searchData="updateFromRoute" />
                                            </span>
                                        </template>

                                    </a-input>
                                </AppFormModelItem>
                            </a-card>
                        </a-col>
                        <a-col :lg="12">
                            <a-card :bodyStyle="{ padding: '14px 32px' }" class="form-card">
                                <AppFormModelItem name="from"
                                    :label="$t('convert.amount_in_currency', { currency: tcurrency })">
                                    <a-input v-model:value="toAmount" ref="currencyInput" type="number"
                                        @change="calculateRate">
                                        <template #suffix>
                                            <span v-if="listCheck">
                                                <AppSelect :showSearch="true" :order="toList" ref="to-list-ref"
                                                    market="Select" :type="toIndex" @searchData="updateToRoute" />
                                            </span>
                                        </template>
                                    </a-input>
                                </AppFormModelItem>
                            </a-card>

                        </a-col>
                    </a-row>

                </a-form>
            </div>
        </a-card>
    </div>
</template>

<script>
import { unLink } from '~/utils/helpers';
export default {

    data() {
        return {
            fcurrency: 'BTC',
            tcurrency: 'EUR',
            fromIndex: 0,
            toIndex: 0,
            fromAmount: '',
            toAmount: '',
            currencyRates: [],
            searchValue: '',
            exchangeRates: [],
            isSwaped: false,
            fromList: [],
            toList: [],
            fromCurrencyObj: {},
            toCurrencyObj: {},
        }
    },
    props: {
        exchangeCurrencies: {
            type: Array
        },
        allCoins: {
            type: Array
        }
    },
    computed: {
        listCheck() {
            return this.fromList.length > 0 && this.toList.length > 0
        }
    },
    watch: {
        exchangeRates() {
            this.tcurrency = 'EUR'
        },
        allCoins: {
            handler(newValue) {
                if (newValue.length > 0 && this.fromList.length == 0) {
                    //console.log('allCoins', newValue);
                    this.fromList = unLink(this.allCoins)
                }
            },
            immediate: true,
        },
        exchangeCurrencies: {
            handler(newValue) {
                if (newValue.length > 0) {
                    //console.log('exchangeCurrencies', newValue);
                    this.toList = unLink(this.exchangeCurrencies)
                }
            },
            immediate: true
        },
        '$route.params': {
            handler(params) {
                if (this.$route.path === '/calculator') {
                    if (this.listCheck) {
                        this.initData()
                    }
                }
                if (this.$route.path.includes('-to-')) {
                    const { fcurrency, tcurrency } = this.parseSlug(params.slug);
                    this.fcurrency = fcurrency.toUpperCase()
                    this.tcurrency = tcurrency.toUpperCase()
                    if (this.listCheck) {
                        this.initData()
                    }
                }


            },
            immediate: true
        },
        listCheck(val) {
            if (val) {
                this.initData()
            }
        }

    },
    methods: {
        initData() {

            this.isSwaped = false
            let findex = this.allCoins.findIndex(coin => coin.fcurrencyname == this.fcurrency);
            if (findex == -1) {
                this.isSwaped = true
                findex = this.exchangeCurrencies.findIndex(coin => coin.name == this.fcurrency);
            }

            let tindex = this.exchangeCurrencies.findIndex(coin => coin.name == this.tcurrency);

            if (tindex == -1) {
                this.isSwaped = true
                tindex = this.allCoins.findIndex(coin => coin.fcurrencyname == this.tcurrency)
            }

            if (this.isSwaped == true) {
                this.fromList = this.exchangeCurrencies
                this.toList = this.allCoins
                this.toIndex = tindex
                this.fromIndex = findex

                this.$nextTick(() => {
                    this.$refs['from-list-ref'].statueShow()
                    this.$refs['to-list-ref'].statueShow()
                })
                this.toCurrencyObj = this.toList ? this.toList[this.toIndex] : {}
                this.fromCurrencyObj = this.fromList ? this.fromList[this.fromIndex] : {}
                this.$emit('update-coin', this.toList[this.toIndex]?.fcurrencyname, this.fromList[this.fromIndex]?.name)
            } else {
                this.toIndex = tindex
                this.fromIndex = findex
                this.toCurrencyObj = this.toList ? this.toList[this.toIndex] : {}
                this.fromCurrencyObj = this.fromList ? this.fromList[this.fromIndex] : {}
                this.$emit('update-coin', this.fromList[this.fromIndex]?.fcurrencyname, this.toList[this.toIndex]?.name)

            }
        },
        parseSlug(slug) {
            const currencies = slug.split('-to-');
            return {
                fcurrency: currencies[0],
                tcurrency: currencies[1]
            };
        },
        calculateRate() {
            if (this.listCheck) {

                if (this.isSwaped) {
                    const coin = this.currencyRates.find(currency => {
                        return currency.currceyname == this.toCurrencyObj?.fcurrencyname?.toLowerCase()
                    }) || {}

                    const currency = this.currencyRates.find(coin => coin.currceyname == this.fromCurrencyObj?.name?.toLowerCase()) || {}
                    let fromAmount = parseFloat(this.fromAmount)
                    const currencyRate = currency.price
                    const coinFiatRate = coin.price * currencyRate
                    this.toAmount = this.avoid_from_exponent_notation(fromAmount / coinFiatRate)
                } else {
                    let amount = parseFloat(this.fromAmount);
                    const coin = this.currencyRates.find(coin => coin.currceyname == this.fromCurrencyObj?.fcurrencyname?.toLowerCase()) || {}
                    const currency = this.currencyRates.find(currency => currency.currceyname == this.toCurrencyObj?.name?.toLowerCase()) || {}
                    const coinRate = coin.price * amount
                    const currencyRate = currency.price
                    this.toAmount = parseFloat(coinRate * currencyRate).toFixed(2)

                }
            }
        },
        updateFromRoute(obj) {
            if (this.isSwaped) {
                const slug = `${obj.name}-to-${this.tcurrency}`.toLowerCase();
                return this.$router.push("/calculator/" + slug)
            } else {
                const slug = `${obj.fcurrencyname}-to-${this.tcurrency}`.toLowerCase();
                return this.$router.push("/calculator/" + slug)
            }
        },
        updateToRoute(obj) {
            if (this.isSwaped) {
                const slug = `${this.fcurrency}-to-${obj.fcurrencyname}`.toLowerCase();
                return this.$router.push("/calculator/" + slug)
            } else {
                const slug = `${this.fcurrency}-to-${obj.name}`.toLowerCase();
                return this.$router.push("/calculator/" + slug)
            }
        },
        getRate() {
            this.$store.dispatch('quotation_getrateinfo_get')
                .then((res) => {
                    this.currencyRates = res.data
                })
        },
        swap() {
            const slug = `${this.tcurrency}-to-${this.fcurrency}`.toLowerCase()
            return this.$router.push("/calculator/" + slug)
        },
    },


    mounted() {
        this.getRate()
    },
}
</script>

<style lang="scss">
@use '@/assets/scss/components/app/fiat-calculator.scss';
</style>