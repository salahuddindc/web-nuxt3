<template>
    <div>
        <a-drawer :placement="placement" :closable="false" class="menu-drawer" :visible="show" @close="onClose">

            <div class="header-logo pl-4 pr-3 mt-3">
                <a-row>
                    <a-col :xs="22">
                        <nuxt-link to="/">
                            <img src="/images/logo.svg" alt="bitnasdaq-logo" width="100" height="26"
                                class="bitnasdaq-logo" />
                        </nuxt-link>
                    </a-col>
                    <a-col :xs="2">
                        <CloseOutlined  @click="onClose"/>
                    </a-col>
                </a-row>
            </div>
            <div v-if="!$store.state.hex_uid.value" class="mr-1">
                <a-row class="pl-4 pr-3 pt-4" :gutter="16">
                    <a-col :sm="12" :xs="12" @click="onClose">
                        <a-button block class="cancel-outline-btn fw-5">
                            <nuxt-link to="/login">{{ $t("public.ph27") }}</nuxt-link>
                        </a-button>
                    </a-col>
                    <a-col :sm="12" :xs="12" @click="onClose">
                        <a-button block class="fw-5 primary-btn"><nuxt-link to="/register">{{
                            $t("public.ph28")
                                }}</nuxt-link></a-button>
                    </a-col>
                </a-row>
            </div>
            <a-row class="">
                <a-col :xs="24" :sm="24" :md="24">
                    <a-menu style="width: 260px" :default-selected-keys="['1']" :open-keys.sync="openKeys" mode="inline"
                        @click="handleClick">
                        <a-menu-item key="buyCrypto">
                            <nuxt-link to="/p2p/buy-and-sell"> {{ $t('public.ph16') }} </nuxt-link>
                        </a-menu-item>

                        <a-sub-menu key="sub2" @titleClick="titleClick">
                            <template #title>
                                <span>
                                    {{ $t('public.ph25') }}
                                </span>
                            </template>
                            <a-menu-item-group key="g2">
                                <a-menu-item key="2">
                                    <nuxt-link :to="'/contract-pro/btc_yx'">
                                        <p class="menu-list-text fw-5">
                                            {{ $t('public.perpetual_future') }}
                                        </p>
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item key="3">
                                    <div v-if="environment">
                                        <a :href="demoTrade">
                                            <p class="menu-list-text fw-5">
                                                {{ $t("deposit.dc12") }}
                                            </p>
                                        </a>
                                    </div>
                                    <div v-else>
                                        <a href="https://bitnasdaq.com/deal-pro/btc_usdt">

                                            <p class="menu-list-text fw-5">
                                                {{ $t("deposit.dc13") }}
                                            </p>
                                        </a>
                                    </div>
                                </a-menu-item>
                                <a-menu-item key="4">
                                    <a :href="artileDirectLinks.tradeArticles" target="_blank">

                                        <p class="menu-list-text fw-5">
                                            {{ $t('public.trading_articles') }}
                                        </p>
                                    </a>
                                </a-menu-item>

                            </a-menu-item-group>
                        </a-sub-menu>
                        <a-sub-menu key="sub1" @titleClick="titleClick">
                            <template #title>
                                <span><span> {{ $t('public.ph24') }} </span></span>
                            </template>
                            <a-menu-item-group key="g1">
                                <a-menu-item key="2">
                                    <nuxt-link :to="'/deal-pro/btc_usdt'">
                                        <p class="menu-list-text fw-5 mb-0">{{ $t('public.ph18') }}</p>
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item key="3" v-if="showMargin">
                                    <nuxt-link :to="'/margin-pro/btc_usdt'">
                                        <p class="menu-list-text fw-5">{{ $t('public.ph20') }}</p>
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item key="4">
                                    <nuxt-link to="/convert">
                                        <p class="menu-list-text fw-5">
                                            {{ $t("public.ph22") }}
                                        </p>
                                    </nuxt-link>
                                </a-menu-item>

                            </a-menu-item-group>
                        </a-sub-menu>


                        <a-menu-item key="market">
                            <nuxt-link to="/market">
                                {{ $t('public.ph17') }}
                            </nuxt-link>
                        </a-menu-item>
                        <a-menu-item key="copyTrade">
                            <nuxt-link to="/trading-bot">
                                {{ $t('copytrade.header_trade') }}
                            </nuxt-link>
                        </a-menu-item>
                        <a-menu-item key="play-card" v-if="showGame">
                            <a href="javascript:;" @click="redirectTo('/play-card')">
                                {{ $t('home.headBull') }}
                            </a>
                        </a-menu-item>
                        <a-menu-item key="buybnq" v-if="showBuyBnq">
                            <nuxt-link to="/buy-bnq">
                                <!-- {{ $t('public.ph17') }} -->{{ $t("investment_plan") }}

                            </nuxt-link>
                        </a-menu-item>
                        <a-menu-item key="financial">
                            <nuxt-link to="/financial">
                                {{ $t('public.ph26') }}
                            </nuxt-link>
                        </a-menu-item>
                        <a-sub-menu key="sub4" @titleClick="titleClick" v-if="$store.state.hex_uid.value">
                            <template #title>
                                <span>
                                    {{ $t("public.ph35") }}
                                </span>
                            </template>
                            <a-menu-item-group key="g4">
                                <a-menu-item key="2" class="dropdown-list">
                                    <a-row :gutter="16">
                                        <a-col :xs="20" :sm="20">
                                            <div>
                                                <p class="total-wallet fw-7 mb-0">
                                                    {{ $t("public.ph29") }}
                                                </p>
                                                <p class="wallet-usd fw-7 mb-0"
                                                    v-if="$usersettings.moreconfig?.fundsvisible">
                                                    {{ $store.getters.get_client_exchange_rate_name.mark }}
                                                    {{ $store.getters.get_client_exchange_rate("USDT",
                                                        $userassets.totalassetes) }}
                                                </p>
                                                <p class="wallet-usd fw-7 mb-0" v-else>{{
                                                    $store.getters.get_client_exchange_rate_name.mark }}
                                                    ******</p>
                                            </div>
                                        </a-col>
                                        <a-col :xs="4" :sm="4" class="pt-2 eye-icon" @click="toggleFundVisible">
                                            <svg width="15" height="15" class="svg-icon ml-2 pointer">
                                                <use :xlink:href="$usersettings.moreconfig?.fundsvisible
                                                    ? '/images/svg/sprite.svg#us-eye-icon'
                                                    : '/images/svg/sprite.svg#us-eye-active-icon'
                                                    "></use>
                                            </svg>
                                        </a-col>
                                    </a-row>
                                </a-menu-item>
                                <a-menu-item key="3" class="dropdown-list">
                                    <nuxt-link to="/person/wallet">
                                        <a-row :gutter="16">

                                            <a-col :xs="20" :sm="20" class="pr-0">
                                                <p class="menu-list-text fw-5 mb-0">
                                                    {{ $t("public.ph30") }}
                                                </p>
                                                <p class="menu-sub-txt fw-5 mb-0"
                                                    v-if="$usersettings.moreconfig?.fundsvisible">{{
                                                        $store.getters.get_client_exchange_rate_name.mark }}
                                                    {{ $store.getters.get_client_exchange_rate("USDT",
                                                        $userassets.totalfunding)
                                                    }}</p>
                                                <p class="menu-sub-txt fw-5 mb-0" v-else>{{
                                                    $store.getters.get_client_exchange_rate_name.mark }}
                                                    ******</p>
                                            </a-col>
                                        </a-row>
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item key="4" class="dropdown-list">
                                    <div v-if="getP2p">
                                        <nuxt-link to="/person/p2p">
                                            <a-row :gutter="16">

                                                <a-col :xs="20" :sm="20" class="pr-0">
                                                    <p class="menu-list-text fw-5 mb-0">
                                                        {{ $t("public.ph33") }}
                                                    </p>
                                                    <span class="menu-sub-txt fw-5"
                                                        v-if="$usersettings.moreconfig?.fundsvisible">{{
                                                            $store.getters.get_client_exchange_rate_name.mark }}
                                                        {{
                                                            $store.getters.get_client_exchange_rate("USDT",
                                                                $userassets.totalctwoc
                                                            )
                                                        }}</span>
                                                    <span class="menu-sub-txt fw-5" v-else>{{
                                                        $store.getters.get_client_exchange_rate_name
                                                            .mark
                                                    }}
                                                        ******</span>
                                                </a-col>
                                            </a-row>
                                        </nuxt-link>
                                    </div>
                                </a-menu-item>
                                <a-menu-item key="5" class="dropdown-list">
                                    <div v-if="showMargin">
                                        <nuxt-link to="/person/margin">
                                            <a-row :gutter="16">
                                                <a-col :xs="20" :sm="20" class="pr-0">
                                                    <p class="menu-list-text fw-5 mb-0">
                                                        {{ $t("public.ph31") }}
                                                    </p>
                                                    <span class="menu-sub-txt fw-5"
                                                        v-if="$usersettings.moreconfig?.fundsvisible">{{
                                                            $store.getters.get_client_exchange_rate_name
                                                                .mark
                                                        }}
                                                        {{
                                                            $store.getters.get_client_exchange_rate(
                                                                "USDT",
                                                                $userassets.totalmargin
                                                            )
                                                        }}
                                                    </span>
                                                    <span class="menu-sub-txt fw-5" v-else>{{
                                                        $store.getters.get_client_exchange_rate_name
                                                            .mark
                                                    }}
                                                        ******</span>
                                                </a-col>
                                            </a-row>
                                        </nuxt-link>
                                    </div>
                                </a-menu-item>
                                <a-menu-item key="6" class="dropdown-list">
                                    <div>
                                        <nuxt-link to="/person/contract">
                                            <a-row :gutter="16">
                                                <a-col :xs="20" :sm="20" class="pr-0">
                                                    <p class="menu-list-text fw-5 mb-0">
                                                        {{ $t("public.ph32") }}
                                                    </p>
                                                    <span class="menu-sub-txt fw-5"
                                                        v-if="$usersettings.moreconfig?.fundsvisible">{{
                                                            $store.getters.get_client_exchange_rate_name
                                                                .mark
                                                        }}
                                                        {{
                                                            $store.getters.get_client_exchange_rate(
                                                                "USDT",
                                                                $userassets.totalcontractusdt
                                                            )
                                                        }}</span>
                                                    <span class="menu-sub-txt fw-5" v-else>{{
                                                        $store.getters.get_client_exchange_rate_name
                                                            .mark
                                                    }}
                                                        ******</span>
                                                </a-col>
                                            </a-row>
                                        </nuxt-link>
                                    </div>
                                </a-menu-item>
                                <a-menu-item key="7" class="dropdown-list">
                                    <div v-if="showGame">
                                        <nuxt-link to="/person/game-account">
                                            <a-row :gutter="16">
                                                <a-col :xs="20" :sm="20" class="pr-0">
                                                    <p class="menu-list-text fw-5 mb-0">
                                                        {{ $t("public.ph80") }}
                                                    </p>
                                                    <span class="menu-sub-txt fw-5"
                                                        v-if="$usersettings.moreconfig?.fundsvisible">{{
                                                            $store.getters.get_client_exchange_rate_name.mark }}
                                                        {{
                                                            $store.getters.get_client_exchange_rate("USDT",
                                                                $userassets.totalgame
                                                            )

                                                        }}</span>
                                                    <span class="menu-sub-txt fw-5" v-else>{{
                                                        $store.getters.get_client_exchange_rate_name
                                                            .mark
                                                    }}
                                                        ******</span>
                                                </a-col>
                                            </a-row>
                                        </nuxt-link>
                                    </div>
                                </a-menu-item>
                                <a-menu-item key="8" class="dropdown-list">
                                    <nuxt-link to="/rewards-hub">
                                        <a-row :gutter="16">
                                            <a-col :xs="20" :sm="20" class="pr-0">
                                                <p class="menu-list-text fw-5 mb-0">
                                                    {{ $t("tableskeys.bh5") }}
                                                </p>
                                                <span class="menu-sub-txt fw-5"
                                                    v-if="$usersettings.moreconfig?.fundsvisible">{{
                                                        $store.getters.get_client_exchange_rate_name
                                                            .mark
                                                    }}
                                                    {{
                                                        $store.getters.get_client_exchange_rate(
                                                            "USDT",
                                                            $userassets.totalgift
                                                        )
                                                    }}</span>
                                                <span class="menu-sub-txt fw-5" v-else>{{
                                                    $store.getters.get_client_exchange_rate_name
                                                        .mark
                                                }}
                                                    ******</span>
                                            </a-col>
                                        </a-row>
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item key="9" class="dropdown-list">
                                    <nuxt-link to="/person/wallet-history">
                                        <a-row :gutter="16">
                                            <a-col :xs="20" :sm="20" class="pr-0">
                                                <p class="menu-list-text fw-5 mb-0 pt-2">
                                                    {{ $t("public.ph34") }}
                                                </p>
                                            </a-col>
                                        </a-row>
                                    </nuxt-link>
                                </a-menu-item>
                            </a-menu-item-group>
                        </a-sub-menu>
                        <a-sub-menu key="sub3" @titleClick="titleClick" v-if="$store.state.hex_uid.value">
                            <template #title>
                                <span>
                                    {{ $t("public.ph47") }}
                                </span>
                            </template>
                            <a-menu-item-group key="g3">
                                <a-menu-item key="2">
                                    <div v-if="getP2p">
                                        <nuxt-link to="/p2p/orders-history">
                                            <p class="menu-list-text fw-5">P2P</p>
                                        </nuxt-link>
                                    </div>
                                </a-menu-item>
                                <a-menu-item key="3">
                                    <div v-if="getFinancial">
                                        <nuxt-link to="/person/financial-deal">
                                            <p class="menu-list-text fw-5">
                                                {{ $t("public.ph36") }}
                                            </p>
                                        </nuxt-link>
                                    </div>
                                </a-menu-item>
                                <a-menu-item key="4">
                                    <nuxt-link to="/person/deal">
                                        <p class="menu-list-text fw-5">
                                            {{ $t("public.ph38") }}
                                        </p>
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item key="5">
                                    <div v-if="showMargin">
                                        <nuxt-link to="/person/margin/margin-deal">
                                            <p class="menu-list-text fw-5">
                                                {{ $t("public.ph40") }}
                                            </p>
                                        </nuxt-link>
                                    </div>
                                </a-menu-item>
                                <a-menu-item key="6">
                                    <nuxt-link to="/person/contract/contract-deal">
                                        <p class="menu-list-text fw-5">
                                            {{ $t("public.ph42") }}
                                        </p>
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item key="7">
                                    <nuxt-link to="/person/game-history">
                                        <p class="menu-list-text fw-5">
                                            {{ $t("home.headBull") }}
                                        </p>
                                    </nuxt-link>
                                </a-menu-item>
                                <a-menu-item key="8">
                                    <nuxt-link to="/person/convert-history">
                                        <p class="menu-list-text fw-5">
                                            {{ $t("public.ph45") }}
                                        </p>
                                    </nuxt-link>
                                </a-menu-item>
                            </a-menu-item-group>
                        </a-sub-menu>

                    </a-menu>
                </a-col>
            </a-row>
        </a-drawer>
    </div>
