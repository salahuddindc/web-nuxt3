<template>
    <div class="bottom-banner pt-3">
        <template v-if="loading">
            <AppLoading height="120.7px" backgroundColor="transparent" />
        </template>
        <div class="main-content" v-else>
            <ClientOnly>
                <!-- <carousel  :loop="loop" :speed="speed"
                    :perPageCustom="perPageCustom" :navigationEnabled="navigationEnabled" :scrollPerPage="false"
                    :paginationEnabled="false">
                    <slide v-for="(bannel, index) in swiperBannel" :key="index">
                        <div class="text-center">
                            <a v-if="bannel.articlehref" :href="bannel.articlehref" target="_blank">
                                <img class="swiper-container-img" :src="bannel.imgurl"
                                    alt="swiper-images"
                                    sizes="xs:270px sm:310px md:340px lg:310px xl:320px xxl:310px 2xl:270px 3xl:300px"  />
                            </a>
                            <img  class="swiper-container-img" v-else :src="bannel.imgurl"
                                alt="siper-images"
                                sizes="xs:270px sm:310px md:340px lg:310px xl:320px xxl:310px 2xl:270px 3xl:300px" />
                        </div>
                    </slide>
                </carousel> -->
            </ClientOnly>

        </div>
    </div>
</template>

<script>
// import carousel from '@/plugins/carousel/Carousel';
// import slide from '@/plugins/carousel/Slide';
import { mapActions } from "vuex";
export default {
    // components: {
    //     carousel, slide
    // },
    props: {
        channelid: {
            type: Number,
            required: true
        },
        pageindex: {
            type: Number,
            default: 1
        },
        pagesize: {
            type: Number,
            default: 10
        },
        loop: {
            type: Boolean,
            default: true
        },
        navigationEnabled: {
            type: Boolean,
            default: true
        },
        speed: {
            type: Number,
            default: 1500
        },
        perPageCustom: {
            type: Array,
            default: () => [[[320, 1], [375, 1], [425, 1], [575, 1], [768, 2], [991, 3], [1024, 3], [1150, 3], [1200, 3], [1440, 4], [1600, 5]]]
        }
    },
    data() {
        return {
            swiperBannel: [],
            loading: true,
        }
    },
    methods: {
        ...mapActions("article", [
            "fetchArticles",
        ]),
        getarticle() {
            this.fetchArticles({
                channelid: this.channelid,
                pageindex: this.pageindex,
                pagesize: this.pagesize
            }).then((artical) => {
                this.loading = false
                this.swiperBannel = (artical.data && artical.data.pagedata) ? artical.data.pagedata : []
            })
        }
    },

    mounted() {
            this.getarticle()
    }
}
</script>

<style lang="scss">
@use '@/assets/scss/components/app/banners.scss';
</style>
