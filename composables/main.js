
import { computed } from 'vue';
import { useNuxtApp } from '#app';
import moment from 'moment';
import 'moment-timezone';

// Access Nuxt app instance once

const $baseUrl = 'https://test_api.bitnasdaq.io';


const $userassets = computed(() => {
    const { $store } = useNuxtApp()

    const assets = $store.state.hex_server_user_assets.value;
    const token = $store.state.hex_token.value;
    if (!assets || !token) {
        return {}
    }
    if (typeof info === 'string') {
        return Crypto.decrypt(assets, token);
    } else {
        return assets
    }
})

const $usersettings = computed(() => {
    const { $store } = useNuxtApp()
    const settings = $store.state.hex_server_user_settings.value
    const token = $store.state.hex_token.value
    if (!settings || !token) {
        return {}
    }
    if (typeof info === 'string') {
        return Crypto.decrypt(settings, token)
    } else {
        return settings
    }
})

const $userinfo = computed(() => {
    const { $store } = useNuxtApp()
    const user = $store.getters['auth/userInfo']
    if (!user.uid) {
        return {}
    }

    const token = $store.state.hex_token.value;
    if (!user || !token) {
        return {}
    }


    if (typeof user === 'string') {
        return Crypto.decrypt(user, token);
    } else {
        return Object.keys(user).length > 0 ? user : {}
    }
})

const loggedIn = computed(() => {
    return $userinfo.value.uid != undefined
})


const getCurrency = (key, value) => {
    const { $store } = useNuxtApp();
    const currency = $store.state.currencyinfos.find((c) => c[key] == value);
    return currency || {};
};

const getSymbol = (key, value, iType = 0) => {
    const { $store } = useNuxtApp();
    const symbol = $store.state.symbleinfos.find((c) => c[key] == value && c.itype == iType);
    return symbol || {};
};


const getSymbolInfos = async () => {//获取交易对
    const { $store, $storage } = useNuxtApp();

    let symbolInfos = $storage.get("symbolInfos") || [];
    if (symbolInfos.length == 0) {
        $store.dispatch('com_symbleinfos_get', {}).then(res => {
            console.log('symbolinfossymbolinfos:res', res);
            symbolInfos = res.data
            $store.commit('set_symbleinfos', symbolInfos);
            $storage.set("symbolInfos", symbolInfos, 200 * 3600000);
        })
        return symbolInfos
    }
    $store.commit('set_symbleinfos', symbolInfos);
    return symbolInfos
}



//convert key of object to lowercase
const convertObjectKeysToLower = (obj) => {
    var result = {}
    for (var key in obj) {
        result[key.toLowerCase()] = obj[key]
    }
    return result
}

const global_get_fee_contract = (coin) => {
    const { $np } = useNuxtApp()
    return $np.times(coin.transactionamount, coin.fee)
}

const global_get_fee = (coin) => {
    const { $np } = useNuxtApp()
    if (coin.direction == 1) {
        if (coin.ordertype == 2 || coin.ordertype == 6) {
            return $np.times($np.divide(coin.transactionamount, coin.tradeavgprice), coin.fee)
        }
        return $np.times(coin.transactionamount, coin.fee)
    } else {
        return $np.times(coin.tradeavgprice, coin.transactionamount, coin.fee)
    }
}

