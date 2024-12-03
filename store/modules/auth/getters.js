const userInfo = (state, getters, rootState, rootGetters) => {
  //not being used yet
  const defaultUserObject = {
    avatar: null,
    bpiwithdrawbtc: null,
    countrycode: null,
    countryflag: null,
    countryid: null,
    countryname: null,
    createtime: null,
    devicenumber: null,
    email: null,
    googlesecretkey: null,
    idaiwithdrawbtc: null,
    idcard: null,
    invitationcode: null,
    invitationcode_parent: null,
    isemailauthed: false,
    isgoogleauthed: false,
    ishavepassword: false,
    isopenpaypassword: false,
    isphoneauthed: false,
    lang: null,
    lastloginip: null,
    lastlogintime: null,
    nickname: null,
    passwordstrength: null,
    phone: null,
    realname: null,
    registerip: null,
    registertime: null,
    secretkey: null,
    securitylevel: null,
    source: null,
    token: null,
    uid: null,
    userstatus: null,
    usertype: null,
    viplevel: null,
    withdrawlimtperday: null,
  }
  
  return rootState.hex_server_user_info.value ? rootState.hex_server_user_info.value : defaultUserObject
}

const loginWith = (state) => {
  //used in different component
  return state.loginWith
}

const getTempUser = (state) => {
  return state.tempUser ? state.tempUser : {}
}

const getTempData = (state) => {
  return state.tempData ? state.tempData : {}
}
const getMyVipInfo = (state) => {
  return state.myVipInfo
}


export default {
  userInfo,
  loginWith,
  getTempUser,
  getTempData,
  getMyVipInfo
}
