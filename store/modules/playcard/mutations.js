import { unLink } from '~/utils/helpers';
export default {

    setGames(state, payload) {
        state.games = payload;
    },
    setSelectedGame(state,payload){
        state.selectedgame=payload
    },
       setSelectedCurrency(state,payload){
        state.selectedcurrency=payload
    },
    addGames(state, payload) {
        const unlinkedGames = unLink(state.games)
        unlinkedGames.unshift(payload);
        unlinkedGames.pop()    //unlink games state array then add new game at start and then remove last element
        state.games=unlinkedGames
        if (payload.status == 4) {               //check status if settled 4 then add games to blockhashes
            const unlinkBlockHashes=unLink(state.blockHashes);
            unlinkBlockHashes.unshift(payload)
            state.blockHashes=unlinkBlockHashes
        }
    },
    pushGames(state, payload) {
        const unlinkGames= unLink(state.games)
        unlinkGames.push(payload);
        state.games=unlinkGames;
    },
    updateGames(state, payload) {
        const pageindex = state.games.findIndex(
            (item) => item.id == payload.id
        );
        if(payload.id==state.selectedgame.id){
            state.selectedgame=payload
        }
        const unlinkGames = unLink(state.games)
        unlinkGames[pageindex] = payload;
        state.games = unlinkGames
        if (payload.status == 4) {               //check status if settled 4 then add games to blockhashes
            const unlinkBlockHashes=unLink(state.blockHashes);
            unlinkBlockHashes.unshift(payload)
            state.blockHashes=unlinkBlockHashes
        }

    },
    setRooms(state, payload) {
        state.rooms = payload;
    },
    setSelectedRoom(state,payload){
        state.selectedroom=payload
    },
    updateRoom(state, payload) {
        let rooms = unLink(state.rooms)
        const gameroomIndex = rooms.findIndex(item => item.id == payload.id && item.gameid == payload.gameid);
        if (gameroomIndex >= 0) {
            rooms[gameroomIndex] = payload;
        } else {
            rooms.unshift(payload);
            if (rooms.length > 5) {
                rooms.splice((rooms.length - 1), 1)
            }
        }
        state.rooms = rooms
        if(rooms.length==1){
            state.selectedroom=rooms[0]
        }
    },
    updateUser(state, payload) {
            console.log("update user called sockets")
            let  historybetting = unLink(state.historybetting)
            let openingbetting=unLink(state.openingbetting)
            let result=0
            payload.forEach(obj => {
                historybetting.unshift(obj);
                openingbetting=openingbetting.filter(item => item.id != obj.id)
                result+=parseFloat(obj.profit)
            });
            state.historybetting = historybetting;
            state.openingbetting = openingbetting
            console.log("notify result updaing")
            state.notifyResult={
                result:result,
                roomid:payload[0].roomid,
                currencyid:payload[0].currencyid,
                gameid:payload[0].gameid
            }
    },
    setRoomInfo(state, payload) {
        state.gameroominfo = payload;
    },
    setBlockHashes(state, payload) {
        state.blockHashes = payload;
    },
    setBillingDetail(state, payload) {
        state.billingdetail = payload;
    },
    setPlayers(state, payload) {
        state.players = payload;
    },
    setPlayerPagination(state, object) {
        state.playerPagination = object
    },
    updatePlayers(state, payload) {
        const players = unLink(state.players)
        const rooms = unLink(state.rooms)
        const gameroominfo = unLink(state.gameroominfo)
        const roomIndex = rooms.findIndex(item => item.id == payload.roomid)
        if (roomIndex >= 0) {

            rooms[roomIndex].amount += payload.amount
            rooms[roomIndex].playnum += 1
            state.rooms = rooms

        }
        if (gameroominfo.roominfo.id == payload.roomid) {
            players.push(payload)
            const roomInfoIndex = gameroominfo.tabletinfos.findIndex(item => item.who == payload.tablet);
            if (roomInfoIndex >= 0) {
                gameroominfo.tabletinfos[roomInfoIndex].num += 1
                gameroominfo.tabletinfos[roomInfoIndex].amount += 1
            }
            else {

                gameroominfo.tabletinfos.push({
                    amount: payload.amount,
                    num: 1,
                    who: payload.tablet,
                    profit: 0,
                })
            }

            state.gameroominfo = gameroominfo
            state.players = players
        }

    },


    setOpenBetting(state, payload) {
        state.openingbetting = payload;
    },
    setHistoryBetting(state, payload) {
        state.historybetting = payload;
    },
    setBetOrders(state, payload) {
        state.betOrders = payload;
    },
    setUserGameAssets(state, payload) {
        state.usergameassets = payload;
    },
    setListPagination(state, object) {
        state.listPagination = object;
    },
    setHashPagination(state, object) {
        state.hashPagination = object
    },
    setHistoryPagination(state, object) {
        state.historyPagination = object
    },
    setOpenPagination(state, object) {
        state.openPagination = object
    },
    setBillingPagination(state, object) {
        state.billingPagination = object
    },
    setCurrentSelectedHash(state, object) {
        state.currentSelectedHash = object
    },
    setHashGamesInfo(state, object) {
        state.hashGamesInfo = object
    },
    setGameData(state, object) {
        state.gamedata = object
    },
    setUserGameData(state, object) {
        state.usergamedata = object
    },
    setnotifyResult(state, object) {
        state.notifyResult = object
    }
};
