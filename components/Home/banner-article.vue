<template>
    <a-card class="list-notifi" :bordered="false" v-show="subitems.length > 0">
        <div class="main-content">
            <a-row :gutter="16">
                <a-col :lg="24" :xl="24">

                    <a-carousel :autoplay="true" effect="fade" :dots="false">
                        <a-row v-for=" (a, index) in subitems" :key="index + Math.random()">
                            <div @click="goDetail(a)" class="pt-1">
                                <a-col :xs="18" :sm="19" :lg="20" :xl="20" class="pointer">
                                    <img src="/images/speaker.svg" class="pr-2" width="28" height="28" />
                                    <!-- <svg width="28" height="28" class="mr-2 svg-icon">
                                        <use xlink:href="/images/svg/sprite.svg#speaker-icon"></use>
                                    </svg> -->
                                    <a v-if="a.articlehref" :href="a.articlehref" target="_blank">{{
                                        a.title }}</a>
                                    <span v-else class="email-binding-txt">{{ a.title }}</span>
                                </a-col>
                                <a-col :xs="6" :sm="5" :lg="4" :xl="4" class="mt-1" align="end" @click="goDetail(a)">
                                    <a>
                                        <p class="read-more mb-0 pointer"> {{ $t('home_page.reade_more_home') }}
                                            <!-- <img
                                                src="/images/black-right-arrow.svg" class="ml-2" /> -->
                                            <svg width="15" height="15" class="ml-1 svg-icon">
                                                <use xlink:href="/images/svg/sprite.svg#black-right-arrow-icon"></use>
                                            </svg>
                                        </p>
                                    </a>
                                </a-col>
                            </div>
                        </a-row>
                    </a-carousel>
                </a-col>


            </a-row>
        </div>
    </a-card>
</template>

<script>
import { announcementId } from '~/plugins/constants';
import { mapState, mapActions, mapGetters } from "vuex";
export default {
    name: "banner-article",

    data() {
        return {
            lang: this.$store.state.hex_lang.locale
        }
    },

    watch: {
        '$store.state.hex_lang.locale': function (val) {
            this.lang = val;
            this.getList();
        }
    },
    computed: {
        ...mapState('article', ['announcements']),
        ...mapGetters("article", [
            "getAnnouncement",
            "subItemPagination",
            "getLatestArticles",
            "getArticleChildren",
        ]),
        subitems() {
            return this.getAnnouncement;
        },
    },

    mounted() {
        this.getList();
    },

    methods: {
        ...mapActions("article", [
            "fetchAnnouncement",
        ]),
        // 去详情
        goDetail(a) {
            if (a && a.redirectTo) {
                console.log('Redirecting to:', a.redirectTo);
                this.$router.replace(a.redirectTo);
            } else {
                console.error('Invalid object or redirectTo property missing:', a);
            }
        },
        getList() {
            this.fetchAnnouncement({
                channelid: announcementId,
                pageindex: 1,
                pagesize: 24,
            })
        }
    }
}
</script>

<style scoped lang="scss">
.list-notifi {
    background: rgba(255, 165, 0, 0.04);

    :deep(.ant-card-body) {
        padding: 0px 12px !important;
    }

    .email-binding-txt {
        font-weight: 400;
        font-size: 16px;
        line-height: 26px;
        color: #081131;
    }

    .read-more {
        font-weight: 400;
        font-size: 15px;
        color: #081131;
    }

    @media screen and (max-width: 425px) {
        .ant-col-xs-18, .ant-col-xs-6{
            width: 100% !important;
        }
    }
}
</style>
