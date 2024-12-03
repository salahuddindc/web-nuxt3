<template>
  <div>
    <a-row :gutter="24">
      <a-col
      :xs="24"
        :sm="24"
        :md="12"
        :lg="8"
        v-for="(list, key) in earnCommissionDetail"
        :key="key"
        class="px-0"
      >
        <a-card :bordered="false">
          <div>
            <img :src="list.icon" alt="" height="100" />
            <img :src="list.num" alt="" class="ml-5" />
          </div>
          <h6 class="secondary-black fw-5 my-3">{{ list.title }}</h6>
          <p class="secondary-black fw-4 mb-0">{{ list.desc }}</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      earnCommissionDetail: [
        {
          num: "/images/01.svg",
          icon: "/images/earn-com1.svg",
          title: this.$t("agent_plan.ap9"),
          desc: this.$t("agent_plan.ap10"),
          isSubmitForm: true,
        },
        {
          num: "/images/02.svg",
          icon: "/images/earn-com2.svg",
          title: this.$t("agent_plan.ap11"),
          desc: this.$t("agent_plan.ap12"),
          isSubmitForm: false,
        },
        {
          num: "/images/03.svg",
          icon: "/images/earn-com3.svg",
          title: this.$t("agent_plan.ap13"),
          desc: this.$t("agent_plan.ap14"),
          isSubmitForm: false,
        },
      ],
    };
  },
};
</script>