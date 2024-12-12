<template>
    <div class="popular-crypto-conversions mt-8">
        <a-card :bordered="false" :bodyStyle="{ padding: '24px' }">
            <h2 class="fw-5 secondary-black mb-md-0 mb-sm-4 text-center lh-lg-47 lh-md-35 lh-sm-35 lh-xs-28 font-sm-28 font-xs-22">{{ $t('convert.popular_crypto') }}</h2>
            <a-row :gutter="16" type="flex" align="middle">
                <a-col :xs="12" :sm="8" :md="6" :lg="3" v-for="(list, key) in popularCurrencies" :key="key" class="mt-6">
                    <h6 class="lh-20 secondary-gray mb-0 fw-4 col-alignment"><img :src="list.icon" height="24px"
                            class="mr-3" />{{ list.fullname }}</h6>
                </a-col>
            </a-row>
        </a-card>
    </div>
</template>

<script>
export default {
    props: {
        cryptoCurrencies: {
            type: Array
        }
    },
    data() {
        return {
            popularCryptoConversions: this.$store.state.currencyinfos
        }
    },
    computed:{
        popularCurrencies() {
            return this.popularCryptoConversions.filter((coin) => {
                return this.cryptoCurrencies.some((cryptoCurrency) => {
                    return coin.currencyname === cryptoCurrency.fcurrencyname;
                });
            });
        }
}
}
</script>

<style></style>