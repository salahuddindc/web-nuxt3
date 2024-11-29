<template>
    <div class="white-bg">
    <div class="main-content">
        <a-card class="news-alert" :bordered="false">
            <a-row :gutter="16">
                <a-col :md="24" :lg="24" :xl="24">
                    <a-carousel :autoplay="true" effect="fade" :dots="false">
                        <a-row v-for=" (a, index) in subitems" :key="index + Math.random()">
                            <a-col :xs="14" :sm="16" :md="16" :lg="20" :xl="20" class="pointer" @click="goDetail(a)">
                                <div class="col-alignment">
                                    <nuxtImg src="/images/volume-down.svg" class="pr-2" width="24px" height="24px" />
                                    <a v-if="a.articlehref" :href="a.articlehref" target="_blank">{{ a.title }}</a>
                                    <span v-else class="news-text text-truncate fw-5">{{ a.title }}</span>
                                </div>
                            </a-col>

                            <a-col :xs="10" :sm="8" :md="8" :lg="4" :xl="4" align="end" @click="goDetail(a)">

                                <p class="read-more fw-5 mb-0 pointer"> {{ $t('home_page.reade_more_home') }}

                                    <svg width="15" height="15" class="ml-2 svg-icon" style="color: black">
                                        <use xlink:href="/images/svg/sprite.svg#black-right-arrow-icon"></use>
                                    </svg>
                                </p>
                            </a-col>
                        </a-row>

                    </a-carousel>
                </a-col>
            </a-row>
        </a-card>

    </div>
    </div>
</template>

<script>
import { announcementId } from '~/plugins/constants';
import { mapState, mapActions, mapGetters } from "vuex";
export default {


    name: "news-alert",

    data() {
        return {
            lang: this.$store.state.hex_lang.locale,
            list: [],
            translatepx: '',
            trantimer: ''
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
            "getLatestArticles",
            "getArticleChildren",
        ]),
        subitems() {
            return this.getAnnouncement;
        },
    },
    methods: {
        ...mapActions("article", [
            "fetchAnnouncement"
        ]),
        pushData(data) {
            // this.subItems = [];
            if (data && data.pagedata.length > 0) {
                data.pagedata.forEach((item) => {
                    item.title = item.title;
                    item.mintime = new Date(this.global_get_local_time(item.updatetime)).getTime();
                    this.subItems.push(item);
                })
            }
        },
        // 去详情
        goDetail(a) {
            if (a && a.redirectTo) {
                console.log('Redirecting to:', a.redirectTo);
                this.$router.push(a.redirectTo);
            } else {
                console.error('Invalid object or redirectTo property missing:', a);
            }
        },
        getList() {
            clearInterval(this.trantimer);
            this.fetchAnnouncement({
                channelid: announcementId,
                pageindex: 1,
                pagesize: 24,
            })
        },
        sorts() {
            return function (a, b) {
                return a.mintime > b.mintime ? -1 : 1;
            }
        },
        setanimation(bol) {
            if (!bol) {
                clearInterval(this.trantimer)
            } else {
                if (this.subitems.length > 0) {
                    const lenthceil = Math.ceil(this.subitems.length / 3);
                    let _ceil = 1;

                    if (this.trantimer) {
                        clearInterval(this.trantimer);
                        this.trantimer = null
                    }
                    this.trantimer = setInterval(() => {
                        _ceil++;
                        if (_ceil > lenthceil) {
                            _ceil = 1
                        }
                        this.translatepx = (_ceil - 1) * 40
                    }, 3500)
                }
            }
        }
    },

    beforeDestroy() {
        clearInterval(this.trantimer)
    },
    mounted() {
        this.getList();
    },


}
</script>

<style></style>
