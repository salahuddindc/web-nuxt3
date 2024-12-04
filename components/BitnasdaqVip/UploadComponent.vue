<template>
  <div>
    <a-upload action="" list-type="picture-card" v-model:value="localArray" @preview="handlePreview"
      @change="handleChange">
      <div v-if="fileList.length < 1">
        <img src="/images/upload-icon.svg" />
        <div class="ant-upload-text mt-2">{{ $t('person.pi16') }}</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script>
export default {
  props: {
    fileList: Array,
    previewVisible: Boolean,
    previewImage: String,
  },
  data() {
    return {
      localArray: []
    }
  },
  watch: {
    fileList: {
      handler: function (newVal) {
        this.localArray = newVal
      },
      immediate: true
    }
  },
  methods: {
    handleCancel() {
      this.$emit('cancel');
    },
    handlePreview(file) {
      this.$emit('preview', file);
    },
    handleChange({ fileList }) {
      this.$emit('change', { fileList });
      // const { fileList } = info;
      // if (fileList.length > 0) {
      //   const file = fileList[0];
      //   const imageURL = file.url || (window.URL.createObjectURL(file.raw));
      //   this.$emit('change', { fileList, imageURL });
      // } else {
      //   this.$emit('change', { fileList, imageURL: '' });
      // }
    },
  },
};
</script>
