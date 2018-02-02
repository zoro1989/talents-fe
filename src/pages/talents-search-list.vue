<template>
  <div class="talents-search-list">
    <tkm-table :tableData="tableData"
               :headers="headers"
               :hasSearchBox="hasSearchBox"
               @init-data="initData"
               @search-operation="searchOperation"
               @rows-operation="rowsOperation">
    </tkm-table>
    <tkm-dialog ref="dialogForm" title="员工信息" cancelLabel="取消" confirmLabel="确定">
      <mu-avatar class="avatar" src="../assets/logo.png" :size="100"/>
      <mu-list-item class="info" title="员工信息" :open="open1" @click="toggleShow1" :toggleNested="toggleNested">
        <div slot="nested">
          <div class="staff-info">
            <div class="search-item">
              <mu-text-field class="item" label="员工编号" v-model="info.staffNo" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="员工姓名" v-model="info.name" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="姓名拼音" v-model="info.nameSpell" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="员工姓名カナ" v-model="info.nameKana" hintText="请输入" ></mu-text-field>
            </div>
            <div class="search-item">
              <mu-text-field class="item" label="日文名" v-model="info.nameJp" hintText="请输入" ></mu-text-field>
              <mu-select-field class="item" v-model="info.sex" label="性别" hintText="请选择" :notEmpty="notRequired">
                <mu-menu-item v-for="item in info.sexList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
              </mu-select-field>
              <mu-date-picker class="item" label="出生日期"  mode="landscape" v-model="info.birthday" hintText="请输入"/>
              <mu-date-picker class="item" label="入社日期"  mode="landscape" v-model="info.joinDay" hintText="请输入"/>
            </div>
            <div class="search-item">
              <mu-date-picker class="item" label="实习开始日" mode="landscape" v-model="info.practiceStartDate" hintText="请输入"/>
              <mu-date-picker class="item" label="实习结束日" mode="landscape" v-model="info.practiceEndDate" hintText="请输入"/>
              <mu-date-picker class="item" label="试用开始日" mode="landscape" v-model="info.trialStartDate" hintText="请输入"/>
              <mu-date-picker class="item" label="试用结束日" mode="landscape" v-model="info.trialEndDate" hintText="请输入"/>
            </div>
            <div class="search-item">
              <mu-select-field class="item" v-model="info.trialResult" label="试用结果" hintText="请选择" :notEmpty="notRequired">
                <mu-menu-item v-for="item in info.yesNoList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
              </mu-select-field>
              <mu-date-picker class="item" label="转正日期"  mode="landscape" v-model="info.formalDate" hintText="请输入"/>
              <mu-select-field class="item" v-model="info.jobStatus" hintText="请选择"  label="在职状态" :notEmpty="notRequired">
                <mu-menu-item v-for="item in info.yesNoList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
              </mu-select-field>
              <mu-text-field class="item" label="社前工龄" v-model="info.befworkAge" hintText="请输入" ></mu-text-field>
            </div>
            <div class="search-item">
              <mu-text-field class="item" label="计算机相关社前工龄" v-model="info.cmpbefworkAge" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="社内工龄" v-model="info.aftworkAge" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="总工龄" v-model="info.workAge" hintText="请输入" ></mu-text-field>
              <mu-date-picker class="item" label="参加工作时间"  mode="landscape" v-model="info.workDate" hintText="请输入"/>
            </div>
            <div class="search-item">
              <mu-date-picker class="item" label="毕业时间" mode="landscape" v-model="info.graduateDate" hintText="请输入"/>
              <mu-text-field class="item" label="毕业学校" v-model="info.graduateSchool" hintText="请输入" ></mu-text-field>
              <mu-select-field class="item" v-model="info.education" label="学历" hintText="请选择" :notEmpty="notRequired">
                <mu-menu-item v-for="item in info.educationList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
              </mu-select-field>
              <mu-select-field class="item" v-model="info.trainingMode" label="培养方式" hintText="请选择" :notEmpty="notRequired">
                <mu-menu-item v-for="item in info.yesNoList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
              </mu-select-field>
            </div>
            <div class="search-item">
              <mu-text-field class="item" label="专业" v-model="info.major" hintText="请输入" ></mu-text-field>
              <mu-select-field class="item" v-model="info.degree" label="学位" hintText="请选择" :notEmpty="notRequired">
                <mu-menu-item v-for="item in info.degreeList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
              </mu-select-field>
              <mu-text-field class="item" label="电子邮件" v-model="info.email" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="电话" v-model="info.tel" hintText="请输入" ></mu-text-field>
            </div>
            <div class="search-item">
              <mu-text-field class="item" label="紧急联系人" v-model="info.urgencyCnt" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="紧急联系电话" v-model="info.urgencyTel" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="家庭住址" v-model="info.homeAddr" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="现住址" v-model="info.addr" hintText="请输入" ></mu-text-field>
            </div>
            <div class="search-item">
              <mu-text-field class="item" label="户口所在地" v-model="info.registerAddr" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="户口性质" v-model="info.registerType" hintText="请输入" ></mu-text-field>
              <mu-select-field class="item" v-model="info.jpLevel" label="日语等级" hintText="请选择" :notEmpty="notRequired">
                <mu-menu-item v-for="item in info.jpLevelList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
              </mu-select-field>
              <mu-select-field class="item" v-model="info.enLevel" label="英语等级" hintText="请选择"  :notEmpty="notRequired">
                <mu-menu-item v-for="item in info.enLevelList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
              </mu-select-field>
            </div>
            <div class="search-item">
              <mu-text-field class="item" label="工资卡号" v-model="info.salaryCard" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="身份证号" v-model="info.idCard" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="职称" v-model="info.professional" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="门卡内码" v-model="info.doorNo" hintText="请输入" ></mu-text-field>
            </div>
            <div class="search-item">
              <mu-text-field class="item" label="考勤编号" v-model="info.checkNo" hintText="请输入" ></mu-text-field>
              <mu-select-field class="item" v-model="info.nation" label="民族" hintText="请选择" :notEmpty="notRequired">
                <mu-menu-item v-for="item in info.nationList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
              </mu-select-field>
              <mu-select-field class="item" v-model="info.country" label="国籍" hintText="请选择" :notEmpty="notRequired">
                <mu-menu-item v-for="item in info.countryList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
              </mu-select-field>
              <mu-select-field class="item" v-model="info.ismarried" label="婚姻" hintText="请选择" :notEmpty="notRequired">
                <mu-menu-item v-for="item in info.yesNoList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
              </mu-select-field>
            </div>
            <div class="search-item">
              <mu-select-field class="item" v-model="info.hasbaby" label="生育" hintText="请选择" :notEmpty="notRequired">
                <mu-menu-item v-for="item in info.yesNoList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
              </mu-select-field>
              <mu-text-field class="item" label="档案管理方式" v-model="info.docManageMode" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="档案编号" v-model="info.docNo" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="档案费" v-model="info.docFee" hintText="请输入" ></mu-text-field>
            </div>
            <div class="search-item">
              <mu-text-field class="item" label="档案备注" v-model="info.docRemark" hintText="请输入" ></mu-text-field>
              <mu-select-field class="item" v-model="info.ispartied" label="是否党员" hintText="请选择" :notEmpty="notRequired">
                <mu-menu-item v-for="item in info.yesNoList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
              </mu-select-field>
              <mu-text-field class="item" label="入党时间" v-model="info.partiedDate" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="党组织关系" v-model="info.partiedRls" hintText="请输入" ></mu-text-field>
            </div>
            <div class="search-item">
              <mu-text-field class="item" label="党组织关系1" v-model="info.partiedRls1" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="护照号" v-model="info.passportNo" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="工资状态" v-model="info.salaryStatus" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="档案盒号" v-model="info.docBoxNo" hintText="请输入" ></mu-text-field>
            </div>
            <div class="search-item">
              <mu-text-field class="item" label="实习补贴" v-model="info.practiceFee" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="试用期薪酬" v-model="info.trialFee" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="约定转正薪酬下限" v-model="info.formalFeeBottom" hintText="请输入" ></mu-text-field>
              <mu-text-field class="item" label="约定转正薪酬上限" v-model="info.formalFeeTop" hintText="请输入" ></mu-text-field>
            </div>
            <div class="search-item">
              <mu-text-field class="item" label="实际转正薪酬" v-model="info.formalFee" hintText="请输入" ></mu-text-field>
              <mu-select-field class="item" v-model="info.department" label="部门名称" hintText="请选择" :notEmpty="notRequired">
                <mu-menu-item v-for="item in info.departmentList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
              </mu-select-field>
              <mu-date-picker class="item" label="离职时间"  mode="landscape" v-model="info.leaveDate" hintText="请输入"/>
              <mu-select-field class="item" v-model="info.duty" label="职位" hintText="请选择" :notEmpty="notRequired">
                <mu-menu-item v-for="item in info.dutyList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
              </mu-select-field>
            </div>
            <div class="search-item">
              <mu-select-field class="item" v-model="info.tLevel" label="职级职等" hintText="请选择" :notEmpty="notRequired">
                <mu-menu-item v-for="item in info.tLevelList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
              </mu-select-field>
              <mu-select-field class="item" v-model="info.studentLine" label="入职批次" hintText="请选择" :notEmpty="notRequired">
                <mu-menu-item v-for="item in info.studentLineList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
              </mu-select-field>
              <div class="item"></div>
              <div class="item"></div>
            </div>
          </div>
        </div>
      </mu-list-item>
      <mu-list-item class="info" title="赴日经验" :open="open2" @click="toggleShow2" :toggleNested="toggleNested">
        <div slot="nested">
          <mu-float-button icon="add" @click="addGojpItem"/>
          <div class="search-item" v-if="info.busJpExpList && info.busJpExpList.length > 0" v-for="(item, index) in info.busJpExpList" v-bind:key="index">
            <mu-date-picker class="item" label="开始时间"  mode="landscape" v-model="item.startDate" hintText="请输入"/>
            <mu-date-picker class="item" label="结束时间"  mode="landscape" v-model="item.endDate" hintText="请输入"/>
            <mu-float-button icon="delete" @click="deleteGojpItem(index)"/>
          </div>
        </div>
      </mu-list-item>
      <mu-list-item class="info" title="项目经验" :open="open3" @click="toggleShow3" :toggleNested="toggleNested">
        <div slot="nested">
          <mu-float-button icon="add" @click="addProjectExpItem"/>
          <div class="search-item" v-if="info.busProjectExpList && info.busProjectExpList.length > 0" v-for="(projExp, index) in info.busProjectExpList" v-bind:key="index">
            <mu-date-picker class="item" label="开始时间"  mode="landscape" v-model="projExp.startDate" hintText="请输入"/>
            <mu-date-picker class="item" label="结束时间"  mode="landscape" v-model="projExp.endDate" hintText="请输入"/>
            <project-select-dialog :content.sync="projExp.projectId"></project-select-dialog>
            <mu-float-button icon="delete" @click="deleteProjectExpItem(index)"/>
          </div>
        </div>
      </mu-list-item>
      <mu-list-item class="info" v-if="info.busProjectList && info.busProjectList.length > 0 && info.busProjectExpList && info.busProjectExpList.length > 0" title="项目轨迹" :open="open4" @click="toggleShow4" :toggleNested="toggleNested">
        <div slot="nested">
          <mu-timeline>
            <mu-timeline-item v-for="(item, index) in info.busProjectExpList" v-bind:key="index">
              <span slot="time">{{item.startDate}}至{{item.endDate}}</span>
              <span slot="des">{{getDesName(item.projectId)}}</span>
            </mu-timeline-item>
          </mu-timeline>
        </div>
      </mu-list-item>
    </tkm-dialog>
  </div>
