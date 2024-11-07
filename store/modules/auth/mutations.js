
const setLoginWith = (state, payload) => {
    state.loginWith = payload
}
const setTempUser = (state, user) => { 
    state.tempUser = user
}

const setTempData = (state, object) => { 
    state.tempData = object
}
const setMyVipInfo = (state, object) => { 
    state.myVipInfo = object
}



export default {
    setLoginWith,
    setTempUser,
    setTempData,
    setMyVipInfo
}
