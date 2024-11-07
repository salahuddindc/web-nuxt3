export default {

    setAmplifyAuthUser(state, obj) {
        state.amplifyAuthUser = obj
    },
    setCurrentChat(state, obj) {
        state.currentChat = obj
    },
    setCurrentGroup(state, obj) {
        state.currentGroup = obj
    },
    setAuthChats(state, array) {
        state.authChats = array
    },
    updateAuthChats(state, chatObject) {
        // update authChats
        const authChats = state.authChats
        const index = authChats.findIndex((chat) => chat.id == chatObject.id)
        if (index == -1) {
            state.authChats.push(chatObject)
        } else {
            for (const key in chatObject) {
                if (Object.prototype.hasOwnProperty.call(chatObject, key)) {
                    const element = chatObject[key]
                    authChats[index][key] = element
                }
            }
        }
    },
    setChatMessages(state, array) {
        state.chatMessages = array
    },

    updateCurrentChat(state, obj) {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const element = obj[key];
                const currentChat = state.currentChat
                const index = state.authChats.findIndex((chat) => chat.id == currentChat.id)

                if (index != -1) {
                    state.authChats[index][key] = element
                }
            }
        }
    },
    updateCurrentGroup(state, obj) {
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const element = obj[key];
                const currentGroup = state.currentGroup
                const index = state.authChats.findIndex((chat) => chat.id == currentGroup.id)

                if (index != -1) {
                    state.authChats[index][key] = element
                }
            }
        }
    },
    setCurrentTicket(state, obj) {
        state.currentTicekt = obj
    },
    setSupportTicekts(state, array) {
        state.supportTicekts = array
    },
    addSupportTicket(state, ticket) {
        console.log("ticket pushed")
        state.supportTickets.push(ticket);
    },
    updateSupportTicket(state, obj) {
        const ticket = obj
        for (const key in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, key)) {
                const element = obj[key]; 
                const index = state.supportTicekts.findIndex((st) => st.id == ticket.id)

                if (index != -1) {
                    state.supportTicekts[index][key] = element
                }
            }
        }
    },
    setNotification(state, obj) {
        state.currentNotification = obj
    },
    setChatWidgetState(state, bool) {
        state.showWidget = bool
    },
    setDataSyncing(state, bool) {
        state.dataSyncing = bool
    }
}   