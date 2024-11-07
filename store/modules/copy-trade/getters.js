
const getAuthExpertData = (state) => {
  return state.expertAuthData || {}
}
const getExpertData = (state) => {
  const expertData = state.expertData
  const myFollowerExperts = state.myFollowerExperts || []
  state.expertData['i_am_following'] = myFollowerExperts.some((myFollowerExpert) => {
    return myFollowerExpert.userid === expertData.userid;
  })

  return state.expertData || {}
}
const assetsVisible = (state) => {
  return state.expertData.ishide || false
}
const getRoiTraders = (state) => {
  const myFollowerExperts = state.myFollowerExperts || []
  const roiTraders = state.roiTraders || []

  const traders = roiTraders.map((trader) => {
    return {
      ...trader,
      i_am_following: myFollowerExperts.some((myFollowerExpert) => {
        return myFollowerExpert.userid === trader.userid;
      })
    }
  })

  return traders
}
const getTraderByProfitAndLoss = (state) => {
  const myFollowerExperts = state.myFollowerExperts || []
  const tradersByProfitAndLoss = state.tradersByProfitAndLoss || []

  const traders = tradersByProfitAndLoss.map((trader) => {
    return {
      ...trader,
      i_am_following: myFollowerExperts.some((myFollowerExpert) => {
        return myFollowerExpert.userid === trader.userid;
      })
    }
  })
  return traders
}
const getNewTraders = (state) => {
  const myFollowerExperts = state.myFollowerExperts || []
  const newTraders = state.newTraders || []

  const traders = newTraders.map((trader) => {
    return {
      ...trader,
      i_am_following: myFollowerExperts.some((myFollowerExpert) => {
        return myFollowerExpert.userid === trader.userid;
      })
    }
  })
  return traders
}
const getAllTraders = (state) => {
  const myFollowerExperts = state.myFollowerExperts || []
  const allTraders = state.allTraders || []

  const traders = allTraders.map((trader) => {
    return {
      ...trader,
      i_am_following: myFollowerExperts.some((myFollowerExpert) => {
        return myFollowerExpert.userid === trader.userid;
      })
    }
  })

  return traders

}

const allTraderPagination = (state) => {
  return state.allTraderPagination
}

const getTags = (state) => {
  return state.tags || []
}

const getSelectedTrader = (state, getters, rootState, rootGetters) => {

  const myFollowerExperts = state.myFollowerExperts || []
  const followers = getters['getExpertFollowers']
  const auth = rootGetters['auth/userInfo']
  let show_to_non_follower = true
  const currentTrader = state.selectedTrader

  if (currentTrader.userid == auth.uid) {
    show_to_non_follower = true
  } else {
    show_to_non_follower = followers.some((follower) => {
      return follower.userid === auth.uid;
    });
  }


  state.selectedTrader['show_to_non_follower'] = show_to_non_follower
  state.selectedTrader['i_am_following'] = myFollowerExperts.some((myFollowerExpert) => {
    return myFollowerExpert.userid === currentTrader.userid;
  })
  return state.selectedTrader
}

const getExpertFollowers = (state) => {
  return state.expertFollowers
}
const getExpertFollowersPagination = (state) => {
  return state.expertFollowersPagination
}
const getSelectedDuration = (state) => {
  return state.selectedDuration
}

const getExpertTrades = (state) => {
  return state.expertTrades
}
const getExpertTradesHistory = (state) => {
  return state.expertTradesHistory
}
const getFollowersUserTrade = (state) => {
  return state.followersUserTrade
}
const getFollowerUserTradePagination = (state) => {
  return state.followerUserTradePagination
}

const getFollowerUserTradeHistory = (state) => {
  return state.followerUserTradeHistory || []
}
const getFollowerUserTradeHistoryPagination = (state,) => {
  return state.followerUserTradeHistoryPagination
}

const getProfitSharing = (state) => {
  return state.profitSharing || []
}
const getProfitSharingPagination = (state,) => {
  return state.profitSharingPagination
}
const daysFilter = (state,) => {
  return [
    {
      text: '7D',
      value: 7
    },
    {
      text: '30D',
      value: 30
    },
    {
      text: '90D',
      value: 90
    }
  ]
}

const traderRanks = (state,) => {
  return [
    {
      text: 'copy_trading_ranks.cadet',
      key: 'cadet',
      value: 1
    },
    {
      text: 'copy_trading_ranks.bronze',
      key: 'bronze',
      value: 2
    },
    {
      text: 'copy_trading_ranks.silver',
      key: 'silver',
      value: 3
    },
    {
      text: 'copy_trading_ranks.gold',
      key: 'gold',
      value: 4
    }
  ]
}
const getMyFollowerData = (state) => {
  return state.myFollowerData || {}
}

const getMyFollowerExperts = (state) => {
  return state.myFollowerExperts || []
}

const getMyTrades = (state) => {
  return state.myTrades
}
const getMyTradeHistory = (state) => {
  return state.myTradeHistory
}
const getMyTradeHistoryPagination = (state) => {
  return state.myTradeHistoryPagination
}

const getUserProfitSharing = (state) => {
  return state.userProfitSharing
}
const getUserProfitSharingPagination = (state) => {
  return state.userProfitSharingPagination
}
const getBestFollowers = (state) => {
  return state.bestFollowers
}
const getBestFollowersPagination = (state) => {
  return state.bestFollowersPagination
}
const getBestExperts = (state) => {
  return state.bestExperts || {}
}

const getExpertTradesHistoryPagination = (state) => {
  return state.expertTradesHistoryPagination
}


export default {
  getAuthExpertData,
  assetsVisible,
  getRoiTraders,
  getTraderByProfitAndLoss,
  getNewTraders,
  getAllTraders,
  allTraderPagination,
  getTags,
  getExpertData,
  getSelectedTrader,
  getExpertFollowers,
  getExpertFollowersPagination,
  getSelectedDuration,
  getExpertTrades,
  getFollowersUserTrade,
  getFollowerUserTradePagination,
  getFollowerUserTradeHistory,
  getFollowerUserTradeHistoryPagination,
  getProfitSharing,
  getProfitSharingPagination,
  daysFilter,
  traderRanks,
  getMyFollowerData,
  getMyFollowerExperts,
  getMyTrades,
  getMyTradeHistory,
  getMyTradeHistoryPagination,
  getUserProfitSharing,
  getUserProfitSharingPagination,
  getBestFollowers,
  getBestFollowersPagination,
  getBestExperts,
  getExpertTradesHistory,
  getExpertTradesHistoryPagination
}
