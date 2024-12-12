<template>
  <div class="popular-fiat-conversions mt-8">
    <a-card :bordered="false" :bodyStyle="{ padding: '24px' }">
      <h2 class="fw-5 secondary-black mb-md-0 mb-sm-4 text-center lh-lg-47 lh-md-35 lh-sm-35 lh-xs-28 font-sm-28 font-xs-22">{{ $t('convert.popular_fiat',{ coin: fullName}) }}</h2>
      <div class="fiat-conversion" v-for="index in 2" :key="index">
        <div class="fiat-currency" v-for="(coin, innerIndex) in exchangeCurrencies.slice(index * 9, (index + 1) * 9)"
          :key="innerIndex">
          
          <h6 class="fw-4 lh-20 secondary-gray mb-0 pointer" @click="redirect(coin.name)">{{ activeCoin }} To {{ coin.name }}</h6>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
export default {
  props: ["activeCoin", "exchangeCurrencies", "fullName"],
  methods:{
    redirect(coin){
      const slug = `${this.activeCoin}-to-${coin}`;
                return this.$router.push("/calculator/" + slug)
    }
  }
}
</script>

<style></style>