import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN.js' // 组件内部默认使用中文

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
import util from './api/util.js'

import './directives/dialogDrag'//全局引入v-dialogDrag自定义指令

Vue.prototype.util = util

import '@/icons' // icon
import '@/permission' // permission control

/** 公共时间过滤器 */
import vueFilter from './utils/time-filter'
for (const key in vueFilter) {
  Vue.filter(key, vueFilter[key])
}

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
