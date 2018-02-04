/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'http/http-handler'
import uris from 'router/uris'
export default {
  import (params, success, fail) {
    let formData = new FormData()
    formData.append('file', params.file)
    function makeData (originalData) {
      return originalData
    }
    httpHandler.post.bind(this)(uris.staff.import, formData, success, fail, makeData)
  }
}
