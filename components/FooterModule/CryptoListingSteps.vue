<template>
  <div class="cypto-listing">
    <div class="main-content">
      <a-row :gutter="16">
        <a-col :md="{ span: 24, offset: 0 }" :lg="{ span: 22, offset: 1 }" :xl="{ span: 18, offset: 3 }">
          <p class="listing-title fw-5 text-center mb-2 mt-10 text-black">
            {{ $t("footer.fm3") }}
          </p>
          <p class="listing-desc text-center">{{ $t('submit_following_information_accurately') }}</p>
          <a-row class="px-5 mx-5 mt-5 listing-app">
            <a-steps :current="current" :labelPlacement="labelPlacement" :direction="direction">
              <a-step v-for="(item, index) in steps" :key="index" :title="item.title">
              </a-step>
            </a-steps>
            <div class="steps-content mt-5 pt-4 pb-5">
              <a-row :gutter="16">
                <a-col :sm="{ span: 24, offset: 0 }" :md="{ span: 14, offset: 5 }" :lg="{ span: 14, offset: 5 }"
                  :xl="{ span: 10, offset: 7 }">
                  <a-form ref="applyForm" :model="applyForm" :rules="rules" :hide-required-mark="true"
                    label-align="left">
                    <div class="first-step" v-if="current == 0">
                      <a-row :gutter="16" class="mb-4">
                        <a-col :lg="24">
                          <AppFormModelItem name="emailAddress" :label="$t('email_address')">
                            <a-input type="email" v-model:value="applyForm.emailAddress"
                              :placeholder="$t('your_email')" />
                          </AppFormModelItem>
                        </a-col>
                        <a-col :lg="24">
                          <AppFormModelItem name="yourUid" :label="$t('your_uid')">
                            <a-input v-model:value="applyForm.yourUid" :placeholder="$t('your_uid')" />
                          </AppFormModelItem>
                        </a-col>
                        <a-col :lg="24">
                          <AppFormModelItem name="role" :label="$t('role_within_project')">
                            <a-input v-model:value="applyForm.role" :placeholder="$t('role_within_project')" />
                          </AppFormModelItem>
                        </a-col>
                        <a-col :lg="24">
                          <AppFormModelItem name="project" :label="$t('name_of_your_project')">
                            <a-input v-model:value="applyForm.project" :placeholder="$t('name_of_your_project')" />
                          </AppFormModelItem>

                        </a-col>
                        <a-col :lg="24">
                          <AppFormModelItem name="team" :label="$t('current_project_team')">
                            <a-input v-model:value="applyForm.team" :placeholder="$t('current_project_team')" />
                          </AppFormModelItem>
                        </a-col>
                      </a-row>
                    </div>
                    <div class="second-step" v-else-if="(current == 1)">
                      <a-row :gutter="16" class="mb-4">
                        <!--  -->
                        <a-col :lg="24">
                          <AppFormModelItem name="token" :label="$t('token_name')">
                            <a-input v-model:value="applyForm.token" :placeholder="$t('your_token_name')" />
                          </AppFormModelItem>
                        </a-col>
                        <a-col :lg="24">
                          <AppFormModelItem name="coinSymbol" :label="$t('symbol_for_your_coin')">
                            <a-input v-model:value="applyForm.coinSymbol" :placeholder="$t('coin_symbol')" />
                          </AppFormModelItem>

                        </a-col>
                        <a-col :lg="24">
                          <AppFormModelItem name="chain" :label="$t('chain')">
                            <a-input v-model:value="applyForm.chain" :placeholder="$t('your_chain')" />
                          </AppFormModelItem>
                        </a-col>
                        <a-col :lg="24">
                          <AppFormModelItem name="smartContract" :label="$t('smart_contract_address')">
                            <a-input v-model:value="applyForm.smartContract"
                              :placeholder="$t('your_smart_contract_address')" />
                          </AppFormModelItem>
                        </a-col>
                        <a-col :lg="24">
                          <AppFormModelItem name="totalSupply" :label="$t('total_supply_of_your_coin')">
                            <a-input v-model:value="applyForm.totalSupply" :placeholder="$t('your_total_supply')" />
                          </AppFormModelItem>

                        </a-col>
                        <a-col :lg="24">
                          <AppFormModelItem name="circulatingSupply" :label="$t('circulating_supply_of_your_coin')">
                            <a-input v-model:value="applyForm.circulatingSupply"
                              :placeholder="$t('your_circulating_supply')" />
                          </AppFormModelItem>

                        </a-col>
                        <a-col :lg="24">
                          <AppFormModelItem name="currentlyToken" :label="$t('currently_utilizing_your_coin')">
                            <a-input v-model:value="applyForm.currentlyToken"
                              :placeholder="$t('currently_your_token')" />
                          </AppFormModelItem>

                        </a-col>

                      </a-row>
                      <a-row :gutter="16">
                        <a-col :lg="24">
                          <AppFormModelItem :label="$t('legal_documents_for_your_project')"
                            class="legal-document-label">
                            <div class="clearfix">
                              <a-upload action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                list-type="picture-card" :file-list="fileList" @preview="handlePreview"
                                @change="handleChange">
                                <div v-if="fileList.length < 8">
                                  <a-icon type="plus" />
                                  <div class="ant-upload-text">
                                    {{ $t('upload') }}
                                  </div>
                                </div>
                              </a-upload>
                              <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
                                <img alt="example" style="width: 100%" :src="previewImage" />
                              </a-modal>
                            </div>
                          </AppFormModelItem>

                        </a-col>
                      </a-row>
                    </div>
                    <div class="third-step" v-else-if="(current == 2)">
                      <a-row :gutter="16" class="mb-4">
                        <a-col :lg="24">
                          <AppFormModelItem name="whitepaper" :label="$t('url_whitepaper')">
                            <a-input v-model:value="applyForm.whitepaper" :placeholder="$t('url_whitepaper')" />
                          </AppFormModelItem>

                        </a-col>
                        <a-col :lg="24">
                          <AppFormModelItem name="officialWebsite" :label="$t('url_official_website')">
                            <a-input v-model:value="applyForm.officialWebsite"
                              :placeholder="$t('url_official_website')" />
                          </AppFormModelItem>

                        </a-col>
                        <a-col :lg="24">
                          <AppFormModelItem name="twitter" :label="$t('twitter_url')">
                            <a-input v-model:value="applyForm.twitter" :placeholder="$t('twitter_url')" />
                          </AppFormModelItem>

                        </a-col>
                        <a-col :lg="24">
                          <AppFormModelItem name="telegram" :label="$t('telegram_url')">
                            <a-input v-model:value="applyForm.telegram" :placeholder="$t('telegram_url')" />
                          </AppFormModelItem>

                        </a-col>
                        <a-col :lg="24">
                          <AppFormModelItem :label="$t('additional_information')" class="legal-document-label">
                            <a-input v-model:value="applyForm.additionalInformation"
                              :placeholder="$t('additional_information')" />
                          </AppFormModelItem>

                        </a-col>
                        <a-col :lg="24">
                          <AppFormModelItem name="communityCollaboration" :label="$t('community_collaboration')"
                            class="legal-document-label">
                            <a-radio-group v-model:value="applyForm.value" @change="onChange">
                              <a-radio value="yes">
                                {{ $t('yes') }}
                              </a-radio>
                              <a-radio value="no">
                                {{ $t('no') }}
                              </a-radio>
                            </a-radio-group>
                          </AppFormModelItem>
                        </a-col>
                        <a-col :lg="24">
                          <AppFormModelItem :label="$t('introduce_your_project')" class="legal-document-label">
                            <a-textarea :rows="8" />
                          </AppFormModelItem>
                        </a-col>

                      </a-row>
                    </div>
                    <div class="final-step" v-else>
                      <a-row :gutter="16">
                        <a-col :lg="24" align="center">
                          <img src="/images/success-icon.svg" class="mt-4 mb-4" />
                          <p class="list-title fw-5 text-black mb-3">{{ $t('footer.fm9') }}</p>
                          <p class="list1-desc mb-4">{{ $t('footer.fm10') }}</p>
                        </a-col>
                        <a-col :lg="24">
                          <nuxt-link to="/"><a-button class="primary-btn mb-5" block>{{ $t('footer.fm11')
                              }}</a-button></nuxt-link>
                        </a-col>
                      </a-row>
                    </div>

                  </a-form>
                  <a-row class="mt-2 mb-4" :gutter="16" v-if="current == 0">
                    <a-col :lg="24">
                      <a-button block class="primary-btn fw-5" @click="UploadImages">{{ $t('person.pm37') }}</a-button>
                    </a-col>
                  </a-row>
                  <a-row :gutter="16" class="mt-2 mb-4" v-else-if="current == 1 || current == 2">
                    <a-col :lg="12"><a-button block class="cancel-outline-btn fw-5" @click="prev">{{ $t('person.pm36')
                        }}</a-button></a-col>
                    <a-col :lg="12"><a-button class="primary-btn fw-5" :loading="loading" :disabled="disabled" block
                        @click="UploadImages">{{ $t('person.pm37')
                        }}</a-button></a-col>
                  </a-row>
                  <a-card class="listing-gray-card" :bordered="false">
                    <a-row>
                      <a-col :xs="2" :sm="2" :md="1" :lg="1"><img src="/images/info-circle.svg" /></a-col>
                      <a-col :xs="22" :sm="22" :md="23" :lg="23" class="pl-2">
                        <p class="mb-0 disclaimer-txt"> {{ $t('disclaimer_crypto') }} <a href="/media-authenticator"
                            target="_blank" class="text-underline fw-5"> {{ $t('our_official_channel') }}.</a> {{
                              $t('more_information_crypto') }} <a href="#" class="text-underline fw-5"> {{
                            $t('crypto_listing') }} </a></p>
                      </a-col>
                    </a-row>
                  </a-card>
                  <AffiliateProgramApplySuccessModal :applySuccessModel="successModel"
                    @applySuccessModelClose="successModel = {}" />
                </a-col>
              </a-row>
            </div>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>

