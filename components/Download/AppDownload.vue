<template>
    <div class="app-download">

        <a-row>
            <a-col :md="{ span: 18, offset: 3 }" :lg="{ span: 12, offset: 0 }">
                <h2
                    class="fw-5 mt-lg-12 mt-md-12 mt-sm-8 mt-xs-8 lh-lg-40 lh-md-35 font-lg-32 lh-md-28 lh-sm-24 font-md-28 font-sm-24 font-xs-18 secondary-black mb-2">
                    {{ $t('downloads.download4') }}</h2>
                <h6 class="lh-23 mb-0 secondary-black fw-4"> {{ $t('downloads.download5') }}</h6>
                <a-row :gutter="40" class="mt-md-15 mt-sm-10 apps app-list">
                    <a-col :xs="12" :lg="12">
                        <h5 class="mb-6 secondary-black fw-5">{{ $t('home_page.hp29') }}</h5>
                        <a-card class="app-box mb-3 pointer" v-for="(item, key) in getAndroidList" :key="key"
                            @click="redirect(item.link)">
                            <a-popover placement="bottom" overlay-class-name="ios-popover" trigger="hover">
                                <template #content>
                                    <img :src="item.qrImage" class="text-center mt-3" height="150px" />
                                    <p class="list-subheading fw-5 secondary-black mb-0 py-2">{{ $t('home.home17') }}
                                    </p>
                                </template>
                                <a-row class="col-alignment">
                                    <a-col :xs="5" :lg="5">
                                        <img :src="item.img" height="24px" />
                                    </a-col>
                                    <a-col :xs="13" :lg="13">
                                        <p class="secondary-black fw-5 mb-0">{{ item.title }}</p>
                                        <p class="app-sec-text mb-0">{{ item.subTitle }}</p>
                                    </a-col>
                                    <a-col :xs="6" :lg="6" align="end">
                                        <img :src="item.img2" />
                                    </a-col>
                                </a-row>

                            </a-popover>
                        </a-card>
                    </a-col>
                    <a-col :xs="12" :lg="12">
                        <h5 class="mb-6 secondary-black fw-5">IOS</h5>
                        <a-card class="app-box mb-3 pointer" v-for="(item, key) in getIosList" :key="key"
                            @click="redirect(item.link)">
                            <a-popover placement="bottom" overlay-class-name="ios-popover" trigger="hover">
                                <template #content>
                                    <img :src="item.qrImage" class="text-center mt-3" height="150px" />
                                    <p class="list-subheading fw-5 secondary-black mb-0 py-2">{{ $t('home.home17') }}
                                    </p>
                                </template>

                                <a-row class="col-alignment">
                                    <a-col :xs="5" :lg="5">
                                        <img :src="item.img" height="24px" />
                                    </a-col>
                                    <a-col :xs="13" :lg="13">
                                        <p class="secondary-black fw-5 mb-0">{{ item.title }}</p>
                                        <p class="app-sec-text mb-0">{{ item.subTitle }}</p>
                                    </a-col>
                                    <a-col :xs="6" :lg="6" align="end">
                                        <img :src="item.img2" />
                                    </a-col>
                                </a-row>

                            </a-popover>
                        </a-card>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :md="{ span: 22, offset: 1 }" :lg="{ span: 12, offset: 0 }"><img src="/images/right-download.svg"
                    class="right-img" /></a-col>
        </a-row>
    </div>
</template>

<script>
import { googleLinkLink, androidLink, appleStoreBetaLink, appleStoreLink } from "~/utils/constants";
export default {
    data() {
        return {
            getAndroidList: [
                {
                    img: '/images/playstore.svg',
                    title: this.$t('down_load.dow8'),
                    subTitle: this.$t('down_load.dow3'),
                    img2: '/images/download-qrcode.svg',
                    qrImage: '/images/playstore.png',
                    link: googleLinkLink
                },
                {
                    img: '/images/android.svg',
                    title: 'Download Apk',
                    subTitle: this.$t('down_load.dow3'),
                    img2: '/images/download-qrcode.svg',
                    qrImage: '/images/bitnasdaqapk.png',
                    link: androidLink
                }
            ],
            getIosList: [
                {
                    img: '/images/apple-store1.svg',
                    title: 'iOS Beta',
                    subTitle: this.$t('down_load.dow3'),
                    img2: '/images/download-qrcode.svg',
                    qrImage: '/images/testflight.png',
                    link: appleStoreBetaLink
                },
                {
                    img: '/images/apple-store1.svg',
                    title: this.$t('down_load.app_store'),
                    subTitle: this.$t('down_load.dow3'),
                    img2: '/images/download-qrcode.svg',
                    qrImage: '/images/appstore.png',
                    link: appleStoreLink
                }
            ]
        }
    },
    methods: {
        redirect(to) {
            window.open(to)
        }
    }
}
</script>

<style></style>