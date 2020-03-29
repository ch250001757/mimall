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
  },
  // publicPath:'/app',
  // outputDir:'dist',
  // indexPath:'index2.html',
  // lintOnSave:false,
  productionSourceMap: true, // 把打包项目的源码 有/没有源码
  // 删除预加载 真正按需
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  }
}