<template>
  <view>
    <view class="sale-today">
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-saletoday.png"
        mode="aspectFit"
      />
    </view>
    <view class="sale-group">
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-salegroup.png"
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
.sale-today,
.sale-group {
  width: 710rpx;
  height: 307rpx;
  margin: 0 auto;
  margin-top: 36rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.sale-group {
  width: 738rpx;
  height: 520rpx;
  margin-top: 62rpx;
}
</style>
