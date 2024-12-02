<template>
    <div class="home-container">
        <div class="home-slider main-content">
            <!-- WHEN LOGIN -->
            <div>
                <template v-if="loadingPromotions">
                    <AppLoading height="600px" backgroundColor="transparent" />
                </template>
                <template v-else>
                    <ClientOnly>
                        <a-carousel :autoplaySpeed="10000" :autoplay="false"
                            :dotPosition="screenSize < 768 ? 'bottom' : 'right'" :dots="true" ref="OneCarousel">

                            <a-row :gutter="16" v-for="(promotion, key) in promotions" :key="key"
                                class="col-alignment first-top-row">
                                <a-col :sm="24" :md="13" :lg="13" :xxl="12">
                                    <div v-if="promotion.subtitle == 'register-verify-and-trade' || promotion.subtitle == 'invest-in-the-coin-of-your-choice'"
                                        class="login-slide">

                                        <div v-if="Userlogin"
                                            :class="promotion.subtitle == 'invest-in-the-coin-of-your-choice' ? 'mt-20 social-sec' : ''">
                                            <a-row>
                                                <a-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 18, offset: 3 }"
                                                    :md="{ span: 24, offset: 0 }" :lg="{ span: 19, offset: 0 }"
                                                    :xl="{ span: 21, offset: 0 }" :xxl="{ span: 19, offset: 0 }">
                                                    <p
                                                        class="home-heading text-white font-xs-20 font-sm-28 font-xl-36 lh-xl-45 lh-lg-40 lh-md-35 lh-xs-27 lh-sm-40  mb-xs-3 mb-sm-5 fw-6">
                                                        {{ promotion.title }}</p>
                                                </a-col>
                                            </a-row>
                                            <a-row>
                                                <a-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 18, offset: 3 }"
                                                    :md="{ span: 24, offset: 0 }" :lg="{ span: 22, offset: 0 }"
                                                    :xl="{ span: 22, offset: 0 }" :xxl="{ span: 22, offset: 0 }"
                                                    class="">
                                                    <p
                                                        class="mb-5 fw-4 short-desc font-xs-14 font-sm-18  text-white connect-with-desc lh-xs-18 lh-sm-27">
                                                        {{ promotion.shortdescription }}
                                                    </p>
                                                </a-col>
                                            </a-row>
                                            <div>
                                                <a-row :gutter="16" class="social-row">
                                                    <a-col :xs="24" :sm="14" :md="24" :lg="14" :xl="12" :xxl="10">
                                                        <div class="">
                                                            <nuxt-link to="/person/authentication">
                                                                <a-button class="primary-btn" block>{{
                                                                    $t('depositModal.dm3') }}
                                                                    <ArrowRightOutlined />
                                                                </a-button>
                                                            </nuxt-link>
                                                        </div>
                                                    </a-col>
                                                    <a-col :xs="24" :sm="10" :md="24" :lg="10" :xl="12" :xxl="14"
                                                        class="pl-lg-0">
                                                        <div class="social-links">
                                                            <div class="icon-box pointer">
                                                                <a :href="googleLinkLink" target="_blank">
                                                                    <nuxtImg src="/images/g-home-icon.svg" height="27px"
                                                                        width="27px" />
                                                                </a>

                                                            </div>
                                                            <div>
                                                                <div class="icon-box pointer">
                                                                    <a :href="appleStoreLink" target="_blank">
                                                                        <nuxtImg src="/images/white-icon.svg"
                                                                            height="27px" width="27px" />
                                                                    </a>
                                                                </div>

                                                            </div>
                                                            <div>
                                                                <a-popover :title="false" trigger="hover"
                                                                    placement="right"
                                                                    overlay-class-name="download-popover">
                                                                    <template slot="content">
                                                                        <span>
                                                                            <div class="text-center">
                                                                                <nuxtImg src="/images/download-qrs.png"
                                                                                    class="mt-2 pt-1" height="155px"
                                                                                    width="160px" />
                                                                                <p
                                                                                    class="px-4 text-black download-txt mb-2 pb-1">
                                                                                    Scan to
                                                                                    download
                                                                                    App iOS & Android</p>
                                                                                <a href="/services/downloads"
                                                                                    target="_blank"> <a-button
                                                                                        class="primary-btn fw-5 download-app-btn mb-3">
                                                                                        {{ $t('depositModal.dm12') }}
                                                                                    </a-button></a>
                                                                            </div>
                                                                        </span>
                                                                    </template>
                                                                    <span class="home-download-icon-btn pointer ">
                                                                        <nuxtImg src="/images/home-qr.svg" height="27px"
                                                                            width="27px" :placeholder="true" />
                                                                    </span>
                                                                </a-popover>
                                                            </div>
                                                        </div>
                                                    </a-col>

                                                </a-row>


                                            </div>
                                        </div>
                                        <div v-else
                                            :class="promotion.subtitle == 'register-verify-and-trade' ? 'mt-md-24 mt-sm-10 mt-xs-5 login-sec' : ''">

                                            <a-row>
                                                <a-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 18, offset: 3 }"
                                                    :md="{ span: 24, offset: 0 }" :lg="{ span: 19, offset: 0 }"
                                                    :xl="{ span: 21, offset: 0 }" :xxl="{ span: 19, offset: 0 }">
                                                    <p
                                                        class="home-heading text-white font-xs-20 font-sm-28 font-xl-36  lh-xs-27 lh-sm-40 lh-xl-45 lh-lg-40 lh-md-35 mb-xs-3 mb-sm-5 fw-6">
                                                        {{ promotion.title }}</p>
                                                </a-col>
                                            </a-row>
                                            <a-row>
                                                <a-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 18, offset: 3 }"
                                                    :md="{ span: 24, offset: 0 }" :lg="{ span: 20, offset: 0 }"
                                                    :xl="{ span: 20, offset: 0 }" :xxl="{ span: 20, offset: 0 }"
                                                    class="">
                                                    <p
                                                        class="mb-5 fw-4 text-white short-desc font-xs-14 font-sm-18  connect-with-desc lh-xs-18 lh-sm-27">
                                                        {{
                                                            promotion.shortdescription }}
                                                    </p>
                                                </a-col>
                                            </a-row>
                                            <a-row :gutter="8" class="mb-3 home-form">
                                                <a-form :model="getStartedForm" ref="ticketForm" :rules="rules"
                                                    :hide-required-mark="true" label-align="left">
                                                    <a-col :xs="24" :sm="15" :md="15" :lg="12" :xl="12" :xxl="12">
                                                        <AppFormModelItem name="email">
                                                            <a-input class="home-input font-16"
                                                                v-model="getStartedForm.email"
                                                                :placeholder="$t('enter_email_phone_no')" />
                                                        </AppFormModelItem>
                                                    </a-col>
                                                    <a-col :xs="24" :sm="8" :md="8" :lg="7" :xl="7" :xxl="7">
                                                        <a-button class="primary-btn  join-now ml-xs-0 ml-sm-2" block
                                                            @click="join">{{
                                                                $t('agent_plan.ap_join_aff') }}</a-button>
                                                    </a-col>
                                                </a-form>
                                            </a-row>


                                            <a-row class="home-form" v-if="!isMobile">
                                                <a-col :xs="10" :sm="8" :md="8" :lg="8" :xl="6">
                                                    <p class="text-white font-xs-13 font-sm-14 mb-0">{{
                                                        $t('adsharing.as29') }}
                                                    </p>


                                                    <div class="apps-icon">
                                                        <div class="icon-box pointer" @click="googleLogin"
                                                            @touchstart="googleLogin">
                                                            <nuxtImg src="/images/g-home-icon.svg" :placeholder="true"
                                                                width="27px" height="27px" />
                                                        </div>
                                                        <div class="icon-box pointer" @click="appleLogin"
                                                            @touchstart="appleLogin">
                                                            <nuxtImg src="/images/white-icon.svg" :placeholder="true"
                                                                width="27px" height="27px" />
                                                        </div>
                                                    </div>

                                                </a-col>
                                                <a-col :xs="14" :sm="14" :md="14" :lg="4" :xl="4">
                                                    <p class="text-white font-xs-13 font-sm-14 mb-3"> {{
                                                        $t('adsharing.as8') }}
                                                    </p>

                                                    <a-popover :title="false" trigger="hover" placement="right"
                                                        overlay-class-name="download-popover">
                                                        <template slot="content">
                                                            <span>
                                                                <div class="text-center">
                                                                    <nuxtImg src="/images/download-qrs.png"
                                                                        class="mt-2 pt-1" height="155px"
                                                                        width="160px" />
                                                                    <p class="px-4 text-black download-txt mb-2 pb-1">
                                                                        Scan to
                                                                        download
                                                                        App iOS & Android</p>
                                                                    <a href="/services/downloads" target="_blank">
                                                                        <a-button
                                                                            class="primary-btn fw-5 download-app-btn mb-3">
                                                                            {{ $t('depositModal.dm12') }}
                                                                        </a-button></a>
                                                                </div>
                                                            </span>
                                                        </template>
                                                        <span class="home-download-icon-btn pointer ">
                                                            <nuxtImg src="/images/home-qr.svg" :placeholder="true"
                                                                height="27px" width="27px" />
                                                        </span>

                                                    </a-popover>

                                                </a-col>

                                            </a-row>
                                        </div>
                                    </div>

                                    <div class="mt-20 pt-10 left-side" v-else>
                                        <a-row>
                                            <a-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 18, offset: 3 }"
                                                :lg="{ span: 19, offset: 0 }" :md="{ span: 24, offset: 0 }"
                                                :xl="{ span: 21, offset: 0 }" :xxl="{ span: 19, offset: 0 }">
                                                <p
                                                    class="home-heading text-white font-xs-20 font-sm-28 font-xl-36 lh-xl-45 lh-lg-40 lh-md-35 lh-xs-27 lh-sm-40  mb-xs-3 mb-sm-5 fw-6">
                                                    {{ promotion.title }}</p>
                                            </a-col>
                                        </a-row>
                                        <a-row>
                                            <a-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 18, offset: 3 }"
                                                :md="{ span: 24, offset: 0 }" :lg="{ span: 23, offset: 0 }"
                                                :xl="{ span: 18, offset: 0 }" :xxl="{ span: 18, offset: 0 }" class="">
                                                <p
                                                    class="mb-5 lh-xs-18 lh-sm-27 short-desc font-xs-14 font-sm-18  text-white fw-4">
                                                    {{
                                                        promotion.shortdescription }}!</p>
                                                <nuxt-link
                                                    :to="promotion.articlehref == '' ? '/deal-pro/btc_usdt?ctid=1575964013659730564' : promotion.articlehref.replace(/[\?&]lang=en_us/, '')">
                                                    <a-button class="primary-btn trading-start-btn px-8">{{
                                                        promotion.source
                                                            ==
                                                            ''
                                                            ? $t('home_page.hp9') : promotion.source }}</a-button>
                                                </nuxt-link>

                                            </a-col>
                                        </a-row>
                                    </div>
                                </a-col>

                                <a-col :sm="11" :md="11" :lg="11" :xxl="12" class="pl-5 right-img-col">
                                    <a :href="promotion.articlehref ? promotion.articlehref : 'javascript:;'"
                                        :target="promotion.articlehref ? '_blank' : '_self'">
                                        <img class="pl-5 top-slider-imgs" :src="promotion.imgurl" height="435px"
                                            width="90%" />
                                    </a>
                                </a-col>
                            </a-row>
                        </a-carousel>
                    </ClientOnly>
                </template>
                <template v-if="screenSize > 768">
                    <div class="main-icon d-none">
                        <div class="slider-top-arrow">
                            <nuxtImg src="/images/top-up-arrow-active.svg" height="20px"
                                @click="$refs.OneCarousel.prev()" class="pointer" />
                        </div>
                        <div class="slider-down-arrow">
                            <nuxtImg src="/images/top-down-arrow-active.svg" height="20px"
                                @click="$refs.OneCarousel.next()" class="pointer" />
                        </div>
                    </div>
                </template>
            </div>

        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { promotionChannelId, icoLink, googleLinkLink, appleStoreLink } from '~/utils/constants'
