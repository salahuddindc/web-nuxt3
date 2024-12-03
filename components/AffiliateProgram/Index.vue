<template>
  <div>
    <div class="affiliate-program">
      <div class="top-banner py-lg-15 py-md-15 py-sm-15 py-xs-10">
        <div class="main-content">
          <a-row type="flex" align="middle">
            <a-col :sm="24" :md="12" :lg="13" :xl="10" class="">
              <h2 class="fw-5 lh-lg-40 lh-md-35 font-lg-32 lh-md-28 font-md-28 font-sm-24 font-xs-20 text-white mb-2">
                {{ $t("agentplan.agent3") }}
              </h2>
              <h6 class="lh-23 fw-5 text-white mb-0">
                {{ $t("agent_plan.ap_mon") }}
              </h6>
              <a-button class="primary-btn fw-5 mt-7" @click="affilateBtnClick()"
                v-if="userStatus == 2 || userStatus == 3">{{
                  $usersettings.iskol
                    ? $t("open_affiliate_panel")
                    : $t("agentplan.agent15")
                }}
              </a-button>

              <a-button class="primary-btn fw-5 mt-7" @click="affilateBtnClick()" v-else>{{
                $usersettings.iskol
                  ? $t("open_affiliate_panel")
                  : $t("agentplan.agent14")
              }}
              </a-button>
              <h6 class="lh-23 fw-5 text-white mb-0">
                {{ userRemarkContent }}
              </h6>
              <p class="mb-0"></p>
            </a-col>
            <a-col :sm="24" :md="12" :lg="14" align="end"><img src="/images/graph.svg" /></a-col>
          </a-row>
        </div>
      </div>
      <!-- <div class="commission-benefits mt-8">
        <div class="main-content">
          <a-card :bordered="false">
            <h2
              class="fw-5 lh-lg-40 lh-md-35 font-lg-32 lh-md-28 font-md-28 font-sm-24 font-xs-20 secondary-black mb-2">
              {{ $t("agentplan.agent1") }}
            </h2>
            <a-row>
              <a-col :lg="{ span: 16, offset: 4 }" :sm="{ span: 22, offset: 1 }" class="mt-7">
                <img src="/images/affiliate-banner1.svg" width="100%" />
              </a-col>
            </a-row>
          </a-card>
        </div>
      </div>
      <div class="privilege-program mt-8">
        <div class="main-content">
          <a-card :bordered="false">
            <h2
              class="fw-5 lh-lg-40 lh-md-35 font-lg-32 lh-md-28 lh-sm-20 font-md-28 font-sm-24 font-xs-20 secondary-black mb-7">
              {{ $t("agent_plan.ap_aff2") }}
            </h2>
            <AgentCard />
          </a-card>
        </div>
      </div>
      <div class="earn-commission mt-8">
        <div class="main-content">
          <a-card :bordered="false">
            <h2
              class="fw-5 lh-lg-40 lh-md-35 font-lg-32 lh-md-28 lh-sm-20 font-md-28 font-sm-24 font-xs-20 secondary-black mb-7">
              {{ $t("agent_plan.ap6") }}
            </h2>
            <AgentComissionCard />
          </a-card>
        </div>
      </div>
      <div class="join-growing-community mt-8">
        <div class="main-content">
          <div class="growing-community-bg px-10 py-12">
            <a-row :gutter="16" type="flex" align="middle">
              <a-col :xs="24" :sm="24" :lg="21">
                <h2 class="fw-5 lh-lg-40 lh-md-35 font-lg-32 lh-md-28 font-md-28 font-sm-24 font-xs-20 text-white mb-2">
                  {{ $t("agentplan.agent9") }}
                </h2>

                <h6 class="lh-23 fw-5 text-white mb-0">
                  {{ $t("agentplan.agent12") }}
                </h6>
              </a-col>
              <a-col :xs="24" :sm="24" :lg="3" align="end">
                <a-button class="primary-btn fw-5 px-8 affiliate-btn mt-md-0 mt-sm-5 mt-xs-5"
                  @click="affilateBtnClick()">
                  {{ $t("agent_plan.ap_join_aff") }}!</a-button>
              </a-col>
            </a-row>
          </div>
        </div>
      </div> -->
      <!-- <div class="main-content my-8">
        <a-card :bordered="false" class="pt-5 financial-card">
          <a-row class="">
            <a-col :lg="24">
              <PublicFaqs :channelid="affiliateChannel" :subtitle="channelSubtitle.affiliateFaqSubtitle" />
            </a-col>
          </a-row>
        </a-card>
      </div> -->
    </div>
    <!-- <div v-if="applyAgentModel">
      <ApplyAgentModal :applyAgentModel="applyAgentModel" :close="close" :applyFormData="applyFormData" />
    </div>
    <ApplySuccessModal :applySuccessModel="successModel" @applySuccessModelClose="successModel = {}" /> -->
  </div> >
