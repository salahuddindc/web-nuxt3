<template>
    <div>
        <div class="reward-card mr-3">
            <a-row>
                <a-col :xs="24" :lg="24" align="end">
                    <a-popover :title="false" overlayClassName="disclaimer-popover">
                        <template #content>
                            {{ $t('rewardhub.coupon_disclaimer', { days: list.expiredday }) }}
                        </template>
                        <a-button class="disclaimer-txt fw-4">
                            {{ $t('thirdparty.tdp8') }} <img src="/images/reward-info.svg" class="ml-1" />
                        </a-button>
                    </a-popover>


                </a-col>
            </a-row>
            <a-row class="mt-2  px-3 ">
                <a-col :xs="7" :lg="7" align="center">
                    <p class="price mb-0 text-black fw-5"> {{ list.amount }} <span class="fw-5 usdt-price">{{
                        list.currencyname.toUpperCase() }}</span></p>
                    <p class="coupon-txt mb-0 text-black">{{ $t('rewardhub.rew9') }}</p>
                    <div>
                        <img src="/images/reward-gift.svg" class="my-4 py-4" />
                    </div>
                    <a-button class="receive-btn fw-5 text-black mb-4" @click="Deposit">{{
                        $userinfo.uid ? status : this.$t("public.ph27")
                    }}</a-button>
                </a-col>
                <a-col :xs="1" :lg="1">
                    <a-divider type="vertical" class="reward-divider" />
                </a-col>
                <a-col :xs="16" :lg="16" class="pl-4">
                    <p class="future-transaction mb-2 fw-5 text-black text-truncate"> {{ title }}</p>
                    <p class="mb-0 future-desc"> {{ des.substr(0, 130) }}</p>
                    <a-row :gutter="16" class="col-alignment">
                        <a-col :xs="10" :lg="10" class="pr-0">
                            <p class="current-progress fw-4 mb-0">
                                {{ $t("rewardhub.current_progress") }}
                            </p>
                        </a-col>
                        <a-col :xs="14" :lg="14" align="end" class="pr-2">
                            <p class="current-progress fw-4 mb-0">
                                <span class="text-black">
                                    {{ list.alreadytradeamout }} / {{ list.needtradetotal }}</span>
                                {{
                                    list.type == 4
                                        ? "day"
                                        : list.type == 5 || list.type == 6
                                            ? ""
                                            : list.currencyname.toUpperCase()
                                }}
                            </p>
                        </a-col>
                    </a-row>
                    <a-row :gutter="16">
                        <a-col :xs="24" :lg="24">
                            <a-progress :percent="progress" size="small" />
                        </a-col>
                    </a-row>
                    <p class="current-progress expriation">{{ $t('rewardhub.expire') }}</p>
                    <a-row :gutter="16" class="reward-timer">
                        <a-col :xs="24" :lg="24" :xl="24">
                            <div class="reward-timer-box">
                                <p class="timer-txt mb-0 mr-3 fw-5 col-alignment">
                                    <span class="day-bg">{{ days }}</span>
                                    <span class="pl-2">{{
                                        $t("rewardhub.rew_days")
                                    }}</span>
                                </p>
                                <p class="timer-txt mr-3 mb-0 fw-5">
                                    <span class="day-bg">{{ hours }}</span><span class="pl-1">{{
                                        $t("rewardhub.rew_Hours")
                                    }}</span>
                                </p>
                                <p class="timer-txt mb-0 fw-5">
                                    <span class="day-bg">{{ minutes }}</span><span class="ml-1">{{
                                        $t("rewardhub.rew_min")
                                    }}</span>
                                </p>
                            </div>
                        </a-col>
                    </a-row>
                </a-col>
            </a-row>
        </div>
        <!--
    here backupcode
 -->
        <AppMoreTextModal :show="showMore" :text="moreText" @close="showMore = false" />
    </div>
</template>

<script>


export default {
    props: {
        list: {
            type: Object,
        },
        getWelfareInfos: {
            type: Function,
        },
        index: {
            type: Number,
        },
    },
    computed: {
        title() {
            const lang = this.$store.state.hex_lang.locale;
            if (lang == "zh_cn") {
                return this.list.title.zh_cn;
            }
            return this.list.title.en_us;
        },
        des() {
            const lang = this.$store.state.hex_lang.locale;
            if (lang == "zh_cn") {
                return this.list.dec.zh_cn;
            }
            return this.list.dec.en_us;
        },
        status() {
            let status = "";
            switch (this.list.status) {
                case 0:
                    status = this.$t("tabkeys.tab52");
                    break;
                case 1:
                    status = this.$t("tabkeys.tab53");
                    break;
                case 2:
                    status = this.$t("tabkeys.tab54");
                    break;
                case 3:
                    status = this.$t("tabkeys.tab55");
                    break;
                case 4:
                    status = this.$t("tabkeys.tab56");
                    break;
                default:
                    status = this.$t("tabkeys.tab57");
            }
            return status;
        },
        progress() {
            return (
                (this.list.alreadytradeamout / this.list.needtradetotal) * 100
            );
        },
        showCurves() {
            if (this.list.fundtype < 1) {
                return true;
            }
            return false;
        },
    },
    data() {
        return {
            disabled: false,
            total: 0,
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            componentInterval: "",
            moreText: null,
            showMore: false,
        };
    },
    emits: ["onReceived"],
    beforeDestroy() {
        clearInterval(this.componentInterval);
    },
    methods: {
        getTimeRemaining() {
            this.componentInterval = setInterval(() => {
                //console.log("timerCheck")
                var dateNow = new Date();
                var endtime = Date.parse(this.list.etime);
                this.total = endtime - dateNow;
                this.seconds = Math.floor((this.total / 1000) % 60);
                this.minutes = Math.floor((this.total / (1000 * 60)) % 60);
                this.hours = Math.floor((this.total / (1000 * 60 * 60)) % 24);
                this.days = Math.floor(this.total / (1000 * 60 * 60 * 24));
                // Add leading zero for minutes, seconds, and hours if needed
                this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
                this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
                this.hours = this.hours < 10 ? "0" + this.hours : this.hours;
            }, 1000);
        },
        async Deposit() {
            if (!$userinfo.value.uid) {
                this.$router.push("/login?returnurl=" + this.$route.path);
            } else {
                if (this.list.status == 3) {
                    try {
                        const { data } = await this.$store.dispatch(
                            "recieve_wefare_get",
                            {
                                welfareID: this.list.id,
                            }
                        );
                        if (data) {
                            this.list.status = 4;
                            this.$store.commit("set_message", {
                                type: "ok",
                                text: this.$t("texts.txt40"),
                            });
                            this.$emit("onReceived", this.list.id); // Emitting the event
                        }
                    } catch (error) {
                        //console.log('Error', error)
                    }
                } else {
                    switch (this.list.type) {
                        case 1:
                            this.$router.push("/contract/btc_yx");
                            break;
                        case 2:
                            this.$router.push("/deal/btc_usdt");
                            break;
                        case 3:
                            this.$router.push("/person/wallet");
                            break;
                        case 4:
                            this.$router.push("/deal/btc_usdt");
                            break;
                    }
                }
            }
        },
        viewMore(text) {
            this.showMore = true;
            this.moreText = text;
        },
    },
    mounted() {
        this.getTimeRemaining();

    },
};
</script>
