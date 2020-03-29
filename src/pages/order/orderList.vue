<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
        <span>请谨防钓鱼链接或诈骗电话，了解更多></span>
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <Loading v-if="loading" />
        <div class="order-box">
          <div class="order" v-for="(item,i) in orderList" :key="i">
            <div class="order-title">
              <div class="item-info fl">
                {{item.createTime}}
                <span>|</span>
                {{item.receiverName}}
                <span>|</span>
                订单号： {{item.orderNo}}
                <span>|</span>
                {{item.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额：</span>
                <span class="money">{{item.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearfix" v-for="(subItem,subI) in item.orderItemVoList" :key="subI">
              <div class="good-box fl">
                <div class="good-list">
                  <div class="good-img">
                    <img v-lazy="subItem.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{subItem.productName}}</div>
                    <div class="p-money">{{subItem.currentUnitPrice}} X {{item.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr">
                <a href="javascript:;">{{item.statusDesc}}</a>
              </div>
            </div>
          </div>
          <el-pagination :page-size="pageSize" layout="prev, pager, next" :total="pageTotal" @current-change="handlePage">
          </el-pagination>
          <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="410" v-if="false">
            <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading">
          </div>
        </div>
        <no-data v-if="!loading && orderList.lenght == 0"></no-data>
      </div>
    </div>
  </div>
</template>
<script>
import { Pagination } from 'element-ui';
import OrderHeader from '@/components/OrderHeader'
import NoData from '@/components/NoData'
import Loading from '@/components/Loading'
import infiniteScroll from 'vue-infinite-scroll'

export default {
  name: 'order-list',
  components: {
    OrderHeader,
    NoData,
    Loading,
    [Pagination.name]: Pagination
  },
  data() {
    return {
      orderList: [],
      loading: true,
      pageNum: 1,
      pageSize: 5,
      pageTotal: 0,
      busy: false,//滚动加载，是否触发
    }
  },
  directives: { infiniteScroll },
  mounted() {
    this.getOrderList()
  },
  methods: {
    getOrderList() {
      this.busy = true
      this.loading = true
      this.axios.get('orders', {
        params: {
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }
      }).then(res => {
        this.loading = false
        this.busy = false
        console.log(res)
        this.orderList = res.list || []
        this.pageTotal = res.total
      })
    },
    handlePage(val) {
      this.pageNum = val
      this.getOrderList()
    },
    loadMore() {
      this.busy = true;
      setTimeout(() => {
        this.pageNum++
        this.getOrder2()
      }, 1000);
    },
    getOrder2() {
      this.loading = true
      this.axios.get('orders', {
        params: {
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }
      }).then(res => {
        this.orderList = this.orderList.concat(res.list)
        this.loading = false;
        if (res.hasNextPage) {
          this.busy = false
        } else {
          this.busy = true
        }
      })
    },
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/config.scss';
@import '@/assets/scss/mixin.scss';
.order-list {
  .wrapper {
    background-color: $colorJ;
    padding-top: 33px;
    padding-bottom: 110px;
    .order-box {
      .order {
        @include border();
        background-color: $colorG;
        margin-bottom: 31px;
        &:last-child {
          margin-bottom: 0;
        }
        .order-title {
          @include height(74px);
          background-color: $colorK;
          padding: 0 43px;
          font-size: 16px;
          color: $colorC;
          .item-info {
            span {
              margin: 0 9px;
            }
          }
          .money {
            font-size: 26px;
            color: $colorB;
          }
        }
        .order-content {
          padding: 0 43px;
          .good-box {
            width: 88%;
            .good-list {
              display: flex;
              align-items: center;
              height: 145px;
              .good-img {
                width: 112px;
                img {
                  width: 100%;
                }
              }
              .good-name {
                font-size: 20px;
                color: $colorB;
              }
            }
          }
          .good-state {
            @include height(145px);
            font-size: 20px;
            color: $colorA;
            a {
              color: $colorA;
            }
          }
        }
      }
      .el-pagination {
        text-align: right;
      }
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        background-color: #ff6600;
      }
      .el-button--primary {
        background-color: #ff6600;
        border-color: #ff6600;
      }
      .load-more,
      .scroll-more {
        text-align: center;
      }
    }
  }
}
</style>