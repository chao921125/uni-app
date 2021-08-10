<template>
  <view>
    <view class="head-box">
      <image
        class="medicine-tab"
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-medicinetab.png"
        mode="aspectFit"
      />
    </view>
    <view class="medicine-list">
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-medicinelist.png"
        mode="aspectFit"
      />
    </view>
  </view>
</template>
<script>
export default {

};
</script>
<style lang="scss" scoped>
.head-box {
  width: 100%;
  height: auto;
  background: #ffffff;
  padding: 20rpx 0 14rpx 0;
  text-align: center;
  .medicine-tab {
    width: 100%;
    height: 183rpx;
  }
}
.medicine-list {
  width: 730rpx;
  height: 1146rpx;
  margin: 0 auto;
  margin-top: 44rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
</style>
