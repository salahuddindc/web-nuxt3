<template>
    <div id="calculator">
        <Calculator />
    </div>
</template>

<script setup>
import { channelSubtitle } from "~/utils/constants";
import { useRoute } from "#app";
import { useStore } from "vuex";
import { useHead } from "#imports";

const route = useRoute();
const store = useStore();

// Fetching FAQs data and updating SEO metadata
const { data: faqs } = await useAsyncData("fetchFaqs", async () => {
    const arr = route.params.slug.split("-");
    const pastData = {
        channelid: 15,
        articeid: 0,
        subtitle: channelSubtitle.calculatorFaqs,
        isCalculator: true,
        coin: arr[0].toUpperCase(),
        fiat: arr[2].toUpperCase(),
        callFrom: "async",
    };

    await store.dispatch("article/fetchFaqs", pastData);
    return store.getters["article/getFaqs"];
});

// Commit SEO-related metadata
store.commit("setDescriptionSeo", faqs?.value?.meta_description || "");
store.commit("setTitleSeo", faqs?.value?.meta_title || "Calculator - Bitnasdaq");

// Setting body attributes using useHead
useHead({
    bodyAttrs: {
        class: "calculator-body",
    },
});
</script>

<style lang="scss">
@use '@/assets/scss/pages/calculator/calculator.scss';
</style>