

import { useNuxtApp } from '#app';
export default {
    async serverInit({ commit, state }, { config }) {
        // Perform your initialization logic here
        // This is similar to what you'd do in nuxtServerInit

        // const cookie = Cookie.parse(req.headers.cookie ? req.headers.cookie : ''),
        const hex_lang = useCookie(state.hex_lang.type).value ? useCookie(state.hex_lang.type).value : state.hex_lang.default,
            hex_exchange = useCookie(state.hex_client_exchange.type).value ? useCookie(state.hex_client_exchange.type).value : state.hex_client_exchange.default,
            hex_key = useCookie(state.hex_key.type).value ? useCookie(state.hex_key.type).value : '',
            hex_uid = useCookie(state.hex_uid.type).value ? useCookie(state.hex_uid.type).value : '',
            hex_background = useCookie(state.hex_client_background.type).value ? useCookie(state.hex_client_background.type).value : state.hex_client_background.default,
            hex_tradeview = useCookie('tradeView').value ? useCookie('tradeView').value : 'std',
            hex_token = useCookie(state.hex_token.type).value ? useCookie(state.hex_token.type).value : ''
        // app.i18n.locale = hex_lang;
        console.log('hex_langhex_langhex_langhex_lang', hex_lang, hex_uid);

        commit('set_lang', hex_lang);
        // //设置默认币种
        commit('set_client_exchange', hex_exchange);
        // //设置默认背景
        commit('set_client_background', hex_background);

        commit('set_tradeview', hex_tradeview);
        // // 设置uid
        commit('set_server_uid', hex_uid);
        // // 设置key
        commit('set_server_key', hex_key);
        commit('set_token', hex_token)
    },
    async setUserInputttt({ commit, dispatch }, params) {

        console.log("setUserInputsetUserInputsetUserInputsetUserInput", params)
        try {
            const { $axios } = useNuxtApp();
            console.log("setUserInput $axiosddd ddd", params)
            const res = await $axios.post('/userapi/v1.0/user/user.settings.get', params)
            console.log("setUserInput resresresres", res)
            return res
        } catch (error) {
            console.log('error', error)
        }
    },

    getIntervalData({ dispatch, commit, state }, paramsary) {
        const requestTimer = new Date().getTime(),
            { url, params = {}, timer, callback } = paramsary,
            type = url;
        Vue.$socket.cleartimer(type);
        Vue.$socket.pollingtimer[type] = {};
        function clearOtherTime(type) {
            let _timer = Object.getOwnPropertyNames(Vue.$socket.pollingtimer[type]);
            if (_timer.length > 1) {
                _timer = _timer.sort((a, b) => {
                    return parseFloat(a) - parseFloat(b)
                });
                for (let i = 0; i < _timer.length; i++) {
                    if (i === (_timer.length - 1)) {
                        break;
                    }
                    clearTimeout(Vue.$socket.pollingtimer[type][_timer[i]]);
                    delete Vue.$socket.pollingtimer[type][_timer[i]];
                }
            }
        }
        const call = function () {
            const promise = dispatch(url, params);
            return promise.then((res) => {
                clearOtherTime(type);
                const _timer = Object.getOwnPropertyNames(Vue.$socket.pollingtimer[type]),
                    _t = Vue.$socket.pollingtimer[type][_timer[0]];
                if (_t && _t < 0) {
                    clearTimeout(Vue.$socket.pollingtimer[type][_timer[0]]);
                    Vue.$socket.pollingtimer[type][_timer[0]] = -1;
                } else {
                    Vue.$socket.pollingtimer[type][requestTimer] = setTimeout(call, timer);
                    return res;
                }
            }).then((res) => {
                if (res) {
                    callback && callback(Object.assign(res, {
                        params: params
                    }));

                    return res;
                }
            })
        };
        return call()
    },
    async gettoken({ commit }, params) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/comapi/v1.0/com/token.get', params)
    },
    async com_country_getlist({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/comapi/v1.0/com/country.getlist', params, config);
    },

    async com_getlangbyip({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/comapi/v1.0/com/common.getlangbyip', params, config);
    },

    // 获取常量详细
    async com_constants_getconstantsinfo({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/comapi/v1.0/com/constants.getconstantsinfo', params, config)
    },

    async user_user_settings_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/user.settings.get', params, config)
    },

    async user_user_settings_save({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/user.settings.save', params, config)
    },
    async user_user_avatar_set({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/user.avatar.set', params, config)
    },
    async user_flash_exchange_settings_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/flashexchangesetting.get', params, config)
    },
    async user_flash_convert_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/flashconvert.get', params, config)
    },
    async user_flash_convert_records_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/flashconvertrecodes.get', params, config)
    },
    async user_flash_convert_confirm({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/flashconvertconfirm.get', params, config)
    },
    async user_flash_convert_({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/flashconvertrecodes.get', params, config)
    },
    // 注册登录
    async user_user_signup({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/user.signup', params, config)
    },
    async user_reset_phone({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/user.reset.phone', params, config)
    },
    async user_reset_email({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/user.reset.email', params, config)
    },
    async user_user_signin({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/user.signin', params, config)
    },
    async tokenbykey({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/comapi/v1.0/com/tokenbykey.get', params, config)
    },
    async user_user_scanninglogin({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/user.scanninglogin', params, config)
    },

    async user_user_signin_verify({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/user.signin.verify', params, config)
    },

    async com_email_verifycode_send({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/comapi/v1.0/com/email.verifycode.send', params, config)
    },

    async com_sms_verifycode_send({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/comapi/v1.0/com/sms.verifycode.send', params, config)
    },

    // 币币交易
    async quotation_daily_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/transactionapi/v1.0/quotation/daily.get', params, config)
    },

    async quotation_kline_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/transactionapi/v1.0/quotation/kline.get', params, config)
    },

    async quotation_marketing_depth_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/transactionapi/v1.0/quotation/marketing.depth.get', params, config)
    },

    async quotation_trading_details_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/transactionapi/v1.0/quotation/trading.details.get', params, config)
    },
    async quotation_flashkdate_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/transactionapi/v1.0/quotation/flashkdate.get', params, config)
    },

    // 充值密码
    async user_user_reset_pwd_step1({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/user.reset.pwd.step1', params, config)
    },

    async user_user_reset_pwd_step2({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/user.reset.pwd.step2', params, config)
    },

    async user_user_reset_pwd_step3({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/user.reset.pwd.step3', params, config)
    },

    // 绑定谷歌
    async user_ga_create({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/user.ga.create', params, config)
    },

    // 首页24小时行内容区-分页
    async quotation_daily_getall({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/transactionapi/v1.0/quotation/daily.getall.pages', params, config)
    },


    // 用户手机号、邮箱、Google绑定
    async user_user_auth({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.auth", params, config)
    },

    // 获取首页24小时行情的头部
    async quotation_frenchcurrency({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactionapi/v1.0/quotation/frenchcurrency.get", params, config)
    },

    // 获取OTC类型
    async frenchcurrency_get_c2c({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactionapi/v1.0/quotation/frenchcurrency.get.c2c", params, config);
    },

    // 获取法币类型
    async fiatpaymenttype_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/fiatpaymenttype.get", params, config);
    },

    // 获取用户订单
    async trading_order_search({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/transactionapi/v1.0/trading/order.search', params, config)
    },

    async trading_fundingrate({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/transactionapi/v1.0/quotation/fundingrate.get', params, config)

    },


    // 获取用户资产
    async user_assets_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/assets.get.new', params, config)
    },

    // 用户中心资产种类
    async user_assets_uc_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post('/userapi/v1.0/user/assets.uc.get', params, config)
    },

    // 获取用户基本信息
    async user_getuserinfo({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.get", params, config);
    },

    // 修改用户登录密码
    async user_user_password({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.password.modify", params, config);
    },

    // 用户添加提币地址
    async user_user_withdraw_address_add({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.withdraw.address.add", params, config);
    },

    // 获取货币基础信息列表
    async com_currencyinfos_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/comapi/v1.0/com/currencyinfos.get", params, config);
    },

    //获取交易对列表
    async com_symbleinfos_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/comapi/v1.0/com/symbleinfos.get", params, config);
    },

    // 用户提币地址查询
    async user_withdraw_address_search({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.withdraw.address.search", params, config);
    },

    // 用户提币操作
    async user_assets_withdraw({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/assets.withdraw", params, config);
    },
    async user_assets_deposit_withdraw_record_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/assets.depositwithdrawrecord.get", params, config);
    },
    // 汇率
    async quotation_getrateinfo_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactionapi/v1.0/quotation/getrateinfo.get", params, config);
    },

    // 获取当日最大提现额度
    async user_serwithdraw_maxmount_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/assets.withdraw.limt.get", params, config);
    },

    async user_withdraw_address_whitelist({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.withdraw.address.whitelist.set", params, config);
    },

    // 白名单是否开启
    async user_withdraw_address_whitelist_check({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.withdraw.address.whitelist.check", params, config);
    },

    // 用户删除提币地址
    async user_withdraw_address_delete({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.withdraw.address.delete", params, config);
    },

    // 校验谷歌验证码
    async user_google_verfiycode_check({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.google.verfiycode.check", params, config);
    },

    // 校验手机验证码
    async user_sms_verfiycode_check({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/comapi/v1.0/com/sms.verifycode.check", params, config);
    },

    // 校验邮箱验证码
    async user_email_verfiycode_check({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/comapi/v1.0/com/email.verifycode.check", params, config);
    },

    // 检验用户密码
    async user_user_pwd_check({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.pwd.check", params, config);
    },

    // 设置用户资金密码
    async user_user_paypassword_set({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.paypassword.set", params, config);
    },

    // 委托下单
    async trading_order_create({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactionapi/v1.0/trading/order.create", params, config);
    },

    // 取消订单
    async trading_order_cancel({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactionapi/v1.0/trading/order.cancel", params, config);
    },

    // 用户身份认证
    async user_user_idauth({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.idauth", params, config);
    },
    async user_user_addressauth({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.addressauth", params, config);
    },
    async user_user_idauth_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.idauth.get", params, config);
    },

    // 查询用户日志
    async user_logs_search({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.logs.search", params, config);
    },

    // 获取用户API列表
    async user_api_getlist({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.api.getlist", params, config);
    },

    // 获取充提币记录
    async user_assets_exchange_record({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/assets.exchange.record.get", params, config);
    },

    // 身份证识别
    async com_ocr_idcard({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/comapi/v1.0/com/ocr.idcard", params, config);
    },

    // 新增用户API
    async user_user_api_add({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.api.add", params, config);
    },

    // 查看用户API密钥
    async user_user_api_secretkey_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.api.secretkey.get", params, config);
    },

    // 删除用户API
    async user_user_api_delete({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.api.delete", params, config);
    },

    // 编辑用户API (IP地址白名单)
    async user_user_address_edit({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.api.address.edit", params, config);
    },

    // 图片上传
    async com_image_upload({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/comapi/v1.0/com/image.upload", params, config);
    },

    // 添加自选交易对
    async user_self_selection_add({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.self.selection.add", params, config);
    },
    // 获取文章详细
    async com_article_channel_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/comapi/v1.0/com/article.channels", params, config);
    },

    // 获取文章列表
    async com_article_search({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/comapi/v1.0/com/article.search", params, config);
    },

    // 获取文章详细
    async com_article_info_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/comapi/v1.0/com/article.info.get", params, config);
    },
    async com_comment_create({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/comapi/v1.0/com/comment.create", params, config);
    },

    // 删除自选交易对
    async user_self_selection_delete({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.self.selection.delete", params, config);
    },

    // 获取交易对列表
    async com_currency_transaction_symbols({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/comapi/v1.0/com/currency.transaction.symbols", params, config);
    },

    // 检查用户注册时邮箱和手机是否存在
    async user_user_exist({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.exist", params, config);
    },
    // 检查用户注册时邮箱和手机是否存在
    async user_user_google_verfiycode_check({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.google.verfiycode.check", params, config);
    },

    // 获取用户自选交易对列表
    async user_self_selection_getlist({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.self.selection.getlist", params, config);
    },

    async user_assets_withdraw_revoke({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/assets.withdraw.revoke", params, config);
    },

    // 获取用户收款/支付方式列表
    async user_user_payments_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.payments.get", params, config);
    },

    // 设置用户收款/支付方式
    async user_user_payments_set({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.payments.set", params, config);
    },
    async user_user_payments_delete({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.payments.delete", params, config);
    },

    // 保存用户昵称
    async user_user_nickname_save({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.nickname.save", params, config);
    },

    // 用户挂单
    async trading_c2c_evaluates_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/evaluates.get", params, config);
    },
    async trading_c2c_goods_add({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/c2c.goods.add", params, config);
    },
    async trading_c2c_goods_close({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/c2c.goods.colse", params, config);
    },
    // 挂单列表
    async trading_c2c_market_pagedlist({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/c2c.market.pagedlist", params, config);
    },

    // 用户下单
    async trading_c2c_order_add({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/c2c.order.add", params, config);
    },

    // 订单列表
    async trading_c2c_order_pagedlist({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/c2c.order.pagedlist", params, config);
    },

    // 用户提币地址合法性检查
    async user_user_withdraw_address_check({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.withdraw.address.check", params, config);
    },

    // 用户提币地址是否为本交易所地址
    async user_user_withdraw_address_check_isin({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.withdraw.address.check.isin", params, config);
    },

    // 确认收款并发货
    async trading_c2c_order_receivables({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/c2c.order.receivables", params, config);
    },

    // 确认支付
    async trading_c2c_order_comfirmpay({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/c2c.order.comfirmpay", params, config);
    },

    // 评价
    async trading_c2c_order_evaluate({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/c2c.order.evaluate", params, config);
    },
    async trading_c2c_block_user_update({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/blockuser.update", params, config);
    },
    async trading_c2c_block_user_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/blockuser.get", params, config);
    },
    // 用户订单申诉
    async trading_c2c_order_appeal({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/c2c.order.appeal", params, config);
    },
    async trading_c2c_order_cancel_appeal({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/c2c.order.canelappeal", params, config);
    },

    async trading_statistics_p2p({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/statisticsp2p.get", params, config);
    },

    // 用户取消订单
    async trading_c2c_order_cancel({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/c2c.order.cancel", params, config);
    },

    // 用户挂单下架
    async trading_c2c_goods_offline({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/c2c.goods.offline", params, config);
    },
    async trading_c2c_goods_online({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/c2c.goods.online", params, config);
    },
    async trading_user_c2c_userc2cassets_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/userc2cassets.get", params, config);
    },
    async trading_c2c_all_payment_method_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/allpaymethod.get", params, config);
    },
    async trading_c2c_payment_method_info({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/paymethodinfo.get", params, config);
    },
    async trading_total_assets_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactionapi/v1.0/trading/assetstotal.get", params, config);
    },

    async trading_c2c_getimmessage({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/c2c.im.pagedlist", params, config);
    },

    // 获取小数位数列表
    async com_precision_getlist({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/comapi/v1.0/com/precision.getlist", params, config);

    },

    // 保存IM消息
    async p2p_saveimmessage({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/c2c.im.saveimmessage", params, config);
    },

    // 获取用户邀请记录
    async user_invitationrecord_pagedlist({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/integral.user.invitationrecord.pagedlist", params, config);
    },

    // 按币种汇总
    async user_getuserawardrecord_pagedlist({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/integral.user.getuserawardrecord.pagedlist", params, config);
    },

    // 收益记录明细
    async user_getuserawardrecord_detail_pagedlist({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/integral.user.getuserawardrecord.detail.pagedlist", params, config);
    },

    // 开启/关闭某个提币地址白名单
    async user_withdraw_address_whitelist_edit({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.withdraw.address.whitelist.edit", params, config);
    },

    // 理财banner
    async finance_product_search({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/finance/product.search", params, config);
    },

    // 理财列表
    async finance_areas_getlist({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/finance/product.getlist", params, config);
    },

    // 获取理财产品
    async finance_product_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/finance/product.get", params, config);
    },

    // 购买理财产品
    async finance_user_product_purchase({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/finance/user.product.purchase", params, config);
    },

    // 获取用户理财交易列表
    async finance_user_order_getlist({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/finance/user.order.getlist", params, config);
    },
    async finance_user_order_cancel({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/finance/user.order.cancel", params, config);
    },

    async userborrowmoney_user_mortgageassets_infos({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/userborrowmoney/user.mortgageassets.new.infos", params, config);
    },

    async userborrowmoney_user_borrow_infos({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/userborrowmoney/user.borrow.infos", params, config);
    },

    // 资金流水
    async user_assets_record_getlist({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/assets.record.getlist", params, config);
    },

    // 某类型资金流水统计
    async user_assets_record_type_total_getlist({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/assets.recordtypetotal.getlist", params, config);
    },

    async userborrowmoney_user_borrow_assetsrecord({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/userborrowmoney/user.borrow.assetsrecord", params, config);
    },

    ///各个账户资金转账
    async userborrowmoney_user_transfer_inorout({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/userborrowmoney/user.transfer.account", params, config);
    },

    // 获取杠杆所有交易对信息
    async userborrowmoney_borrow_symbols({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/userborrowmoney/borrow.symbols", params, config);
    },

    async userborrowmoney_user_borrow_back({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/userborrowmoney/user.borrow.back", params, config);
    },

    async userborrowmoney_user_borrow_add({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/userborrowmoney/user.borrow.add", params, config);
    },

    // 获取指数价格
    async usercontract_contract_getindexprice({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/usercontract/contract.getindexprice", params, config);
    },

    // 委托下单
    async usercontract_order_create({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactioncontract/v1.0/trading/order.create", params, config);
    },

    // 取消订单
    async usercontract_order_cancel({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactioncontract/v1.0/trading/order.cancel", params, config);
    },

    // 获取订单列表
    async usercontract_order_search({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactioncontract/v1.0/trading/order.search", params, config);
    },

    // 合约账户详细
    async usercontract_user_contractassets_infos({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/usercontract/user.contractassets.new.infos", params, config);
    },
    async get_contractorder_multiple({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactioncontract/v1.0/trading/getorder.multiple", params, config);
    },
    // 用户UPI卡片申请
    async user_upi_card_application({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/user.upicard.apply", params, config);
    },
    //获取各平台指数价
    async get_plantindexprice_info({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactioncontract/v1.0/trading/contract.plantindexprice", params, config);
    },
    //结算记录
    async get_settledrecodes_infos({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactioncontract/v1.0/trading/contract.settledrecodes.getpagelist", params, config);
    },
    //获取资金费率收取历史
    async get_getfundratehistory_infos({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactioncontract/v1.0/trading/contract.getfundratehistory.getpagelist", params, config);
    },
    //获取资金费率生成记录
    async get_getfundrates_infos({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactioncontract/v1.0/trading/contract.getfundrates", params, config);

    },

    // 获取历史持仓
    async get_histrocialPosition_info({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactioncontract/v1.0/trading/historicalposition.get", params, config);

    },

    //Financial_page_API
    async get_financial_products({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/finance/product.getlist", params, config);
    },
    //Financial_page_assets_API
    async get_user_finance_assets({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/finance/finaceasset.get", params, config);
    },
    async get_user_deposit_and_withdrawl_configuration({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/depositandwithdrawalconfiguration.get", params, config);
    },
    async get_user_deposit_address({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/depositaddress.get", params, config);
    },
    async get_transfer_users({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/usercommon/transferusers.get", params, config);
    },
    async get_transfer_records_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/usercommon/gettransferrecodes.get", params, config);
    },
    async transfer_user({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/usercommon/transfer.create", params, config);
    },
    async verify_user_info({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/usercommon/verifyuserinfo.get", params, config);
    },
    async user_msg_notice_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/usercommon/usermsgnotice.get", params, config);
    },
    async com_test({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/comapi/v1.0/com/test.net", params, config);
    },
    async get_wefareinfos_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/usercommon/welfareinfos.get", params, config);
    },
    async get_wefareassets_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/usercommon/welfareassets.get", params, config);
    },
    async recieve_wefare_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/usercommon/receivewelfare.get", params, config);
    },
    async get_wefarerecords_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/usercommon/welfarerecodes.get", params, config);
    },
    async get_welfare_assets_records_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/usercommon/welfareassetsrecord.get", params, config);
    },
    async get_my_vip_info_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/user/myvipinfo.get", params, config);
    },
    async work_order_update({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/usercommon/workorder.update", params, config);
    },
    async get_work_order_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/usercommon/workorder.get", params, config);
    },
    async work_order_delete({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/userapi/v1.0/usercommon/workorder.delete", params, config);
    },
    async express_p2p_quick_purchase({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/c2capi/v1.0/trading/quick.purchase", params, config);
    },
    //Strategy Bot Apis
    async querytopstrategy_get({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactionapi/v1.0/strategy/querytopstrategy.get", params, config);
    },
    async strategysget({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactionapi/v1.0/strategy/strategys.get", params, config);
    },
    async strategyupdatestate({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactionapi/v1.0/strategy/strategy.update.sate", params, config);
    },
    async strategydelete({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactionapi/v1.0/strategy/strategy.delete", params, config);
    },
    async strategydetailbyidget({ commit }, params, config) {
        const { $axios } = useNuxtApp();
        return await $axios.post("/transactionapi/v1.0/strategy/strategydetailbyid.get", params, config);
    },
    //set visitor email input action
    setUserInput({ commit }, value) {
        commit('setUserInput', value);
    },

};