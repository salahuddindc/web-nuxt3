import * as CryptoJS from "crypto-js";
const url = {
    articleCreate: "/comapi/v1.0/com/article.create",
    articleInfo: "/comapi/v1.0/com/article.info.get",
    articleDelete:"/comapi/v1.0/com/article.delete",
    supportNotSupport: "/comapi/v1.0/com/articledata.create",
    searchArticle: "/comapi/v1.0/com/article.search",
    channels: "/comapi/v1.0/com/article.channels",
    userInfo: "/comapi/v1.0/com/follow.userinfo",
    getFollow: "/comapi/v1.0/com/topfollow.get",
    getFollowDetail: "/comapi/v1.0/com/followdetail.get",
    followCreate: "/comapi/v1.0/com/follow.create",
    createComment: "/comapi/v1.0/com/comment.create",
    getArticleComments: "/comapi/v1.0/com/articlecommont.get",
    commentDelete: "/comapi/v1.0/com/comment.delete"

};
export default {
    async fetchArticleCreate({dispatch }, { params }) {
        try {
            const response = await dispatch("makeApiCall", {
                ...params,
                end_point: url.articleCreate,
                loader: "loadingCreateArticle",
            });
            console.log("Response from fetchArticleCreate:", response);

            return response;
        } catch (error) {
            console.error("Error in fetchArticleCreate:", error);
            throw error; 
        }
    },

    // get all user posts and following data
    async fetchSubItems({ commit, dispatch }, { params, dataType }) {
        params.end_point = url.searchArticle;
        params.loader = "loadingRecommend";
        params.storeDataInCache = false;
        const response = await dispatch("makeApiCall", params);

        const data = response.data;
        console.log("response", data);
        if (data) {
            let subItems = [];
            if (dataType == "following") {
                subItems = data.pagedata;
                commit("setfollowingdata", subItems);
            } else if (dataType == "posts") {
                subItems = data.pagedata;
                commit("setPostdata", subItems);
            } else if (dataType == "userPosts") {
                subItems = data.pagedata;
                commit("setUserPostdata", subItems);
            } else if (dataType == "search") {
                subItems = data.pagedata;
                commit("setPostSearch", subItems);
            }
            else if(dataType == "news"){
                subItems = data.pagedata;
                commit("setNewsdata", subItems);
            }
        }

        return response;
    },
    //set indiviual post data
    async fetchChannelInfo({ commit, dispatch }, params) {
        params.end_point = url.articleInfo;
        const object = {
            ...params,
            channelID: params.subChannel,
        };

        const [response] = await Promise.all([dispatch("makeApiCall", params)]);
        const subItem = response.data;
        commit("setSubItem", subItem);
    },
    // data for all user to follow
    async fetchTopFollow({ commit, dispatch }, params) {
        params.end_point = url.getFollow;
        params.loader = "loadingTopFollow";
        const response = await dispatch("makeApiCall", params);
        const data = response.data;
        commit("setTopFollowData", data);
        return response;
    },
    async fetchSocialStates({ commit }, subItemId) {
        commit("setSocialIconState", subItemId);
    },

    // fetch follow create
    async fetchfollowCreate({ commit, dispatch }, params) {
        params.end_point = url.followCreate;
        return new Promise(async (resolve, reject) => {
            try {
                const response = await dispatch("makeApiCall", params);

                if (response) {
                    const data = response;
                    commit("setFollowCreate", data);
                    setTimeout(async () => {
                        await dispatch("fetchFollowdetail", params);
                        resolve(response);
                    }, 500);
                } else {
                    console.error("API call failed");
                    reject(new Error("API call failed"));
                }
            } catch (error) {
                console.error("Error occurred during API call:", error);
                reject(error);
            }
        });
    },
    // data for specific user information
    async fetchUserInfo({ commit, dispatch }, params) {
        params.end_point = url.userInfo;
        params.loader = "userDataLoader";
        const response = await dispatch("makeApiCall", params);
        const data = response.data;
        if (data) {
            commit("setUserInfo", data);
        }
        return response;
    },

    // get follow details (user follow , unfollow)
    async fetchFollowdetail({ commit, dispatch }, params) {
        params.end_point = url.getFollowDetail;
        const response = await dispatch("makeApiCall", params);
        const data = response.data;
        if (data) {
            commit("setFollowDetail", data);
        }
        return response;
    },

    // create comment
    async submitComment({ dispatch }, params) {
        params.end_point = url.createComment;
        const response = await dispatch("makeApiCall", params);
        if (response.code == 200) {
            dispatch("fetchComments", {
                articleId: params.articleID,
                pageIndex: 1,
                pageSize: 10,
            });
        }
        return response;
    },

    // set user support notsupport
    async saveSupportNotSupport({ dispatch }, params) {
        params.end_point = url.supportNotSupport;
        params.storeDataInCache = false;
        const response = await dispatch("makeApiCall", params);
        return response;
    },
    // delete comment
    async commentDelete({dispatch},params){
        try{
            params.end_point = url.commentDelete;
            const response = await dispatch("makeApiCall",params);
                if(response.code == 200){
                    dispatch('fetchComments',{
                        articleId: params.articleID,
                    })
                }
                return response;
        }
        catch{
            console.error("Api give Error during fetch")
        }
    },
    // user comments
    async fetchComments({ commit, dispatch }, params) {
        try{
            params.end_point = url.getArticleComments;
            params.loader = "loadingComments";
            const response = await dispatch("makeApiCall", params);
            let comments = [];
            const data = response.data;
            if (data) {
                comments = data.pagedata ? data.pagedata : [];
                const object = {
                    currentPageIndex: data.currentpageindex,
                    hasNextPage: data.hasnextpage,
                    hasPreviousPage: data.haspreviouspage,
                    pageSize: data.pagesize,
                    totalItemCount: data.totalitemcount,
                    totalPageCount: data.totalpagecount,
                };
                commit("setCommentsPagination", object);
            }
            commit("setArticleComments",comments);
            return response;
        }
        catch (error) {
            console.error("Error fetching comments:", error);
            throw error;
          } 
    },
    async fetchDelete({ dispatch }, params) {
        params.end_point = url.articleDelete;
        const response = await dispatch("makeApiCall", params);
        if(response.code == 200){
            const object={

                channelID: 90,
                userId: params.uid,
                uid: params.uid,
                pageIndex: 1,
                pageSize: 20
            }
            dispatch("fetchSubItems", { params: object, dataType: "userPosts" });
        }
        return response;
    },
    async makeApiCall({ rootState, rootGetters }, params) {
        try {
            const loader = params.loader ? params.loader : null;
            const general = rootState.general;
            if (loader) {
                general[loader] = true;
            }
            params.lang = rootGetters.currentLang;
            params.end_point = params.end_point ? params.end_point : url.channels;
            
            let response;
            
            response = await this.$axios.post(params.end_point, params, {});
            
            if (loader) {
                general[loader] = false;
            }
            
            if (response.code && response.code != 200) {
                throw Error(response);
            }
            
            return response;
        } catch (error) {
            console.error("article store in makeApiCall function", error);
            return error;
        }
    }
    
};
