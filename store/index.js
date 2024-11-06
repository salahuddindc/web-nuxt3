import { createStore } from 'vuex';
import createState from "./state";
import getters from "./getters";
import * as mutations from "./mutations";
import actions from "./actions";
import constants from "./modules/constants";

import basic from './modules/basic'; // Similar setup for product module
const state = createState();
const store = createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {
    basic, // Add your other modules here
    constants,
  },
});

export default store;
