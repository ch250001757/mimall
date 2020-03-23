<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">松果出行</a>
          <a href="javascript:;">MIUI</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">协议规则</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="javascript:;" v-if="!username" @click="gotoLogin">登录</a>
          <a href="javascript:;" v-if="username" @click="loginOut">退出</a>
          <a href="javascript:;" v-if="username">我的订单</a>
          <a href="javascript:;">注册</a>
          <a href="javascript:;" class="mycard" @click="gotoCart">
            <span class="card-icon"></span>
            <span>购物车({{cartCount}})</span>
          </a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="(item,index) in phoneList" :key="index">
                  <a :href="'/#/product/'+item.id" target="_blank">
                    <div class="pro-img">
                      <img :src="item.mainImage" alt="">
                    </div>
                    <div class="pro-name">
                      {{item.name}}
                    </div>
                    <div class="pro-price">
                      {{item.price | priceFilter}}
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>Redmi红米</span>
            <div class="children"></div>
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children"></div>
          </div>
        </div>
        <div class="header-serch">
          <div class="wrapper">
            <input type="text">
            <a>
              <span class="icon"></span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "nav-header",
  data() {
    return {
      phoneList: [],
    }
  },
  computed: {
    username() {
      return this.$store.state.username
    },
    ...mapState(['cartCount'])
  },
  mounted() {
    if (this.$route.params && this.$route.params.from == 'login') {
      this.getCartCount()
    }
    this.getProduct()
  },
  filters: {
    priceFilter(val) {
      if (!val) return
      return `¥${val.toFixed(2)}元`
    }
  },
  methods: {
    getProduct() {
      this.axios.get('/products', {
        params: {
          categoryId: '100012',
          pageSize: 10
        }
      }).then(res => {
        let phoneList = Math.toString.call(res.list) == '[object Array]' ? res.list : []
        this.phoneList = phoneList.slice(0, 6)
      })
    },
    gotoCart() {
      this.$router.push('/cart')
    },
    gotoLogin() {
      this.$router.push('/login')
    },
    loginOut() {
      this.axios.post('/user/logout').then(() => {
        this.$message.success('退出成功')
        this.$cookie.set('userId', '', { expires: '-1' })
        this.$store.dispatch('saveUserName', '')
        this.$store.dispatch('saveCartCount', '')
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

<style lang="scss" >
@import '@/assets/scss/base.scss';
@import '@/assets/scss/config.scss';
@import '@/assets/scss/mixin.scss';
.header {
  .nav-topbar {
    height: 39px;
    line-height: 39px;
    background-color: #333;
    .container {
      // scss方法调用
      @include flex();
      a {
        display: inline-block;
        color: #b0b0b0;
        margin-right: 12px;
      }
      .topbar-user {
        .mycard {
          width: 110px;
          background-color: #ff6600;
          text-align: center;
          color: #fff;
          .card-icon {
            display: inline-block;
            @include bgImg(16px, 12px, '/imgs/icon-cart-checked.png');
            // width: 16px;
            // height: 12px;
            // background: url('/imgs/icon-cart-checked.png') no-repeat center;
            // background-size: contain;
            margin-right: 10px;
          }
        }
      }
    }
  }
  .nav-header {
    .container {
      height: 112px;
      display: flex;
      align-items: center;
      position: relative;

      .header-menu {
        padding-left: 160px;
        .item-menu {
          display: inline-block;
          margin-right: 15px;
          color: #333;
          font-size: 16px;
          font-weight: bold;
          &:hover {
            color: #ff6600;
            .children {
              opacity: 1;
              height: 220px;
            }
          }
          cursor: pointer;
          .children {
            // height: 220px;
            background: #fff;
            height: 0px;
            width: 1226px;
            position: absolute;
            left: 0;
            top: 112px;
            border-top: 1px solid #e5e5e5;
            box-shadow: 0px 7px 6px 0px rgba(0, 0, 0, 0.11);
            opacity: 0;
            overflow: hidden;
            transition: height 0.5s;
            ul {
              display: flex;
              position: relative;
              .product {
                width: 16.6%;
                height: 220px;
                position: relative;
                &::after {
                  position: absolute;
                  content: ' ';
                  top: 28px;
                  right: 0;
                  width: 1px;
                  height: 150px;
                  border-right: 1px solid $colorF;
                }
                &:last-child::after {
                  display: none;
                }
                a {
                  display: block;
                  text-align: center;
                  img {
                    margin-top: 20px;
                    height: 111px;
                  }
                  .pro-name {
                    margin-top: 10px;
                    font-size: 16px;
                    color: #333;
                  }
                  .pro-price {
                    margin-top: 5px;
                    font-size: 18px;
                    color: #ff6600;
                  }
                }
              }
            }
          }
        }
      }
      .header-serch {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        .wrapper {
          border: 1px solid #e0e0e0;
          width: 319px;
          height: 50px;
          display: flex;
          input {
            width: 264px;
            height: 50px;
            padding-left: 14px;
            box-sizing: border-box;
            border: none;
            border-right: 1px solid #e0e0e0;
          }
          a {
            @include flex(center);
            flex: 1;
            span {
              @include bgImg(18px, 18px, '/imgs/icon-search.png');
              // display: inline-block;
              // width: 18px;
              // height: 18px;
              // background: url('/imgs/icon-search.png') no-repeat center;
              // background-size: contain;
            }
          }
        }
      }
    }
  }
}
</style>


