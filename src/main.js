import Vue from 'vue'
import axios from 'axios'
import vueAxios from 'vue-axios'
import App from './App.vue'
import router from './router'
import VueLazyload from 'vue-lazyload'
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
    // 未登录
    window.location.href = '/#/login'
  } else {
    alert(res.meg)
  }
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

Vue.use(vueAxios, axios)
Vue.config.productionTip = false
Vue.use(VueLazyload, {
  loading: '/imgs/loading-svg/loading-spinning-bubbles.svg',
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')