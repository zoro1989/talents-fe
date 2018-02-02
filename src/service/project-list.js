/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'http/http-handler'
import dateTime from 'utilities/timestamp-to-date-time'
import uris from 'router/uris'
function _normalizeProjects(list) {
  let ret = []
  list.map((row) => {
    ret.push({
      id: row.id,
      selected: false,
      sections: [
        {
          name: 'projName',
          value: row.projName || '--'
        },
        {
          name: 'startDate',
          value: dateTime(row.startDate).split(' ')[0] || '--'
        },
        {
          name: 'endDate',
          value: dateTime(row.endDate).split(' ')[0] || '--'
        },
        {
          name: 'serviceCustomer',
          value: row.serviceCustomer || '--'
        },
        {
          name: 'contractCount',
          value: row.contractCount || '--'
        },
        {
          name: 'pubCount',
          value: row.pubCount || '--'
        }
      ],
      operations: [
        {
          name: '编辑',
          action: 'editProject',
          type: 'normal'
        },
        {
          name: '删除',
          action: 'deleteProject',
          type: 'delete'
        }
      ]
    })
    row.projectItems.map((item) => {
      ret.push(
        {
          id: item.id,
          selected: false,
          columns: [
            {
              name: 'projName',
              value: item.projName || '--'
            },
            {
              name: 'startDate',
              value: dateTime(item.startDate).split(' ')[0] || '--'
            },
            {
              name: 'endDate',
              value: dateTime(item.endDate).split(' ')[0] || '--'
            },
            {
              name: 'serviceCustomer',
              value: item.serviceCustomer || '--'
            },
            {
              name: 'contractCount',
              value: item.contractCount || '--'
            },
            {
              name: 'pubCount',
              value: item.pubCount || '--'
            }
          ],
          operations: [
            {
              name: '编辑',
              action: 'editProject',
              type: 'normal'
            },
            {
              name: '删除',
              action: 'deleteProject',
              type: 'delete'
            }
          ]
        }
      )
    })
  })
  return ret
}
export default {
  getList (params, success, fail) {
    let formData = new FormData()
    formData.append('findContent', params.findContent)
    formData.append('pageNo', params.pageNo)
    function makeData (originalData) {
      let rows = _normalizeProjects(originalData.data.list)
      return {
        message: originalData.message,
        totalCount: originalData.data.total,
        rows: rows
      }
    }
    httpHandler.post.bind(this)(uris.project.index, formData, success, fail, makeData)
  },
  delete (params, success, fail) {
    let formData = new FormData()
    params.tableData.rows.map((row) => {
      if (row.selected) {
        formData.append('ids', row.id)
      }
    })
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.project.deleteProjectById, formData, success, fail, makeData)
  },
  deleteOne (params, success, fail) {
    let formData = new FormData()
    formData.append('ids', params.row.id)
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.project.deleteProjectById, formData, success, fail, makeData)
  },
  editProject (params, success, fail) {
    function makeData (originalData) {
      let res = originalData.data
      console.log(res)
      res.startDate = dateTime(res.startDate).split(' ')[0]
      res.endDate = dateTime(res.startDate).split(' ')[0]
      res.projectItems = res.projectItems.map((item) => {
        item.startDate = dateTime(item.startDate).split(' ')[0]
        item.endDate = dateTime(item.endDate).split(' ')[0]
        // item.projName = item.projName + ''
        // item.devLanguage = item.devLanguage
        // item.operateSys = item.operateSys
        // item.devTool = item.devTool
        // item.devDatabase = item.devDatabase
        // item.devAppServer = item.devAppServer
        // item.devFramework = item.devFramework
        // item.serviceCustomer = item.serviceCustomer
        // item.busType = item.busType
        // item.contractCount = item.contractCount
        // item.putCount = item.putCount
        return item
      })
      return res
    }
    httpHandler.get.bind(this)(uris.project.selectProjectById, {
      params: {id: params.row.id}
    }, success, fail, makeData)
  },
  getProjectParents (params, success, fail) {
    function makeData (originalData) {
      return originalData.data
    }
    httpHandler.get.bind(this)(uris.project.selectProjectParents, {
      params: {}
    }, success, fail, makeData)
  },
  save (params, success, fail) {
    let formData = {}
    formData.id = params.row['id']
    formData.projName = params.row['projName']
    formData.startDate = Date.parse(new Date(params.row['startDate']).toDateString())
    formData.endDate = Date.parse(new Date(params.row['endDate']).toDateString())
    formData.projectItems = params.row['projectItems']
    function makeData (originalData) {
      return originalData
    }
    httpHandler.postJSON.bind(this)(uris.project.save, formData, success, fail, makeData)
  }
}
