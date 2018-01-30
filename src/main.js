import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-dark.css'

import 'common/stylus/index.styl'

import fastclick from 'fastclick'
fastclick.attach(document.body)

Vue.config.productionTip = false

Vue.use(MuseUI)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
