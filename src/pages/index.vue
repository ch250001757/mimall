<template>
  <div class="main-page">
    <div class="container">
      <div class="menu">
        <ul class="menu-warp">
          <li class="menu-list">
            <a href="javascript:;">手机 电话卡</a>
            <div class="children">
              <ul v-for="(item,index) in menuChildList" :key="index">
                <li v-for="(subitem,subinex) in item" :key="subinex">
                  <a :href="subitem ? '#/product/'+subitem.id: ''">
                    <img v-lazy="subitem ? subitem.img: '/imgs/item-box-1.png'"> {{subitem ? subitem.name: '小米9'}}
                  </a>
                </li>
              </ul>
            </div>
          </li>
          <li class="menu-list">
            <a href="javascript:;">电视 盒子</a>
          </li>
          <li class="menu-list">
            <a href="javascript:;">笔记本 平板</a>
          </li>
          <li class="menu-list">
            <a href="javascript:;">家电 插线板</a>
          </li>
          <li class="menu-list">
            <a href="javascript:;">出行 穿戴</a>
          </li>
          <li class="menu-list">
            <a href="javascript:;">智能 路由器</a>
          </li>
          <li class="menu-list">
            <a href="javascript:;">电源 配件</a>
          </li>
          <li class="menu-list">
            <a href="javascript:;">生活 箱包</a>
          </li>
        </ul>
      </div>
      <div class="swiper-box">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item, index) in swiperList" :key="index">
            <a :href="'/#/product/'+item.id">
              <img v-lazy="item.img" alt="">
            </a>
          </swiper-slide>
          <div class="swiper-pagination" slot="pagination"></div>
          <div class="swiper-button-prev" slot="button-prev"></div>
          <div class="swiper-button-next" slot="button-next"></div>
        </swiper>
      </div>
      <div class="ads-box">
        <a :href="'/#/product/'+item.id" v-for="(item,index) in adsList" :key="index">
          <img v-lazy="item.img" alt="">
        </a>
      </div>
      <div class="banner">
        <a href='/#/product/30'>
          <img v-lazy="'/imgs/banner-1.png'" alt="">
        </a>
      </div>
    </div>
    <div class="product-box">
      <div class="container">
        <h2>手机</h2>
        <div class="warpper">
          <div class="banner-left">
            <img v-lazy="'/imgs/mix-alpha.jpg'" alt="">
          </div>
          <div class="banner-right">
            <div class="list" v-for="(item,index) in phoneList" :key="index">
              <div class="item" v-for="(subitem,subindex) in item" :key="subindex">
                <a href="javascript;">
                  <p class="title" :class="{'new-product': subindex % 2 == 0}">新品</p>
                  <div class="item-img">
                    <img v-lazy="subitem.mainImage" alt="">
                  </div>
                  <p class="name">{{subitem.name}}</p>
                  <p class="dec">{{subitem.subtitle}}</p>
                </a>
                <p class="price" @click="addCard(item.id)">{{subitem.price}}元</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <service-bar></service-bar>
    <Modal title="提示" surText="查看购物车" btnType="1" modalType="middle" :showModal="showModal" @submit="gotoCard" @cancel="showModal=false">
      <template v-slot:body>
        <p>商品添加成功</p>
      </template>
    </Modal>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import ServiceBar from '@/components/ServiceBar'
