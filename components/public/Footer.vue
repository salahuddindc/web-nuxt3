<template>
  <div id="new-footer">

    <a-row :gutter="16" class="footer-bg m-0">
      <div class="footer-box">
        <template v-if="loadingFooterData">
          <AppLoading height="416px" backgroundColor="transparent" />
        </template>
        <template v-else>
          <a-col :md="6" :lg="5" class="logo-col pr-5">
            <nuxtImg src="/images/footer-logo.svg" class="mb-4" alt='footer-logo' width="160px" height="38px" />
            <a-row class="mt-2 mb-0" v-for="email in emailData" :key="email.name">
              <a-col :lg="24">
                <AppSocialLinks />
                <!-- <p class="footerEmail mb-0">
                  {{ email.name }}
                </p> -->
                <p class="list-desc fw-4 mb-1">
                  <a class="list-desc" :href="`mailto:${email.email}`">{{ email.email }}</a>
                </p>
              </a-col>
            </a-row>
          </a-col>

          <a-col :xs="24" :sm="24" :md="24" :lg="19" class="mb-4">
            <a-row :gutter="8" type="flex">
              <a-col class="footer-sec-space" v-for="(footerChannel, footerIndex) in footerChannels" :key="footerIndex">
                <a-collapse v-model:activeKey="activeKey">
                  <template #expandIcon="props">
                    <CaretRightOutlined :rotate="props.isActive ? 90 : 0" />
                    <!-- <a-icon type="caret-right" :rotate="props.isActive ? 90 : 0" /> -->
                  </template>
                  <!-- :collapsible="!screenSizeIsSm ? 'disabled' : null" -->
                  <a-collapse-panel :key="footerIndex + ''" :collapsible="screenSizeIsSm ? 'header' : 'disabled'">
                    <template #header>
                      <h3 class="faq-header fw-5 mb-3">{{ $t(`footer.${footerChannel.channelname}`) }} </h3>
                    </template>
                    <p class="mb-2 p-0" v-for="(subChannel, childIndex) in footerChannel.children"
                      :key="childIndex + 'footer'"> <a href="#"
                        @click="redirect(subChannel.imageurl, subChannel.description)" v-if="subChannel.imageurl">{{
                          subChannel.channelname
                        }}</a>
                      <a href="javascript:;" v-else>{{
                        subChannel.channelname
                      }}</a>
                    </p>
                  </a-collapse-panel>
                </a-collapse>
              </a-col>
            </a-row>
          </a-col>


          <p class="footer-community fw-5 px-2 mb-4">{{ $t('community.com2') }}</p>
        </template>
      </div>
    </a-row>
    <a-row class="sub-bar bg-white">
      <a-col :lg="24" class="pb-5 text-center">
        <div class="main-content">
          <a-divider class="footer-divider" />
          <p class="sub-bar-txt fw-4 mb-0">{{ $t("copyright.copy_right") }}</p>

        </div>
      </a-col>
    </a-row>
    <div id="new-footer">
      <!-- Your existing footer content -->

      <!-- Add the ChatPopover component -->
      <!-- <ChatPopover v-if="true" /> -->

      <!-- <ChatWidget /> -->

    </div>
  </div>
</template>

<script>
import { webFooterArticle } from "~/utils/constants";
import { mapGetters, mapActions } from "vuex";

import { unLink } from "~/utils/helpers";
export default {
  name: "Footer",
  components: {


  },
  data() {
    return {
      hoverKey: -1,
      loading: false,
      activeKey: [],
      screenSizeIsSm: false,
    };
  },
  computed: {
    ...mapGetters("article", ["getFooterData"]),
    ...mapGetters("general", ["loadingFooterData"]),
    ...mapGetters("constants", ["getEmails", "getP2p", "getFinancial", "showMargin", "showBuyBnq"]),
    emailData() {
      return this.getEmails.length > 0 ? this.getEmails.filter(item => item.email == 'service@bitnasdaq.com') : [];
    },

    footerChannels: function () {
      const footerContent = unLink(this.getFooterData)
      return footerContent.map(item => {
        if (parseInt(item.id) == 18) {
          const data = item;
          data.children = item.children.filter(subitem => {
            let isShow = true
            if (subitem.id == 61) {
              isShow = this.getP2p;
              console.log('getP2p', this.getP2p);

            } else if (subitem.id == 60) {
              isShow = this.getFinancial;
              console.log('getP2p', this.getFinancial);
            } else if (subitem.id == 63) {
              isShow = this.showMargin;
              console.log('getP2p', this.showMargin);
            }
            return isShow;
          })
          return data;
        }
        else if (parseInt(item.id) == 19) {
          const data = item;
          data.children = item.children.filter(subitem => {
            if (subitem.id == 48953) {
              return this.showBuyBnq
            }
            return true;
          })
          return data;
        }
        else if (parseInt(item.id) == 20) {
          const data = item;
          data.children = item.children.filter(subitem => {
            if (subitem.id == 6650) {
              return this.getP2p;
            }
            return true;
          })
          return data;
        }
        else {
          return item;
        }

      });
    },
  },
  watch: {
    footerChannels: function (val) {
      if (!this.screenSizeIsSm) {
        val.map((channel, index) => {
          this.activeKey.push(index + '')
        })
      }

    }
  },

  methods: {
    ...mapActions("article", ["fetchFooterData"]),
    scrollToSection(id) {
      const sectionElement = document.getElementById(id);
      if (sectionElement) {
        sectionElement.scrollIntoView({ behavior: 'smooth' });
      }
    },
    redirect(link, slug = null) {
      event.preventDefault();
      var generatedLink = link.replace(/[\?&]lang=en_us/, '')
      if (slug == 'bnq-audit-report') {
        window.open(link, '_blank').focus();
      }
      else if (this.$route.hash && generatedLink == this.$route.fullPath) {
        const id = this.$route.hash.substring(1);
        this.scrollToSection(id);
      }
      else {
        this.$router.push(generatedLink)
      }
    },
    // 去详情
    onResize() {
      const innerWidth = window.innerWidth
      this.screenSizeIsSm = false
      if (innerWidth <= 576) {
        this.screenSizeIsSm = true
        this.activeKey = []
      }
    },
  },
  mounted() {
    this.fetchFooterData({ channelId: webFooterArticle });

    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    })
    this.onResize()



  },
};
</script>

<style lang="scss">
@use "@/assets/scss/pages/footer/footer.scss";

.footerEmail {
  font-family: Satoshi;
  font-size: 14px;
  font-weight: 900;
  font-weight: bold;
  line-height: 25px;
  letter-spacing: 0em;
  text-align: left;
  margin-bottom: 10px;
}

.km-chat-icon-sidebox {
  display: none;
}

.km-custom-widget-background-color {
  display: none;
}
</style>
