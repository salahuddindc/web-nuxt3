<template>
  <div class="tabs">
    <div v-if="!loadingRewardCard" class="pt-6">
      <a-row :gutter="16" class="reward-section mb-5 col-alignment">
        <a-col :xs="14" :lg="14">
          <p class="welcom-txt text-black fw-5 mb-0">{{ $t('subscribe_to_our_exciting_rewards') }}</p>
        </a-col>
        <a-col :xs="10" :lg="10" align="end">
          <img :src="!prev ? '/images/disable-left-img.svg' : '/images/active-left-img.svg'" class="mr-3"
            @click="triggerPageAdvance('backward')" />
          <img :src="!next ? '/images/disable-right-img.svg' : '/images/active-right-img.svg'"
            @click="triggerPageAdvance()" />

        </a-col>
      </a-row>
      <a-row :gutter="24">
        <a-col :lg="24">
          <ClientOnly>
            <!-- <carousel :perPage="welfareInfos.length > 3 ? 3 : welfareInfos.length" :loop="false" :speed="1500"
              :autoplay="false" :perPageCustom="[[300, 1], [600, 2], [1000, 3], [1100, 3], [1200, 3], [1400, 3]]"
              :scrollPerPage="false" @watchNext="watchNext" @watchPrev="watchPrev" :paginationEnabled="false"
              ref="carasoul">
              <slide v-for="(list, key) in welfareInfos" :key="key">
                <RewardCard @onReceived="onReceived" :list="list" :getWelfareInfos="getWelfareInfos" :index="key" />
              </slide>
            </carousel> -->
          </ClientOnly>

        </a-col>
      </a-row>
    </div>
    <div v-else>
      <a-spin style="height:40vh; display:flex; justify-content:center; align-items:center; background:#FDFDFD;">
        <!-- <a-icon slot="indicator" type="loading" style="font-size: 24px; " spin /> -->
        <LoadingOutlined style="font-size: 24px; " />
      </a-spin>
    </div>
    <a-row v-if="loggedIn" class="pt-6">
      <a-col :lg="14">
        <p class="welcom-txt text-black fw-5 mb-0">{{ $t('reward_history') }}</p>
      </a-col>
      <a-col :lg="24">
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" :tab="$t('rewardhub.rew2')">
            <a-row :gutter="[16, 16]" class="mt-5 px-0 pb-2">
              <a-col :sm="5" :lg="4" class="">
                <AppSelect ref="type" :type="0" :order="types" market="Select" @searchData="searchData" @change="change"
                  @clearCurrentState="clearCurrentState" />
              </a-col>
              <a-col :sm="6" :lg="5">
                <a-range-picker @change="changeDate" v-model="calender" />
              </a-col>
              <a-col :sm="2" :lg="1" class="some-code-btn-space">
                <span @mouseover="hoverKey = 2" @mouseleave="hoverKey = -1">
                  <a-button block class="outline-btn fw-5 px-2 reload-icon" @click="resetSelect">
                    <ReloadOutlined />

                  </a-button>
                </span>
              </a-col>
            </a-row>
            <a-table :columns="recieveColums" :pagination="false" :data-source="welfareRecords"
              :rowKey="(record) => record.key" :loading="loadingTable" class="my-4 reward-receive-record">
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'type'">
                  <div>
                    <p class="mb-0">{{ record.fundtype == 0 ? $t('values.val13') : record.fundtype == 1 ?
                      $t('values.val14') :
                      ''
                      }}
                    </p>
                  </div>
                </template>
                <template v-if="column.key === 'amount'">
                  <div>
                    <p class="mb-0">{{ record.amount }} {{ getCurrency(record.currencyid) }}</p>
                  </div>
                </template>
                <template v-if="column.key === 'createTime'">
                  <div>
                    <p class="mb-0">{{ global_get_local_time(record.createtime, "YYYY-MM-DD HH:mm:ss") }}</p>
                  </div>
                </template>
                <template v-if="column.key === 'expiredTime'">
                  <div>
                    <p class="mb-0">{{ global_get_local_time(record.expiredtime, "YYYY-MM-DD HH:mm:ss") }}</p>
                  </div>
                </template>
                <template v-if="column.key === 'status'">
                  <div>
                    <p class="mb-0 success-active">{{ $t('rewardhub.rew4') }}</p>
                  </div>
                </template>
              </template>
            </a-table>

            <a-row v-if="total > 0">
              <a-col :lg="24" class="text-right py-4">
                <a-pagination background @change="handChange" :page-size="page.pagesize" :current="page.pageindex"
                  popper-class="paging" layout="prev, pager, next" :total="total">
                </a-pagination>
              </a-col>
            </a-row>

          </a-tab-pane>
          <a-tab-pane key="2" :tab="$t('rewardhub.rew3')">
            <a-table :columns="usedColums" :pagination="false" :data-source="welfareAssetsRecords"
              :rowKey="(record) => record.key" :loading="loadingTable" class="my-4">
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'type'">
                  <div>
                    <p class="mb-0">{{ row.fundtype == 0 ? $t('values.val13') : row.fundtype == 1 ? $t('values.val14') :
                      ''
                      }}
                    </p>
                  </div>
                </template>
                <template v-if="column.key === 'token'">
                  <div>
                    <p class="mb-0">{{ getCurrency(row.currencyid) }}</p>
                  </div>
                </template>
                <template v-if="column.key === 'amount'">
                  <div>
                    <p class="mb-0">{{ row.amount }}</p>
                  </div>
                </template>
                <template v-if="column.key === 'createTime'">
                  <div>
                    <p class="mb-0">{{ global_get_local_time(row.createtime).format('YYYY-MM-DD HH:mm:ss') }}</p>
                  </div>
                </template>
                <template v-if="column.key === 'expiredTime'">
                  <div>
                    <p class="mb-0">{{ global_get_local_time(row.expiredtime).format('YYYY-MM-DD HH:mm:ss') }}</p>
                  </div>
                </template>
                <template v-if="column.key === 'status'">
                  <div>
                    <p class="mb-0 success-active">{{ $t('rewardhub.rew4') }}</p>
                  </div>
                </template>
              </template>
            </a-table>

            <a-row v-if="walfareAssetCount > 0">
              <a-col :lg="24" class="text-right py-4">
                <a-pagination background @change="handChange" :page-size="page.pagesize" :current="page.pageindex"
                  popper-class="paging" layout="prev, pager, next" :total="total">
                </a-pagination>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </a-col>
    </a-row>


  </div>
