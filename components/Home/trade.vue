<template>
  <a-table :columns="columns" :pagination="false" :data-source="copyMarketData" rowKey="ctid" :show-header="true"
    :loading="loading" :customRow="goDealNew" class="mt-2">
    <div slot="pair" slot-scope="text, row">
      <div class="pointer">
        <img :src="row.logo" width="24px" height="24px" class="mr-3" />
        <span>
          <span class="symbolFrom fw-6 secondary-black">{{ getSymble(row.symble).from }}</span>
          <span v-if="row.itype != '1'" class="symbolTo fw-5 secondary-gray">
            /{{ getSymble(row.symble).to }}
          </span>
          <span v-else class="symbolTo ml-1 perpetual-txt fw-5">
            &nbsp;{{ $t("contract.swap") }}
          </span>
          <span class="margin-trade-txt" v-if="
            (tab == '-1' || row.itype == -1) &&
            $store.state.symbleinfos?.length > 0
          ">
            {{ row.borrowmultiple }}X
          </span>
        </span>
      </div>
    </div>
    <div slot="lastPrice" slot-scope="text, row">
      <p class="mb-0">
        ${{ global_get_tofixed(row.c, global_get_decimal(row.symble).p) }}
        <span class="read-more fw-5">
          <!-- {{ $store.getters.get_client_exchange_rate_name.mark }}  
                    {{ getClientExchangeRate(row) }} -->
        </span>
      </p>
    </div>
    <div slot="volume" slot-scope="text, row">
      <p class="mb-0">
        {{ numFormatter(row.v) }}
      </p>
    </div>

    <div slot="change" slot-scope="text, row">
      <span :class="row.c - row.o < 0 ? 'red-active' : 'up-dark'">{{ getlimitprice(row) }}%<img :src="limitPrice(row.c, row.o) < 0
          ? '/images/red-up-arrow.svg'
          : '/images/green-blue-up-arrow.svg'
        " height="12" width="auto" class="ml-1 mb-1" /></span>
    </div>
    <div slot="action" slot-scope="text, row">
      <a-button class="trade-btn cancel-outline-btn fw-6" @click="
        goDeal(
          '' + row.symble + '',
          row.itype == 1 ? 'contract' : row.itype == -1 ? 'margin' : 'spot'
        )
        ">{{ $t("home.tradeDeal") }}</a-button>
    </div>
  </a-table>
</template>

<script>
import NoData from "@/components/public/NoData";
export default {
  components: {
    NoData,
  },
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
      // copyMarketData:[],
      isMobile: undefined,
      /* columns: [
        {
          title: this.$t("tableskeys.tk1"),
          dataIndex: "pair",
          key: "pair",
          scopedSlots: { customRender: "pair" },
          width: 170,
        },
        {
          title: this.$t("tableskeys.tk2"),
          dataIndex: "lastPrice",
          key: "lastPrice",
          scopedSlots: { customRender: "lastPrice" },
          width: 140,
        },

        {
          title: this.$t("tableskeys.tk5"),
          dataIndex: "change",
          key: "change",
          scopedSlots: { customRender: "change" },
          width: 140,
        },
        {
          title: this.$t("home_page.volume_home"),
          dataIndex: "volume",
          key: "volume",
          scopedSlots: { customRender: "volume" },
          width: 120,
        },
        {
          title: this.$t("home.tradeOperation"),
          dataIndex: "action",
          key: "action",
          scopedSlots: { customRender: "action" },
          width: 100,
          align: "end",
        },
      ], */
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
          dataIndex: "pair",
          key: "pair",
          scopedSlots: { customRender: "pair" },
          width: 170,
        },
        {
          title: this.$t("tableskeys.tk2"),
          dataIndex: "lastPrice",
          key: "lastPrice",
          scopedSlots: { customRender: "lastPrice" },
          width: 140,
        },
        {
          title: this.$t("tableskeys.tk5"),
          dataIndex: "change",
          key: "change",
          scopedSlots: { customRender: "change" },
          width: 140,
        },
        {
          title: this.$t("home_page.volume_home"),
          dataIndex: "volume",
          key: "volume",
          scopedSlots: { customRender: "volume" },
          width: 120,
        },
        {
          title: this.$t("home.tradeOperation"),
          dataIndex: "action",
          key: "action",
          scopedSlots: { customRender: "action" },
          width: 100,
          align: "end",
        },
      ];

      if (this.xsScreen || this.smScreen) {
        return [
          {
            title: this.$t("tableskeys.tk1"),
            dataIndex: "pair",
            key: "pair",
            scopedSlots: { customRender: "pair" },
            width: 170,
          },
          {
            title: this.$t("tableskeys.tk2"), // Last Price
            dataIndex: "lastPrice",
            key: "lastPrice",
            scopedSlots: { customRender: "lastPrice" },
            width: 110,
          },
          {
            title: this.$t("tableskeys.tk5"), // Change
            dataIndex: "change",
            key: "change",
            scopedSlots: { customRender: "change" },
            width: 100,
          },
        ];
      }

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
        (item.c - item.o < 0 ? "-" : "+") + this.global_get_limitprice(item)
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
