<template>
    <!-- <div class="agent-apply-modal"> -->
    <a-modal class="agent-apply-modal" :visible="localShow" :footer="false" :title="false" @cancel="close"
        width="767px">
        <a-form ref="applyForm" :model="applyForm" :rules="rules" :hide-required-mark="true" label-align="left">
            <a-row :gutter="16">
                <a-col :lg="1"></a-col>
                <a-col :lg="21" align="center">
                    <p class="mb-2 apply-heading fw-5">{{ $t(metada.title) }}</p>
                </a-col>
                <a-col :lg="2" class=""> <img src="/images/ud-cross.svg" class="pointer" @click="close" />
                </a-col>
            </a-row>
            <a-row :gutter="16">
                <a-col :lg="24" align="center">
                    <p class="my-3 apply-desc fw-5">{{ $t(metada.description) }} </p>
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
                        <a-input v-model:value="applyForm.accountId" :placeholder="$t('partner.account_id')" />
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
                        <a-input v-model:value="applyForm.fullName"
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
                        <a-input v-model:value="applyForm.emailAddress" :placeholder="$t('placeholders.plh3')" />
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                    <a-form-item has-feedback :label="$t('labels.lbl4')" name="country" :colon="false" :wrapper-col="{
                        xl: 24,
                        lg: 24,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }">
                        <AppCountriesDropdown v-model:value="applyForm.country" :countries="countries"
                            @onChange="onChangeCountry" />

                    </a-form-item>
                </a-col>
            </a-row>

            <a-row :gutter="16">
                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                    <a-form-item has-feedback :label="$t('partner.social_links')" name="socialLinkForPrimaryMarketing"
                        :colon="false" :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                        }">
                        <a-input v-model:value="applyForm.socialLinkForPrimaryMarketing"
                            :placeholder="$t('partner.share_social_links')" />


                    </a-form-item>
                </a-col>

                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                    <a-form-item has-feedback :label="$t('partner.members')" name="members" :colon="false" :wrapper-col="{
                        xl: 24,
                        lg: 24,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }">
                        <a-input v-model:value="applyForm.members" :placeholder="$t('partner.number_members')"
                            type="number" />
                    </a-form-item>
                </a-col>
            </a-row>

            <a-row :gutter="16">


                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                    <a-form-item has-feedback :label="$t('partner.social_platform')" name="socialPlatFormLinks"
                        :colon="false" :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                        }">
                        <a-select class="ant-tags-select-list" mode="tags" style="width: 100%" :token-separators="[',']"
                            notFoundContent="" :placeholder="$t('partner.add_more')" @change="filterSocialLinks"
                            v-model:value="applyForm.socialPlatFormLinks">

                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                    <a-form-item has-feedback :label="$t('person.pd15')" name="phoneNumber" :colon="false" :wrapper-col="{
                        xl: 24,
                        lg: 24,
                        md: 24,
                        sm: 24,
                        xs: 24,
                    }">
                        <a-input v-model:value="applyForm.phoneNumber" type="number" :placeholder="$t('person.ps7')" />
                    </a-form-item>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <a-form-item has-feedback :label="$t('partner.intro')" name="introduction" :colon="false"
                        :wrapper-col="{
                            xl: 24,
                            lg: 24,
                            md: 24,
                            sm: 24,
                            xs: 24,
                        }">
                        <a-textarea v-model:value="applyForm.introduction" :placeholder="$t('partner.intro2')"
                            allow-clear />
                    </a-form-item>
                </a-col>
            </a-row>
            <a-row :gutter="16" class="mt-3">
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <a-button class="cancel-outline-btn fw-5" block @click="close">{{ $t('agent_plan.ap8') }}
                    </a-button>
                </a-col>
                <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                    <a-button class="primary-btn fw-5" :loading="loading" block @click="applyAgentPlan">
                        {{ this.$t('agent_plan.ap4') }}
                    </a-button>

                </a-col>
            </a-row>
        </a-form>
    </a-modal>
    <!-- </div> -->
</template>

<script>

