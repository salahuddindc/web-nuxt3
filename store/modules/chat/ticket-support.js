import { DataStore, Predicates, SortDirection } from "aws-amplify"
import { unLink } from "~/utils/helpers"
import { Chat } from "~/src/models"
import { SupportTicket } from "~/src/models"

export default {

    async createTicket({ commit, dispatch, getters }, params) {
        try {
            const authUser = getters['getAmplifyAuthUser']
            params['userID'] = authUser.id
            const ticketResponse = await DataStore.save(new SupportTicket(params))
            await DataStore.save(new Chat({
                isGroup: false,
                isPublic: false,
                ticketID: ticketResponse.id,
                senderReceiver: authUser.id // ticket user
            }))

            const ticket = { ...ticketResponse }
            if (!ticket.id) {
                throw new Error('Ticket not created')
            }
            ticket['createdAt'] = new Date().toISOString()
            return {
                ticket,
                status: true,
                message: 'Ticket created successfully.'
            }
        } catch (error) {
            return {
                message: error,
                status: false
            }
        }
    },
    async fetchTickets({ commit, dispatch, getters }, params) {
        try {
            const authUser = getters['getAmplifyAuthUser']
            const isAdmin = authUser.role === 'ADMIN' || authUser.role === 'SUPER_ADMIN'


            let supportTickets = []
            if (isAdmin) {
                // Fetch all tickets if user is ADMIN or SUPER_ADMIN
                supportTickets = await DataStore.query(SupportTicket, Predicates.ALL,
                    {
                        sort: (s) => s.createdAt(SortDirection.DESCENDING),
                        limit: params.limit || 10,
                        page: params.page
                    }
                )
            } else {
                // Fetch only user's tickets if they are not an admin
                supportTickets = await DataStore.query(SupportTicket,
                    (c) => c.userID.eq(authUser.id),
                    {
                        sort: (s) => s.createdAt(SortDirection.DESCENDING),
                        limit: params.limit || 10,
                        page: params.page
                    }
                )
            }
            
            const tickets = unLink(supportTickets)
            commit('setSupportTicekts', tickets)
            return {
                tickets: tickets,
                status: true,
                message: 'Tickets retrived successfully.'
            }
        } catch (error) {
            return {
                message: error,
                status: false
            }
        }
    },
    async updateTicekt({ commit, dispatch, getters }, params) {
        try {
            let ticket = await DataStore.query(SupportTicket, params.id)

            if (!ticket.id) {
                throw new Error('Ticket not found.')
            }

            ticket = await DataStore.save(SupportTicket.copyOf(ticket, updated => {
                const obj = params
                for (const key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key) && key != 'id') {
                        const element = obj[key];
                        updated[key] = element
                    }
                }
            }))
            console.log('updateTicekt', ticket);


            return {
                ticket: { ...ticket },
                status: true,
                message: 'Ticket updated successfully.'
            }
        } catch (error) {
            console.log('updateTicekt error', error);
            return {
                message: error,
                status: false
            }
        }
    },


    async fetchSupportChat({ commit, dispatch, getters }, params) {
        try {
            let supportChat = await DataStore.query(Chat, (c) => c.ticketID.eq(params.id))
            console.log('fetchSupportChat group', supportChat, 'parsms:: ', params)
            supportChat = supportChat.length > 0 ? supportChat[0] : {}

            return {
                chat: supportChat,
                status: true,
                message: 'Support chat retrived successfully.'
            }
        } catch (error) {
            console.error(error);

            return {
                message: error,
                status: false
            }
        }
    },

}