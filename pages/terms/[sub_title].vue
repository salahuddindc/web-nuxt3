<template>
  <div id="user-agreement" class="main-content">
    <FooterModuleArticleDetail />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { webFooterArticle } from '~/utils/constants'
export default {

  data() {
    return {
      subtitleFromURL: null, // Initialize the subtitle as null
    };
  },
  watch: {
    // Watch for changes in the route's path and update the subtitleFromURL data
    '$route.params': {
      handler(to) {
        const subtitle = to.sub_title; // Access the dynamic subtitle from the URL params
        this.fetchChannelInfo({ channelID: webFooterArticle, subTitle: subtitle })
      },
      deep: true,
      immediate: true, // Trigger the handler immediately when the component is mounted
    },
  },

  methods: {
    ...mapActions('article', ['fetchChannelInfo']),
  },
}

</script>

<style lang="scss">
@use '@/assets/scss/pages/footer/user-agreement.scss';
</style>
