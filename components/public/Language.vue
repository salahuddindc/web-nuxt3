<template>
    <div class="language">
        <a-modal :visible="isLanguage" width="800px" :footer="false" :title="false" @cancel="handleLanguageModal"
            class="exchange-language-modal">
            <a-row :gutter="16" class="px-4 ml-2">
                <a-col :lg="12">
                    <p class="rate-title fw-5 mb-0">{{ $t('public.lang1') }}</p>
                </a-col>
                <a-col :lg="12" align="end" @click="handleCancel" class="pointer">
                    <img src="/images/ud-cross.svg" />
                </a-col>
            </a-row>
            <a-divider class="language-divider" />
            <div class="scroll_div">
                <a-row :gutter="16" class="px-4 mx-2 mb-4">
                    <a-col :lg="12" class="pt-2">
                        <p class="mb-0 region-text fw-5">{{ $t('public.lang2') }}</p>
                    </a-col>
                    <a-col :lg="12">
                        <a-input ref="userNameInput" :placeholder="$t('placeholders.plh5')" v-model="searchedLang">
                            <span slot="prefix">
                                <img src="/images/search123.svg" />
                            </span>
                        </a-input>
                    </a-col>
                </a-row>
                <a-row :gutter="16" class="pt-4 mt-3 px-4 mx-2">
                    <a-col v-for="(list, key) in filteredLangList" :key="key" :lg="6"
                        @click.native="langFun(list.locale)">
                        <p class="mb-1 language-txt fw-4 pointer">{{ list.lang }}</p>
                    </a-col>
                </a-row>
            </div>
        </a-modal>
    </div>
</template>
<script>
import * as Cookie from "js-cookie";
export default {
    props: {
        isLanguage: {
            type: Boolean
        },
        handleLanguageModal: {
            type: Function
        }
    },
    data() {
        return {
            langActive: "",
            langShow: false,
            langname: "",
            langList: this.$store.state.hex_lang.locales,
            searchedLang: "",
        }
    },
    watch: {
        isLanguage: function (val) {
            if (val == true) {
                document.body.style = 'width:100% !important'
                this.clearSearchInput(); // Clear search input when modal opens
            }
        }
    },
    computed: {
        getLang: function () {
            return this.$store.state.hex_lang.locale;
        },
        filteredLangList() {
            return this.langList.filter((lang) =>
                lang.lang.toLowerCase().includes(this.searchedLang.toLowerCase())
            );
        },
    },
    created() {
        this.getLangName();
    },
    methods: {
        handleCancel() {
            this.handleLanguageModal()
        },
        getLangName() {
            let hex_lang = this.$store.state.hex_lang;
            var item = hex_lang.locales.find((item) => {
                if (item.locale == hex_lang.locale) {
                    return item;
                }
            });
            if (!item) {
                let _this = this;
                this.$store.dispatch("com_getlangbyip").then(({ data }) => {
                    var newlang = data.lang;
                    _this.langFun(newlang);
                    _this.falseFun();
                    item = hex_lang.locales.find((item) => {
                        if (item.locale == newlang) {
                            return item;
                        }
                    });
                    _this.langname = item.lang;
                });
            }
            this.langname = item?.lang || '';
        },
        ifgetLang(item) {
            return item == this.getLang;
        },
        falseFun() {
            this.langShow = !this.langShow;
        },
        langFun(lang) {
            this.$store.commit("set_lang", lang);
            this.$i18n.locale = lang;
            Cookie.set(this.$store.state.hex_lang.type, lang);
            const ex =
                lang == "zh_cn" || lang == "zh_hk"
                    ? "cny"
                    : lang == "ko_kr"
                        ? "krw"
                        : lang == "ja_jp"
                            ? "jpy"
                            : "usd";
            if (ex != "") {
                this.$store.commit("set_client_exchange", ex);
                Cookie.set(this.$store.state.hex_client_exchange.type, ex);
            }
            this.falseFun();
            this.getLangName();
            this.handleLanguageModal();
            if (lang) {
                window.location.reload()
            }
            // Clear search input after language is selected
            this.searchedLang = '';
        },
        clearSearchInput() {
            this.searchedLang = '';
        }

    },
}
</script>
<style></style>
