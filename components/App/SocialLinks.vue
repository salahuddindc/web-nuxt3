<template>
    <div id="social-links">
        <div class="social-icon mb-3" :class="customClass">

            <div v-for="(link, key) in getSocialLinks" :key="key" @mouseover="hoverKey = key"
                @mouseleave="hoverKey = -1" class="all-icon pointer">
                <a :href="link.url" target="_blank">
                    <nuxtImg class="" loading="lazy" width="25px" height="25px" :title="link.name"
                        :src="hoverKey == 2 ? link.icon : link.icon" />
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    data() {
        return {
            hoverKey: -1,
        };
    },
    props: {
        customClass: String
    },
    computed: {
        ...mapGetters("constants", ["getSocialLinks"]),
    },
};
</script>


<style lang="scss">
@use '@/assets/scss/pages/footer/social-links.scss';
</style>
