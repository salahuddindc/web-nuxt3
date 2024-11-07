export default {
    setCurrentChannel(state, payload) {
        state.currentChannel = payload
    },

    setCurrentSearchText(state, payload) {
        state.currentSearchText = payload
    },

    setArticleChannels(state, payload) {
        state.articleChannels = payload
    },

    setFaqs(state, payload) {
        state.faqs = payload
    },

    setLatestArticles(state, payload) {
        state.latestArticles = payload
    },

    setRecomendArticles(state, payload) {
        state.recomendArticles = payload
    },
    setSubItems(state, payload) {
        state.subItems = payload
    },
  setSearchResults(state, payload) {
    state.searchResults = payload;
  },
  setSearchResult(state,object){
    state.searchResults =object
  },
    setNewsSubItems(state, payload) {
        state.newsSubItems = payload
    },

    setSubItem(state, object) {
        state.subItem = object
    },

    setSubItemPagination(state, object) {
        state.subItemPagination = object
    },
    setNewsSubItemPagination(state, object) {
        state.newsSubItemPagination = object
    },
    setCommentsPagination(state, object) {
        state.commentsPagination = object
    },
    setArticleComments(state, array) {
        state.articleComments = array
    },
    setAnnouncement(state, payload) {
        state.announcements = payload
    },

    setFooterData(state, dataArray) { 
        state.footerData = dataArray
    },

    setPromotions(state, dataArray) {
        state.promotions = dataArray
    },
    setCommissionRank(state,dataArray){
        state.commissionRank =  dataArray
    },
    setFaqsParams(state,payload){
        state.faqsParams = payload
    }
//     setSelectedKey(state, key) {
//     state.selectedKey = key
//   },
//   sethoverkey(state,key){
//     state.hoverKey = key
//   }
}