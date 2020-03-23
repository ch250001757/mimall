<template>
  <div>
    <order-header :title="title">
      <template v-slot:tip>
        <span>{{tip}}</span>
      </template>
    </order-header>
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>

</template>

<script>
import OrderHeader from '@/components/OrderHeader'
import NavFooter from '@/components/NavFooter'
import ServiceBar from '@/components/ServiceBar'
export default {
  components: {
    OrderHeader,
    NavFooter,
    ServiceBar
  },
  data() {
    return {
      title: '',
      tip: ''
    }
  },
  mounted() {
    let url = this.$route.path
    if (url == '/order/comfirm') {
      this.title = '订单确认'
      this.tip = '收货地址'
    } else if (url == '/order/list') {
      this.title = '订单列表'
      this.tip = '谨防钓鱼链接'
    } else if (url == '/order/pay') {
      this.title = '订单列表'
      this.tip = '谨防钓鱼链接'
    }

  }

}
</script>

