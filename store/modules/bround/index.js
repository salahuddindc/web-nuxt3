import actions from './actions'
import getters from './getters'
import state from './state'
import mutations from './mutation'

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
}