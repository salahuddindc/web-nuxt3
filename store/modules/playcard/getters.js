import { unLink } from "~/utils/helpers"

export default {
  getGames(state) {
    return state.games
  },
  getSelectedGame(state){
  return state.selectedgame||{}
  },
  getSelectedCurrency(state){
    return state.selectedcurrency||'1533624980247416423'
    },
  getGamesArray(state){
    return state.games?.pagedata
  },
  //rooms gettters
  getRooms(state) {
    return state.rooms
  },
  getSelectedRoom(state) {
    return state.selectedroom
  },
  //roominfo getters
  getRoomInfo(state) {
    return state.gameroominfo
  },
  getBlockHashes(state) {
    return state.blockHashes
  },
  getPlayers(state) {
    return state.players
  },
  getOpenBetting(state) {
    return state.openingbetting
  },
  getHistoryBetting(state) {
    return state.historybetting
  },
  getBillingDetail(state) {
    return state.billingdetail
  },
  getBetOrders(state, getters, rootState, rootGetters) {
    const betOrders = state.betOrders
    const symbolInfos = rootState.currencyinfos
    const modifiedOrders = betOrders.map(order => {


      const currencyInfo = symbolInfos.find((info) => info.id == order.currencyid)
      if (currencyInfo) {
        return {
          ...order,
          icon: currencyInfo.icon,
          currencyname: currencyInfo.currencyname
        }
      }

    })


    return modifiedOrders
  },

  getUserGameAssets(state) {
    return state.usergameassets
  },
  getUserGameData(state) {
    return state.usergamedata
  },

  getCurrentSelectedHash(state) {
    return state.currentSelectedHash
  },

  listPagination(state) {
    return state.listPagination
  },

  hashPagination(state, object) {
    return state.hashPagination
  },
  playerPagination(state, object) {
    return state.playerPagination
  },
  openPagination(state, object) {
    return state.openPagination
  },
  historyPagination(state, object) {
    return state.historyPagination
  },
  billingPagination(state, object) {
    return state.billingPagination
  },


  getHashGamesInfo(state, object) {
    return state.hashGamesInfo
  },
  getGameData(state, object) {
    return state.gamedata
  },
  getnotifyResult(state, object) {
    return state.notifyResult
  }

}