</template>

<script>
import talentsSearchList from 'service/talents-search-list'
import TkmDialog from 'components/tkm-dialog'
import TkmTable from 'components/tkm-table'
import ProjectSelectDialog from './project-select-dialog'
export default{
  components: {
    TkmDialog,
    TkmTable,
    ProjectSelectDialog
  },
  data () {
    return {
      dialog: false,
      dialogMsg: '',
      dialogForm: {
        name: '',
        type: ''
      },
      tableData: [],
      roles: [],
      roleIds: [],
      headers: [{name: '工号'}, {name: '姓名'}, {name: '日语名'}, {name: '职位'}, {name: '日语等级'}, {name: '工龄'}, {name: '部门'}],
      hasSearchBox: false,
      info: {},
      multiple: true,
      notRequired: false,
      toggleNested: true,
      open1: true,
      open2: true,
      open3: true,
      open4: true
    }
  },
  methods: {
    toggleShow1() {
      this.open1 = !this.open1
    },
    toggleShow2() {
      this.open2 = !this.open2
    },
    toggleShow3() {
      this.open3 = !this.open3
    },
    toggleShow4() {
      this.open4 = !this.open4
    },
    initData (params, success, fail) {
      talentsSearchList.getList.bind(this)({info: this.$route.params, pageNo: params.pageNo}, (data) => {
        this.tableData = data
        success(data.message)
      }, (err) => {
        fail(err)
      })
    },
    rowsOperation (action, row, success, fail) {
      if (action === 'viewStaff') {
        talentsSearchList.getStaffInfo.bind(this)({id: row.id}, (data) => {
          this.info = data
          this.$refs.dialogForm.openDialog(() => {
          }, () => {
          })
        }, (err) => {
          fail(err)
        })
      } else if (action === 'editStaff') {
        talentsSearchList.getStaffInfo.bind(this)({id: row.id}, (data) => {
          this.info = Object.assign({}, this.info, data)
          this.$refs.dialogForm.openDialog(() => {
            for (let key in this.info) {
              row[key] = this.info[key]
            }
            talentsSearchList.save.bind(this)({row: row}, (data) => {
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
    searchOperation(action, success, fail) {
    },
    addGojpItem() {
      let proj = {
        startDate: '',
        endDate: ''
      }
      this.info.busJpExpList.push(proj)
    },
    deleteGojpItem(index) {
      this.info.busJpExpList.splice(index, 1)
    },
    addProjectExpItem() {
      let proj = {
        startDate: '',
        endDate: '',
        projectId: -1
      }
      this.info.busProjectExpList.push(proj)
    },
    deleteProjectExpItem(index) {
      this.info.busProjectExpList.splice(index, 1)
    },
    getDesName(projectId) {
      const index = this.info.busProjectList.findIndex((item) => {
        return projectId === item.id
      })
      if (index > -1) {
        return this.info.busProjectList[index] && this.info.busProjectList[index].projName ? this.info.busProjectList[index].projName : ''
      } else {
        return ''
      }
    }
  }
}

</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  .mu-float-button
    color: #fff!important
  .avatar
    position: absolute
    top: 10px
    right: 10px
  .info
    background: $color-highlight-background
    .search-item
      display: flex
      align-items: center
      .item
        margin-left: 5px
        flex: 0 0 256px
</style>
