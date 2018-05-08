<template>
  <div id="dic-list">
    <tkm-table :tableData="tableData"
               :headers="headers"
               :searchOperations="searchOperations"
               @init-data="initData"
               @search-operation="searchOperation"
               @rows-operation="rowsOperation">
    </tkm-table>
    <tkm-dialog ref="dialogForm" title="添加字典" cancelLabel="取消" confirmLabel="确定">
      <div class="search-item">
        <mu-text-field class="item" label="字典值" v-model="dialogForm.value" hintText="请输入字典值[字母 + 数字]" labelFloat></mu-text-field>
        <mu-text-field class="item" label="字典名" v-model="dialogForm.label" hintText="字典名" labelFloat></mu-text-field>
        <tkm-select class="item" :content.sync="dialogForm.dicParent" label="选择所属栏目" :notEmpty="notRequired">
          <mu-menu-item v-for="item in parents" :key="item.id + ''" :value="item.id + ''" :title="item.dicLabel"/>
        </tkm-select>
        <tkm-select class="item" :content.sync="dialogForm.dicType" :isValid="dialogForm.dicValid" label="选择字典类型">
          <mu-menu-item value="0" title="个人信息字典"/>
          <mu-menu-item value="1" title="项目信息字典"/>
        </tkm-select>
      </div>
    </tkm-dialog>
    <tkm-dialog ref="dialog" title="警告" cancelLabel="取消" confirmLabel="确定">
      {{dialogMsg}}
    </tkm-dialog>
  </div>
</template>

<script>
import dicList from 'service/dic-list'
import TkmDialog from 'components/tkm-dialog'
import TkmTable from 'components/tkm-table'
import TkmSelect from 'components/tkm-select'
export default{
  components: {
    TkmDialog,
    TkmTable,
    TkmSelect
  },
  data () {
    return {
      dialog: false,
      dialogMsg: '',
      dialogForm: {
        value: '',
        label: '',
        dicParent: '',
        dicType: '',
        dicValid: true
      },
      tableData: [],
      searchOperations: [
        {
          name: '查询',
          action: 'onSubmit',
          type: 'normal'
        },
        {
          name: '增加字典',
          action: 'addDic'
        },
        {
          name: '删除',
          action: 'deleteDics',
          type: 'delete'
        }
      ],
      headers: [{name: '字典值'}, {name: '字典标签'}],
      parents: [],
      notRequired: false
    }
  },
  methods: {
    initData (params, success, fail) {
      dicList.getList.bind(this)({findContent: params.findContent, pageNo: params.pageNo}, (data) => {
        this.tableData = data
        success()
      }, (err) => {
        fail(err)
      })
    },
    rowsOperation (action, row, success, fail) {
      if (action === 'deleteDic') {
        this.dialogMsg = '确认要删除这个字典吗？'
        this.$refs.dialog.openDialog(() => {
          dicList.deleteOne.bind(this)({row: row}, (data) => {
            success(data.message)
          }, (err) => {
            fail(err)
          })
        }, () => {
        })
      } else if (action === 'editDic') {
        dicList.editDic.bind(this)({row: row, type: this.type}, (data) => {
          this.dialogForm.value = data.dicValue
          this.dialogForm.label = data.dicLabel
          this.dialogForm.dicParent = data.parentId ? data.parentId + '' : ''
          this.dialogForm.dicType = row.type + ''
          this.dialogForm.dicValid = row.isValid
          this.parents = data.dicParents
          this.$refs.dialogForm.openDialog(() => {
            row.dicValue = this.dialogForm.value
            row.dicLabel = this.dialogForm.label
            row.parentId = this.dialogForm.dicParent
            row.type = this.dialogForm.dicType
            dicList.save.bind(this)({row: row}, (data) => {
              success(data.message)
            }, (err) => {
              fail(err)
            })
          }, () => {
          })
        }, (err) => {
          fail(err)
        })
      }
    },
    searchOperation (action, success, fail) {
      if (action === 'deleteDics') {
        this.dialogMsg = '确认要删除这些项目吗？'
        this.$refs.dialog.openDialog(() => {
          dicList.delete.bind(this)({tableData: this.tableData}, (data) => {
            success(data.message)
          }, (err) => {
            fail(err)
          })
        }, () => {
        })
      } else if (action === 'addDic') {
        dicList.getDicParents.bind(this)({type: this.type}, (data) => {
          this.parents = data
          this.dialogForm.value = ''
          this.dialogForm.label = ''
          this.dialogForm.dicParent = ''
          this.$refs.dialogForm.openDialog(() => {
            let newRow = {}
            newRow.dicValue = this.dialogForm.value
            newRow.dicLabel = this.dialogForm.label
            newRow.parentId = this.dialogForm.dicParent
            dicList.save.bind(this)({row: newRow}, (data) => {
              success(data.message)
            }, (err) => {
              fail(err)
            })
          }, () => {
          })
        }, (err) => {
          fail(err)
        })
      } else {
        success()
      }
    }
  }
}

</script>

<style scoped lang="stylus">
</style>
