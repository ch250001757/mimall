<template>
  <div class="service-bar">
    <div class="container">
      <ul>
        <li>
          <a href="#">
            <span class="icon-setting"></span>
            预约维修服务
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon-day7"></span>
            7天无理由退货
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon-day15"></span>
            15天免费升级
          </a>
        </li>
        <li>
          <a href="#">
            <span class="icon-post"></span>
            满150元包邮
          </a>
        </li>
      </ul>
    </div>
  </div>

</template>

<script>

export default {
  name: "serviceBar"
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/config.scss';
@import '@/assets/scss/mixin.scss';
.service-bar {
  padding: 22px 0;
  ul {
    li {
      display: inline-block;
      width: 24.9%;
      text-align: center;
      border-right: 1px solid $colorF;
      a {
        display: inline-block;
        color: $colorC;
        span {
          vertical-align: middle;
          margin-right: 10px;
          margin-bottom: 4px;
        }
      }
      .icon-setting {
        @include bgImg(20px, 20px, '/imgs/icon-setting.png');
      }
      .icon-day7 {
        @include bgImg(20px, 20px, '/imgs/icon-7day.png');
      }
      .icon-day15 {
        @include bgImg(20px, 20px, '/imgs/icon-15day.png');
      }
      .icon-post {
        @include bgImg(20px, 20px, '/imgs/icon-post.png');
      }
    }
  }
}
</style>