const cutZero = (old) => {
    old = old + "";
    //拷贝一份 返回去掉零的新串
    var newstr = old;
    //循环变量 小数部分长度
    var leng = old.length - old.indexOf(".") - 1
    //判断是否有效数
    if (old.indexOf(".") > -1) {
        //循环小数部分
        for (var i = leng; i > 0; i--) {
            //如果newstr末尾有0
            if (newstr.lastIndexOf("0") > -1 && newstr.substr(newstr.length - 1, 1) == 0) {
                var k = newstr.lastIndexOf("0");
                //如果小数点后只有一个0 去掉小数点
                if (newstr.charAt(k - 1) == ".") {
                    return newstr.substring(0, k - 1);
                } else {
                    //否则 去掉一个0
                    newstr = newstr.substring(0, k);
                }
            } else {
                //如果末尾没有0
                return newstr;
            }
        }
    }
    return old;
}
/*获取涨跌幅*/
const global_get_limitprice = (item) => {
    let limit_price = Number(Math.abs(((item.c - item.o) / item.o) * 100)).toFixed(2);
    return isNaN(limit_price) ? 0 : limit_price;
}
const global_init_meiqia = (val) => {
    const meiqia = document.querySelector('body');
    if (!val) {
        meiqia.classList.add('hidemeiqia')
    } else {
        meiqia.classList.remove('hidemeiqia')
    }
}
const global_get_replace_dot = (val) => {
    if (!val) {
        return 0
    }
    return val.toString().replace(/\.$/, '')
}
const global_get_uid = (val) => {
    if (val) {
        return val.slice(-8)
    }
    return ''
}
const global_get_random_color = (val) => {
    const colorary = ['#E35744', '#5D8CC2', '#B09472', '#8F5AAD', '#B2A040', '#A16C92', '#7692AB', '#7CACC5', '#BF82AD', '#83639C', '#E35744', '#5D8CC2', '#B09472', '#8F5AAD', '#B2A040', '#A16C92', '#7692AB', '#7CACC5', '#BF82AD', '#83639C', '#E35744', '#5D8CC2', '#B09472', '#8F5AAD', '#B2A040', '#A16C92', '#7692AB', '#7CACC5', '#BF82AD', '#83639C']
    return colorary[Number(val)]
}
const global_get_count_decimals = (value) => {
    if (!value) {
        return 0
    }
    if (Math.floor(value) === Number(value)) return 0;
    return value.toString().split(".")[1].length || 0;
}
const global_num_split = (val) => {
    const a = val.toString().split('.');
    if (a.length > 1) {
        if (a[1].length > 8) {
            a[1] = a[1].substring(0, 8);
            return global_get_langnum(a.join('.'))
        }
    }
    return global_get_langnum(val)
}
const cut_string = (str, end = 40, start = 0, dots = '...') => {
    let text = str
    if (str.length > end) {
        text = str.slice(start, end) + dots
    }
    return text
}
const global_get_langnum = (val) => {
    val = Number(val);
    if (!val) {
        return 0
    }
    return val
}
const global_get_uppercase = (val) => {
    if (val) {
        return val.toUpperCase()
    } else {
        return '--'
    }
}
const global_string_split = (val) => {
    if (!val) {
        return '';
    }
    if (val.split('@').length == 1) {
        return val.substr(0, 3) + '****' + val.slice(val.length - 4)
    } else {
        let reg = /(.{3}).+(@.+)/g;
        return val.replace(reg, "$1***$2");
    }
}


const global_refresh_user_info = async () => {
    const { $store } = useNuxtApp()
    return await $store.dispatch("user_getuserinfo").then((res) => {
        if (res.data) {
            const _user = res.data ? res.data : res.hexdata;
            console.log('userrrr', _user)

            $store.commit('set_user_info', res);
            $store.commit('set_token', {
                'token': _user.token,
                'expire': new Date().getTime() + 2 * 3600000
            });
            return _user;
        }
    })
}

/*更新用户资产*/

const global_refresh_user_assets = async () => {
    const { $store } = useNuxtApp()
    return await $store.dispatch('trading_total_assets_get')
        .then((res) => {
            const _assets = res.data ? res.data : res.hexdata;
            if (_assets) {
                $store.commit('set_server_user_assets_uc', _assets);
                return _assets;
            }
        })
}
const global_refresh_user_settings = () => {
    const { $store } = useNuxtApp()
    return $store.dispatch('user_user_settings_get',)
        .then((res) => {
            console.log('resssssssssss', res)

            const _settings = res.data ? res.data : res.hexdata;
            if (_settings) {
                $store.commit('set_server_user_settings', _settings);
                return _settings;
            }
        })
}
const global_refresh_user_inprocessorders_count = () => {
    if ($userinfo.uid) {
        const { $store } = useNuxtApp()
        return $store.dispatch('trading_c2c_order_pagedlist', {
            pagesize: 1,
            pageindex: 1,
            orderstatus: [0, 4, 6]
        })
            .then((res) => {
                const _count = res.data ? res.data : res.hexdata;
                if (_count) {
                    $store.commit('set_inprocessorders', _count.totalitemcount);
                    return _count.totalitemcount;
                }
                else {
                    $store.commit('set_inprocessorders', 0);
                    return 0;
                }
            })
    } else {
        return 0;
    }
}

