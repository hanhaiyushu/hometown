import Vue from 'vue'
import App from './App.vue'
// 导入路由模块
import router from '@/router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

// 导入样式
import './assets/css/bootstrap.css'
import './index.css'

import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  // ak密钥
  ak: 'DUnTwhGWs924KlsX1HYLBwktymGaN4vC'
})

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
