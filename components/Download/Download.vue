<template>
    <div class="download">
        <div class="download-bg">
            <div class="main-content">
                <a-row class="mx-0">
                    <a-col :lg="14" :xl="14" :xxl="13" class="top-sec">
                        <p class="mb-2 download-heading fw-5">
                            {{ $t('downloads.download1') }}
                        </p>
                        <p class="download-desc mb-0">
                            {{ $t('downloads.download2') }}
                            {{ $t('downloads.download3') }}
                        </p>
                    </a-col>
                </a-row>
            </div>
        </div>
        <a-row class="mt-4 white-bg mx-0">
            <a-col :xl="24">
                <div class="main-content">
                    <div class="download-tabs">
                        <a-tabs default-active-key="1" @change="callback">
                            <a-tab-pane key="1" :tab="this.$t('downloads.appdownload')">
                                <a-row :gutter="16" class="tab-row">
                                    <a-col :xs="24" :sm="24" :md="14" :lg="15" class="tab-col">
                                       
                                        <a-row class="hidden-space pt-8">
                                            <a-col :xl="20">
                                                <p class="gate-auth-txt fw-5 mb-2">{{ $t('downloads.download4') }}</p>
                                        <p class="gate-auth-desc mb-0 pb-6">
                                            {{ $t('downloads.download5') }}
                                        </p>
                                        <div class="hidden-xs">
                                                <p class="news-heading fw-5 mb-0">{{ $t('down_load.dow4') }}</p>
                                        <!-- ANDROID DOWNLOAD -->

                                        <a-popover placement="bottom" overlay-class-name="ios-popover" trigger="hover"
                                            @click="redirect('android')">
                                            <template #content>
                                                <img src="/images/bitnasdaqapk.png" class="text-center mt-3"
                                                    height="150px" />
                                                <p class="list-subheading fw-5 text-black mb-0 py-2">{{ $t('home.home17') }}
                                                </p>
                                            </template>
                                            <a-card class="ios-card mt-4">
                                                <div class="right-img">
                                                    <div class="right-img1">
                                                        <img src="/images/ios-card.svg" class="ios-img" />
                                                    </div>
                                                </div>
                                                <a-row :gutter="16" class="py-3 pl-4 col-alignment">
                                                    <a-col :lg="2"><img src="/images/android.svg" /></a-col>
                                                    <a-col :lg="22" class="pl-3">
                                                        <p class="list-heading fw-5 mb-0">{{ $t('down_load.dow4') }}</p>
                                                        <p class="list-subheading fw-5 mb-0 grey-active">{{
                                                            $t('down_load.dow3')
                                                        }}
                                                        </p>
                                                    </a-col>
                                                </a-row>
                                            </a-card>
                                        </a-popover>
                                        <!-- PLAYSTORE DOWNLOAD -->
                                        <a-popover placement="bottom" overlay-class-name="ios-popover" trigger="hover"
                                            @click="redirect('playstore')">
                                            <template  #content>
                                                <img src="/images/playstore.png" class="text-center mt-3" height="150px" />
                                                <p class="list-subheading fw-5 text-black mb-0 py-2">{{ $t('home.home17') }}
                                                </p>
                                            </template>
                                            <a-card class="ios-card mt-4">
                                                <div class="right-img">
                                                    <div class="right-img1">
                                                        <img src="/images/ios-card.svg" class="ios-img" />
                                                    </div>
                                                </div>
                                                <a-row :gutter="16" class="py-3 pl-4 col-alignment">
                                                    <a-col :lg="2"><img src="/images/playstore.svg" /></a-col>
                                                    <a-col :lg="22" class="pl-3">
                                                        <p class="list-heading fw-5 mb-0">{{ $t('down_load.dow8') }}</p>
                                                        <p class="list-subheading fw-5 mb-0 grey-active">{{
                                                            $t('down_load.dow3')
                                                        }}
                                                        </p>
                                                    </a-col>
                                                </a-row>
                                            </a-card>
                                        </a-popover>
                                        <p class="news-heading fw-5 mb-0 mt-4">iOS</p>
                                        <!-- IOS BETA DOWNLOAD -->
                                        <a-popover placement="bottom" overlay-class-name="ios-popover" trigger="hover"
                                            @click="redirect('iosbeta')">
                                            <template  #content>
                                                <img src="/images/testflight.png" class="text-center mt-3" height="150px" />
                                                <p class="list-subheading fw-5 text-black mb-0 py-2">{{ $t('home.home17') }}
                                                </p>
                                            </template>
                                            <a-card class="ios-card mt-4">
                                                <div class="right-img">
                                                    <div class="right-img1">
                                                        <img src="/images/ios-card.svg" class="ios-img" />
                                                    </div>
                                                </div>
                                                <a-row :gutter="16" class="py-3 pl-4 col-alignment">
                                                    <a-col :lg="2"><img src="/images/apple-store1.svg" /></a-col>
                                                    <a-col :lg="22" class="pl-3">
                                                        <p class="list-heading fw-5 mb-0">iOS beta</p>
                                                        <p class="list-subheading fw-5 mb-0 grey-active">{{
                                                            $t('down_load.dow3')
                                                        }}
                                                        </p>
                                                    </a-col>
                                                </a-row>
                                            </a-card>
                                        </a-popover>
                                        <!-- IOS DOWNLOAD -->
                                        <a-popover placement="bottom" overlay-class-name="ios-popover" trigger="hover"
                                            @click="redirect('appstore')">
                                            <template #content>
                                                <img src="/images/appstore.png" class="text-center mt-3" height="150px" />
                                                <p class="list-subheading fw-5 text-black mb-0 py-2">{{ $t('home.home17') }}
                                                </p>
                                            </template>
                                            <a-card class="ios-card mt-4">
                                                <div class="right-img">
                                                    <div class="right-img1">
                                                        <img src="/images/ios-card.svg" class="ios-img" />
                                                    </div>
                                                </div>
                                                <a-row :gutter="16" class="py-3 pl-4 col-alignment">
                                                    <a-col :lg="2"><img src="/images/apple-store1.svg" /></a-col>
                                                    <a-col :lg="22" class="pl-3">
                                                        <p class="list-heading fw-5 mb-0">{{ $t('down_load.dow5') }}</p>
                                                        <p class="list-subheading fw-5 mb-0 grey-active">{{
                                                            $t('down_load.dow3')
                                                        }}
                                                        </p>
                                                    </a-col>
                                                </a-row>
                                            </a-card>
                                        </a-popover>
                                    </div>
                                            </a-col>
                                        </a-row>
                                      
                                    </a-col>
                                    <a-col :xs="24" :sm="24" :md="10" :lg="9" align="center" class="pt-4 mt-3">
                                        <img src="/images/right-download-img2.svg" width="100%" class="right-col-img" />
                                    </a-col>
                                </a-row>
                            </a-tab-pane>
                            <a-tab-pane key="2" tab=" Google Authenticator">
                                <a-row :gutter="16" class="tab-row">
                                    <a-col :xs="24" :sm="24" :md="14" :lg="15" class="pr-5 tab-col">
                                     
                                        <a-row class="pt-8 hidden-space">
                                            <a-col :xl="20">
                                                <p class="gate-auth-txt fw-5 mb-2">{{ $t('downloads.download6') }}</p>
                                        <p class="gate-auth-desc  pr-5 pb-6 mb-0">
                                            {{ $t('downloads.download7') }}
                                        </p>
                                        <div class="hidden-xs">
                                        <p class="news-heading fw-5 mb-0">{{ $t('down_load.dow4') }}</p>
                                        <a-popover placement="bottom" overlay-class-name="ios-popover" trigger="hover"
                                            @click="redirect('playauth')">
                                            <template #content>
                                                <img src="/images/googleauthplay.png" class="text-center mt-3"
                                                    height="150px" />
                                                <p class="list-subheading fw-5 text-black mb-0 py-2">{{ $t('home.home17') }}
                                                </p>
                                            </template>
                                            <a-card class="ios-card mt-4">
                                                <div class="right-img">
                                                    <div class="right-img1">
                                                        <img src="/images/ios-card.svg" class="ios-img" />
                                                    </div>
                                                </div>
                                                <a-row :gutter="16" class="py-3 pl-4 col-alignment">
                                                    <a-col :lg="2"><img src="/images/playstore.svg" /></a-col>
                                                    <a-col :lg="22" class="pl-3">
                                                        <p class="list-heading fw-5 mb-0">{{ $t('down_load.dow8') }}</p>
                                                        <p class="list-subheading fw-5 mb-0 grey-active">{{
                                                            $t('down_load.dow3')
                                                        }}
                                                        </p>
                                                    </a-col>
                                                </a-row>
                                            </a-card>
                                        </a-popover>
                                        <p class="news-heading fw-5 mb-0 mt-4">iOS</p>
                                        <a-popover placement="bottom" overlay-class-name="ios-popover" trigger="hover"
                                            @click="redirect('appleauth')">
                                            <template #content>
                                                <img src="/images/googleauthapp.png" class="text-center mt-3"
                                                    height="150px" />
                                                <p class="list-subheading fw-5 text-black mb-0 py-2">{{ $t('home.home17') }}
                                                </p>
                                            </template>
                                            <a-card class="ios-card mt-4">
                                                <div class="right-img">
                                                    <div class="right-img1">
                                                        <img src="/images/ios-card.svg" class="ios-img" />
                                                    </div>
                                                </div>
                                                <a-row :gutter="16" class="py-3 pl-4 col-alignment">
                                                    <a-col :lg="2"><img src="/images/apple-store1.svg" /></a-col>
                                                    <a-col :lg="22" class="pl-3">
                                                        <p class="list-heading fw-5 mb-0">{{ $t('down_load.dow5') }}</p>
                                                        <p class="list-subheading fw-5 mb-0 grey-active">{{
                                                            $t('down_load.dow3')
                                                        }}
                                                        </p>
                                                    </a-col>
                                                </a-row>
                                            </a-card>
                                        </a-popover>
                                        </div>
                                        </a-col>
                                        
                                        </a-row>
                                    </a-col>
                                    <a-col :xs="24" :sm="24" :md="10" :lg="9"  align="center" class="pt-4 mt-3">
                                        <img src="/images/right-download-img.svg" width="100%" class="right-col-img" />
                                    </a-col>
                                </a-row>
                            </a-tab-pane>
                        </a-tabs>
                    </div>
                </div>
            </a-col>
        </a-row>
        <a-row :gutter="16" class="pt-8 white-bg mx-0 pb-5">
            <div class="main-content">
                <p class="gate-auth-txt fw-5 pb-6 mb-0">{{ $t('down_load.dow9') }}</p>
          
          <a-col :md="8" :lg="8" v-for="(list, key) in getList" :key="key" class="px-2 pb-4 choose-text">
              <img :src="list.img" height="65px"/>
              <p class="mt-4 mb-2 title-txt fw-5">{{ list.title }}</p>
              <p class="title-desc fw-4 pr-4">{{ list.desc }}</p>
          </a-col>
            </div>
          
                </a-row>
        <div class="download-btn-sec px-3 py-3">
            <a-row :gutter="16" v-if="isMobile && currentTab == 1">
                <a-col :xs="12" :sm="12" v-if="!isMobile?.iOS()">
                    <a @click="redirect('playstore')">
                        <div class="mob-btn">
                            <div class="left-side">
                                <img src="/images/playstore.svg" height="20px" class="mr-3" />
                            </div>
                            <div class="right-side">
                                <p class="mb-0 btn-txt fw-7 text-black">{{ $t('down_load.dow10') }}</p>
                                <p class="mb-0 btn-desc fw-5">{{ $t('down_load.dow11') }}</p>
                            </div>
                        </div>
                    </a>
                </a-col>
                <a-col :xs="12" :sm="12" @click="redirect('android')" v-if="!isMobile?.iOS()">
                    <a @click="redirect('android')">
                        <div class="mob-btn">
                            <div class="left-side">
                                <img src="/images/android.svg" height="20px" class="mr-3" />
                            </div>
                            <div class="right-side">
                                <p class="mb-0 btn-txt fw-7 text-black">{{ $t('down_load.dow12') }}</p>
                                <p class="mb-0 btn-desc fw-5">{{ $t('down_load.dow11') }}</p>
                            </div>
                        </div>
                    </a>
                </a-col>
            </a-row>
            <a-row :gutter="16" class="mt-3" v-if="!isMobile?.Android() && currentTab == 1">
                <a-col :xs="12" :sm="12">
                    <a @click="redirect('appstore')">
                        <div class="mob-btn">
                            <div class="left-side">
                                <img src="/images/apple-store.svg" height="20px" class="mr-3" />
                            </div>
                            <div class="right-side">
                                <p class="mb-0 btn-txt fw-7 text-black">{{ $t('down_load.dow13') }}</p>
                                <p class="mb-0 btn-desc fw-5">{{ $t('down_load.dow11') }}</p>
                            </div>
                        </div>
                    </a>
                </a-col>
                <a-col :xs="12" :sm="12" v-if="!isMobile?.Android()">
                    <a @click="redirect('iosbeta')">
                        <div class="mob-btn">
                            <div class="left-side">
                                <img src="/images/apple-store.svg" height="20px" class="mr-3" />
                            </div>
                            <div class="right-side">
                                <p class="mb-0 btn-txt fw-7 text-black">{{ $t('down_load.dow14') }}</p>
                                <p class="mb-0 btn-desc fw-5">{{ $t('down_load.dow11') }}</p>
                            </div>
                        </div>
                    </a>
                </a-col>
            </a-row>

            <a-row :gutter="16" v-if="isMobile && currentTab == 2">
                <a-col :xs="24" v-if="isMobile?.Android()">
                    <a @click="redirect('playstore')">
                        <div class="mob-btn">
                            <div class="left-side">
                                <img src="/images/playstore.svg" height="20px" class="mr-3" />
                            </div>
                            <div class="right-side">
                                <p class="mb-0 btn-txt fw-7 text-black">{{ $t('down_load.dow10') }}</p>
                                <p class="mb-0 btn-desc fw-5">{{ $t('down_load.dow11') }}</p>
                            </div>
                        </div>
                    </a>
                </a-col>
                <a-col :xs="24" @click="redirect('appleauth')" v-if="isMobile?.iOS()">
                    <a @click="redirect('appleauth')">
                        <div class="mob-btn">
                            <div class="left-side">
                                <img src="/images/apple-store.svg" height="20px" class="mr-3" />
                            </div>
                            <div class="right-side">
                                <p class="mb-0 btn-txt fw-7 text-black">{{ $t('down_load.dow13') }}</p>
                                <p class="mb-0 btn-desc fw-5">{{ $t('down_load.dow11') }}</p>
                            </div>
                        </div>
                    </a>
                </a-col>
            </a-row>

        </div>
    </div>