const fiatpaymenttypeget = () => {
    var fiattypes = [];
    const { $storage, $store } = useNuxtApp()
    var legaltypes = $storage.get("legaltypes")
    if (legaltypes) {
        $store.commit('set_legaltypes', legaltypes);
        legaltypes.forEach(element => {
            fiattypes.push({
                name: element.name,
                mark: element.symbol_native,
                icon: element.icon
            });
        });
        $store.commit('set_client_exchange_infos', fiattypes);
        return legaltypes;
    } else {
        $store.dispatch('fiatpaymenttype_get', {}).then(result => {
            $store.commit('set_legaltypes', result.data);
            $storage.set("legaltypes", result.data, 4 * 3600000);//12小时过期  1 * 3600000
            result.data.forEach(element => {
                fiattypes.push({
                    name: element.name,
                    mark: element.symbol_native,
                    icon: element.icon
                });
            });
            $store.commit('set_client_exchange_infos', fiattypes);
            return result.data

        });

    }
}
const getTokenAndUserInfo = async () => {
    const tokeninfo = {
        'token': '',
        'expire': new Date().getTime() - 10000000
    }
    const { $store } = useNuxtApp()
    var token_result = await $store.dispatch('gettoken', {});
    tokeninfo.token = token_result.data;
    tokeninfo.expire = new Date().getTime() + 2 * 3600000
    $store.commit('set_token', tokeninfo);
    if ($store.state.hex_uid.value) {
        // 用户信息
        const user_data = await $store.dispatch('user_getuserinfo');
        if (user_data.data) {
            $store.commit('set_server_user_info', user_data.data);
        }
    }
}
const getcurrencyinfos = async () => {//获取币种信息
    const { $store, $storage } = useNuxtApp()
    var currencyinfos = $store.getters["getCurrencyinfos"]
    let currencyInfos = $storage.get("currencyInfos") || []
    if (currencyInfos.length == 0) {
        $store.commit('set_currencyinfos', currencyinfos);
        $store.dispatch('com_currencyinfos_get', {}).then(res => {
            currencyinfos = res.data
            $store.commit('set_currencyinfos', currencyinfos)
            $storage.set("currencyInfos", currencyinfos, 200 * 3600000)
        })
        return currencyinfos
    }
    $store.commit('set_currencyinfos', currencyInfos)
    return currencyinfos
}

