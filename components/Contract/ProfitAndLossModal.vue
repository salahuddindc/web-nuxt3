<template>
    <div class="profit-and-loss">
        <a-modal centered id="profit-and-loss" v-model="show" :footer="false" :title="false" @cancel="close()" width="510px"
            :maskClosable="false">
            <a-row :gutter="16" class="col-alignment">
                <a-col :lg="18">
                    <p class="take-profit-heading mb-0 fw-6">
                        {{ $t('newkeys.nk10') }} / {{ $t('newkeys.nk11') }}
                    </p>
                </a-col>
                <a-col :lg="6" align="end">
                    <img src="/images/ud-cross.svg" @click="close()" class="pointer" />
                </a-col>
            </a-row>
            <a-form-model ref="plslForm" :model="form" :rules="setValidation.rules" :hide-required-mark="true"
                label-align="left">
                <a-row>
                    <a-col :lg="24">
                        <a-row :gutter="16" class="mt-4 mb-2 col-alignment">
                            <a-col :lg="12">
                                <p class="symbol-text mb-2">{{ $t('home_page.hp13') }}</p>
                                <p class="symbol-text mb-2">{{ $t('newkeys.enter_price') }}</p>
                                <p class="symbol-text">{{ $t('strtable.stab18') }}</p>
                            </a-col>
                            <a-col :lg="12" align="end">
                                <p class="mb-2 fw-5 "
                                    :class="currentPosition.direction == 1 ? 'success-active' : 'red-active'">
                                    {{ currentPosition.symblename }} {{ $t('deal_new.dn10') }} /
                                    {{ currentPosition.direction == 1 ? $t('leverage.long') : $t('leverage.short') }}
                                </p>
                                <p class="fw-5 mb-2 text-white day-txt">{{ currentPosition.openavgprice }} USDT</p>
                                <p class="fw-5 text-white day-txt">
                                    {{ closePrice || '--' }}
                                    USDT</p>
                            </a-col>
                        </a-row>

                        <a-row :gutter="16" class="mb-3">
                            <a-col :lg="24">
                                <AppFormModelItem prop="triggerPrice">
                                    <AppNumber :hasArrow="true" before="Stop Price" :num.sync="form.triggerPrice" />
                                </AppFormModelItem>
                            </a-col>
                        </a-row>
                        <a-row :gutter="16">
                            <a-col :lg="16">
                                <AppNumber :num="''" :hasArrow="true" :placeholder="$t('deal.markesell')"
                                    v-if="form.marketType == '5'" disabled />
                                <AppFormModelItem prop="price" v-else>
                                    <AppNumber :num.sync="form.price" :hasArrow="true" before="Price" after="USDT" />
                                </AppFormModelItem>
                            </a-col>
                            <a-col :lg="8">
                                <a-select defaultValue="4" firstActiveValue="4" style="width: 100%"
                                    dropdown-class-name="sl_markettype" @change="changePriceType">
                                    <a-select-option value="4">{{ $t('patch.LimitOrderShort') }}</a-select-option>
                                    <a-select-option value="5">{{ $t('patch.MarketOrderShort') }}</a-select-option>
                                </a-select>
                            </a-col>
                        </a-row>

                        <a-row :gutter="16" class="mb-3">
                            <a-col :lg="24">
                                <p class="symbol-text mb-2 mt-3 text-white">{{ $t('home.tradeCost') }}</p>
                                <AppFormModelItem prop="volAmount">
                                    <AppNumber :num="form.volAmount" before="Size" :hasArrow="true"
                                        :after="currentPosition.symblename" />
                                </AppFormModelItem>
                            </a-col>
                        </a-row>
                        <a-row :gutter="16" class="mb-3">
                            <a-col :lg="16">
                                <AppSlider @slider:change="updateVolumAmount" :dec="form.volumPercentage" />
                            </a-col>
                            <a-col :lg="8">
                                <AppNumber :num="form.volumPercentage" after="%" :hasArrow="true"
                                    @keyup="setVolumPercent" @change="setVolumPercent" :max="100" />
                            </a-col>
                        </a-row>
                        <a-row :gutter="16" class="mt-4">
                            <a-col :lg="12">
                                <p class="symbol-text">{{ $t('newkeys.nk12') }}</p>
                                <p class="symbol-text">{{ $t('newkeys.nk13') }}
                                    <AppInfoTooltip class="ml-1" :title="$t('contract.unrealizedTip')" />
                                </p>
                            </a-col>
                            <a-col :lg="12" align="end">

                                <p class="symbol-text text-white">
                                    {{ currentPosition.openinterest || '--' }}
                                    {{ currentPosition.symblename }}
                                </p>
                                <p class="fw-5"
                                    :class="unrealizedProfitAndLossAmount > 0 ? 'success-active' : 'red-active'">
                                    {{ unrealizedProfitAndLossAmount || '--' }} USDT
                                </p>
                            </a-col>
                        </a-row>
                        <a-row class="mt-2 mb-2" :gutter="16">
                            <a-col :lg="24">
                                <a-button block class="primary-btn" @click="confirmPlSl" :disabled="placingOrder"
                                    :loading="placingOrder">{{ $t('formMenu.confirm') }}</a-button>
                            </a-col>
                        </a-row>
                    </a-col>
                </a-row>
            </a-form-model>
        </a-modal>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import AppNumber from '@/components/App/AppNumber'
