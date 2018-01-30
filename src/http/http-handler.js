import axios from 'axios'
import responseHandler from 'http/response-handler'
export default {
  get (url, params, success, fail, makeData) {
    axios.get(url, params).then(
      responseHandler.success(success, fail, makeData, this)
    ).catch(
      responseHandler.error(fail)
    )
  },
  post (url, params, success, fail, makeData) {
    axios.post(url, params).then(
      responseHandler.success(success, fail, makeData, this)
    ).catch(
      responseHandler.error(fail)
    )
  },
  postJSON (url, params, success, fail, makeData) {
    axios.post(url, JSON.stringify(params), {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }).then(
      responseHandler.success(success, fail, makeData, this)
    ).catch(
      responseHandler.error(fail)
    )
  }
}
