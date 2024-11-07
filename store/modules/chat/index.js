import chatActions from './actions'
import ticketSupportActions from './ticket-support'
import getters from './getters'
import state from './state'
import mutations from './mutations'
 
const actions = {
  ...chatActions, // Spread the actions from chatActions
  ...ticketSupportActions // Spread the actions from ticketSupportActions
}
export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}