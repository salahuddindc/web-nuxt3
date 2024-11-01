import * as Cookie from 'js-cookie';

export function set_token(state, token) {
    state.hex_token.value = token;
    const userPreferencesCookie = useCookie(state.hex_token.type);
    userPreferencesCookie.value = JSON.stringify(token)
}
export function set_server_uid(state, params) {
    state.hex_uid.value = params;
}

export function set_server_user_assets_uc(state, params) {
    state.hex_server_user_assets.value = params;
}
export function set_server_user_settings(state, params) {
    state.hex_server_user_settings.value = params;
}
export function set_server_key(state, params) {
    state.hex_key.value = params;
}

export function set_server_user_info(state, params) {
    state.hex_server_user_info.value = params;
}


export function remove_user_info(state) {
    state.hex_server_user_info.value = '';
    state.hex_server_user_assets.value = '';
    state.hex_server_user_settings.value = '';
    state.hex_uid.value = '';
    state.hex_key.value = '';
    state.hex_token.value = { expire: '', token: '' };
    useCookie('hex_uid').value = null;
    useCookie('hex_key').value = null;
    useCookie('hex_token').value = null;

    // --deperacated-in-nuxt2
    // Cookie.remove(state.hex_uid.type);
    // Cookie.remove(state.hex_key.type);
    // Cookie.remove(state.hex_token.type);
}

export function set_user_info(state, res) {
    const data = res.data ? res.data : res.hexdata;
    state.hex_server_user_info.value = data;
    state.hex_uid.value = data.uid;
    state.hex_key.value = data.secretkey
    useCookie('hex_uid').value = data.uid;
    useCookie('hex_key').value = data.secretkey;

    // --deperacated-in-nuxt2
    // Cookie.set(state.hex_uid.type, data.uid);
    // Cookie.set(state.hex_key.type, data.secretkey)
}

export function set_message(state, params) {
    state.message = Object.assign({}, params);
}

export function set_c2c_message(state, params) {
    state.c2c_message = Object.assign({}, params);
}

export function set_exchange_rate(state, params) {
    state.exchangeRate = [].concat(params);
}

export function set_client_exchange(state, params) {
    state.hex_client_exchange.active = params;
}

export function set_client_exchange_infos(state, params) {
    state.hex_client_exchange.infos = params;
}

export function set_client_background(state, params) {
    state.hex_client_background.active = params === 'day' ? 'day' : 'night';
}

export function set_active_route(state, route) {
    state.route.active = route;
}

export function set_tradeview(state, params) {
    state.tradeview = params === 'pro' ? 'pro' : 'std';
}

export function set_coin_bb(state, params) {
    state.bbTitleList = params;
}

export function set_inprocessorders(state, count) {
    state.inprocessorders = count;
}

export function set_decimals_list(state, params) {
    state.decimalsList = params;
}

export function set_lang(state, lang) {
    state.hex_lang.locale = lang;
}

export function set_dot_type(state, ti) {
    state.dotType = ti;
}

export function set_ip(state, ip) {
    state.ip = ip;
}

export function set_maintain(state, obj) {
    state.maintain = obj;
}

export function set_user_allwithdrawlimtperday(state, obj) {
    state.user_allwithdrawlimtperday = obj;
}

export function set_client_collect(state, id) {
    let collect = JSON.parse(window.localStorage.getItem('HEX_COLLECT'));
    if (!(collect && typeof collect == 'object')) {
        collect = {};
    }

    if (id in collect) {
        collect[id] = !collect[id];
    } else {
        collect[id] = true;
    }
    window.localStorage.setItem('HEX_COLLECT', JSON.stringify(collect))
}
export function set_symbleinfos(state, data) {

    state.symbleinfos = data;
}
export function set_currencyinfos(state, data) {
    state.currencyinfos = data;
}
export function set_legaltypes(state, data) {
    state.legaltypes = data;
}

export function setUserInput(state, value) {
    state.visitor_user.userInput = value;
}
export function setShowPopover(state, value) {
    state.popoverstate.showPopover = value;
}
export function setH1Seo(state, value) {
    state.h1Seo = value;
}
export function setDescriptionSeo(state, value) {
    state.descriptionSeo = value;
}
export function setTitleSeo(state, value) {
    state.titleSeo = value;
}
export function setCurrentRouteSeo(state, value) {
    state.currentRouteSeo = value;
}
export function setSelectedPayment(state, value) {
    state.selectedPayment = value;
}
export function setReferralCode(state, value) {
    state.referralCode = value;
}

