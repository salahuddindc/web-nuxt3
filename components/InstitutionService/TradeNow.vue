<template>
    <div class="trade-now">
            <p class="mb-0 institution-title fw-5 mt-5">{{$t('in_service.is17')}}</p>
        <a-card :bordered="false" class="mt-3 trade-now-card">
            <a-row :gutter="24">
                <a-col :lg="24">
                <a-tabs default-active-key="1">
                    <a-tab-pane key="1" :tab="$t('tabkeys.tab16')">
                        <a-row :gutter="24" class="my-5 py-5 px-5 col-alignment trade-img-row">
                            <!-- <div class="py-4"> -->
                            <a-col :lg="14" :xl="14" align="center">
                                <img src="/images/trade-bg.svg" class="trade-img py-4 px-5" width="100%"/>
                            </a-col>
                            <a-col :lg="10" :xl="9" class="pr-4 py-4">
                                <p class="institution-title fw-5 mb-2">{{$t('in_service.is18')}}</p>
                                <p class="institution-txt fw-5">{{$t('in_service.is19')}}</p>
                                <a-button class="primary-btn fw-5 px-5">{{$t('in_service.is17')}}</a-button>
                            </a-col>
                            <!-- </div> -->

                        </a-row>
                    </a-tab-pane>
                    <a-tab-pane key="2" :tab="$t('tabkeys.tab17')">
                        {{$t('in_service.is20')}}
                    </a-tab-pane>
                 
                </a-tabs>
                </a-col>
            </a-row>
        </a-card>
        <!-- <a-card :bordered="false" class="mt-3">
            <p class="mb-0 institution-heading fw-5">{{$t('in_service.is22')}}</p>
        </a-card>
        <a-card :bordered="false" class="mt-3 trade-now-card">
            <a-row :gutter="24" class="px-3">
                <a-tabs default-active-key="1">
                    <a-tab-pane key="1" :tab="$t('tabkeys.tab16')">
                        <a-row :gutter="24" class="my-5 ml-5 col-alignment">
                            <a-col :lg="10" :xl="12" align="center">
                                <img src="/images/trade-bg.svg" class="trade-img"/>
                            </a-col>
                            <a-col :lg="14" :xl="12" class="pr-4">
                                <p class="institution-heading fw-5 mb-3">{{$t('in_service.is23')}}</p>
                                <a-row :gutter="16">
                                    <a-col :lg="2"><img src="/images/green-tick.svg" class="mr-2" /></a-col>
                                    <a-col :lg="19">
                                        <p class="institution-txt fw-5"> {{$t('in_service.is24')}}</p>
                                    </a-col>
                                </a-row>
                                <a-row :gutter="16">
                                    <a-col :lg="2"><img src="/images/green-tick.svg" class="mr-2" /></a-col>
                                    <a-col :lg="19">
                                        <p class="institution-txt fw-5">{{$t('in_service.is25')}}</p>
                                    </a-col>
                                </a-row>
                                <a-button class="outline-btn fw-5 px-4 mt-2">{{$t('in_service.is26')}}</a-button>
                            </a-col>

                        </a-row>
                    </a-tab-pane>
                    <a-tab-pane key="2" :tab="$t('tabkeys.tab17')">
                        {{$t('in_service.is20')}}
                    </a-tab-pane>
                    <a-tab-pane key="3" :tab="$t('tabkeys.tab18')">
                        {{$t('in_service.is21')}}
                    </a-tab-pane>
                </a-tabs>
            </a-row>
        </a-card> -->
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
