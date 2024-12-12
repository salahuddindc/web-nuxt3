<template>

    <a-modal class="agent-apply-modal" :visible="localShow" :footer="false" :title="false" @cancel="close"
        width="767px">
        <div class="agent-apply-modal">
            <a-form ref="bugReportForm" :model="bugReportForm" :rules="rules" :hide-required-mark="true"
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
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <a-form-item has-feedback :label="$t('labels.account_id')" name="accountId" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-input v-model:value="bugReportForm.accountId" :placeholder="$t('partner.account_id')" />
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
                            <a-input v-model:value="bugReportForm.fullName"
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
                            <a-input v-model:value="bugReportForm.emailAddress"
                                :placeholder="$t('placeholders.plh3')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <a-form-item has-feedback :label="$t('partner.bug')" name="bugSeverity" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-select v-model:value="bugReportForm.bugSeverity"
                                :placeholder="$t('partner.bug_severity')">
                                <a-select-option :value="bug.value" v-for="bug in bugs" :key="bug.value">
                                    {{ bug.text }}
                                </a-select-option>
                            </a-select>
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <a-form-item has-feedback :label="$t('labels.lbl9')" name="phoneNumber" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-input v-model:value="bugReportForm.phoneNumber" :placeholder="$t('person.ps7')"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                        </a-form-item>
                    </a-col>
                </a-row>

                <a-row :gutter="16">

                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <a-form-item has-feedback :label="$t('partner.bug_note')" name="severity" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-textarea v-model:value="bugReportForm.severity" :placeholder="$t('partner.bug_note')"
                                allow-clear />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <a-form-item has-feedback :label="$t('partner.add_ss')" name="screenshot" :colon="false"
                            :wrapper-col="{
                                xl: 24,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-upload name="file" :multiple="true" v-model:value="bugReportForm.screenshot"
                                :headers="headers" @change="handleChange">
                                <a-button class="upload-btn"> <a-icon type="upload" /> {{ $t('partner.upload') }}
                                </a-button>
                            </a-upload>
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16" class="mt-3">
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                        <a-button class="primary-btn fw-5" :loading="loading" block @click="submitReport">{{
                            $t('bugbounty.bb17') }} </a-button>
                    </a-col>
                </a-row>
            </a-form>
        </div>
    </a-modal>
</template>

<script>


export default {
    props: {
        BugBountyModel: {
            type: Boolean
        },

        metada: {
            default: () => {
                return {
                    title: 'Submit Bug Report', //{{ $t('agent_plan.ap1') }}
                };
            }
        }
    },
    data() {
        return {
            localShow: false,
            headers: {
                authorization: 'authorization-text',
            },
            loading: false,
            bugReportForm: {
                fullName: '',
                emailAddress: '',
                accountId: '',
                severity: '',
                bugSeverity: undefined,
                phoneNumber: '',
                screenshot: ''
            },
            bugs: [
                {
                    value: this.$t('partner.critical'),
                    text: this.$t('partner.critical'),
                },
                {
                    value: this.$t('partner.high'),
                    text: this.$t('partner.high'),
                },
                {
                    value: this.$t('partner.medium'),
                    text: this.$t('partner.medium'),
                },
                {
                    value: this.$t('partner.low'),
                    text: this.$t('partner.low'),
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
                bugSeverity: [{ required: true, message: this.$t('partner.bug_rule') }],
            }
        };
    },
    emits: ['onClose'],
    watch: {
        BugBountyModel: {
            handler: function (newVal) {
                this.localShow = newVal
            },
            immediate: true
        }
    },

    methods: {
        close() {
            this.$emit('onClose')
        },
        handleChange(info) {
            if (info.file.status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (info.file.status === 'done') {
                this.$message.success(`${info.file.name} file uploaded successfully`);
            } else if (info.file.status === 'error') {
                this.$message.error(`${info.file.name} file upload failed.`);
            }
        },
        async submitReport() {

            try {
                const _self = this;
                await this.$refs['bugReportForm'].validate()
                this.loading = true;
                const postData = {
                    typeName: 'Others',
                    content: 'Submit The Bug',
                    jsonContent: JSON.stringify(_self.bugReportForm),
                };

                const data = await this.$store.dispatch('work_order_update', postData);
                if (data.code == 200) {
                    this.bugReportForm = {
                        fullName: '',
                        emailAddress: '',
                        accountId: '',
                        severity: '',
                        bugSeverity: '',
                        phoneNumber: '',
                        screenshot: ''
                    };
                    _self.$store.commit('set_message', { type: 'ok', text: 'Bug Report Submited' });
                    _self.close();
                }
                this.loading = false;
            } catch (error) {
                this.loading = false;
                console.error('validation error', error)

            }
        },

    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/modals/success.scss';

.upload-btn {
    border: 1px dotted;

    &:hover {
        background-color: transparent !important;

    }
}
</style>
