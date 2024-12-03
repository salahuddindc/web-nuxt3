<template>
    <div id="affiliate-program">
        <AffiliateProgram />
    </div>
</template>

<script>
export default {
    setup() {
        useHead({
            bodyAttrs: {
                class: 'affiliate-program-body',
            },
        })
    },
}
</script>

<style lang="scss">
@use '@/assets/scss/pages/footer/affiliate-program.scss';
</style>