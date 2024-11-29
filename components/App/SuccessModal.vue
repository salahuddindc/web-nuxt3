<template>
    <div class="apply-success-modal">
        <a-modal id="agent-apply-modal" v-model="show" :footer="false" :title="false" @cancel="close" width="400px"
            :maskClosable="false" centered :class="modalClass" :getContainer="getContainer">
            <a-row>
                <a-col :lg="24" align="center">
                    <img :src="image" />

                    <p class="success-txt fw-5 pt-3 mb-2 pb-1 text-center" v-if="successModel.heading">{{
                        successModel.heading }}</p>

                    <p class="success-desc fw-5 text-center mb-4">{{ successModel.message }}</p>

                </a-col>
            </a-row>

            <a-row :gutter="16">
                <a-col :lg="12" class="text-right" v-if="showCancel">
                    <a-button class="fw-5 cancel-outline-btn" block @click="$emit('onCancel')">
                        {{ cancelText || $t('legalTrad.Cancel') }}
                    </a-button>
                </a-col>
                <a-col :lg="showCancel ? 12 : 24">

                    <a-button class="primary-btn fw-5" block @click="ok()">{{ okText || 'Ok' }} </a-button>
                </a-col>
            </a-row>

        </a-modal>
    </div>
</template>

<script>
export default {
    name: "SuccessModal",
    props: {
        successModel: {
            type: Object, //{heading:'', message:''}
        },
        image: {
            type: String,
            default: '/images/success-img.svg'
        },
        show: {
            type: Boolean,
            default: false
        },
        okText: {
            type: String,
            default: null
        },
        showCancel: {
            type: Boolean,
            default: false
        },
        cancelText: {
            type: String,
            default: null
        },
        modalClass: {
            type: String,
            default: null
        },
        getContainer: {
            type: Function,
            default: () => { }
        }
    },
    emits: ['onClose', 'onOk'],

    methods: {
        close() {
            this.$emit('onClose')
        },
        ok() {
            this.$emit('onOk', true)
        }
    },
}
</script>

<style lang="scss">
@use '@/assets/scss/components/modals/success.scss';
</style>
