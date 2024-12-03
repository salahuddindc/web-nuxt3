<template>
    <a-row :gutter="[24,24]">
        <a-col :xs="24" :sm="12" :md="12" :lg="6" v-for="(list, key) in affiliateEasy" :key="key">
        <a-card class="card-border">
        <img :src="list.img" alt="">
        <h6 class="secondary-black fw-5 my-3">{{ list.title }}</h6>
        <p class="secondary-black fw-4 mb-0">{{ list.subTitile }}</p>
            
        </a-card>
        </a-col>
    </a-row>
</template>

<script>
export default {
    data() {
        return {
            affiliateEasy: [
                {
                    img: '/images/discount-shape.svg',
                    title: this.$t('agent_plan.ap17'),
                    subTitile: this.$t('agentcard.subtitle1')
                },
                {
                    img: '/images/ranking1.svg',
                    title: this.$t('agent_plan.ap5'),
                    subTitile: this.$t('agentcard.subtitle2')
                },
                {
                    img: '/images/presention-chart1.svg',
                    title: this.$t('agent_plan.ap15'),
                    subTitile: this.$t('agentcard.subtitle3')
                },
                {
                    img: '/images/card1.svg',
                    title: this.$t('agent_plan.ap16'),
                    subTitile: this.$t('agentcard.subtitle4')
                }
            ],
            earnCommissionDetail: [
            {
                    num: '01',
                    title: this.$t('agent_plan.ap9'),
                    desc: this.$t('agent_plan.ap10'),
                    isSubmitForm:true
                },
                {
                    num: '02',
                    title: this.$t('agent_plan.ap11'),
                    desc: this.$t('agent_plan.ap12'),
                    isSubmitForm:false
                },
                {
                    num: '03',
                    title: this.$t('agent_plan.ap13'),
                    desc: this.$t('agent_plan.ap14'),
                    isSubmitForm:false
                },
            ]
        }
    }
}
</script>

<style></style>
