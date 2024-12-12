<template>
    <div class="app-download">

        <a-row>
            <a-col :xs="24" :md="{span: 18, offset: 3 }" :lg="{span: 12, offset: 0 }">
                <h2 class="fw-5 mt-lg-12 mt-md-12 mt-sm-8 mt-xs-8 lh-lg-40 lh-md-35 font-lg-32 lh-md-28 lh-sm-24 font-md-28 font-sm-24 font-xs-18 secondary-black mb-2">
                    {{ $t('google.loadgoogle') }}</h2>
                    <h6 class="lh-23 pr-28 secondary-black fw-4">{{ $t('down_load.bind_your_account_with_bitnasdaq_authenticator') }}</h6>
                <a-row :gutter="40" class="mt-15 app-list" >
                    <a-col :xs="12" :lg="12">
                        <h5 class="mb-6 secondary-black fw-5">{{ $t('down_load.dow4') }}</h5>
                        <a-card class="app-box mb-3 pointer"  @click="redirect(list.google.link)">
                            <a-popover placement="bottom" overlay-class-name="ios-popover" trigger="hover">
                                <template  #content>
                                    <img :src="list.google.qrImage" class="text-center mt-3" height="150px" />
                                    <p class="list-subheading fw-5 secondary-black mb-0 py-2">{{ $t('home.home17') }}
                                    </p>
                                </template>
                            <a-row class="col-alignment">
                                <a-col :xs="5" :lg="5">
                                    <img :src="list.google.img" height="24px"/>
                                </a-col>
                                <a-col :xs="13" :lg="13">
                                    <p class="secondary-black fw-5 mb-0">{{ list.google.title }}</p>
                                    <p class="app-sec-text mb-0">{{list.google.subTitle}}</p>
                                </a-col>
                                <a-col :xs="6" :lg="6" align="end">
                                    <img :src="list.google.img2" />
                                </a-col>
                            </a-row>
                            </a-popover>
                        </a-card>
                    </a-col>
                    <a-col :xs="12" :lg="12">
                        <h5 class="mb-6 secondary-black fw-5">{{ $t('down_load.ios') }}</h5>
                        <a-card class="app-box mb-3 pointer" @click="redirect(list.ios.link)">
                            <a-popover placement="bottom" overlay-class-name="ios-popover" trigger="hover">
                                <template  #content>
                                    <img :src="list.google.qrImage" class="text-center mt-3" height="150px" />
                                    <p class="list-subheading fw-5 secondary-black mb-0 py-2">{{ $t('home.home17') }}
                                    </p>
                                </template>
                            <a-row class="col-alignment">
                                <a-col :xs="5" :lg="5">
                                    <img :src="list.ios.img" height="24px"/>
                                </a-col>
                                <a-col :xs="13" :lg="13">
                                    <p class="secondary-black fw-5 mb-0">{{list.ios.title}}</p>
                                    <p class="app-sec-text mb-0">{{list.ios.subTitle}}</p>
                                </a-col>
                                <a-col :xs="6" :lg="6" align="end">
                                    <img :src="list.ios.img2" />
                                </a-col>
                            </a-row>
                            </a-popover>
                        </a-card>
                    </a-col>
                </a-row>
            </a-col>
            <a-col :md="{span: 22, offset: 1 }" :lg="{span: 12, offset: 0 }"><img src="/images/right-download2.svg" class="right-img"/></a-col>
        </a-row>
    </div>
</template>

<script>
import { googleAuthenticator, appleGoogleAuthenticator } from "~/utils/constants";
export default {
data() {
    return {
        list: {
            google:
                {
                    img: '/images/playstore.svg',
                    title: this.$t('down_load.dow8'),
                    subTitle: this.$t('down_load.dow11'),
                    img2: '/images/download-qrcode.svg',
                    qrImage: '/images/googleauthplay.png',
                    link: googleAuthenticator
                },
                ios:
                {
                    img: '/images/apple-store1.svg',
                    title: this.$t('down_load.dow13'),
                    subTitle: this.$t('down_load.dow11'),
                    img2: '/images/download-qrcode.svg',
                    qrImage: '/images/googleauthapp.png',
                    link: appleGoogleAuthenticator
                }
        },
    }
},
methods:{
        redirect(to){
            window.open(to)
        }
    }
}
</script>

<style></style>