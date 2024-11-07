<template>
    <div id="auth">
      <div class="auth-white-bg">
        <div class="main-content">
          <div class="auth">
            <a-row class="login-details">
              <a-col :xs="{ span: 24, offset: 0 }" :sm="{ span: 20, offset: 2 }" :md="{ span: 22, offset: 1 }"
                :lg="{ span: 22, offset: 1 }" :xl="{ span: 18, offset: 3 }">
                <a-row class="parent">
                  <a-col :sm="24" :md="12" :lg="12" class="login-left py-5">
                    <a-row :gutter="16" class="px-5 first-box">
                      <a-col :lg="24">
                        <p class="log-bitnasdaq fw-5 mb-0 pb-5">{{ $t('last.la8') }}</p>
                        <a-tabs default-active-key="1" v-model="tab" @change="signModel.username = ''">
                          <a-tab-pane key="1">
                            <template #tab>
                              <img :src="tab == '1' ? '/images/email-icon-active.svg' : '/images/email-icon.svg'"
                                class="mr-1" />
                              {{ $t('last.la9') }}
                              <p v-show="tab == '1'" class="bottom-line"></p>
                            </template>
                            <a-form ref="authForm" :model="signModel" :rules="setValidation.rules"
                              :hide-required-mark="true" label-align="left">
                              <a-row>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                  <a-form-item has-feedback :label="$t('person.pd14')" name="username"
                                    :colon="false" :wrapper-col="{
                                      xl: 24,
                                      lg: 24,
                                      md: 24,
                                      sm: 24,
                                      xs: 24,
                                    }">
                                    <a-input v-model="signModel.username" :placeholder="$t('placeholders.plh67')" />
                                  </a-form-item>
                                </a-col>
  
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                  <a-form-item :label="$t('person.psd')" name="password" has-feedback :colon="false"
                                    :wrapper-col="{
                                      xl: 24,
                                      lg: 24,
                                      md: 24,
                                      sm: 24,
                                      xs: 24,
                                    }">
                                    <a-input-password v-model="signModel.password" name="password"
                                      :placeholder="$t('placeholders.plh68')" v-on:keyup.enter="signIn('authForm')" />
                                  </a-form-item>
                                </a-col>
                              </a-row>
                              <a-row>
                                <a-col :lg="24" align="end">
                                  <nuxt-link to="reset-password"  class="forgot-pass fw-5">{{ $t('last.la10')
                                    }}</nuxt-link></a-col>
                              </a-row>
                              <a-row>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" align="center">
                                  <a-button class="mt-4 mb-2 fw-5" :class="!loading ? 'primary-btn' : 'disabled-btn'"
                                    :loading="loading" block @click="signIn('authForm')">
                                    {{ $t('last.la11') }}
                                  </a-button>
                                </a-col>
                              </a-row>
                            </a-form>
                          </a-tab-pane>
                          <a-tab-pane key="2" class="phone-no-tab">
                            <template #tab>
                              <img :src="tab == '2' ? '/images/phone-icon-active.svg' : '/images/phone-icon.svg'"
                                class="mr-1" />
                              {{ $t('last.la12') }}
                              <p v-show="tab == '2'" class="bottom-line"></p>
                            </template>
  
                            <a-form ref="authForm" :model="signModel" :rules="setValidation.rules"
                              :hide-required-mark="true" label-align="left">
                              <a-row>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                  <a-form-item has-feedback :label="$t('labels.lbl9')" name="phone" :colon="false"
                                    :wrapper-col="{
                                      xl: 24,
                                      lg: 24,
                                      md: 24,
                                      sm: 24,
                                      xs: 24,
                                    }">
                                    <vue-tel-input v-model="signModel.username" mode="auto" :autoFormat="false"
                                      :validCharactersOnly="true"
                                      :dropdownOptions="{ showFlags: true, showDialCodeInList: true, showSearchBox: true, showDialCodeInSelection: true }"
                                      @country-changed="onCountryChanged"></vue-tel-input>
                                  </a-form-item>
                                </a-col>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                                  <a-form-item :label="$t('person.psd')" name="password" has-feedback :colon="false"
                                    :wrapper-col="{
                                      xl: 24,
                                      lg: 24,
                                      md: 24,
                                      sm: 24,
                                      xs: 24,
                                    }">
                                    <a-input-password v-model="signModel.password" name="password"
                                      :placeholder="$t('placeholders.plh68')" />
                                  </a-form-item>
                                </a-col>
                              </a-row>
                              <a-row>
                                <a-col :lg="24" align="end">
                                  <nuxt-link to="reset-password"   class="forgot-pass fw-5">{{ $t('last.la10')
                                    }}</nuxt-link>
                                </a-col>
                              </a-row>
                              <a-row>
                                <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24" align="center">
                                  <a-button class="mt-4 mb-2 fw-5" :class="!loading ? 'primary-btn' : 'disabled-btn'"
                                    :loading="loading" block @click="signIn('authForm')">
                                    {{ $t('last.la11') }}
                                  </a-button>
                                </a-col>
                              </a-row>
                            </a-form>
                          </a-tab-pane>
                        </a-tabs>
                        <a-divider>Or</a-divider>
                        <a-row :gutter="16">
                          <a-col :lg="12">
                            <a-button @click="googleLogin" class="cancel-outline-btn fw-5 google-btn" block><img
                                src="/images/google-logo.svg" class="pr-2" />
                              {{ $t('last.la13') }}</a-button>
                          </a-col>
                          <a-col :lg="12">
                            <a-button @click="appleLogin" class="cancel-outline-btn fw-5" block><img
                                src="/images/apple.svg" class="pr-2" />{{ $t('last.la14') }}</a-button>
                          </a-col>
                        </a-row>
                        <a-row class="mt-3">
                          <p class="login-account fw-5 px-2 text-center">
                            {{ $t('last.la15') }}
                            <nuxt-link to="/register" class="sign-up">{{ $t('login.signUp') }} </nuxt-link>
                          </p>
                        </a-row>
                      </a-col>
                    </a-row>
                  </a-col>
                  <a-col :sm="24" :md="12" :lg="12" class="login-right">
                    <a-row class="right-box">
                      <a-col :lg="24" align="end">
                        <p class="log-bitnasdaq fw-5 pt-4 mb-5 mt-2" style=" text-align: center;">
                          {{ $t('login.loginwithQR') }}</p>
                        <img src="/images/phonescaner-img.svg" />
                        <div class="login-border">
                          <div>
                            <div class="div_content_sanning_login">
                              <div id="qrCode" class="">
                                <div class="top-square"></div>
                                <div v-if="qr_tatus != 0" class="overlay">
                                  <p style="color:#fff;height: 50px;line-height: 50px;">
                                    {{ qr_tatus == 1 ? $t('login.activateQRCode') : $t('login.expiredQRCode') }}</p>
                                  <a-button class="primary-btn fw-5" @click="scanQrcodeLogin" v-if="qr_tatus == 2"
                                    type="primary">{{
                                      $t('login.refresh') }}</a-button>
                                  <a-button class="primary-btn fw-5" @click="scanQrcodeLogin" v-if="qr_tatus == 1"
                                    type="primary">{{
                                      $t('login.getQRCode') }}</a-button>
                                </div>
                                <div id="canvas" v-if="!qr_success"></div>
                                <p v-if="!qr_success"
                                  style="color:#000; margin-top:280px; text-align:center; font-size: 12px; font-weight:bold">
                                  {{ $t('login.click') }} [<img src="/images/Iconly-Broken-Scan.png"
                                    style="width:9px; height:auto" />]
                                  {{ $t('login.upperright') }}</p>
                                <div v-else class="overlay-success">
                                  <!-- <lottie-animation path="images/success-animation.json" :loop="false" /> -->
                                  <p
                                    style="color:#2ecc71; margin-top:0px; text-align:center; font-size: 16px; font-weight:600">
                                    {{ $t('login.successfulScan') }}</p>
                                </div>
                                <div class="bottom-square"></div>
                              </div>
  
                            </div>
                          </div>
                        </div>
                        <p class="pt-5" style="font-size:15px; font-weight:500; text-align:center; margin:60px 0px;">
                          {{ $t('login.scanCode') }}
                          <span style="color:#FFA500">{{ $t('login.bitnasdaq') }} <br /> {{ $t('login.mobileApp')
                            }}</span>
                          {{ $t('login.instantly') }}
                        </p>
                      </a-col>
                    </a-row>
                  </a-col>
                </a-row>
              </a-col>
            </a-row>
          </div>
        </div>
        <!-- <DirectDownloadAppModal :show="isMobile" :loginText="true" /> -->
      </div>
    </div>
  </template>
  <script>
  import Captcha from '~/utils/captcha'
  import crypto from "@/plugins/axios/crypto"
  import Qrlogo from '/images/qrlogo.png'
