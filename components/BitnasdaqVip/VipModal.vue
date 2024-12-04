<template>
    <div class="agent-apply-modal">
        <a-modal id="vip-modal" v-model:value="localShow" :footer="false" :title="false" @cancel="close" width="689px">
            <a-form ref="vipForm" :model="vipForm" :rules="rules" :hide-required-mark="true" label-align="left">
                <a-row :gutter="16">
                    <a-col :lg="22">
                        <p class="mb-2 apply-heading fw-5">{{ $t(metadata.title) }}</p>
                        <p class="success-desc mb-0">{{ $t('partner.share_profile') }}</p>
                    </a-col>
                    <a-col :lg="2" align="end"> <img src="/images/ud-cross.svg" class="pointer" @click="close" />
                    </a-col>
                </a-row>
                <a-row :gutter="16" class="mb-2 mtop-3">
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <a-form-item has-feedback :label="$t('labels.account_id')" prop="accountId" :colon="false"
                            :label-col="{
                                xl: 10,
                                lg: 24,
                                md: 24,
                                sm: 24,
                                xs: 24,
                            }">
                            <a-input v-model="vipForm.accountId" :placeholder="$t('partner.account_id')" />
                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <a-form-item has-feedback :label="$t('labels.full_name')" prop="fullName" :colon="false">
                            <a-input v-model="vipForm.fullName"
                                :placeholder="$t('placeholders.enter_your_full_name')" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <a-form-item has-feedback :label="$t('labels.lbl3')" prop="emailAddress" :colon="false">
                            <a-input v-model="vipForm.emailAddress" :placeholder="$t('placeholders.plh3')" />
                        </a-form-item>
                    </a-col>

                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
                        <a-form-item has-feedback :label="$t('labels.lbl9')" prop="phoneNumber" :colon="false">
                            <a-input v-model="vipForm.phoneNumber" :placeholder="$t('person.ps7')"
                                pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <p class="upload-proof mb-2 fw-5 text-black mt-4">{{ $t('partner.upload_proof') }}</p>
                <p class="mb-4 success-desc">{{ $t('partner.spot_margin_future_monthly_trading_volume') }}</p>
                <a-row :gutter="24" class="">
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="7">
                        <a-form-item has-feedback prop="spotTradingVolume" :colon="false">

                            <UploadComponentVue :fileList="spotFileList" :previewVisible="spotPreviewVisible"
                                :previewImage="spotPreviewImage" @cancel="handleCancel('spot')"
                                @preview="handlePreview('spot', $event)" @change="handleChange('spot', $event)"
                                v-model="vipForm.spotFileList" />

                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="7">
                        <a-form-item has-feedback prop="marginTradingVolume" :colon="false">

                            <UploadComponentVue :fileList="marginFileList" :previewVisible="marginPreviewVisible"
                                :previewImage="marginPreviewImage" @cancel="handleCancel('margin')"
                                @preview="handlePreview('margin', $event)" @change="handleChange('margin', $event)"
                                v-model="vipForm.marginTradingVolume" />

                        </a-form-item>
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="7">
                        <a-form-item has-feedback prop="futureTradingVolume" :colon="false">

                            <UploadComponentVue :fileList="futureFileList" :previewVisible="futurePreviewVisible"
                                :previewImage="futurePreviewImage" @cancel="handleCancel('future')"
                                @preview="handlePreview('future', $event)" @change="handleChange('future', $event)"
                                v-model="vipForm.futureTradingVolume" />
                        </a-form-item>
                    </a-col>

                </a-row>
                <p class="mt-3 mb-4 text-black">{{ $t('partner.bitnasdaq_vip_tier') }}</p>
                <a-row :gutter="16">
                    <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="13">
                        <a-form-item has-feedback prop="bitgetVipTier" :colon="false">

                            <UploadComponentVue :fileList="bitgetFileList" :previewVisible="bitgetPreviewVisible"
                                :previewImage="bitgetPreviewImage" @cancel="handleCancel('bitget')"
                                @preview="handlePreview('bitget', $event)" @change="handleChange('bitget', $event)"
                                v-model="vipForm.bitgetVipTier" />
                        </a-form-item>
                    </a-col>
                </a-row>
                <a-row>
                    <a-col :lg="24">
                        <p class="vip-desc mt-1">{{ $t('partner.img_format') }}</p>
                    </a-col>
                </a-row>
                <a-row :gutter="16" class="mtop-3">
                    <a-col :lg="12">
                        <a-button class="cancel-outline-btn" block @click="close">{{ $t('legalTrad.Cancel')
                            }}</a-button>
                    </a-col>
                    <a-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12">
                        <a-button class="primary-btn fw-5" :loading="loading" block @click="UploadImages">
                            {{ $t('activity.vip_3') }}</a-button>
                    </a-col>
                </a-row>
            </a-form>
        </a-modal>
    </div>
