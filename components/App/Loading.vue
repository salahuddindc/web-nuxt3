<template>
    <a-spin
        :style="`display:${display}; justify-content:${position}; align-items:center; background:${backgroundColor}; height:${height}`">
        <a-icon slot="indicator" type="loading" :style="`font-size: ${iconSize};` " spin />
    </a-spin>
</template>

<script>
export default {
    props: {
        height: {
            type: String,
            default: '90vh'
        },
        position: {
            default: 'center'
        },
        display: {
            default: 'flex',
        },
        backgroundColor: {
            default: '#FDFDFD',
            type: String
        },
        iconSize: {
            type: String,
            default: '24px' 
        }
    },
}
</script>

<style lang="scss" scoped></style>
