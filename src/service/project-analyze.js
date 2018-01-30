/**
 * Created by zhulin on 2017/6/18.
 */
import httpHandler from 'http/http-handler'
import uris from 'router/uris'
export default {
  get (params, success, fail) {
    function makeData (originalData) {
      return originalData.data
    }
    httpHandler.get.bind(this)(uris.project.selectChartBgData, {}, success, fail, makeData)
  },
  getChartPieData (params, success, fail) {
    function makeData (originalData) {
      return originalData.data
    }
    httpHandler.get.bind(this)(uris.project.getChartPieData, {
      params: {type: params.type, dicValue: params.dicValue}
    }, success, fail, makeData)
  }
}
