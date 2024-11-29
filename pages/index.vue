<template>
  <div ref="home" id="home">
    <NewHome />
  </div>
</template>
<script>
import NewHome from '~/components/Home/NewHome.vue';
export default {
  name: "HomePage",
  components: {
    NewHome
  },
};
</script>
<style lang="scss">
@use '@/assets/scss/pages/new-home/home.scss';
</style>
