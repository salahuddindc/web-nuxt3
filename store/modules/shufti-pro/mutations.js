
 
const setDocumentResponse = (state, object) => {
    state.response.document = object
}

const setAddressResponse = (state, object) => {
    state.response.address = object
}

const setSendRequestToShuftiPro = (state, bool) => {
    state.sendRequestToShuftiPro = bool
}



export default { 
    setDocumentResponse,
    setAddressResponse,
    setSendRequestToShuftiPro
}