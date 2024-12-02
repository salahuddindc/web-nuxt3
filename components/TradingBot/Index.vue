<template>
    <div class="strategy-bot">
        <div class="strategy-bot-bg">
            <div class="main-content">
                <a-row :gutter="16" type="flex" align="middle">
                    <a-col :sm="10" :lg="10" :xl="10">
                        <p class="strategy-bot-title fw-5 mb-1">
                            {{ $t("stratergybot.sb1") }}
                        </p>
                        <p class="strategy-bot-desc fw-4">
                            {{ $t("stratergybot.sb2") }}
                            {{ $t("stratergybot.sb3") }}
                        </p>

                        <a-row class="mt-4">
                            <a-col :lg="24">
                                <a-button class="primary-btn fw-5 mr-1">
                                    <nuxt-link :to="selfRoute.dealPro +
                                        `/btc_usdt?strategy-bot-id=${defaultStategyBot}`
                                        ">
                                        {{ $t("stratergybot.sb4") }}
                                    </nuxt-link>
                                </a-button>
                                <a-button class="cancel-outline-btn fw-5 ml-2 px-4">
                                    <nuxt-link :to="selfRoute.helpCenter">
                                        {{ $t("stratergybot.sb5") }}
                                    </nuxt-link>
                                </a-button>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col :sm="14" :lg="14" align="end" class="strategy-bot-banner">
                        <img src="/images/strategy-bot12.svg" />
                    </a-col>
                </a-row>
            </div>
        </div>
        <div class="grid-bot">
            <div class="bg-white">
                <div class="main-content">
                    <a-row class="py-3">
                        <a-col :lg="24">
                            <BannerArticleNew />
                        </a-col>
                    </a-row>
                </div>
            </div>
            <!-- GRIDBOTDETAIL STARTED -->
            <div class="main-content">
                <a-row>
                    <a-col :lg="24">
                        <h2 class="lh-46 secondary-black fw-5 mt-4 mb-8">{{ $t('copytrade.create_my_bot') }}</h2>
                    </a-col>
                </a-row>
                <a-row :gutter="[40,40]" class="grid-bot-row">
                    <a-col :xs="24" :sm="12" :lg="8" v-for="(list, key) in gridBotDetail" :key="key">
                        <a-card :bordered="false" class="grid-bot-card">
                            <span @mouseover="hoverKey = key" @mouseleave="hoverKey = -1">
                                <a-row :gutter="16" class="col-alignment mb-2">
                                    <a-col :sm="12" :lg="12" class="bot-title mb-0">
                                        <img :src="list.img" class="list-bot-img" />
                                    </a-col>
                                    <a-col :sm="12" :lg="12" align="end">
                                        <nuxt-link :to="list.tradeBoardLink">
                                            <p class="mb-0"><span class="create-btn">{{ $t("legalTrad.Create") }}</span>
                                                <img :src="hoverKey == key ? '/images/arrow-create-active.png' : '/images/arrow-create.svg'"
                                                    alt="" />
                                            </p>
                                        </nuxt-link>
                                    </a-col>
                                </a-row>
                                <a-row :gutter="16" class="mb-3">
                                    <a-col :lg="24" :xxl="24">
                                        <h5 class="mb-3 lh-29 secondary-black fw-5">
                                            {{ list.title }}
                                        </h5>
                                        <p class="mb-0 secondary-gray grid-bot-desc font-14 fw-5 lh-20">
                                            {{ list.desc }}
                                        </p>
                                    </a-col>
                                </a-row>
                                <a-row :gutter="16" class="col-alignment">
                                    <a-col :sm="12" :lg="12">
                                        <p class="mb-1 lh-20 font-14 secondary-gray fw-5">
                                            {{ $t("stratergybot.sb6") }}
                                        </p>
                                        <p class="mb-0 lh-20 font-14 secondary-gray fw-5">
                                            {{ $t("stratergybot.sb7") }}
                                        </p>

                                    </a-col>
                                    <a-col :sm="12" :lg="12" align="end">
                                        <h6 class="running-bot fw-6 success-active mb-1 lh-23">
                                            {{ list.annualinterestrate }}%
                                        </h6>
                                        <h6 class="running-bot fw-6 mb-0 lh-23">
                                            {{ list.runningbots }}
                                        </h6>
                                    </a-col>
                                </a-row>
                            </span>
                        </a-card>
                    </a-col>
                </a-row>
            </div>
        </div>
        <!-- GRIDBOTDETAIL ENDED -->



        <!-- STRATEGYBOTTABLE STARTED -->

        <div class="grid-spot-bg mt-8">
            <div class="main-content">
                <a-card class="main-card" :bordered="false" :bodyStyle="{ padding: '25px 0' }">
                    <div :bordered="false" class=" grid-spot-card">
                        <a-tabs :defaultActiveTabKey="activeTab" v-model="tab">
                            <a-tab-pane v-for="tab in tabs" :key="tab.key">
                                <span slot="tab" @click="setActiveTab(tab.key)">
                                    {{ tab.title }}
                                    <p v-show="isActiveTab(tab.key)" class="bottom-line"></p>
                                </span>
                                <!-- THE KEY IS SET TO 1-SPOT,2-MARGIN,3-FUTURE AS IT IS RECOGNIZED BY API OF GETTING BOT DATA  -->
                                <TradingBotTable :strategyType="tab.key" />
                            </a-tab-pane>
                        </a-tabs>

                    </div>
                </a-card>
            </div>
        </div>


        <!-- STRATEGYBOTTABLE STARTED -->
        <!-- FAQ   STARTED -->
        <div class="faqs-bg mt-8 mb-20">
            <div class="main-content">
                <a-card :bordered="false" class="bot-faqs-card">
                    <Faqs :channelid="strategyBotChannel" :subtitle="channelSubtitle.strategyBotSubtitle"
                        :faqsPerPage="10" />
                </a-card>

            </div>
        </div>
        <!-- FAQ  STARTED -->
    </div>
