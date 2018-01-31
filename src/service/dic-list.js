/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'http/http-handler'
import uris from 'router/uris'
export default {
  getList (params, success, fail) {
    let formData = new FormData()
    formData.append('findContent', params.findContent)
    formData.append('pageNo', params.pageNo)
    function makeData (originalData) {
      return {
        message: originalData.message,
        totalCount: originalData.data.total,
        rows: originalData.data.list.map((row) => {
          return {
            id: row.id,
            selected: false,
            columns: [
              {
                name: 'dicValue',
                value: row.dicValue || '--'
              },
              {
                name: 'dicLabel',
                value: row.dicLabel || '--'
              }
            ],
            operations: [
              {
                name: '编辑',
                action: 'editDic',
                type: 'normal'
              },
              {
                name: '删除',
                action: 'deleteDic',
                type: 'delete'
              }
            ]
          }
        })
      }
    }
    httpHandler.post.bind(this)(uris.dic.index, formData, success, fail, makeData)
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
    httpHandler.post.bind(this)(uris.dic.deleteDicById, formData, success, fail, makeData)
  },
  deleteOne (params, success, fail) {
    let formData = new FormData()
    formData.append('ids', params.row.id)
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.dic.deleteDicById, formData, success, fail, makeData)
  },
  editDic (params, success, fail) {
    function makeData (originalData) {
      return originalData.data
    }
    httpHandler.get.bind(this)(uris.dic.selectDicById, {
      params: {id: params.row.id}
    }, success, fail, makeData)
  },
  getDicParents (params, success, fail) {
    function makeData (originalData) {
      return originalData.data
    }
    httpHandler.get.bind(this)(uris.dic.selectDicParents, {
      params: {}
    }, success, fail, makeData)
  },
  save (params, success, fail) {
    let formData = new FormData()
    for (let item in params.row) {
      formData.append(item, params.row[item])
    }
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.dic.save, formData, success, fail, makeData)
  }
}
