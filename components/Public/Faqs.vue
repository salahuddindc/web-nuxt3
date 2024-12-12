<template>
    <div id="faqs">
        <AppLoading height="50vh" v-if="loading" />
        <div v-else>
            <p class="faqs-txt fw-5 mb-2">{{ $t("returntxt.rtxt32") }}</p>
            <a-collapse :expand-icon-position="expandIconPosition">
                <template #expandIcon="props">
                    <MinusOutlined v-if="props.isActive" />
                    <PlusOutlined v-else />
                </template>
                <a-collapse-panel v-for="(item, index) in displayedFaqs" :key="item.number"
                    :class="index < faqsItem.length - 1 ? 'faqs-item' : ''">
                    <template #header>
                        <div class="faq-header fw-5">
                            <div class="pr-1">{{ item.number ? item.number : index + 1
                                }}.</div>
                            <div class="fw-5">{{ item.question }}</div>
                        </div>
                    </template>
                    <p class="mb-0">{{ item.answer }}</p>
                </a-collapse-panel>
            </a-collapse>
            <div class=" pl-3 pb-4 text-right mt-3" v-if="faqsItem.length > faqsPerPage && hasPagination">

                <a-pagination v-model="currentPage" :total="faqsItem.length" :page-size="faqsPerPage"
                    @change="handChange" show-less-items />
            </div>
        </div>
    </div>
</template>

<script>


import { mapGetters, mapActions } from 'vuex'

export default {
    props: {
        channelid: {
            type: [Number, String],
            required: true
        },
        hasPagination: {
            type: Boolean,
            default: () => true
        },
        subtitle: {
            type: String,
            required: true
        },
        selectedIndex: {
            type: Number,
            default: 1
        },
        faqsPerPage: {
            type: Number,
            default: 6 // Adjust the page size as needed
        },

        hasCalculatorFaqs: {
            type: Boolean,
            default: false
        },
        calculatorFaqsOptions: {
            type: Object,
            default: () => {
                return {
                    coin: 'BTC',
                    fiat: "USD"
                }
            }
        },

    },

    data() {
        return {
            activeKey: [],
            faqsItem: [],
            loading: true,
            currentPage: 1,
            expandIconPosition: 'right',
        };
    },
    watch: {
        activeKey(key) { },
        subtitle() {
            if (import.meta.client) {
                this.fetchArticleInfo()
            }
        },
        calculatorFaqsOptions: {
            handler: function (val) {
                if (import.meta.client) {
                    this.fetchArticleInfo()
                }
            },
            immediate: true
        },
    },
    computed: {
        ...mapGetters("article", ["getFaqs"]),
        displayedFaqs() {
            const startIndex = (this.currentPage - 1) * this.faqsPerPage;
            const endIndex = startIndex + this.faqsPerPage;
            return this.faqsItem.slice(startIndex, endIndex);

        },
    },
    methods: {
        ...mapActions("article", ["fetchFaqs"]),
        async fetchArticleInfo() {
            let pastData = {
                channelid: this.channelid,
                articeid: 0,
                subtitle: this.subtitle,
            };
            if (this.hasCalculatorFaqs) {
                pastData.isCalculator = this.hasCalculatorFaqs,
                    pastData.coin = this.calculatorFaqsOptions.coin,
                    pastData.fiat = this.calculatorFaqsOptions.fiat
            }
            try {
                this.loading = true;
                const ss = await this.fetchFaqs(pastData)
                this.loading = false
                if (this.hasCalculatorFaqs) {
                    const activeCoin = this.getFaqs.find(
                        (coin) => coin?.coin == this.calculatorFaqsOptions.coin
                    );
                    const activeFiat = activeCoin?.fiats.find((fiat) => fiat?.name == this.calculatorFaqsOptions.fiat)
                    this.faqsItem = activeFiat?.name == this.calculatorFaqsOptions.fiat ? activeFiat.faqs : []
                }
                else {
                    this.faqsItem = this.getFaqs;
                }
            } catch (error) {
                console.error('Error fetching FAQs:', error);
            }
        },

        handChange(page) {
            this.currentPage = page;
        },
    },
    mounted() {
        this.currentPage = this.selectedIndex ? this.selectedIndex : 1
    },
};
</script>

<style lang="scss">
@use "~/assets/scss/components/faqs/faqs.scss";

.ant-collapse-arrow {
    font-size: 1rem !important;
}

.pagination {
    display: flex;
    align-items: center;
    justify-content: center;
}

.page-number {
    margin: 0 16px;
    font-size: 18px;
    font-weight: bold;
}
</style>
