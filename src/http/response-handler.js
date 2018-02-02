import errorMessage from './error-message'
import EventBus from 'utilities/event-bus'
export default {
  success: function (success, fail, makeData, vm) {
    return (response) => {
      try {
        let data = typeof response.data === 'object' ? response.data : JSON.parse(response.data)
        if (data.code === 200) {
          success && success(makeData ? makeData(data) : data)
        } else if (data.code === 101) {
          EventBus.backUrl = vm.$route.path
          vm.$router.replace('login')
        } else if (data.code === 102) {
          vm.$router.replace('member-list')
        } else if (data.code === 103) {
          vm.$router.replace('member-list')
        } else {
          console.log('fail')
          vm.showMsgBox && vm.showMsgBox(data.errorMessage || errorMessage[data.code] || '未定义错误消息' + data.code, data.code)
          fail && fail(data.errorMessage || errorMessage[data.code] || '未定义错误消息' + data.code, data.code)
        }
      } catch (e) {
        console.log('JSON解析异常')
      }
      vm.$refs.loading && vm.$refs.loading.hide()
    }
  },
  error: function (error, vm) {
    return (err) => {
      console.log(err)
      error && error(err)
      vm.$refs.loading && vm.$refs.loading.hide()
      vm.showMsgBox && vm.showMsgBox(vm.message)
    }
  }
}