</template>

<script>
import ApplyAgentModal from "./ApplyAgentModal.vue";
import AgentCard from "./AgentCard.vue";
import AgentComissionCard from "./AgentComissionCard.vue";
import ApplySuccessModal from "./ApplySuccessModal.vue";

import { affiliateChannel, channelSubtitle } from "~/utils/constants";

export default {
  components: {
    AgentCard,
    AgentComissionCard,
    ApplyAgentModal,
    ApplySuccessModal,

  },
  data() {
    return {
      applyAgentModel: false,
      successModel: false,
      userStatus: -1,
      applyFormData: null,
      userRemarkContent: "",
      showUserStatus: false,
      affiliateChannel: affiliateChannel,
      channelSubtitle: channelSubtitle,
    };
  },
  methods: {
    async getUserStatus() {
      const hexServerUserInfo = this.$store.state.hex_server_user_info;
      const email = hexServerUserInfo?.value?.email;
      const userId = hexServerUserInfo?.value?.uid;

      // Check if both email and userId are available
      if (!email || !userId) {
        console.error("Email or userId not found.");
        return;
      }
      const _self = this;
      const postData = {
        typeName: "affiliate",
        content: _self.$t("community.com19"),
      };
      try {
        const response = await this.$store.dispatch(
          "get_work_order_get",
          postData
        );
        if (response.data.pagedata[0].infos.length > 0) {
          const data = response.data.pagedata[0].infos[0];
          this.userStatus = data.status;
          this.userRemarkContent = data.replycontent;
          //  pass the user recent data in form
          this.applyFormData = JSON.parse(data.jsoncontent);
        }
      } catch (error) {
        console.error("Error fetching user status:", error);
      }
    },
    async affilateBtnClick() {
      await this.getUserStatus(); // Wait for getUserStatus to complete
      const hexServerUserInfo = this.$store.state.hex_server_user_info;
      const email = hexServerUserInfo?.value?.email;
      const userId = hexServerUserInfo?.value?.uid;
      if (!email || !userId) {
        // Redirect the user to the login page with return url
        this.$router.push("/login?returnurl=" + this.$route.path);
        return; // Exit the function
      }
      if (this.$usersettings.iskol) {
        var kolPanelLink = "https://newaffiliates.bitnasdaq.com/";
        window.open(kolPanelLink, "_blank");
      } else {
        // Set conditions based on userStatus
        this.showUserStatus = true;
        switch (this.userStatus) {
          case -1:
            this.applyAgentModel = true;
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
            this.applyAgentModel = true;
            break;
          case 3:
            // this.successModel = {
            //   ServerMessage: this.$t("agent_plan.agent22"),
            // };
            this.applyAgentModel = true;
            break;
          case 4:
            this.successModel = {
              ServerMessage: this.$t("agent_plan.agent23"),
            };
            break;
        }
      }
    },
    close() {
      this.applyAgentModel = false;
      this.successModel = false;
    },
    openAgentModel() {
      if (this.$userinfo.uid) {
        this.applyAgentModel = true;
      } else {
        this.$router.push("/login?returnurl=" + this.$route.path);
      }
    },
  },
  mounted() {
    this.getUserStatus();
  },
};
</script>

<style></style>
