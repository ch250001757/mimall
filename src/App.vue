<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
// import storageDefine from './storage'

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
  }
}
</script>

<style lang="scss">
@import './assets/scss/reset.scss';
@import './assets/scss/config.scss';
@import './assets/scss/button.scss';
</style>
