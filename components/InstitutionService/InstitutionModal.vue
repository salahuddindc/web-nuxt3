<template>

    <a-modal class="agent-apply-modal" :visible="InstitutionModel" :footer="false" :title="false" @cancel="close"
        width="767px">
        <div class="agent-apply-modal">
            <a-form ref="InstitutionForm" :model="InstitutionForm" :rules="rules" :hide-required-mark="true"
                label-align="left">
                <a-row :gutter="16">
                    <a-col :lg="1"></a-col>
                    <a-col :lg="21" align="center">
                        <p class="mb-2 apply-heading fw-5">{{ metada.title }}</p>
                    </a-col>
                    <a-col :lg="2" class=""> <img src="/images/ud-cross.svg" class="pointer" @click="close" />
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :lg="24" align="center">
                        <p class="my-3 apply-desc fw-5">{{ metada.description }} </p>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <a-form-item has-feedback :label="$t('labels.account_id')" name="accountId" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-input v-model:value="InstitutionForm.accountId"
                                :placeholder="$t('partner.account_id')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <a-form-item has-feedback :label="$t('labels.full_name')" name="fullName" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-input v-model:value="InstitutionForm.fullName"
                                :placeholder="$t('placeholders.enter_your_full_name')" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <a-form-item has-feedback :label="$t('labels.lbl3')" name="emailAddress" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-input v-model:value="InstitutionForm.emailAddress"
                                :placeholder="$t('placeholders.plh3')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <a-form-item has-feedback :label="$t('in_service.is22')" name="service" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-select v-model:value="InstitutionForm.insServices"
                                :placeholder="$t('messages.specify_inst')">
                                <a-select-option :value="Service.value" v-for="Service in services"
                                    :key="Service.value">
                                    {{ Service.text }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <a-form-item has-feedback :label="$t('person.pd15')" name="phoneNumber" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-input v-model:value="InstitutionForm.phoneNumber" :placeholder="$t('person.ps7')"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                        </a-form-item>
                    </a-col>

                </a-row>

                <a-row :gutter="16" class="mt-3">
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <a-button class="primary-btn fw-5" :loading="loading" block @click="submitService">{{
                            $t('trade.tp19') }}</a-button>
                    </a-col>
                </a-row>
            </a-form>
        </div>
    </a-modal>
</template>

<script>


export default {
    props: {
        InstitutionModel: {
            type: Boolean
        },

        metada: {
            default: () => {
                return {
                    title: 'Become a institutional client',
                    description: 'We will provide you with development and promotion funds; and provide services 24*7 hours.'
                };
            }
        }
    },
    data() {
        return {
            localShow: false,
            loading: false,
            InstitutionForm: {
                fullName: '',
                emailAddress: '',
                accountId: '',
                insServices: undefined,
                phoneNumber: ''
            },
            services: [
                {
                    value: this.$t('tabkeys.tab16'),
                    text: this.$t('tabkeys.tab16'),
                },
                {
                    value: this.$t('tabkeys.spot_margin_trade'),
                    text: this.$t('tabkeys.spot_margin_trade'),
                },
                {
                    value: this.$t('in_service.is8'),
                    text: this.$t('in_service.is8'),
                },
                {
                    value: this.$t('in_service.api_transaction'),
                    text: this.$t('in_service.api_transaction'),
                },
                {
                    value: this.$t('in_service.data_report'),
                    text: this.$t('in_service.data_report'),
                },
                {
                    value: this.$t('in_service.otc_lending'),
                    text: this.$t('in_service.otc_lending'),
                }
            ],
            rules: {
                emailAddress: [
                    { required: true, message: this.$t('messages.msg1') },
                    {
                        type: 'email',
                        message: this.$t('messages.msg2'),
                    },
                ],
                fullName: [
                    { required: true, message: this.$t('messages.provide_full_name') },
                ],
                accountId: [
                    { required: true, message: this.$t('messages.provide_uid') },
                ],
                country: [
                    { required: true, message: this.$t('messages.msg5') },
                ],
                insServices: [{ required: true, message: this.$t('messages.specify_inst') }],
            }
        };
    },
    watch: {
        InstitutionModel: {
            handler: function (newValue, oldValue) {
                this.localShow = newValue
            },
            immediate: true
        }
    },
    emits: ['onClose'],

    methods: {
        close() {
            this.$emit('onClose')
        },
        async submitService() {
            const _self = this;
            try {
                await this.$refs['InstitutionForm'].validate()

                this.loading = true;
                const postData = {
                    typeName: 'Others',
                    content: 'Instution Services',
                    jsonContent: JSON.stringify(_self.InstitutionForm),
                };
                try {
                    const data = await this.$store.dispatch('work_order_update', postData);
                    if (data.code == 200) {
                        this.InstitutionForm = {
                            fullName: '',
                            emailAddress: '',
                            accountId: '',
                            insServices: '',
                            phoneNumber: ''
                        };
                        _self.$store.commit('set_message', { type: 'ok', text: 'Applied Successfully' });
                        _self.close();
                    }
                    this.loading = false;
                }
                catch (error) {
                    //console.log('Error', error)
                    this.loading = false;
                }
            } catch (error) {
                console.error(error);

            }

        },

    },
}
</script>

<style lang="scss">
@use '@/assets/scss/components/modals/success.scss';
</style>
