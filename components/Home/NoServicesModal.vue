<template>
     <a-modal
      :header="null"
      :visible="visible" :footer="null" :centered="true" :closable="false" width="404px" wrapClassName="no-services-modal"
    >
      <a-row :gutter="[0,24]">
        <a-col :xs="24">
            <img src="/images/no-serve.svg" alt="">
        </a-col>
        <a-col :xs="24">
            <p class="notice-headig fw-6 mb-0">
                Important Notice
            </p>
        </a-col>
        <a-col :xs="24">
            <p class="notice-desc mb-0 fw-4">
                {{$t('no_service')}}
                </p>
        </a-col>
        <a-col :xs="24">
            <a-button class="primary-btn" @click="closeModal">Okay</a-button>
        </a-col>
      </a-row>
    </a-modal>
</template>
<script>
export default {
    props:{
        visible:{
            type: Boolean,
            default: false
        }
    },
    methods:{
        closeModal(){
            this.$emit('onClose');
        }
    }
}
</script>
<style lang="scss">
.no-services-modal{
    .ant-modal-content{
    border-radius: 24px !important;
}
.ant-modal-body{
    padding: 43px 28px !important;
}
.ant-row{
    text-align: center;
}
.notice-headig{
    line-height: 24px;
    font-size: 24px;
    color: #081131;
}
.notice-desc{
    line-height: 24.32px;
    font-size: 16px;
    color: #718096;
    text-align: start;
}
.primary-btn{
    width: 100%;
    height: 45px;
}
@media screen and (max-width:1024px) {
    .notice-headig{
    line-height: 18px;
    font-size: 18px;
}
.notice-desc{
    line-height: 20px;
    font-size: 12px;
}
}
}

</style>