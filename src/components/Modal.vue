<template>
  <transition name="slide">
    <div class="modal" v-show="showModal">
      <div class="mask"></div>
      <div class="modal-dialog">
        <div class="modal-header">
          <span>{{title}}</span>
          <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <a href="javascript:;" class="btn" v-if="btnType == 1" @click="$emit('submit')">{{sureText}}</a>
          <a href="javascript:;" class="btn" v-if="btnType == 2" @click="$emit('cancel')">{{cancelText}}</a>
          <div class="btn-group" v-if="btnType == 3">
            <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
            <a href="javascript:;" class="btn" @click="$emit('cancel')">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'modal',
  props: {
    // 弹框类型,小、中、大、表单
    modalType: {
      type: String,
      default: 'form'
    },
    title: String,
    // 1.确定按钮,2.取消按钮,3.确定取消
    btnType: String,
    sureText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    showModal: Boolean
  }

}
</script>

<style lang="scss">
@import '@/assets/scss/config.scss';
@import '@/assets/scss/mixin.scss';

.modal {
  @include position(fixed);
  z-index: 10;
  // vue 中的动画
  transition: all 0.5s;
  &.slide-enter-active {
    top: 0;
  }
  &.slide-enter {
    top: -100%;
  }
  &.slide-leave-active {
    top: -100%;
  }
  .mask {
    @include position(fixed);
    background: #000;
    opacity: 0.5;
  }
  .modal-dialog {
    @include position(absolute, 40%, 50%, 660px, auto);
    transform: translate(-50%, -50%);
    background: #fff;
    .modal-header {
      background: $colorJ;
      padding: 0 25px;
      line-height: 60px;
      font-size: 16px;
      .icon-close {
        position: absolute;
        top: 24px;
        right: 25px;
        width: 14px;
        height: 14px;
        background: url('/imgs/icon-close.png') no-repeat;
        background-size: contain;
        transition: all 0.5;
        &:hover {
          transform: scale(1.2);
        }
      }
    }
    .modal-body {
      padding: 42px 40px 54px;
      font-size: 14px;
    }
    .modal-footer {
      height: 82px;
      line-height: 82px;
      text-align: center;
      background: $colorJ;
    }
  }
}
</style>


