export default {


  setfollowingdata(state, data) {
    state.userFollowdata = data;
  },
  setUserInfo(state,data){
    state.userInfo = data
  },
  setFollowCreate(state,data){
    state.followcreate =data 
  },
  setPostdata(state,data){
    state.userPosts = data
  },
  setUserPostdata(state,data){
    state.singleUserPost = data
  },
  setTopFollowData(state,data){
    state.topFollowData = data
  },
  setFollowDetail(state,data){
    state.followDetail = data
  },
  setSubItem(state,data){
    state.subitem = data;
  },
  setCommentsPagination(state, object) {
    state.commentsPagination = object
},
  setArticleComments(state, array) {
    state.articleComments = array
},
setPostSearch(state,data){
  state.userPostSearch = data
},
setNewsdata(state,data){
  state.newsData = data
}
}