</template>

<script>

import UploadComponentVue from '../BitnasdaqVip/UploadComponent.vue'
import { workOrderUpdateTypes } from "~/utils/constants";


export default {
    props: {
        vipModel: {
            type: Boolean
        },
        applyFormData: {
            type: Object,
            default: () => ({
                fullName: '',
                emailAddress: '',
                accountId: '',
                phoneNumber: '',
                spotTradingVolume: '',
                marginTradingVolume: '',
                futureTradingVolume: '',
                bitgetVipTier: ''
            })
        },
        metadata: {
            default: () => {
                return {
                    title: 'one_step_away', //this.$t('one_step_away')
                    description: ''
                };
            }
        }
    },
    components: {
        UploadComponentVue
    },
    emits: ['onClose'],
    data() {
        return {
            localShow: false,
            workOrderUpdateTypes: workOrderUpdateTypes, // typename of api 
            loading: false,
            headers: {
                authorization: 'authorization-text',
            },
            imageURL: [],
            userStatus: -1,
            ticketNo: '',
            // State variables for first (spot) upload component
            marginFileList: [],
            marginPreviewVisible: false,
            marginPreviewImage: '',

            // State variables for second (margin) upload component
            spotFileList: [],
            spotPreviewVisible: false,
            spotPreviewImage: '',

            // state variable for third (future) upload componenet 
            futureFileList: [],
            futurePreviewVisible: false,
            futurePreviewImage: '',

            // state variable for fourth (bitgit) upload componenet 
            bitgetFileList: [],
            bitgetPreviewVisible: false,
            bitgetPreviewImage: '',

            vipForm: {
                fullName: '',
                emailAddress: '',
                accountId: '',
                phoneNumber: '',
                spotTradingVolume: '',
                marginTradingVolume: '',
                futureTradingVolume: '',
                bitgetVipTier: ''
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

            }
        };
    },
    watch: {
        vipModel: {
            handler(newValue) {
                this.localShow = newValue
                if (newValue) {
                    this.getUserStatus()
                }
            },
            immediate: true
        },
        applyFormData: {
            handler(newValue) {
                if (newValue) {
                    console.log("watch if called")
                    this.vipForm = { ...newValue };
                } else {
                    // Initialize with default values or user info
                    console.log("watched else called", $userinfo)
                    this.vipForm = {
                        fullName: $userinfo.value.realname,
                        emailAddress: $userinfo.value.email,
                        accountId: $userinfo.value.idcard,
                        phoneNumber: $userinfo.value.countrycode + $userinfo.phone,
                        // Add other default values as needed
                    };
                }
            },
            immediate: true // Trigger handler immediately on component mount
        },
    },
    methods: {

        close() {
            this.$emit('onClose')
        },

        getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },
        handleCancel(type) {
            this[`${type}PreviewVisible`] = false;
        },
        async handlePreview(type, file) {
            if (file && (!file.url && !file.preview)) {
                file.preview = await this.getBase64(file.originFileObj);
            }
            this[`${type}PreviewImage`] = file && (file.url || file.preview);
            this[`${type}PreviewVisible`] = true;
        },
        handleChange(type, { fileList }) {
            if (fileList.length > 0) {
                const status = this.beforeImageUpload(fileList);
                if (status) {
                    this[`${type}FileList`] = fileList;
                    const file = fileList[0];
                    const imageURL = file.name;
                    this.imageURL.push(imageURL)
                    this.$emit('change', { fileList, imageURL });
                }
            } else {
                this[`${type}FileList`] = fileList;
            }
        },
        beforeImageUpload(fileList) {
            // Check if fileList is empty
            if (fileList) {
                return true;
            }
            if (fileList) {
                const file = fileList[fileList.length - 1];
                const isLt1M = file.size / 1024 / 1024 < 5;
                const isJPG = file.type === "image/jpeg" || file.type === "image/png";

                if (!isLt1M) {
                    this.$store.commit("set_message", {
                        type: "error",
                        text: this.$t("authentication.picMax")
                    });
                    // Reject upload if file size exceeds the limit
                    return false;
                }

                if (!isJPG) {
                    this.$store.commit("set_message", {
                        type: "error",
                        text: this.$t("manage.isJpg")
                    });
                    // Reject upload if iss not png or jpg
                    return false;
                }
            }

            return true;
        },


        async UploadImages() {
            const _this = this;

            let imgArrays = {
                spot: [],
                margin: [],
                future: [],
                bitget: []
            };

            const uploadPromises = [];

            for (const fileType of ['spot', 'margin', 'future', 'bitget']) {
                const fileList = this[`${fileType}FileList`];
                if (fileList.length === 0) {
                    imgArrays[fileType] = [];
                } else {
                    for (const file of fileList) {
                        uploadPromises.push(this.uploadImage(file, fileType, imgArrays));
                    }
                }
            }

            // Wait for all uploads to complete
            await Promise.all(uploadPromises);
        },

        async uploadImage(file, fileType, imgArrays) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                const imgUrlBase64 = await new Promise((resolve, reject) => {
                    reader.onload = () => resolve(reader.result.split(",")[1]);
                    reader.onerror = error => reject(error);
                });
                await this.$refs['vipForm'].validate(async (valid) => {
                    if (valid) {
                        const { data } = await this.$store.dispatch("com_image_upload", {
                            imagetype: 0,
                            imgbase64: imgUrlBase64,
                            filename: new Date().getTime() + file.name
                        });

                        if (data) {
                            imgArrays[fileType].push(data.imgurl);
                            console.log(data.imgurl)
                            this.submitApplication(imgArrays);
                        }

                    }
                });


            } catch (error) {
                console.error("Error uploading image:", error);
            }
        },
        async getUserStatus() {
            const hexServerUserInfo = this.$store.state.hex_server_user_info;
            const email = hexServerUserInfo?.value?.email;
            const userId = hexServerUserInfo?.value?.uid;

            // Check if both email and userId are available
            if (!email || !userId) {
                return;
            }
            const _self = this;
            const postData = {
                typeName: workOrderUpdateTypes.vipProgram,
                content: _self.$t('community.com22'),
            };
            try {
                const response = await this.$store.dispatch('get_work_order_get', postData);
                console.log(response, "response")
                if (response.data.pagedata[0].infos.length > 0) {
                    const data = response.data.pagedata[0].infos[0];
                    this.userStatus = data.status;
                    this.ticketNo = data.id;
                    console.log("userstatus", this.userStatus, this.ticketNo)
                }
            } catch (error) {
                console.error('Error fetching user status:', error);
            }
        },
        async submitApplication(imgArrays) {
            const _self = this;
            let imgString = ''; // Define imgString here
            console.log('Images:', imgArrays); // Log the images array for debugging

            // Concatenate URLs from each array in imgArrays
            for (const key in imgArrays) {
                if (imgArrays.hasOwnProperty(key)) {
                    const array = imgArrays[key];
                    imgString += array.join(', ') + ', ';
                }
            }

            // Remove the trailing comma and space
            imgString = imgString.slice(0, -2);

            await this.$refs['vipForm'].validate(async (valid) => {
                if (valid) {
                    this.loading = true;
                    const postData = {
                        id: this.ticketNo,
                        typeName: 'vip-program',
                        content: 'Vip and My Fee',
                        images: imgString,
                        jsonContent: JSON.stringify(_self.vipForm),
                    };

                    try {
                        const data = await this.$store.dispatch('work_order_update', postData);
                        if (data.code == 200) {
                            this.vipForm = {
                                fullName: '',
                                emailAddress: '',
                                accountId: '',
                                phoneNumber: '',
                                spotTradingVolume: '',
                                marginTradingVolume: '',
                                futureTradingVolume: '',
                                bitgetVipTier: ''
                            };
                            _self.getUserStatus();
                            _self.$store.commit('set_message', { type: 'ok', text: 'Applied Successfully' });
                            _self.close();
                        }
                        this.loading = false;
                    }
                    catch (error) {
                        //console.log('Error', error)
                        this.loading = false;
                    }
                }
            });
        },

    },
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/components/modals/success.scss';
</style>
