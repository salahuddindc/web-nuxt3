<template>
    <div>

        <div class="invite-innertable">
            <a-table :columns="columns" :data-source="invitedRecord.pagedata" :expandIconColumnIndex="4"
                :expandIconAsCell="false" class="components-table-demo-nested"
                :rowKey="(record) => { return 'outer-' + record.key }">
                <span slot-scope="text,row" slot="invitatdate">
                    {{ global_get_local_time(row.invitatdate).format("YYYY-MM-DD hh:mm ") }}
                </span>
                <span slot-scope="text,row" slot="totalamount">
                    ≈ {{ row.totalamount }}
                </span>
                <a-table class="nested-invite-table" slot="expandedRowRender" slot-scope="record"
                    :columns="childColumns" :data-source="record.rebatedatas" :pagination="false"
                    :rowKey="(record) => { return 'inner-' + record.key }">
                </a-table>

            </a-table>
        </div>

    </div>
</template>

<script>
export default {
     
    props: {
        invitedRecord: {
            type: Object,
        },
    },
    data() {
        return {
            show: false,
            columns: [
                {
                    title: this.$t("Invite.invite_reg_info"),
                    dataIndex: "userid",
                    key: "userid",
                    scopedSlots: { customRender: 'userid' },
                    
                },
                {
                    title: this.$t("Invite.invite_ref_count"),
                    dataIndex: "invitationcount",
                    key: "invitationcount",
                    
                },
                {
                    title: this.$t("Invite.invite_hist_performance"),
                    dataIndex: "totalamount",
                    key: "totalamount",
                    scopedSlots: { customRender: 'totalamount' },
                    
                },
                {
                    title: this.$t("Invite.invite_create_time"),
                    dataIndex: "invitatdate",
                    key: "invitatdate",
                    scopedSlots: { customRender: 'invitatdate' },
                   
                },
                {
                    title: this.$t("Invite.invite_details"),
                    align: 'right'
                }
            ],
            childColumns: [
                {
                    title: this.$t("Invite.invite_reg_info"),
                    dataIndex: "userid",
                    key: "userid",
                    scopedSlots: { customRender: 'userid' },
                },
                {
                    title: this.$t("Invite.invite_ref_count"),
                    dataIndex: "invitationcount",
                    key: "invitationcount",
                },
                {
                    title: this.$t("Invite.invite_hist_performance"),
                    dataIndex: "totalamount",
                    key: "totalamount",
                },
                {
                    title: this.$t("Invite.invite_create_time"),
                    dataIndex: "invitatdate",
                    scopedSlots: { customRender: 'invitatdate' },
                    key: "invitatdate",
                }
            ],
        };
    },
    methods: {
        showDetail(k) {
            this.show = !this.show;
            this.$set(k, "show", !k.show);
        },
        getCurrency(id) {
            return this.$store.state.currencyinfos.filter(
                (item) => item.id == id
            )[0];
        },
    },
    mounted() { },
};
</script>

