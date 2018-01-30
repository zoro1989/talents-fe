<template>
  <div class="tkm-table">
    <div class="search-content">
      <mu-text-field v-if="hasSearchBox" v-model="form.findContent" hintText="请输入搜索关键字" ></mu-text-field>
      <mu-raised-button v-if="searchOperations.length > 0" v-for="(operation, index) in searchOperations" :key="index" :label="operation.name"  @click="searchOptHandler(operation.action)" :backgroundColor="operation.color"/>
    </div>
    <mu-table :fixedHeader="fixedHeader" :selectable="selectable" :showCheckbox="showCheckbox"
              :multiSelectable="multiSelectable" :height="height" @rowClick="rowClick">
      <mu-thead slot="header">
        <mu-tr>
          <mu-th><mu-checkbox v-model="selectedAll" /></mu-th>
          <mu-th v-for="(head, index) in headers" :key="index" :tooltip="head.name">{{head.name}}</mu-th>
          <mu-th tooltip="操作">操作</mu-th>
        </mu-tr>
      </mu-thead>
      <mu-tbody>
        <mu-tr v-for="(row, index) in tableData.rows"  :key="index" :selected="row.selected" :class="{'row-section':row.sections}">
          <template v-if="row.sections">
            <mu-td></mu-td>
            <mu-td v-for="(section, index) in row.sections" :key="index">{{section.value}}</mu-td>
            <mu-td>
              <mu-raised-button v-for="(operation, index) in row.operations" :key="index" :label="operation.name"  @click="optHandler(operation.action, row)" :backgroundColor="operation.type==='normal' ? '#337ab7' : operation.type==='delete'?'#a2d200':'#1ccdaa'"/>
            </mu-td>
          </template>
          <template v-if="!row.sections">
            <mu-td><mu-checkbox v-model="row.selected" /></mu-td>
            <mu-td v-for="(column, index) in row.columns" :key="index">{{column.value}}</mu-td>
            <mu-td>
              <mu-raised-button v-for="(operation, index) in row.operations" :key="index" :label="operation.name"  @click="optHandler(operation.action, row)" :backgroundColor="operation.type==='normal' ? '#337ab7' : operation.type==='delete'?'#a2d200':'#1ccdaa'"/>
            </mu-td>
          </template>
        </mu-tr>
      </mu-tbody>
    </mu-table>
    <mu-pagination :total="tableData.totalCount" :current="tableData.pageNo" @pageChange="pageChange">
    </mu-pagination>
  </div>
</template>

<script>
import isNotEmpty from 'utilities/is-not-empty'
export default{
  created () {
    if (this.searchOperations.length > 0) {
      this.searchOperations.map((opt) => {
        if (opt.type === 'normal') {
          opt.color = '#337ab7'
        } else if (opt.type === 'delete') {
          opt.color = '#a2d200'
        } else {
          opt.color = '#1ccdaa'
        }
        return opt
      })
    }
    this.loadTable()
  },
  props: {
    headers: {},
    tableData: {},
    searchOperations: {
      type: Array,
      default: function () {
        return []
      }
    },
    hasSearchBox: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      fixedHeader: true,
      selectable: true,
      showCheckbox: false,
      multiSelectable: true,
      selectedAll: false,
      totalCount: 1,
      pageNo: 1,
      height: '70vh',
      form: {
        findContent: ''
      }
    }
  },
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
      if (to.name === 'points') {
        this.routeChange(to)
      }
    },
    selectedAll: function (newValue, oldValue) {
      if (isNotEmpty(newValue)) {
        if (newValue) {
          this.tableData.rows.map((row) => {
            row.selected = true
          })
        } else {
          this.tableData.rows.map((row) => {
            row.selected = false
          })
        }
      }
    }
  },
  methods: {
    routeChange (to) {
      let success = (msg) => {
        this.showSuccess(msg)
      }
      let fail = (err) => {
        this.showError(err)
      }
      this.$emit('route-change', { pageNo: this.pageNo, findContent: this.form.findContent }, to, success, fail)
    },
    loadTable () {
      let success = (msg) => {
        this.showSuccess(msg)
      }
      let fail = (err) => {
        this.showError(err)
      }
      this.$emit('init-data', { pageNo: this.pageNo, findContent: this.form.findContent }, success, fail)
    },
    optHandler (action, row) {
      let success = (msg) => {
        this.showSuccess(msg)
        this.loadTable()
      }
      let fail = (err) => {
        this.showError(err)
      }
      this.$emit('rows-operation', action, row, success, fail)
    },
    searchOptHandler (action, row) {
      let success = (msg) => {
        this.showSuccess(msg)
        this.loadTable()
      }
      let fail = (err) => {
        this.showError(err)
      }
      this.$emit('search-operation', action, success, fail)
    },
    pageChange (newIndex) {
      this.pageNo = newIndex
      this.loadTable()
    },
    rowClick (index, tr) {
      this.tableData.rows[index].selected = !this.tableData.rows[index].selected
    },
    showSuccess (msg) {
      if (msg) {
//        this.$message({
//          message: msg,
//          type: 'success'
//        })
      }
    },
    showError (msg) {
      if (msg) {
//        this.$message.error(msg)
      }
    }
  }
}

</script>

<style scoped lang="stylus">
  .tkm-table
    min-width: 774px
    font-size: 13px
    .mu-raised-button
      margin-right: 3px
      min-width: 0!important
    .mu-tr
      &.row-section
        background-color: rgba(255,152,0,0.1)
      .mu-th,.mu-td
        height: 48px
        line-height: 48px
        overflow: hidden
        text-align: center
        white-space:nowrap
        text-overflow: ellipsis
        .mu-raised-button
          margin-right: 3px
      .mu-th:first-child,.mu-td:first-child
        width: 80px
        white-space:nowrap
      .mu-th:last-child,.mu-td:last-child
        display: flex
        align-items: center
        justify-content: center
        box-sizing: border-box
        .mu-raised-button
          min-width: 0!important
    .mu-pagination
      justify-content: flex-end
</style>
