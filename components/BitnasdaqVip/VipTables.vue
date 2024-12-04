<template>
    <div class="vip-tables">
        <a-table :columns="vipColumns" :data-source="vipData" :pagination="false" :rowKey="(record,index ) => index" :loading="loading">
            <template v-for="(item) in slotsColumns" :slot="item.scopedSlots.customRender" slot-scope="text,row,index" >
                <slot :name="item.scopedSlots.customRender" :row="row" :index="index"></slot>
            </template>
        </a-table>
    </div>
</template>

<script>
export default {
    props: {
        vipColumns: {
            type: Array,
        default: () => [],
        },
        vipData: {
            type: Array,
        default: () => [],
        },
        loading:{
            type:Boolean
        }
    },
    computed:{
        slotsColumns(){
            return this.vipColumns.filter(item=>item.scopedSlots)
        }
    },
    data() {
        return {

        }
    },
}
</script>

<style>

</style>
