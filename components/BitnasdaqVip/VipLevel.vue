<template>
    <div class="vip-level mt-6">
        <div class="main-content">
            <p class="main-heading mb-2 text-black fw-5">{{ $t('tableskeys.vt1') }}</p>
            <p class="main-decs text-black fw-4 mb-0">{{ $t('vip_pro.vip_note') }}</p>
            <ClientOnly>
                <!-- <carousel :perPage="vipLevels.length > 7 ? 7 : vipLevels.length" :loop="false" :speed="1500"
                    :navigationEnabled="true" :autoplay="false" :perPageCustom="[[300, 1],[500, 2],[900, 3],[1100, 3], [1200, 4], [1400, 4]]"
                    :scrollPerPage="false" :paginationEnabled="false" ref="carasoul">
                    <slide v-for="(list, index) in vipLevels" :key="index" class="level-list-col">

                        <VipLevelCard :vipInfo="vipInfo" :list="list" />

                    </slide>
                </carousel> -->
            </ClientOnly>
        </div>
    </div>
</template>

<script>
// import carousel from '@/plugins/carousel/Carousel';
// import slide from '@/plugins/carousel/Slide';
// import select from '@/components/security/deal_select'
 
import VipLevelCard from './VipLevelCard.vue';
export default {
    components: {
        // carousel, slide,
        // "hex-select": select,
        VipLevelCard
    },
    props: {
        vipInfo: Object,
        default: () => { }
    },
    data() {
        return {
            vipLevels: [],

        }
    },
    methods: {
        async getVipLevels() {
            try {
                const { data } = await this.$store.dispatch('com_constants_getconstantsinfo', { key: "Vip_ConfigSetting" })
                if (data) {
                    this.vipLevels = JSON.parse(data);


                }
            } catch (error) {
                //console.log('Error', error)
            }


        }
    },
    async mounted() {
        await this.getVipLevels()

    }
}
</script>

<style></style>

