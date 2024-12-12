<template>
    <div :id="elementId" :style="`height: ${height}; width:${width};`"> </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: 'LineChart',
    props: {
        data: {
            type: Array,
            default: () => {
                return []// {value, time}
            }
        },
        height: {
            type: String,
            default: '70px'
        },
        width: {
            type: String,
            default: '150px'
        },
        elementId: {
            type: String,
            default: 'chart'
        },
        ySymbol: {
            type: String,
            default: 'USDT'
        },
        xData: {
            type: [Array,String],
            default: false
        },
        showYAxis: {
            type: Boolean,
            default: false
        },
        showXAxis: {
            type: Boolean,
            default: false
        },
        showTextTip: {
            type: Boolean,
            default: false
        },
        toolTipOptions: {
            type: Object,
            default: () => {
                return {
                    text1: 'tableskeys.ty5', // Date,
                    text2: 'income', // Income 
                    symbol: "USDT",

                }
            }
        },
        showMarkLinke: {
            type: Boolean,
            default: false
        },
        haveGridOptions: {
            type: Boolean,
            default: false
        },
        showTopBottomIndicator: {
            type: Boolean,
            default: false,
        },
        gridOptions: {
            type: Object,
            default: () => {
                return {
                    left: "1%",
                    top: 30,
                    right: "1%",
                    bottom: 30,
                }
            }
        }
    },
    computed: {

        percentage() {
            const firstObject = this.data.length > 0 ? this.data[0] : {};
            const lastPrice = this.lastPrice;
            const firstPrice = firstObject.value;

            const ptg = ((lastPrice - firstPrice) / firstPrice) * 100;
            return ptg.toFixed(2);
        },

        lastPrice() {
            const lastObject =
                this.data.length > 0
                    ? this.data[this.data.length - 1]
                    : {};
            const c = lastObject.value
            return c;
        },
    },
    watch: {
        data(newValue, oldValue) {
            this.manuplateData()
        }
    },
    methods: {
        manuplateData() {
            const self = this
            const myChart = echarts.init(document.getElementById(this.elementId))

            const min = Math.min(...this.data.map((item) => item.value)) || 1
            const max = Math.max(...this.data.map((item) => item.value)) || 1

            const firstObject = this.data.length > 0 ? this.data[0] : {};
            const lastPrice = this.lastPrice;
            const firstPrice = firstObject.value;

            const ptg = ((lastPrice - firstPrice) / firstPrice) * 100;
            const percentage = ptg.toFixed(2);

            const chartOption = {

                xAxis: {
                    type: 'category',
                    show: this.showXAxis,
                    data: this.xData,
                    axisLine: {
                        show: false, // hide the x-axis line.
                    },
                    axisTick: false,
                    axisLabel: {
                        interval: this.xsScreen ? 'auto' : Math.ceil(this.data.length / 12),
                        formatter: function (value) {
                            return value
                        },
                    },
                },

                yAxis: {
                    type: 'value',
                    show: this.showYAxis,
                    min: min,
                    max: max,
                    axisLine: {
                        show: true,
                    },
                    axisLabel: {
                        formatter: `{value} ${this.ySymbol}`
                    },

                },
                visualMap: {
                    show: false,
                    pieces: [
                        {
                            gt: 0,
                            lte: max + 10,
                            color: this.showTopBottomIndicator ? '#30b37582' : (percentage > 0 ? '#30b37582' : '#f1493f45'),
                        },
                        {
                            gt: min - 10,
                            lte: 0,
                            color: '#f1493f45'
                        },
                    ],
                    outOfRange: {
                        color: '#999'
                    }
                },

                series: [
                    {
                        name: '',
                        type: 'line',
                        symbol: 'none',
                        smooth: true,
                        data: this.data,

                        itemStyle: {
                            color: 'rgb(255, 70, 131)'
                        },
                        areaStyle: {}
                    },
                ],
            }

            if (this.showTextTip) {
                chartOption['tooltip'] = {
                    trigger: 'axis',
                    backgroundColor: '#5e6673',
                    borderColor: '#5e6673',
                    padding: [1, 1, 1, 1],
                    formatter: function (params) {
                        let data = params[0];

                        const d = data.data
                        return `
                    <div style="background-color:#5e6673;color:#fff; padding:4px 8px;box-shadow: none; border:none; text-align: left">
                    <div  style="color: #fff;font-size: 12px;">${self.$t(self.toolTipOptions.text2)}: ${d.value} ${self.toolTipOptions.symbol}</div>
                    <div style="color: #fff; font-size: 12px;"> ${self.$t(self.toolTipOptions.text1)}: ${d.time} </div>
                    </div>
                `
                    },
                }
            }

            if (this.showMarkLinke) {
                chartOption.series[0]['markLine'] = {
                    silent: false,
                    emphasis: {
                        disabled: true,
                        join: 'miter'
                    },
                    label: {
                        position: 'start',
                        fontSize: 8,
                        distance: -10,

                        color: '#CFD1D5',
                        // formatter: (params) => {
                        //     return params.value + ' % ';
                        // }
                    },
                    symbol: 'none',
                    lineStyle: {
                        width: 1,
                        color: '#CFD1D5',
                        type: 'dashed'
                    },
                    data: [
                        {
                            yAxis: max
                        },
                        {
                            yAxis: min
                        }
                    ]
                }
            }

            if (this.haveGridOptions) {
                chartOption['grid'] = this.gridOptions
            }





            myChart.setOption(chartOption)

        }
    },
    mounted() {
        this.manuplateData();
    }
}
</script>

<style lang="scss" scoped></style>