import { createStore } from 'vuex';
import createState from "./state";
import getters from "./getters";
import * as mutations from "./mutations";
import actions from "./actions";

import article from "./modules/article";
import general from "./modules/general";
import auth from "./modules/auth";
import market from "./modules/market";
import strategy from "./modules/strategy";
import playcard from "./modules/playcard";
import constants from "./modules/constants";
import shuftipro from "./modules/shufti-pro";
import trade from "./modules/trade";
import size from "./modules/size";
import copyTrade from "./modules/copy-trade";
import bround from "./modules/bround";
import userFinance from "./modules/user-finance";
// import chat from "./modules/chat";



import basic from './modules/basic'; // Similar setup for product module
const state = createState();
const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
    basic, // Add your other modules here 

    article,
    general,
    auth,
    market,
    strategy,
    playcard,
    constants,
    trade,
    size,
    bround,
    // chat,
    'shufti-pro': shuftipro,
    'copy-trade': copyTrade,
    'user-finance': userFinance
  },
});

export default store;