import AppSlider from '@/components/public/slider'
import AppInfoTooltip from '@/components/App/AppInfoTooltip.vue'
import AppFormModelItem from '../App/AppFormModelItem.vue'
export default {
    name:'ProfitAndLoassModal',
    components: {
        AppNumber,
        AppSlider,
        AppInfoTooltip,
        AppFormModelItem
    },
    props: {
        show: {
            type: Boolean
        },
        currentPosition: {
            type: Object,
            default: Object
        }
    },
    data() {
        return {
            form: {
                marketType: "4",
                triggerPrice: '',
                volumPercentage: 0,
                volAmount: '',
                price: '',
                type: '9',
            },

            placingOrder: false,

            setValidation: {
                rules: {
                    triggerPrice: [
                        {
                            required: true,
                            message: this.$t('messages.trigger_price_is_required'),
                        }
                    ],
                    price: [
                        {
                            required: true,
                            message: this.$t('messages.price_field_required'),
                        }
                    ],
                    volAmount: [
                        {
                            required: true,
                            message: this.$t('messages.volume_field_required'),
                        }
                    ]
                },
            },

        }
    },
    watch: {
        show(val) {
            if (val) {
                this.form.triggerPrice = ''
                this.form.volumPercentage = 0
                this.form.volAmount = ''
                this.form.price = ''
                this.form.type = '9'
            }
        }
    },
    computed: {
        unrealizedProfitAndLossAmount() {
            if (!this.currentPosition.copeDailyDetail) {
                return 0
            }
            let price = this.currentPosition.direction == 1
                ? (Number(this.currentPosition.copeDailyDetail.mp) - Number(this.currentPosition.holdpositionsavgprice)) * Number(this.currentPosition.openinterest)
                : (Number(this.currentPosition.holdpositionsavgprice) - Number(this.currentPosition.copeDailyDetail.mp)) * Number(this.currentPosition.openinterest)
            const pnl = this.global_get_tofixed(price, this.global_get_decimal(this.symbleinfo.fcurrencyname + '/usdt').p)
            return pnl
        },
        symbleinfo() {
            return this.getSymbol('descriptions', this.currentPosition.copeDailyDetail?.symble, 1)
        },
        closePrice() {
            return parseFloat(this.currentPosition.copeDailyDetail?.c).toFixed(this.symbleinfo.pricedigits)
        }
    },
    methods: {
        ...mapActions("trade", ["placeOrder"]),
        setVolumPercent(val) {
            this.form.volumPercentage = parseFloat(val)
            const amount = this.currentPosition?.cansellamount || 0
            this.form.volAmount = this.global_get_tofixed(amount * val / 100, this.global_get_decimal(this.symbleinfo.descriptions).a)
        },
        updateVolumAmount(val) {
            this.form.volumPercentage = parseInt((parseFloat(val) * 100))
            const amount = this.currentPosition?.cansellamount || 0
            this.form.volAmount = this.global_get_tofixed(amount * val, this.global_get_decimal(this.symbleinfo.descriptions).a)
        },
        onChange(e) {
            console.log(`checked = ${e.target.value}`);
        },
        changePriceType(val) {
            this.form.marketType = val;
        },
        close() {
            this.$emit('onClose')
        },
        confirmPlSl() {
            this.$refs['plslForm'].validate((resp) => {
                if (!resp) {
                    return
                }

                const obj = {
                    triggerprice: this.form.triggerPrice,
                    ctid: this.symbleinfo.id,
                    direction: -this.currentPosition.direction,
                    price: this.form.marketType == 4 ? this.form.price : 0,
                    amount: this.form.volAmount,
                    contractType: 1,
                    orderType: 6,
                    orderSource: 1,
                    type: this.form.type,
                    tcid: this.currentPosition.id
                }


                console.log('confirmPlSl', obj);
                // return


                this.placingOrder = true

                this.placeOrder(obj).then((response) => {
                    console.log('placeOrderplaceOrder', response);
                    if (response.code == 200) {
                        this.$pubsub.publish(this.$pubsub.getOrderList)
                        this.$pubsub.publish(this.$pubsub.changeDepthChart)
                        this.$store.commit('set_message', { type: 'ok', text: response.msg })
                        this.$emit('onOrderPlaced')
                    }
                }).catch((error) => {
                    console.log('error', error);
                }).finally((error) => {
                    this.placingOrder = false
                })

            })



        }
    },
}
</script>

<style lang="scss">
@import "@/assets/scss/pages/deal/plsl-modal.scss";
</style>