</template>

<script>
import { googleLinkLink, androidLink, appleStoreBetaLink, appleStoreLink, googleAuthenticator, appleGoogleAuthenticator } from "~/plugins/constants";
export default {
    data() {
        return {
            currentTab: 1,
            getList: [
                {
                    img: '/images/list1.svg',
                    title: this.$t('down_load.dow20'),
                    desc: this.$t('down_load.dow16')
                },
                {
                    img: '/images/list2.svg',
                    title: this.$t('down_load.dow15'),
                    desc: this.$t('down_load.dow17')
                },
                {
                    img: '/images/list3.svg',
                    title: this.$t('down_load.dow18'),
                    desc: this.$t('down_load.dow19')
                },

            ],
            isMobile: undefined
        }
    },
    computed: {
        androidLink: function () {
            return androidLink
        },
        playStoreLink: function () {
            return googleLinkLink;
        },
        appleStoreBetaLink: function () {
            return appleStoreBetaLink
        },
        appleStoreLink: function () {
            return appleStoreLink;
        },
        googleAuthenticator: function () {
            return googleAuthenticator;
        },
        appleGoogleAuthenticator: function () {
            return appleGoogleAuthenticator;
        },



    },
    methods: {
        callback(key) {
            console.log(key);
            this.currentTab = key
        },
        redirect(key) {
            console.log(key, googleAuthenticator);
            if (this.currentTab == 1) {
                switch (key) {
                    case 'android': window.open(androidLink); break;
                    case 'playstore': window.open(googleLinkLink); break;
                    case 'iosbeta': window.open(appleStoreBetaLink); break;
                    case 'appstore': window.open(appleStoreLink); break;

                    case 'appleauth': window.open(appleGoogleAuthenticator); break;
                    case 'playauth': window.open(googleAuthenticator); break;
                    default:
                        break;
                }
            } else {
                switch (key) {
                    case 'playstore': window.open(googleAuthenticator); break;
                    case 'appleauth': window.open(appleGoogleAuthenticator); break;
                    default:
                        break;
                }
            }

        }
    },
    mounted() {
        import("~/plugins/helpers").then(({ isMobile }) => {
            this.isMobile = isMobile
        });

    }
};
</script>

<style lang="scss"></style>
