 
const getDocumentResponse = (state) => {
  return state.response.document
}

const getAddressResponse = (state, object) => {
  return state.response.address
}
const sendRequestToShuftiPro = (state, object) => {
  return state.sendRequestToShuftiPro
}


export default { 
  getDocumentResponse,
  getAddressResponse,
  sendRequestToShuftiPro
}
