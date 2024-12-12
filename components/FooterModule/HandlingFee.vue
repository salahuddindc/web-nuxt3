<template>
    <div class="handling-fee">
        <div class="handling-fee-bg">
            <div class="main-content">
                <a-row>
                    <p class="mb-2 main-heading fw-5 font-heading">{{ $t('handelingFee.hf1') }}</p>
                    <a-col :lg="16" :xl="6">
                        <p class="mb-0 title-dec fw-4">
                            {{ $t('handelingFee.hf2') }}
                        </p>
                    </a-col>
                </a-row>
            </div>
        </div>
        <div class="main-content">
            <a-row class="pt-8" :gutter="16">
                <a-col :md="24" :lg="15">
                    <p class="sub-heading mb-2 fw-5 font-heading">{{ $t('handelingFee.hf3') }}</p>
                    <p class="mb-0 text-desc text-black fw-4 pb-6">{{ $t('handelingFee.hf4') }}</p>
                    <a-tabs v-model="activeTab" hide-add @change="tabChanged" class="handling-fee-tabs">
                        <a-tab-pane v-for="(product, i) in getHandlingFeeList" :key="i" :tab="product.title"
                            @click="termChange(item_index, i)">
                            <p class="mt-5 tabs-title mb-2 fw-5 font-heading">{{ product.title }}</p>
                            <p class="mb-0 text-desc">{{ product.desc }}</p>
                        </a-tab-pane>
                    </a-tabs>
                </a-col>
                <a-col :md="24" :lg="9" align="center">
                    <img src="/images/top-tier-exchange.svg" class="tier-exchange-img" />
                </a-col>
            </a-row>
        </div>

        <div class="handlingfee-detail">
            <div class="main-content">
                <!-- <a-row >
                    <a-col :lg="13">

                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :lg="6" v-for="(list, key) in getHandlingFeeList" :key="key" class="pr-4">
                        <p class="mb-3 sub-text fw-5"> <img :src="list.img" height="24px" class="mr-2" />{{ list.title
                        }}</p>
                        <p class="mb-0 title-desc">{{ list.desc }}</p>
                    </a-col>
                </a-row> -->
                <a-row :gutter="16" class="pt-8 pb-6">
                    <a-col :lg="24">
                        <VipProgramVipTabs />
                    </a-col>
                </a-row>
                <div class="pb-6">
                    <div class="hadling-service">
                        <a-row :gutter="16" class="px-5 mx-3 col-alignment cost-effective-row">
                            <a-col :sm="24" :md="18" :lg="18">
                                <p class="cost-effective mb-2 fw-5">{{ $t('handelingFee.hf5') }}</p>
                                <p class="bitnasdaq-desc mb-0"> {{ $t('handelingFee.hf66') }} <a href="/help-center">
                                        {{ $t('express.help_center') }}
                                    </a> {{ $t('handelingFee.hf6') }} <a
                                        href="mailto:service@bitnasdaq.com">service@bitnasdaq.com</a></p>
                            </a-col>
                            <a-col :sm="24" :md="6" :lg="6">
                                <nuxt-link to="/help-center"> <a-button class="primary-btn fw-5 help-btn mt-0 px-5">{{
                                    $t('community.com10') }}</a-button></nuxt-link>
                            </a-col>
                        </a-row>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {

    data() {
        return {
            activeTab: 0,
            getHandlingFeeList: [
                {
                    title: this.$t('handelingFee.hf8'),
                    desc: this.$t('handelingFee.hf9')
                },
                {
                    title: this.$t('handelingFee.hf10'),
                    desc: this.$t('handelingFee.hf11')
                },
                {
                    title: this.$t('handelingFee.hf12'),
                    desc: this.$t('handelingFee.hf13')
                },
                {
                    title: this.$t('handelingFee.hf14'),
                    desc: this.$t('handelingFee.hf15')
                }
            ],
            vipColumns: [
                {
                    title: this.$t('handelingFee.hf16'),
                    dataIndex: 'vipLevel',
                    scopedSlots: { customRender: 'vipLevel' },
                    width: 180,
                },
                {
                    title: this.$t('handelingFee.hf17'),
                    dataIndex: 'recharge',
                    width: 160,
                    align: 'center'

                },
                {
                    title: 'OR',
                    dataIndex: 'or',
                    width: 100,
                    scopedSlots: { customRender: 'or' },
                    align: 'center'

                },
                {
                    title: this.$t('handelingFee.hf18'),
                    dataIndex: 'tradingVolume',
                    width: 200,
                    align: 'center'

                },
                {
                    title: this.$t('tableskeys.vt3'),
                    dataIndex: 'or1',
                    width: 100,
                    scopedSlots: { customRender: 'or1' },
                    align: 'center'

                },
                {
                    title: this.$t('handelingFee.hf19'),
                    dataIndex: 'tradingUsdt',
                    width: 180,
                    align: 'center'

                },
            ],
            vipData: [
                {
                    recharge: '100,000',
                    tradingVolume: '100,000-200,000',
                    tradingUsdt: '200,000-500,000'

                },
                {
                    recharge: '100,000',
                    tradingVolume: '100,000-200,000',
                    tradingUsdt: '200,000-500,000'

                },
                {
                    recharge: '100,000',
                    tradingVolume: '100,000-200,000',
                    tradingUsdt: '200,000-500,000'

                },
                {
                    recharge: '100,000',
                    tradingVolume: '100,000-200,000',
                    tradingUsdt: '200,000-500,000'

                },
                {
                    recharge: '100,000',
                    tradingVolume: '100,000-200,000',
                    tradingUsdt: '200,000-500,000'

                },
                {
                    recharge: '100,000',
                    tradingVolume: '100,000-200,000',
                    tradingUsdt: '200,000-500,000'

                },
                {
                    recharge: '100,000',
                    tradingVolume: '100,000-200,000',
                    tradingUsdt: '200,000-500,000'

                },
            ]
        }
    },
    methods: {
        tabChanged(tab) {
            console.log(tab);
        },
    }
}
</script>

<style></style>