import Modal from '@/components/Modal'
export default {
  components: {
    ServiceBar,
    swiper,
    swiperSlide,
    Modal
  },
  data() {
    return {
      swiperOption: {
        loop: true, // 循环模式选项
        autoplay: true,
        effect: 'cube',
        cubeEffect: {
          slideShadows: true,
          shadow: true,
          shadowOffset: 100,
          shadowScale: 0.6
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      swiperList: [
        { id: '42', img: '/imgs/slider/slide-1.jpg' },
        { id: '45', img: '/imgs/slider/slide-2.jpg' },
        { id: '46', img: '/imgs/slider/slide-3.jpg' },
        { id: '', img: '/imgs/slider/slide-4.jpg' },
        { id: '', img: '/imgs/slider/slide-5.jpg' },
      ],
      menuChildList: [
        [
          { id: 30, img: '/imgs/item-box-1.png', name: '小米CC9' },
          { id: 31, img: '/imgs/item-box-2.png', name: '小米8青春版' },
          { id: 32, img: '/imgs/item-box-3.jpg', name: 'Redmi K20 Pro' },
          { id: 33, img: '/imgs/item-box-4.jpg', name: '移动4G专区' }
        ],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ],
      adsList: [
        { id: 33, img: '/imgs/ads/ads-1.png' },
        { id: 45, img: '/imgs/ads/ads-3.png' },
        { id: 48, img: '/imgs/ads/ads-2.jpg' },
        { id: 47, img: '/imgs/ads/ads-4.jpg' }
      ],
      phoneList: [],
      showModal: false
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.axios.get('/products', {
        params: {
          categoryId: '100012',
          pageSize: 14
        }
      }).then(res => {
        let phoneList = Math.toString.call(res.list) == '[object Array]' ? res.list : []
        this.phoneList = [phoneList.slice(6, 10), phoneList.slice(10, 14)]
      })
    },
    addCard() {
      this.showModal = true
    },
    gotoCard() {
      this.$router.push('/cart')
    }
  }

}
</script>


<style lang="scss">
@import '@/assets/scss/mixin.scss';
@import '@/assets/scss/config.scss';
.main-page {
  // position: relative;
  .container {
    position: relative;
  }
  .menu {
    width: 264px;
    height: 451px;
    background: #7f7878b8;
    position: absolute;
    z-index: 4;
    left: 0;
    top: 0;
    padding: 30px 0;
    box-sizing: border-box;
    .menu-warp {
      .menu-list {
        height: 50px;
        line-height: 50px;
        a {
          display: block;
          color: #fff;
          padding-left: 20px;
          font-size: 16px;
          position: relative;
          &::after {
            content: ' ';
            position: absolute;
            top: 17.5px;
            right: 20px;
            @include bgImg(15px, 15px, '/imgs/icon-arrow.png');
          }
        }
        &:hover {
          background: $colorA;
          .children {
            display: block;
          }
        }
        .children {
          position: absolute;
          left: 264px;
          top: 0;
          height: 451px;
          width: 962px;
          background: #fff;
          border: 1px solid $colorH;
          display: none;
          ul {
            display: flex;
            justify-content: space-around;
            li {
              flex: 1;
              height: 80px;
              line-height: 50px;

              a {
                display: inline-block;
                color: $colorB;
                img {
                  width: 40px;
                  // height: 20px;
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
    }
  }
  .swiper-box {
    .swiper-container {
      height: 451px;
      .swiper-button-prev {
        left: 280px;
      }
      a {
        display: block;
        img {
          width: 100%;
          height: 451px;
        }
      }
    }
  }
  .ads-box {
    @include flex();
    margin: 20px 0 30px;
    a {
      display: block;
      width: 296px;
      height: 167px;
      img {
        width: 100%;
      }
    }
  }
  .banner {
    margin-bottom: 20px;
    a {
      display: block;
      height: 120px;
      img {
        height: 100%;
        width: 100%;
      }
    }
  }
  .product-box {
    background: $colorJ;
    margin-bottom: 20px;
    h2 {
      margin: 10px 0;
    }
    .warpper {
      display: flex;
      .banner-left {
        width: 224px;
        height: 619px;
        margin-right: 16px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .banner-right {
        flex: 1;
        .list {
          @include flex();
          &:last-child {
            margin-top: 10px;
          }
          .item {
            width: 236px;
            height: 302px;
            background: #fff;
            text-align: center;
            a {
              display: inline-block;
              .title {
                color: #fff;
                line-height: 30px;
                text-align: center;
                width: 50px;
                margin: 5px auto;
                font-size: 16px;
                &.new-product {
                  background: seagreen;
                }
              }

              img {
                width: 160px;
                height: 140px;
                margin-top: 10px;
              }
              .name {
                font-size: 18px;
                margin-top: 15px;
                color: $colorB;
              }
              .dec {
                color: $colorC;
                font-size: 14px;
              }
            }
            .price {
              position: relative;
              margin-top: 12px;
              color: $colorA;
              font-size: 16px;
              font-weight: 550;
              line-height: 25px;
              cursor: pointer;
              &::after {
                content: ' ';
                margin-left: 10px;
                position: absolute;
                @include bgImg(20px, 20px, '/imgs/icon-cart-hover.png');
              }
            }
          }
        }
      }
    }
  }
}
</style>
