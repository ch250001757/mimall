<template>
  <div>
    <loading v-if="loading" />
    <div v-html="content"></div>
  </div>

</template>

<script>
import loading from '@/components/Loading'
export default {
  name: 'alipay',
  components: {
    loading,
  },
  data() {
    return {
      orderNo: this.$route.query.orderNo,
      content: '',
      loading: true
    }
  },
  mounted() {
    this.paySubmit()
  },
  methods: {
    paySubmit() {
      this.axios.post('pay', {
        orderId: this.orderNo,
        orderName: '仿造',
        amount: 0.01,
        payType: 1 // 1支付宝,2微信
      }).then((res) => {
        console.log(res)
        this.content = res.content
        setTimeout(() => {
          document.getElementById('bestPayForm').submit()
        }, 500)
      })
    },

  }


}
</script>

