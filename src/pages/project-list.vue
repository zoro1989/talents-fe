<template>
  <div id="project-list">
    <tkm-table :tableData="tableData"
               :headers="headers"
               :searchOperations="searchOperations"
               @init-data="initData"
               @search-operation="searchOperation"
               @rows-operation="rowsOperation">
    </tkm-table>
    <tkm-dialog ref="dialogForm" title="添加项目" cancelLabel="取消" confirmLabel="确定">
      <div class="search-item">
        <mu-text-field class="item" label="项目名称" v-model="info.projName" hintText="请输入" ></mu-text-field>
        <mu-date-picker class="item" label="开始时间"  mode="landscape" v-model="info.startDate" hintText="请输入"/>
        <mu-date-picker class="item" label="结束时间"  mode="landscape" v-model="info.endDate" hintText="请输入"/>
      </div>
      <div class="search-item">
        <mu-float-button icon="add" @click="addProjectItem()"/>
      </div>
      <div class="project-item" v-if="info.projectItems && info.projectItems.length > 0" v-for="(proj, index) in info.projectItems" v-bind:key="index">
        <div class="project-time">
          <mu-date-picker class="item" label="开始时间"  mode="landscape" v-model="proj.startDate" hintText="请输入"/>
          <mu-date-picker class="item" label="结束时间"  mode="landscape" v-model="proj.endDate" hintText="请输入"/>
          <mu-float-button icon="delete" @click="deleteProjectItem(index)"/>
        </div>
        <div class="project">
          <mu-text-field class="item" label="子项目名" v-model="proj.projName" hintText="请输入" ></mu-text-field>
          <mu-select-field class="item" :multiple="multiple" v-model="proj.devLanguage" label="开发语言" hintText="请选择">
            <mu-menu-item v-for="item in info.devLanguageList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="proj.operateSys" label="操作系统" hintText="请选择">
            <mu-menu-item v-for="item in info.operateSysList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="proj.devTool" label="开发工具" hintText="请选择">
            <mu-menu-item v-for="item in info.devToolList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="proj.devDatabase" label="数据库" hintText="请选择">
            <mu-menu-item v-for="item in info.devDatabaseList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="proj.devAppServer" label="WEB服务器" hintText="请选择">
            <mu-menu-item v-for="item in info.devAppServerList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="proj.devFramework" label="技术框架" hintText="请选择">
            <mu-menu-item v-for="item in info.devFrameworkList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="proj.serviceCustomer" label="服务客户" hintText="请选择">
            <mu-menu-item v-for="item in info.serviceCustomerList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="proj.busType" label="业务类别" hintText="请选择">
            <mu-menu-item v-for="item in info.busTypeList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-text-field class="item" label="契约数" v-model="proj.contractCount" hintText="请输入" ></mu-text-field>
          <mu-text-field class="item" label="投入数" v-model="proj.putCount" hintText="请输入" ></mu-text-field>
        </div>
      </div>
    </tkm-dialog>
    <tkm-dialog ref="dialog" title="警告" cancelLabel="取消" confirmLabel="确定">
      {{dialogMsg}}
    </tkm-dialog>
  </div>
</template>

<script>
import projectList from 'service/project-list'
import TkmDialog from 'components/tkm-dialog'
import TkmTable from 'components/tkm-table'
export default{
  components: {
    TkmDialog,
    TkmTable
  },
  data () {
    return {
      dialog: false,
      dialogMsg: '',
      info: {},
      multiple: true,
      tableData: [],
      searchOperations: [
        {
          name: '查询',
          action: 'onSubmit',
          type: 'normal'
        },
        {
          name: '增加项目',
          action: 'addProject'
        },
        {
          name: '删除',
          action: 'deleteProjects',
          type: 'delete'
        }
      ],
      headers: [{name: '项目名称'}, {name: '开始时间'}, {name: '结束时间'}, {name: '服务客户'}, {name: '契约数'}, {name: '投入数'}]
    }
  },
  methods: {
    initData (params, success, fail) {
      projectList.getList.bind(this)({findContent: params.findContent, pageNo: params.pageNo}, (data) => {
        this.tableData = data
        success(data.message)
      }, (err) => {
        fail(err)
      })
    },
    rowsOperation (action, row, success, fail) {
      if (action === 'deleteProject') {
        this.dialogMsg = '确认要删除这个项目吗？'
        this.$refs.dialog.openDialog(() => {
          projectList.deleteOne.bind(this)({row: row}, (data) => {
            success(data.message)
          }, (err) => {
            fail(err)
          })
        }, () => {
        })
      } else if (action === 'editProject') {
        projectList.editProject.bind(this)({row: row}, (data) => {
          this.info = Object.assign({}, this.info, {
            projName: data.projName,
            startDate: data.startDate,
            endDate: data.endDate,
            devLanguageList: data.devLanguageList,
            operateSysList: data.operateSysList,
            devToolList: data.devToolList,
            devDatabaseList: data.devDatabaseList,
            devAppServerList: data.devAppServerList,
            devFrameworkList: data.devFrameworkList,
            serviceCustomerList: data.serviceCustomerList,
            busTypeList: data.busTypeList,
            projectItems: data.projectItems
          })
          this.$refs.dialogForm.openDialog(() => {
            row.projName = this.info.projName
            row.startDate = this.info.startDate
            row.endDate = this.info.endDate
            row.projectItems = this.info.projectItems
            projectList.save.bind(this)({row: row}, (data) => {
              this.$refs.dialog.hide()
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
      if (action === 'deleteProjects') {
        this.dialogMsg = '确认要删除这些项目吗？'
        this.$refs.dialog.openDialog(() => {
          projectList.delete.bind(this)({tableData: this.tableData}, (data) => {
            success(data.message)
          }, (err) => {
            fail(err)
          })
        }, () => {
        })
      } else if (action === 'addProject') {
        projectList.getProjectParents.bind(this)({}, (data) => {
          this.info.projName = ''
          this.info.startDate = ''
          this.info.endDate = ''
          this.$refs.dialogForm.openDialog(() => {
            let newRow = {}
            newRow.projName = this.info.projName
            newRow.startDate = this.info.startDate
            newRow.endDate = this.info.endDate
            projectList.save.bind(this)({row: newRow}, (data) => {
              this.$refs.dialog.hide()
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
    },
    addProjectItem() {
      let proj = {
        startDate: '',
        endDate: '',
        projName: '',
        devLanguage: '',
        operateSys: '',
        devTool: '',
        devDatabase: '',
        devAppServer: '',
        devFramework: '',
        serviceCustomer: '',
        busType: '',
        contractCount: 0,
        putCount: 0
      }
      this.info.projectItems.push(proj)
    },
    deleteProjectItem(index) {
      this.info.projectItems.splice(index, 1)
    }
  }
}

</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  .mu-float-button
    color: #fff!important
  .project-item
    padding: 20px
    margin: 20px 0px
    background: $color-highlight-background
    .project
      width: 300px
</style>
