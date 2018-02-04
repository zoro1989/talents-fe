<template>
  <div class="talents-import">
    人才信息导入(选择Excel文件)
    <mu-raised-button label="选择文件"  @click="selectFile" primary/>
    <input type="file" style="display: none" ref="file" @change="onFileChange" />
    <tkm-loading ref="loading"></tkm-loading>
    <tkm-message ref="message" :message="message"></tkm-message>
  </div>
</template>
<script>
  import TkmLoading from 'components/tkm-loading'
  import talentsImport from 'service/talents-import'
  import {messageMinxin} from 'common/js/mixin'
  export default {
    mixins: [messageMinxin],
    components: {
      TkmLoading
    },
    methods: {
      selectFile() {
        this.$refs.file.click()
      },
      onFileChange(e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        let importFile = files[0]
        if (e.target.value) {
          e.target.value = ''
        }
        if (!(/(?:xls|xlsx|csv)$/i.test(importFile.name))) {
          this.message = '只允许上传xls|xlsx|csv格式的文件！'
          return
        }
        this.$refs.loading.show()
        talentsImport.import.bind(this)({file: importFile}, (data) => {
          this.showMsgBox(data.message)
          this.$router.push({
            name: 'talents-search-list'
          })
        }, () => {
        })
      }
    }
  }
</script>
<style scoped lang="stylus">
</style>
