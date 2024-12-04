<template>
    <AppSelect :showSearch="false" :type="$t('placeholders.select_country')" :order="countryList" market="Select"
        @searchData="onChange" />
</template>

<script> 
export default {
    name: 'CountriesDropdown',
    props: {

        value: {
            type: [String, Number],
            default: undefined,
        },
        label: {
            type: Number | String,
            default: null
        },
        prop: {
            type: String,
            default: null
        },
        countries: {
            type: Array,
            required: true
        }
    },
    
    data() {
        return {
            countryOpen: false,
            countrySearch: '',
            localValue: this.value == '' ? undefined : this.value,
        }
    },
    watch: {
        value(propValue) {
            this.localValue = propValue == '' ? undefined : propValue
        },
    },
    computed: {
        countryList: function () {
            const _self = this;
            if (_self.countrySearch !== '') {
                return this.countries.filter((country) => country.value.toLowerCase().includes(_self.countrySearch))
            }
            return this.countries
        }
    },
    methods: {
        onCountryOpen() {
            this.countryOpen = true
            this.$nextTick(() => {
                this.$refs.countrySearch?.focus()
            })
        },

        setCountryOpen(bool) {
            if (this.countryOpen == bool) {
                return
            }
            if (!bool) {
                this.$nextTick(() => {
                    this.countryOpen = bool
                    this.countrySearch = '';
                })

            }
            else {
                this.countryOpen = bool;
            }
        },
        onChange(country) {
            this.$emit('onChange', country)
        }
    }
}
</script>

<style lang="scss" scoped></style>