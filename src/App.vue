<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import storageDefine from './storage'
import 'element-ui/lib/theme-chalk/index.css';
export default {
  name: 'App',
  components: {

  },
  mounted() {
    //  storage.setItem('aa', 11)
    // storageDefine.setItem('aa', 22, 'user')
    // storageDefine.clear('aa')
    // storageDefine.clear('a', 'user')
    // 本地集成mockjs实现数据的mock
    // this.axios.get('/user/login').then(res => {
    //   console.log(res)
    // })
    // 登录过才调用
    if (this.$cookie.get('userId')) {
      this.getUser();
      this.getCartCount();
    }
  },
  methods: {
    getUser() {
      this.axios.get('/user').then((res = {}) => {
        this.$store.dispatch('saveUserName', res.username);
      })
    },
    getCartCount() {
      this.axios.get('/carts/products/sum').then((res = 0) => {
        this.$store.dispatch('saveCartCount', res);
      })
    }
  }
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';
@import './assets/scss/base.scss';
</style>
