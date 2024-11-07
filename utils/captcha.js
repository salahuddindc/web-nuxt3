// utils/tencentCaptcha.js
export default {
    captcha: null,
    appId: '189944147',
  
    init(obj) {
      return new Promise((resolve) => {
        if (obj) {
          if (obj.element && obj.options) {
            this.captcha = new TencentCaptcha(
              obj.element,
              this.appId,
              (res) => resolve(res),
              obj.options
            )
          } else if (obj.element) {
            this.captcha = new TencentCaptcha(
              obj.element,
              this.appId,
              (res) => resolve(res)
            )
          } else {
            this.captcha = new TencentCaptcha(
              this.appId,
              (res) => resolve(res),
              obj.options
            )
          }
        } else {
          this.captcha = new TencentCaptcha(this.appId, (res) => resolve(res))
        }
  
        this.captcha.show()
      })
    },
  
    show() {
      this.captcha && this.captcha.show()
    },
  
    destroy() {
      this.captcha && this.captcha.destroy()
    },
  
    getTicket() {
      return this.captcha && this.captcha.getTicket()
    },
  }
  