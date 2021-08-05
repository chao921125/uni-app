<template>
  <view v-if="show" class="body-box flex-column">
    <image class="c-img" src="../static/image/page-404.png" />
    <view class="flex-column c-btn">
      <view class="btn-text" @tap.stop="goHome">{{$t('goHome')}}</view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'page404',
  props: {
    show: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    goHome() {
      this.$uni.reLaunch({ url: '/pages/tabbar/tabbar-home' });
    }
  }
};
</script>

<style lang="scss">
.body-box {
  width: 100%;
  height: 100vh;
  background: #ffffff;
}
.c-img {
  width: 469rpx;
  height: 464rpx;
  margin-top: 250rpx;
}
.c-btn {
  width: 238rpx;
  height: 70rpx;
  line-height: 70rpx;
  border-radius: 66rpx;
  border: 1rpx solid rgba(104, 197, 200, 1);
  margin-top: 180rpx;
  .btn-text {
    font-size: 28rpx;
    color: rgba(104, 197, 200, 1);
    font-weight: bold;
  }
}
</style>
