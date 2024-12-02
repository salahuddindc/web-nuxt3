<template>
    <div>
        <div class="community mt-xs-6 mt-sm-12">
            <div class="main-content">
                <h2 class="mb-3 lh-48 secondary-black fw-6 text-center">{{ $t('home_page.trade_notice_home') }}</h2>

                <h6 class="fw-4 mb-xs-6 mb-sm-15 lh-16 text-center secondary-gray">{{ $t('home_page.trade_notice1_home')
                    }}</h6>

                <a-row>
                    <a-col :sm="{ span: 24, offset: 0 }" :md="{ span: 16, offset: 4 }" :lg="{ span: 24, offset: 0 }" :xl="{ span: 24, offset: 0 }"  :xxl="{ span: 20, offset: 2 }">
                        <a-row type="flex" align="middle">
                            <a-col :xs="7" :sm="8" :md="6" :lg="12" :xl="14" :xxl="14" class="community-img-row mb-xs-6 mb-lg-15">
                                <nuxtImg src="/images/community-app.svg" loading="lazy" class="community-left-img d-none d-xl-block d-lg-block d-md-none"
                                    sizes="sm:300px lg:310px xl:398px" />
                                    <img src="/images/home-mobile-image.svg" class="d-xl-none d-lg-none d-md-block" height="225px" width="100%"/>
                            </a-col>
                            <a-col :xs="17" :sm="16" :md="18" :lg="12" :xl="10" :xxl="10" class="sec-col mb-xs-6 mb-lg-15 mb-md-0 pl-lg-0 pl-sm-2 pl-xs-2">
                                <div class="qr-code-sec">
                                    <div class="white-qr-code sec-qr-col p-lg-5 p-md-2 p-sm-2 p-xs-2">
                                        <div class="qr-code">
                                            <nuxtImg src="/images/download-qrs.png" height="155px" width="160px"
                                                loading="lazy" />
                                        </div>
                                    </div>
                                    <div class="qr-code-text pl-xs-3 pl-sm-6">
                                        <h6 class="secondary-gray font-lg-16 font-md-16 font-sm-14 font-xs-12 fw-4 mb-1 lh-md-27 lh-sm-25 lh-xs-20 mb-0">{{ $t('home_page.hp23') }}</h6>
                                        <h5 class="fw-5 secondary-black mb-0 lh-34 font-lg-20 font-md-20 font-sm-16 font-xs-12">{{ $t('home_page.hp24') }}</h5>
                                    </div>

                                </div>
                                <div class="download-sec mt-lg-7 mt-md-2 mt-sm-2 mt-xs-2">
                                    <div class="download1 text-center" v-if="!isMobile?.Android()">
                                        <a :href="appleStoreLink" target="_blank" class="text-black">
                                            <svg width="30" height="30" class="svg-icon">
                                                <use xlink:href="/images/svg/sprite.svg#apple-store-icon"></use>
                                            </svg>
                                            <p class="secondary-black lh-42 fw-4 mb-0">{{ $t('home_page.hp27') }}</p>
                                        </a>
                                    </div>
                                    <div class="download1 text-center" v-if="!isMobile?.iOS()">
                                        <a :href="googleLinkLink" target="_blank" class="text-black">
                                            <nuxtImg src="/images/home-google.svg" heitgh="30" loading="lazy" />
                                            <!-- <svg width="30" height="30">
                                                <use xlink:href="/images/svg/home.svg#google-play-icon"></use>
                                            </svg> -->

                                            <p class="secondary-black lh-42 fw-4 mb-0 text-black">{{
                                                $t('home_page.hp28') }}</p>
                                        </a>
                                    </div>
                                    <div class="download1 text-center" v-if="!isMobile?.iOS()">
                                        <a :href="androidLink" target="_blank" class="text-black">
                                            <nuxtImg src="/images/home-android.svg" heitgh="30" loading="lazy" />
                                            <!-- <svg width="30" height="30">
                                                <use xlink:href="/images/svg/home.svg#android1-icon"></use>
                                            </svg> -->
                                            <p class="secondary-black lh-42 fw-4 mb-0">{{ $t('home_page.hp29') }}</p>
                                        </a>
                                    </div>

                                    <div class="download1 text-center" v-if="!isMobile?.Android()">
                                        <a href="https://testflight.apple.com/join/wr82YLnR" target="_blank"
                                            class="text-black">
                                            <svg width="30" height="30" class="svg-icon">
                                                <use xlink:href="/images/svg/sprite.svg#apple-store-icon"></use>
                                            </svg>
                                            <p class="secondary-black lh-42 fw-4 mb-0">{{ $t('home_page.hp32') }}</p>
                                        </a>
                                    </div>
                                </div>
                                <nuxt-link to="/services/downloads">
                                    <div
                                        class="lh-20 fw-5 secondary-black mb-0 col-alignment pointer mt-lg-7 mt-md-2 mt-sm-2 mt-xs-2 social-links">
                                        <svg width="24" height="24" class="mr-3">
                                            <use xlink:href="/images/svg/home.svg#download-icon2-icon"></use>
                                        </svg>{{ $t('home.home19') }}
                                    </div>
                                </nuxt-link>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </div>
        </div>
        <div class="start-trading  py-xl-26 py-lg-27 py-md-27 py-sm-20 py-xs-20 text-center">
            <div class="main-content">
                <h2 class="mb-4 lh-48 text-white fw-5 text-center">{{ $t('home.startTrading') }}</h2>
                <h6 class="fw-4 mb-5 lh-16 text-center secondary-gray">{{ $t('home_page.hp22') }}</h6>
                <nuxt-link to="/deal-pro/btc_usdt?ctid=1575964013659730564"><a-button
                        class="primary-btn trading-start-btn px-10">{{ $t('home_page.hp9') }}</a-button></nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
import { appleStoreLink, googleLinkLink, androidLink } from '~/utils/constants'
import { isMobile } from '~/utils/helpers'

export default {
    computed: {
        appleStoreLink() {
            return appleStoreLink
        },
        googleLinkLink() {
            return googleLinkLink
        },
        androidLink() {
            return androidLink
        }
    },
    data() {
        return {
            isMobile: undefined
        }
    },
    mounted() {
        this.isMobile = isMobile
    }
}
</script>

<style></style>
