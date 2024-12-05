<template>
    <div id="institution-service">
        <span v-if="IsAvailable">
            <InstitutionService />
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
            // text: ''
            IsAvailable: false
        }
    },
}
</script>

<style lang="scss">
@use '@/assets/scss/pages/institution-service/institution-service.scss';
</style>