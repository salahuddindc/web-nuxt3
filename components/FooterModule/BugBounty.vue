<template>
    <div class="bug-bounty">
        <div class="bug-bounty-bg">
            <div class="main-content">
                <a-row>
                    <a-col :lg="12">
                        <p class="mb-2 bounty-heading fw-5">{{ $t('bugbounty.bb1') }}</p>
                        <p class="mb-0 fw-4 bounty-desc">{{ $t('bugbounty.bb2') }}</p>
                        <a-button class="px-4 primary-btn fw-5" @click="openBugBountyModel">{{ $t('bugbounty.bb3')
                            }}</a-button>
                    </a-col>
                </a-row>
            </div>
        </div>
        <div class="bounty-detail pt-8">
            <div class="main-content">
                <p class="mb-0 sub-heading fw-5 pb-6">{{ $t('bugbounty.bb4') }}</p>
                <a-row class="bounty-rules" :gutter="16">
                    <a-col :lg="6" v-for="(list, key) in getBountyRules" :key="key" class="pr-3 pb-8">
                        <img :src="list.img" class="mb-4" />
                        <p class="mb-2 sub-text fw-5"> {{ list.title }}</p>
                        <p class="mb-0 title-desc" v-html="list.desc"></p>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :lg="15">
                        <p class="mb-2 fw-5 sub-heading">{{ $t('bugbounty.bb5') }}</p>
                        <p class="mb-0 bounty-desc fw-4 reward-txt pb-6">{{ $t('bugbounty.bb6') }}</p>
                        <a-row class="pb-6">
                            <a-col :lg="24">
                                <a-radio-group v-model:value="selectedOption" default-value="a" size="large">
                                    <a-radio-button value="a">
                                        {{ $t('bugbounty.bb7') }}
                                    </a-radio-button>
                                    <a-radio-button value="b">
                                        {{ $t('bugbounty.bb8') }}
                                    </a-radio-button>
                                    <a-radio-button value="c">
                                        {{ $t('bugbounty.bb9') }}
                                    </a-radio-button>
                                    <a-radio-button value="d">
                                        {{ $t('bugbounty.bb10') }}
                                    </a-radio-button>
                                    <a-radio-button value="e">
                                        {{ $t('bugbounty.bb11') }}
                                    </a-radio-button>
                                </a-radio-group>
                            </a-col>
                        </a-row>
                        <a-row v-if="selectedOption === 'a'">
                            <a-col :lg="24">
                                <p class="mb-3 critical-txt fw-7 col-alignment">
                                    <img src="/images/critical.svg" class="mr-3" />
                                    <span class="active mr-1">$5,000</span>{{ $t('bugbounty.bb12') }}
                                </p>
                                <p class="critical-desc mb-0 fw-4"><span class="fw-7">{{ $t('bugbounty.bb12') }}</span>
                                    {{
                                        $t('bugbounty.bb13') }}</p>
                            </a-col>
                        </a-row>

                        <!-- High Severity -->
                        <a-row v-if="selectedOption === 'b'">
                            <a-col :lg="24">
                                <p class="mb-3 critical-txt fw-7 col-alignment"><img src="/images/critical.svg"
                                        class="mr-3" /><span class="active mr-1">$2,500</span>{{ $t('bugbounty.bb36') }}
                                </p>
                                <p class="critical-desc mb-0 fw-4"><span class="fw-7">{{ $t('bugbounty.bb36') }}</span>
                                    {{
                                        $t('bugbounty.bb37') }}</p>
                            </a-col>
                        </a-row>

                        <!-- Medium Severity -->
                        <a-row v-if="selectedOption === 'c'">
                            <a-col :lg="24">
                                <p class="mb-3 critical-txt fw-7 col-alignment"><img src="/images/critical.svg"
                                        class="mr-3" /><span class="active mr-1">$1,000</span>{{ $t('bugbounty.bb38') }}
                                </p>
                                <p class="critical-desc mb-0 fw-4"><span class="fw-7">{{ $t('bugbounty.bb38') }}</span>
                                    {{
                                        $t('bugbounty.bb39') }}</p>
                            </a-col>
                        </a-row>

                        <!-- Low Severity -->
                        <a-row v-if="selectedOption === 'd'">
                            <a-col :lg="24">
                                <p class="mb-3 critical-txt fw-7 col-alignment"><img src="/images/critical.svg"
                                        class="mr-3" /><span class="active mr-1">$500</span>{{ $t('bugbounty.bb40') }}
                                </p>
                                <p class="critical-desc mb-0 fw-4"><span class="fw-7">{{ $t('bugbounty.bb40') }}</span>
                                    {{
                                        $t('bugbounty.bb41') }}</p>
                            </a-col>
                        </a-row>

                        <!-- Note -->
                        <a-row v-if="selectedOption === 'e'">
                            <a-col :lg="24">
                                <p class="mb-3 critical-txt fw-7 col-alignment"><img src="/images/critical.svg"
                                        class="mr-3" /><span class="active mr-1">$100</span>{{ $t('bugbounty.bb42') }}
                                </p>
                                <p class="critical-desc mb-0 fw-4"><span class="fw-7">{{ $t('bugbounty.bb42') }}</span>
                                    {{
                                        $t('bugbounty.bb43') }}</p>
                            </a-col>
                        </a-row>

                    </a-col>
                    <a-col :lg="9">
                        <img src="/images/bug-bounty-right.svg" width="100%" />
                    </a-col>
                </a-row>
                <div class="pb-5 pt-8">
                    <div class="bitnasdaq-partner">
                        <a-row :gutter="16" class="px-5 mx-4 col-alignment">
                            <a-col :lg="19">
                                <p class="let-us-know text-black mb-2 fw-5">{{ $t('bugbounty.bb14') }}</p>
                                <p class="bitnasdaq-desc mb-0"><a
                                        href="mailto:service@bitnasdaq.com">service@bitnasdaq.com</a>
                                    {{ $t('bugbounty.bb15') }} <br /> {{ $t('bugbounty.bb16') }}</p>
                            </a-col>
                            <a-col :lg="5">
                                <a-button class="primary-btn fw-5 mt-0 px-4" @click="openBugBountyModel">{{
                                    $t('bugbounty.bb17') }}</a-button>
                            </a-col>
                        </a-row>
                    </div>
                </div>
                <a-row class="pb-5">
                    <a-col :lg="21">
                        <p class="mb-0 disclaimer-txt fw-5"><span class="text-black"> {{ $t('bugbounty.bb18') }}:</span>
                            {{ $t('bugbounty.bb19') }}</p>
                    </a-col>
                </a-row>
            </div>

        </div>
        <BugBountyModal :BugBountyModel="BugBountyModel" @on-close="close" />
    </div>
