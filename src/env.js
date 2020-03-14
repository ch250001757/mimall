// 接口环境设置
let baseURL;
// 获取node进程一些环境变量
switch (process.env.NODE_ENV) {
  case 'development':
    baseURL = 'http://dev-mall-pre.springboot.cn/api'
    break;
  case 'test':
    baseURL = 'http://test-mall-pre.springboot.cn/api'
    break;
  case 'prod':
    baseURL = 'http://prod-mall-pre.springboot.cn/api'
    break;
  default:
    baseURL = 'http://prod-mall-pre.springboot.cn/api'
    break;
}

export default {
  baseURL
}