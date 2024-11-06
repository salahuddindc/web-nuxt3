const serverPort = 9088
const getTempData = (state) => {
    return state.tempData;
};
const getConstants = (state) => {
    const constants = state.constants;
    return constants ? constants : {};
};
const getSocialLinks = (state, getters) => {
    const temp = getters.getConstants?.social_infos || {};
    return temp.social_links || [];
};
const getShareSocialLinks = (state, getters) => {
    const temp = getters.getConstants?.social_infos || {};
    return temp.share_social_links || [];
};
const getPartners = (state, getters) => {
    const temp = getters.getConstants?.partners || {};
    return temp || [];
};
const getstrategies = (state, getters) => {
    const temp = getters.getConstants || {};
    return temp?.streagy || [];
};

const getFutrue = (state, getters) => {
    const temp = getters.getConstants;
    return temp?.futrue || 0;
};
const getP2p = (state, getters) => {
    const p2pStatus = getters.getConstants.p2p || true
    const port = serverPort
    return p2pStatus == 'true' || port == 9088 ? true : false
}

const getFinancial = (state, getters) => {
    const financialStatus = getters.getConstants.financial || true
    const port = serverPort
    return financialStatus == 'true'|| port == 9088  ? true : false
}
const showMargin = (state, getters) => { 
    const marginStatus = getters.getConstants.margin || true
    const port = serverPort
    return marginStatus == 'true' || port == 9088 ? true : false
}
const showGame = (state, getters) => {
    // true: hide
    // false: show
    const gameStatus = getters.getConstants.game
    console.log('getters.getConstants.game', getters.getConstants.game);
    
    const port = serverPort
    return gameStatus == 'true' ? true : false
}

const getSpot = (state, getters) => {
    if (serverPort == 9088) return true;
    const temp = getters.getConstants;
    return temp?.spot || 0;
}

const getEmails = (state, getters) => {
    const temp = getters.getConstants?.social_infos || {};
    return temp.emails || [];
}

const isServiceAvailable = (state, getters) => {
    // isServiceAvailable in your region
    console.log('state.constants', state.constants);
    
    const available = state.constants.isruning || 'true'

    return available == 'true' ? true : false
}

const getAdjustmentCoefficients = (state) => {
    return state.adjustmentCoefficients
}

const showBuyBnq = (state,getters) =>{
    const buyBnqStatus = getters.getConstants.buy_bnq || true
    const port = serverPort
    return buyBnqStatus == 'true'  ? true : false
}
export default {
    getTempData,
    getSocialLinks,
    getShareSocialLinks,
    getPartners,
    getConstants,
    getstrategies,
    getFutrue,
    getSpot,
    getEmails,
    getP2p,
    getFinancial,
    showMargin,
    showGame,
    isServiceAvailable,
    getAdjustmentCoefficients,
    showBuyBnq
};
