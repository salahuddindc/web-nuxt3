<template>
    <div id="crypto-listing">
        <FooterModuleCryptoListingSteps />
    </div>
</template>

<script>
export default {
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            if (!vm.$userinfo?.uid) {
                vm.$router.push(`/login?returnurl=${to.fullPath}`);
            }
        });
    }
};
</script>

<style lang="scss">
@use '@/assets/scss/pages/footer/crypto-listing.scss';
</style>
