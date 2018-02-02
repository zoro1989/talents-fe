<template>
  <div class="project-select-dialog">
    <mu-text-field label="项目名" :value="selectedProjName" :disabled="true"></mu-text-field>
    <mu-raised-button label="选择项目"  @click="selectProject" primary/>
    <tkm-dialog v-if="showFlag" ref="dialogForm" title="请选择项目" cancelLabel="取消" confirmLabel="确定">
      <tkm-table ref="table" :tableData="tableData"
                 :headers="headers"
                 :isdialog="isdialog"
                 :hasSearchBox="false"
                 @init-data="initData">
      </tkm-table>
    </tkm-dialog>
    <tkm-message ref="message" :message="message"></tkm-message>
  </div>
</template>
<script>
  import projectList from 'service/project-list'
  import TkmDialog from 'components/tkm-dialog'
  import TkmTable from 'components/tkm-table'
  import {messageMinxin} from 'common/js/mixin'
  export default {
    mixins: [messageMinxin],
    props: {
      content: {
        type: Number,
        default: -1
      },
      name: {
        type: String,
        default: ''
      }
    },
    components: {
      TkmDialog,
      TkmTable
    },
    data() {
      return {
        showFlag: false,
        isdialog: true,
        tableData: [],
        selectedProjName: '',
        headers: [{name: '项目名称'}, {name: '开始时间'}, {name: '结束时间'}, {name: '服务客户'}, {name: '契约数'}, {name: '投入数'}]
      }
    },
    created() {
      this.selectedProjName = this.name
    },
    methods: {
      selectProject() {
        this.show()
      },
      initData (params, success, fail) {
        projectList.getList.bind(this)({findContent: params.findContent, pageNo: params.pageNo}, (data) => {
          this.tableData = data
          success(data.message)
        }, (err) => {
          fail(err)
        })
      },
      show() {
        this.showFlag = true
        this.$nextTick(() => {
          this.$refs.dialogForm.openDialog(() => {
            let selectedTable = this.$refs.table.getDialogProjName()
            this.tableData.rows.map((row) => {
              if (row.id === selectedTable * 1) {
                let name = row.sections ? row.sections[0].value : row.columns[0].value
                this.selectedProjName = name
              }
            })
            this.$emit('update:content', selectedTable * 1)
            this.showFlag = false
          }, () => {
            this.showFlag = false
          })
        })
      }
    }
  }
</script>
<style scoped lang="stylus">
</style>