export default {
    name: 'ApplyAgentModal',
    props: {
        applyAgentModel: {
            type: Boolean
        },
        applyFormData: {
            type: Object,
            default: () => ({
                fullName: '',
                emailAddress: '',
                country: '',
                accountId: '',
                socialPlatFormLinks: '',
                socialLinkForPrimaryMarketing: '',
                members: '',
                introduction: '',
                phoneNumber: ''
            })
        },
        metada: {
            default: () => {
                return {
                    title: 'agent_plan.ap1',
                    description: 'agent_plan.ap2',
                };
            }
        }
    },
    data() {
        return {
            loading: false,
            localShow: false,
            countries: [],
            userStatus: -1,
            userTicketNo: '',
            remark: '',
            applyForm: {
                fullName: '',
                emailAddress: '',
                country: '',
                accountId: '',
                country: '',
                socialPlatFormLinks: '',
                socialLinkForPrimaryMarketing: '',
                members: '',
                introduction: '',
                phoneNumber: ''
            },
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
                socialLinkForPrimaryMarketing: [
                    { required: true, message: this.$t('messages.msg74') }
                ],
                members: [
                    { required: true, message: this.$t('messages.msg75') }
                ],
                introduction: [
                    { required: true, message: this.$t('messages.msg76') }
                ],

            },
            modalVisible: this.applyAgentModel // Set initial value from prop

        };
    },

    watch: {
        applyFormData: {
            handler(newValue) {
                if (newValue) {
                    this.applyForm = { ...newValue };
                } else {
                    // Initialize with default values or user info
                    this.applyForm = {
                        fullName: $userinfo.realname,
                        emailAddress: $userinfo.email,
                        country: $userinfo.countryname,
                        accountId: $userinfo.idcard,
                        socialLinkForPrimaryMarketing: '',
                        members: '',
                        introduction: '',
                        phoneNumber: $userinfo.countrycode + $userinfo.phone,
                        // Add other default values as needed
                    };
                }
            },
            immediate: true // Trigger handler immediately on component mount
        },
        applyAgentModel: {
            handler(newVal, oldVal) {
                this.localShow = newVal
            },
            immediate: true
        }
    },
    emits: ['onClose'],
    methods: {
        async getUserStatus() {
            const hexServerUserInfo = this.$store.state.hex_server_user_info;
            const email = hexServerUserInfo?.value?.email;
            const userId = hexServerUserInfo?.value?.uid;

            // Check if both email and userId are available
            if (!email || !userId) {
                console.error('Email or userId not found.');
                return;
            }
            const _self = this;
            const postData = {
                typeName: 'affiliate',
                content: _self.$t('community.com19'),
            };
            try {
                const response = await this.$store.dispatch('get_work_order_get', postData);
                console.log(response, "response")
                if (response.data.pagedata[0].infos.length > 0) {
                    const status = response.data.pagedata[0].infos[0].status;
                    this.userStatus = status;
                    //  set the form ticket number for update 
                    this.userTicketNo = response.data.pagedata[0].infos[0].id;
                    // console.log("order", this.userTicketNo)
                }
            } catch (error) {
                console.error('Error fetching user status:', error);
            }
        },

        async applyAgentPlan() {
            const _self = this
            try {
                await this.$refs['applyForm'].validate()

                const postData = {
                    id: this.userTicketNo,
                    typeName: 'affiliate',
                    content: _self.$t('community.com19'),
                    jsonContent: JSON.stringify(_self.applyForm),
                };
                this.loading = true;
                const data = await this.$store.dispatch('work_order_update', postData);
                this.loading = false;
                console.log("data", data)
                if (data.code == 200) {
                    this.applyForm = {
                        fullName: '',
                        emailAddress: '',
                        country: '',
                        accountId: '',
                        country: '',
                        socialLinkForPrimaryMarketing: '',
                        members: '',
                        introduction: '',
                        phoneNumber: ''
                    };
                    _self.getUserStatus();
                    _self.$store.commit('set_message', { type: 'ok', text: this.$t('texts.txt1') + ' ' + this.metada.title });
                    this.close()
                }

            } catch (error) {
                console.log('Validation error:', error)
            }


        },
        onChangeCountry(country) {
            if (country) {
                this.applyForm.country = country.value
            }
        },
        filterSocialLinks(links) {
            // List of allowed social media platforms
            const allowedPlatforms = ['Facebook',
                'facebook',
                'instagram',
                'twitter',
                'linkedin',
                'youtube',
                'snapchat',
                'tiktok',
                'pinterest',
                'reddit',
                'whatsapp',
                'email',
                'telegram',
                'medium',
                'discord'];

            // Filter out links that do not contain any of the allowed platforms
            this.applyForm.socialPlatFormLinks = links.filter(link => {
                const lowerCaseLink = link.toLowerCase();
                return allowedPlatforms.some(platform => lowerCaseLink.includes(platform));
            });
        },
        getCountries() {
            this.$store.dispatch("com_country_getlist").then(({ data }) => {
                data.map((item, index) => {
                    this.countries.push({
                        id: item.countryid,
                        value: (this.lang == 'zh_cn' || this.lang == 'zh_hk') ? item.name : item.engname,
                        type: 'areaCode',
                        icon: item.flag
                    })
                })
            })
        },
        close() {
            this.$emit('onClose')
        }
    },
    mounted() {
        this.getCountries()
        this.getUserStatus()
    },

}
</script>

<style lang="scss">
@use '@/assets/scss/components/modals/success.scss';
</style>
