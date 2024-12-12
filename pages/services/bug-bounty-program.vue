<template>
  <div id="bug-bounty">
    <span v-if="IsAvailable">
      <FooterModuleBugBounty />
    </span>
    <span v-else>
      <CommingSoon />
    </span>
  </div>
</template>

<script>

import CommingSoon from '@/components/FooterModule/CommingSoon.vue'
export default {
  components: {
    CommingSoon
  },
  data() {
    return {
      IsAvailable: false
    }
  },
}
</script>

<style lang="scss">
@use '@/assets/scss/pages/footer/bug-bounty.scss';
</style>