<template>
   <a-card class="level-card mt-6" :bordered="false" :class="list.id == vipInfo.viplevel?'active-card':''">
        <div class="card-bg-img">
            <img src="/images/level-card-img.svg" />
            <div class="levels">
                <a-row :gutter="16" class="px-3">
                    <a-col :xs="8" :lg="8"></a-col>
                    <a-col :xs="8" :lg="8" align="center"> <img :src="vipimage(list.id)" height="79px"/>
                    </a-col>
                    <a-col :xs="8" :lg="8" class="pt-3">
                        <AppSelect ref="WaddressWaddressWaddress" @searchData="change"
                            :label="$i18n.t('Waddress.selectCion')" :order="symbolDetails"  @clearCurrentState="clearCurrentState"
                            /> </a-col>
                </a-row>
                <a-row :gutter="16" class="mx-3">
                    <a-col :xs="24" :lg="24" align="center">
                        <a-divider class="mt-3 level-divider" />
                        <p class="trading-volume mb-1 text-black">{{ $t('tableskeys.vt4') }}</p>
                        <p class="fw-5 text-black mb-2">{{ list.spot_min }}-{{ list.spot_max }}</p>
                        <p class="or-text mb-2">{{$t('memberCenter.or')}}</p>
                        <p class="trading-volume mb-1 text-black">{{ $t('vip_pro.asset_bal') }}</p>
                        <p class="fw-5 text-black mb-2">{{ list.amout }}</p>
                        <p class="or-text mb-2">{{$t('memberCenter.or')}}</p>
                        <p class="trading-volume mb-1 text-black">{{ $t('tableskeys.vt5') }}</p>
                        <p class="fw-5 text-black mb-2">{{ list.future_min }}-{{ list.spot_max }}</p>

                        <a-card class="maker-taker-card my-3" :bordered="false">
                            <p class="small-txt text-black mb-2 text-left">{{ $t('vip_pro.vip_mspot') }}
                            </p>
                            <a-row :gutter="16">
                                <a-col :xs="12" :lg="12" align="left">
                                    <p class="small-txt mb-1">{{ $t('vip_pro.vip_maker') }}</p>
                                    <p class="text-black fw-5 mb-0">{{
                                        (((10 - list.id) * spotMaker) *0.1).toFixed(2) }}%<span
                                            class="recharge-fee fw-4 text-line-through">{{
                                                (((10 - list.id + 1) * spotMaker) *0.1).toFixed(2)
                                            }}%</span>
                                    </p>

                                </a-col>
                                <a-col :xs="12" :lg="12" align="end">
                                    <p class="small-txt mb-1">{{ $t('vip_pro.vip_taker') }}</p>
                                    <p class="text-black fw-5 mb-0">{{
                                        (((10 - list.id) * spotTaker) *0.1).toFixed(2) }}% <span
                                            class="recharge-fee fw-4 text-line-through"> {{
                                                (((10 - list.id + 1) * spotTaker) *0.1).toFixed(2)
                                            }}%</span>
                                    </p>
                                </a-col>
                            </a-row>
                            <a-divider class="level-divider my-3" />
                            <p class="small-txt text-black mb-2 text-left">{{ $t('vip_pro.vip_future_fee') }}
                            </p>
                            <a-row :gutter="16">
                                <a-col :xs="12" :lg="12" align="left">
                                    <p class="small-txt mb-1">{{ $t('vip_pro.vip_maker') }}</p>
                                    <p class="text-black fw-5 mb-0">{{
                                        (((10 - list.id) * futureMaker) *0.1).toFixed(2) }}%<span
                                            class="recharge-fee fw-4 text-line-through">{{
                                                (((10 - list.id + 1) * futureMaker) *0.1).toFixed(2)
                                            }}%</span>
                                    </p>
                                </a-col>
                                <a-col :xs="12" :lg="12" align="end">
                                    <p class="small-txt mb-1">{{ $t('vip_pro.vip_taker') }}</p>
                                    <p class="text-black fw-5 mb-0">{{
                                        (((10 - list.id) * futureTaker) *0.1).toFixed(2) }}%<span
                                            class="recharge-fee fw-4 text-line-through">{{
                                                (((10 - list.id + 1) * futureTaker) *0.1).toFixed(2)
                                            }}%</span>
                                    </p>
                                </a-col>
                            </a-row>
                        </a-card>
                        <a-button class="outline-btn mt-1" v-if="list.id != vipInfo.viplevel" block>{{
                            $t('vip_pro.vip_upgrade') }}</a-button>
                    </a-col>

                </a-row>
            </div>
        </div>
        <div class="active-btn" v-if="list.id == vipInfo.viplevel">
            <a-row>
                <a-col :xs="24" :lg="24">
                    <a-button class="current-btn" block>
                        {{$t('vip_pro.current')}} <img src="/images/new-releases.svg" class="ml-2" />
                    </a-button>
                </a-col>
            </a-row>
        </div>
    </a-card>
</template>

<script> 
export default {
  
    props: {
        vipInfo: {
            type: Object,
            default: () => { },
        },
        list: {
            type: Object,
            default: () => { },
        }
    },
    data() {
        return {
            symbolDetails: [],
            selectedSymbol:0

        }
    },
    computed: {
        spotMaker() {
            return this.$store.state.symbleinfos[this.selectedSymbol]?.buyfee * 100
        },
        spotTaker() {
            return this.$store.state.symbleinfos[this.selectedSymbol]?.takerbuyfee * 100
        },
        futureMaker() {
            return this.$store.state.symbleinfos[this.selectedSymbol]?.buyfee * 100
        },
        futureTaker() {
            return this.$store.state.symbleinfos[this.selectedSymbol]?.takerbuyfee * 100
        },


    },
    methods: {
        clearCurrentState(id) {
      this.searchParam[id] = {};
    },
       async getallcoininfos() {
            const _self = this
            _self.$store.state.symbleinfos.forEach(item => {
               if(item.itype==0){
                _self.symbolDetails.push({
                    id: item.id,
                    value: item.descriptions.split('/')[0],
                    type: 'currencyid',
                    icon: item.icon
                });
               }


            });
            _self.$nextTick(() => {
                console.log(_self.$refs.WaddressWaddressWaddress)
                     if (_self.$refs.WaddressWaddressWaddress) {
                       _self.$refs.WaddressWaddressWaddress.selectVal = 0
                       _self.selectedSymbol=0
                   }

            });
        },
        change(val) {
          if(val){
           this.selectedSymbol= this.symbolDetails.findIndex(item=>item.id==val.id)
          }
        },
        vipimage(image) {
            return "/images/vipv-" + image + ".svg";
        },

    },
    async mounted() {
         this.getallcoininfos()
    }
}
</script>
