<template>
  <div>

  </div>
</template>

<script>
export default {
  methods: {
    getSymbols() {
      
      const j = {}
      console.log('getSymbols', j, this.$store);
      
      this.$store.dispatch('setUserInput', j)
    }
  },
  mounted() {
    this.getSymbols();
    // getSymbolInfos()
  },

}
</script>

<style lang="scss" scoped></style>