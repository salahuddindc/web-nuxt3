<template>
  <div>


    <TopBanner :isAvailable="isServiceAvailable" />
    <NewsAlert />
    <div class="gray-bg pt-xs-6 pt-sm-9">
      <AppBanners :channelid="homeBannerChannelId" :pageindex="1" :pagesize="12"
        :perPageCustom="[[320, 1], [425, 2], [991, 3], [1024, 3], [1150, 4], [1200, 4], [1440, 4], [1600, 5]]" />
      <PopularCryptocurrencies />
      <CopyTrading />
      <ProductSuite />
      <BeginnerGuide />
      <Community />
    </div>

    <!--
    <NoServicesModal :visible="showSuccessModal" @onClose="closeModal" v-if="showSuccessModal" />
     -->
  </div>
</template>

<script>
import { homeBannerChannelId } from "~/utils/constants";
import TopBanner from "./TopBanner.vue";
import NewsAlert from "./NewsAlert.vue";
import PopularCryptocurrencies from "./PopularCryptocurrencies.vue";
import CopyTrading from "./CopyTrading.vue";
import ProductSuite from "./ProductSuite.vue";
import BeginnerGuide from "./BeginnerGuide.vue";
import Community from "./Community.vue";


import NoServicesModal from "./NoServicesModal.vue";
import { mapGetters } from "vuex";
import SuccessModal from "../App/SuccessModal.vue";
export default {
  components: {
    TopBanner,
    NewsAlert,
    PopularCryptocurrencies,
    CopyTrading,
    ProductSuite,
    BeginnerGuide,
    Community,

    NoServicesModal,
    SuccessModal
  },
  data() {
    return {
      showSuccessModal: false,
      homeBannerChannelId: homeBannerChannelId,
    }
  },
  computed: {
    ...mapGetters("constants", ["isServiceAvailable"])
  },
  watch: {

    isServiceAvailable: {
      handler(val) {
        if (process.client) {

          this.showModal()
        }
      },
      immediate: true, // Trigger the handler immediately when the component is mounted
    },

  },
  methods: {
    showModal() {
      const showServiceAvailableModal = localStorage.getItem('showServiceAvailableModal') != 'false'
      if (!this.isServiceAvailable && showServiceAvailableModal) {
        this.showSuccessModal = true;
      } else {
        this.showSuccessModal = false;
      }
    },
    closeModal() {
      this.showSuccessModal = false;
      localStorage.setItem('showServiceAvailableModal', 'false')
    },
  },
};
</script>

<style></style>