</template>

<script>
import Faqs from "@/components/public/Faqs.vue";
import TradingBotTable from "./TradingBotTable.vue";
import { btcStrategyBot, homeBannerChannelId } from "~/plugins/constants";
import BannerArticleNew from "@/components/NewHome/banner-article.vue";
import { mapActions, mapGetters } from "vuex";
import { strategyBotChannel, channelSubtitle } from "~/plugins/constants";



export default {
    components: {
        Faqs,
        TradingBotTable,
        BannerArticleNew,
    },
    data() {
        return {
            // imageUrl: '/images/spot-card-bg.png',
            // List of image URLs
            // imageList: [
            //     '/images/spot-card-bg1.png',
            //     '/images/spot-card-bg2.png',
            //     '/images/spot-card-bg.png'
            // ],
            currentImageIndex: 0,
            tab: 1,
            hoverKey: -1,
            activeTab: 1,
            strategyBotChannel: strategyBotChannel,
            channelSubtitle: channelSubtitle,
            tabs: [
                { key: 1, title: this.$t("stratergybot.sb10") },
                { key: 2, title: this.$t("stratergybot.sb11") },
                { key: 3, title: this.$t("stratergybot.sb12") },
            ],
            swiperBannel: [],
        };
    },
    computed: {
        ...mapGetters("constants", ["getstrategies"]),
        selfRoute: function () {
            return this.$store.state.route;
        },
        defaultStategyBot() {
            return btcStrategyBot;
        },
        gridBotDetail() {
            if (this.getstrategies.length > 0) {
                return JSON.parse(this.getstrategies).map((item) => {
                    switch (item.type) {
                        case "spot":
                            item.img = "/images/strategy-spot-grid.svg";
                            item.title = this.$t("stratergybot.sb10");
                            item.desc = this.$t("stratergybot.sb13");
                            item.tradeBoardLink =
                                this.selfRoute.dealPro +
                                `/btc_usdt`;
                            break;

                        case "margin":
                            item.img = "/images/strategy-margin-grid.svg";
                            item.title = this.$t("stratergybot.sb11");
                            item.desc = this.$t("stratergybot.sb14");
                            item.tradeBoardLink =
                                this.selfRoute.marginPro +
                                `/btc_usdt`;
                            break;
                        case "future":
                            item.img = "/images/strategy-future-grid.svg";
                            item.title = this.$t("stratergybot.sb12");
                            item.desc = this.$t("stratergybot.sb15");
                            item.tradeBoardLink =
                                this.selfRoute.futurePro +
                                `/btc_yx`;
                            break;

                        default:
                            break;
                    }

                    // item.img = item.type == 'spot' ? '/images/spot-grid.svg' : (item.type == 'margin') ? '/images/margin-grid.svg' : '/images/future-grid.svg';
                    // item.title = item.type == 'spot' ? this.$t('stratergybot.sb10') : (item.type == 'margin') ? this.$t('stratergybot.sb11') : this.$t('stratergybot.sb12');
                    // item.desc = item.type == 'spot' ? this.$t('stratergybot.sb13') : (item.type == 'margin') ? this.$t('stratergybot.sb14') : this.$t('stratergybot.sb15');
                    return item;
                });
            }
            return []


        }
    },
    watch: {
        activeTab(val) {
            this.$router.push({ query: { tab: val } });
        },
        '$route.query.tab'(newTab) {
            this.setActiveTab(Number(newTab));
        }
    },
    methods: {
        ...mapActions("article", ["fetchArticles"]),
        //GETTING GRIDBOTDETAIL FROM API AND  SETTING IMAGE TITLE AND DESC ACCORDING TO TYPE (SPOT,MARGIN,FUTURE)
        getarticle() {
            this.fetchArticles({
                channelid: homeBannerChannelId,
                pageindex: 1,
                pagesize: 12,
            }).then((artical) => {
                console.log('artical', artical);
                this.swiperBannel =
                    artical.data && artical.data.pagedata
                        ? artical.data.pagedata
                        : [];
            });
        },
        setActiveTab(tabKey) {
            this.activeTab = tabKey;
            this.tab = tabKey

        },
        isActiveTab(tabKey) {
            return this.activeTab === tabKey;
        },
    },
    mounted() {
        this.getarticle();

        const tabKey = this.$route.query.tab;
        if (tabKey) {
            this.setActiveTab(Number(tabKey));
        }
    },

};
</script>

<style></style>
