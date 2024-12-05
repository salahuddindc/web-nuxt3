<template>
    <div class="invite-friend-modal">
        <a-modal id="invite-user-modal" centered :visible="localShow" :footer="false" :title="false"
            @cancel="close" width="678px">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="22">
                    <p class="invite-friends-title fw-5 mb-0">{{ $t('bscard.bsc39') }}</p>
                </a-col>

                <a-col :lg="2" align="end"> <img src="/images/ud-cross.svg" class="pointer" @click="close" />
                </a-col>

            </a-row>
            <a-row :gutter="16" class="pt-4">
                <a-col :lg="12">
                    <!-- <div class="invite-code-bg" id="downloadArea">
                        <div class="pl-2 pt-2 ml-1">
                            <img src="/images/bitnasdaq-logo.svg" />
                            <p class="signup-txt fw-7 mr-5 pr-4 pt-1">{{ $t('bscard.bsc30') }}</p>
                        </div>
                        <div class="modal-qrcode">
                            <div class="text-right">
                                <img src="/images/qrcode123.svg" />
                            </div>
                            <p class="mb-1 small-txt fw-5 pt-1 text-right">{{ $t('bscard.bsc31') }}</p>
                            <p class="mb-2 referral-code fw-5 text-right">{{ $t('bscard.bsc32') }} <span>5A0C3C</span></p>
                        </div>
                    </div> -->
                    <a-row class="qr-modal invite-code-bg p-3" id="downloadArea">
                        <a-col class="col-alignment">
                            <img src="/images/refer-logo.svg" alt="" width="40%">
                        </a-col>
                        <a-col>

                            <p class="qr-invite-txt text-center fw-4 py-3">
                                {{ $t('public.ph76') }}
                            </p>

                        </a-col>
                        <a-col>
                            <div class="currency-curve">
                                <div id="canvas-modal"></div>

                            </div>
                            <p class="qr-invite-txt-grey2 text-center fw-5 py-2 mb-0">{{ $t('public.ph77') }}
                            </p>
                            <p class="qr-invite-txt-grey2 text-center fw-4 mb-0">
                                {{ $t('public.ph78') }}: <span class="fw-5">{{ $userinfo.invitationcode
                                    }}</span>
                            </p>
                        </a-col>
                    </a-row>
                </a-col>
                <a-col :lg="12">
                    <a-row :gutter="16" class="col-alignment mb-3 d-block">
                        <a-col :lg="24">
                            <a-row type="flex" justify="space-between" align="middle" class="link-card fw-5">
                                <a-col>
                                    <p class="all-input-desc fw-4 mb-0">{{ $t('public.ph51') }} ID</p>
                                </a-col>
                                <a-col>
                                    <span id='invitation' class="fw-5 all-input-desc">{{
                                        $userinfo.invitationcode }}</span>
                                    <AppClipboard target="#invitation" element-class="link-url1" />
                                </a-col>
                            </a-row>
                        </a-col>
                    </a-row>


                    <a-row :gutter="16" class="col-alignment d-block">
                        <a-col :lg="24">
                            <a-row type="flex" justify="space-between" align="middle" class="link-card fw-5">
                                <a-col>
                                    <p class="all-input-desc fw-4 mb-0">{{ $t('frnd_recom.fr11') }}</p>
                                </a-col>
                                <a-col> <span id='keycopy' class="deposit-address-link"
                                        :title="`${invitationLink}?ref=${$userinfo.invitationcode}`">https://bitnasdaq....</span>
                                    <AppClipboard target="#keycopy" element-class="link-url1" />
                                </a-col>
                            </a-row>

                        </a-col>
                    </a-row>
                    <a-row>
                        <a-col :lg="24">
                            <div class="social-icon mb-2 pt-3">
                                <span @click="openFacebookLogin" @mouseover="hoverKey = 4" @mouseleave="hoverKey = -1"
                                    class="pointer pr-2 mr-2">
                                    <img :src="hoverKey == 4 ? '/images/fb-icon-active.svg' : '/images/fb-icon.svg'"
                                        height="58px" />

                                    <p class="mb-0">{{ $t('bscard.bsc40') }}</p>
                                </span>
                                <!-- facebook vue component -->
                                <facebook-login class="pointer pr-2 mr-2 "
                                    style="width:58px;height:58px !important ;display: none;" ref="facebookLogin"
                                    appId="326022817735322" @login="onLogin" @logout="onLogout" @sdk-loaded="sdkLoaded">
                                </facebook-login>


                                <span @click="openTwitter" @mouseover="hoverKey = 5" @mouseleave="hoverKey = -1"
                                    class="pointer pr-2 mr-2">
                                    <img :src="hoverKey == 5 ? '/images/tw-icon-active.svg' : '/images/tw-icon1.svg'"
                                        height="58px" />
                                    <p class="mb-0">{{ $t('community.com17') }}</p>

                                </span>
                                <span @click="openTelegram" @mouseover="hoverKey = 6" @mouseleave="hoverKey = -1"
                                    class="pointer pr-2 mr-2">
                                    <img :src="hoverKey == 6 ? '/images/tel-icon-active.svg' : '/images/tel-icon.svg'"
                                        height="58px" />
                                    <p class="mb-0">{{ $t('bscard.bsc34') }}</p>

                                </span>
                                <span @click="openReddit" @mouseover="hoverKey = 7" @mouseleave="hoverKey = -1"
                                    class="pointer pr-2 mr-2">
                                    <img :src="hoverKey == 7 ? '/images/red-icon-active.svg' : '/images/red-icon.svg'"
                                        height="58px" />
                                    <p class="mb-0">{{ $t('bscard.bsc35') }}</p>

                                </span>

                            </div>
                        </a-col>
                        <a-col :lg="24">
                            <div class="social-icon">
                                <span @click="download()" @mouseover="hoverKey = 8" @mouseleave="hoverKey = -1"
                                    class="pointer pr-2 mr-2">
                                    <img :src="hoverKey == 8 ? '/images/dow-icon-active.svg' : '/images/dow-icon.svg'"
                                        height="58px" />
                                    <p class="mb-0">{{ $t('bscard.bsc36') }} <br />
                                        {{ $t('bscard.bsc37') }}</p>

                                </span>
                                <span @click="openWhatsApp" @mouseover="hoverKey = 9" @mouseleave="hoverKey = -1"
                                    class="pointer pr-2 mr-2">
                                    <img :src="hoverKey == 9 ? '/images/wapp-icon-active.svg' : '/images/wapp-icon.svg'"
                                        height="58px" />
                                    <p class="mb-0">{{ $t('bscard.bsc38') }}</p>

                                </span>
                                <span @click="openEmail" @mouseover="hoverKey = 10" @mouseleave="hoverKey = -1"
                                    class="pointer pr-2 mr-2">
                                    <img :src="hoverKey == 10 ? '/images/email-invite-active.svg' : '/images/email-invite.svg'"
                                        height="58px" />
                                    <p class="mb-0">{{ $t('bscard.bsc33') }}</p>
                                </span>
                            </div>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
        </a-modal>
    </div>