import { workOrderUpdateTypes } from "~/utils/constants";
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {

  props: {
    ApplySuccessModal: {
      type: Boolean,
    },
    close: {
      type: Function,
    },
    metada: {
      default: () => {
        return {
          title: "Apply as a crypto listing ", //{{ $t('agent_plan.ap1') }}
          description:
            "You will get a higher commission and get the chance to join us.", //{{ $t('agent_plan.ap2') }}
        };
      },
    },
  },
  data() {
    return {
      workOrderUpdateTypes: workOrderUpdateTypes, // typename for api 
      current: 0,
      loading: false,
      disabled: false,
      previewVisible: false,
      previewImage: '',
      fileList: [],
      applyForm: {
        emailAddress: "",
        yourUid: "",
        role: "",
        project: "",
        team: "",
        token: "",
        coinSymbol: "",
        chain: "",
        smartContract: "",
        totalSupply: "",
        circulatingSupply: "",
        currentlyToken: "",
        whitepaper: "",
        officialWebsite: "",
        twitter: "",
        telegram: ""
      },
      successModel: {},
      steps: [
        { title: this.$t("basic_info") },
        {
          title: this.$t("detailed_info"),
        },
        {
          title: this.$t('fill_out_social_information')
        },
        {
          title: this.$t("submitted_successfully"),
        },
      ],
      cryptoListingForm: {},
      rules: {
        emailAddress: [
          { required: true, message: this.$t("email_msg") },
          {
            type: "email",
            message: this.$t("valid_email_msg"),
          },
        ],
        yourUid: [
          { required: true, message: this.$t("uid_msg") },
        ],
        role: [
          { required: true, message: this.$t("role_msg") },
        ],
        project: [
          { required: true, message: this.$t("project_msg") },
        ],
        team: [
          { required: true, message: this.$t("team_msg") },
        ],
        token: [
          { required: true, message: this.$t("token_name_msg") },
        ],
        coinSymbol: [
          { required: true, message: this.$t("coin_symbol_msg") },
        ],
        chain: [
          { required: true, message: this.$t("token_msg") },
        ],
        smartContract: [
          { required: true, message: this.$t("smart_contract_msg") },
        ],
        totalSupply: [
          { required: true, message: this.$t("total_supply_msg") },
        ],
        circulatingSupply: [
          { required: true, message: this.$t("circulating_msg") },
        ],
        currentlyToken: [
          { required: true, message: this.$t("currenty_utilizing_token_msg") },
        ],
        whitepaper: [
          { required: true, message: this.$t("whitepaper_msg") },
        ],
        officialWebsite: [
          { required: true, message: this.$t("official_website_msg") },
        ],
        twitter: [
          { required: true, message: this.$t("twitter_msg") },
        ],
        telegram: [
          { required: true, message: this.$t("telegram_msg") },
        ]
      },
    };
  },
  computed: {
    screenSize() {
      let size = 1024
      if (import.meta.client) {
        size = window.innerWidth
      }
      return size
    },
    direction() {
      return this.screenSize < 768 ? 'vertical' : 'horizontal';
    },
    labelPlacement() {
      return this.screenSize < 575 ? 'horizontal' : 'vertical';
    }
  },
  methods: {
    onChange(e) {
      console.log('radio checked', e.target.value);
    },
    async applyAgentPlan(images) {
      const _self = this;
      if (this.current == 0) {
        try {
          await _self.$refs['applyForm'].validate()
          this.current++;
        } catch (error) {
          console.error('first form validation error')
        }
      }
      else if (this.current == 1) {
        try {
          await _self.$refs['applyForm'].validate()
          this.current++;
        } catch (error) {
          console.error('2nd form validation error')
        }
      }
      else if (this.current == 2) {
        let imgString = "";

        // const images = this.fileList
        images.filter((img, index) => {
          if (index < images.length - 1) {
            imgString = imgString + img + ", ";
          }
          else {
            imgString = imgString + img;
          }
          console.log("images", imgString)
        });


        try {
          await _self.$refs['applyForm'].validate()
          this.disabled = true
          this.loading = true;
          const postData = {
            typeName: this.workOrderUpdateTypes.cryptoListing,
            content: "Crypto listing application",
            images: imgString,
            jsonContent: JSON.stringify(_self.applyForm),
          }

          const data = await this.$store.dispatch("work_order_update", postData)

          if (data.code == 200) {
            this.applyForm = {
              emailAddress: "",
              yourUid: "",
              role: "",
              project: "",
              team: "",
              token: "",
              coinSymbol: "",
              chain: "",
              smartContract: "",
              totalSupply: "",
              circulatingSupply: "",
              currentlyToken: "",
              whitepaper: "",
              officialWebsite: "",
              twitter: "",
              telegram: ""
            }
          }
          this.disabled = false
          this.loading = false;

          this.current++
        } catch (error) {
          console.error('3rd form validation error')
        }

      }
      else {
        this.verificationModel = true;
      }

    },
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {

      if (fileList.length > 0) {
        const status = this.beforeImageUpload(fileList);
        if (status) {
          this.fileList = fileList;
          this.noImage = false;
        }
      }
      else {
        this.fileList = fileList;
        this.noImage = true;
      }
    },
    beforeImageUpload(fileList) {
      // Check if fileList is empty
      if (fileList.length === 0) {
        return true;
      }
      if (fileList.length > this.fileList.length) {
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
      let imgArray = [];
      if (this.fileList.length == 0) {
        this.applyAgentPlan(imgArray);
        return;
      }
      let count = 0;

      for (let i = 0; i < this.fileList.length; i++) {
        const file = this.fileList[i];
        let formData = new FormData();
        formData.append("file", file);
        let imgUrlBase64;
        //console.log('$THISS', file.name);
        if (file.name) {
          let reader = new FileReader();
          reader.onload = async function (e) {
            try {
              console.log("imageBase", reader.result.split(","[1]))

              try {
                await _this.$refs['applyForm'].validate()
                const { data } = await _this.$store.dispatch("com_image_upload", {
                  imagetype: 0,
                  imgbase64: (reader.result.split(","))[1],
                  filename: new Date().getTime() + file.name
                });
                if (data) {
                  imgArray.push(data.imgurl);
                  if (imgArray.length == _this.fileList.length) {
                    _this.applyAgentPlan(imgArray);
                  }
                }
              } catch (error) {
                console.error('UploadImages validation error')
              }


            } catch (error) {
              //console.log(error);
            }
          };
          reader.readAsDataURL(file.originFileObj);
        } else {
          imgArray.push(file.url);
        }
      }
    },
    prev() {
      this.$refs.applyForm.clearValidate()
      this.current--;
    },
  },
};
</script>

<style lang="scss">
@import "@/assets/scss/components/modals/success.scss";
</style>