// 将本地交易对数据数据设置到store
const setSymbolInfosFromLocal = () => {//获取交易对
    const { $store } = useNuxtApp()
    var symbolinfos = $store.state.symbleinfos
    // if (symbolinfos) {
    //   this.$store.commit('set_symbleinfos', symbolinfos)
    // } else {
    this.getSymbolInfos()
    // }
}
// 将本地币种数据设置到store
const setCurrencyinfosFromLocal = () => {//获取交易对
    const { $store } = useNuxtApp()
    var currencyinfos = $store.getters["getCurrencyinfos"]
    if (currencyinfos) {
        $store.commit('set_currencyinfos', currencyinfos)
    } else {
        this.getcurrencyinfos()
    }
}
// 获取现货账户 0 获取所有币种的信息， 1获取传入data的币种信息
const getAssetsInfos = (data, type) => {//获取币种信息
    const { $store } = useNuxtApp()
    var currencyinfos = $store.getters["getCurrencyinfos"]

    let dataList = []
    let data1 = []
    let data2 = []
    currencyinfos.forEach(currency => {
        let flag = false
        let dataItem = {
            id: currency.id,
            canuseamount: '',
            bbfrozen: '',
            financingamount: '',
            totalamount: '',
            precision: currency.precision,
            currency: {
                id: '',
                iscandeposit: '',
                iscanwithdraw: '',
                currencyname: '',
                icon: '',
                isfinancing: ''
            }
        }
        dataItem.currency.id = currency.id
        dataItem.currency.currencyname = currency.currencyname
        dataItem.currency.icon = currency.icon
        dataItem.currency.isfinancing = currency.isfinancing
        dataItem.currency.iscandeposit = currency.iscandeposit
        dataItem.currency.iscanwithdraw = currency.iscanwithdraw
        data.forEach(item => {
            if (currency.id == item.currencyid) {
                dataItem.canuseamount = item.canuseamount
                dataItem.bbfrozen = item.bbfrozen
                dataItem.financingamount = item.financingamount
                dataItem.totalamount = item.totalamount
                dataItem.precision = item.precision ? item.precision : currency.precision
                flag = true
                data1.push(dataItem)
            }
        })
        if (!flag && type == 0) {
            dataItem.canuseamount = 0
            dataItem.bbfrozen = 0
            dataItem.financingamount = 0
            dataItem.totalamount = 0
            data2.push(dataItem)
        }
    })
    dataList = type == 1 ? data1 : data1.concat(data2)
    return dataList
}
// 获取杠杆账户  0 获取所有币种杠杆的信息， 1获取传入data的币种杠杆信息
const getMortgageassetsInfos = (data, type) => {//获取币种信息
    const { $store } = useNuxtApp()
    var symbolinfos = JSON.parse(JSON.stringify($store.state.symbleinfos));
    let mortgageassetsInfos = symbolinfos.filter(function (item) {
        return item.itype == 0 && item.borrowmultiple > 1
    })
    let dataList = []
    let data1 = []
    let data2 = []
    mortgageassetsInfos.forEach(symbleinfo => {
        let flag = false
        let dataItem = symbleinfo
        dataItem.tid = symbleinfo.tcurrencyid
        dataItem.ctid = symbleinfo.id
        data.forEach(item => {
            if (symbleinfo.id == item.ctid) {
                dataItem.borrowmultiple = item.borrowmultiple
                dataItem.explosionprice = item.explosionprice
                dataItem.famount = item.famount
                dataItem.fborrowamount = item.fborrowamount
                dataItem.fcanborrowamount = item.fcanborrowamount
                dataItem.fcanuseamount = item.fcanuseamount
                dataItem.ffrozenamount = item.ffrozenamount
                dataItem.fid = item.fid
                dataItem.istatus = item.istatus
                dataItem.phone = item.phone
                dataItem.realname = item.realname
                dataItem.riskrate = item.riskrate


                dataItem.symblename = item.symblename
                dataItem.tamount = item.tamount
                dataItem.tborrowamount = item.tborrowamount
                dataItem.tcanborrowamount = item.tcanborrowamount
                dataItem.tcanuseamount = item.tcanuseamount
                dataItem.tfrozenamount = item.tfrozenamount
                dataItem.totalamount = item.totalamount
                dataItem.updatetime = item.updatetime
                dataItem.userid = item.userid
                dataItem.withdraw_amount = item.withdraw_amount
                dataItem.withdraw_amount_usdt = item.withdraw_amount_usdt

                flag = true
                data1.push(dataItem)
            }
        })
        if (!flag && type == 0) {
            dataItem.explosionprice = 0
            dataItem.famount = 0
            dataItem.fborrowamount = 0
            dataItem.fcanborrowamount = 0
            dataItem.fcanuseamount = 0
            dataItem.ffrozenamount = 0
            dataItem.fid = dataItem.fcurrencyid
            dataItem.istatus = 0
            dataItem.phone = ''
            dataItem.realname = ''
            dataItem.riskrate = 0
            dataItem.istatus = 0
            dataItem.borrowmultiple = symbleinfo.borrowmultiple
            dataItem.symblename = symbleinfo.descriptions
            dataItem.tamount = 0
            dataItem.tborrowamount = 0
            dataItem.tcanborrowamount = 0
            dataItem.tcanuseamount = 0
            dataItem.tfrozenamount = 0
            dataItem.totalamount = 0
            dataItem.updatetime = dataItem.createtime
            dataItem.userid = ''
            dataItem.withdraw_amount = 0
            dataItem.withdraw_amount_usdt = 0
            data2.push(dataItem)
        }
    })
    dataList = type == 1 ? data1 : data1.concat(data2)
    return dataList
}
// 获取合约账户  0 获取所有币种合约的信息， 1获取传入data的币种合约信息
const getContractsInfos = (data, type) => {//获取币种信息
    const { $store } = useNuxtApp()
    var symbolinfos = $store.state.symbleinfos
    let mortgageassetsInfo = symbolinfos.filter(function (item) {
        return item.itype == 1
    })
    let dataList = []
    let data1 = []
    let data2 = []
    mortgageassetsInfo.forEach(currency => {
        let flag = false
        let dataItem = currency
        dataItem.ctid = currency.id
        dataItem.symblename = currency.fcurrencyname
        data.forEach(item => {
            if (currency.id == item.ctid) {
                dataItem.accountequity = item.accountequity
                dataItem.adjustmentrate = item.adjustmentrate
                dataItem.amount = item.amount
                dataItem.amount_usdt = item.amount_usdt
                dataItem.canuseamount = item.canuseamount
                dataItem.canuseamount_usdt = item.canuseamount_usdt
                dataItem.displayorder = item.displayorder
                dataItem.experienceamount = item.experienceamount
                dataItem.explosionprice = item.explosionprice
                dataItem.frozenamount = item.frozenamount
                dataItem.frozenamount_usdt = item.frozenamount_usdt
                dataItem.holdpositionsamount = item.holdpositionsamount


                dataItem.holdpositionsavgprice = item.holdpositionsavgprice
                dataItem.id = item.id
                dataItem.listhaveorderinfos = item.listhaveorderinfos
                dataItem.marginrate = item.marginrate
                dataItem.multiple = item.multiple
                dataItem.profitandlossamount = item.profitandlossamount
                dataItem.unrealizedprofitandlossamount = item.unrealizedprofitandlossamount
                dataItem.updatetime = item.updatetime
                dataItem.userid = item.userid
                dataItem.withdraw_amount = item.withdraw_amount
                dataItem.withdraw_amount_usdt = item.withdraw_amount_usdt

                flag = true
                data1.push(dataItem)
            }
        })
        if (!flag && type == 0) {
            dataItem.accountequity = 0
            dataItem.adjustmentrate = 0
            dataItem.amount = 0
            dataItem.amount_usdt = 0
            dataItem.canuseamount = 0
            dataItem.canuseamount_usdt = 0
            dataItem.experienceamount = 0
            dataItem.frozenamount_usdt = 0
            dataItem.holdpositionsamount = 0
            dataItem.holdpositionsavgprice = 0
            dataItem.listhaveorderinfos = []

            dataItem.marginrate = 0
            dataItem.multiple = 0
            dataItem.profitandlossamount = 0
            dataItem.unrealizedprofitandlossamount = 0
            dataItem.updatetime = dataItem.createtime
            dataItem.userid = ''
            dataItem.withdraw_amount = 0
            dataItem.withdraw_amount_usdt = 0
            data2.push(dataItem)
        }
    })
    dataList = type == 1 ? data1 : data1.concat(data2)
    return dataList
}
const getdecimalsinfos = async () => {//获取币种信息
    const { $store, $storage } = useNuxtApp()
    var precision_result = $storage.get("getdecimalsinfos_1")

    if (precision_result) {
        $store.commit('set_decimals_list', precision_result);
        return precision_result;
    } else {
        precision_result = await $store.dispatch('com_precision_getlist', {});
        $store.commit('set_decimals_list', precision_result.data);
        $storage.set("getdecimalsinfos_1", precision_result.data, 2 * 3600000);//12小时过期  1 * 3600000
        return precision_result.data;
    }
}
const getUserIP = () => {//获取交易对
    const { $storage, $store } = useNuxtApp()
    var ip = $storage.get("userIP")
    if (ip) {
        $store.commit('set_ip', ip);
        return ip;
    } else {
        fetch('https://api.ipify.org?format=json').then(x => x.json()).then(({ ip }) => {
            if (ip) {
                $store.commit('set_ip', ip);
                $storage.set("userIP", ip, 4 * 3600000);//12小时过期  1 * 3600000
                return ip
            }
        });
    }
}
const global_get_tofixed = (val, tofix) => {
    const { $np } = useNuxtApp()
    if (isNaN(Number(val)) || Number(val) === 0) {
        val = 0
    } else {
        val = $np.strip(parseFloat(val))
    }
    let fix;
    if (typeof tofix == 'number') {
        if (Number(val) === 0)
            fix = 0;
        else
            fix = tofix
    } else {
        const newval = 1 / parseFloat(val);
        if (newval >= 500) {
            fix = 8
        } else if (newval >= 10) {
            fix = 6
        } else if (newval < 10) {
            fix = 4
        }
    }
    const valary = val.toString().split('.');
    if (valary.length > 1) {
        valary[1] = valary[1].substring(0, fix);
        val = valary.join('.')
    }
    var newval = parseFloat(global_get_langnum(val)).toFixed(fix);
    if (fix == 2) {
        var xsd = newval.toString().split(".");
        if (xsd.length == 1) {
            newval = newval.toString() + ".00";
        }
        if (xsd.length > 1) {
            if (xsd[1].length < 2) {
                newval = newval.toString() + "0";
            }
        }
    }
    return newval;
}
const global_get_tofixed_entrust = (val, tofix) => {
    const { $np } = useNuxtApp()
    if (isNaN(Number(val)) || Number(val) === 0) {
        val = 0
    } else {
        val = $np.strip(parseFloat(val))
    }
    let fix;
    if (typeof tofix == 'number') {
        if (Number(val) === 0)
            fix = 0;
        else
            fix = tofix
    } else {
        const newval = 1 / parseFloat(val);
        if (newval >= 500) {
            fix = 8
        } else if (newval >= 10) {
            fix = 6
        } else if (newval < 10) {
            fix = 4
        }
    }
    const valary = val.toString().split('.');
    if (valary.length > 1) {
        valary[1] = valary[1].substring(0, fix);
        val = valary.join('.')
    }
    return parseFloat(global_get_langnum(val)).toFixed(fix);
}
const global_get_decimal = (name) => {
    const { $store } = useNuxtApp()
    const list = $store.state.decimalsList,
        obj = {
            name: '',
            a: '',
            p: '',
            s: ''
        };
    if (name && list) {
        const a = list.find((item) => {
            return item.name === name?.toLowerCase();
        });

        return a ? {
            name,
            a: a.amountdigits,
            p: a.pricedigits,
            s: a.sumdigits
        } : obj;


    }

    return obj;
}
// get the Value in commas
const global_get_commas = (val) => {
    return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}
