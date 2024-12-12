<template>
    <div class="hex-flex" style="background: #fafafa;">
        <div class="w1200 clearfix" style="margin: 80px auto;">
            <div class="fundrate_title">
                <span>{{ tabname }}</span>
                <div style="float: right;">
                    <a-select v-model:value="ctid" :placeholder="$t('placeholders.plh69')" @change="selectChanged"
                        style="width: 280px">
                        <a-select-option v-for="item in contractSymbles" :key="item.id"
                            :label="item.descriptions.replace('/YX', '_USDT')" :value="item.id">
                            {{ item.descriptions.replace('/YX', '_USDT') }}
                        </a-select-option>
                    </a-select>
                </div>
            </div>
            <div class="nav-container">
                <div class="tab">
                    <span :class="tab == 1 ? 'current' : ''" @click="changeTab(1)">
                        {{ $t('contract.index_data') }}
                    </span>
                    <span :class="tab == 3 ? 'current' : ''" @click="changeTab(3)">{{ $t('contract.fund_data') }}</span>
                </div>
            </div>
            <ContractFundRate v-if="tab == 1" :ctid="ctid" :symblename="symblename" /> 
            <ContractIndexPrice v-if="tab == 3" :ctid="ctid" :symblename="symblename" />
        </div>
    </div>
</template>

<script>


export default {
    name: "contract_data_info",

    watch: {
        tab(val) {
            if (val == 1) {
                this.tabname = this.$t('contract.index_data')
            }
            if (val == 2) {
                this.tabname = this.$t('contract.settlement_recodes')
            }
            if (val == 3) {
                this.tabname = this.$t('contract.fund_data')
            }
        },
        $route(val) {
            this.tab = val.query.tab;
        }
    },
    data() {
        return {
            tab: 1,
            tabname: '',
            ctid: '1575964013659730564',
            symblename: 'BTC/YX',
            contractSymbles: [],
        }
    },
    mounted() {
        if (this.$route.params.id > 0)
            this.tab = this.$route.params.id;
        if (this.$route.query.tab > 0)
            this.tab = Number(this.$route.query.tab);
        if (this.$route.query.ctid > 0) {
            var param_ctid = this.$route.query.ctid;
            if (param_ctid != null && param_ctid != '') {
                this.ctid = param_ctid;
            }
        }
        this.tabname = this.$t('contract.index_data');
        this.getData();
       
        
    },
    methods: {
        changeTab(val) {
            this.tab = val;
        },
        selectChanged(value) {
            if (this.$store.getters.get_contractType == 1) {
                window.location.href = "/contract/data?ctid=" + value;
            } else {
                window.location.href = "/contract/data?ctid=" + value;
            }
        },
        getData() {
            this.contractSymbles = this.$store.state.symbleinfos.filter(item => {
                return item.itype == 1;
            });
            this.contractSymbles.forEach(el => {
                if (el.id == this.ctid) {
                    this.symblename = el.descriptions
                }
            });
        }
    }
}
</script>

<style lang='less' scoped>
.nav-container .tab {
    height: 50px;
    line-height: 45px;
    border-radius: 3px 3px 0 0;
    border-bottom: 1px solid #eef1f7;
    margin-bottom: 24px;
    background: #fff;
    padding: 0 20px;
}

.nav-container .tab span {
    display: inline-block;
    padding: 0 20px;
    font-size: 16px;
    font-weight: 500;
    color: #838c9a;
    line-height: 22px;
    cursor: pointer
}

.nav-container .tab span:first-child {
    padding-left: 0
}

.nav-container .tab span:first-child:before {
    left: unset !important;
    -webkit-transform: unset !important;
    transform: unset !important
}

.nav-container .tab span:hover {
    color: #000
}

.nav-container .tab span.current {
    position: relative;
    color: #ffb11a;
    background: #ffb11a;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700
}

.nav-container .tab span.current:before {
    content: "";
    height: 4px;
    width: 80%;
    background: #ffb11a;
    border-radius: 1px 0 0 0;
    position: absolute;
    bottom: -18px;
    left: 50%;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%)
}

.fundrate_title {
    margin-top: -32px;
    margin-bottom: 40px;
    font-size: 32px;
    font-weight: 700;
    color: rgb(0, 0, 0);
    line-height: 48px;
}
</style>
