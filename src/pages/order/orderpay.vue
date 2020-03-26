<template>
  <div class="order-pay">
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去付款咯～</h2>
              <p>请在
                <span>30分</span>内完成支付, 超时后将取消订单</p>
              <p>{{address}}</p>
            </div>
            <div class="order-total">
              <p>应付总额：
                <span>{{payment}}</span>元</p>
              <p>订单详情
                <em class="icon-down" :class="{'up' : !showDetail}" @click="showDetail=!showDetail"></em>
              </p>
            </div>
          </div>
          <div class="item-detail" v-if="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info theme-color">5190702816411009</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{address}}</div>
            </div>
            <div class="item good">
              <div class="detail-title">商品名称：</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item,index) in orderDetail" :key="index">
                    <img v-lazy="item.productImage" />{{item.productName}}
                  </li>

                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="item-pay">
          <h3>选择以下支付方式付款</h3>
          <div class="pay-way">
            <p>支付平台</p>
            <div class="pay pay-ali" :class="{'checked':type == 1}" @click="pay(1)"></div>
            <div class="pay pay-wechat" :class="{'checked':type == 2}" @click="pay(2)"></div>
          </div>
        </div>
      </div>
    </div>
    <scan-pay-code v-if="showPay" :wxpayUrl="wxpayUrl" @closePay="closePay"></scan-pay-code>
    <Modal title="支付确认" btnType="3" sureText="查看订单" cancelText="未支付" @submit="submit" @cancel="showPayModal=false" :showModal="showPayModal">
      <template v-slot:body>
        订单确定已支付吗?
      </template>
    </Modal>
  </div>
</template>
<script>
import ScanPayCode from '@/components/ScanPayCode'
import Modal from '@/components/Modal'
import QRCode from 'qrcode'
export default {
  name: 'order-pay',
  data() {
    return {
      showDetail: false,//是否显示订单详情
      showPay: false,//是否显示微信支付弹框
      orderNo: this.$route.query.orderNo,
      orderDetail: [],
      address: '',
      payment: 0,
      type: 0, // 支付宝
      wxpayUrl: '',
      showPayModal: false
    }
  },
  components: {
    ScanPayCode,
    Modal
  },
  mounted() {
    this.goOrderList()
  },
  methods: {
    // 关闭微信弹框
    closePay() {
      this.showPay = false;
      this.showPayModal = true;
      clearInterval(this.T);
    },
    goOrderList() {
      this.axios.get(`orders/${this.orderNo}`).then(res => {
        this.orderDetail = res.orderItemVoList
        this.payment = res.payment
        let shipping = res.shippingVo
        this.address = `${shipping.receiverName} ${shipping.receiverPhone} ${shipping.receiverProvince} ${shipping.receiverCity} ${shipping.receiverDistrict}`
      })
    },
    pay(type) {
      this.type = type
      if (type == 1) {
        window.open(`#/order/alipay?orderNo=${this.orderNo}`)
      } else {
        this.axios.post('pay', {
          orderId: this.orderNo,
          orderName: '仿造',
          amount: 0.01,
          payType: 2 // 1支付宝,2微信
        }).then((res) => {
          QRCode.toDataURL(res.content)
            .then(url => {
              this.showPay = true
              this.wxpayUrl = url
              this.loopOrderState();
            })
            .catch(err => {
              console.error(err)
            })
        })
      }
    },
    submit() {
      this.$router.push('/order/list')
    },
    // 轮询当前订单支付状态
    loopOrderState() {
      this.T = setInterval(() => {
        this.axios.get(`/orders/${this.orderNo}`).then((res) => {
          if (res.status == 20) {
            clearInterval(this.T);
            this.$router.push('/order/list')
            // this.goOrderList();
          }
        })
      }, 1000);
    },
  }
}
</script>
<style lang="scss">
.order-pay {
  .wrapper {
    background-color: #f5f5f5;
    padding-top: 30px;
    padding-bottom: 61px;
    .order-wrap {
      padding: 62px 50px;
      background-color: #fff;
      font-size: 14px;
      margin-bottom: 30px;
      .item-order {
        display: flex;
        align-items: center;
        .icon-succ {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: url('/imgs/icon-gou.png') #80c58a no-repeat center;
          background-size: 60px;
          margin-right: 40px;
        }
        .order-info {
          margin-right: 248px;
          h2 {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
          }
          p {
            color: #666666;
            span {
              color: #ff6700;
            }
          }
        }
        .order-total {
          & > p:first-child {
            margin-bottom: 30px;
          }
          span {
            font-size: 28px;
            color: #ff6700;
          }
          .icon-down {
            display: inline-block;
            width: 14px;
            height: 10px;
            background: url('/imgs/icon-down.png') no-repeat center;
            background-size: contain;
            margin-left: 9px;
            transition: all 0.5s;
            cursor: pointer;
            &.up {
              transform: rotate(180deg);
            }
          }
          .icon-up {
            transform: rotate(180deg);
          }
        }
      }
      .item-detail {
        border-top: 1px solid #d7d7d7;
        padding-top: 47px;
        padding-left: 130px;
        font-size: 14px;
        margin-top: 45px;
        .item {
          margin-bottom: 19px;
          .detail-title {
            float: left;
            width: 100px;
          }
          .detail-info {
            display: inline-block;
            img {
              width: 30px;
              vertical-align: middle;
            }
          }
        }
      }
    }
    .item-pay {
      padding: 26px 50px 72px;
      background-color: #ffffff;
      color: #333333;
      h3 {
        font-size: 20px;
        font-weight: 200;
        color: #333333;
        padding-bottom: 24px;
        border-bottom: 1px solid #d7d7d7;
        margin-bottom: 26px;
      }
      .pay-way {
        font-size: 18px;
        .pay {
          display: inline-block;
          width: 188px;
          height: 64px;
          border: 1px solid #d7d7d7;
          cursor: pointer;
          &:last-child {
            margin-left: 20px;
          }
          &.checked {
            border: 1px solid #ff6700;
          }
        }
        .pay-ali {
          background: url('/imgs/pay/icon-ali.png') no-repeat center;
          background-size: 103px 38px;
          margin-top: 19px;
        }
        .pay-wechat {
          background: url('/imgs/pay/icon-wechat.png') no-repeat center;
          background-size: 103px 38px;
        }
      }
    }
  }
}
</style>