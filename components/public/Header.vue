<template>
    <div class="">

        <div id="header">
            <a-row :gutter="16" class="m-0 p-0 header-row">
                <a-col :xs="14" :sm="15" :md="15" :lg="4" :xl="3" :xxl="2" class="pr-0">
                    <span class="header-logo">
                        <nuxt-link to="/">
                            <img src="/images/logo.svg" alt="bitnasdaq-logo" width="100" height="26"
                                class="bitnasdaq-logo" />
                        </nuxt-link>
                    </span>
                    <span @mouseover="hoverKey = 40" @mouseleave="hoverKey = -1">
                        <a-popover :title="false" trigger="hover" overlay-class-name="menu-popover promotion-popover"
                            placement="bottomLeft">
                            <template #content>
                                <span @mouseover="hoverKey = 40" @mouseleave="hoverKey = -1">
                                    <a-row :gutter="16" class="pb-3">
                                        <a-col :lg="8" class="left-side pr-0">
                                            <p class="finance-txt fw-6 mb-0 py-4 pl-4">{{ $t('person.pp2') }}</p>
                                            <a-row>
                                                <a-col :lg="24" v-for="(list, key) in recommendedList" :key="key">
                                                    <div class="px-4 header-list">
                                                        <nuxt-link :to="list.link">
                                                            <a-row :gutter="16" class="user-sec1 pr-4">
                                                                <a-col :xs="4" :sm="4" :md="4" :lg="4" class="pt-1">
                                                                    <img :src="list.img" alt="" width="18" height="18">
                                                                </a-col>
                                                                <a-col :xs="20" :sm="20" :md="20" :lg="20">
                                                                    <p class="mb-0 promotion-title fw-5">{{ list.title
                                                                        }}</p>
                                                                    <span class="promotion-desc-txt fw-5">
                                                                        {{ list.desc }}
                                                                    </span>
                                                                </a-col>
                                                            </a-row>
                                                        </nuxt-link>
                                                        <a-divider v-if="key != 4" class="my-0 header-divider" />
                                                    </div>
                                                </a-col>
                                            </a-row>
                                        </a-col>
                                        <a-col :lg="8" class="left-side pr-0">
                                            <p class="finance-txt fw-6 mb-0 py-4 pl-4">
                                                {{ $t("public.ph1") }}
                                            </p>
                                            <a-row>
                                                <a-col :lg="24" v-for="(list, key) in promotionList" :key="key">
                                                    <div class="px-4 header-list">
                                                        <nuxt-link :to="list.link">
                                                            <a-row :gutter="16" class="user-sec1 pr-4">
                                                                <a-col :xs="4" :sm="4" :md="4" :lg="4" class="pt-1">
                                                                    <img :src="list.img" alt="" width="17" height="17">
                                                                    <!-- <svg class="svg-icon" width="17" height="17">
                                                                        <use
                                                                            :xlink:href="`/images/svg/sprite.svg#${list.img}`">
                                                                        </use>
                                                                    </svg> -->
                                                                </a-col>
                                                                <a-col :xs="20" :sm="20" :md="20" :lg="20">
                                                                    <p class="mb-0 promotion-title fw-5">
                                                                        {{ list.title }}
                                                                    </p>
                                                                    <span class="promotion-desc-txt fw-5">
                                                                        {{ list.desc }}
                                                                    </span>
                                                                </a-col>
                                                            </a-row>
                                                        </nuxt-link>
                                                        <a-divider v-if="key != 4" class="my-0 header-divider" />
                                                    </div>
                                                </a-col>
                                            </a-row>
                                        </a-col>
                                        <a-col :lg="8" class="pl-0 financial-sec-tab">
                                            <p class="finance-txt fw-6 mb-0 py-4 pl-4">
                                                {{ $t("public.ph2") }}
                                            </p>
                                            <div class="px-4 header-list pl-4">
                                                <nuxt-link :to="{
                                                    path: '/contract/data',
                                                    query: { tab: 1 },
                                                }">
                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :xs="4" :sm="4" :md="4" :lg="4" class="pt-1">
                                                            <img src="/images/settlement-data.svg" alt="" width="17"
                                                                height="17">
                                                            <!-- <svg class="svg-icon" width="17" height="17">
                                                                <use
                                                                    xlink:href="/images/svg/sprite.svg#settlement-data-icon">
                                                                </use>
                                                            </svg> -->
                                                        </a-col>
                                                        <a-col :xs="20" :sm="20" :md="20" :lg="20" class="pr-0">
                                                            <p class="promotion-title fw-5 mb-0">
                                                                {{ $t("public.ph3") }}
                                                            </p>
                                                            <span class="promotion-desc-txt fw-5">{{
                                                                $t("public.ph4")
                                                            }}</span>
                                                        </a-col>
                                                    </a-row>
                                                </nuxt-link>
                                                <a-divider class="my-0 header-divider" />
                                            </div>

                                            <div class="px-4 header-list">
                                                <nuxt-link :to="{
                                                    path: '/contract/data',
                                                    query: { tab: 3 },
                                                }">
                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :xs="4" :sm="4" :md="4" :lg="4" class="pt-1">
                                                            <img src="/images/funding-rate.svg" alt="" width="17"
                                                                height="17">
                                                            <!-- <svg class="svg-icon" width="17" height="17">
                                                                <use
                                                                    xlink:href="/images/svg/sprite.svg#funding-rate-icon">
                                                                </use>
                                                            </svg> -->
                                                        </a-col>
                                                        <a-col :xs="20" :sm="20" :md="20" :lg="20" class="pr-0">
                                                            <p class="promotion-title fw-5 mb-0">
                                                                {{ $t("public.ph7") }}
                                                            </p>
                                                            <span class="promotion-desc-txt fw-5">{{
                                                                $t("public.ph8")
                                                            }}</span>
                                                        </a-col>
                                                    </a-row>
                                                </nuxt-link>
                                            </div>
                                        </a-col>
                                    </a-row>
                                </span>
                            </template>
                            <div class="logo1-icon-img pointer" @mouseover="hoverKey = 40" @mouseleave="hoverKey = -1">
                                <!-- <img :src="hoverKey == 35 ? '/images/category-active.svg' : '/images/category.svg'"
                                class="pointer" /> -->
                                <!--   <svg width="20" height="20" class="pointer svg-icon">
                                <use :xlink:href="hoverKey == 35
                                        ? '/images/svg/sprite.svg#category-active-icon'
                                        : '/images/svg/sprite.svg#category-icon'
                                    "></use>
                            </svg> -->

                                <!-- <img :src="hoverKey == 40 ? '/images/header-bit-active-icon.svg' : '/images/header-bit-icon.svg'" height="20px"
                                class="pointer" /> -->
                                <img src="/images/header-bit-icon.svg" height="20" width="20" class="pointer" />
                                <span class="icon-img custom-font" @mouseover="hoverKey = 40"
                                    @mouseleave="hoverKey = -1" :class="hoverKey == 40 ? 'active-up-arrow' : ''">
                                    <svg width="12" height="6" class="svg-icon">
                                        <use
                                            :xlink:href="hoverKey == 40 ? '/images/svg/sprite.svg#up-active-arrow-icon' : '/images/svg/sprite.svg#down-arrow-icon'">
                                        </use>
                                    </svg>
                                </span>
                            </div>
                        </a-popover>
                    </span>
                </a-col>
                <a-col :xs="4" :sm="4" :md="4" :lg="13" :xl="14" :xxl="16" class="header-menu pl-3">
                    <a-menu v-model="current" mode="horizontal">
                        <a-menu-item key="buyCrypto" v-if="showP2p">
                            <nuxt-link to="/p2p/buy-and-sell">
                                {{ $t("public.ph16") }}
                            </nuxt-link>
                        </a-menu-item>
                        <a-menu-item key="futures" @mouseover="hoverKey = 23" @mouseleave="hoverKey = -1">

                            <a-popover :title="false" trigger="hover" placement="bottomLeft"
                                overlay-class-name="menu-popover">
                                <template #content>
                                    <span class="icon-img" @mouseover="hoverKey = 23" @mouseleave="hoverKey = -1">
                                        <div class="px-4 header-list">
                                            <nuxt-link :to="'/contract-pro/btc_yx'">

                                                <a-row :gutter="16" class="user-sec1">
                                                    <a-col :lg="4" class="pt-1"><img src="/images/News.svg" height="20"
                                                            width="20"></a-col>
                                                    <a-col :lg="20" class="pr-0">

                                                        <p class="menu-list-text fw-5">
                                                            {{ $t('public.perpetual_future') }}
                                                        </p>
                                                        <span class="menu-sub-txt fw-5">
                                                            {{ $t('public.trade_futures_contracts') }}</span>

                                                    </a-col>
                                                </a-row> </nuxt-link>

                                            <a-divider class="my-0 header-divider" />
                                        </div>
                                        <div class="px-4 header-list">
                                            <nuxt-link to="/copy-trade">
                                                <a-row :gutter="16" class="user-sec1">
                                                    <a-col :lg="4" class="pt-1"><img src="/images/copy-trade-icon.svg"
                                                            height="20" width="20"></a-col>
                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5">
                                                            {{ $t('copy_trade') }}
                                                        </p>
                                                        <span class="menu-sub-txt fw-5">
                                                            {{ $t('copy_top_high_roi_traders') }}
                                                        </span>
                                                    </a-col>
                                                </a-row></nuxt-link>
                                        </div>
                                        <div class="px-4 header-list">
                                            <nuxt-link :to="{
                                                path: '/trading-bot',
                                                query: { tab: 3 },
                                            }">
                                                <a-row :gutter="16" class="user-sec1">
                                                    <a-col :lg="4" class="pt-1"><img src="/images/trading-bot-icon.svg"
                                                            height="20" width="20"></a-col>
                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5">
                                                            {{ $t('copytrade.header_trade') }}
                                                        </p>
                                                        <span class="menu-sub-txt fw-5">
                                                            {{ $t('automated_trade_strategies') }}
                                                        </span>
                                                    </a-col>
                                                </a-row></nuxt-link>
                                        </div>

                                        <div class="px-4 header-list" v-if="environment">
                                            <a :href="demoTrade">
                                                <a-row :gutter="16" class="user-sec1 pb-3">
                                                    <a-col :lg="4" class="pt-1"><img :src="'/images/demo-trade.svg'"
                                                            height="17px" /></a-col>
                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5">
                                                            {{ $t("deposit.dc12") }}
                                                        </p>
                                                        <span class="menu-sub-txt fw-5"> {{
                                                            $t('public.practise_trading') }}</span>
                                                    </a-col>
                                                </a-row>
                                            </a>
                                        </div>
                                        <div class="px-4 header-list" v-else>
                                            <a href="https://bitnasdaq.com/deal-pro/btc_usdt">
                                                <a-row :gutter="16" class="user-sec1 pb-3">
                                                    <a-col :lg="4" class="pt-1"><img :src="'/images/demo-trade.svg'"
                                                            height="17px" /></a-col>
                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5">
                                                            {{ $t("deposit.dc13") }}
                                                        </p>
                                                        <span class="menu-sub-txt fw-5">{{
                                                            $t("deposit.dc14")
                                                        }}</span>
                                                    </a-col>
                                                </a-row>
                                            </a>
                                        </div>

                                        <div class="px-4 header-list">
                                            <a :href="artileDirectLinks.tradeArticles" target="_blank">
                                                <a-row :gutter="16" class="user-sec1">
                                                    <a-col :lg="4" class="pt-1"><img src="/images/trad-articles.svg"
                                                            height="20" width="20"></a-col>

                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5">
                                                            {{ $t('public.trading_articles') }}
                                                        </p>
                                                        <span class="menu-sub-txt fw-5">
                                                            {{ $t('public.read_all_guides') }}
                                                        </span>
                                                    </a-col>
                                                </a-row></a>
                                        </div>
                                    </span>
                                </template>
                                <div class="icon-img custom-font" @mouseover="hoverKey = 23" @mouseleave="hoverKey = -1"
                                    :class="hoverKey == 23 ? 'active-up-arrow' : ''">
                                    {{ $t("public.ph25") }}
                                    <!-- <img src="/images/fire.svg" style="margin-left: -3px; margin-top: -15px" /> -->
                                    <svg width="12" height="6" class="svg-icon">
                                        <use :xlink:href="hoverKey == 23
                                            ? '/images/svg/sprite.svg#up-active-arrow-icon'
                                            : '/images/svg/sprite.svg#down-arrow-icon'
                                            "></use>
                                    </svg>
                                </div>
                            </a-popover>




                        </a-menu-item>
                        <a-menu-item key="trade" @mouseover="hoverKey = 22" @mouseleave="hoverKey = -1">
                            <a-popover :title="false" trigger="hover" placement="bottomLeft"
                                overlay-class-name="menu-popover">
                                <template #content>
                                    <span class="icon-img" @mouseover="hoverKey = 22" @mouseleave="hoverKey = -1">
                                        <div class="px-4 header-list">
                                            <nuxt-link :to="'/deal-pro/btc_usdt'">
                                                <a-row :gutter="16" class="user-sec1">
                                                    <a-col :lg="4" class="pt-1"><img
                                                            :src="'/images/spot.svg'" /></a-col>
                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5">
                                                            {{ $t("public.ph18") }}
                                                        </p>
                                                        <span class="menu-sub-txt fw-5">{{
                                                            $t("public.ph19")
                                                        }}</span>
                                                    </a-col>
                                                </a-row>
                                            </nuxt-link>
                                            <a-divider class="my-0 header-divider" />
                                        </div>
                                        <div class="px-4 header-list" v-if="shouldShowMargin">
                                            <nuxt-link :to="'/margin-pro/btc_usdt'">
                                                <a-row :gutter="16" class="user-sec1">
                                                    <a-col :lg="4" class="pt-1"><img
                                                            :src="'/images/margin.svg'" /></a-col>
                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5">
                                                            {{ $t("public.ph20") }}
                                                        </p>
                                                        <span class="menu-sub-txt fw-5">{{
                                                            $t("public.ph21")
                                                        }}</span>
                                                    </a-col>
                                                </a-row>
                                            </nuxt-link>
                                            <a-divider class="my-0 header-divider" />
                                        </div>
                                        <div class="px-4 header-list">
                                            <nuxt-link :to="{
                                                path: '/trading-bot',
                                                query: { tab: 1 },
                                            }">
                                                <a-row :gutter="16" class="user-sec1">
                                                    <a-col :lg="4" class="pt-1"><img src="/images/trading-bot-icon.svg"
                                                            height="20" width="20"></a-col>
                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5">
                                                            {{ $t('copytrade.header_trade') }}
                                                        </p>
                                                        <span class="menu-sub-txt fw-5">
                                                            {{ $t('automated_trade_strategies') }}
                                                        </span>
                                                    </a-col>
                                                </a-row></nuxt-link>
                                        </div>
                                        <div class="px-4 header-list">
                                            <nuxt-link to="/convert">
                                                <a-row :gutter="16" class="user-sec1">
                                                    <a-col :lg="4" class="pt-1"><img
                                                            :src="'/images/convert.svg'" /></a-col>
                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5">
                                                            {{ $t("public.ph22") }}
                                                        </p>
                                                        <span class="menu-sub-txt fw-5">{{
                                                            $t("public.ph23")
                                                        }}</span>
                                                    </a-col>
                                                </a-row>
                                            </nuxt-link>
                                            <a-divider class="my-0 header-divider" />
                                        </div>

                                    </span>
                                </template>
                                <div class="icon-img custom-font" @mouseover="hoverKey = 22" @mouseleave="hoverKey = -1"
                                    :class="hoverKey == 22 ? 'active-up-arrow' : ''">
                                    {{ $t("public.ph24") }}
                                    <svg width="12" height="6" class="svg-icon">
                                        <use :xlink:href="hoverKey == 22
                                            ? '/images/svg/sprite.svg#up-active-arrow-icon'
                                            : '/images/svg/sprite.svg#down-arrow-icon'
                                            "></use>
                                    </svg>
                                </div>
                            </a-popover>
                        </a-menu-item>

                        <a-menu-item key="market">
                            <nuxt-link to="/market">
                                {{ $t("public.ph17") }}
                            </nuxt-link>
                        </a-menu-item>


                        <a-menu-item key="play-card" v-if="shouldShowGame">
                            <nuxt-link to='/play-card-game'>
                                {{ $t('home.headBull') }}
                            </nuxt-link>
                        </a-menu-item>
                        
                        <!-- <a-menu-item key="investment-plan" v-if="shouldShowBuyBnq">
                            <nuxt-link to="/investment-plan">
                                {{ $t('investment_plan') }}
                            </nuxt-link>
                        </a-menu-item> -->

                        <a-menu-item key="financial" v-if="showFinancial">
                            <nuxt-link to="/financial">
                                {{ $t("public.ph26") }}
                            </nuxt-link>
                        </a-menu-item>
                    </a-menu>
                </a-col>
                <a-col :xs="8" :sm="8" :md="8" :lg="7" :xl="7" :xxl="6" align="end" class="right-side-icons pl-0">
                    <div style="
              display: flex;
              justify-content: flex-end;
              align-items: center;
            ">
                        <div v-if="!loggedIn" class="mr-1">
                            <a-button type="default" class="login-btn px-2 fw-5 mr-1 header-menu">
                                <nuxt-link to="/login">{{ $t("public.ph27") }}</nuxt-link>
                            </a-button>

                            <a-button type="primary" class="register fw-5 header-menu"><nuxt-link to="/register">{{
                                $t("public.ph28")
                                    }}</nuxt-link></a-button>
                        </div>
                        <div v-else>
                            <span class="wallet fw-5 header-menu ">
                                <a-popover :title="false" trigger="hover" placement="bottomLeft"
                                    overlay-class-name="menu-popover wallet-popover" @mouseover="hoverKey = 20"
                                    @mouseleave="hoverKey = -1">
                                    <template #content>
                                        <div>
                                            <span class="icon-img" @mouseover="hoverKey = 20"
                                                @mouseleave="hoverKey = -1">
                                                <div class="px-4 header-list">
                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :lg="20">
                                                            <p class="total-wallet fw-7 mb-1">
                                                                {{ $t("public.ph29") }}
                                                            </p>
                                                            <p class="wallet-usd fw-7 mb-2"
                                                                v-if="$usersettings.moreconfig?.fundsvisible">
                                                                {{ $store.getters.get_client_exchange_rate_name.mark }}
                                                                {{ $store.getters.get_client_exchange_rate("USDT",
                                                                    $userassets.totalassetes) }}
                                                            </p>
                                                            <span class="wallet-usd fw-7" v-else>{{
                                                                $store.getters.get_client_exchange_rate_name.mark }}
                                                                ******</span>
                                                        </a-col>
                                                        <a-col :lg="4" class="pt-2">
                                                            <svg width="15" height="15" class="svg-icon ml-2 pointer"
                                                                @click="toggleFundVisible">
                                                                <use :xlink:href="$usersettings.moreconfig?.fundsvisible
                                                                    ? '/images/svg/sprite.svg#us-eye-icon'
                                                                    : '/images/svg/sprite.svg#us-eye-active-icon'
                                                                    "></use>
                                                            </svg>
                                                        </a-col>
                                                    </a-row>
                                                    <a-divider class="my-0 header-divider" />
                                                </div>

                                                <div class="px-4 header-list">
                                                    <nuxt-link to="/person/wallet">
                                                        <a-row :gutter="16" class="user-sec1">
                                                            <a-col :lg="4" class="pt-1">
                                                                <img src="/images/spot-account.svg" alt="" width="17"
                                                                    height="17">
                                                                <!-- <svg class="svg-icon" width="17" height="17">
                                                                <use xlink:href="/images/svg/sprite.svg#assets-icon">
                                                                </use>
                                                            </svg> -->
                                                            </a-col>
                                                            <a-col :lg="20" class="pr-0">
                                                                <p class="menu-list-text fw-5">
                                                                    {{ $t("public.ph30") }}
                                                                </p>
                                                                <span class="menu-sub-txt fw-5"
                                                                    v-if="$usersettings.moreconfig?.fundsvisible">{{
                                                                        $store.getters.get_client_exchange_rate_name.mark }}
                                                                    {{ $store.getters.get_client_exchange_rate("USDT",
                                                                        $userassets.totalfunding)
                                                                    }}</span>
                                                                <span class="menu-sub-txt fw-5" v-else>{{
                                                                    $store.getters.get_client_exchange_rate_name.mark }}
                                                                    ******</span>
                                                            </a-col>
                                                        </a-row>
                                                    </nuxt-link>
                                                    <a-divider class="my-0 header-divider" />
                                                </div>
                                                <div class="px-4 header-list" v-if="getP2p">
                                                    <nuxt-link to="/person/p2p">
                                                        <a-row :gutter="16" class="user-sec1">
                                                            <a-col :lg="4" class="pt-1">
                                                                <img src="/images/p2p-account.svg" alt="" width="17"
                                                                    height="17">
                                                                <!-- <svg class="svg-icon" width="17" height="17">
                                                                <use
                                                                    xlink:href="/images/svg/sprite.svg#p2p-account-icon">
                                                                </use>
                                                            </svg> -->
                                                            </a-col>
                                                            <a-col :lg="20" class="pr-0">
                                                                <p class="menu-list-text fw-5">
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

                                                    <a-divider class="my-0 header-divider" />
                                                </div>

                                                <div class="px-4 header-list" v-if="shouldShowMargin">
                                                    <nuxt-link to="/person/margin">
                                                        <a-row :gutter="16" class="user-sec1">
                                                            <a-col :lg="4" class="pt-1"><img
                                                                    :src="'/images/margin-account.svg'" /></a-col>
                                                            <a-col :lg="20" class="pr-0">
                                                                <p class="menu-list-text fw-5">
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
                                                    <a-divider class="my-0 header-divider" />
                                                </div>
                                                <div class="px-4 header-list">
                                                    <nuxt-link to="/person/contract">
                                                        <a-row :gutter="16" class="user-sec1">
                                                            <a-col :lg="4" class="pt-1"><img
                                                                    :src="'/images/future-account.svg'" /></a-col>
                                                            <a-col :lg="20" class="pr-0">
                                                                <p class="menu-list-text fw-5">
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
                                                    <a-divider class="my-0 header-divider" />
                                                </div>
                                                <!-- game account -->
                                                <div class="px-4 header-list" v-if="shouldShowGame">
                                                    <nuxt-link to="/person/game-account">
                                                        <a-row :gutter="16" class="user-sec1">
                                                            <a-col :lg="4" class="pt-1">
                                                                <svg class="svg-icon" width="17" height="17">
                                                                    <use
                                                                        xlink:href="/images/svg/sprite.svg#Game-account-icon">
                                                                    </use>
                                                                </svg>
                                                            </a-col>
                                                            <a-col :lg="20" class="pr-0">
                                                                <p class="menu-list-text fw-5">
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

                                                    <a-divider class="my-0 header-divider" />
                                                </div>
                                                <div class="px-4 header-list">
                                                    <nuxt-link to="/rewards-hub">
                                                        <a-row :gutter="16" class="user-sec1">
                                                            <a-col :lg="4" class="pt-1">
                                                                <img src="/images/reward-hub.svg" alt="" width="17"
                                                                    height="17">
                                                                <!-- <svg class="svg-icon" width="17" height="17">
                                                                <use
                                                                    xlink:href="/images/svg/sprite.svg#institution-icon">
                                                                </use>
                                                            </svg> -->
                                                            </a-col>
                                                            <a-col :lg="20" class="pr-0">
                                                                <p class="menu-list-text fw-5 pt-1">
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
                                                    <a-divider class="my-0 header-divider" />
                                                </div>

                                                <div class="px-4 header-list">
                                                    <nuxt-link to="/person/wallet-history">
                                                        <a-row :gutter="16" class="user-sec1 pb-4">
                                                            <a-col :lg="4">
                                                                <img src="/images/billing-details.svg" alt="" width="17"
                                                                    height="17">
                                                                <!-- <svg class="svg-icon" width="17" height="17">
                                                                <use
                                                                    xlink:href="/images/svg/sprite.svg#billing-details-icon">
                                                                </use>
                                                            </svg> -->
                                                            </a-col>
                                                            <a-col :lg="20" class="pr-0">
                                                                <p class="menu-list-text fw-5 pt-1">
                                                                    {{ $t("public.ph34") }}
                                                                </p>
                                                            </a-col>
                                                        </a-row>
                                                    </nuxt-link>
                                                </div>
                                            </span>
                                        </div>
                                    </template>

                                    <div class="icon-img orderimg-icon" @mouseover="hoverKey = 20"
                                        @mouseleave="hoverKey = -1" :class="hoverKey == 20 ? 'active-up-arrow' : ''">
                                        {{ $t("public.ph35") }}

                                        <svg width="12" height="6" class="svg-icon">
                                            <use :xlink:href="hoverKey == 20
                                                ? '/images/svg/sprite.svg#up-active-arrow-icon'
                                                : '/images/svg/sprite.svg#down-arrow-icon'
                                                "></use>
                                        </svg>
                                    </div>
                                </a-popover>
                            </span>
                            <span class="wallet fw-5 ml-3 right-icon header-menu" @mouseover="hoverKey = 21"
                                @mouseleave="hoverKey = -1">
                                <a-popover :title="false" trigger="hover" placement="bottom"
                                    overlay-class-name="menu-popover order-popover">
                                    <template #content>
                                        <span class="icon-img" @mouseover="hoverKey = 21" @mouseleave="hoverKey = -1">
                                            <div class="header-list px-4" v-if="getP2p">
                                                <nuxt-link to="/p2p/orders-history">
                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :lg="4" class="pt-1"><img
                                                                :src="'/images/bankaccount.svg'" /></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5">P2P</p>
                                                            <span class="menu-sub-txt fw-5">
                                                                {{ $t("public.ph44") }}
                                                            </span>
                                                        </a-col>
                                                    </a-row>
                                                </nuxt-link>
                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="header-list px-4" v-if="showFinancial">
                                                <nuxt-link to="/person/financial-deal">
                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :lg="4" class="pt-1">
                                                            <img src="/images/financial.svg" alt="" width="17"
                                                                height="17">
                                                            <!-- <svg class="svg-icon" width="17" height="17">
                                                                <use xlink:href="/images/svg/sprite.svg#financial-icon">
                                                                </use>
                                                            </svg> -->
                                                        </a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5">
                                                                {{ $t("public.ph36") }}
                                                            </p>
                                                            <span class="menu-sub-txt fw-5">
                                                                {{ $t("public.ph37") }}
                                                            </span>
                                                        </a-col>
                                                    </a-row>
                                                </nuxt-link>
                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="header-list px-4">
                                                <nuxt-link to="/person/deal">
                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :lg="4" class="pt-1"><img
                                                                :src="'/images/spot-account.svg'" /></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5">
                                                                {{ $t("public.ph38") }}
                                                            </p>
                                                            <span class="menu-sub-txt fw-5">
                                                                {{ $t("public.ph39") }}
                                                            </span>
                                                        </a-col>
                                                    </a-row>
                                                </nuxt-link>
                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="header-list px-4" v-if="shouldShowMargin">
                                                <nuxt-link to="/person/margin/margin-deal">
                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :lg="4" class="pt-1"><img
                                                                :src="'/images/margin.svg'" /></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5">
                                                                {{ $t("public.ph40") }}
                                                            </p>
                                                            <span class="menu-sub-txt fw-5">
                                                                {{ $t("public.ph41") }}
                                                            </span>
                                                        </a-col>
                                                    </a-row>
                                                </nuxt-link>
                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="header-list px-4">
                                                <nuxt-link to="/person/contract/contract-deal">
                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :lg="4" class="pt-1"><img
                                                                :src="'/images/future-account.svg'" /></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5">
                                                                {{ $t("public.ph42") }}
                                                            </p>
                                                            <span class="menu-sub-txt fw-5">
                                                                {{ $t("public.ph43") }}
                                                            </span>
                                                        </a-col>
                                                    </a-row>
                                                </nuxt-link>
                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <!-- game account  -->

                                            <div class="header-list px-4" v-if="shouldShowGame">
                                                <nuxt-link to="/person/game-history">
                                                    <a-row :gutter="16" class="user-sec1">
                                                        <a-col :lg="4" class="pt-1"><img
                                                                :src="'/images/gameIcon.svg'" /></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5">
                                                                {{ $t("home.headBull") }}
                                                            </p>
                                                            <span class="menu-sub-txt fw-5">
                                                                {{ $t("public.ph79") }}
                                                            </span>
                                                        </a-col>
                                                    </a-row>
                                                </nuxt-link>
                                                <a-divider class="my-0 header-divider" />
                                            </div>

                                            <div class="header-list px-4">
                                                <nuxt-link to="/person/convert-history">
                                                    <a-row :gutter="16" class="user-sec1 pb-3">
                                                        <a-col :lg="4" class="pt-1"><img
                                                                :src="'/images/convert.svg'" /></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5">
                                                                {{ $t("public.ph45") }}
                                                            </p>
                                                            <span class="menu-sub-txt fw-5">
                                                                {{ $t("public.ph46") }}
                                                            </span>
                                                        </a-col>
                                                    </a-row>
                                                </nuxt-link>
                                            </div>
                                        </span>
                                    </template>
                                    <div class="icon-img orderimg-icon" @mouseover="hoverKey = 21"
                                        @mouseleave="hoverKey = -1" :class="hoverKey == 21 ? 'active-up-arrow' : ''">
                                        {{ $t("public.ph47") }}

                                        <svg width="12" height="6" class="svg-icon">
                                            <use :xlink:href="hoverKey == 21
                                                ? '/images/svg/sprite.svg#up-active-arrow-icon'
                                                : '/images/svg/sprite.svg#down-arrow-icon'
                                                "></use>
                                        </svg>
                                    </div>
                                </a-popover>
                            </span>

                            <span class="ml-3 right-icon">
                                <a-popover :title="false" trigger="hover" placement="bottomLeft"
                                    overlay-class-name="menu-popover user-popover">
                                    <template #content>
                                        <span @mouseover="hoverKey = 26" @mouseleave="hoverKey = -1">
                                            <a-row class="verified-user px-3 col-alignment">
                                                <a-col :lg="5"><img :src="$userinfo.avatar
                                                    ? $userinfo.avatar
                                                    : '/images/vector-img1.svg'
                                                    " height="43" width="43" class="circle-border" />
                                                    <div class="verified-user1">
                                                        <!-- <img :src="$userinfo.securitylevel > 1 ? '/images/verified-user1.svg' : '/images/unverified-user.svg'" /> -->
                                                        <svg width="15.75" height="15.75" class="svg-icon">
                                                            <use :xlink:href="$userinfo.securitylevel > 1
                                                                ? '/images/svg/sprite.svg#verified-user1-icon'
                                                                : '/images/svg/sprite.svg#unverified-user-icon'
                                                                "></use>
                                                        </svg>
                                                    </div>
                                                </a-col>
                                                <a-col :lg="19" class="pl-1">
                                                    <p class="verified-email fw-7 mb-0" v-if="$userinfo.email">
                                                        {{ global_string_split($userinfo.email) }}
                                                    </p>
                                                    <p class="mb-0 fw-7" :class="$userinfo.securitylevel > 1
                                                        ? 'verified-txt'
                                                        : 'gray-txt-color'
                                                        ">
                                                        {{
                                                            $userinfo.securitylevel > 1
                                                                ? $t("btntxt.bt1")
                                                                : $t("unverified")
                                                        }}
                                                    </p>
                                                </a-col>
                                            </a-row>
                                            <div class="px-4 header-list">
                                                <nuxt-link to="/person">
                                                    <a-row :gutter="16" class="user-sec col-alignment">
                                                        <a-col :lg="4">
                                                            <!-- <img :src="'/images/dashboard.svg'" /> -->
                                                            <svg width="15.75" height="15.75" class="svg-icon">
                                                                <use xlink:href="/images/svg/sprite.svg#dashboard-icon">
                                                                </use>
                                                            </svg>
                                                        </a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5 mb-0">
                                                                {{ $t("public.ph50") }}
                                                            </p>
                                                        </a-col>
                                                    </a-row>
                                                </nuxt-link>

                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="px-4 header-list">
                                                <nuxt-link to="/person/invitation">
                                                    <div class="header-list">
                                                        <a-row :gutter="16" class="user-sec col-alignment">
                                                            <a-col :lg="4">
                                                                <img src="/images/recommend-friend.svg" width="17"
                                                                    height="17" />
                                                                <!-- <svg class="svg-icon" width="17" height="17">
                                                                    <use
                                                                        xlink:href="/images/svg/sprite.svg#recommend-friend-icon">
                                                                    </use>
                                                                </svg> -->
                                                            </a-col>
                                                            <a-col :lg="20" class="pr-0">
                                                                <p class="menu-list-text fw-5 mb-0">
                                                                    {{ $t("public.ph51") }}
                                                                </p>
                                                            </a-col>
                                                        </a-row>
                                                    </div>
                                                </nuxt-link>

                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="px-4 header-list">
                                                <nuxt-link to="/person/authentication">
                                                    <a-row :gutter="16" class="user-sec col-alignment">
                                                        <a-col :lg="4">
                                                            <!-- <img :src="'/images/identity1.svg'" /> -->
                                                            <svg width="15.75" height="15.75" class="svg-icon">
                                                                <use xlink:href="/images/svg/sprite.svg#identity1-icon">
                                                                </use>
                                                            </svg>
                                                        </a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5 mb-0">
                                                                {{ $t("public.ph52") }}
                                                            </p>
                                                        </a-col>
                                                    </a-row>
                                                </nuxt-link>

                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="px-4 header-list">
                                                <nuxt-link to="/person/security">
                                                    <a-row :gutter="16" class="user-sec col-alignment">
                                                        <a-col :lg="4">
                                                            <!-- <img :src="'/images/security.svg'" /> -->
                                                            <svg width="15.75" height="15.75" class="svg-icon">
                                                                <use xlink:href="/images/svg/sprite.svg#security-icon">
                                                                </use>
                                                            </svg>
                                                        </a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5 mb-0">
                                                                {{ $t("public.ph53") }}
                                                            </p>
                                                        </a-col>
                                                    </a-row>
                                                </nuxt-link>

                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="px-4 header-list">
                                                <nuxt-link to="/person/api">
                                                    <a-row :gutter="16" class="user-sec col-alignment">
                                                        <a-col :lg="4"><img :src="'/images/api.svg'" /></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5 mb-0">API</p>
                                                        </a-col>
                                                    </a-row>
                                                </nuxt-link>

                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="px-4 header-list">
                                                <nuxt-link to="/person/login-history">
                                                    <a-row :gutter="16" class="user-sec col-alignment">
                                                        <a-col :lg="4"><img
                                                                :src="'/images/login-history.svg'" /></a-col>
                                                        <a-col :lg="20" class="pr-0">
                                                            <p class="menu-list-text fw-5 mb-0">
                                                                {{ $t("public.ph54") }}
                                                            </p>
                                                        </a-col>
                                                    </a-row>
                                                </nuxt-link>

                                                <a-divider class="my-0 header-divider" />
                                            </div>
                                            <div class="px-4 header-list pointer" @click="quitAccount">
                                                <a-row :gutter="16" class="pb-4 pt-3 col-alignment pointer">
                                                    <a-col :lg="4">
                                                        <img src="/images/logout-2.svg" width="15.75" height="15.75" />
                                                        <!-- <svg width="15.75" height="15.75" class="svg-icon">
                                                            <use xlink:href="/images/svg/sprite.svg#logout-2-icon">
                                                            </use>
                                                        </svg> -->
                                                    </a-col>
                                                    <a-col :lg="20" class="pr-0">
                                                        <p class="menu-list-text fw-5 mb-0">
                                                            {{ $t("public.ph55") }}
                                                        </p>
                                                    </a-col>
                                                </a-row>
                                            </div>
                                        </span>
                                    </template>
                                    <span @mouseover="hoverKey = 26" @mouseleave="hoverKey = -1">
                                        <svg width="24" height="24" class="svg-icon pointer header-icon-img">
                                            <use :xlink:href="hoverKey == 26
                                                ? '/images/svg/sprite.svg#user-active-icon'
                                                : '/images/svg/sprite.svg#user-icon'
                                                "></use>
                                        </svg>
                                    </span>
                                </a-popover>
                            </span>
                            <span @mouseover.once="getListNotifications" class="ml-3 right-icon header-menu">
                                <span @mouseover="hoverKey = 30" @mouseleave="hoverKey = -1">
                                    <a-popover :title="false" trigger="hover" placement="bottomLeft"
                                        overlay-class-name="menu-popover notification-popover">
                                        <template #content>
                                            <span @mouseover="hoverKey = 30" @mouseleave="hoverKey = -1">
                                                <a-card class="notifications-card">
                                                    <a-row :gutter="16" class="user-sec col-alignment">
                                                        <a-col :lg="19">
                                                            <p class="mb-0 num-color fw-6">
                                                                {{ $t("public.ph48") }}
                                                                <a-badge :count="notificationCount" class="ml-1"
                                                                    :overflow-count="9999"></a-badge>
                                                            </p>
                                                        </a-col>
                                                        <a-col :lg="5" align="end">
                                                            <nuxt-link to="/all-notification">
                                                                <p class="mb-0 all-notification-view fw-5 pointer">
                                                                    {{ $t("public.ph49") }}
                                                                </p>
                                                            </nuxt-link>
                                                        </a-col>
                                                    </a-row>
                                                </a-card>
                                                <div class="pb-3">
                                                    <a-row class="pt-2">
                                                        <a-col :lg="24" v-for="(list, key) in notifications" :key="key">
                                                            <div class="px-4 header-list">
                                                                <a-row :gutter="16" class="user-sec1">
                                                                    <a-col :lg="3" class="pt-1"><img
                                                                            src="/images/notification-icon1.svg" /></a-col>
                                                                    <a-col :lg="20">
                                                                        <span class="pointer"
                                                                            @click="goTo(list.typeid)">
                                                                            <p class="mb-1 view-txt fw-5">
                                                                                {{ list.title }}
                                                                            </p>
                                                                            <p
                                                                                class="view-task fw-5 mb-0 truncateLongTexts">
                                                                                {{ list.content }}
                                                                            </p>
                                                                            <p
                                                                                class="view-task fw-5 mb-0 truncateLongTexts">
                                                                                {{
                                                                                    global_get_local_time(
                                                                                        list.createtime
                                                                                    ).format("HH:mm:ss")
                                                                                }}
                                                                            </p>
                                                                        </span>
                                                                    </a-col>
                                                                </a-row>
                                                                <a-divider v-if="key != 4"
                                                                    class="my-0 header-divider" />
                                                            </div>
                                                        </a-col>
                                                    </a-row>
                                                </div>
                                            </span>
                                        </template>
                                        <span @mouseover="hoverKey = 30" @mouseleave="hoverKey = -1">
                                            <svg width="24" height="24" class="svg-icon pointer header-icon-img">
                                                <use :xlink:href="hoverKey == 30
                                                    ? '/images/svg/sprite.svg#notification-active-icon'
                                                    : '/images/svg/sprite.svg#notification-icon'
                                                    "></use>
                                            </svg>
                                        </span>
                                    </a-popover>
                                </span>
                            </span>
                        </div>
                        <div class="list-sub-menu">
                            <span @mouseover="hoverKey = 27" @mouseleave="hoverKey = -1"
                                class="ml-3 right-icon header-menu">
                                <a-popover :title="false" trigger="hover" placement="bottom"
                                    overlay-class-name="menu-popover download-popover">
                                    <template #content>
                                        <span @mouseover="hoverKey = 27" @mouseleave="hoverKey = -1">
                                            <div class="text-center">
                                                <img src="/images/bitnasdaqapk.png" class="mt-3" height="155px" />
                                                <nuxt-link to="/services/downloads">
                                                    <a-button
                                                        class="cancel-outline-btn fw-5 download-app-btn mt-2 mb-3">
                                                        {{ $t("depositModal.dm12") }}
                                                    </a-button></nuxt-link>
                                            </div>
                                        </span>
                                    </template>
                                    <span @mouseover="hoverKey = 27" @mouseleave="hoverKey = -1">
                                        <img :src="hoverKey == 27
                                            ? '/images/download-active.svg'
                                            : '/images/download.svg'" alt="" width="24" height="24">
                                        <!-- <svg class="pointer header-icon-img svg-icon" width="24" height="24">
                                            <use :xlink:href="hoverKey == 27
                                                    ? '/images/svg/sprite.svg#download-active-icon'
                                                    : '/images/svg/sprite.svg#download-icon'
                                                "></use>
                                        </svg> -->
                                    </span>
                                </a-popover>
                            </span>
                            <span @mouseover="hoverKey = 24" @mouseleave="hoverKey = -1" class="ml-3 right-icon">
                                <svg class="pointer header-icon-img svg-icon" width="24" height="24"
                                    @click="handleLanguageModal()">
                                    <use :xlink:href="hoverKey == 24
                                        ? '/images/svg/sprite.svg#global-active-icon'
                                        : '/images/svg/sprite.svg#global-icon'
                                        "></use>
                                </svg>
                            </span>

                            <span @mouseover="hoverKey = 25" @mouseleave="hoverKey = -1" class="ml-3 right-icon">
                                <img @click="handleExchangeModal()" :src="hoverKey == 25
                                    ? '/images/exchange-active.svg'
                                    : '/images/exchange.svg'" alt="" width="24" height="24">
                                <!-- <svg class="pointer header-icon-img svg-icon" width="24" height="24"
                                    @click="handleExchangeModal()">
                                    <use :xlink:href="hoverKey == 25
                                            ? '/images/svg/sprite.svg#exchange-active-icon'
                                            : '/images/svg/sprite.svg#exchange-icon'
                                        "></use>
                                </svg> -->
                            </span>
                        </div>
                    </div>
                </a-col>
                <a-col :md="1" :sm="1" :xs="2" class="drawer-btn pt-1" align="right">
                    <MenuFoldOutlined @click="toggleDrawer" />
                </a-col>
            </a-row>
        </div>
        <template v-if="routeName == 'p2p-merchant'">
            <div class="merchant-header">
                <div class="main-content">
                    <a-row :gutter="16" class="py-3">
                        <a-col :lg="24" class="pt-2">
                            <p class="merchant-heading fw-5 mb-0">
                                {{ $t("public.ph57") }}
                            </p>
                            <span class="merchant-desc fw-5">{{ $t("public.ph58") }}</span>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </template>
        <template v-if="routeName == 'p2p-buy-and-sell' ||
            routeName == 'p2p-payment' ||
            routeName == 'p2p-trading-faqs' ||
            routeName == 'p2p-video-tutorial' ||
            routeName == 'p2p-beginners-guide' ||
            routeName == 'p2p-p2p-account' ||
            routeName == 'p2p-orders-history' ||
            routeName == 'p2p-in-process' ||
            routeName == 'p2p-orders-history-id'
        ">
            <div class="p2p-account-header">
                <div class="main-content">
                    <a-row :gutter="24">
                        <a-col :lg="24">
                            <p class="p2p-account-heading fw-5 mb-1">
                                {{ $t("public.ph59") }}
                            </p>
                            <span class="p2p-account-desc fw-5 mr-5">{{ $t("public.ph60") }} <br />
                                {{ $t("public.ph61") }}</span>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </template>

        <template v-if="routeName == 'p2p-p2p-account-buy-method' ||
            routeName == 'p2p-p2p-account-sell-account'
        ">
            <div class="p2p-account-header p2p-all-header">
                <div class="main-content">
                    <a-row :gutter="24">
                        <a-col :lg="12" class="pt-2">
                            <p class="p2p-account-heading fw-5 mb-1">
                                {{ $t("public.ph59") }}
                            </p>
                            <span class="p2p-account-desc fw-5 mr-5">{{ $t("public.ph60") }} <br />{{ $t("public.ph61")
                                }}</span>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </template>

        <template v-if="routeName == 'p2p-my-ads' ||
            routeName == 'p2p-post-new-add' ||
            routeName == 'p2p-closed-ads'
        ">
            <div class="p2p-myads-header">
                <div class="main-content">
                    <a-row :gutter="24">
                        <a-col :lg="24">
                            <p class="p2p-myads-heading fw-5 mb-0">
                                {{ $t("public.ph62") }}
                            </p>
                            <span class="p2p-myads-desc fw-5 mr-5">{{ $t("public.ph63") }}<br />
                                {{ $t("public.ph64") }}</span>
                        </a-col>
                    </a-row>
                </div>
            </div>
        </template>

        <template v-if="routeName == 'register' ||
            routeName == 'login' ||
            routeName == 'reset-password' ||
            routeName == 'auth-verification' ||
            routeName == 'auth'
        ">
            <a-row class="verification-bg">
                <a-col :lg="24" align="center">
                    <p class="mb-0">
                        <img src="/images/lock.svg" class="lock-img" />
                        {{ $t("public.ph69") }}:<span class="http-txt">https://</span><span
                            class="BitNasdaq-txt">www.bitnasdaq.com</span>
                    </p>
                </a-col>
            </a-row>
        </template>
        <!-- 
        <Exchange :isExchange="isExchange" :handleExchangeModal="handleExchangeModal" />
        
        <MenuDrawer :show="showMenuDrawer" @onClose="showMenuDrawer = false" /> -->
        <PublicLanguage :isLanguage="isLanguage" :handleLanguageModal="handleLanguageModal" />
        <PublicExchange :isExchange="isExchange" :handleExchangeModal="handleExchangeModal" />
        <PublicMenuDrawer :show="showMenuDrawer" @onClose="showMenuDrawer = false" />
    </div>
