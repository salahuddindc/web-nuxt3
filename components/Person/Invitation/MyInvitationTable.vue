<template>
  <a-row>
    <a-col :lg="24">
      <div class="invitation-tabs">
        <a-card class="tabs-card" :bordered="false">
          <a-tabs default-active-key="1" @change="changeTab">
            <a-tab-pane key="1" :tab="$t('tabkeys.tab61')">

              <InviteTable :invitedRecord="invitedRecord" class="pt-3" />
            </a-tab-pane>
            <a-tab-pane key="2" :tab="$t('tabkeys.tab62')">
              <div class="pt-3">
                <a-table :columns="incomeColumns" :pagination="false" :data-source="earnings"
                  :rowKey="(record) => record.key">
                  <template #bodyCell="{ column, text, record }">
                    <template v-if="column.dataIndex === 'time'">
                      <div>
                        <span>{{ global_get_local_time(record.createtime).format('YYYY-MM-DD HH:mm:ss') }}</span>
                      </div>

                    </template>
                  </template>
                </a-table>
              </div>
              <div class="text-right p-5 py-4" v-if="total > 0">
                <a-pagination background @change="handChange" :page-size="page.pagesize" :current="page.pageindex"
                  popper-class="paging" layout="prev, pager, next" :total="total">
                </a-pagination>
              </div>
            </a-tab-pane>
          </a-tabs>
        </a-card>
      </div>
    </a-col>
  </a-row>
</template>
<script>
import InviteTable from '@/components/person/Invitation/InviteTable'
export default {
  components: {
    InviteTable
  },
  data() {
    return {
      loading: false,
      total: "",
      found: false,
      changeState: 1,
      totalPrice: 0,
      totalrate: [],
      page: {
        pagesize: 10,
        pageindex: 1
      },
      searchParam: {},
      earnings: [],
      invitedRecord: {},//邀请记录
      incomeColumns: [
        {
          title: this.$t("tableskeys.ms1"),
          dataIndex: 'time',
          key: 'time',
          width: 120,

        },
        {
          title: this.$t("tableskeys.ms4"),
          dataIndex: 'remark',
          width: 220,

        },
        {
          title: this.$t("tableskeys.ms5"),
          dataIndex: 'amount',
          key: 'amount',
          width: 100,

        },
        {
          title: this.$t("tableskeys.ms6"),
          dataIndex: 'typename',
          width: 120,

        },
      ]
    }
  },
  mounted() {
    this.getlways();
    this.loading = true;
    this.getInviteRecord();
  },
  watch: {
    '$store.state.hex_client_exchange.active': function (val) {
      this.getrate();
    }
  },
  methods: {
    changeTab(val) {//tab 切换
      this.changeState = val;
      this.loading = true;
      this.total = '';
      this.found = false;
      if (val == '1') {
        this.getInviteRecord();
      } else {
        this.getinvitedearnings();
      }
    },
    close() {
      this.moreTextModel = false
    },
    handChange(val) {//切换分页器
      if (this.changeState == 1) {
        this.getInviteRecord(val);
      } else {
        this.getinvitedearnings(val);
      }
    },
    getrate() {
      this.totalPrice = 0;
      this.totalrate.forEach((item) => {
        this.totalPrice = this.$np.plus(this.totalPrice, this.$store.getters.get_client_exchange_rate(item.currencyname, item.amount));
      })
    },
    getlways() {//总汇率
      this.page.pageindex = 1;
      var postData = Object.assign(this.searchParam, this.page, { uid: $userinfo.value.uid + "", key: $userinfo.value.secretkey, pagesize: this.page.pagesize });
      this.$store.dispatch('user_assets_record_type_total_getlist', postData).then(({ data }) => {
        if (data && data.pagedata.length > 0) {
          this.totalrate = data.pagedata;
          this.getrate();
        }
      })
    },
    getinvitedearnings(pageIndex) {//获取用户收益记录
      this.page.pageindex = pageIndex ? pageIndex : 1;
      this.searchParam['assestypes'] = [14];
      var postData = Object.assign(this.searchParam, this.page, { uid: $userinfo.value.uid, key: $userinfo.value.secretkey, pagesize: this.page.pagesize });
      pageIndex ? postData.pageindex = pageIndex : postData.pageindex = 1;
      this.$store.dispatch('user_assets_record_getlist', postData).then(({ data }) => {
        if (data) {
          this.earnings = data.pagedata;
          this.total = data.totalitemcount;
        } else {
          this.total = 0;
          this.earnings = [];
        }
        this.loading = false;
      })
    },
    getInviteRecord(pageIndex) {//获取邀请记录
      let paging;
      pageIndex ? paging = pageIndex : paging = 1;
      this.$store.dispatch('user_invitationrecord_pagedlist', {
        pagesize: 10,
        pageindex: paging,
        type: 1
      }).then(({ data }) => {
        if (data) {
          this.total = data.totalitemcount;
          this.invitedRecord = data;
        } else {
          this.total = 0;
          this.invitedRecord = [];
        }
        this.loading = false;
        this.total > 0 ? this.found = false : this.found = true;
      })
    },
  }
}
</script>

<style lang="scss">
@use '@/assets/scss/pages/user-center/invite.scss';
</style>