const show_no = (no, toFix = 2) => {
    return global_get_commas(global_get_tofixed(no, toFix))
}
const avoid_from_exponent_notation = (number) => {
    // Check if the number is finite
    if (!isFinite(number)) {
        return 0
    }

    // For very small numbers, use a higher precision to avoid scientific notation
    if (Math.abs(number) < 1e-6) {
        return number.toFixed(10).replace(/\.?0+$/, ''); // Remove trailing zeros 
    }
    // For larger numbers, adjust precision based on the number's magnitude
    const decimalPlaces = number < 1 ? 10 : 6; // Adjust as needed
    return parseFloat(number.toFixed(decimalPlaces));
}
//获取本地时间
const global_get_local_time = (time, dateFormat) => {
    let local;
    if (time && time.toString().length <= 10) {
        time = time * 1000;
    }
    if (dateFormat) {
        local = moment(time).format(dateFormat);
    }
    else {
        local = moment.tz(time, 'Etc/GMT').local();
    }
    return local;
}
const global_get_utc_time = (time) => {
    let local;
    local = moment.utc(time, 'YYYY-MM-DD').format();
    return local

}
const seconds_conversion = (seconds, convertToHours = false) => {
    if (convertToHours) {
        const duration = moment.duration(seconds, 'seconds');
        const hours = duration.asHours();
        return hours.toFixed(2);
    }
}



