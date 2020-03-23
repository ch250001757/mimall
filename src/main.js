import Vue from 'vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import store from './store/'
import {
  Message
} from 'element-ui'
// import env from './env'
// mock开关
const mock = false
if (mock) {
  require('./mock/api')
}

// 接口代理, /a/b : /api/a/b => /a/b
axios.defaults.baseURL = '/api';
axios.defaults.timeout = 8000;
// 根据环境变量获取不同的地址
// axios.defaults.baseURL = env.baseURL;

axios.interceptors.response.use(function (response) {
  let res = response.data;
  if (res.status == 0) {
    return res.data
  } else if (res.status == 10) {
    if (location.hash != '#/index') {
      // 未登录
      window.location.href = '/#/login'
    }
    return Promise.reject(res);
  }
}, function (errr) {
  // 对响应错误做点什么
  return Promise.reject(errr);
});
Vue.prototype.$message = Message;
Vue.use(vueAxios, axios)
Vue.use(VueCookie)
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: '/imgs/loading-svg/loading-spinning-bubbles.svg',
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')