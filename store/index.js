import { createStore } from 'vuex';
import createState from "./state";
import getters from "./getters";
import * as mutations from "./mutations";
import actions from "./actions";

import basic from './modules/basic'; // Similar setup for product module
const state = createState();
const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
    basic, // Add your other modules here
  },
});

export default store;
