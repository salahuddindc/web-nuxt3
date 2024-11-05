<template>
    <div>
        footer
    </div>
</template>

<script>
export default {
    data() {
        return {
            checkPubsubSubscription: null
        }
    },
    methods: {
        subscribeToPubSub() {
            // Store the subscription reference to unsubscribe later
            this.checkPubsubSubscription = this.$pubsub.subscribe('checkPubsub', (topic, value) => {
                console.log('In Footer component coming from Header: ', topic, 'value:', value)
            });
        }
    },


    mounted() {
        this.subscribeToPubSub()
    },

    unmounted() {
        this.$pubsub.unsubscribe(this.checkPubsubSubscription);
    }

}
</script>

<style lang="scss" scoped></style>