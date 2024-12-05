<template>
    <div class="tailor-made-institutions">
        <p class="mb-5 institution-title fw-5">{{ $t('in_service.is1') }}</p>
        <a-row :gutter="[16, 16]" class="py-3">
            <a-col :lg="7" :xl="6" :xxl="6">
                <a-card class="tailor-solution-card">
                    <a-row :gutter="16">
                        <a-col :lg="24">
                            <!-- <img src="/images/ins-list1.svg" class="mb-4"/> -->
                            <p class="mb-0 pb-1 market-trading-fee fw-5">{{
                                $t('in_service.is2') }}</p>
                            <div>
                                <ul class="p-0 mt-2 tailor-list trading-free">
                                    <li>
                                        <svg width="12" height="12" class="svg-icon mr-2">
                                            <use xlink:href="/images/svg/sprite.svg#green-check-icon"></use>
                                        </svg>{{ $t('in_service.is3') }}
                                    </li>
                                    <li>
                                        <svg width="12" height="12" class="svg-icon mr-2">
                                            <use xlink:href="/images/svg/sprite.svg#green-check-icon"></use>
                                        </svg>{{ $t('in_service.is4') }}
                                    </li>
                                    <li>
                                        <svg width="12" height="12" class="svg-icon mr-2">
                                            <use xlink:href="/images/svg/sprite.svg#green-check-icon"></use>
                                        </svg>{{ $t('in_service.is5') }}
                                    </li>
                                </ul>

                                <a-row :gutter="16">
                                    <a-col :lg="12"><a-button class="primary-btn mt-3" @click="openInstitutionModel()"
                                            block>{{ $t('in_service.is6') }}</a-button></a-col>
                                    <!-- <a-col :lg="12"><a-button class="cancel-outline-btn fw-5 mt-3" block>{{
                                            $t('in_service.is7') }}</a-button></a-col> -->
                                </a-row>
                            </div>
                        </a-col>
                    </a-row>
                </a-card>
            </a-col>
            <a-col :lg="7" :xl="6" :xxl="6">
                <a-card class="tailor-solution-card2 col-alignment" :bordered="false">
                    <a-row :gutter="24">
                        <a-col :lg="24">
                            <p class="tailor-content trading-free fw-5">Avg. <span>$10 Billion</span></p>
                            <p class="institution-txt fw-4"> {{ $t("Institutions.ins6") }}</p>
                            <!-- <img src="/images/ins-list2.svg" class="mb-4"/>
                                <p class="mb-0 pb-1 market-trading-fee fw-5">{{ $t('in_service.is8') }}</p>
                                <div>
                                    <ul class="p-0 mt-2 ml-0 tailor-list">
                                        <li>
                                                            <svg width="12" height="12" class="svg-icon mr-2" >
                                                            <use xlink:href="/images/svg/sprite.svg#green-check-icon"></use>
                                                            </svg>{{ $t('in_service.is9') }}</li>
                                        <li> 
                                                            <svg width="12" height="12" class="svg-icon mr-2" >
                                                            <use xlink:href="/images/svg/sprite.svg#green-check-icon"></use>
                                                            </svg>{{ $t('in_service.is10') }}</li>
                                        <li> 
                                                            <svg width="12" height="12" class="svg-icon mr-2" >
                                                            <use xlink:href="/images/svg/sprite.svg#green-check-icon"></use>
                                                            </svg>{{ $t('in_service.is11') }}</li>
                                    </ul>
                                    <a-row :gutter="16">
                                        <a-col :lg="12"><a-button class="primary-btn fw-5 mt-3" block  @click="openInstitutionModel()">{{ $t('in_service.is6')
                                        }}</a-button></a-col>
                                    </a-row>
                                </div> -->
                        </a-col>
                    </a-row>
                </a-card>
            </a-col>
            <a-col :lg="7" :xl="6" :xxl="6">
                <a-card class="tailor-solution-card2" :bordered="false">
                    <a-row :gutter="24">
                        <a-col :lg="24">
                            <p class="tailor-content trading-free fw-5"><span>10M+</span></p>
                            <p class="institution-txt fw-4"> {{ $t("Institutions.ins6") }}</p>
                            <!--  <img src="/images/ins-list3.svg" class="mb-4"/>
                                <p class="mb-0 pb-1 market-trading-fee fw-5">{{
                                            $t('in_service.is16') }}</p>
                                <div>
                                    <ul class="p-0 mt-2 tailor-list">
                                        <li>
                                                            <svg width="12" height="12" class="svg-icon mr-2" >
                                                            <use xlink:href="/images/svg/sprite.svg#green-check-icon"></use>
                                                            </svg>{{ $t('in_service.is12') }}</li>
                                        <li>
                                                            <svg width="12" height="12" class="svg-icon mr-2" >
                                                            <use xlink:href="/images/svg/sprite.svg#green-check-icon"></use>
                                                            </svg>{{ $t('in_service.is13') }}</li>
                                        <li>
                                                            <svg width="12" height="12" class="svg-icon mr-2" >
                                                            <use xlink:href="/images/svg/sprite.svg#green-check-icon"></use>
                                                            </svg>{{ $t('in_service.is14') }}</li>
                                    </ul>

                                    <a-row :gutter="16">
                                        <a-col :lg="12"><a-button class="primary-btn fw-5 mt-3" block  @click="openInstitutionModel()">{{ $t('in_service.is6')
                                        }}</a-button></a-col>
                                    </a-row>
                                </div> -->
                        </a-col>
                    </a-row>
                </a-card>
            </a-col>
            <a-col :lg="7" :xl="6" :xxl="6">
                <a-card class="tailor-solution-card2" :bordered="false">
                    <a-row :gutter="24">
                        <a-col :lg="24">
                            <p class="tailor-content trading-free fw-5"><span>500+</span></p>
                            <p class="institution-txt fw-4"> {{ $t("Institutions.ins5") }}</p>
                            <!--  <img src="/images/ins-list3.svg" class="mb-4"/>
                                <p class="mb-0 pb-1 market-trading-fee fw-5">{{
                                            $t('in_service.is16') }}</p>
                                <div>
                                    <ul class="p-0 mt-2 tailor-list">
                                        <li>
                                                            <svg width="12" height="12" class="svg-icon mr-2" >
                                                            <use xlink:href="/images/svg/sprite.svg#green-check-icon"></use>
                                                            </svg>{{ $t('in_service.is12') }}</li>
                                        <li>
                                                            <svg width="12" height="12" class="svg-icon mr-2" >
                                                            <use xlink:href="/images/svg/sprite.svg#green-check-icon"></use>
                                                            </svg>{{ $t('in_service.is13') }}</li>
                                        <li>
                                                            <svg width="12" height="12" class="svg-icon mr-2" >
                                                            <use xlink:href="/images/svg/sprite.svg#green-check-icon"></use>
                                                            </svg>{{ $t('in_service.is14') }}</li>
                                    </ul>

                                    <a-row :gutter="16">
                                        <a-col :lg="12"><a-button class="primary-btn fw-5 mt-3" block  @click="openInstitutionModel()">{{ $t('in_service.is6')
                                        }}</a-button></a-col>
                                    </a-row>
                                </div> -->
                        </a-col>
                    </a-row>
                </a-card>
            </a-col>
        </a-row>
        <p class="mb-4 pb-2 mt-5 institution-title fw-5">{{ $t('in_service.is15') }}</p>
        <a-row :gutter="24">
            <a-col :lg="7" :xl="7" :xxl="6" v-for="(list, key) in institutionalClient" :key="key">
                <a-card class="tailor-solution2-card" :bordered="false">
                    <a-row :gutter="16" class="col-alignment">
                        <a-col :lg="24">
                            <p class="mb-2 maket-trading-count fw-6">{{ list.title }}</p>
                            <p class="mb-0 market-trading-fee fw-5">{{ list.subTitle }}</p>

                        </a-col>
                    </a-row>
                    <a-row :gutter="16" class="mt-2">
                        <a-col :lg="24">
                            <p class="mb-0 list-desc fw-5">{{ list.desc }}</p>
                        </a-col>
                    </a-row>
                </a-card>
            </a-col>
        </a-row>

        <InstitutionModal :InstitutionModel="InstitutionModel" @onClose="close" :metada="metada" />
    </div>
</template>

<script>
import InstitutionModal from './InstitutionModal.vue'
export default {
    components: {
        InstitutionModal
    },
    data() {
        return {
            InstitutionModel: false,
            metada: {
                title: 'Become a institutional client', //{{ $t('agent_plan.ap1') }}
                description: 'We will provide you with development and promotion funds; and provide services 24*7 hours.' //{{ $t('agent_plan.ap2') }}
            },
            institutionalClient: [
                {
                    title: '01',
                    subTitle: this.$t("tableskeys.tk7"),
                    desc: this.$t("tableskeys.tk10")
                },
                {
                    title: '02',
                    subTitle: this.$t("tableskeys.tk8"),
                    desc: this.$t("tableskeys.our_dedicated_institutional_services_team")
                },
                {
                    title: '03',
                    subTitle: this.$t("tableskeys.institutional_client_boarded"),
                    desc: this.$t("tableskeys.welcome_our_dedicated_team")
                }
            ]
        }
    },

    methods: {
        close() {
            this.InstitutionModel = false
        },
        openInstitutionModel() {
            if ($userinfo.value.uid) {
                this.InstitutionModel = true
            }
            else {
                this.$router.push('/login?returnurl=' + this.$route.path)
            }

        }
    },
}
</script>

<style></style>
