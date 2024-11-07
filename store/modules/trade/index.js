 
import actions from './actions'
import getters from './getters'
import state from './state'
import mutations from './mutations'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
  // plugins: process.client
  // ? [
  //     createPersistedState({
  //       key: 'symbolInfosymbolInfosymbolInfosymbolInfo', // Use a unique key for this module
  //       paths: ['tempData'], // Specify which parts of the state to persist
  //       storage: {
  //         getItem: key => {
  //           console.log('Getting item from storage:', key);
  //           return localStorage.getItem(key);
  //         },
  //         setItem: (key, value) => {
  //           console.log('Setting item in storage:', key, value);
  //           localStorage.setItem(key, value);
  //         },
  //         removeItem: key => {
  //           console.log('Removing item from storage:', key);
  //           localStorage.removeItem(key);
  //         },
  //       },
  //     }),
  //   ]
  // : [],


}
