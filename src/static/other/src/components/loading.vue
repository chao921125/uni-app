<template>
  <view class="loading">
    <view class="loading-icon">
      <view class="demo"></view>
      <view class="demo"></view>
      <view class="demo"></view>
      <view class="demo"></view>
      <view class="demo"></view>
      <view class="demo"></view>
      <view class="demo"></view>
      <view class="demo"></view>
    </view>
    <view class="load-tv">{{$t('loading')}}...</view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  onLoad() { },
  methods: {}
};
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99999;
}
.load-tv {
  text-align: center;
  color: white;
  font-size: 32rpx;
  margin-top: 50vh;
}
.loading-icon {
  position: absolute;
  width: 60rpx;
  height: 60rpx;
  top: 45%;
  left: 50%;
  margin-left: -30rpx;
  margin-top: -30rpx;
}

.demo {
  width: 6rpx;
  height: 6rpx;
  border-radius: 100%;
  background: #ffffff;
  position: absolute;
  animation: demo linear 0.8s infinite;
  -webkit-animation: demo linear 0.8s infinite;
}

.demo:nth-child(1) {
  left: 24rpx;
  top: 2rpx;
  animation-delay: 0s;
}

.demo:nth-child(2) {
  left: 40rpx;
  top: 8rpx;
  animation-delay: 0.1s;
}

.demo:nth-child(3) {
  left: 47rpx;
  top: 24rpx;
  animation-delay: 0.1s;
}

.demo:nth-child(4) {
  left: 40rpx;
  top: 40rpx;
  animation-delay: 0.2s;
}

.demo:nth-child(5) {
  left: 24rpx;
  top: 47rpx;
  animation-delay: 0.4s;
}

.demo:nth-child(6) {
  left: 8rpx;
  top: 40rpx;
  animation-delay: 0.5s;
}

.demo:nth-child(7) {
  left: 2rpx;
  top: 24rpx;
  animation-delay: 0.6s;
}

.demo:nth-child(8) {
  left: 8rpx;
  top: 8rpx;
  animation-delay: 0.7s;
}

@keyframes demo {
  0%,
  40%,
  100% {
    transform: scale(1);
  }

  20% {
    transform: scale(1.8);
  }
}

@-webkit-keyframes demo {
  0%,
  40%,
  100% {
    transform: scale(1);
  }

  20% {
    transform: scale(1.8);
  }
}
</style>
