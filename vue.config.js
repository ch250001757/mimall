// 设置接口代理
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://mall-pre.springboot.cn',
        changeOrigin: true, //主机原点变为原点
        pathRewrite: {
          'api': ''
        }
      }
    }
  }
}