<template>
  <!--  -->
  <a-button @click="getCode" block :loading="loading"  class="fw-5 timer-btn primary-btn" :disabled="loading" >{{ sendDelay }}</a-button>
</template>
<script>
import Captcha from '~/utils/captcha'
export default {
  name: "VerifyCode",
  props: {
    validate:{
    type:Function,
    default: ()=>{return true}
    },
    country: {
      type: Object,
      default: null
    },
    isexist: {//用于是否需要校验号码是否存在
      type: Boolean,
      default: false
    },
    template: {//用户发送模板
      type: String,
      default: 'Default'
    },
    email: {
      type: String,
      default: undefined
    },
    areacode: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: undefined
    },
    isEmail: {
      type: Boolean,
      default: false,
    },
    isPhone: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      default: ''
    },
    amount: {
      type: String,
      default: ''
    },
    currencyname: {
      type: String,
      default: ''
    },
    remarktag: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      send: false,
      sendDelay: this.$t("formMenu.getCode"),
      timer: null
    }
  },
  watch: {
    '$store.state.hex_lang.locale': function (val) {
      this.sendDelay = this.$t("formMenu.getCode")
    }
  },
  methods: {
    async getCode() {
      const _self = this
      const response=await this.validate(this.email,this.phone);
      if(!response)
      return;
      if (_self.send) return

      let nation;
      if (this.country != null) {//是否需要选择国家
        nation = JSON.stringify(this.country);
        if (nation == "{}") {
          this.$emit('checkStatus', 'countryid');
          this.send = false;
          this.loading = false;
          return;
        }
      }
      if (this.isEmail && (_self.email == '0' || _self.email == null || _self.email == '')) {//邮箱或者手机不能为空
        _self.$store.commit('set_message', { type: 'error', text: this.$t('patch.email_not_attached') });
        return;
      }
      if (this.isPhone && (_self.phone == '0' || _self.phone == null || _self.phone == '')) {
        _self.$store.commit('set_message', { type: 'error', text: this.$t('patch.phone_not_attached') });
        return;
      }
      if (_self.isexist) {//用于检验用户号码是否存在

        let postData = {

        };
        if (_self.phone != 0) {
          if (_self.country != null) {
            if (_self.country.areacode == '0086') {
              let patt1 = new RegExp(/^1\d{10}$/);
              if (!patt1.test(_self.phone)) {
                _self.$store.commit('set_message', { type: 'error', text: this.$t('formMenu.phoneFormatError') });
                return;
              }
            }
          }
          postData.phone = _self.phone;
        } else if (_self.email != 0) {
          postData.email = _self.email;
        } else if (_self.email == '') {
          _self.$store.commit('set_message', { type: 'error', text: this.$t('formMenu.emialInputAddress') });
          return;
        } else if (_self.phone == '') {
          _self.$store.commit('set_message', { type: 'error', text: this.$t('formMenu.phoneNumberInput') });
          return;
        }
        this.send = true;
        this.loading = true;
        _self.$store.dispatch("user_user_exist", postData).then(({ data }) => {
          if (data) {
            if (_self.phone) {
              _self.$store.commit('set_message', { type: 'error', text: this.$t('formMenu.exisPhone') });
            } else if (_self.email) {
              _self.$store.commit('set_message', { type: 'error', text: this.$t('formMenu.existEmail') });
            }
            this.loading = false;
            this.send = false;
            return;
          } else {
            this.send = false;
            this.getcodes();
          }
        }).catch(() => {
          this.loading = false;
          this.send = false;
        })
      } else {
        this.send = false;
        this.getcodes();
      }

    },
    getcodes() {
      const _self = this
      if (_self.send) return
      this.send = true
      const send = {}
      if (_self.address != '' || _self.remarktag != '') {
        send.address = _self.address == null || _self.address == '' ? _self.remarktag : _self.address;
        if (_self.amount > 0) {
          send.amount = _self.amount + ' ' + _self.currencyname;
        }
      }
      let post = ''
      if (_self.email) {
        send.email = _self.email
        post = 'com_email_verifycode_send'
      }
      if (_self.phone) {
        send.phone = _self.phone
        post = 'com_sms_verifycode_send'
      }
      if (_self.country) {
        send.areacode = _self.country.areacode
      }
      if (_self.areacode) {
        send.areacode = _self.areacode
      }
      send.template = _self.template
      this.getCaptch().then((res) => {
        if (res && res.ret == 0) {
          send.randstr = res.randstr
          send.ticket = res.ticket
          send.captchaid = Captcha.appId
        } else if (res && res.ret == 2) {
          _self.loading = false;
          _self.send = false;
          return null
        }
        _self.loading = true
        return _self.$store.dispatch(post, send);
      })
        .then((data) => {
          if (data) {
            if (data.data) {
              return _self.delaySend(data)
            } else {
              _self.loading = false;
              _self.send = false;
              return;
            }
          }
        })
        .then(() => {
          _self.send = false
        })
    },
    getCaptch() {
      if (this.phone) {
        return Captcha.init()
      } else {
        return new Promise((resolve) => {
          resolve(null)
        })
      }
    },
    delaySend(data) {
      this.loading = false;
      let _self = this
      //console.log('DATA', data)
      return new Promise(function (resolve) {
        if (!(data && data.data.succeed)) {
          resolve(true);
          return
        }
        let number = 120
        _self.sendDelay = number + 's';
        _self.timer = setInterval(() => {
          --number
          _self.sendDelay = number + 's';
          if (number == 0) {
            _self.sendDelay = _self.$t("formMenu.getCode");
            clearInterval(_self.timer);
            _self.send = false;
            resolve(true)
          }
        }, 1000)
      })
    },
    clearTime() {
      const _self = this;
      clearInterval(this.timer);
      _self.send = false;
      _self.sendDelay = _self.$t("formMenu.getCode");
      _self.timer = null;
    }
  }
};
</script>
<style lang='less' scoped>
.mail_code {
  margin-left: 10px;
  height: 100%;
  font-size: 14px;
  color: #fff;
  background-color: #ffb11a;
  display: inline-block;
  float: right;
  text-align: center;
  cursor: pointer;
}
</style>

