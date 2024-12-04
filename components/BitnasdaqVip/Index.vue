<template>
  <div class="bit-vip">
    <div class="vip-header">
      <div class="main-content">
        <a-row class="col-alignment">
          <a-col :xs="24" :sm="16" :lg="16" :xl="11">
            <p class="vip-heading fw-5 mb-2 text-white">
              {{ $t("vipprogram.vip1") }}
            </p>
            <p class="vip-desc fw-5 mb-4 text-white">
              {{ $t("vipprogram.vip2") }}
            </p>
            <a-button class="primary-btn px-4" @click="handleBecomeVipClick"
              v-if="userStatus === 2 || userStatus === 3">
              {{ $t("agentplan.agent15") }}
            </a-button>
            <a-button class="primary-btn px-4" @click="handleBecomeVipClick" v-else>
              {{ $t("vip_pro.become_vip") }}
            </a-button>

            <p class="vip-desc fw-5 mb-4 text-white mt-4">
              {{ userRemarkContent }}
            </p>
          </a-col>
          <a-col :xs="12" :sm="8" :lg="8" :xl="13" align="end" class="pr-5 vip-bg">
            <img src="/images/vip-bg-icon.svg" height="319px" width="100%" />
          </a-col>
        </a-row>
      </div>
    </div>

     <VipTradingFee :vipInfo="vipInfo" />

    <VipLevel :vipInfo="vipInfo" />

    <VipHandlingFee />

    <VipBenefits />

   <div class="mt-10 main-content pb-5">
      <div class="vip-bottom-banner mb-5">
        <a-row :gutter="[16, 16]" type="flex" align="middle">
          <a-col :sm="4" :lg="4" :xl="2" class="exclusive-vip-benefits-img">
            <img src="/images/exclusive-vip-benefits.svg" />
          </a-col>
          <a-col :xs="24" :sm="14" :lg="14" class="pl-4 vip-bottom">
            <p class="bottom-heading mb-2 fw-5">{{ $t("activity.vip_4") }}</p>
            <p class="mb-0 main-desc text-white">
              {{ $t("vip_pro.vip_higher_level") }}
            </p>
          </a-col>
          <a-col :xs="24" :sm="8" :lg="8" align="end" class="btn-row">
            <a-button class="primary-btn px-5" @click="handleBecomeVipClick">{{
              $t("trade.tp19")
            }}</a-button>
          </a-col>
        </a-row>
      </div>
    </div>
    <VipModal :vipModel="vipModel" @on-close="close" :applyFormData="applyFormData" />
    <ApplySuccessModalVue :applySuccessModel="successModel" @applySuccessModelClose="successModel = {}" />
  </div>
</template>

<script>
import { vipBannerChannelId } from "~/utils/constants";
// import VipBanner from "./VipBanner.vue";
import VipTradingFee from "./VipTradingFee.vue";
import VipLevel from "./VipLevel.vue";
import VipHandlingFee from "./VipHandlingFee.vue";
import VipBenefits from "./VipBenefits.vue";
import VipModal from "./VipModal.vue";
import Banners from "~/components/App/Banners.vue";

import ApplySuccessModalVue from "../AffiliateProgram/ApplySuccessModal.vue";

export default {
  components: {
    // VipBanner,
    VipTradingFee,
    VipLevel,
    VipHandlingFee,
    VipBenefits,
    VipModal,
    Banners,
    ApplySuccessModalVue,
  },
  data() {
    return {
      vipModel: false,
      successModel: false,
      vipInfo: {},
      userStatus: -1,
      userRemarkContent: "",
      applyFormData: null,
      showUserStatus: false,
      vipBannerChannelId,
    };
  },
  methods: {
    close() {
      this.vipModel = false;
      this.successModel = false;
    },
    async getUserStatus() {
      const _self = this;
      const postData = {
        typeName: "vip-program",
        content: _self.$t("community.com22"),
      };
      try {
        const response = await this.$store.dispatch(
          "get_work_order_get",
          postData
        );
        console.log(response, "response");
        if (response.data.pagedata[0].infos.length > 0) {
          const data = response.data.pagedata[0].infos[0];
          this.userStatus = data.status;
          this.userRemarkContent = data.replycontent;
          this.applyFormData = JSON.parse(data.jsoncontent);
          console.log("applyform", this.applyFormData)
        }
      } catch (error) {
        console.error("Error fetching user status:", error);
      }
    },
    async handleBecomeVipClick() {
      await this.getUserStatus(); // Wait for getUserStatus to complete
      const _self = this;
      const hexServerUserInfo = this.$store.state.hex_server_user_info;
      const email = hexServerUserInfo?.value?.email;
      const userId = hexServerUserInfo?.value?.uid;
      if (!email || !userId) {
        // Redirect the user to the login page with return url
        _self.$router.push("/login?returnurl=" + this.$route.path);
        return; // Exit the function
      } else {
        // Set conditions based on userStatus
        this.showUserStatus = true;
        switch (this.userStatus) {
          case -1:
            this.vipModel = true;
            break;
          case 0:
            this.successModel = {
              ServerMessage: this.$t("agent_plan.agent19"),
            };
            break;
          case 1:
            this.successModel = {
              ServerMessage: this.$t("agent_plan.agent20"),
            };
            break;
          case 2:
            // this.successModel = {
            //   ServerMessage: this.$t("agent_plan.agent21"),
            // };
            this.vipModel = true;
            break;
          case 3:
            //  this.successModel = {
            //   ServerMessage: this.$t("agent_plan.agent22"),
            // };
            this.vipModel = true;
            break;
          case 4:
            this.successModel = {
              ServerMessage: this.$t("agent_plan.agent23"),
            };
            break;
        }
      }
    },
    async getVipInfo() {
      try {
        const { data } = await this.$store.dispatch("get_my_vip_info_get");
        if (data) {
          this.vipInfo = data;
        }
      } catch (error) { }
    },
  },
  mounted() {
    this.getVipInfo();
    const hexServerUserInfo = this.$store.state.hex_server_user_info;
    const email = hexServerUserInfo?.value?.email;
    const userId = hexServerUserInfo?.value?.uid;
    if (email && userId) {
      this.getUserStatus();
    }
  },
};
</script>

<style></style>
