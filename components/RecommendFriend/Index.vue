<template>
    <div class="bg-white">
        <div class="recommend-friend-header">
            <div class="main-content">
                <a-row :gutter="16" type="flex" align="middle">
                    <a-col :xs="24" :sm="12" :lg="14">
                        <a-row :gutter="16">
                            <a-col :lg="24">
                                <p class="p2p-account-heading fw-5 mb-2">{{ $t('public.ph65') }}</p>
                            </a-col>
                            <a-col :lg="18" :xl="16">
                                <p class="friend-desc fw-4 mb-0">{{ $t('public.ph67') }}</p>
                            </a-col>
                            <a-col :lg="24" class=" pt-4 mt-2 recommend-friend-header-btns">

                                <!-- <a-button class="primary-btn px-4" @click="() => $router.push('/person/invitation')">{{
                            $t('bscard.bsc39') }} <img class="mb-1 ml-1" src="/images/refral-arrow.png" alt="">
                        </a-button> -->
                                <nuxt-link to="/person/invitation"><a-button class="rules-btn fw-5 px-0 pt-1"> <img
                                            class="mb-2 mr-2" src="/images/rules-icon.png" alt=""> {{ $t('public.ph66')
                                        }}</a-button>
                                </nuxt-link>
                            </a-col>
                        </a-row>
                    </a-col>
                    <a-col :xs="24" :sm="12" :lg="10">
                        <a-card class="login-invite-card" :bordered="false" v-if="!loggedIn">
                            <a-row class="pt-1">

                                <a-col v-if="activeBtn" :lg="24">
                                    <p class="main-heading fw-5 mb-0">{{ $t('frnd_recom.fr24') }}</p>
                                    <a-row :gutter="16" class="col-alignment my-4">
                                        <a-col :lg="16" :sm="12">
                                            <p class="mb-0 all-card-desc fw-4">{{ $t('frnd_recom.fr30') }}</p>
                                        </a-col>
                                        <a-col :lg="8" :sm="12">
                                            <p class="mb-0 our-Commission-title fw-5">---</p>
                                        </a-col>
                                    </a-row>


                                    <a-row :gutter="16" class="col-alignment mb-3 d-block">
                                        <a-col :lg="24">
                                            <a-row type="flex" justify="space-between" align="middle"
                                                class="link-card fw-5">
                                                <a-col>
                                                    <p class="all-input-desc fw-4 mb-0">{{ $t('public.ph51') }} ID</p>
                                                </a-col>
                                                <a-col>
                                                    <span class="fw-5 all-input-desc">---</span>
                                                </a-col>
                                            </a-row>
                                        </a-col>
                                    </a-row>


                                    <a-row :gutter="16" class="col-alignment d-block">
                                        <a-col :lg="24">
                                            <a-row type="flex" justify="space-between" align="middle"
                                                class="link-card fw-5">
                                                <a-col>
                                                    <p class="all-input-desc fw-4 mb-0">{{ $t('frnd_recom.fr11') }}</p>
                                                </a-col>
                                                <a-col> <span class="deposit-address-link">---</span>
                                                </a-col>
                                            </a-row>

                                        </a-col>
                                    </a-row>
                                    <a-row type="flex" class="text-center mt-4 d-block">
                                        <a-col :lg="24" :sm="24">
                                            <nuxt-link to="/login"><a-button class="primary-btn invite-btn fw-5"
                                                    block>{{ $t('public.ph27') }}</a-button></nuxt-link>

                                        </a-col>
                                    </a-row>
                                </a-col>





                            </a-row>
                        </a-card>

                        <a-card class="login-invite-card" :bordered="false" v-else>
                            <a-row class="pt-1">

                                <a-col v-if="activeBtn" :xs="24" :lg="24">
                                    <p class="main-heading fw-5 mb-0">{{ $t('frnd_recom.fr39') }}</p>
                                    <a-row :gutter="16" class="col-alignment my-4">
                                        <a-col :xs="16" :lg="16" :sm="12">
                                            <p class="mb-0 all-card-desc fw-4">{{ $t('frnd_recom.fr30') }}</p>
                                        </a-col>
                                        <a-col :xs="8" :lg="8" :sm="12">
                                            <p class="mb-0 our-Commission-title fw-5">35%</p>
                                        </a-col>
                                    </a-row>


                                    <a-row :gutter="16" class="col-alignment mb-3 d-block">
                                        <a-col :xs="24" :lg="24">
                                            <a-row type="flex" justify="space-between" align="middle"
                                                class="link-card fw-5">
                                                <a-col :xs="24">
                                                    <p class="all-input-desc fw-4 mb-0">{{ $t('public.ph51') }} ID</p>
                                                </a-col>
                                                <a-col :xs="24">
                                                    <span id='invitation' class="fw-5 all-input-desc">{{
                                                        $userinfo.invitationcode }}</span>
                                                    <AppClipboard target="#invitation" element-class="link-url1" />
                                                </a-col>
                                            </a-row>
                                        </a-col>
                                    </a-row>


                                    <a-row :gutter="16" class="col-alignment d-block">
                                        <a-col :lg="24">
                                            <a-row type="flex" justify="space-between" align="middle"
                                                class="link-card fw-5">
                                                <a-col :xs="24">
                                                    <p class="all-input-desc fw-4 mb-0">{{ $t('frnd_recom.fr11') }}</p>
                                                </a-col>
                                                <a-col :xs="24" class="col-alignment">
                                                    <div id='keycopy' class="deposit-address-link"
                                                        :title="`${invitationLink}?ref=${$userinfo.invitationcode}`">
                                                        {{ invitationLink }}?ref={{
                                                            $userinfo.invitationcode }}</div>
                                                    <AppClipboard target="#keycopy" element-class="link-url1" />
                                                </a-col>
                                            </a-row>

                                        </a-col>
                                    </a-row>
                                    <a-row type="flex" class="text-center mt-4 d-block">
                                        <a-col :xs="20" :lg="20" :xl="21">
                                            <a-button class="primary-btn invite-btn fw-5" block
                                                @click="inviteUserModel = true">{{
                                                    $t('bscard.bsc39') }}<img class="mb-1 ml-1"
                                                    src="/images/refral-arrow.png" alt=""></a-button>
                                        </a-col>
                                        <a-col :xs="4" :lg="4" :xl="3" align="end">
                                            <a-button class="fw-5 invite-code-btn invite-btn" @click="showModal"><img
                                                    src="/images/qr-code-refer.svg" alt=""></a-button>

                                            <a-modal v-model="visible" :title="false" :footer="null" :centered="true"
                                                width="321px" wrapClassName="qr-modal">
                                                <a-row>
                                                    <a-col class="col-alignment">
                                                        <img src="/images/refer-logo.svg" alt="" width="40%">

                                                        <a-button class="qr-btn fw-5" block @click="closeModal"><img
                                                                src="/images/cross-refer.png" alt=""></a-button>


                                                    </a-col>
                                                    <a-col>

                                                        <p class="qr-invite-txt fw-5 py-3 mb-0">
                                                            {{ $t('frnd_recom.register_now') }}
                                                        </p>

                                                    </a-col>
                                                    <a-col class="qr-container">
                                                        <div class="currency-curve">
                                                            <div id="canvas"></div>

                                                        </div>
                                                        <div class="half-circle mt-2">
                                                            <img src="/images/half-circle.svg" alt="">
                                                            <img src="/images/half-circle2.svg" alt="">
                                                        </div>
                                                        <p class="qr-invite-txt-grey fw-4 mb-0">
                                                            {{ $t('frnd_recom.referal_id') }}
                                                        </p>
                                                        <p class="qr-invite-txt-code fw-5 mt-3 mb-0">{{
                                                            $userinfo.invitationcode
                                                            }}</p>
                                                    </a-col>
                                                </a-row>
                                            </a-modal>

                                        </a-col>
                                    </a-row>
                                </a-col>





                            </a-row>
                        </a-card>
                    </a-col>
                </a-row>
            </div>
        </div>



        <div class="refer-change-content marqueeArea" ref="marqueeArea">

            <div class="slider-box marqueeBox col-alignment" ref="marqueeBox" :style="boxStyles">
                <template v-for="index in copyTimes">
                    <div class=" marqueeItem" v-for="(item, listIndex) in getcommission"
                        :key="`marqueeItem-${index}-${listIndex}`">
                        <div class="px-2 col-alignment">
                            <div v-if="item.imgpath"><img :src="item.imgpath" alt="" class="commision-profile"></div>
                            <span v-else class="photo online"
                                :style="{ 'background-color': global_get_random_color(item.rank) }">
                            </span>
                            <div>
                                <p class="mb-0 ml-1">
                                    <span class="fw-5">{{ item.user_id }} Earned {{ item.commission }}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>



        <div class="recommend-friend">
            <div class="main-content">

                <a-row :gutter="16" class="friend-list mx-0">
                    <a-col :xs="24" :lg="24" class="px-0">
                        <a-card :bordered="false" class="recommend-friend-card">
                            <p class="event-guide fw-5 mb-3">
                                <!-- {{ $t('activity.referral_10') }} -->{{ $t('frnd_recom.referal_step') }}
                            </p>
                            <p class="invite1-desc fw-4 mb-1">{{ $t('frnd_recom.higher_returns') }} </p>
                            <p class="invite1-desc fw-4 mb-4">{{ $t('frnd_recom.steps') }}</p>
                            <a-row :gutter="[24, 16]" type="flex" align="middle" class="pt-4">
                                <a-col :xs="24" :sm="8" :lg="8" class="">
                                    <a-row class="event-guid-cards px-4">
                                        <a-col class="col-alignment">
                                            <p class="all-card-heading fw-5 mb-0 ">{{ $t('frnd_recom.fr1') }}</p>
                                            <img src="/images/1.svg" height="45" />
                                        </a-col>
                                        <a-col class="col-alignment mt-2">
                                            <p class="all-card-desc fw-4 referal-2 pr-5">{{ $t('frnd_recom.fr3') }}</p>
                                            <img src="/images/share-refer.svg" height="80" class="mt-4" />
                                        </a-col>
                                    </a-row>


                                </a-col>
                                <a-col :xs="24" :sm="8" :lg="8" class="">
                                    <a-row class="event-guid-cards p-4">
                                        <a-col class="col-alignment">
                                            <p class="all-card-heading fw-5 mb-0 ">{{ $t('frnd_recom.fr4') }}</p>
                                            <img src="/images/2.svg" height="45" />
                                        </a-col>
                                        <a-col class="col-alignment mt-2">
                                            <p class="all-card-desc fw-4 referal-2 pr-5">{{ $t('frnd_recom.fr5') }}</p>
                                            <img src="/images/refer-deposite.svg" height="80" class="mt-4" />
                                        </a-col>
                                    </a-row>
                                </a-col>
                                <a-col :xs="24" :sm="8" :lg="8" class="">
                                    <a-row class="event-guid-cards p-4">
                                        <a-col class="col-alignment">
                                            <p class="all-card-heading fw-5 mb-0 ">{{ $t('frnd_recom.fr6') }}</p>
                                            <img src="/images/3.svg" height="45" />
                                        </a-col>
                                        <a-col class="col-alignment mt-2">
                                            <p class="all-card-desc fw-4 referal-2 pr-5">{{ $t('frnd_recom.fr7') }}</p>
                                            <img src="/images/earn-comission.svg" height="80" class="mt-4" />
                                        </a-col>
                                    </a-row>
                                </a-col>

                            </a-row>

                        </a-card>

                        <a-card class="mt-4 recommend-friend-card" :bordered="false">
                            <p class="event-guide fw-5 mb-3">{{ $t('frnd_recom.fr17') }}</p>
                            <p class="invite1-desc fw-4 mb-1">{{ $t('frnd_recom.fr41') }}</p>
                            <p class="invite1-desc fw-4 mb-5">{{ $t('frnd_recom.fr42') }}</p>
                            <a-row :gutter="[24, 8]" class="mx-0" type="flex" justify="space-between">
                                <a-col :xs="24" :sm="8" :lg="6" v-for="(list, key) in commissionTiersDetails" :key="key"
                                    class="px-0">

                                    <a-card class="tiers-card-list recommend-and-earn" :bordered="false">
                                        <div class="join-img-circle mb-4"><img :src="list.img" alt=""></div>
                                        <p class="all-card-heading fw-5 mb-2">{{ list.title }}</p>
                                        <p class="all-card-desc fw-4 mb-0">{{ list.desc }}</p>
                                    </a-card>

                                </a-col>
                            </a-row>

                        </a-card>


                    </a-col>
                </a-row>

                <a-row :gutter="16" class="mx-0">
                    <a-col :xs="24" :lg="24" class="my-3 mx-0 px-0">
                        <div class="myref" v-if="loggedIn">
                            <p class="event-guide fw-5 mb-3">{{ $t('frnd_recom.fr40') }}</p>

                            <MyInvitationTable />
                        </div>
                        <a-card class="my-5 my-invites-container" :bordered="false">
                            <a-row :gutter="[16, 16]" type="flex" align="middle" class=" my-3 px-5 py-4">
                                <a-col :xs="24" :sm="19" :lg="19" :xl="20" class="px-0">
                                    <a-row type="flex" align="middle" :gutter="16">
                                        <a-col class="px-0 my-invites-img">
                                            <img src="/images/invitation.svg" alt="">
                                        </a-col>
                                        <a-col class="px-0">
                                            <p class="mb-2 all-card-heading fw-5">{{ $t('frnd_recom.fr12') }}
                                            </p>
                                            <p class="all-card-desc fw-4 mb-0">{{ $t('frnd_recom.fr13') }}</p>
                                        </a-col>
                                    </a-row>

                                </a-col>
                                <a-col :xs="24" :sm="4" :lg="4" class="invite-now-btn-row"> <nuxt-link
                                        to="/person/invitation">
                                        <a-button class="primary-btn invite-now-btn fw-5">{{ $t('frnd_recom.fr14') }}
                                        </a-button>
                                    </nuxt-link> </a-col>
                            </a-row>
                        </a-card>

                        <a-card :bordered="false" class="my-3 faq-card">
                            <a-row class="">
                                <a-col :lg="24">
                                    <PublicFaqs :channelid="recommendFriendChannel"
                                        :subtitle="'referral-program_faqs'" />
                                </a-col>
                            </a-row>
                        </a-card>
                    </a-col>
                </a-row>
                <!-- <InviteFriendModal :inviteUserModel="inviteUserModel" :close="close" /> -->
            </div>
        </div>
    </div>
