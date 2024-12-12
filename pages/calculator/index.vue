<template>
    <div id="calculator">
        <Calculator />
    </div>
</template>

<script>

export default {
    setup() {
        useHead({
            bodyAttrs: {
                class: 'calculator-body',
            },
        })
    },
}
</script>


<style lang="scss">
@use '@/assets/scss/pages/calculator/calculator.scss';
</style>
