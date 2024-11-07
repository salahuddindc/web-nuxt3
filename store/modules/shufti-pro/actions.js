import { shuftiPro } from "~/utils/constants"

const url = {
    verifyUserInfo: '/userapi/v1.0/usercommon/verifyuserinfo.get',
    constants: '/comapi/v1.0/com/constants.getconstantsinfo',
}

const login = () => {

}

const logout = () => {

}

export default {
    async verifyDocument({ commit, dispatch }, bodyObject) { //document,address
        const serviceName = bodyObject.name

        delete bodyObject['name']

        const token = Buffer.from(shuftiPro.clientId + ':' + shuftiPro.secretKey).toString('base64')
        const responseObject = {
            hasResponse: true,
            message: null,
            status: 'request.pending',
            response: null
        }
        console.log('responseObject:::', responseObject, serviceName)


        if (serviceName == 'document') {
            console.log('setDocumentResponse:::', responseObject);
            commit('setDocumentResponse', responseObject)
        } else if (serviceName == 'address') {
            console.log('setAddressResponse:::', responseObject);
            commit('setAddressResponse', responseObject)
        }

         
         

        
        const response = await fetch(shuftiPro.url, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + token
            },
            body: JSON.stringify(bodyObject)
        }).then(function (response) {
            console.log('shuftiProResponse: response', response)
            responseObject.status = 'request.pending'
            return response.json()
        }).then(function (data) {
            console.log('shuftiProResponse: data', data);
            responseObject.status = data.event
            responseObject.hasResponse = true

            if (data.event == "verification.declined") {
                responseObject.message = data.declined_reason
            } else if (data.event == 'verification.accepted') {
                responseObject.message = 'Your document is verified.'
                responseObject.response = JSON.stringify(data)
            } else if (data.event == 'request.invalid') {
                responseObject.message = data.error.message
            } else {
                responseObject.message = data.event.split('.', ' ').charAt(0).toUpperCase()
            }

            if (serviceName == 'document') {
                commit('setDocumentResponse', responseObject)
            } else if (serviceName == 'address') {
                commit('setAddressResponse', responseObject)
            }
            return data
        }).catch(error => {
            console.log('verifyDocument:response error', error);
        });



        console.log('verifyDocument:response', response);

    },

    async fetchShuftiRequestStatus({ commit, dispatch }, params) {

        params.metadata = {
            end_point: url.constants
        }
        const response = await dispatch('makeApiCall', params)


        if (response.code == 200) {
            const object = response.data ? JSON.parse(response.data) : {}
            console.log('response:: checkShuftiRequestStatus', object)
            const shuftiStatus = object.third_party_verification ? object.third_party_verification : false
            commit('setSendRequestToShuftiPro', shuftiStatus)
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
            console.error('shufti-pro store in makeApiCall function', error)
            return error
        }
    }


}