</template>

<script>
import BugBountyModal from "./BugBountyModal.vue";
export default {
    components: {
        BugBountyModal
    },
    data() {
        return {
            BugBountyModel: false,
            getBountyRules: [
                {
                    img: '/images/rule1.svg',
                    title: this.$t('bugbounty.bb20'),
                    desc: this.$t('bugbounty.bb21')
                },
                {
                    img: '/images/rule2.svg',
                    title: this.$t('bugbounty.bb22'),
                    desc: this.$t('bugbounty.bb23')
                },
                {
                    img: '/images/rule3.svg',
                    title: this.$t('bugbounty.bb24'),
                    desc: this.$t('bugbounty.bb25')
                },
                {
                    img: '/images/rule5.svg',
                    title: this.$t('bugbounty.bb28'),
                    desc: `${this.$t('bugbounty.bb27')}`
                },
                {
                    img: '/images/rule4.svg',
                    title: this.$t('bugbounty.bb26'),
                    desc: `${this.$t('bugbounty.bb29')} <a href="mailto:service@bitnasdaq.com">service@bitnasdaq.com</a>${this.$t('bugbounty.bb291')} <ul><li>${this.$t('bugbounty.bb292')}</li><li>${this.$t('bugbounty.bb293')}</li></ul> `
                },

                {
                    img: '/images/rule6.svg',
                    title: this.$t('bugbounty.bb30'),
                    desc: this.$t('bugbounty.bb31')
                },
                {
                    img: '/images/rule7.svg',
                    title: this.$t('bugbounty.bb32'),
                    desc: this.$t('bugbounty.bb33')
                }
            ],
            selectedOption: 'a',
        }
    },
    methods: {
        sendBugReport() {
            window.location.href = 'mailto:service@bitnasdaq.com?subject=Bug%20Bounty%20Report&body=Hello%20BitNasdaq%20Team,%0A%0AI%20would%20like%20to%20report%20a%20bug%20I%20found.%20Here%20are%20the%20details:%0A%0A[Provide%20details%20of%20the%20bug]%0A%0AThank%20you,%0A[Your%20Name]';
        },
        close() {
            this.BugBountyModel = false;
        },
        openBugBountyModel() {
            if ($userinfo.value.uid) {
                this.BugBountyModel = true;
            } else {
                this.$router.push("/login?returnurl=" + this.$route.path);
            }
        },
    },
}
</script>

<style></style>