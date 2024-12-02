<template>
  <div ref="home" id="home">
    <HomeNewHome />
  </div>
</template>
<script>

export default {
  setup() {
    useHead({
      bodyAttrs: {
        class: 'home-page-body',
      },
    })
  },
}
</script>
<style lang="scss">
@use '@/assets/scss/pages/new-home/home.scss';
</style>