//获取订单类型
const global_get_order_type = (type) => {
    let ot = '';

    switch (type) {
        case 1:
            ot = $t('patch.LimitOrderShort');
            break;
        case 2:
            ot = $t('patch.MarketOrderShort');
            break;
        case 3:
            ot = $t('patch.LossOrder');
            break;
        case 4:
            ot = $t('patch.LimitOrderShort');
            break;
        case 5:
            ot = $t('patch.LossOrder');
            break;
        case 6:
            ot = $t('patch.MarketOrderShort');
            break;
        case 7://7:强制平多,8:强制平空；9，止盈订单；10，止损订单
            ot = $t('system_forced_leveling')
            break;
        case 8:
            ot = $t('system_forced_leveling')
            break;
        case 9:
            ot = $t('stop_profit_order')
            break;
        case 10:
            ot = $t('stop_profit_order')
            break;
        case 11:
            ot = $t('copy_trade')
            break;
        case 12:
            ot = $t('grid_trading')
            break;
        case 13:
            ot = $t('planned_commission')
            break;
    }
    return ot;
}
//获取合约订单类型
const global_get_contract_order_type = (type, trigger) => {
    let ot = '';
    switch (type) {
        case 1:
            ot = $t('contract.openLimit');
            if (trigger > 0) {
                ot = $t('contract.openStop');
            }
            break;
        case 2:
            ot = $t('contract.openMarket');
            break;
        case 3:
            ot = $t('contract.openStop');
            break;
        case 4:
            ot = $t('contract.closeLimit');
            if (trigger > 0) {
                ot = $t('contract.closeStop');
            }
            break;
        case 5:
            ot = $t('contract.closeMarket');
            break;
        case 6:
            ot = $t('contract.closeStop');
            break;
        case 7:
            ot = $t('system_forced_closing')
            break;
        case 8:
            ot = $t('system_forced_closing')
            break;
        case 9:
            ot = $t('stop_profit_order')
            break;
        case 10:
            ot = $t('stop_loss_order')
            break;

        case 11:
            ot = $t('copy_trade')
            break;

        case 12:
            ot = $t('grid_trading')
            break;

        case 13:
            ot = $t('planned_commission')
            break;

    }
    return ot;
}
//获取订单状态
const global_get_order_state = (s) => {
    let order = '';
    switch (s) {
        case 0:
            order = $t('patch.UnDeal');
            break;
        case 1:
            order = $t('patch.PartialDeal');
            break;
        case 2:
            order = $t('patch.cancelled');
            break;
        case 3:
            order = $t('patch.DealSuccess');
            break;
        case 4:
            order = $t('patch.PartialTransaction');
            break;
        case 5:
            order = $t('patch.SystemWithdrawal');
            break;
    }
    return order;
}
//获取充币状态
const global_get_charge_state = (s) => {
    let order = '';
    switch (s) {
        case 0:
            order = $t('patch.Pending');
            break;
        case 1:
            order = $t('patch.DealSuccess');
            break;
        case 2:
            order = $t('patch.DepositFailed');
            break;
    }
    return order;
}
//获取交易方向
const global_get_order_direction = (s) => {
    let order = '';
    switch (s) {
        case 1:
            order = $t('memberCenter.buy');
            break;
        case -1:
            order = $t('memberCenter.sell');
            break;
    }
    return order;
}
//获取合约交易方向
// T type  S 买入卖出
const global_get_contract_order_direction = (t, s) => {
    let order = '';
    if (t >= 4) {
        if (s == 1) {
            order = $t('contract.buyopencontract');
        } else if (s == -1) {
            order = $t('contract.sellopencontract');
        }
    } else if (t <= 3) {
        if (s == 1) {
            order = $t('contract.buycontract');
        } else if (s == -1) {
            order = $t('contract.sellcontract');
        }
    }
    return order;
}
//获取提币状态
const global_get_mention_state = (s) => {
    let order = '';
    switch (s) {
        case 0:
            order = $t('patch.WaitingReview');
            break;
        case 1:
            order = $t('patch.DealSuccess');
            break;
        case 2:
            order = $t('patch.WithdrawFailed');
            break;
        case 3:
            order = $t('patch.Processing');
            break;
        case 4:
            order = $t('patch.Rejected');
            break;
        case 5:
            order = $t('patch.cancelled');
            break;
    }
    return order
}
//获取杠杆借币记录的状态
const getEvent = () => {
    if ($userinfo.uid) {
        var substr = "event." + $userinfo.uid + ".detail"
        this.$socket.uninvoke({
            sub: substr,
            type: "event"
        });

        this.$socket.invoke({
            sub: substr,
            type: "event"
        });

        console.log('getEvent:', substr);
        this.$socket.receive("event", eventcallback);
    }
}
const eventcallback = (data) => {

    const { $store } = useNuxtApp()
    if (data.data.type == 102) {//c2c聊天消息
        var jobj = JSON.parse(data.data.msg);
        if (!(jobj.fromuserid == $userinfo.uid)) {
            if (!(jobj.msgcontent.indexOf("#1#") == -1)) {
                jobj.message = "P2P Notification"
                jobj.systemMessage = true
                $store.commit('set_c2c_message', jobj);
            }
            else {
                jobj.message = "P2P Message"
                jobj.systemMessage = false
                $store.commit('set_c2c_message', jobj)
            }
        }

    } else {//合约撮合消息；杠杆现货撮合消息
        this.$pubsub.publish(this.$pubsub.getOrderList)
        this.$store.commit('set_message', {
            type: 'ok',
            text: data.data.msg
        })
    }
}
const cloneObj = (obj) => {
    var newObj = {};
    if (obj instanceof Array) {
        newObj = [];
    }
    for (var key in obj) {
        var val = obj[key];
        //newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; //arguments.callee 在哪一个函数中运行，它就代表哪个函数, 一般用在匿名函数中。
        newObj[key] = typeof val === 'object' ? cloneObj(val) : val;
    }
    return newObj;
}
const global_get_leverage_state = (s) => {
    let order = '';
    switch (s) {
        case 0:
            order = $t('patch.WaitingReview');
            break;
        case 1:
            order = $t('leverage.alreadyBorrowed');
            break;
        case 2:
            order = $t('leverage.repaid');
            break;
    }
    return order;
}
const formatDate = (date, format = 'Y-MM-D') => {
    return moment(date).format(format)
}
const numFormatter = (num) => {
    // Convert num to a number, handling string input
    num = Number(num);

    if (num >= 1000 && num < 1000000) {
        return (num / 1000).toFixed(2) + ' K '; // Convert to K for numbers > 1000 < 1 million
    } else if (num >= 1000000 && num < 1000000000) {
        return (num / 1000000).toFixed(2) + ' M '; // Convert to M for numbers > 1 million < 1 billion
    } else if (num >= 1000000000) {
        return (num / 1000000000).toFixed(2) + ' B '; // Convert to B for numbers >= 1 billion
    } else {
        return num.toString(); // For numbers < 1000
    }
}

