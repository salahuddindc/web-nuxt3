<template>
    <div class="">
        <div v-if="domLoaded">
            <div class="reward-header">
                <div class="main-content">
                    <a-row :gutter="[16, 16]" type="flex" justify="middle">
                        <a-col :xs="24" :sm="14" :lg="14" :xl="16">
                            <p class="heading fw-5 mb-3">
                                {{ $t("rewardhub.rew5") }}
                            </p>
                            <p class="desc fw-4">{{ $t("rewardhub.rew6") }}</p>
                        </a-col>
                        <a-col :xs="24" :sm="9" :lg="9" :xl="8">
                            <a-card class="gray-card-bg" :bordered="false">
                                <a-row :gutter="16">
                                    <a-col :xs="5" :lg="5">
                                        <img src="/images/total-reward.svg" />
                                    </a-col>
                                    <a-col :xs="19" :lg="19">
                                        <p class="mb-0 total-txt fw-4">
                                            {{ $t("rewardhub.rew8") }}
                                            <span v-if="loggedIn">
                                                <img class="ml-2 pointer" :src="$usersettings.moreconfig
                                                    ?.fundsvisible
                                                    ? '/images/fin-hide.png'
                                                    : '/images/fin-hide-active.svg'
                                                    " @click="toggleFundVisible" height="15" />
                                            </span>
                                        </p>
                                        <p class="mb-0 total-price fw-5">
                                            {{
                                                $usersettings.moreconfig
                                                    ?.fundsvisible
                                                    ? total
                                                    : "*******"
                                            }}
                                            USDT
                                        </p>
                                    </a-col>
                                </a-row>
                                <a-card :bordered="false" class="black-card-bg">
                                    <a-row :gutter="24">
                                        <a-col :xs="8" :lg="8">
                                            <p class="mb-2 bonus-txt fw-4">
                                                {{ $t("rewardhub.rew9") }}
                                            </p>
                                            <p class="mb-0 fw-4 avail-txt">
                                                {{ $t("person.pd17") }}
                                            </p>
                                            <p class="mb-0 usdt-txt fw-5">
                                                {{
                                                    $usersettings.moreconfig
                                                        ?.fundsvisible
                                                        ? welfareAssets.deductamount
                                                        : "*****"
                                                }}
                                                {{ currencyName }}
                                            </p>
                                        </a-col>
                                        <a-col :xs="8" :lg="8">
                                            <p class="mb-2 bonus-txt fw-4">
                                                {{ $t("rewardhub.rew12") }}
                                            </p>
                                            <p class="mb-0 fw-4 avail-txt">
                                                {{ $t("person.pd17") }}
                                            </p>
                                            <p class="mb-0 usdt-txt fw-5">
                                                {{
                                                    $usersettings.moreconfig
                                                        ?.fundsvisible
                                                        ? welfareAssets.experienceamount
                                                        : "*****"
                                                }}
                                                {{ currencyName }}
                                            </p>
                                        </a-col>
                                        <a-col :xs="8" :lg="8">
                                            <p class="mb-2 bonus-txt fw-4">
                                                {{ $t("ico.ico8") }}
                                            </p>
                                            <p class="mb-0 fw-4 avail-txt">
                                                {{ $t("person.pd17") }}
                                            </p>
                                            <p class="mb-0 usdt-txt fw-5">
                                                {{
                                                    $usersettings.moreconfig
                                                        ?.fundsvisible
                                                        ? welfareAssets.experienceamount
                                                        : "*****"
                                                }}
                                                {{ currencyName }}
                                            </p>
                                        </a-col>
                                    </a-row>
                                </a-card>
                            </a-card>
                        </a-col>
                    </a-row>
                </div>
            </div>


            <div class="rewards-hub-tabs">
                <div class="main-content">
                    <div class="rewards-tabs">
                        <RewardTabs @onReceived="refreshRewardPricingCard" />
                    </div>
                    <div class="invite-bg mt-6">
                        <a-row :gutter="[16, 16]" type="flex" align="middle" class="mx-0">
                            <a-col :sm="2" :lg="1" class="invite-bg-img">
                                <img src="/images/reward-invite.svg" alt="">
                            </a-col>
                            <a-col :xs="24" :sm="17" :lg="19" class="pl-4 footer-content">
                                <p class="invite-heading fw-5 mb-0">
                                    {{ $t("rewardhub.rew13") }}
                                </p>
                                <p class="invite-desc1 fw-4 mb-0">
                                    {{ $t("rewardhub.rew14") }}
                                </p>

                            </a-col>
                            <a-col :xs="24" :sm="3" :lg="3">
                                <a-button class="primary-btn fw-5 px-5" @click="() => $router.push('/person/invitation')
                                    ">{{ $t("rewardhub.rew15") }}</a-button>
                            </a-col>
                        </a-row>
                    </div>
                    <a-card :bordered="false" class="pt-6 pb-3">
                        <a-row class="pb-4">
                            <a-col :lg="24">
                                <PublicFaqs :channelid="rewardHubChannel" :subtitle="channelSubtitle.rewardhubSubtitle"
                                    :faqsPerPage="10" />
                            </a-col>
                        </a-row>
                    </a-card>
                </div>
            </div>

        </div>
        <AppLoading backgroundColor="transparent" v-else />
    </div>
</template>

<script>
import { rewardHubChannel, channelSubtitle } from "~/utils/constants";
import RewardTabs from "@/components/RewardsHub/RewardTabs.vue";

export default {
    components: {
        RewardTabs
    },
    computed: {

        currencyName() {
            if (this.welfareAssets.currencyid) {
                const currency = this.$store.state.currencyinfos.find(
                    (item) => item.id == this.welfareAssets.currencyid
                ) || {}
                return currency.currencyname
            } else {
                return "0 USDT";
            }
        },
        total() {
            if (this.welfareAssets.currencyid) {
                return (
                    this.welfareAssets.experienceamount +
                    this.welfareAssets.deductamount +
                    this.welfareAssets.airdrop
                );
            } else {
                return "0";
            }
        },
        loggedIn() {
            return $userinfo.value.uid != undefined
        }
    },
    data() {
        return {
            domLoaded: false,
            welfareAssets: {},
            rewardHubChannel,
            channelSubtitle

        };
    },
    methods: {

        async getWelfareAssets() {
            try {
                if ($userinfo.value.uid) {
                    const { data } = await this.$store.dispatch(
                        "get_wefareassets_get"
                    );
                    if (data) {
                        this.welfareAssets = data;
                    }
                }
            } catch (error) {
                console.log('Error', error)
            }
        },
        async refreshRewardPricingCard(val) {
            if (val) {
                await this.getWelfareAssets();
            }
        },
        toggleFundVisible() {
            this.$store
                .dispatch("user_user_settings_save", {
                    moreConfig: {
                        fundsVisible:
                            !$usersettings.value.moreconfig.fundsvisible,
                    },
                })
                .then(({ data }) => {
                    if (data) {
                        global_refresh_user_settings();
                    }
                });
        },
    },
    created() {
        this.$nextTick(function () {
            this.domLoaded = true
        })
    },
    mounted() {
        if (this.loggedIn) {
            this.getWelfareAssets();
        }
    },
};
</script>

<style lang=scss scoped>
@keyframes boxMove {
    from {
        transform: translateX(0);
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
</style>