</template>
<script>
import { btcCtid, artileDirectLinks, serverPort } from '~/utils/constants';
import { mapGetters } from "vuex";

import crypto from "@/plugins/axios/crypto";

export default {
    props: {
        type: {
            type: String,
            default: null,
        },
        show: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            artileDirectLinks,
            placement: 'left', hoverKey: -1,
            current: ['mail'],
            openKeys: ['sub1'],
        }
    },

    computed: {
        ...mapGetters("constants", ["getP2p", "getFinancial", "showMargin", "showGame", "showBuyBnq"]),
        environment() {
            if (serverPort == 9087) {
                return true;
            }
            return false;
        },
        defaultCoinCtid() {
            return btcCtid
        },
        demoTrade() {
            if ($userinfo.uid) {
                var loginkey = crypto.md5String(
                    $userinfo.uid + $userinfo.secretkey
                );
                return (
                    "https://test.bitnasdaq.com/deal-pro/btc_usdt?userid=" +
                    $userinfo.uid +
                    "&loginkey=" +
                    loginkey +
                    ""
                );
            } else {
                return "/login?returnurl=demoTrade";
            }
        },
    },
    watch: {
        openKeys(val) {
            //console.log('openKeys', val);
        },
    },

    methods: {
        handleClick(e) {
            //console.log('click', e);
        },
        titleClick(e) {
            //console.log('titleClick', e);
        },
        toggleFundVisible() {
            const _self = this;
            _self.$store
                .dispatch("user_user_settings_save", {
                    moreConfig: {
                        fundsVisible: !$usersettings.moreconfig.fundsvisible,
                    },
                })
                .then(({ data }) => {
                    if (data) {
                        global_refresh_user_settings();
                    }
                });
        },
        onClose() {
            this.$emit('onClose', true)
        },
    },
    mounted() {
        // Icon.setTwoToneColor("#FFA500");

        if ($userinfo.uid && !$userassets.totalassetes)
            this.global_refresh_user_assets();
        if ($userinfo.uid && !$usersettings.moreconfig)
            global_refresh_user_settings();
        //close drawer
        const _self = this
        if (process.client) {
            window.addEventListener('resize', () => {
                if (window.innerWidth > 991) {
                    _self.$emit('onClose', true)
                }
            })
        }
    },

}
</script>
<style lang="scss">
@import '@/assets/scss/pages/header/menu-drawer.scss';
</style>
