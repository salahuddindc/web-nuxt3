<template>
    <div>
        <h1 v-show="0">{{ $store.state.h1Seo }}</h1>
        <audio id="ringtone" preload="auto">
            <source src="/ringtone.mp3" type="audio/mpeg">
            Your browser does not support the audio element.
        </audio>
        <a-row>
            <a-col :lg="24">
                <PublicNickNameModal :nickNameModal="nickNameModal" @close="close" />
            </a-col>
        </a-row>
    </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";

export default {
    name: 'error',
    data() {
        return {
            timer: null,
            title: 'BitNasdaq | ',
            nickNameModal: false,
        }
    },

    computed: {
        ...mapGetters('auth', ['userInfo']),
    },
    head() {
        return {
            meta: this.$store.state.descriptionSeo !== '' ? [{
                name: 'description',
                content: this.$store.state.descriptionSeo
            }] : [],
            link: [
                { rel: 'canonical', href: this.$store.state.currentRouteSeo },
                { rel: 'alternate', href: this.$store.state.currentRouteSeo, hreflang: 'x-default' },
                // { rel: 'alternate', href: this.$store.state.currentRouteSeo, hreflang: 'en' },
                { rel: 'alternate', href: this.$store.state.currentRouteSeo, hreflang: 'en-us' },
                { rel: 'alternate', href: this.$store.state.currentRouteSeo, hreflang: 'en-in' },
                { rel: 'alternate', href: this.$store.state.currentRouteSeo, hreflang: 'en-bd' },
                { rel: 'alternate', href: this.$store.state.currentRouteSeo, hreflang: 'en-sg' }
            ],
            title: this.$store.state.titleSeo
        }
    },
    watch: {
        '$store.state.message': function (message) {
            var ringtone = document.getElementById('ringtone');
            ringtone.play();
            this.show()
        },
        '$store.state.c2c_message': function (message) {
            var ringtone = document.getElementById('ringtone');
            ringtone.play();
            this.showSystemMessage(message)
        },

        '$store.state.notification_message': {
            handler: function (message) {
                if (import.meta.client && message.content.title) {
                    var ringtone = document.getElementById('ringtone');
                    ringtone?.play()
                    this.showNotificationMessage(message)
                }
            },
            deep: true,
            immediate: true
        },
        loggedIn: {
            handler: function (newVal, oldVal) {
                if (newVal) {
                    this.getEvent()
                }
            },
            immediate: true
        },
        userInfo: function (val) {
            this.nickNameModal = false;

            if (!val.uid) {
                return;
            }

            if (!val.nickname) {
                this.nickNameModal = true;
            }
        }

    },
    methods: {
        ...mapActions("constants", ["fetchConstants"]),
        show() {
            let _self = this.$store.state.message;
            this.$notification[_self.type == 'ok' ? 'success' : _self.type]({
                message: _self.type.charAt(0).toUpperCase() + _self.type.slice(1),
                description: _self.text,
            });
            if (_self.text == "Login timeout!") {
                window.location.href = '/login';
            }
        },
        showSystemMessage(message) {
            const _self = this;
            const icon = '/images/volume-down.svg'
            let description = ''
            if (message.systemMessage) {
                let msg = message.msgcontent.split('#1#')
                description = this.$createElement('div', {}, [
                    this.$createElement('span', {
                        domProps: {
                            innerHTML: `${msg[1]}:     <a class="mb-0" href="javascript:;" style="border-bottom:1px dotted;"
                                 >${message.completeorderid}</a> from user <a class="mb-0" href="javascript:;" style="border-bottom:1px dotted;"
                                 >${message.fromuserid}</a> `
                        },
                        class: 'pointer',
                        on: {
                            click: () => {
                                _self.$router.push(`/p2p/in-process/${message.completeorderid}`)
                            }
                        }
                    }),

                ]);
            }
            else {
                description =
                    this.$createElement('span', {
                        domProps: {
                            innerHTML: `${message.msgcontent}`
                        },
                        class: 'pointer',
                        on: {
                            click: () => {
                                _self.$router.push(`/p2p/in-process/${message.completeorderid}`)
                            }
                        }
                    })


            }
            this.$notification.open({
                message: message.message,
                description: description,
                icon: this.$createElement('img', { attrs: { src: icon, alt: 'notification icon' } }),
                // class: 'game-notification',
            });
        },
        showNotificationMessage(obj) {
            const self = this
            const icon = '/images/volume-down.svg'
            const orignalObj = { ...obj.content }
            const content = orignalObj || { title: null, description: null, targetId: null, targetRoute: null, notificationType: null, metaData: {} }
            const notificationSetting = obj.notificationSetting || { placement: null, style: {}, viewPort: null }

            const message = content.title
            const description = content.description
            const notificationType = content.notificationType

            const notificationObj = {
                message,
                description,
                onClick: () => {
                    switch (notificationType) {
                        case 'added_to_group':
                            self.$store.commit('chat/setNotification', content)
                            break

                        case 'removed_from_group':
                            self.$store.commit('chat/setNotification', content)
                            break
                        case 'invited_for_chat':
                            self.$store.commit('chat/setNotification', content)
                            break

                        case 'new_message_received':
                            self.$store.commit('chat/setNotification', content)
                            break

                        case 'new_ticket_received':
                            self.$store.commit('chat/setNotification', content)
                            break
                        case 'ticket_reply':
                            self.$store.commit('chat/setNotification', content)
                            break
                        case 'ticket_updated':
                            self.$store.commit('chat/setNotification', content)
                            break
                        default:
                            break;
                    }
                },

                icon: this.$createElement('img', { attrs: { src: icon, alt: 'notification icon' } }),

            }

            for (const key in notificationSetting) {
                if (Object.prototype.hasOwnProperty.call(notificationSetting, key)) {
                    const element = notificationSetting[key];
                    if (element) {
                        notificationObj[key] = element
                    }
                }
            }

            if (notificationType == 'removed_from_group') {
                self.$store.dispatch('chat/fetchAuthChats', {})
            }

            this.$notification.open(notificationObj);

            this.$store.commit('set_notification_message', { content: { title: null, description: null, targetId: null, notificationType: null } })


        },
        getRate() {
            var _self = this;
            this.$store.dispatch('quotation_getrateinfo_get')
                .then((res) => {
                    _self.$store.commit('set_exchange_rate', res.data)
                    var substr = "market.exchange.rate"
                    _self.$socket.invoke({
                        sub: substr,
                        type: _self.$socket.type.exchangerate_get,
                    });
                    _self.$socket.receive(_self.$socket.type.exchangerate_get, _self.callback);
                });
        },
        callback(data) {
            var _self = this;
            _self.$store.commit('set_exchange_rate', data.data)
        },
        /*Get currency trading, fiat currency*/
        getFiatCurrency() {
            if (this.$store.state.bbTitleList.length > 0) {
                return
            }
            this.$store.dispatch('quotation_frenchcurrency')
                .then((res) => {
                    if (res.data) {
                        this.$store.commit('set_coin_bb', res.data);
                    }
                })
        },
        handleNickNameModal(val) {
            console.log(this.$route)
            if (this.$route.name !== 'register') {
                this.nickNameModal = false;
                if (!val.nickname) {
                    this.nickNameModal = true;
                }
            }
        },
        close() {
            this.nickNameModal = false;
            // this.getTokenAndUserInfo()
            // this.$refs.userProfileCard.updateNick();
        }
    },
    mounted() {
        getTokenAndUserInfo()
        this.$nextTick(() => {
            getdecimalsinfos()
            getUserIP()
            /*是否维护中*/
            this.fetchConstants({ key: "common_system_error" })
            /*汇率*/
            this.getRate()
            /*法币收款方式*/
            fiatpaymenttypeget()
            /*订阅用户通知事件 */

            getSymbolInfos()
            getcurrencyinfos()

        });
        if (this.$storage) {
            const Ref = this.$storage.get("referralCode")
            if (Ref && !this.$route.query.ref) {
                this.$store.commit('setReferralCode', Ref)
            }
            else if (this.$route.query.ref) {
                this.$storage.set("referralCode", this.$route.query.ref)
                this.$store.commit('setReferralCode', this.$route.query.ref)
            }
        }


    },
    beforeDestroy() {
        this.$socket.uninvoke(this.$socket.type.exchangerate_get)
        this.$socket.uninvoke(this.$socket.type.userevent)
    }
}
</script>
<style lang="less" scoped>
.notifications {
    position: fixed;
    z-index: 99999;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    margin-top: 90px;
    text-align: center;
}

.notificationscotent {
    position: absolute;
    bottom: 0px !important;
    left: 10px !important;
}

.hex-message {
    background: rgba(41, 46, 57, 1);
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
    border-radius: 2px;
    opacity: 0.95;
    min-width: 160px;
    color: #ffffff;
    font-size: 14px;
    display: inline-block;
    margin: 0 auto 10px auto;
    padding: 15px 30px;
}

.hex-message-icon {
    background-repeat: no-repeat;
    background-size: cover;
    display: inline-block;
    width: 24px;
    height: 24px;
    vertical-align: middle;
    margin-left: -10px;
    position: absolute;
}

.hex-message-icon.error {
    background-image: url("../../static/images/error.svg");
}

.hex-message-icon.ok {
    background-image: url("../../static/images/right.png");
}

.hex-message-content {
    position: relative;
}

.hex-message-text {
    display: inline-block;
    text-align: left;
    padding-left: 25px;
    line-height: 24px;
}
</style>