</template>

<script>
import RewardCard from '@/components/RewardsHub/RewardCard.vue'


// import carousel from '@/plugins/carousel/Carousel';
// import slide from '@/plugins/carousel/Slide';
export default {
  components: {
    // carousel, slide,
    RewardCard,
  },
  computed: {
    types: function () {
      return [
        {
          id: 0,
          value: this.$t('values.val13'),//资产流水
          type: 'type'
        },
        {//类型
          id: 1,//状态
          value: this.$t('values.val14'),//杠杆流水
          type: 'type'
        }
      ]
    },
    loggedIn() {
      return $userinfo.value.uid != undefined
    }
  },
  data() {
    return {
      hoverKey: -1,
      welfareInfos: [],
      welfareRecords: [],
      next: false,
      prev: false,
      welfareAssetsRecords: [],
      walfareAssetCount: 0,
      tab: '1',
      total: 0,
      found: false,
      loadingRewardCard: true,
      loadingTable: false,
      searchParam: {},
      page: {
        pageindex: 1,
        pagesize: 10,
      },
      calender: [],
      recieveColums: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: 175,
        },
        {
          title: this.$t("tableskeys.tt2"),
          dataIndex: 'type',
          key: 'type',
          width: 160,
        },
        {
          title: this.$t("tableskeys.lh5"),
          dataIndex: 'amount',
          key: 'amount',
          width: 150,
        },
        {
          title: this.$t("tableskeys.wa6"),
          dataIndex: 'createtime',
          key: 'createtime',
          width: 180,
        },
        {
          title: this.$t("tableskeys.wc8"),
          dataIndex: 'expiredtime',
          key: 'expiredTime',
          width: 180,
        },
        {
          title: this.$t("tableskeys.tt4"),
          dataIndex: 'status',
          key: 'status',
          width: 80,
          align: 'end'

        },
      ],
      usedColums: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          width: 80,
        },
        {
          title: this.$t("tableskeys.wc9"),
          dataIndex: 'type',
          key: 'type',
          width: 120,
        },
        {
          title: this.$t("tableskeys.bh6"),
          dataIndex: 'token',
          key: 'token',
          width: 120,
        },
        {
          title: this.$t("tableskeys.lh5"),
          dataIndex: 'amount',
          key: 'amount', 
          width: 120,
        },
        {
          title: this.$t("tableskeys.wc10"),
          dataIndex: 'typename',
          key: 'typename',
          width: 120,
        },
        {
          title: this.$t("tableskeys.tt5"),
          dataIndex: 'createtime',
          key: 'createTime',
          width: 80,
          align: 'end'
        },
      ],
    }
  },
  watch: {
    'route.params': {
      handler() {
        if (this.tab == '1') {
          this.getWelfareRecords();
        } else if (this.tab == '2') {
          this.getWelfareAssetsRecords();
        }
      },
      immediate: true
    }
  },
  methods: {
    watchNext(object) {
      this.next = object
    },
    watchPrev(object) {
      this.prev = object
    },
    triggerPageAdvance(direction) {
      console.log(this.$refs.carasoul.handleNavigation(direction))
    },
    onReceived(val) {
      this.$emit('onReceived', val)
    },
    async getWelfareInfos() {
      try {
        const { data } = await this.$store.dispatch('get_wefareinfos_get')
        if (data) {
          this.welfareInfos = data;
          this.loadingRewardCard = false;
        }
      } catch (error) {
        this.loadingRewardCard = false;
      }
    },
    async getWelfareRecords(pageIndex) {
      this.total = 0;
      this.loadingTable = true;
      this.page.pageindex = pageIndex ? pageIndex : 1;
      var postData = Object.assign(this.searchParam, this.page);
      try {
        const { data } = await this.$store.dispatch('get_wefarerecords_get', postData)
        if (data) {
          console.log('data.totalitemcount', data.totalitemcount)
          this.welfareRecords = data.pagedata;
          this.total = data.totalitemcount;
        }
        else {
          this.total = 0;
          this.welfareRecords = [];
        }
        this.loadingTable = false;
      } catch (error) {
        this.loadingTable = false;
      }
    },
    async getWelfareAssetsRecords(pageIndex) {
      this.walfareAssetCount = 0;
      this.loading = true;
      this.page.pageindex = pageIndex ? pageIndex : 1;
      var postData = Object.assign(this.searchParam, this.page);
      try {
        const { data } = await this.$store.dispatch('get_welfare_assets_records_get', postData)
        if (data) {
          console.log('data.totalitemcount', data.totalitemcount)
          this.welfareAssetsRecords = data.pagedata;

          this.walfareAssetCount = data.totalitemcount;
        }
        else {
          this.walfareAssetCount = 0;
          this.welfareAssetsRecords = [];
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
      }
    },
    getCurrency(id) {
      return this.$store.state.currencyinfos.filter(item => item.id == id)[0].currencyname;
    },
    changeTab(e) {
      if ($userinfo.value.uid) {
        this.resetSelect();
      }
    },
    search() {
      if (this.tab == '1') {
        this.getWelfareRecords();
      } else if (this.tab == '2') {
        this.getWelfareAssetsRecords();
      }
    },
    changeDate(date, dateString) {
      this.searchParam['startTime'] = new Date(dateString[0]);
      this.searchParam['endTime'] = new Date(dateString[1]);
      this.searchParam['endTime'].setHours(23, 59, 59, 999);
      this.search();
    },
    handChange(val) {
      if (this.tab == '1') {
        this.getWelfareRecords(val)
      } else if (this.tab == '2') {
        this.getWelfareAssetsRecords(val);
      }
    },
    searchData(val) {//用于存子组件传过来数据
      this.searchParam[val.type] = val.id;
      this.search();
    },
    change(val) {
      const _self = this;
      switch (val) {
        case 'types':
          _self.$refs.types?.changeBack();
          break;
      }
    },
    clearCurrentState(id) {
      this.searchParam[id] = {};
    },
    resetSelect() {
      this.$refs.types?.clearStatus();
      this.calender = []
      this.searchParam = {};
      this.search();
    },
  },
  mounted() {
    this.getWelfareInfos();
    if (this.loggedIn) {
      this.getWelfareRecords(1);
      this.getWelfareAssetsRecords(1);
    }
  }
}
</script>
