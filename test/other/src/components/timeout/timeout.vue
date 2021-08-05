<template>
  <view class="view-body">
    <view class="main">
      <view class="image-box">
        <image src="/static/image/time-out.png" mode="aspectFit" />
      </view>
      <view class="title">Loading</view>
      <view class="load-box" @tap="fresh()">
        <image src="/static/image/reload.png" mode="aspectFit" />
        <text>刷新</text>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    fresh() {
      location.reload(true);
    }
  }
};
</script>

<style lang="scss" scoped>
.view-body {
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  .main {
    width: 489rpx;
    height: 730rpx;
    .image-box {
      width: 423rpx;
      height: 422rpx;
      margin: 0 auto;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      width: 100%;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
      font-size: 40rpx;
      text-align: center;
      margin-top: 92rpx;
    }
    .load-box {
      width: 60rpx;
      height: auto;
      text-align: center;
      margin: 0 auto;
      margin-top: 60rpx;
      image {
        width: 51rpx;
        height: 50rpx;
        margin: 0 auto;
      }
      text {
        font-weight: 400;
        color: rgba(104, 197, 200, 1);
        font-size: 30rpx;
        margin-top: 22rpx;
      }
    }
  }
}
</style>
