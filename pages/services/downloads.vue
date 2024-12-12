<template>
    <div id="new-download">
        <!-- <NewDownloads /> -->
    </div>
</template>

<script setup>
//     import NewDownloads from '@/components/Download/NewDownloads.vue'

//   export default {
//   components: {
//       NewDownloads
//   },
//   head() {
//       return {
//         bodyAttrs: {
//           class: 'downloads-body',
//         }
//       }
//     },
//   }

useHead({
    bodyAttrs: {
        class: "downloads-body",
    },
});
</script>

<style lang="scss">
@use '@/assets/scss/pages/download/new-download.scss';
</style>