<template>
    <span :class="elementClass + ' ml-1'" :data-clipboard-target="target" @click="copy()" v-if="Text==false">
        <svg height="17px" width="15px" class="svg-icon pointer copy-icon-mb" id="copyimage">
            <use :xlink:href="`/images/svg/sprite.svg#${sourceimage}`"></use>
        </svg>
    </span>
    <span :class="elementClass + ' ml-1'" :data-clipboard-text="target" @click="copy()" v-else>
        <svg height="17px" width="15px" class="svg-icon pointer copy-icon-mb" id="copyimage">
            <use :xlink:href="`/images/svg/sprite.svg#${sourceimage}`"></use>
        </svg>
    </span>
</template>

<script>
import Clipboard from 'clipboard';
export default {
    name: 'AppFormModelItem',
    props: {
        target: {
            type: String
        },
        elementClass: {
            type: String
        },
        copyImage: {
            type: String,
            default: 'copy-icon-icon'
        },
        checkIcon: {
            type: String,
            default: 'check-icon-icon' //copy-active
        },
        srcImage: {
            type: String,
            default: null
        },
        Text: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            sourceimage: this.srcImage ? this.srcImage : "copy-icon-icon"
        }
    },
    methods: {
        copy() {
            let a = '.' + this.elementClass;
            let clipboard = new Clipboard(a,function (trigger) {
                return "hello";
            });
            clipboard.on('success', e => {
                this.$store.commit('set_message', { type: 'ok', text: this.$t('patch.copysuccess') });
                clipboard.destroy();
                document.getSelection().removeAllRanges();
                this.sourceimage = this.checkIcon


                setTimeout(() => {
                    this.sourceimage = this.copyImage
                }, 1500)
            });
            clipboard.on('error', e => {
                console.log(e)
                this.$store.commit('set_message', { type: 'error', text: this.$t('texts.txt13') });
                clipboard.destroy();
            });
        }
    },
}
</script>

<style lang="scss" scoped></style>
