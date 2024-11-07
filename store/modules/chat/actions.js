
import { Hub, DataStore, SortDirection } from "aws-amplify";
import { Chat, GroupMember, GroupRole, Message, SupportTicket, User, UserRole } from "~/src/models";

const url = {
    api: ''
}
let unsubscribeDatastoreListener = null;

export default {

    async fetchOrAddAuthUser({ commit, dispatch }, params) {
        try {
            console.log('fetchOrAddAuthUserfetchOrAddAuthUserfetchOrAddAuthUser', DataStore);

            // Check if DataStore is cleared or not initialized
            // await DataStore.start(); // Ensure DataStore synchronization has started
            // await new Promise(resolve => setTimeout(resolve, 3000)); // remove this. use observer instead of this
            console.log('authUser paramsparamsparams', params, params.user.uid)
            let authUser = await DataStore.query(User, (c) => c.uid.contains(params.user.uid), { sort: (s) => s.createdAt(SortDirection.ASCENDING) })

            console.log('authUser', authUser, authUser.length == 0)
            // return
            if (authUser.length == 0) {
                authUser = await DataStore.save(new User({
                    isOnline: true,
                    uid: params.user.uid,
                    profileImageUrl: params.user.avatar,
                    nickName: params.user.nickname,
                    role: UserRole.USER
                }))
            } else {
                authUser = authUser[0]
                authUser = await DataStore.save(User.copyOf(authUser, updated => {
                    updated.isOnline = true
                    updated.lastSeenAt = null
                }))
                authUser = { ...authUser }
            }
            console.log('authUser', authUser)

            commit('setAmplifyAuthUser', authUser)
            return {
                authUser,
                status: true
            }
        } catch (error) {
            console.log('fetchOrAddAuthUser', error);

            return {
                message: error,
                status: false
            }
        }
    },
    async updateAuth({ commit, dispatch, getters }, params) {
        try {
            const authUser = getters['getAmplifyAuthUser']
            console.log('authUser', authUser);
            let authUserModel = await DataStore.query(User, (c) =>
                c.id.eq(authUser.id)
            )
            console.log('updateAuth', authUserModel);

            authUserModel = authUserModel[0]
            authUserModel = await DataStore.save(User.copyOf(authUserModel, updated => {
                const obj = params
                for (const key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key)) {
                        const element = obj[key];
                        updated[key] = element
                    }
                }
            }))
            console.log('updateAuth', authUserModel);


            return {
                user: { ...authUserModel },
                status: true,
                message: 'Auth updated successfully.'
            }
        } catch (error) {
            console.log('updateAuth error', error);
            return {
                message: error,
                status: false
            }
        }
    },


    async addChatUser({ commit, dispatch, getters }, params) {
        try {
            const authUser = getters['getAmplifyAuthUser']

            let existingUser = await DataStore.query(User, (c) =>
                c.uid.contains(params.uid)
            )
            let chatObj = {}
            let alreadyExist = false


            if (existingUser.length == 0) {
                alreadyExist = false
                params['role'] = UserRole.USER
                existingUser = await DataStore.save(new User(params))  // { isOnline: false, uid: this.user.uid, nickName: this.user.nickname, profileImageUrl: this.user.avatar }

                if (existingUser.uid) {
                    chatObj = await DataStore.save(new Chat({
                        isGroup: false,
                        isPublic: false,
                        senderReceiver: `${authUser.id},${existingUser.id}`
                    }))
                }
            } else {
                alreadyExist = true
                existingUser = existingUser[0] || {}
                const senderReceiver = `${authUser.id},${existingUser.id}`
                chatObj = await DataStore.query(Chat, (c) => c.senderReceiver.contains(senderReceiver))

                if (chatObj.length == 0) {
                    chatObj = await DataStore.save(new Chat({
                        isGroup: false,
                        isPublic: false,
                        senderReceiver: senderReceiver
                    }))
                } else {
                    chatObj = chatObj.length > 0 ? chatObj[0] : {}
                }

                console.log('chatObj', chatObj);
            }

            // Create a clone of chatObj to make it extensible
            const mutableChatObj = { ...chatObj }

            // adding user for futher use in conversation
            mutableChatObj['user'] = { ...existingUser }
            mutableChatObj['createdAt'] = new Date().toISOString()
            mutableChatObj['updatedAt'] = new Date().toISOString()
            console.log('mutableChatObj', mutableChatObj);

            commit('setCurrentChat', mutableChatObj)
            commit('updateAuthChats', mutableChatObj)
            return {
                chatObj: mutableChatObj,
                alreadyExist,
                status: true,
                message: 'User added successfully.'
            }
        } catch (error) {
            return {
                message: error,
                status: false
            }
        }
    },
    async addUserToGroup({ commit, dispatch, getters }, params) {
        try {

            let user = await DataStore.query(User, (c) => c.uid.eq(params.userID))

            if (user.length == 0) {
                const userArg = params.user
                userArg['role'] = UserRole.USER
                user = await DataStore.save(new User(params.user))
            } else {
                user = user[0]
            }

            console.log('addUserToGroup: user', user);
            let existingUser = await DataStore.query(GroupMember, (c) =>
                c.and(c => [
                    c.chatID.eq(params.chatID),
                    c.userID.eq(user.id)
                ])
            )


            if (existingUser.length == 0) {
                const groupMember = await DataStore.save(new GroupMember({
                    chatID: params.chatID,
                    userID: user.id,
                    role: GroupRole.MEMBER
                }))
                console.log('groupMember', groupMember);
                console.log('groupMember.group', await groupMember.group);
                const userGroup = await groupMember.group

                const group = await DataStore.save(
                    Chat.copyOf(userGroup, updated => {
                        updated.memberCount += 1
                    }))

                commit('updateCurrentGroup', { memberCount: group.memberCount })
            } else {
                throw new Error('This member already added in this group.')
            }

            // console.log('existingUserexistingUserexistingUser', existingUser);

            // commit('setCurrentChat', mutableChatObj)
            return {
                status: true,
                message: 'Member added successfully.'
            }
        } catch (error) {
            return {
                message: error,
                status: false
            }
        }
    },

    async fetchAuthChats({ commit, rootCommit, dispatch, getters }, params) {
        try {
            // await DataStore.start(); // Ensure DataStore synchronization has started
            // await new Promise(resolve => setTimeout(resolve, 3000)); // remove this. use observer instead of this

            const authUser = getters['getAmplifyAuthUser']
            const { id: authUserId } = authUser

            commit('general/setAuthChatsLoader', true, { root: true })


            // Step 1: Query non-group user chats 
            // where senderReceiver contains the current user's ID and chat not belong to ticket
            const userChats = await DataStore.query(Chat, (c) => {
                return c.and(c => [
                    c.ticketID.eq(null),
                    c.senderReceiver.contains(authUserId)
                ])
            }
            )

            // Step 2: Query groups where the user is a member
            const userGroupMemberships = await DataStore.query(GroupMember, (gm) =>
                gm.userID.eq(authUserId)
            )

            const groupIds = userGroupMemberships.map(gm => gm.chatID);

            // Step 3: Query chats for groups the user is a member of (manually loop over groupIds)
            const groupChats = []
            for (const groupId of groupIds) {
                const groupChat = await DataStore.query(Chat, (c) => c.id.eq(groupId))
                const group = groupChat[0]
                const admin = await group.admin
                const obj = {
                    ...group,
                    admin: { ...admin },
                    authIsAdmin: admin.id == authUser.id
                }
                groupChats.push(obj); // Push to the array
            }

            // Step 4: Query for public chats
            const publicChats = await DataStore.query(Chat, (c) =>
                c.isPublic.eq(true)
            )

            // Step 5: Combine userChats, groupChats, and publicChats
            const allChats = [...userChats, ...groupChats, ...publicChats]

            // Step 6: Extract unique user IDs from non-group chats
            const userIds = [...new Set(
                allChats
                    .filter(chat => !chat.isGroup && chat.senderReceiver) // Filter non-group chats with senderReceiver
                    .flatMap(chat =>
                        chat.senderReceiver.split(',').filter(id => id !== authUserId) // Get other user IDs
                    )
            )]

            // Step 7: Fetch corresponding users
            const users = await Promise.all(
                userIds.map(async (userId) => {
                    const user = await DataStore.query(User, (u) => u.id.eq(userId));
                    return user[0] || null; // Return the first user or null
                })
            )

            // Filter out null values (in case any user doesn't exist)
            const validUsers = users.filter(Boolean)

            // Create a map of users for easy lookup
            const userMap = Object.fromEntries(validUsers.map(user => [user.id, user]))

            // Step 8: Attach user details to each chat
            const authChatsWithUser = allChats.map(chat => {
                let user = {}
                let admin = {}

                if (!chat.isGroup && chat.senderReceiver) {
                    // Find the user that isn't the current user
                    user = chat.senderReceiver
                        .split(',')
                        .map(id => userMap[id]) // Use userMap for fast lookup
                        .filter(Boolean)
                } else {
                    admin = chat.admin
                }
                user = user.length > 0 ? user[0] : {}; // Select the first matched user or empty object
                return {
                    ...chat,
                    user: { ...user }, // Spread to ensure immutability
                    admin: { ...admin }
                }
            })

            console.log('authChatsWithUser:', authChatsWithUser)
            commit('setAuthChats', authChatsWithUser)

            commit('general/setAuthChatsLoader', false, { root: true })

            return {
                authChatsWithUser,
                message: 'Chats retrived successfully.',
                status: true
            }
        } catch (error) {
            console.error('fetchAuthChats error:', error)
            commit('general/setAuthChatsLoader', false, { root: true })
            return {
                message: error.message || 'An error occurred while fetching chats',
                status: false
            }
        }
    },

    async fetchChatMessages({ commit, dispatch, getters }, params) {
        try {
            // Step 1: Query messages for the chat
            const messages = await DataStore.query(Message, (c) =>
                c.chatID.eq(params.chatId),
                {
                    page: params.page,   // Pagination
                    limit: params.limit, // 20 records
                    sort: (s) => s.createdAt(SortDirection.ASCENDING)
                }
            )

            // Step 2: Fetch the sender (user) for each message
            const messagesWithSenders = await Promise.all(
                messages.map(async (message) => {
                    const sender = await DataStore.query(User, (u) => u.id.eq(message.senderID));
                    return {
                        ...message,
                        user: { ...sender[0] } || {} // Attach the sender information to the message
                    };
                })
            );

            // Step 5: Commit the messages to the store


            commit('setChatMessages', messagesWithSenders)
            return {
                messages: messagesWithSenders,
                status: true,
                message: 'Messages retrived successfully.'
            }
        } catch (error) {
            console.log('errorerror', error);
            return {
                message: error,
                status: false
            }
        }
    },
    async sendMessage({ commit, dispatch, getters }, params) {
        try {
            // await DataStore.start(); // Ensure DataStore synchronization has started
            // await new Promise(resolve => setTimeout(resolve, 3000)); // remove this. use observer instead of this

            console.log('sendMessage params', params);

            const chat = await DataStore.query(Chat, (c) => c.id.eq(params.chatID))
            let message = {}
            if (chat.length == 0) {
                throw new Error('Chat not found')
            }

            message = await DataStore.save(new Message(params))
            console.log('Message', message)

            if (!message.id) {
                throw new Error('Message not sent')
            }

            const orignalChat = chat[0]

            let lastText = null
            if (params.content) {
                lastText = params.content
            } else if (params.imageUrl) {
                lastText = 'File'
            } else if (params.audioMessage) {
                lastText = 'Voice Message'
            }

            await DataStore.save(
                Chat.copyOf(orignalChat, updated => {
                    updated.lastMessage = lastText
                })
            )
            const lastMessage = { ...message }
            lastMessage['createdAt'] = new Date().toISOString()

            if (orignalChat.isGroup) {
                commit('updateCurrentGroup', { lastMessage: lastText, updatedAt: new Date().toISOString() })
            } else {
                commit('updateCurrentChat', { lastMessage: lastText, updatedAt: new Date().toISOString() })
            }

            return {
                messageObj: lastMessage,
                status: true,
                message: 'Messages sent successfully.'
            }
        } catch (error) {
            return {
                message: error,
                status: false
            }
        }
    },
    async createChatGroup({ commit, dispatch, getters }, params) {
        try {
            const authUser = getters['getAmplifyAuthUser']
            const arg = params
            arg['createdAt'] = new Date().toISOString()

            const chatGroup = await DataStore.save(new Chat(arg))
            if (chatGroup.id) {
                await DataStore.save(new GroupMember({
                    chatID: chatGroup.id,
                    userID: authUser.id,
                    role: GroupRole.ADMIN
                }))
            }

            const group = { ...chatGroup } // cloning object
            group['admin'] = authUser
            group['authIsAdmin'] = true
            group['updatedAt'] = new Date().toISOString()
            console.log('createChatGroup group', group)

            commit('setCurrentGroup', group)
            commit('updateAuthChats', group)
            return {
                group,
                status: true,
                message: 'Group created successfully.'
            }
        } catch (error) {
            return {
                message: error,
                status: false
            }
        }
    },
    async updateChatGroup({ commit, dispatch, getters }, params) {
        try {

            let chatGroup = await DataStore.query(Chat, (c) => c.id.eq(params.chatID))
            console.log('chatGroup', chatGroup);

            chatGroup = chatGroup[0] || {}

            if (!chatGroup.id) {
                throw new Error('Group not found')
            }
            chatGroup = await DataStore.save(
                Chat.copyOf(chatGroup, updated => {
                    updated.name = params.name
                    updated.description = params.description
                    updated.imageUrl = params.imageUrl
                }))

            const authUser = getters['getAmplifyAuthUser']

            const group = { ...chatGroup } // cloning object
            group['admin'] = authUser
            group['authIsAdmin'] = true

            commit('setCurrentGroup', group)
            return {
                group,
                status: true,
                message: 'Group updated successfully.'
            }
        } catch (error) {
            return {
                message: error,
                status: false
            }
        }
    },
    async deleteChatGroup({ commit, dispatch, getters }, params) {
        try {

            let chatGroup = await DataStore.query(Chat, (c) => c.id.eq(params.chatID))
            console.log('chatGroup', chatGroup)
            chatGroup = chatGroup[0] || {}
            if (!chatGroup.id) {
                throw new Error('Group not found')
            }
            chatGroup = await DataStore.delete(chatGroup)
            return {
                status: true,
                message: 'Group deleted successfully.'
            }
        } catch (error) {
            return {
                message: error,
                status: false
            }
        }
    },

    async deleteChatGroupMember({ commit, dispatch, getters }, params) {
        try {

            let groupMember = await DataStore.query(GroupMember, (c) => c.id.eq(params.id))
            console.log('groupMember', groupMember)
            groupMember = groupMember[0] || {}
            if (!groupMember.id) {
                throw new Error('Group member not found')
            }
            const userGroup = await groupMember.group
            groupMember = await DataStore.delete(groupMember)
            const group = await DataStore.save(Chat.copyOf(userGroup, chat => {
                chat.memberCount -= 1
            }))
            commit('updateCurrentGroup', { memberCount: group.memberCount })
            return {
                status: true,
                message: 'Member removed successfully.'
            }
        } catch (error) {
            return {
                message: error,
                status: false
            }
        }
    },
    async fetchGroupMembers({ commit, dispatch, getters }, params) {
        try {
            const { chatID, page, limit } = params
            const members = await DataStore.query(GroupMember, (c) => c.chatID.eq(chatID), { page, limit, sort: (s) => s.createdAt(SortDirection.ASCENDING) })

            const groupMemebrs = await Promise.all(
                members.map(async (member) => {
                    const user = await member.user;
                    return {
                        id: member.id,
                        role: member.role,
                        userID: user.id,
                        uid: user.uid,
                        nickName: user.nickName,
                        profileImageUrl: user.profileImageUrl,
                        isOnline: user.isOnline,
                    }
                })
            )

            console.log('createChatGroup groupMemebrs', groupMemebrs)
            return {
                members: groupMemebrs,
                status: true,
                message: 'Group members retrived successfully.'
            }
        } catch (error) {
            return {
                message: error,
                status: false
            }
        }
    },
    async fetchChatById({ commit, dispatch, getters }, params) {
        try {
            const chat = await DataStore.query(Chat, params.id)
            console.log('fetchGroup group', chat)
            return {
                chat,
                status: true,
                message: 'Group members retrived successfully.'
            }
        } catch (error) {
            return {
                message: error,
                status: false
            }
        }
    },
    async fetchUserById({ commit, dispatch, getters }, params) {
        try {
            const user = await DataStore.query(User, params.id)
            console.log('fetchGroup user', user)
            return {
                user,
                status: true,
                message: 'User retrived successfully.'
            }
        } catch (error) {
            return {
                message: error,
                status: false
            }
        }
    },
    async saveUser({ commit, dispatch, getters }, params) {
        try {

            let existingUser = await DataStore.query(User, (c) => c.uid.contains(params.uid))
            let user = {}
            let alreadyExist = false
            if (existingUser.length == 0) {
                user = await DataStore.save(new User, params)
            } else {
                existingUser = existingUser[0]
                alreadyExist = true
                console.log('existingUser', existingUser, params);

                existingUser = await DataStore.save(User.copyOf(existingUser, updated => {
                    updated.isOnline = false
                    updated.uid = params.uid
                    updated.updateUserProfile = params.updateUserProfile
                    updated.nickName = params.nickName
                    updated.role = params.role
                }))
            }


            console.log('saveUser user', user)
            return {
                user: existingUser,
                alreadyExist: alreadyExist,
                status: true,
                message: 'User saved successfully.'
            }
        } catch (error) {
            return {
                message: error,
                status: false
            }
        }
    },


    // async clearLocalData({ commit, dispatch, rootGetters }, params) {
    //     console.log('local data of DataStore is clearing ');
    //     commit('setAmplifyAuthUser', {})
    //     commit('setCurrentChat', {})
    //     commit('setAuthChats', [])
    //     commit('general/setAuthChatsLoader', false, { root: true })
    //     commit('setCurrentGroup', {})
    //     await DataStore.clear()
    //     console.log('local data of DataStore is cleared ');
    //     commit('setDataSyncing', true)
    //     await DataStore.stop()
    //     console.log('DataStore is starting ');
    //     await DataStore.start()
    //     commit('setDataSyncing', false)
    //     console.log('DataStore is started '); 
    //     return true
    // },

    async clearLocalData({ commit, dispatch, rootGetters }, params) {
        try {
            console.log('local data of DataStore is clearing ')
            commit('setAmplifyAuthUser', {})
            commit('setCurrentChat', {})
            commit('setAuthChats', [])
            commit('general/setAuthChatsLoader', false, { root: true })
            commit('setCurrentGroup', {})

            // Step 1: Clear DataStore
            await DataStore.clear()
            console.log('local data of DataStore is cleared ')
            commit('setDataSyncing', true)

            // Step 2: Stop DataStore
            console.log('DataStore is starting ')
            await DataStore.start()// datastore sync started
            console.log('DataStore is started ')

            // Unsubscribe from any existing listener
            // if (unsubscribeDatastoreListener) {
            //     unsubscribeDatastoreListener();
            //     unsubscribeDatastoreListener = null; // Reset the variable
            // }

            // // Step 3: Set up a new listener for datastore sync completion
            // unsubscribeDatastoreListener = Hub.listen('datastore', (capsule) => {
            //     const { event } = capsule.payload;
            //     console.log('event', event);
            //     if (event === 'ready') {
            //         console.log('DataStore sync is complete!');
            //         commit('setDataSyncing', false);
            //     }
            // });


            const res = await waitForSync()
            console.log('resresresresres!', res)


            return true;
        } catch (error) {
            console.error('Error in clearLocalData:', error);
            return false;
        }
    },



    async makeApiCall({ rootState, rootGetters }, params) {
        try {
            const general = rootState.general
            const metadata = params.metadata
            const loader = metadata ? metadata.loader : null

            if (loader) {
                general[loader] = true
            }

            params.lang = rootGetters.currentLang
            const end_point = metadata.end_point

            delete params['metadata']
            const response = await this.$axios.post(end_point, params, {})

            if (loader) {
                general[loader] = false
            }

            if (response.code && response.code != 200) {
                throw Error(response)
            }
            return response
        } catch (error) {
            console.log('error:', error)
            return error
        }
    }
}
async function waitForSync() {
    // Unsubscribe from any existing listener
    if (unsubscribeDatastoreListener) {
        unsubscribeDatastoreListener();
        unsubscribeDatastoreListener = null; // Reset the variable
    }

    // Return a promise that resolves when sync is complete
    return new Promise((resolve, reject) => {
        // Start listening to datastore events
        unsubscribeDatastoreListener = Hub.listen('datastore', (data) => {
            const { event, data: eventData } = data.payload;
            console.log('event', event);

            // Handle specific sync events
            if (event === 'syncQueriesStarted') {
                console.log('Sync process started');
            }

            if (event === 'syncQueriesReady') {
                console.log('Sync is ready');

                // Unsubscribe once sync is complete
                if (unsubscribeDatastoreListener) {
                    unsubscribeDatastoreListener();
                    unsubscribeDatastoreListener = null;
                }
                resolve(true); // Resolve the promise
            }

            if (event === 'error') {
                console.error('Error during sync:', eventData);

                // Unsubscribe on error
                if (unsubscribeDatastoreListener) {
                    unsubscribeDatastoreListener();
                    unsubscribeDatastoreListener = null;
                }
                reject(eventData); // Reject the promise on error
            }
        });
    });
}


// Example usage in your code:
// await DataStore.clear();
// await DataStore.start(); // Start syncing
// await waitForSync(); // Wait until sync is complete