</template>

<script>
import facebookLogin from 'facebook-login-vuejs';
import html2canvas from 'html2canvas'
  
import { invitationLink } from '~/utils/constants';
export default {
    components: {
        facebookLogin,
  
    },
    props: {
        inviteUserModel: {
            type: Boolean
        },
        close: {
            type: Function
        },
    },
    data() {
        return {
            hoverKey: -1,
            isConnected: false,
            name: '',
            email: '',
            personalID: '',
            FB: undefined,
            localShow: false,
        }
    },
    computed: {
        invitationLink() {
            return invitationLink
        }
    },
    watch: {
        inviteUserModel: {
            handler: function (newVal, oldVal) {
                this.localShow = newVal
            },
            immediate: true
        }
    },
    methods: {
        getUserData() {
            this.FB.api('/me', 'GET', { fields: 'id,name,email' },
                userInformation => {
                    console.warn("data api", userInformation)
                    this.personalID = userInformation.id;
                    this.email = userInformation.email;
                    this.name = userInformation.name;
                }
            )
        },

        sdkLoaded(payload) {
            this.isConnected = payload.isConnected
            this.FB = payload.FB
            if (this.isConnected) this.getUserData()
        },
        onLogin() {
            this.isConnected = true
            this.getUserData()
        },
        onLogout() {
            this.isConnected = false;
        },
        getSharedValues() {
            const _self = this;
            const refer = `${invitationLink}?ref=${_self.$userinfo.invitationcode}`;
            const message = this.$t('depositModal.dm15') + refer;

            return {
                message
            };
        },
        openFacebookLogin() {
            // Replace this with the URL of your hosted invitation.html page
            const { message } = this.getSharedValues();

            // Construct the Facebook share link with the hosted page URL
            const facebookShareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                message
            )}`;

            // Open the Facebook share link in a new window or tab
            window.open(facebookShareLink, '_blank');
        },
        openWhatsApp() {
            const phoneNumber = "***********"; // Replace with the desired phone number
            const { message } = this.getSharedValues();
            const url = `https://api.whatsapp.com/send?phone=&text=${encodeURIComponent(message)}`;
            window.open(url, "_blank");
        },
        openTwitter() {
            const { message } = this.getSharedValues();
            const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}`;
            window.open(twitterUrl, "_blank");
        },
        openEmail() {
            const recipientEmail = "";
            const subject = this.$t('depositModal.dm16');
            const { message } = this.getSharedValues();
            const mailtoLink = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
            window.location.href = mailtoLink;
        },
        openReddit() {
            const { message } = this.getSharedValues();
            const redditUrl = `https://www.reddit.com/message/compose/?message=${encodeURIComponent(message)}`;
            window.open(redditUrl, "_blank");
        },
        openTelegram() {
            const { message } = this.getSharedValues();
            const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(message)}`;
            window.open(telegramUrl, "_blank");
        },

        download() {
            const _self = this;
            if (!_self.loading) {
                _self.loading = true;
                var element = document.getElementById('downloadArea');
                if (element) {
                    html2canvas(element, {
                        x: -5,
                        y: -5,
                        width: element.offsetWidth + 10,
                        height: element.offsetHeight + 5
                    }).then(function (canvas) {
                        var img = new Image();
                        img.src = canvas.toDataURL("image/png");
                        var link = document.createElement("a");
                        link.download = "screenshot.png";
                        link.href = img.src;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        _self.loading = false;
                    });
                } else {
                    console.error("Element not found");
                    _self.loading = false;
                }
            }
        },

        bindQRCode() {
            const _self = this;
            var code = `${invitationLink}?ref=${_self.$userinfo.invitationcode}`;


            let bb = setInterval(function () {
                if (document.getElementById('canvas-modal')) {
                    const qrCode = new _self.QRCodeStyling({
                        width: 125,
                        height: 135,
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
                    document.getElementById("canvas-modal").innerHTML = null;
                    qrCode.append(document.getElementById("canvas-modal"));

                    clearInterval(bb);
                }
            }, 100)
        },
    },
    mounted() {
        let _self = this;
        import('qr-code-styling').then(({ default: QRCodeStyling }) => {
            _self.QRCodeStyling = QRCodeStyling;
        });
        this.bindQRCode()
    },
}
</script>

<style lang=scss scoped>
.facebook-button {
    background-color: #3b5998;
    color: white;
    width: 58px !important;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    font-size: 16px;
}

.social-icon {
    gap: 1rem;

    img {
        height: 50px;
    }
}

.spinner {
    display: none;
}

.data-v-0af1f3c3 {
    height: 58px !important;
}

.currency-curve {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: end;

    canvas {
        width: 50%;
        height: 100%;
        text-align: end;

    }
}
</style>