import { isMobile } from '~/utils/helpers'

import NoService from './NoService.vue'
export default {
    components: {
        NoService
    },
    props: {
        isAvailable: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            googleLinkLink: googleLinkLink,
            appleStoreLink: appleStoreLink,
            getStartedForm: {
                email: ''
            },
            isMobile: undefined,
            rules: {
                email: [
                    { required: true, message: "email or phone is required" },
                    {
                        validator: (rule, value) => {
                            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            const phoneRegex = /^\+?[0-9]{10,}$/;
                            if (!value || phoneRegex.test(value)) {
                                return Promise.resolve();
                            }
                            else if (!value || emailRegex.test(value)) {
                                return Promise.resolve();
                            }
                            return Promise.reject("Enter Valid Email/Phone (with area code)");
                        },
                    },
                ]
            },

            //FOR CAROUSOUL STARTED
            activeCarouselPromotion: {
                title: '',
                shortdescription: ''
                // title: 'BitNasdaq Global ICO in progress',
                // shortdescription: 'Your dedication and trust will be greatly rewarded sincerely invite you to join us!'
            },
            antCarousel: 0,


            //FOR CAROUSOUL ENDED
            //for goodle and apple login started below
            signModel: {
                username: '',
                password: '',
                verifycode: '',
                rememberme: true,
            },
            loginWith: 'email',
            thirdPartyLoginLoading: false,
            verifyModel: null,
        }
        //for goodle and apple login ended above
    },
    computed: {

        screenSize() {
            let size = 1024
            if (import.meta.client) {
                size = window.innerWidth
            }
            return size
        },
        Userlogin() {
            if ($userinfo.uid)
                return true
            else
                return false
        },
        ...mapGetters('article', ['getPromotions']),
        ...mapGetters('general', ['loadingPromotions']),
        promotions: function () {
            if (loggedIn) {
                return this.getPromotions.filter((promotion) => promotion.subtitle != 'register-verify-and-trade')
            } else {
                return this.getPromotions.filter((promotion) => promotion.subtitle != 'invest-in-the-coin-of-your-choice')
            }
            return this.getPromotions
        },


    },
    methods: {
        ...mapActions('article', ['fetchPromotions']),
        promotionCarouselChange(index, b, c) {
            if (index == 1) {
                this.activeCarouselPromotion = {
                    title: 'BitNasdaq Global ICO in progress',
                    shortdescription: 'Your dedication and trust will be greatly rewarded sincerely invite you to join us!',
                    articlehref: icoLink
                }
            } else {
                this.activeCarouselPromotion = this.promotions[index]
            }
        },
        join() {
            this.$refs.ticketForm[0].validate((valid) => {
                if (valid) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const phoneRegex = /^\+?[0-9]{10,}$/;
                    if (phoneRegex.test(this.getStartedForm.email)) {
                        this.$store.commit('auth/setTempData', {
                            phone: this.getStartedForm.email
                        })
                    }
                    else if (emailRegex.test(this.getStartedForm.email)) {
                        this.$store.commit('auth/setTempData', {
                            email: this.getStartedForm.email
                        })
                    }

                    this.$router.push({ path: '/register' })
                }
            })
        },
        //lOGIN FUNCTIONALITY STARTED BELOW
        uuid() {
            const s = [],
                hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = "4";
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
            s[8] = s[13] = s[18] = s[23] = "-";
            return s.join("");
        },
        appleLogin() {
            var randstr = this.uuid();
            const options = {
                response_type: 'code', // 固定内容
                response_mode: 'form_post',
                state: randstr, // 随机字符串，此处仅做演示
                client_id: 'bitnasdaq.com.development',
                redirect_uri: `${this.$baseUrl}/comapi/v1.0/com/apple.login`,
                scope: 'openid name email'
            }
            const url = new URL('https://appleid.apple.com/auth/authorize')
            const keys = Object.keys(options)
            keys.forEach(key => {
                url.searchParams.append(key, options[key])
            })
            var bl = false;
            const _self = this;
            const appleloginurl = url.toString();
            var iTop = (window.screen.height - 700) / 2;       //获得窗口的垂直位置;
            var iLeft = (window.screen.width - 1024) / 2;        //获得窗口的水平位置;
            var openWin = window.open(appleloginurl, "newWindow", "width=1024,height=700,top=" + iTop + ", left=" + iLeft + ",titlebar=no, menubar=no,scrollbars=yes,resizable=yes,status=yes,toolbar=no,location=yes");
            var winLoop = setInterval(function () {
                if (openWin.closed && !bl) {
                    clearInterval(winLoop);
                    bl = true;
                    _self.loginWith = 'apple'
                    _self.thirdPartyLoginLoading = true
                    _self.siginByThreadPlant(randstr);
                }
            }, 1000);
        },
        googleLogin() {
            var randstr = this.uuid();
            const options = {
                response_type: 'code', // 固定内容
                state: randstr, // 随机字符串，此处仅做演示
                include_granted_scopes: true,
                access_type: 'offline',
                client_id: '311638269948-vj4vooafhg3581iuen0kgtgaggdglbhu.apps.googleusercontent.com',
                redirect_uri: `${this.$baseUrl}/comapi/v1.0/com/google.login`,
                scope: 'openid profile email'
            }
            const url = new URL('https://accounts.google.com/o/oauth2/auth')
            const keys = Object.keys(options)
            keys.forEach(key => {
                url.searchParams.append(key, options[key])
            })
            const appleloginurl = url.toString();
            var bl = false;
            const _self = this;
            var iTop = (window.screen.height - 700) / 2;       //获得窗口的垂直位置;
            var iLeft = (window.screen.width - 1024) / 2;        //获得窗口的水平位置;
            var openWin = window.open(appleloginurl, "newWindow", "width=1024,height=700,top=" + iTop + ", left=" + iLeft + ",titlebar=no, menubar=no,scrollbars=yes,resizable=yes,status=yes,toolbar=no,location=yes");

            var winLoop = setInterval(function () {
                if (openWin.closed && !bl) {
                    clearInterval(winLoop);
                    bl = true;
                    _self.loginWith = 'google'
                    _self.thirdPartyLoginLoading = true

                    _self.siginByThreadPlant(randstr)
                }
            }, 1000);
        },
        siginByThreadPlant(state) {
            const _self = this;

            const _sign = Object.assign({}, _self.signModel);
            _self.$store.dispatch('user_user_signin', { randstr: state }).then((res) => {
                const data = res.data
                _self.verifyModel = data;
                _self.$store.commit('set_token', {
                    'token': data.token,
                    'expire': new Date().getTime() + 2 * 3600000
                });
                if (!data) {
                    throw data;
                }
                _sign.randstr = state;
                _sign.ticket = "666666";
                _self.$store.commit('auth/setLoginWith', _self.loginWith)

                return true;
            }).then((data) => {
                if (data) {
                    _self.$store.commit('auth/setLoginWith', _self.loginWith)
                    const userEmail = _self.verifyModel.email;

                    // Dispatch the action to update the 'visitor_user.userInput' state with the user's email
                    _self.$store.dispatch('setUserInput', userEmail);
                    //console.log("userrrrrremaiiiillll", userEmail);


                    _self.$router.push({
                        name: 'auth',
                        params: {
                            verifyModel: _self.verifyModel,
                            signModel: _sign,
                            returnurl: _self.returnurl
                        }
                    })


                }
            }).catch((res) => {
                _self.state.signin = false
                _self.loading = false
                _self.thirdPartyLoginLoading = false
            })
        },
        //lOGIN FUNCTIONALITY ENDED ABOVE
    },
    mounted() {
        this.fetchPromotions({ pageIndex: 1, pageSize: 30, channelId: promotionChannelId })
        this.isMobile = isMobile

    },
}
</script>

<style></style>
