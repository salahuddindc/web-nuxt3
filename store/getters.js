export default {
    getUserInfo(state) {
        return state.userInfo;
    },

    getShowPopover(state) {
        return state.popoverstate.showPopover
    },
    get_exchange_rate: (state) => (fromName, btcNumber) => {
        if (!fromName || !btcNumber) return 0;
        btcNumber = Number(btcNumber);
        if (isNaN(btcNumber)) return 0;
        let rateList;
        try {
            rateList = state.exchangeRate;
        } catch (e) {
            return 0;
        }
        if (rateList.length <= 0) return 0;
        const btcRate = rateList.find((item) => {
            return item.currceyname.toLowerCase() === 'btc';
        });
        if (!btcRate) return 0;
        if (cur_usdt.indexOf(fromName) >= 0) {
            return global_num_split(btc.price * btcNumber);
        }
        const fromNameRate = state.exchangeRate.find((item) => {
            return item.currceyname.toLowerCase() === fromName.toLowerCase();
        });
        if (!fromNameRate) return 0;
        return global_num_split(np.strip(btcRate.price * btcNumber / fromNameRate.price));
    },
    // 其他币种的量转换成BTC的量
    get_btc_exchange_rate: (state) => (name, quota) => {
        if (!name || !quota) return 0;
        name = name && name.toLowerCase();
        quota = Number(quota);
        if (isNaN(quota)) return 0;
        if (name === 'btc') return global_num_split(quota);
        let rateList, rate, btcRate;
        try {
            rateList = state.exchangeRate;
        } catch (e) {
            return 0;
        }
        rate = rateList.find((item) => {
            return item.currceyname.toLowerCase() === name;
        });
        btcRate = rateList.find((item) => {
            return item.currceyname.toLowerCase() === 'btc';
        });
        if (!rate || !btcRate) return 0;
        return global_num_split(np.strip(rate.price * quota / btcRate.price))
    },
    // 获取(货币) 转换 为(产品的数量) ：BTC(toName) toNumber -> ONT(from) number
    // 此方法只需要知道 货币的名称和数量 ，以及 要兑换的产品 对当前货币的价格
    // 比如 要知道 BTC 兑换为 ONT 有多少量
    // 传入1ONT = 0.0004BTC(fromPrice) 这个价格，在传入 BTC 这个货币有多少数量
    // return 数量
    get_to_from_exchange_rate: (state) => (toNumber, fromPrice) => {
        if (!toNumber || !fromPrice) return 0;
        toNumber = Number(toNumber);
        fromPrice = Number(fromPrice);
        if (isNaN(toNumber) || isNaN(fromPrice)) return 0;
        return global_num_split(np.strip(toNumber / fromPrice))
    },
    get_from_to_exchange_rate: (state) => (fromNumber, toPrice) => {
        if (!fromNumber || !toPrice) return 0;
        fromNumber = Number(fromNumber);
        toPrice = Number(toPrice);
        if (isNaN(fromNumber) || isNaN(toPrice)) return 0;
        return global_num_split(np.strip(fromNumber * toPrice));
    },
    // 获取用户客户端指定币种的汇率转换
    get_client_exchange_rate: (state) => (name, quota, toclient) => {
        let cur_usdt = ''
        if (!quota || !name) return '0.00';
        name = name && name.toLowerCase();
        if (name === "yx") name = 'usdt'; // 确定指定币种类型
        quota = Number(quota);
        toclient = toclient && toclient.toLowerCase() || state.hex_client_exchange.active.toLowerCase(); // 确定兑换目标币种
        let rateList, fromRate, toRate, _newValue;
        try {
            rateList = state.exchangeRate;
        } catch (e) {
            return '0.00';
        }
        fromRate = rateList.find((item) => {
            return item.currceyname.toLowerCase() === name;
        });
        toRate = rateList.find((item) => {
            return item.currceyname.toLowerCase() === toclient;
        });
        if (!fromRate || !toRate) return '0.00';
        // 如果是 usd和usdt，直接返回1：1的汇率
        if (cur_usdt.indexOf(toclient) >= 0) {
            _newValue = np.strip(fromRate.price * quota);
        } else {
            _newValue = fromRate.price * toRate.price * quota;
        }
        if (_newValue < 0.01) {
            return global_num_split(_newValue).toFixed(6);
        }

        if (_newValue >= 0.01 && _newValue < 0.1) {
            return global_num_split(_newValue).toFixed(4);
        }
        return global_num_split(_newValue).toFixed(2);
    },

    // 获取指定两个币种的转换汇率
    get_exchange_rate_by_name: (state) => (fromName, toName) => {
        if (!fromName || !toName) return 0;
        if (toName.toLowerCase() === 'yx') toName = 'usdt'; // 确定指定币种类型
        let rateList, fromRate, toRate;
        try {
            rateList = state.exchangeRate;
        } catch (e) {
            return 0;
        }
        fromRate = rateList.find((item) => {
            return item.currceyname.toLowerCase() === fromName.toLowerCase();
        });
        if (!fromRate) return 0;
        if (cur_usdt.indexOf(toName) >= 0) {
            return global_num_split(fromRate.price)
        }
        toRate = rateList.find((item) => {
            return item.currceyname.toLowerCase() === toName.toLowerCase();
        });
        if (!toRate) return '0';
        return global_num_split(fromRate.price * toRate.price);
    },
    get__currency_contract_size: (state) => (name) => {
        if (!name) return 0;
        name = name.toUpperCase();
        let contract_size = 0;
        switch (name) {
            case "BTC":
                contract_size = 100;
                break;
            case "ETC":
                contract_size = 10;
                break;
            case "ETH":
                contract_size = 10;
                break;
            case "EOS":
                contract_size = 10;
                break;
            case "LTC":
                contract_size = 10;
                break;
            case "BCH":
                contract_size = 10;
                break;
            case "XRP":
                contract_size = 10;
                break;
            case "TRX":
                contract_size = 10;
                break;
            case "BSV":
                contract_size = 10;
                break;
            default:
                contract_size = 10;
        }
        return contract_size;
    },
    get_exchange_torate: (state) => (fromName, fromNum, toName) => {
        if (!fromName || !fromNum || !toName) return 0;
        let rateList, fromRate, toRate;
        try {
            rateList = state.exchangeRate;
        } catch (e) {
            return 0;
        }
        fromRate = rateList.find((item) => {
            return item.currceyname.toLowerCase() === fromName.toLowerCase();
        });
        toRate = rateList.find((item) => {
            return item.currceyname.toLowerCase() === toName.toLowerCase();
        });
        if (!fromRate || !toRate) return 0;
        return global_num_split((fromRate.price * fromNum) * toRate.price);
    },

    //获取当前客户端汇率名称
    get_client_exchange_rate_name: (state) => {
        const exchange = state.hex_client_exchange.infos.filter(item => {
            return item.name == state.hex_client_exchange.active;
        });
        if (exchange && exchange.length > 0) {
            return {
                name: exchange[0].name.toUpperCase(),
                mark: exchange[0].mark
            }
        } else {
            return {
                name: 'usd',
                mark: '$'
            }
        }
    },
    // 
    get_contractType: (state) => {
        return 1
    },
    currentLang: (state) => {
        return state.hex_lang.locale
    },
    //get the value of visitor email input
    getUserInput: (state) => state.visitor_user,
    getSymbleinfos: (state, getters, rootState, rootGetters) => {
        return state.symbleinfos || []
    },
    getCurrencyinfos: (state) => state.currencyinfos || [],
    getToken: (state) => {
        return state.hex_token.value
    }
}