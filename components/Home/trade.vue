<template>
  <a-table :columns="columns" :pagination="false" :dataSource="copyMarketData" rowKey="ctid" :show-header="true"
    :loading="loading" :customRow="goDealNew" class="mt-2">
    <template #bodyCell="{ column, record }">
      <template v-if="column.key === 'symble'">
        <div>
          <div class="pointer">
            <img :src="record.logo" width="24px" height="24px" class="mr-3" />
            <span>
              <span class="symbolFrom fw-6 secondary-black">{{ getSymble(record.symble).from }}</span>
              <span v-if="record.itype != '1'" class="symbolTo fw-5 secondary-gray">
                /{{ getSymble(record.symble).to }}
              </span>
              <span v-else class="symbolTo ml-1 perpetual-txt fw-5">
                &nbsp;{{ $t("contract.swap") }}
              </span>
              <span class="margin-trade-txt" v-if="
                (tab == '-1' || record.itype == -1) &&
                $store.state.symbleinfos?.length > 0
              ">
                {{ record.borrowmultiple }}X
              </span>
            </span>
          </div>
        </div>

      </template>
      <template v-if="column.key === 'lastPrice'">
        <div>
          <p class="mb-0">
            ${{ global_get_tofixed(record.c, global_get_decimal(record.symble).p) }}
            <span class="read-more fw-5">
            </span>
          </p>
        </div>
      </template>
      <template v-if="column.key === 'volume'">
        <div>
          <p class="mb-0">
            {{ numFormatter(record.v) }}
          </p>
        </div>
      </template>
      <template v-if="column.key === 'change'">
        <div>
          <span :class="record.c - record.o < 0 ? 'red-active' : 'up-dark'">{{ getlimitprice(record) }}%<img :src="limitPrice(record.c, record.o) < 0
            ? '/images/red-up-arrow.svg'
            : '/images/green-blue-up-arrow.svg'
            " height="12" width="auto" class="ml-1 mb-1" /></span>
        </div>
      </template>
      <template v-if="column.key === 'action'">
        <div>
          <a-button class="trade-btn cancel-outline-btn fw-6" @click="
            goDeal(
              '' + record.symble + '',
              record.itype == 1 ? 'contract' : record.itype == -1 ? 'margin' : 'spot'
            )
            ">{{ $t("home.tradeDeal") }}</a-button>
        </div>
      </template>
    </template>

    <!--  -->
  </a-table>
</template>

<script>
export default {

  props: {
    marketdata: {
      type: Array,
    },
    getSymble: {
      type: Function,
    },
    getClientExchangeRate: {
      type: Function,
    },
    tab: {
      type: String,
    },
    symbleinfos: {
      type: Array,
    },
    marginFavorite: {
      type: Function,
    },
    _getDaily: {
      type: Function,
    },
    getFavorites: {
      type: Function,
    },
    getCoinInfo: {
      type: Function,
    },
    coinInfos: {
      type: Object,
    },
    loading: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isMobile: undefined,
      canvasary: [],
      bg: {
        buy: "rgba(74,196,158,0.000089)",
        buydark: "rgba(74,196,158,0.45)",
        buyline: "rgba(74,196,158,0.85)",
        sell: "rgba(255,129,141,000089)",
        selldark: "rgba(255,129,141,0.0045)",
        sellline: "rgba(255,129,141,0.85)",
      },
    };
  },
  computed: {
    columns() {
      // Define the columns for desktop view
      const desktopColumns = [
        {
          title: this.$t("tableskeys.tk1"),
          dataIndex: "symble",
          key: "symble",
          width: 170,
        },
        {
          title: this.$t("tableskeys.tk2"),
          dataIndex: "lastPrice",
          key: "lastPrice",
          width: 140,
        },
        {
          title: this.$t("tableskeys.tk5"),
          dataIndex: "change",
          key: "change",
          width: 140,
        },
        {
          title: this.$t("home_page.volume_home"),
          dataIndex: "volume",
          key: "volume",
          width: 120,
        },
        {
          title: this.$t("home.tradeOperation"),
          dataIndex: "action",
          key: "action",
          width: 100,
          align: "end",
        },
      ];



      return desktopColumns;
    },
    copyMarketData() {

      if (this.marketdata.length > 0) {
        return this.marketdata.slice(0, 8);
      } else return [];
    },
  },
  methods: {
    getlimitprice(item) {
      return (
        (item.c - item.o < 0 ? "-" : "+") + global_get_limitprice(item)
      );
    },
    handleRowClick(row) {
      goDeal(
        "" + row.symble + "",
        row.itype == 1 ? "contract" : row.itype == -1 ? "margin" : "spot"
      );
    },
    goDeal(coinid, ctype) {
      coinid = coinid.replace("/", "_").toLowerCase();
      if (ctype == "contract") {
        this.$router.push({ path: "/contract-pro/" + coinid });
      } else if (ctype == "margin") {
        this.$router.push({ path: "/margin-pro/" + coinid });
      } else {
        this.$router.push({ path: "/deal-pro/" + coinid });
      }
    },
    goDealNew(row) {
      return {
        on: {
          click: (event) => {
            var coinid = "" + row.symble + "";
            coinid = coinid.replace("/", "_").toLowerCase();
            const ctype =
              row.itype == 1 ? "contract" : row.itype == -1 ? "margin" : "spot";
            if (ctype == "contract") {
              this.$router.push({ path: "/contract-pro/" + coinid });
            } else if (ctype == "margin") {
              this.$router.push({ path: "/margin-pro/" + coinid });
            } else {
              this.$router.push({ path: "/deal-pro/" + coinid });
            }
          },
        },
      };
    },
    limitPrice: function (c, o) {
      let limit_price = Number((((c - o) / o) * 100).toFixed(2));
      return isNaN(limit_price) ? 0 : limit_price;
    },


  },
  mounted() {
  }
};
</script>

<style lang="scss" scoped>
.currency-curve {
  width: 100px;
  height: 40px;
  float: right;

  canvas {
    width: 100%;
    height: 100%;
  }
}
</style>
