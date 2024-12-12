<template>
    <div class="pl-sl-detail">
        <a-modal centered id="profit-and-loss" v-model="show" :footer="false" :title="false" @cancel="close()" width="700px">
            <a-row :gutter="16">
                <a-col :lg="22">
                    <p class="detail-txt mb-3 text-white fw-5">{{ $t('texts.txt42') }}</p>
                </a-col>
                <a-col :lg="2" align="end">
                    <img src="/images/ud-cross.svg" @click="close()" class="pointer" />
                </a-col>
            </a-row>
            <a-row>
                <a-col :lg="24">
                    <!-- <a-radio-group v-model="value" @change="onChange" class="tabs-border">
                        <a-radio-button value="a">
                            {{ $t('manage.All') }}
                            <p v-show="value == 'a'" class="bottom-line"></p>
                        </a-radio-button>
                        <a-radio-button value="b">
                            {{ $t('newkeys.nk10') }}
                            <p v-show="value == 'b'" class="bottom-line"></p>
                        </a-radio-button>
                        <a-radio-button value="c">
                            {{ $t('newkeys.nk11') }}
                            <p v-show="value == 'c'" class="bottom-line"></p>
                        </a-radio-button>
                    </a-radio-group> -->
                    <a-table :columns="plslColumns" :data-source="plslData" :pagination="false">
                        

                        <template slot="orderType" slot-scope="text,row">
                            <span :class="row.orderType == $t('stop_profit') ? 'success-active' : 'red-active'">
                                {{ row.orderType }} 
                            </span>
                        </template>

                        <template slot="volume" slot-scope="text,row">
                            <span>
                                {{ row.volume }} / {{ row.volumePercentage }} %
                            </span>
                        </template>
                        <template slot="triggerPrice" slot-scope="text,row">
                            <span :class="row.orderType == $t('stop_profit') ? 'success-active' : 'red-active'">
                                <span>{{ row.triggerPrice }} </span>
                                <span v-if="row.price > 0">/ {{ row.price }}</span>
                            </span>
                        </template>


                        <span slot="infoImage" slot-scope="text,row,index">
                            <span>
                                <AppLoading v-if="row.cancelling" height="20px" background-color="transparent"
                                    position="end" iconSize="16px" />
                                <img v-else src="/images/cross-modal.svg" class="pointer"
                                    @click="revokeOrder(row.id, index)" />
                            </span>
                        </span>
                    </a-table>
                </a-col>
            </a-row>
            <a-row>
                <a-col :lg="24" align="end">
                    <!-- <a-button class="mt-4 cancel-all-btn PX-4">{{ $t('contract.cancel_all') }}</a-button> -->
                </a-col>
            </a-row>
            <SuccessModal :show="showSuccess" :successModel="successModel" />
        </a-modal>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import AppLoading from "../AppLoading.vue";
import SuccessModal from "~/components/App/SuccessModal.vue";
export default {
    components: {
        AppLoading,
        SuccessModal
    },
    props: {
        show: {
            type: Boolean
        },
        symbleinfo: {
            type: Object,
            default: Object
        },
        currentPosition: {
            type: Object,
            default: Object
        }
    },
    data() {
        return {
            showSuccess: false,
            successModel: {
                heading: '', message: ''
            },
            value: 'a',
            loadingOrders: false,
            cancellingOrders: false,
            plslColumns: [
                {
                    title: this.$t('no'),
                    dataIndex: "no",
                    key: "no",
                    width: 20
                },
                {
                    title: this.$t('labels.lbl76'),
                    dataIndex: "orderType",
                    key: "orderType",
                    scopedSlots: { customRender: "orderType" },
                    width: 50
                },
                {
                    title: this.$t('home.tradeCost') + ' / %',
                    dataIndex: "volume",
                    key: "volume",
                    scopedSlots: { customRender: "volume" },
                    width: 80
                },
                {
                    title: this.$t('newkeys.trigger_price'),
                    dataIndex: "triggerPrice",
                    key: "triggerPrice",
                    width: 90,
                    scopedSlots: { customRender: "triggerPrice" }
                },
                {
                    title: this.$t('newkeys.order_time'),
                    dataIndex: "orderTime",
                    key: "orderTime",
                    width: 80

                },
                {
                    title: '',
                    dataIndex: "infoImage",
                    key: "infoImage",
                    scopedSlots: { customRender: "infoImage" },
                    align: 'end',
                    width: 10

                },
            ],
            plslData: [

            ]
        }
    },
    emits: ['onOrderRevoked'],
    computed: {
        markPrice() {
            return this.currentPosition.copeDailyDetail?.mp || 0
        }
    },
    watch: {
        show(val) {
            if (val) {
                this.getData()
            }
        }
    },
    methods: {
        ...mapActions('trade', ['fetchOrders', 'contractCancelOrder']),
        onChange(e) {
            console.log(`checked = ${e.target.value}`);
        },
        close() {
            this.$emit('onClose')
        },
        getData() {
            const obj = {
                pageIndex: 1,
                pageSize: 10,
                contractAssetsIDs: [this.currentPosition.id]
            }
            this.loadingOrders = true
            console.log('currentPosition', this.currentPosition);

            this.fetchOrders(obj).then((response) => {
                if (response.code == 200 && response.data) {
                    const tableData = []
                    const _self = this
                    console.log('response.data', response.data.pagedata[1]);
                    
                    response.data.pagedata.forEach(function (element, index) {
                        
                        const positionAmount = parseFloat(_self.currentPosition.cansellamount) + parseFloat(_self.currentPosition.frozenamount)
                        const volumePercentage = (element.amount / positionAmount) * 100
                        let orderType = null
                        if (element.direction == -1) {
                             
                            if (element.price > _self.currentPosition.openavgprice) {
                                orderType = _self.$t('stop_profit')
                            } else {
                                orderType = _self.$t('newkeys.nk11')
                            }

                        } else {
                            if (element.price > _self.currentPosition.openavgprice) {
                                orderType = _self.$t('newkeys.nk11') 
                            } else {
                                orderType = _self.$t('stop_profit') 
                            }
                        }
                        tableData.push({
                            no: index + 1,
                            id: element.id,
                            orderType: orderType,
                            volume: element.amount,
                            volumePercentage: volumePercentage.toFixed(2),
                            triggerPrice: element.triggerprice,
                            price: element.price,
                            direction: element.direction,
                            orderTime: element.createtime,
                            cancelling: false,
                        })
                    });
                    this.plslData = tableData
                }

            }).catch((error) => {

            }).finally(() => {
                this.loadingOrders = false
            })
        },
        revokeOrder(id, index) {
            const obj = {
                orderid: id,
            }
            console.log('revokeOrder: index', index)
            this.plslData[index].cancelling = true
            this.contractCancelOrder(obj).then((response) => {
                console.log('cancelOrder: response', response)
                if (response.code == 200) {
                    this.plslData.splice(index, 1)
                    if(this.plslData.length == 0){
                        this.close()
                    }
                    this.$emit('onOrderRevoked')
                }
            }).catch((error) => {

            }).finally(() => {
            })
        }
    },
}
</script>

<style lang="scss">
@import "@/assets/scss/pages/deal/plsl-modal.scss";
</style>
