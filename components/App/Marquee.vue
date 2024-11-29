<template>
    <div id="coinlistheader" class="market-change-bg">
        <div class="market-change-content " ref="marqueeArea">
            <div class="marquee-box" ref="marqueeBox" :style="boxStyles">

                <template v-for="index in copyTimes">
                    <div class="marquee-box-first" v-for="(item, listIndex) in items"
                        :key="`marqueeItem-${index}-${listIndex}`">
                        <nuxt-link :to="item.redirectTo" v-if="item.redirectTo">
                            <p class="mb-0 coin-txt fw-5">
                                <span v-html="item.text"></span>

                            </p>
                        </nuxt-link>
                        <p v-else class="mb-0 coin-txt fw-5">
                            <span v-html="item.text"></span>

                        </p>
                    </div>
                </template>


            </div>

        </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    name: 'AppMarquee',
    props: {
        items: {
            type: Array,
            default: () => [
                {
                    id: 1,
                    text: 'BTC/USDT',
                    redirectTo: null
                },
                {
                    id: 2,
                    text: 'BNQ/USDT',
                    redirectTo: null
                },
                {
                    id: 3,
                    text: 'LINK/USDT',
                    redirectTo: null
                },
                {
                    id: 4,
                    text: 'DODGE/USDT',
                    redirectTo: null
                },
                {
                    id: 5,
                    text: 'ARB/USDT',
                    redirectTo: null
                },
                {
                    id: 6,
                    text: 'FIL/USDT',
                    redirectTo: null
                },
                {
                    id: 7,
                    text: 'XMR/USDT',
                    redirectTo: null
                }
            ]
        },
        copyTimess: {
            type: Number,
            default: 2
        },
        speed: {
            type: Number,
            default: 15 // seconds
        }
    },
    data() {
        return {
            dailyDetails: [],
            itype: 'margin',
            copyTimes: 2,
            movingDistance: 0,
            windowWidth: null,
            marqueeBox: null,
            marqueeArea: null,
            time: 3
        }
    },
    computed: {
        ...mapGetters('market', ['currentMarketType']),
        boxStyles() {
            return {
                transform: `translateX(-${this.movingDistance}px)`,
                animationDuration: `${this.time}s`,
            };
        },
        marketCurrencies: function () {
            let itype = 1
            if (this.currentMarketType == 'spot' || this.currentMarketType == 'margin') {
                itype = 0
            }


            const filteredArray = this.dailyDetails.filter((detail) => {
                let condition = detail.itype == itype
                let hasMultiple = true




                if (this.currentMarketType == 'self') {
                    condition = detail.self == true
                } else if (this.currentMarketType == 'margin') {
                    const borrowmultiple = this.getSymbInfo(detail.ctid).borrowmultiple
                    hasMultiple = borrowmultiple > 0
                }

                return condition && hasMultiple
            })


            const updatedArr = filteredArray.map(item => {
                let redirectTo = ''

                let name = `${item.symble.toUpperCase()}`
                const symbleName = (item.symble.replace("/", "_")).toLowerCase();
                if (this.currentMarketType == 'margin') {
                    name = `${name}`
                    redirectTo = `/margin-pro/${symbleName}`
                } else if (this.currentMarketType == 'spot') {
                    redirectTo = `/deal-pro/${symbleName}`
                } else if (this.currentMarketType == 'future') {
                    name = `${item.symble.split("/")[0].toUpperCase()}/USDT`
                    if (this.$store.getters.get_contractType == 1) {
                        redirectTo = `/contract-pro/${symbleName}&contractType=1`
                    } else {
                        redirectTo = `/contract-pro/${symbleName}`
                    }
                }

                else if (this.currentMarketType == 'self') {

                    if (item.itype == 1) {
                        name = `${item.symble.split("/")[0].toUpperCase()} <span class="gray-txt-color">${this.$t("contract.swap")}</span>`
                        if (this.$store.getters.get_contractType == 1) {
                            redirectTo = `/contract-pro/${symbleName}&contractType=1`
                        } else {
                            redirectTo = `/contract-pro/${symbleName}`
                        }
                    }
                    if (item.itype == 0) {
                        const borrowmultiple = this.getSymbInfo(item.ctid).borrowmultiple
                        if (borrowmultiple > 0) {
                            name = `${name} <span class="margin-label">${this.getSymbInfo(item.ctid).borrowmultiple}X</span>`
                            redirectTo = `/margin-pro/${symbleName}`
                        } else {
                            redirectTo = `/deal-pro/${symbleName}`
                        }
                    }
                }
                return {
                    ...item,
                    displayName: name,
                    redirectTo: redirectTo,
                }

            })


            return updatedArr
        }
    },
    watch: {
        windowWidth(newWidth) {
            this.onWidthChange();
        },
    },
    methods: {
        setMarquee() {
            this.copyTimes = 1;
            this.$nextTick(() => {
                const marqueeArea = this.$refs.marqueeArea
                const marqueeBox = this.$refs.marqueeBox
                const areaWidth = marqueeArea ? Math.floor(marqueeArea.offsetWidth) : 0;
                const boxWidth = marqueeBox ? Math.floor(marqueeBox.offsetWidth) : 0;
                this.copyTimes = Math.max(2, Math.ceil((areaWidth * 2) / boxWidth)) || 2;
                this.movingDistance = boxWidth * Math.floor(this.copyTimes / 2);

                this.time = parseFloat(((this.time * this.movingDistance) / 375).toFixed(2));
                console.log(this.time)
            });
        },
        onWidthChange() {
            this.setMarquee();
        },
        dailyDetailGetAll() {
            this.$store.dispatch('quotation_daily_getall', {
                iscontract: 2,
                displaylocation: 0,
                pageIndex: 1,
                pageSize: 300
            }).then(({ data }) => {
                this.dailyDetails = data.pagedata;

            })
        },

        getlimitprice(item) {
            const p = this.global_get_limitprice(item);
            if (item.c - item.o < 0) {
                return '-' + p;
            } else {
                return '+' + p;
            }
        },
        getSymbInfo(ctid) {
            var symbleinfo = this.$store.state.symbleinfos.filter((citem) => {
                return citem.id == ctid;
            })[0];
            return symbleinfo ? symbleinfo : {};
        },
        stopAnimations() {
            const elements = document.querySelectorAll('.marquee__group');
            elements.forEach(element => {
                element.classList.add('marquee-paused');
            });
        },
        resumeAnimations() {
            const elements = document.querySelectorAll('.marquee__group');
            elements.forEach(element => {
                element.classList.remove('marquee-paused');
            });
        },
        goDeal(tradedata) {
            return this.$router.push(tradedata.redirectTo);
        },
    },
    mounted() {
        this.dailyDetailGetAll();
        this.setMarquee();
        window.addEventListener("resize", () => {
            this.windowWidth = window.offsetWidth
        });
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onWidthChange);
    },
}
</script>
<style lang="less" scoped>
@keyframes boxMove {
    from {
        transform: translateX(0);
    }
}

@import "../../static/styles/color";

#coinlistheader {
    background: #12181D;
    position: relative;
    overflow: hidden;
    padding: 12px 0px;
    margin-bottom: 6px;

    .market-change-content {
        margin: 0 35px;
        overflow: hidden;

        .marquee-box {
            display: flex;
            justify-content: space-between;
            align-items: center;
            animation: boxMove 10s linear infinite;

            .marquee-box-first {
                .coin-txt {
                    font-size: 14px;
                    color: @cl_ADB1B8;
                    display: flex;
                    margin-left: 30px;
                }

                .coin-green {
                    color: #00C076;
                }

                .coin-red {
                    color: #f6465d
                }
            }
        }

        .marquee-box:hover {
            animation-play-state: paused;
        }
    }
}

.day {
    #coinlistheader {
        background-color: #fff;
    }

    .marquee-box-first {
        .coin-txt {
            color: @--top-bar-market-text !important;
        }
    }


}
