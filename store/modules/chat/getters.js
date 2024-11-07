
export default {

  getAmplifyAuthUser(state) {
    return state.amplifyAuthUser
  },
  getCurrentChat(state) {
    return state.currentChat
  },
  getCurrentGroup(state) {
    return state.currentGroup
  },
  getAuthChats(state) {
    // Step 9: Sort the chats by updatedAt (descending order)
    const chats = state.authChats || []
    const sortedAuthChatsWithUser = chats.sort((a, b) => {
      const dateA = new Date(a.updatedAt);
      const dateB = new Date(b.updatedAt);
      return dateB - dateA; // Sort by descending updatedAt
    })

    return sortedAuthChatsWithUser
  },
  getChatMessages(state) {
    return state.chatMessages
  },
  getSupportTicekts(state) {
    return state.supportTicekts
  },
  getNotification(state) {
    return state.currentNotification
  },

  getCurrentTiket(state, obj) {
    return state.currentTicekt || {}
  },
  getChatWidgetState(state) {
    return state.showWidget
  },
  getDataSyncing(state) {
    return state.dataSyncing
  }
}
