import moment from "moment";
import state from "./state";
function cleanAndValidateJSON(jsonString) {
    if (typeof jsonString !== 'string' || jsonString.trim() === '') {
        return { content: '', images: [], tradingPairs: [], quotearticleid: '', tags: [] };
    }

    jsonString = jsonString.replace(/[\u0000-\u001F]+/g, "")
                           .replace(/\\n/g, "\\n")
                           .replace(/\\'/g, "\\'")
                           .replace(/\\"/g, '\\"')
                           .replace(/\\&/g, "\\&")
                           .replace(/\\r/g, "\\r")
                           .replace(/\\t/g, "\\t")
                           .replace(/\\b/g, "\\b")
                           .replace(/\\f/g, "\\f");

    let parseData = {};
    let content = "";

    try {
        parseData = JSON.parse(jsonString);
    } catch (error) {
        console.error("Error parsing JSON:", error);
        try {
            content = jsonString.split('":"')[1];
            content = content.split('","')[0];
            parseData = JSON.parse(jsonString.replace(content, ""));
        } catch (e) {
            console.error("Error extracting content:", e);
            return { content: '', images: [], tradingPairs: [], quotearticleid: '', tags: [] };
        }
    }

    if (content) {
        parseData["content"] = content;
    }
    return {
        content: parseData.content || '',
        images: parseData.images || [],
        tradingPairs: parseData.tradingPairs || [],
        quotearticleid: parseData.quotearticleid || '',
        tags: parseData.tags || []
    };
}
function processArticles(articles) {
    return articles.map((obj) => {
        const desc = cleanAndValidateJSON(obj.shortdescription);
        const updatetime = obj.updatetime || "";
        const updatedTime = moment.tz(updatetime, "Etc/GMT")
        .local()
        .fromNow()
        return {
            ...obj,
            content: desc.content,
            tags: desc.tags,
            images: desc.images,
            tradingPairs: desc.tradingPairs,
            quotearticleid: desc.quotearticleid,
            updatedTime,
        };
    });
}
export default {
    getTopFollowData: (state) => state.topFollowData,
    getuserInfo: (state) => state.userInfo,
    getFollowCreate: (state) => state.followcreate,
    getpostdata(state) {
        const article = state.userPosts;
        return processArticles(article);
    },
    //search article functionality getter
    getUserSearch(state) {
        const articles = state.userPostSearch;
        return processArticles(articles,state);
    },
    getSubPost(state) {
        const article = state.singleUserPost;
        return processArticles(article);
    },
    getNewsData(state) {
        const article = state.newsData;
      return article;

    },
    getSubItem(state) {
        const { subitem } = state;
        let content = "";
        let images = [];
        if (subitem.remark) {
            const cleanedRemark = subitem.remark.replace(
                /[\u0000-\u001F]+/g,
                ""
            );
            try {
                const remarkObj = JSON.parse(cleanedRemark);
                content = remarkObj.content || "";
                images = remarkObj.images || "";
            } catch (error) {
                console.error("Error parsing remark:", error);
            }
        }
        return {
            ...subitem,
            content: content,
            images: images,
        };
    },

    getUserFollowdata(state) {
        const articles = state.userFollowdata;
        return processArticles(articles);
    },
    getFollowDetail: (state) => state.followDetail,
    commentsPagination(state) {
        return state.commentsPagination;
    },
    getArticleComments(state) {
        const comments = state.articleComments ? state.articleComments : [];
        const array = comments.map((comment) => {
            if(comment.subcomment){
               comment.subcomment.map((sub)=>{
                    return sub.createtime = moment.tz(sub.createtime, "Etc/GMT")
                    .local()
                    .fromNow()
                })
            }
            return {
                ...comment,
                createTime: moment
                    .tz(comment.createtime, "Etc/GMT")
                    .local()
                    .fromNow(),
            };
        });

        return array;
    },
};