</template>

<script>
import { invitationLink, recommendFriendChannel } from "~/utils/constants";

import MyInvitationTable from '@/components/person/Invitation/MyInvitationTable'



// import InviteFriendModal from './InviteFriendModal.vue';

import { mapActions, mapGetters } from "vuex";
export default {
    components: {

        MyInvitationTable,
        // InviteFriendModal,
 
    },
    watch: {
        '$store.state.hex_client_exchange.active': function (val) {
            this.getrate();
        }
    },
    data() {
        return {
            copyTimes: 2,
            movingDistance: 0,
            windowWidth: null,
            marqueeBox: null,
            marqueeArea: null,
            time: 10,

            recommendFriendChannel,
            signModel: {
                username: '',
                password: '',
                verifycode: '',
                rememberme: true,
            },
            loginWith: 'email',
            thirdPartyLoginLoading: false,
            verifyModel: null,
            visible: false,
            loading: false,
            total: "",
            inviteUserModel: false,
            totalrate: [],
            activeBtn: true,
            found: false,
            show: false,
            totalPrice: 0,
            hoverKey: -1,
            // loggedIn: false,
            page: {
                pagesize: 10,
                pageindex: 1
            },
            searchParam: {},
            earnings: [],
            invitedRecord: {},//邀请记录
            QRCodeStyling: null,
            incomeColumns: [
                {
                    title: this.$t("tableskeys.ms1"),
                    dataIndex: 'time',
                    scopedSlots: { customRender: 'time' },
                },
                {
                    title: this.$t("tableskeys.ms4"),
                    dataIndex: 'remark',
                },
                {
                    title: this.$t("tableskeys.ms5"),
                    dataIndex: 'amount',
                    scopedSlots: { customRender: 'amount' },
                },
                {
                    title: this.$t("tableskeys.ms6"),
                    dataIndex: 'typename',
                },
            ],
            cards: [
                {
                    email: "abc123@gmail.com",
                    ammount: '$15.14',
                    icon: "/images/refer-icon1.svg"
                },
                {
                    email: "xyz123@gmail.com",
                    ammount: '$18.17',
                    icon: "/images/refer-icon2.svg"
                },
                {
                    email: "rgb123@gmail.com",
                    ammount: '$20.1',
                    icon: "/images/refer-icon3.svg"
                },
                {
                    email: "efg123@gmail.com",
                    ammount: '$10.5',
                    icon: "/images/refer-icon4.svg"
                },
                {
                    email: "abc123@gmail.com",
                    ammount: '$15.14',
                    icon: "/images/refer-icon1.svg"
                },


            ],

            commissionRankingColumns: [
                {
                    title: this.$t('frnd_recom.fr37'),
                    dataIndex: 'rank',
                    scopedSlots: { customRender: 'rank' },
                    width: 100
                },
                {
                    title: 'UID',
                    dataIndex: 'user_id',
                    width: 90

                },
                {
                    title: this.$t('frnd_recom.fr38'),
                    dataIndex: 'commission',
                    width: 140

                },
            ],
            commissiondataa: null,
            Rankimages: [
                { url: '/images/rank1.svg', altText: 'Image 1' },
                { url: '/images/rank2.svg', altText: 'Image 2' },
                { url: '/images/rank3.svg', altText: 'Image 3' }
            ],
            commissionRankingData: [
                {
                    commission: '170,689.51553528',
                    user_id: '6***4',

                },

                {
                    commission: '156,542.48259738',
                    user_id: '1***1',
                },
                {
                    commission: '59,881.26674491',
                    user_id: '2***4',
                },
                {
                    commission: '59,881.26674491',
                    user_id: '2***4',
                },
                {
                    commission: '156,542.48259738',
                    user_id: '1***1',
                },

            ],
            commissionTiersDetails: [
                {
                    img: '/images/user-tick.svg',
                    title: this.$t('public.ph68'),
                    desc: this.$t('frnd_recom.fr33')
                },
                {
                    img: '/images/card-receive1.svg',
                    title: this.$t('public.ph71'),
                    desc: this.$t('frnd_recom.fr34')
                },
                {
                    img: '/images/chart.svg',
                    title: this.$t('public.ph75'),
                    desc: this.$t('frnd_recom.fr35')
                },
                {
                    img: '/images/percentage-square.svg',
                    title: this.$t('public.ph751'),
                    desc: this.$t('frnd_recom.fr351')
                },
            ]
        }
    },
    computed: {
        ...mapGetters("article", [
            "getCommissionRank",
        ]),
        boxStyles() {
            return {
                transform: `translateX(-${this.movingDistance}px)`,
                animationDuration: `${this.time}s`,
            };
        },
        getcommission() {
            return this.getCommissionRank
        },
        invitationLink() {
            return invitationLink
        }
    },

    methods: {
        ...mapActions("article", [
            "fetchCommissionRank",
        ]),
        onWidthChange() {
            // this.windowWidth = window.innerWidth;
            this.setMarquee();
        },
        setMarquee() {
            this.copyTimes = 1;
            this.$nextTick(() => {
                const marqueeArea = this.$refs.marqueeArea
                const marqueeBox = this.$refs.marqueeBox
                const areaWidth = marqueeArea ? Math.floor(marqueeArea.offsetWidth) : 0;
                const boxWidth = marqueeBox ? Math.floor(marqueeBox.offsetWidth) : 0;
                // console.log(areaWidth,boxWidth)
                this.copyTimes = Math.max(2, Math.ceil((areaWidth * 2) / boxWidth)) || 2;
                this.movingDistance = boxWidth * Math.floor(this.copyTimes / 2);

                this.time = parseFloat(((this.time * this.movingDistance) / 375).toFixed(2));
            });
        },
        showModal() {
            this.visible = true;
        },
        closeModal() {
            this.visible = false;
        },
        async commissionRanking() {
            let blogObject = {
                loader: 'loadingMainChannels',
                storeDataInCache: true,
            }
            await this.fetchCommissionRank(blogObject);
            this.setMarquee();
        },
        close() {
            this.inviteUserModel = false
        },
        getrate() {
            this.totalPrice = 0;
            this.totalrate.forEach((item) => {
                this.totalPrice = this.$np.plus(this.totalPrice, this.$store.getters.get_client_exchange_rate(item.currencyname, item.amount));
            })
        },

        bindQRCode() {
            const _self = this;
            var code = `${_self.$store.state.hex_config.DomanUrl}/invite?ref=${$userinfo.value.invitationcode}`;


            let bb = setInterval(function () {
                if (document.getElementById('canvas')) {
                    const qrCode = new _self.QRCodeStyling({
                        width: 200,
                        height: 210,
                        type: "canvas",
                        data: code,
                        image: '/images/qrlogo.png',
                        dotsOptions: {
                            color: "#000",
                        },
                        backgroundOptions: {
                            color: "#fff",
                        },
                    });
                    document.getElementById("canvas").innerHTML = null;
                    qrCode.append(document.getElementById("canvas"));

                    clearInterval(bb);
                }
            }, 100)
        },
        appleLogin() {
            var randstr = this.uuid();
            const options = {
                response_type: 'code', // 固定内容
                response_mode: 'form_post',
                state: randstr, // 随机字符串，此处仅做演示
                client_id: 'bitnasdaq.com.develop',
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
                    _self.siginByThreadPlant(randstr);
                }
            }, 1000);
        },
        siginByThreadPlant(state) {
            const _self = this;
            const _sign = Object.assign({}, _self.signModel);
            _self.$store.dispatch('user_user_signin', { randstr: state }).then(({ data }) => {
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
                return true;
            }).then((data) => {
                if (data) {
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
                _self.state.signin = false;
                _self.loading = false;
            })
        },
        async signIn(formName) {
            const _self = this;
            const _sign = Object.assign({}, _self.signModel);
            if (_self.state.signin) return;
            if (_self.loading) return;
            await this.$refs[formName].validate((valid) => {
                if (valid) {
                    _self.loading = true;
                    _self.state.signin = true;
                    _sign.password = crypto.md5String(_sign.password);
                    _self.$store.dispatch('user_user_signin_verify', _sign).then(({ data }) => {
                        _self.verifyModel = data;
                        if (!data) {
                            throw data;
                        }
                        if (data.isabnormalip) {
                            return Captcha.init().then((res) => {
                                if (res && res.ret === 0) {
                                    _sign.randstr = res.randstr;
                                    _sign.ticket = res.ticket;
                                    return true
                                } else if (res && res.ret === 2) {
                                    throw ''
                                }
                            })
                        } else {
                            return true
                        }
                    }).then((data) => {
                        if (data) {
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
                        _self.state.signin = false;
                        _self.loading = false;
                    })
                }
            })
        },
        onSignInSuccess(googleUser) {
            const profile = googleUser.getBasicProfile()
        },
        onSignInError(error) {
            //console.log(error)
        },
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
        getInviteRecord(pageIndex) {//获取邀请记录
            let paging;
            pageIndex ? paging = pageIndex : paging = 1;
            this.$store.dispatch('user_invitationrecord_pagedlist', {
                pagesize: 10,
                pageindex: paging,
                type: 1
            }).then(({ data }) => {
                if (data) {
                    this.total = data.totalitemcount;
                    this.invitedRecord = data;
                } else {
                    this.total = 0;
                    this.invitedRecord = [];
                }
                this.loading = false;
                this.total > 0 ? this.found = false : this.found = true;
            })
        },
        getlways() {//总汇率
            this.page.pageindex = 1;
            var postData = Object.assign(this.searchParam, this.page, { uid: this.$userinfo.uid + "", key: this.$userinfo.secretkey, pagesize: this.page.pagesize });
            this.$store.dispatch('user_assets_record_type_total_getlist', postData).then(({ data }) => {
                if (data && data.pagedata.length > 0) {
                    this.totalrate = data.pagedata;
                    this.getrate();
                }
            })
        },
    },
    mounted() {
        let _self = this;
        // if (this.$userinfo.uid) {
        //     this.loggedIn = true;
        // }
        import('qr-code-styling').then(({ default: QRCodeStyling }) => {
            _self.QRCodeStyling = QRCodeStyling;
        });
        this.commissionRanking()
        this.bindQRCode()

        window.addEventListener("resize", () => {
            _self.windowWidth = window.offsetWidth
        })
        window.addEventListener("scroll", () => {
            _self.imgLoaded = true
        })
    },
}
</script>