const $t = (key) => { // new function for locales
    const { $i18n } = useNuxtApp()
    return $i18n.t(key)
}


export {
    $baseUrl,
    $userassets,
    $usersettings,
    $userinfo,
    loggedIn,



    getCurrency,
    getSymbol,
    getSymbolInfos,
    convertObjectKeysToLower,
    global_get_fee_contract,
    global_get_fee,
    cutZero,
    global_get_limitprice,
    global_init_meiqia,
    global_get_replace_dot,
    global_get_uid,
    global_get_random_color,
    global_get_count_decimals,
    global_num_split,
    cut_string,
    global_get_langnum,
    global_get_uppercase,
    global_string_split,
    global_refresh_user_info,
    global_refresh_user_assets,
    global_refresh_user_settings,
    global_refresh_user_inprocessorders_count,

    fiatpaymenttypeget,
    getTokenAndUserInfo,
    getcurrencyinfos,
    setSymbolInfosFromLocal,
    setCurrencyinfosFromLocal,
    getAssetsInfos,
    getMortgageassetsInfos,
    getContractsInfos,
    getdecimalsinfos,
    getUserIP,
    global_get_tofixed,
    global_get_tofixed_entrust,
    global_get_decimal,
    global_get_commas,
    show_no,
    avoid_from_exponent_notation,
    global_get_local_time,
    global_get_utc_time,
    seconds_conversion,

    global_get_order_type,
    global_get_contract_order_type,
    global_get_order_state,
    global_get_charge_state,
    global_get_order_direction,
    global_get_contract_order_direction,
    global_get_mention_state,
    getEvent,
    eventcallback,
    cloneObj,
    global_get_leverage_state,
    formatDate,
    numFormatter







};