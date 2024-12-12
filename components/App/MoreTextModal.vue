<template>
    <a-modal :visible="localShow" :footer="false" id="more-text-modal" centered :title="false" @cancel="close" width="450px">
        <a-row class="col-alignment mb-3">
            <a-col :lg="12">
                <p class="title-text mb-0 fw-6 text-black"> {{ title }} </p>

            </a-col>
            <a-col :lg="12" align="end" class="pointer">
                <img src="/images/ud-cross.svg" @click="close()" class="pointer " />
            </a-col>
        </a-row>
        <p class="desc-text fw-4"> {{ text }} </p>
    </a-modal>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
        },
        title: {
            type: String,
            default: ''
        },
        text: {
            type: String,
            default: null
        }
    },
    data() {
        return {
            localShow: false
        }
    },
    watch: {
        show: {
            handler: function (newValue, oldValue) {
                this.localShow = newValue
            },
            immediate: true

        }
    },
    methods: {
        close() {
            this.$emit("close")
        }
    }
};
</script>
<style lang="scss">
.title-text {
    font-size: 18px;
}

.desc-text {
    color: #718096;
}
</style>
