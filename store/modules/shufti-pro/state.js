export default () => ({
    tempData: {}, //need to store temprary data related with user (Home page)
    sendRequestToShuftiPro: false,

    response: {
        document: {
            hasResponse: false,
            message: null,
            status: null,
            response: null
        },
        address: {
            hasResponse: false,
            message: null,
            status: null,
            response: null
        },
    }
})
