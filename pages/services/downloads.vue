<template>
    <div id="new-download">
        <DownloadNewDownloads />
    </div>
</template>

<script setup>
 
useHead({
    bodyAttrs: {
        class: "downloads-body",
    },
});
</script>

<style lang="scss">
@use '@/assets/scss/pages/download/new-download.scss';
</style>