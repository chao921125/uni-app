<template>
  <view>
    <view class="detail-head">
      <image :src="productObj.img" mode="aspectFit" />
    </view>
    <view class="info-box">
      <view class="tip-title">{{productObj.name}}</view>
      <view class="tip-info">产品规格：{{productObj.spec}}</view>
    </view>
    <view v-if="productObj.detailImg.length > 0">
      <view class="shop-detail" v-for="(item,index) in productObj.detailImg" :key="index">
        <image :src="item" mode="aspectFit" />
      </view>
    </view>
    <view class="footer shop-footer">
      <view class="shop-info">
        {{productObj.points}}
        <text class="points">积分 +</text>
        <text class="money">
          ￥
          <text>{{productObj.sellingPrice}}</text>
        </text>
      </view>
      <view class="exchange-btn" @tap="goExchange(productObj)">兑换</view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      id: '',
      productObj: {}
    };
  },
  onLoad(option) {
    this.id = option.id;
    this.pageInit();
  },
  methods: {
    pageInit() {
      this.$axios.get({
        url: `/app-product/${this.id}`
      }).then(res => {
        this.productObj = res;
      });
    },
    // 跳转到确认订单页面
    goExchange(productObj) {
      this.$uni.navigateTo({
        url: `/pages2/order/confirm-order?productObj=${JSON.stringify(productObj)}`
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.detail-head {
  width: 100%;
  height: 750rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.info-box {
  width: calc(100% - 40rpx);
  height: 148rpx;
  background: #ffffff;
  box-shadow: 0rpx 0rpx 14rpx 0rpx rgba(0, 0, 0, 0.15);
  border-radius: 0rpx 0rpx 20rpx 20rpx;
  padding: 16rpx 20rpx 0 20rpx;
  .tip-title {
    font-weight: 500;
    color: #343434;
    font-size: 36rpx;
  }
  .tip-info {
    font-weight: 400;
    color: #c70026;
    font-size: 28rpx;
    margin-top: 18rpx;
  }
}
.shop-detail {
  display: block;
  width: 740rpx;
  height: 945rpx;
  margin: 0 auto;
  margin-top: 20rpx;
  padding-bottom: 100rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.shop-footer {
  position: fixed;
  bottom: 0;
  background: #c70026;
  box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(0, 0, 0, 0.16);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .shop-info {
    font-weight: bold;
    color: #ffffff;
    font-size: 40rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .points {
      font-weight: 400;
      color: #ffffff;
      font-size: 28rpx;
      margin-left: 10rpx;
    }
    .money {
      font-weight: 400;
      color: #ffffff;
      font-size: 26rpx;
      text {
        font-size: 36rpx;
        font-weight: 500;
      }
    }
  }
  .exchange-btn {
    width: 190rpx;
    height: 50rpx;
    background: #000000;
    border-radius: 10rpx;
    line-height: 50rpx;
    text-align: center;
    font-size: 30rpx;
    font-weight: 400;
    color: #ffffff;
  }
}
</style>
