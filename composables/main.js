 
import { computed } from 'vue';
import { useNuxtApp } from '#app';
 
// Access Nuxt app instance once
 

// Access Nuxt app instance

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

const userAssets = computed(() => {
    const { $store } = useNuxtApp(); 
    const assets = $store.state.hex_server_user_assets.value;
    const token = $store.state.hex_token.value;
    if (!assets || !token) {
        return {};
    }
    return typeof assets === 'string' ? Crypto.decrypt(assets, token) : assets;
});


const getSymbolInfos = async () => {//获取交易对
    const { $store } = useNuxtApp(); 
    console.log('storessssss', $store); 
    var symbolinfos = $store.state.symbleinfos;// this.$storage.get("getSymbolinfos")

    if (symbolinfos) {
        $store.commit('set_symbleinfos', symbolinfos);
        $store.dispatch('com_symbleinfos_get', {}).then(res => {
            $store.commit('set_symbleinfos', res.data);
            // this.$storage.set("getSymbolinfos", res.data, 200 * 3600000);
        })
        return symbolinfos;
    } else {
        var result = await $store.dispatch('com_symbleinfos_get', {});
        console.log('getSymbolInfos  symbleinfos', JSON.parse(JSON.stringify(result.data)));
        $store.commit('set_symbleinfos', JSON.parse(JSON.stringify(result.data)));
        // this.$storage.set("getSymbolinfos", JSON.parse(JSON.stringify(result.data)), 200 * 3600000);//12小时过期  1 * 3600000
        return result.data;
    }
}


export {
    getCurrency,
    getSymbol,
    userAssets,
    getSymbolInfos
};