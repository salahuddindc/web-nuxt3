<template>
    <div class="content_body">
        <div class="chart-container data-info-echart">
            <div class="funding-chart-title">
                <span>
                    <span>{{ $t('contract.realtime_fundrate') }}</span>
                    <span class="indexPrice" style="">{{ (realtime_rate * 100).toFixed(3) }}%</span>
                    <span v-if="realtime_rate > 0">{{ $t('contract.realtime_fundrate_shortpaylong') }}</span>
                    <span v-else>{{ $t('contract.realtime_fundrate_longpayshort') }}</span>
                </span>
                <div class="mr-tabs">
                    <ul>
                        <li :class="itype == 1 ? 'active' : ''" @click="ChangeType(1)">
                            <span>{{ $t('contract.realtime') }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div id="fundingChart" style="margin-top: 30px;">
                <div id="fundingRateGraph" class="echarts"></div>
            </div>
        </div>
        <a-card :bordered="false" class="price-card-index my-3">
            <a-row class="pt-3">
                <a-col :lg="24">
                    <a-table :columns="settlementColums" :pagination="false" :data-source="dataDetail"
                        :loading="loading" :rowKey="(record) => record.key">

                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key == 'price'">
                                <div>
                                    <span>{{ record.indexprice.toFixed(2) }}</span>
                                </div>
                            </template>
                            <template v-if="column.key == 'time'">
                                <div>
                                    <span>{{ record.createtime.replace('T', ' ').replace('Z', '') }}</span>
                                </div>
                            </template>
                            <template v-if="column.key == 'product'">
                                <div>
                                    <span>{{ symblename.replace("/YX", "/USDT") }}{{ $t('contract.swap') }}</span>
                                </div>
                            </template>
                            <template v-if="column.key == 'rate'">
                                <div>
                                    <span>{{ global_get_tofixed(record.fundrate * 100, 3) }}%</span>
                                </div>
                            </template>
                        </template>

                    </a-table>
                </a-col>
            </a-row>

            <div class=" text-right mt-3" v-if="total > 0">
                <a-pagination background @change="handChange" :page-size="serachOrder.pagesize"
                    :current="serachOrder.pageindex" :total="total">
                </a-pagination>
            </div>
        </a-card>

    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name: "FundingRate",
    props: {
        ctid: '',
        symblename: '',
    },
    data() {
        return {
            loading: false,
            total: 0,
            itype: 1,
            ctype: '1m',
            dataDetail: [],
            realtime_rate: 0,
            echarts_xdatas: [],
            echarts_ydatas: [],
            serachOrder: {
                pageindex: 1,
                pagesize: 10
            },
            settlementColums: [
                {
                    title: this.$t('deal.time'),
                    dataIndex: 'time',
                    key: 'time',
                    width: 160,
                },
                {
                    title: this.$t('footer.footer_product'),
                    dataIndex: 'product',
                    key: 'product',
                    width: 160,
                },
                {
                    title: this.$t('contract.ratio'),
                    dataIndex: 'rate',
                    key: 'rate',
                    width: 120,
                },
                {
                    title: this.$t('deal.indexPrice'),
                    dataIndex: 'price',
                    key: 'price',
                    width: 120,
                    align: 'end'
                },
            ],
        }
    },
    mounted() {
        this.getdata_line();
        this.getdata();
    },
    methods: {
        handChange(val) {//分页
            this.serachOrder.pageindex = val
            this.getdata()
        },
        ChangeType(val) {
            this.itype = val;
            this.ctype = val == 1 ? '1m' : '1h';
            this.echarts_xdatas = [];
            this.echarts_ydatas = [];
            this.getdata_line();
        },
        getdata() {
            this.loading = true;
            this.dataDetail = [];
            var _self = this;
            let serachOrder = Object.assign({}, this.serachOrder)
            if (this.ctid != '') {
                serachOrder.ctid = this.ctid;
            }
            this.$store.dispatch('get_getfundratehistory_infos', serachOrder).then(({ data }) => {

                if (data) {
                    _self.total = data.totalitemcount;
                    _self.dataDetail = data.pagedata;
                } else {
                    _self.total = 0;
                    _self.dataDetail = [];
                }
                _self.loading = false;
            })
        },
        getdata_line() {
            var _self = this;
            _self.loading = true;

            this.$store.dispatch('get_getfundrates_infos', { ctype: this.ctype, ctid: this.ctid }).then(({ data }) => {

                if (data) {
                    _self.realtime_rate = data[data.length - 1].r;
                    data.reverse().forEach(el => {
                        _self.echarts_xdatas.push((el.r * 100).toFixed(3));
                        _self.echarts_ydatas.push("" + global_get_local_time(el.t).format('YYYY-MM-DD HH:mm:ss') + "");
                    });

                    this.mcharts();
                } else {
                    _self.echarts_xdatas = [];
                    _self.echarts_ydatas = [];
                    this.mcharts();
                }
                _self.loading = false;
            })
        },
        mcharts() {
            var _self = this;
            const myChart = echarts.init(document.getElementById('fundingRateGraph'));
            var option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: function (params) {
                        return (
                            params[0].name + " " + params[0].data + "%"
                        );
                    },
                    axisPointer: {
                        animation: false
                    }
                },
                xAxis: {
                    type: 'category',
                    data: _self.echarts_ydatas
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        data: _self.echarts_xdatas,
                        type: 'line'
                    }
                ]
            };
            myChart.setOption(option)
        }
    }
}
</script>
<style lang='less' scoped>
@import "@/assets/less/styles/color";
@import "@/assets/less/styles/table";

