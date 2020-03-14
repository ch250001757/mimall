<template>
  <div class="footer">
    <div class="footer-log">
      <img src="/imgs/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="">CH主页</a>
      <span>|</span>
      <a href="">Vue课程</a>
      <span>|</span>
      <a href="">React课程</a>
      <span>|</span>
      <a href="">微信小程序(小程序+公众号)</a>
    </div>
    <div class="cppyright">
      Copryright@2019
      <span>mi.futrufe.com</span>All Right
    </div>
  </div>

</template>

<script>

export default {
  name: "nav-footer"
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/config.scss';
.footer {
  height: 234px;
  background: $colorB;
  text-align: center;
  color: $colorC;
  font-size: 16px;
  border-top: 4px solid $colorA;
  .footer-log {
    margin-top: 40px;
    img {
      width: 50px;
    }
    p {
      margin-top: 15px;
    }
  }
  .footer-link {
    margin-top: 30px;
    a {
      font-size: 16px;
      display: inline-block;
      color: $colorC;
    }
    span {
      margin: 0 10px;
    }
  }
  .cppyright {
    margin-top: 10px;
    font-size: 14px;
    span {
      color: $colorA;
    }
  }
}
</style>



