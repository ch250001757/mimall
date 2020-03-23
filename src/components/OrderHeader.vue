<template>
  <div class="order-header">
    <div class="container clearfix">
      <div class="header-logo ">
        <a href="/#/index"></a>
      </div>
      <div class="header-title">
        <h2>{{title}}
          <slot name="tip"></slot>
        </h2>
      </div>
      <div class="username">
        <a href="javascript:;">{{username}}</a>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'order-header',
  props: {
    title: String
  },
  computed: {
    ...mapState(['username', 'cartCount'])
  }

}
</script>

<style lang="scss">
.order-header {
  padding: 30px 0;
  border-bottom: 2px solid #ff6600;
  .header-logo {
    float: left;
  }
  .header-title,
  .username {
    height: 55px;
    line-height: 55px;
  }
  .header-title {
    float: left;
    h2 {
      margin: 0 10px;
      font-size: 28px;
      color: #333;
    }
    span {
      color: #cccccc;
      font-size: 14px;
    }
  }
  .username {
    float: right;
    a {
      color: #000;
      font-size: 16px;
    }
  }
}
</style>


