<template>
    <a-form-item has-feedback :label="label" :name="name" :colon="false" :wrapper-col="{
        xl: 24,
        lg: 24,
        md: 24,
        sm: 24,
        xs: 24,
    }">
        <slot />
    </a-form-item>
</template>

<script>
export default {
    name: 'AppFormModelItem',
    props: {
        label: {
            type: Number | String,
            default: null
        },
        name: {
            type: String,
            default: null
        }
    },
}
</script>

<style lang="scss" scoped></style>