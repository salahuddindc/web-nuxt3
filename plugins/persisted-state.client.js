// import Cookies from 'js-cookie';
// import createPersistedState from 'vuex-persistedstate';

// Function to check if the expiration time has passed
function hasExpired(expirationTime) {
    return Date.now() > expirationTime;
}

export default defineNuxtPlugin(({ $store }) => {
    // const store = $store;

    // createPersistedState({
    //     key: 'auth-symbol-persistedstate',
    //     paths: [
    //         // 'currencyinfos',
    //         // 'symbleinfos',
    //         // 'hex_server_user_info',
    //         // 'hex_server_user_assets',
    //         // 'hex_server_user_settings',
    //         // // 'hex_uid',
    //         // // 'hex_key',
    //         // 'constants.adjustmentCoefficients',
    //         // 'copy-trade.selectedTrader',
    //     ],
    //     // Triggered when the state is loaded from storage
    //     getState: (key) => {
    //         const tokenObject = Cookies.get('HEX_TOKEN');
    //         const persistedState = localStorage.getItem(key);



    //         if (tokenObject) {
    //             const { token, expire } = JSON.parse(tokenObject);
    //             const stateValues = JSON.parse(persistedState);
    //             // Check if the expiration time has passed
    //             if (expire && hasExpired(expire)) {
    //                 // Reset the persisted state if expired
    //                 store.commit('remove_user_info');
    //                 localStorage.removeItem(key);
    //                 return {}; // Return an empty state
    //             }
    //             // Add a check to confirm state structure
    //             if (typeof stateValues === 'object' && stateValues !== null) {
    //                 return stateValues;
    //             } else {
    //                 console.warn('Invalid state format:', stateValues);
    //                 return {};
    //             }

    //             return stateValues; // Return the state without expirationTime
    //         }
    //         return {}; // Return an empty state if nothing found
    //     },
    // })(store);

    // // Listen to `storage` events to handle multi-tab synchronization
    // if (import.meta.client) {
    //     window.addEventListener('storage', (event) => {
    //         if (event.key === 'onLoggedOut') {
    //             // Trigger when logout occurs in other tabs
    //             store.commit('remove_user_info');
    //             setTimeout(() => {
    //                 window.location.reload();
    //             }, 500);
    //         }

    //         if (event.key === 'onLoggedIn') {
    //             // Trigger when login occurs in other tabs
    //             const userData = event.newValue
    //                 ? JSON.parse(event.newValue)
    //                 : { token: null, expire: null, response: {} };
    //             store.commit('set_user_info', userData.response);
    //             store.commit('set_token', {
    //                 token: userData.token,
    //                 expire: userData.expire,
    //             });
    //             setTimeout(() => {
    //                 window.location.reload();
    //             }, 500);
    //         }
    //     });
    // }
});
