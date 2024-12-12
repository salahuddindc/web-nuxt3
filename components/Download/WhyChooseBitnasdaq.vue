<template>
    <div class="why-choose-bitnasdaq">
        <h2 class="fw-5 mt-lg-12 mt-md-12 mt-sm-8 mt-xs-8 lh-lg-40 lh-md-35 font-lg-32 lh-md-28 text-center lh-sm-24 font-md-28 font-sm-24 font-xs-20 secondary-black mb-3">
            {{$t('down_load.dow9')}}</h2>
        <a-row>
            <a-col :xs="{span: 20, offset: 2 }" :sm="{span: 16, offset: 4 }" :md="{span: 14, offset: 5 }" :lg="{span: 22, offset: 1 }" :xl="{span: 16, offset: 4 }" :xxl="{span: 14, offset: 5 }">
                <a-row>
                    <a-col :md="24" :lg="8" align="center" v-for="(list, key) in getBitnasdaqList" :key="key">
                        <a-card :bordered="false" class="list-card">
                        <img :src="list.img" height="100px"/>
                        <h5 class="list-title fw-5 secondary-black">{{ list.title }}</h5>
                        <p class="list-desc secondary-black mb-0">{{ list.desc }}</p>
                    </a-card>
                    </a-col>
                </a-row>
            </a-col>
        </a-row>

    </div>
</template>

<script>
export default {
    data() {
        return {
            getBitnasdaqList: [
                {
                    img: '/images/best-security.svg',
                    title: this.$t('down_load.dow15'),
                    desc: this.$t('down_load.dow16')
                },
                {
                    img: '/images/fastest-trades.svg',
                    title: this.$t('down_load.dow22'),
                    desc: this.$t('down_load.dow17')
                },
                {
                    img: '/images/lowest-fees.svg',
                    title: this.$t('down_load.dow18'),
                    desc: this.$t('down_load.dow19')
                }
            ]
        }
    }
}
</script>

<style></style>