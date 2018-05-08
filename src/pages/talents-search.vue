<template>
  <div class="talents-search">
    <input type="hidden" v-model="info.id" />
    <div class="normal-search">
      <div class="search-item">
        <mu-text-field class="item" label="员工编号" v-model="info.staffNo" hintText="请输入" ></mu-text-field>
        <mu-text-field class="item" label="员工姓名" v-model="info.name" hintText="请输入" ></mu-text-field>
        <mu-text-field class="item" label="员工姓名カナ" v-model="info.nameKana" hintText="请输入" ></mu-text-field>
        <mu-text-field class="item" label="日文名" v-model="info.nameJp" hintText="请输入" ></mu-text-field>
      </div>
      <div class="search-item">
        <mu-select-field class="item" :multiple="multiple" v-model="info.sexIdList" label="性别" hintText="请选择" :notEmpty="notRequired">
          <mu-menu-item v-for="item in info.sexList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
        </mu-select-field>
        <mu-date-picker class="item" label="入社日期(起)"  mode="landscape" v-model="info.joinDayStart" hintText="请输入"/>
        <mu-date-picker class="item" label="入社日期(止)"  mode="landscape" v-model="info.joinDayEnd" hintText="请输入"/>
      </div>
    </div>
    <mu-list-item class="advance-search" slot="nested" title="高级检索" :open="open1" @click="toggleShow1" :toggleNested="toggleNested">
      <div slot="nested">
        <div class="search-item">
          <mu-date-picker class="item" label="实习开始日(起)" mode="landscape" v-model="info.practiceStartDateStart" hintText="请输入"/>
          <mu-date-picker class="item" label="实习开始日(止)" mode="landscape" v-model="info.practiceStartDateEnd" hintText="请输入"/>
          <mu-date-picker class="item" label="实习结束日(起)" mode="landscape" v-model="info.practiceEndDateStart" hintText="请输入"/>
          <mu-date-picker class="item" label="实习结束日(止)" mode="landscape" v-model="info.practiceEndDateEnd" hintText="请输入"/>
        </div>
        <div class="search-item">
          <mu-date-picker class="item" label="试用开始日(起)" mode="landscape" v-model="info.trialStartDateStart" hintText="请输入"/>
          <mu-date-picker class="item" label="试用开始日(止)" mode="landscape" v-model="info.trialStartDateEnd" hintText="请输入"/>
          <mu-date-picker class="item" label="试用结束日(起)" mode="landscape" v-model="info.trialEndDateStart" hintText="请输入"/>
          <mu-date-picker class="item" label="试用结束日(止)" mode="landscape" v-model="info.trialEndDateEnd" hintText="请输入"/>
        </div>
        <div class="search-item">
          <mu-date-picker class="item" label="转正日期(起)"  mode="landscape" v-model="info.formalDateStart" hintText="请输入"/>
          <mu-date-picker class="item" label="转正日期(止)"  mode="landscape" v-model="info.formalDateEnd" hintText="请输入"/>
          <mu-select-field class="item" :multiple="multiple" v-model="info.jobStatusIdList" hintText="请选择"  label="在职状态" :notEmpty="notRequired">
            <mu-menu-item v-for="item in info.jobStatusList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
        </div>
        <div class="search-item">
          <mu-text-field class="item" label="社前工龄(起)" v-model="info.befworkAgeStart" hintText="请输入" ></mu-text-field>
          <mu-text-field class="item" label="社前工龄(止)" v-model="info.befworkAgeEnd" hintText="请输入" ></mu-text-field>
          <mu-text-field class="item" label="计算机相关社前工龄(起)" v-model="info.cmpbefworkAgeStart" hintText="请输入" ></mu-text-field>
          <mu-text-field class="item" label="计算机相关社前工龄(止)" v-model="info.cmpbefworkAgeEnd" hintText="请输入" ></mu-text-field>
        </div>
        <div class="search-item">
          <mu-text-field class="item" label="社内工龄(起)" v-model="info.aftworkAgeStart" hintText="请输入" ></mu-text-field>
          <mu-text-field class="item" label="社内工龄(止)" v-model="info.aftworkAgeEnd" hintText="请输入" ></mu-text-field>
          <mu-text-field class="item" label="总工龄(起)" v-model="info.workAgeStart" hintText="请输入" ></mu-text-field>
          <mu-text-field class="item" label="总工龄(止)" v-model="info.workAgeEnd" hintText="请输入" ></mu-text-field>
        </div>
        <div class="search-item">
          <mu-date-picker class="item" label="参加工作时间(起)"  mode="landscape" v-model="info.workDateStart" hintText="请输入"/>
          <mu-date-picker class="item" label="参加工作时间(止)"  mode="landscape" v-model="info.workDateEnd" hintText="请输入"/>
          <mu-date-picker class="item" label="毕业时间(起)" mode="landscape" v-model="info.graduateDateStart" hintText="请输入"/>
          <mu-date-picker class="item" label="毕业时间(止)" mode="landscape" v-model="info.graduateDateEnd" hintText="请输入"/>
        </div>
        <div class="search-item">
          <mu-text-field class="item" label="毕业学校" v-model="info.graduateSchool" hintText="请输入" ></mu-text-field>
          <mu-select-field class="item" :multiple="multiple" v-model="info.educationIdList" label="学历" hintText="请选择" :notEmpty="notRequired">
            <mu-menu-item v-for="item in info.educationList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-text-field class="item" label="专业" v-model="info.major" hintText="请输入" ></mu-text-field>
          <mu-select-field class="item" :multiple="multiple" v-model="info.degreeIdList" label="学位" hintText="请选择" :notEmpty="notRequired">
            <mu-menu-item v-for="item in info.degreeList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
        </div>
        <div class="search-item">
          <mu-select-field class="item" :multiple="multiple" v-model="info.jpLevelIdList" label="日语等级" hintText="请选择" :notEmpty="notRequired">
            <mu-menu-item v-for="item in info.jpLevelList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="info.enLevelIdList" label="英语等级" hintText="请选择"  :notEmpty="notRequired">
            <mu-menu-item v-for="item in info.enLevelList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="info.nationIdList" label="民族" hintText="请选择" :notEmpty="notRequired">
            <mu-menu-item v-for="item in info.nationList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="info.countryIdList" label="国籍" hintText="请选择" :notEmpty="notRequired">
            <mu-menu-item v-for="item in info.countryList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
        </div>
        <div class="search-item">
          <mu-select-field class="item" :multiple="multiple" v-model="info.ismarriedIdList" label="婚姻" hintText="请选择" :notEmpty="notRequired">
            <mu-menu-item v-for="item in info.ismarriedList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="info.hasbabyIdList" label="生育" hintText="请选择" :notEmpty="notRequired">
            <mu-menu-item v-for="item in info.hasbabyList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="info.ispartiedIdList" label="是否党员" hintText="请选择" :notEmpty="notRequired">
            <mu-menu-item v-for="item in info.ispartiedList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="info.departmentIdList" label="部门" hintText="请选择" :notEmpty="notRequired">
            <mu-menu-item v-for="item in info.departmentList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
        </div>
        <div class="search-item">
          <mu-select-field class="item" :multiple="multiple" v-model="info.dutyIdList" label="职位" hintText="请选择" :notEmpty="notRequired">
            <mu-menu-item v-for="item in info.dutyList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="info.tLevelIdList" label="职级职等" hintText="请选择" :notEmpty="notRequired">
            <mu-menu-item v-for="item in info.tLevelList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="info.studentLineIdList" label="入职批次" hintText="请选择" :notEmpty="notRequired">
            <mu-menu-item v-for="item in info.studentLineList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
        </div>
      </div>
    </mu-list-item>
    <mu-list-item class="advance-search" slot="nested" title="技能检索" :open="open2" @click="toggleShow2" :toggleNested="toggleNested">
      <div slot="nested">
        <div class="search-item">
          <mu-select-field class="item" :multiple="multiple" v-model="info.devLanguageIdList" label="开发语言" hintText="请选择">
            <mu-menu-item v-for="item in info.devLanguageList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="info.operateSysIdList" label="操作系统" hintText="请选择">
            <mu-menu-item v-for="item in info.operateSysList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="info.devToolIdList" label="开发工具" hintText="请选择">
            <mu-menu-item v-for="item in info.devToolList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="info.devDatabaseIdList" label="数据库" hintText="请选择">
            <mu-menu-item v-for="item in info.devDatabaseList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
        </div>
        <div class="search-item">
          <mu-select-field class="item" :multiple="multiple" v-model="info.devAppServerIdList" label="WEB服务器" hintText="请选择">
            <mu-menu-item v-for="item in info.devAppServerList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="info.devFrameworkIdList" label="开发框架" hintText="请选择">
            <mu-menu-item v-for="item in info.devFrameworkList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="info.serviceCustomerIdList" label="服务客户" hintText="请选择">
            <mu-menu-item v-for="item in info.serviceCustomerList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
          <mu-select-field class="item" :multiple="multiple" v-model="info.busTypeIdList" label="业务类型" hintText="请选择">
            <mu-menu-item v-for="item in info.busTypeList" :key="item.id + ''" :value="item.dicValue + ''" :title="item.dicLabel"/>
          </mu-select-field>
        </div>
      </div>
    </mu-list-item>
    <mu-list-item class="advance-search" slot="nested" title="项目检索" :open="open3" @click="toggleShow3" :toggleNested="toggleNested">
      <div slot="nested">
        <project-select-dialog :content.sync="selectedProjectId" ></project-select-dialog>
      </div>
    </mu-list-item>
    <div class="button-group">
      <mu-raised-button label="搜索"  @click="onSearch" primary/>
    </div>
    <tkm-loading ref="loading"></tkm-loading>
    <tkm-message ref="message" :message="message"></tkm-message>
  </div>
</template>

<script>
import talentsSearch from 'service/talents-search'
import TkmSelect from 'components/tkm-select'
import ProjectSelectDialog from './project-select-dialog'
import {talentsMixin, messageMinxin} from 'common/js/mixin'
export default{
  mixins: [talentsMixin, messageMinxin],
  components: {
    TkmSelect,
    ProjectSelectDialog
  },
  created () {
    talentsSearch.get.bind(this)({}, (data) => {
      this.info = Object.assign({}, this.info, data)
    }, () => {
//      this.$message.error(err)
    })
  },
  data () {
    return {
      info: {},
      notRequired: false,
      toggleNested: true,
      open1: false,
      open2: false,
      open3: false,
      multiple: true,
      selectedProjectId: -1
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
    onSearch () {
      this.info.selectedProjectId = this.selectedProjectId
      this.$router.push({
        name: 'talents-search-list',
        params: this.info
      })
    }
  }
}

</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  .talents-search
    padding-left: 20px
    .normal-search
      .search-item
        display: flex
        align-items: flex-end
        .item
          margin-left: 10px
    .advance-search
      background: $color-highlight-background
      .search-item
        display: flex
        align-items: flex-end
        .item
          margin-left: 10px
    .button-group
      margin-top: 20px
</style>
