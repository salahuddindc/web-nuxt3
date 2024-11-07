import moment from "moment";
import {
    api,
    blogChannelId,
    helpCenterId,
    bitnasdaqNewsChannelId,
} from "~/utils/constants";
import Noimage from "/images/noimage.png";

export default {
    getArticleDetail(state) {
        return [state.articleChannels];
    },

    getArticleChildren(state, getters, rootState, rootGetters) {
        //get children and convert description to current selected language
        const routeList = rootState.route;
        const article = state.articleChannels.id ? state.articleChannels : "";
        const lang = rootGetters.currentLang;

        const children = article.id ? article.children : [];
        const channels = children.map((item) => {
            let desc = item.description;
            try {
                const parseString = JSON.parse(desc);
                desc = parseString[lang];
            } catch (error) {}

            const subChannels = item.children;
            const parents = item.parentspath;
            let url =
                routeList.helpCenterChannelDetail +
                "/" +
                parents[parents.length - 1];
            if (subChannels.length > 0) {
                const firstChild = subChannels[0];
                url = url + "?channelId=" + firstChild.id;
            } else {
                url = url + "?channelId=" + item.id;
            }

            const object = {
                ...item,
                description: desc || item.channelname,
                redirectTo: url,
            };
            return object;
        });
        return channels;
    },

    getLatestArticles(state, getters, rootState, rootGetters) {
        //get children and convert description to current selected language
        const articles = state.latestArticles;
        const routeList = rootState.route;

        const updatedArr = articles.map((obj) => {
            const shortdescription = obj.shortdescription;
            if (
                shortdescription == "" ||
                shortdescription == null ||
                shortdescription == " "
            ) {
                obj.shortdescription = obj.title;
            }

            if (shortdescription.length >= 120) {
                obj.shortdescription = obj.shortdescription.substr(0, 120);
            }

            const parents = obj.parentspath;

            const articleType = obj.articletype;

            const mainChannel = parents[parents.length - 3];
            const subChannel = parents[parents.length - 1];

            let mainChannelId = mainChannel ? mainChannel : subChannel;
            mainChannelId = mainChannelId ? mainChannelId : helpCenterId;

            let url =
                routeList.helpCenterChannelDetail +
                "/" +
                mainChannelId +
                "?mainChannel=" +
                articleType +
                "&subChannel=" +
                articleType +
                "&subItemTitle=" +
                obj.subtitle;
            //manage redirectio of url

            if (articleType == bitnasdaqNewsChannelId) {
                url = routeList.newsDetail + "/" + obj.subtitle;
                if (obj.imgurl === undefined || obj.imgurl === "") {
                    obj.imgurl = Noimage;
                }
            }

            if (articleType == blogChannelId) {
                url = routeList.blogsDetail + "/" + obj.subtitle;
                if (obj.imgurl === undefined || obj.imgurl === "") {
                    obj.imgurl = Noimage;
                }
            }
            const subChannelRdirectTo =
                routeList.helpCenterChannelDetail +
                "/" +
                mainChannelId +
                "?channelId=" +
                articleType;
            obj.redirectTo = obj.articlehref ? obj.articlehref : url;
            obj.subChannelRdirectTo = subChannelRdirectTo;

            obj.mainchannel = mainChannel;
            obj.subchannel = subChannel;

            return {
                ...obj,
                updateTime: moment(new Date(obj.updatetime)).fromNow(),
            };
        });
        return updatedArr;
    },
    getRecomendArticles(state, getters, rootState, rootGetters) {
        //get children and convert description to current selected language
        const articles = state.recomendArticles;
        const updatedArr = articles.map((obj) => {
            const shortdescription = obj.shortdescription;
            if (
                shortdescription == "" ||
                shortdescription == null ||
                shortdescription == " "
            ) {
                obj.shortdescription = obj.title;
            }

            if (shortdescription.length >= 120) {
                obj.shortdescription = obj.shortdescription.substr(0, 120);
            }

            obj.hasSeo = false;
            obj.seo = {
                title: "",
                description: "",
                tags: [],
            };

            try {
                obj.seo = JSON.parse(obj.shortdescription);
                obj.hasSeo = true;
            } catch (error) {
                const seoObject = {
                    short_description: obj.shortdescription,
                    tags: [],
                    title: obj.title,
                };
                obj.seo = seoObject;
                obj.hasSeo = true;
            }

            const parents = obj.parentspath;

            const mainChannel = parents[parents.length - 2];
            const subChannel = parents[parents.length - 1];

            obj.mainchannel = mainChannel;
            obj.subchannel = subChannel;

            return obj;
        });

        return updatedArr;
    },
    getNewsSubItems(state, getters, rootState, rootGetters) {
        //api call should be make independently
        const items = state.newsSubItems;
        const currentSearchText = state.currentSearchText.split(" ");
        const routeList = rootState.route;

        const updatedArr = items.map((obj) => {
            const shortdescription = obj.shortdescription;
            if (
                shortdescription == "" ||
                shortdescription == null ||
                shortdescription == " "
            ) {
                obj.shortdescription = obj.title;
            }

            // if (shortdescription.length >= 300) {
            //   obj.shortdescription = obj.shortdescription.substr(0, 300)
            // }

            obj.hasSeo = false;
            obj.seo = {
                title: "",
                description: "",
                tags: [],
            };

            try {
                obj.seo = JSON.parse(obj.shortdescription);
                obj.hasSeo = true;
            } catch (error) {
                const seoObject = {
                    short_description: obj.shortdescription,
                    tags: [],
                    title: obj.title,
                };
                obj.seo = seoObject;
                obj.hasSeo = true;
            }
            const parents = obj.parentspath;

            const articleType = obj.articletype;

            const mainChannel =
                parents.length > 1 ? parents[parents.length - 2] : "";
            const subChannel = parents[parents.length - 1];

            let mainChannelId = mainChannel ? mainChannel : subChannel;
            mainChannelId = mainChannelId ? mainChannelId : helpCenterId;

            let url =
                routeList.helpCenterChannelDetail +
                "/" +
                mainChannelId +
                "?mainChannel=" +
                articleType +
                "&subChannel=" +
                articleType +
                "&subItemTitle=" +
                obj.subtitle;
            //manage redirectio of url

            if (mainChannelId == bitnasdaqNewsChannelId) {
                url = routeList.newsDetail + "/" + obj.subtitle;
                if (obj.imgurl === undefined || obj.imgurl === "") {
                    obj.imgurl = Noimage;
                }
            }

            if (mainChannelId == blogChannelId) {
                url = routeList.blogsDetail + "/" + obj.subtitle;
                if (obj.imgurl === undefined || obj.imgurl === "") {
                    obj.imgurl = Noimage;
                }
            }

            const subChannelRdirectTo =
                routeList.helpCenterChannelDetail +
                "/" +
                mainChannelId +
                "?channelId=" +
                articleType;
            obj.redirectTo = obj.articlehref ? obj.articlehref : url;
            obj.subChannelRdirectTo = subChannelRdirectTo;

            //comparing given search text with title of each article and add highlight the matched title of each article
            const titleArray = obj.title.split(" ");
            titleArray.forEach(function (t, index) {
                currentSearchText.forEach((text) => {
                    if (text && t.toLowerCase().includes(text.toLowerCase())) {
                        titleArray[
                            index
                        ] = `<span class="active-txt">${t}</span>`;
                    }
                });
            });

            return {
                ...obj,
                updateTime: moment(new Date(obj.updatetime)).fromNow(),
                title: titleArray.join(" "),
            };
        });

        return updatedArr;
    },

    getSubItems(state, getters, rootState, rootGetters) {
        //api call should be make independently
        const items = state.subItems;
        // console.log("items of subitems ",items)
        const currentSearchText = state.currentSearchText.split(" ");
        const routeList = rootState.route;
        const updatedArr = items.map((obj) => {
            const shortdescription = obj.shortdescription;
            if (
                shortdescription == "" ||
                shortdescription == null ||
                shortdescription == " "
            ) {
                obj.shortdescription = obj.title;
            }

            // if (shortdescription.length >= 300) {
            //   obj.shortdescription = obj.shortdescription.substr(0, 300)
            // }

            obj.hasSeo = false;
            obj.seo = {
                title: "",
                description: "",
                tags: [],
            };

            try {
                obj.seo = JSON.parse(obj.shortdescription);
                obj.hasSeo = true;
            } catch (error) {
                const seoObject = {
                    short_description: obj.shortdescription,
                    tags: [],
                    title: obj.title,
                };
                obj.seo = seoObject;
                obj.hasSeo = true;
            }
            const parents = obj.parentspath;

            const articleType = obj.articletype;

            const mainChannel =
                parents.length > 1 ? parents[parents.length - 3] : "";
            const subChannel = parents[parents.length - 1];

            let mainChannelId = mainChannel ? mainChannel : subChannel;
            mainChannelId = mainChannelId ? mainChannelId : helpCenterId;

            let url =
                routeList.helpCenterChannelDetail +
                "/" +
                mainChannelId +
                "?mainChannel=" +
                articleType +
                "&subChannel=" +
                articleType +
                "&subItemTitle=" +
                obj.subtitle;
            //manage redirectio of url

            if (articleType == bitnasdaqNewsChannelId) {
                url = routeList.newsDetail + "/" + obj.subtitle;
                if (obj.imgurl === undefined || obj.imgurl === "") {
                    obj.imgurl = Noimage;
                }
            }

            if (articleType == blogChannelId) {
                url = routeList.blogsDetail + "/" + obj.subtitle;
                if (obj.imgurl === undefined || obj.imgurl === "") {
                    obj.imgurl = Noimage;
                }
            }

            const subChannelRdirectTo =
                routeList.helpCenterChannelDetail +
                "/" +
                mainChannelId +
                "?channelId=" +
                articleType;
            obj.redirectTo = obj.articlehref ? obj.articlehref : url;
            obj.subChannelRdirectTo = subChannelRdirectTo;
            // console.log("objeccct",obj)
            //comparing given search text with title of each article and add highlight the matched title of each article
            const titleArray = obj.title ? obj.title.split(" ") : [];
            titleArray.forEach(function (t, index) {
                currentSearchText.forEach((text) => {
                    if (text && t.toLowerCase().includes(text.toLowerCase())) {
                        titleArray[
                            index
                        ] = `<span class="active-txt">${t}</span>`;
                    }
                });
            });

            return {
                ...obj,
                updateTime: moment(new Date(obj.createtime)).fromNow(),
                title: titleArray.join(" "),
            };
        });
        return updatedArr;
        // .filter(item=>item.data.articleid!=0)
    },
    getSubItem(state) {
        const subItem = state.subItem ? state.subItem : {};
        const updateTime = subItem.createtime ? subItem.createtime : "";

        subItem.updateTime = moment(new Date(updateTime)).fromNow();

        const subTitle = subItem.subtitle ? subItem.subtitle.split("_") : "";
        const shortDescription = subItem.shortdescription;
        subItem.hasJson = false;
        subItem.hasSeo = false;
        subItem.seo = {
            title: "",
            description: "",
            tags: [],
        };
        try {
            if (subTitle[subTitle.length - 1] == "faqs" && shortDescription) {
                //for faqs subtitle will contain _faqs at the end i.e titleof_faqs
                // shortDescription will must have json data
                subItem.jsonData = JSON.parse(shortDescription);
                subItem.hasJson = true;
            } else {
                subItem.seo = JSON.parse(subItem.shortdescription);
                subItem.hasSeo = true;
            }
        } catch (error) {}

        return subItem;
    },

    getSearchResults: (state, getters, rootState, rootGetters) => {
        //api call should be make independently
        const items = state.searchResults;
        const currentSearchText = state.currentSearchText.split(" ");
        const routeList = rootState.route;

        const updatedArr = items.map((obj) => {
            const shortdescription = obj.shortdescription;
            if (
                shortdescription == "" ||
                shortdescription == null ||
                shortdescription == " "
            ) {
                obj.shortdescription = obj.title;
            }

            // if (shortdescription.length >= 300) {
            //   obj.shortdescription = obj.shortdescription.substr(0, 300)
            // }

            obj.hasSeo = false;
            obj.seo = {
                title: "",
                description: "",
                tags: [],
            };

            try {
                obj.seo = JSON.parse(obj.shortdescription);
                obj.hasSeo = true;
            } catch (error) {
                const seoObject = {
                    short_description: obj.shortdescription,
                    tags: [],
                    title: obj.title,
                };
                obj.seo = seoObject;
                obj.hasSeo = true;
            }
            const parents = obj.parentspath;

            const articleType = obj.articletype;

            const mainChannel =
                parents.length > 1 ? parents[parents.length - 2] : "";
            const subChannel = parents[parents.length - 1];

            let mainChannelId = mainChannel ? mainChannel : subChannel;
            mainChannelId = mainChannelId ? mainChannelId : helpCenterId;

            let url =
                routeList.helpCenterChannelDetail +
                "/" +
                mainChannelId +
                "?mainChannel=" +
                articleType +
                "&subChannel=" +
                articleType +
                "&subItemTitle=" +
                obj.subtitle;
            //manage redirectio of url

            if (articleType == bitnasdaqNewsChannelId) {
                url = routeList.newsDetail + "/" + obj.subtitle;
                if (obj.imgurl === undefined || obj.imgurl === "") {
                    obj.imgurl = Noimage;
                }
            }

            if (articleType == blogChannelId) {
                url = routeList.blogsDetail + "/" + obj.subtitle;
                if (obj.imgurl === undefined || obj.imgurl === "") {
                    obj.imgurl = Noimage;
                }
            }

            const subChannelRdirectTo =
                routeList.helpCenterChannelDetail +
                "/" +
                mainChannelId +
                "?channelId=" +
                articleType;
            obj.redirectTo = obj.articlehref ? obj.articlehref : url;
            obj.subChannelRdirectTo = subChannelRdirectTo;

            // //comparing given search text with title of each article and add highlight the matched title of each article
            // const titleArray = obj.title.split(' ')
            // titleArray.forEach(function (t, index) {
            //   currentSearchText.forEach(text => {
            //     if (text && t.toLowerCase().includes(text.toLowerCase())) {
            //       titleArray[index] = `<span class="active-txt">${t}</span>`
            //     }
            //   });
            // })

            return {
                ...obj,
                updateTime: moment(new Date(obj.updatetime)).fromNow(),
                // title: titleArray.join(' ')
            };
        });

        return updatedArr.sort(
            (a, b) =>
                new Date(b.updatetime).getTime() -
                new Date(a.updatetime).getTime()
        );
    },

    subItemPagination(state) {
        console.log(
            "subitempagination",
            JSON.parse(JSON.stringify(state.subItemPagination))
        );
        return state.subItemPagination;
    },
    commentsPagination(state) {
        return state.commentsPagination;
    },
    getArticleComments(state) {
        const comments = state.articleComments ? state.articleComments : [];
        const array = comments.map((comment) => {
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

    getCurrentChannel(state) {
        const currentChannel = state.currentChannel;
        return currentChannel;
    },
    getAnnouncement(state, getters, rootState, rootGetters) {
        const items = state.announcements;

        const currentSearchText = state.currentSearchText.split(" ");
        const routeList = rootState.route;
        const updatedArr = items.map((obj) => {
            const shortdescription = obj.shortdescription;
            if (
                shortdescription == "" ||
                shortdescription == null ||
                shortdescription == " "
            ) {
                obj.shortdescription = obj.title;
            }

            obj.hasSeo = false;
            obj.seo = {
                title: "",
                description: "",
                tags: [],
            };

            try {
                obj.seo = JSON.parse(obj.shortdescription);
                obj.hasSeo = true;
            } catch (error) {
                const seoObject = {
                    short_description: obj.shortdescription,
                    tags: [],
                    title: obj.title,
                };
                obj.seo = seoObject;
                obj.hasSeo = true;
            }
            const parents = obj.parentspath;

            const articleType = obj.articletype;

            const mainChannel =
                parents.length > 1 ? parents[parents.length - 3] : "";
            const subChannel = parents[parents.length - 1];

            let mainChannelId = mainChannel ? mainChannel : subChannel;
            mainChannelId = mainChannelId ? mainChannelId : helpCenterId;

            let url =
                routeList.helpCenterChannelDetail +
                "/" +
                mainChannelId +
                "?mainChannel=" +
                articleType +
                "&subChannel=" +
                articleType +
                "&subItemTitle=" +
                obj.subtitle;
            //manage redirectio of url
            const subChannelRdirectTo =
                routeList.helpCenterChannelDetail +
                "/" +
                mainChannelId +
                "?channelId=" +
                articleType;
            obj.redirectTo = obj.articlehref ? obj.articlehref : url;
            obj.subChannelRdirectTo = subChannelRdirectTo;
            // console.log("objeccctAnnouncement",obj)
            //comparing given search text with title of each article and add highlight the matched title of each article
            const titleArray = obj.title ? obj.title.split(" ") : [];
            titleArray.forEach(function (t, index) {
                currentSearchText.forEach((text) => {
                    if (text && t.toLowerCase().includes(text.toLowerCase())) {
                        titleArray[
                            index
                        ] = `<span class="active-txt">${t}</span>`;
                    }
                });
            });

            return {
                ...obj,
                updateTime: moment(new Date(obj.createtime)).fromNow(),
                title: titleArray.join(" "),
            };
        });
        return updatedArr;
    },

    getFooterData(state, getters, rootState, rootGetters) {
        const routeList = rootState.route;
        const apiChannel = state.footerData.find(
            (channel) => channel.id == api.channel
        );
        let apiObject = {};

        if (apiChannel) {
            apiObject = apiChannel.children.find((channel) =>
                channel.channelname.toLowerCase().includes("api")
            );

            if (apiObject) {
                apiObject.subTitle = apiObject.description;

                const staticUrl =
                    routeList.helpCenterChannelDetail +
                    "/" +
                    helpCenterId +
                    "?mainChannel=" +
                    api.channel +
                    "&subItemTitle=" +
                    apiObject.description;
                apiObject.imageurl = apiObject.imageurl
                    ? apiObject.imageurl
                    : staticUrl;
            }
        }
        return state.footerData;
    },

    getPromotions(state, dataArray) {
        return state.promotions;
    },
    getApiData(state, getters, rootState, rootGetters) {
        //special api footer channel. we can get data directly from footerData state of
        const apiChannel = state.footerData.find(
            (channel) => channel.id == api.channel
        );
        let apiObject = {};
        if (apiChannel) {
            apiObject = apiChannel.children.find((channel) =>
                channel.channelname.toLowerCase().includes("api")
            );
        }
        return apiObject;
    },
    getCommissionRank(state, dataArray) {
        return state.commissionRank;
    },
    getFaqs(state) {
        const FAQs = JSON.parse(
            state.faqs?.shortdescription || ""
        );
            return FAQs || [];
      
},
    // selectedKey: (state) => state.selectedKey,
    // getHoverKey: (state) => state.hoverKey,
};