//   import DirectDownloadAppModal from '@/components/App/DirectDownloadAppModal.vue'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: 'login',
    middleware: ['guest'],
    components: {
    //   DirectDownloadAppModal
    },
    data() {
      return {
        setValidation: {
          rules: {
            username: [
              {
                type: 'email',
                message: this.$t('messages.msg2'),
              },
              { required: true, message: this.$t('messages.msg1') }
            ],
            password: [
              { required: true, message: this.$t('messages.msg54') },
            ],
          },
        },
        isMobile: false,
        tab: "1",
        loading: false,
        ip: '',
        state: {
          signin: false,
          verify: false,
          login: 'login'
        },
        dropdownOptions: {
          showSearchBox: true,
        },
        signModel: {
          username: '',
          password: '',
          verifycode: '',
          rememberme: true,
        },
        scanningModel: {
          code: '',
          uid: 0
        },
        verifyModel: null,
        scanninglogin: false,
        returnurl: "",
        isActive: true,
        qr_tatus: 1,
        qr_success: false,
        timerscannlogin: null,
        QRCodeStyling: null,
        loginWith: 'email',
        thirdPartyLoginLoading: false,
        Useremail: "",
      }
    },
    computed: {
      ...mapGetters('auth', ['getTempData']),
      tempData: function () {
        return this.getTempData
      }
    },
    methods: {
      ...mapActions({
        clearLocalData: 'chat/clearLocalData',
      }),
      appleLogin() {
        var randstr = this.uuid();
        const options = {
          response_type: 'code', // 固定内容
          response_mode: 'form_post',
          state: randstr, // 随机字符串，此处仅做演示
          client_id: 'bitnasdaq.com.development',
          redirect_uri: `${this.$baseUrl}/comapi/v1.0/com/apple.login`,
          scope: 'openid name email'
        }
        const url = new URL('https://appleid.apple.com/auth/authorize')
        const keys = Object.keys(options)
        keys.forEach(key => {
          url.searchParams.append(key, options[key])
        })
        var bl = false;
        const _self = this;
        const appleloginurl = url.toString();
        var iTop = (window.screen.height - 700) / 2;       //获得窗口的垂直位置;
        var iLeft = (window.screen.width - 1024) / 2;        //获得窗口的水平位置;
        var openWin = window.open(appleloginurl, "newWindow", "width=1024,height=700,top=" + iTop + ", left=" + iLeft + ",titlebar=no, menubar=no,scrollbars=yes,resizable=yes,status=yes,toolbar=no,location=yes");
        var winLoop = setInterval(function () {
          if (openWin.closed && !bl) {
            clearInterval(winLoop);
            bl = true;
            _self.loginWith = 'apple'
            _self.thirdPartyLoginLoading = true
            _self.siginByThreadPlant(randstr);
          }
        }, 1000);
      },
      googleLogin() {
        var randstr = this.uuid();
        const options = {
          response_type: 'code', // 固定内容
          state: randstr, // 随机字符串，此处仅做演示
          include_granted_scopes: true,
          access_type: 'offline',
          client_id: '311638269948-vj4vooafhg3581iuen0kgtgaggdglbhu.apps.googleusercontent.com',
          redirect_uri: `${this.$baseUrl}/comapi/v1.0/com/google.login`,
          scope: 'openid profile email'
        }
        const url = new URL('https://accounts.google.com/o/oauth2/auth')
        const keys = Object.keys(options)
        keys.forEach(key => {
          url.searchParams.append(key, options[key])
        })
        const appleloginurl = url.toString();
        var bl = false;
        const _self = this;
        var iTop = (window.screen.height - 700) / 2;       //获得窗口的垂直位置;
        var iLeft = (window.screen.width - 1024) / 2;        //获得窗口的水平位置;
        var openWin = window.open(appleloginurl, "newWindow", "width=1024,height=700,top=" + iTop + ", left=" + iLeft + ",titlebar=no, menubar=no,scrollbars=yes,resizable=yes,status=yes,toolbar=no,location=yes");
  
        var winLoop = setInterval(function () {
          if (openWin.closed && !bl) {
            clearInterval(winLoop);
            bl = true;
            _self.loginWith = 'google'
            _self.thirdPartyLoginLoading = true
  
            _self.siginByThreadPlant(randstr)
          }
        }, 1000);
      },
      siginByThreadPlant(state) {
        const _self = this;
  
        const _sign = Object.assign({}, _self.signModel);
        _self.$store.dispatch('user_user_signin', { randstr: state }).then((res) => {
          const data = res.data
          _self.verifyModel = data;
          _self.$store.commit('set_token', {
            'token': data.token,
            'expire': new Date().getTime() + 2 * 3600000
          });
          if (!data) {
            throw data;
          }
          _sign.randstr = state;
          _sign.ticket = "666666";
          _self.$store.commit('auth/setLoginWith', _self.loginWith)
  
          return true;
        }).then(async (data) => {
          if (data) {
            _self.$store.commit('auth/setLoginWith', _self.loginWith)
            const userEmail = _self.verifyModel.email;
  
            // Dispatch the action to update the 'visitor_user.userInput' state with the user's email
            _self.$store.dispatch('setUserInput', userEmail);
            //console.log("userrrrrremaiiiillll", userEmail);
            await this.clearLocalData()
  
  
            _self.$router.push({
              name: 'auth',
              params: {
                verifyModel: _self.verifyModel,
                signModel: _sign,
                returnurl: _self.returnurl
              }
            })
  
  
          }
        }).catch((res) => {
          _self.state.signin = false
          _self.loading = false
          _self.thirdPartyLoginLoading = false
        })
      },
      async signIn(formName) {
        const _self = this;
        const _sign = Object.assign({}, _self.signModel);
        if (_self.state.signin) return;
        if (_self.loading) return;
        await this.$refs[formName].validate((valid) => {
          if (valid) {
            _self.loading = true;
            _self.state.signin = true;
            _sign.password = crypto.md5String(_sign.password);
            _sign.areacode = _self.selectedDialCode;
            _self.$store.dispatch('user_user_signin_verify', _sign).then(({ data }) => {
              _self.verifyModel = data;
              if (!data) {
                throw data;
              }
              if (data.isabnormalip) {
                return Captcha.init().then((res) => {
                  if (res && res.ret === 0) {
                    _sign.randstr = res.randstr;
                    _sign.ticket = res.ticket;
                    return true
                  } else if (res && res.ret === 2) {
                    throw ''
                  }
                })
              } else {
                return true
              }
            }).then(async (data) => {
              if (data) {
                const userEmail = _self.verifyModel.email;
  
                // Dispatch the action to update the 'visitor_user.userInput' state with the user's email
                _self.$store.dispatch('setUserInput', userEmail);
                await this.clearLocalData()
  
                _self.$router.push({
                  name: 'auth',
                  params: {
                    verifyModel: _self.verifyModel,
                    signModel: _sign,
                    returnurl: _self.returnurl
                  }
                })
              }
            }).catch((res) => {
              _self.state.signin = false;
              _self.loading = false;
            })
          }
        })
      },
      onSignInSuccess(googleUser) {
        const profile = googleUser.getBasicProfile()
      },
      onSignInError(error) {
        //console.log(error)
      },
      onCountryChanged(selectedCountry) {
        this.selectedDialCode = selectedCountry.dialCode;
        console.log("selected", this.selectedDialCode)
      },
      scanQrcodeLogin() {
        // 扫码登录和账户登录使用的方法
        const _self = this;
        _self.scanninglogin = !_self.scanninglogin;
        // 当使用扫码登录功能时，每2秒轮询查询一次有没有扫码
        if (_self.scanninglogin) {
          _self.bindQRCode();
          _self.$store.commit('remove_user_info');
          _self.timerscannlogin = self.setInterval(function () {
            _self.scanningModel.uid = 0;
            _self.$store.dispatch('user_user_scanninglogin', _self.scanningModel).then((res) => {
              if (res.data && res.data.invitationcode && res.data.invitationcode != "") {
                _self.$store.commit('set_user_info', res);
                _self.$store.commit('set_token', {
                  'token': res.data.token,
                  'expire': new Date().getTime() + 2 * 3600000
                });
                clearInterval(_self.timerscannlogin);
                location.href = '/person';
              } else if (res.data) {//扫码登陆其它状态
                if (res.data.status == 1) {
                  _self.qr_success = true;
                }
                else {
                  _self.qr_success = false;
                }
              }
            });
          }, 2000);
        }
      },
      bindQRCode() {
        const _self = this;
        var code = _self.uuid();
        _self.qr_tatus = 0;
        _self.scanningModel.code = code;
        let bb = setInterval(function () {
          if (document.getElementById('canvas')) {
  
            const qrCode = new _self.QRCodeStyling({
              width: 210,
              height: 210,
              type: "canvas",
              data: "login:" + code,
              image: Qrlogo,
              dotsOptions: {
                color: "#000",
              },
              backgroundOptions: {
                color: "#fff",
              },
            });
            document.getElementById("canvas").innerHTML = null;
            qrCode.append(document.getElementById("canvas"));
  
            clearInterval(bb);
            _self.expireQRCode();
          }
        }, 100)
      },
      expireQRCode() {
        setTimeout(() => {
          this.qr_tatus = 2;
          clearInterval(this.timerscannlogin);
        }, 60000);
      },
      uuid() {
        const s = [],
          hexDigits = "0123456789abcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
        }
        s[14] = "4";
        s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
        s[8] = s[13] = s[18] = s[23] = "-";
        return s.join("");
      },
      toggleTab(id) {
        if (id == 1)
          this.isActive = true;
        else
          this.isActive = false;
        this.signModel = {
          username: '',
          password: '',
          verifycode: '',
          rememberme: true,
        }
      }
    },
    mounted() {
      // for showing download modal
      import("~/utils/helpers").then(({ isMobile }) => {
        console.log("ismobile", isMobile)
        if (isMobile.iOS() || isMobile.Android()) {
          this.isMobile = true
        }
      });
      // ended showing download modal
      let _self = this;
      this.returnurl = this.$route.query.returnurl
      if (this.$route.hash) {
        this.returnurl = this.returnurl + this.$route.hash
      }
  
  
      import('qr-code-styling').then(({ default: QRCodeStyling }) => {
        _self.QRCodeStyling = QRCodeStyling;
      })
  
      if (this.tempData.email) {
        this.signModel.username = this.tempData.email
      }
    },
  
    destroyed() {
      clearInterval(this.timerscannlogin);
      this.$store.commit('auth/setTempData', {})
    }
  }
  </script>
  
  <style lang='scss'>
  @use '@/assets/scss/pages/auth/login.scss';
  </style>
  