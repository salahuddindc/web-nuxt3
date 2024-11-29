<template>
    <div class="beginner-guide mt-xs-6 mt-sm-12">
        <div class="main-content">
            <a-card :bordered="false" class="beginner-guide-card">
            <h2 class="mb-xs-2 mb-sm-3  lh-xs-28 lh-sm-48 secondary-black fw-6 text-center">{{$t('beginer_guide.bg1')}}</h2>
            <h6 class="fw-4 mb-xs-3 mb-sm-11 lh-16 text-center secondary-gray">{{$t('beginer_guide.bg15')}}</h6>

            <a-row :gutter="50" class="step-container">
                <a-col :xs="24" :sm="12" :md="12" :lg="6" class="step px-xs-4 px-sm-6" v-for="(step, key) in beginnersGuide" :key="key">
                        <a-tag class="tags mb-5 py-1 px-4">{{ step.tag }}</a-tag>
                       <div class="">
                        <h4 class="fw-5 secondary-black lh-24 mb-xs-2 mb-sm-6">{{ step.title }}</h4>
                        <h6 class="fw-4 secondary-gray mb-0 lh-24">{{ step.desc }}</h6>
                       </div>
                </a-col>
            </a-row>
            </a-card>
           
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            beginnersGuide: [
                {
                    tag: `${this.$t('activity.commission_4')} 1`,
                    title: this.$t('beginer_guide.bg7'),
                    desc: this.$t('beginer_guide.bg8')
                },
                {
                    tag: `${this.$t('activity.commission_4')} 2`,
                    title: this.$t('beginer_guide.bg11'),
                    desc: this.$t('beginer_guide.bg12')
                },
                {
                    tag: `${this.$t('activity.commission_4')} 3`,
                    title: this.$t('beginer_guide.bg9'),
                    desc: this.$t('beginer_guide.bg10')
                },
                {
                    tag: `${this.$t('activity.commission_4')} 4`,
                    title: this.$t('beginer_guide.bg13'),
                    desc: this.$t('beginer_guide.bg14')
                }
            ]
        }
    }
}
</script>

<style></style>