.content_body {
    font-size: 14px;
    text-align: left;
    color: @cl_666;
}

.chart-container {
    background: #fff;
    margin-bottom: 20px
}

.data-info-echart {
    border-radius: 4px;
    border: 1px solid #F2F2F2;
}

.funding-chart-title {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    font-size: 18px;
    font-weight: 600;
    line-height: 50px;
    padding: 35px 24px 0;
    height: 50px
}

.funding-chart-title>span {
    font-size: 22px;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center
}

.funding-chart-title>span span:nth-child(2) {
    font-size: 24px
}

.funding-chart-title>span span:nth-child(3),
.funding-chart-title>span span:nth-child(4) {
    margin-left: 8px;
    font-size: 12px;
    color: #838c9a
}

.funding-chart-title .indexPrice {
    font-size: 40px;
    margin-left: 12px;
    font-size: 24px;
    color: #232832
}

.funding-chart-title .mr-tabs {
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    text-align: right
}

.funding-chart-title .mr-tabs ul {
    display: inline-block;
    list-style: none;
}

.funding-chart-title .mr-tabs ul li {
    height: 24px;
    border-radius: 4px;
    border: 1px solid #e6eaf2;
    font-size: 12px;
    font-weight: 700;
    color: #838c9a;
    text-align: center;
    line-height: 21px;
    background: #fff;
    margin-left: 8px;
    padding: 0 10px;
}

.funding-chart-title .mr-tabs ul li.active,
.funding-chart-title .mr-tabs ul li:hover {
    background: #f3f5f9;
    color: #232832
}

.funding-rate-8h {
    padding-left: 24px;
    font-size: 12px;
    color: #838c9a;
    margin-bottom: 28px;
    margin-top: 15px
}

.funding-rate-8h .shortPay8h {
    color: #585e68;
    font-size: 12px
}

.fundingCalc {
    text-align: right;
    color: #0988ff
}

.mr-tabs li {
    height: 28px;
    line-height: 28px;
    font-size: 12px;
    color: #232832;
    float: left;
    line-height: 1.5;
    cursor: pointer;
    background: rgba(9, 136, 255, .09);
}

.echarts {
    width: 1200px;
    height: 400px;
}

.hex_table_body td {
    height: 58px;
    line-height: 58px;
    font-size: 12px;
    font-weight: 400;
    color: #838c9a;
}
</style>
