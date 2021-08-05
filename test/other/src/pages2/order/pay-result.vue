<template>
  <view class="me-body">
    <image
      src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/login-bg1.png"
      mode="aspectFit"
      class="login-bg1"
    />
    <image
      src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/login-bg2.png"
      mode="aspectFit"
      class="login-bg2"
    />
    <view class="result-head">
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/pay-success.png"
        mode="aspectFit"
      />
      <view>支付成功</view>
    </view>
    <view class="order-box">
      <view class="time-box">
        <view class="name">支付时间</view>
        <view class="info">{{orderObj.updatedAt}}</view>
      </view>
      <view class="time-box">
        <view class="name">订单编号</view>
        <view class="info">{{orderObj.id}}</view>
      </view>
      <view class="time-box">
        <view class="name">支付数额</view>
        <view class="info">{{orderObj.paymentAmount}}</view>
      </view>
      <view class="time-box">
        <view class="name">支付方式</view>
        <view class="info">{{orderObj.paytype}}</view>
      </view>
      <view class="time-box">
        <view class="name">支付积分</view>
        <view class="info">{{orderObj.integral}} 积分</view>
      </view>
    </view>
    <view class="btn-box">
      <view class="check-order">查看订单</view>
      <view class="go-shopping" @tap="goShopping">继续购买</view>
    </view>
  </view>
</template>
<script>
import _ from 'lodash';
export default {
  data() {
    return {
      id: undefined,
      orderObj: {},
      // 支付方式
      payType: [
        { value: 10, name: '数字人民币' },
        { value: 20, name: '余额支付' },
        { value: 30, name: '微信支付' }
      ]
    };
  },
  onLoad(option) {
    this.id = option.id;
    this.pageInit();
  },
  methods: {
    pageInit() {
      this.$axios.get({
        url: `/app-order/`,
        data: {
          id: this.id
        }
      }).then(res => {
        this.orderObj = res;
        this.orderObj.paytype = _(this.payType).find({
          value: parseInt(res.paymentMethod)
        }).name;
      });
    },
    // 点击继续购买按钮，返回首页
    goShopping() {
      this.$uni.reLaunch({
        url: `/pages/tabbar/tabbar-home`
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.me-body {
  width: calc(100% - 60rpx);
  height: calc(100% - 54rpx);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #c70026;
  overflow: hidden;
  text-align: center;
  padding: 54rpx 30rpx 0 30rpx;
  .login-bg1 {
    width: 325rpx;
    height: 256rpx;
    position: absolute;
    left: 0;
    top: 0;
  }
  .login-bg2 {
    width: 363rpx;
    height: 257rpx;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .result-head {
    width: 100%;
    height: auto;
    border-bottom: 1rpx solid #000000;
    text-align: center;
    image {
      width: 193rpx;
      height: 217rpx;
    }
    view {
      font-weight: normal;
      color: #000000;
      font-size: 30rpx;
      margin-top: 16rpx;
      padding-bottom: 70rpx;
    }
  }
  .order-box {
    width: 100%;
    height: auto;
    margin: 0 auto;
    padding: 50rpx 0 20rpx 0;
    .time-box {
      width: 100%;
      height: 70rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .name,
      .info {
        font-weight: 400;
        color: #ffffff;
        font-size: 30rpx;
      }
      .info {
        color: #000000;
      }
    }
  }
  .btn-box {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    margin: 0 auto;
    margin-top: 40rpx;
    .check-order,
    .go-shopping {
      display: inline-block;
      padding: 20rpx 108rpx;
      background: #000000;
      border-radius: 10rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #ffffff;
    }
  }
}
</style>
