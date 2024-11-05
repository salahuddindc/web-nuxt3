<template>
    <div>


        <NuxtLink href="/">
            home
        </NuxtLink>
        <NuxtLink href="/about">
            about
        </NuxtLink>

        <button @click="checkPubsub">
            check pubsub
        </button>

    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        checkPubsub() { 
            this.$pubsub.publish('checkPubsub', { id: 1, name: 'Salah-ud-Din' })
        }
    },



}
</script>

<style lang="scss" scoped>
a {
    font-size: 22px;
}
</style>