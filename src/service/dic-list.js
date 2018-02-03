/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'http/http-handler'
import uris from 'router/uris'
function _normalizeDics(list) {
  let ret = []
  list.map((row) => {
    ret.push({
      id: row.id,
      type: row.type,
      selected: false,
      isValid: false,
      sections: [
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
          name: '删除',
          action: 'deleteDic',
          type: 'delete'
        },
        {
          name: '编辑',
          action: 'editDic',
          type: 'normal'
        }
      ]
    })
    let parentType = row.type
    row.dicItems.map((item) => {
      ret.push(
        {
          id: item.id,
          type: parentType,
          selected: false,
          isValid: true,
          columns: [
            {
              name: 'dicValue',
              value: item.dicValue || '--'
            },
            {
              name: 'dicLabel',
              value: item.dicLabel || '--'
            }
          ],
          operations: [
            {
              name: '删除',
              action: 'deleteDic',
              type: 'delete'
            },
            {
              name: '编辑',
              action: 'editDic',
              type: 'normal'
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
      let rows = _normalizeDics(originalData.data.list)
      return {
        message: originalData.message,
        totalCount: originalData.data.total,
        rows: rows
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
    params.row['id'] && formData.append('id', params.row['id'])
    params.row['dicValue'] && formData.append('dicValue', params.row['dicValue'])
    params.row['dicLabel'] && formData.append('dicLabel', params.row['dicLabel'])
    params.row['parentId'] && formData.append('parentId', params.row['parentId'])
    params.row['type'] && formData.append('type', params.row['type'])
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.dic.save, formData, success, fail, makeData)
  }
}