</template>

<script>
// import MenuDrawer from "./MenuDrawer.vue";

// import lang from "./lang";

import crypto from "@/plugins/axios/crypto";
import { mapGetters } from "vuex";
import { btcCtid, androidLink, artileDirectLinks } from "~/utils/constants";


export default {
    components: {
        // Language: lang,

        // MenuDrawer,
    },
    data() {
        return {
            artileDirectLinks,
            notificationModel: false,
            showMenuDrawer: false,
            current: ["mail"],
            hoverKey: -1,
            recommendedList: [

                {
                    title: this.$t("tableskeys.bh4"),
                    img: "/images/coin-hand.svg",
                    desc: this.$t("description.des4"),
                    link: "/affiliate-program",
                },
                {
                    title: this.$t('bround'),
                    img: "/images/bround-icon.svg",
                    desc: this.$t("connect_and_network_with_growing_community"),
                    link: "/bRound",
                },
            ],
            promotionList: [
                {
                    title: this.$t("tableskeys.bh1"),
                    img: "/images/vip-plan.svg",
                    desc: this.$t("description.des1"),
                    link: "/vip-program",
                },
                {
                    title: this.$t("tableskeys.bh2"),
                    img: "/images/recommend-friend.svg",
                    desc: this.$t("description.des2"),
                    link: "/recommend-friend",
                },
                {
                    title: this.$t("tableskeys.bh3"),
                    img: "/images/agent-plan.svg",
                    desc: this.$t("description.des3"),
                    link: "/institution-service",
                },
                /*  {
                     title: this.$t("tableskeys.bh4"),
                     img: "/images/reward-hub.svg",
                     desc: this.$t("description.des4"),
                     link: "/affiliate-program",
                 }, */

                {
                    title: this.$t("tableskeys.bh5"),
                    img: "/images/institution.svg",
                    desc: this.$t("description.des5"),
                    link: "/rewards-hub",
                },
            ],
            notifications: [],
            notificationCount: 0,
            isLanguage: false,
            isExchange: false,
            types: [
                {
                    typeid: 1,
                    route: "person/wallet-history",
                },
                {
                    typeid: 2,
                    route: "person/wallet-history",
                },
                {
                    typeid: 4,
                    route: "/person/login-history",
                },
                {
                    typeid: 9,
                    route: "/person/send-recieve-crypto/send-crypto",
                },
            ],
        };
    },

    watch: {
        $route: {
            handler: function (val) {
                if (val.hash) {
                    const sectionId = val.hash;
                    const path = val.path;
                    this.scrollToSection(sectionId);
                }
            },
            deep: true,
            immediate: true,
        },
        loggedIn: {
            handler: function (val) {
                if (val) {
                    if (!this.$usersettings.moreconfig)
                        this.global_refresh_user_settings();

                    if (!$userassets.totalassetes)
                        this.global_refresh_user_assets();
                }
            },
            immediate: true,
        },
    },
    computed: {
        ...mapGetters("constants", ["getP2p", "getFinancial", "showMargin", "showGame", "showBuyBnq"]),
        showP2p() {
            return this.getP2p
        },
        showFinancial() {
            return this.getFinancial
        },
        shouldShowMargin() {
            return this.showMargin
        },
        shouldShowGame() {
            return this.showGame
        },
        shouldShowBuyBnq() {
            return this.showBuyBnq
        },
        environment() {
            const config = useRuntimeConfig();
            const devPort = config.public.devPort;
            if (devPort == 9087) {
                return true;
            }
            return false;
        },
        routeName() {
            return this.$route.name;
        },
        defaultCoinCtid() {
            return btcCtid;
        },
        androidLink: function () {
            return androidLink;
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
    methods: {
        toggleDrawer() {
            this.showMenuDrawer = !this.showMenuDrawer;
        },
        scrollToSection(sectionId) {
            setTimeout(() => {
                const element = document.querySelector(sectionId);

                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 300);
        },
        handleLanguageModal() {
            this.isLanguage = !this.isLanguage;
        },
        handleExchangeModal() {
            this.isExchange = !this.isExchange;
        },
        async quitAccount() {
            await this.$store.dispatch('chat/updateAuth', { isOnline: false, lastSeenAt: new Date().toISOString() })
            // this.$store.dispatch('chat/clearLocalData', {})
            this.$store.commit("remove_user_info")
            localStorage.setItem('onLoggedOut', Date.now())
            this.$router.push("/login")
        },
        toggleFundVisible() {
            const _self = this;
            _self.$store
                .dispatch("user_user_settings_save", {
                    moreConfig: {
                        fundsVisible: !_self.$usersettings.moreconfig.fundsvisible,
                    },
                })
                .then(({ data }) => {
                    if (data) {
                        this.global_refresh_user_settings();
                    }
                });
        },
        goTo(type) {
            const typeFound = this.types.filter((item) => item.typeid == type);
            if (typeFound.length > 0) {
                this.$router.push(typeFound[0].route);
            }
        },
        async getListNotifications() {
            console.log("clicked")
            const _self = this;
            try {
                let { data } = await _self.$store.dispatch("user_msg_notice_get", {
                    pageIndex: "1",
                    pageSize: "5",
                });
                if (data) {
                    _self.notifications = data.pagedata;
                    _self.notificationCount = data.totalitemcount;
                } else {
                    _self.notifications = [];
                    _self.notificationCount = 0;
                }
            } catch (error) {
                return false;
            }
        },
        redirectTo(to) {
            if ($userinfo.uid) {
                this.$router.push(to);
            } else {
                this.$router.push("/login?returnurl=" + this.$route.path);
            }
        },
    },
    mounted() {
        // const route = this.$route

        // const array = ['/', '/ico', 'ico/buy-coins']
        // const path = route.path

        // if (!array.includes(path)) {
        //     location.href = '/'
        // }

        //console.log('path::::', path);
 
    },
};
</script>

<style lang="scss">
@use "@/assets/scss/pages/header/header.scss";

.br {
    border: 1px solid red;
}
</style>