<style lang=scss scoped>
@keyframes boxMove {
    from {
        transform: translateX(0);
    }
}

.photo {
    display: inline-block;
    border-radius: 200px;
    text-align: center;
    width: 39px;
    height: 39px;
    line-height: 36px;
    vertical-align: middle;
    margin-right: 0px;
    color: #ffffff;
    position: relative;

    img {
        object-fit: cover;
    }
}

.marqueeArea {
    position: relative;
    overflow: hidden;
}

.marqueeBox {
    display: inline-block;
    white-space: nowrap;
    animation: boxMove 10s linear infinite;
}

.marqueeBox:hover {
    animation-play-state: paused;
}

.marqueeItem {
    display: inline-block;
}

.refer-change-content {
    background: #31353C;
    color: #fff;
    font-size: 0.875rem;

    .slider-box {
        /* justify-content: space-between; */
        gap: .75rem;
        padding: .75rem;

        .refer-Wrapper {
            gap: 0.875rem;
        }
    }
}

.single-image {
    display: inline-block;
}

::-webkit-scrollbar {
    width: 9px;
    height: 60px;
}

/* Track */
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 transparent;
    border-radius: 40px;
}

/* Handle */
::-webkit-scrollbar-thumb {
    background: #D9D9D9;
    border-radius: 47px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
    background: #D9D9D9;
}

.currency-curve {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    canvas {
        width: 100%;
        height: 100%;

    }
}
</style>
