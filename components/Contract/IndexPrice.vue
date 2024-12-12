<template>
    <div>
        <div class="chart-container data-info-echart">
            <div class="funding-chart-title">
                <span>
                    <span>{{ $t('contract.index_realtime') }}</span>
                    <span class="indexPrice" style="">${{ nowprice }}</span>
                    <span class="quote-change lt_up" style="">{{ zdRate }}%</span>
                </span>
                <div class="mr-tabs">
                    <ul>
                        <li :class="itype == 1 ? 'active' : ''" @click="ChangeType(1)"><span>1m</span></li>
                        <li :class="itype == 5 ? 'active' : ''" @click="ChangeType(5)"><span>30m</span></li>
                        <li :class="itype == 6 ? 'active' : ''" @click="ChangeType(6)"><span>1h</span></li>
                        <li :class="itype == 7 ? 'active' : ''" @click="ChangeType(7)"><span>1d</span></li>
                    </ul>
                </div>
            </div>
            <div id="fundingChart">
                <div id="echarts" class="echarts"></div>
            </div>
        </div>
        <a-card :bordered="false" class="price-card-index mt-3">
            <a-row class="pt-3">
                <a-col :lg="24">
                    <a-table :columns="settlementColums" :pagination="true" :data-source="indexPriceData"
                        :rowKey="(record) => record.key">
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key == 'price'">
                                <div>
                                    <span>{{ record.price.toFixed(2) }}</span>
                                </div>
                            </template>
                            <template v-if="column.key == 'dtime'">
                                <div>
                                    <span>{{ record.dtime.replace('T', ' ').replace('Z', '') }}</span>
                                </div>
                            </template>
                            <template v-if="column.key == 'weight'">
                                <div>
                                    <span>1</span>
                                </div>
                            </template>
                        </template>
                    </a-table>
                </a-col>
            </a-row>
        </a-card>
    </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    name: "IndexPrice",
    props: {
        ctid: '',
        symblename: '',
    },
    data() {
        return {
            indexPriceData: [],
            klineData: [],
            itype: 5, //k线时间类型：1，实时；5，30分钟；6，60分钟；7，1天
            lastprice_24: 0,//24小时前的价格
            nowprice: 0,//当前最新指数价
            zdRate: 0, //涨跌幅
            timevent: {},
            settlementColums: [
                {
                    title: this.$t('index.mark'),
                    dataIndex: 'plantname',
                    key: 'plantname',
                    width: 160,
                },
                {
                    title: this.$t('index.price'),
                    dataIndex: 'price',
                    key: 'price',
                    width: 160,
                },
                {
                    title: this.$t('index.update'),
                    dataIndex: 'updateTime',
                    key: 'dtime',
                    width: 120,
                },
                {
                    title: this.$t('index.weights'),
                    dataIndex: 'weights',
                    key: 'weight',
                    width: 120,
                    align: 'end'
                },
            ],
        }
    },
    watch: {
        'nowprice': function (val) {
            this.zdRate = this.lastprice_24 == 0 ? 0 : ((this.nowprice - this.lastprice_24) / this.lastprice_24 * 100).toFixed(2);
        }
    },
    mounted() {
        this.getKlineData();
        this.getIndexPriceData();
    },
    methods: {
        mcharts() {
            const myChart = echarts.init(document.getElementById('echarts'));
            const upColor = '#ec0000';
            const upBorderColor = '#8A0000';
            const downColor = '#00da3c';
            const downBorderColor = '#008F28';
            // Each item: open，close，lowest，highest
            const data0 = this.splitData(this.klineData);
            var option = {

                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    }
                },
                legend: {
                    data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
                },
                grid: {
                    left: '10%',
                    right: '10%',
                    bottom: '15%'
                },
                xAxis: {
                    type: 'category',
                    data: data0.categoryData,
                    boundaryGap: false,
                    axisLine: { onZero: false },
                    splitLine: { show: false },
                    min: 'dataMin',
                    max: 'dataMax'
                },
                yAxis: {
                    scale: true,
                    splitArea: {
                        show: true
                    }
                },
                dataZoom: [
                    {
                        type: 'inside',
                        start: 50,
                        end: 100
                    },
                    {
                        show: true,
                        type: 'slider',
                        top: '90%',
                        start: 50,
                        end: 100
                    }
                ],
                series: [
                    {
                        name: '日K',
                        type: 'candlestick',
                        data: data0.values,
                        itemStyle: {
                            color: upColor,
                            color0: downColor,
                            borderColor: upBorderColor,
                            borderColor0: downBorderColor
                        },
                        markPoint: {
                            label: {
                                formatter: function (param) {
                                    return param != null ? Math.round(param.value) + '' : '';
                                }
                            },
                            data: [
                                {
                                    name: 'Mark',
                                    coord: ['2013/5/31', 2300],
                                    value: 2300,
                                    itemStyle: {
                                        color: 'rgb(41,60,85)'
                                    }
                                },
                                {
                                    name: 'highest value',
                                    type: 'max',
                                    valueDim: 'highest'
                                },
                                {
                                    name: 'lowest value',
                                    type: 'min',
                                    valueDim: 'lowest'
                                },
                                {
                                    name: 'average value on close',
                                    type: 'average',
                                    valueDim: 'close'
                                }
                            ],
                            tooltip: {
                                formatter: function (param) {
                                    return param.name + '<br>' + (param.data.coord || '');
                                }
                            }
                        },
                        markLine: {
                            symbol: ['none', 'none'],
                            data: [
                                [
                                    {
                                        name: 'from lowest to highest',
                                        type: 'min',
                                        valueDim: 'lowest',
                                        symbol: 'circle',
                                        symbolSize: 10,
                                        label: {
                                            show: false
                                        },
                                        emphasis: {
                                            label: {
                                                show: false
                                            }
                                        }
                                    },
                                    {
                                        type: 'max',
                                        valueDim: 'highest',
                                        symbol: 'circle',
                                        symbolSize: 10,
                                        label: {
                                            show: false
                                        },
                                        emphasis: {
                                            label: {
                                                show: false
                                            }
                                        }
                                    }
                                ],
                                {
                                    name: 'min line on close',
                                    type: 'min',
                                    valueDim: 'close'
                                },
                                {
                                    name: 'max line on close',
                                    type: 'max',
                                    valueDim: 'close'
                                }
                            ]
                        }
                    },
                    {
                        name: 'MA5',
                        type: 'line',
                        data: this.calculateMA(data0, 5),
                        smooth: true,
                        lineStyle: {
                            opacity: 0.5
                        }
                    },
                    {
                        name: 'MA10',
                        type: 'line',
                        data: this.calculateMA(data0, 10),
                        smooth: true,
                        lineStyle: {
                            opacity: 0.5
                        }
                    },
                    {
                        name: 'MA20',
                        type: 'line',
                        data: this.calculateMA(data0, 20),
                        smooth: true,
                        lineStyle: {
                            opacity: 0.5
                        }
                    },
                    {
                        name: 'MA30',
                        type: 'line',
                        data: this.calculateMA(data0, 30),
                        smooth: true,
                        lineStyle: {
                            opacity: 0.5
                        }
                    }
                ]
            };
            myChart.setOption(option)
        },
        ChangeType(val) {
            this.itype = val;
            this.klineData = [];
            this.mcharts();
            this.getKlineData();
        },
        getIndexPriceData() {
            var _self = this;
            this.$store.dispatch('get_plantindexprice_info', { ctid: this.ctid }).then(({ data }) => {
                if (data) {
                    _self.indexPriceData = data;
                    data.forEach((n) => {
                        if (n.plantname == 'bitnasdaq') {
                            _self.nowprice = n.price.toFixed(2);
                        }
                    });
                    _self.timevent = setTimeout(() => {
                        _self.getIndexPriceData();
                    }, 5000);
                }
            })
        },
        getKlineData() {
            const klineParam = {
                'etime': 0,
                "type": this.itype,
                "size": 300,
                "symble": this.symblename.toLowerCase(),
                "isindexprice": 1
            };
            var _self = this;
            this.$store.dispatch('quotation_kline_get', klineParam).then(({ data }) => {
                if (data) {
                    data.sort((a, b) => {
                        return a.t - b.t
                    });
                    //Each item: open，close，lowest，highest
                    if (data.length > 48 && _self.itype == 5) {
                        _self.lastprice_24 = data[48].c;
                    }
                    const bars = data.map(el => {
                        return [
                            "" + global_get_local_time(el.t).format('YYYY-MM-DD HH:mm:ss') + "", //TradingView requires bar time in ms
                            el.o.toFixed(2),
                            el.c.toFixed(2),
                            el.l.toFixed(2),
                            el.h.toFixed(2)
                        ]
                    });
                    _self.klineData = bars;
                    _self.mcharts();
                } else {
                    _self.klineData = [];
                    _self.mcharts();
                }
            })
        },
        splitData(rawData) {
            const categoryData = [];
            const values = [];
            for (var i = 0; i < rawData.length; i++) {
                categoryData.push(rawData[i].splice(0, 1)[0]);
                values.push(rawData[i]);
            }
            return {
                categoryData: categoryData,
                values: values
            };
        },
        calculateMA(data0, dayCount) {
            var result = [];
            for (var i = 0, len = data0.values.length; i < len; i++) {
                if (i < dayCount) {
                    result.push('-');
                    continue;
                }
                var sum = 0;
                for (var j = 0; j < dayCount; j++) {
                    sum += +data0.values[i - j][1];
                }
                result.push(sum / dayCount);
            }
            return result;
        }
    },
    beforeDestroy() {
        clearInterval(this.timevent);
    }
}
</script>
<style lang="scss">
.price-card-index {
    .ant-card-body {
        padding: 0;
    }
}
</style>
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
    margin-bottom: 8px
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

.mr-tabs ul {
    list-style: none;
}

.funding-chart-title .indexPrice {
    font-size: 40px;
    font-family: DINPro Medium, DINPro, Helvetica Neue, Arial, Source Sans Pro, WenQuanYi Micro Hei, "sans-serif";
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
    display: inline-block
}

.funding-chart-title .mr-tabs ul li {
    height: 24px;
    border-radius: 4px;
    border: 1px solid #e6eaf2;
    font-size: 12px;
    font-family: SourceHanSansCN-Bold, SourceHanSansCN;
    font-weight: 700;
    color: #838c9a;
    text-align: center;
    line-height: 21px;
    background: #fff;
    margin-left: 8px;
    padding: 0 10px;
    font-family: DINPro Medium, DINPro, Helvetica Neue, Arial, Source Sans Pro, WenQuanYi Micro Hei, "sans-serif"
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
    height: 600px;
    margin-top: 50px;
}

.hex_table_body td {
    height: 58px;
    line-height: 58px;
    font-size: 12px;
    font-weight: 400;
    color: #838c9a;
}
</style>
