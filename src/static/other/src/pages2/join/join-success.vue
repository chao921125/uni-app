<template>
  <view>
    <view class="pro-box">
      <image
        class="join-success"
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-joinsuccess.png"
        mode="aspectFit"
      />
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-groupimg.png"
        mode="aspectFit"
      />
      <view class="pro-detail">
        <view>
          <view class="name">王朝 滴鸡精</view>
          <view class="tip">60毫升x6包</view>
        </view>
        <view class="worth">
          2600
          <text class="points">积分 +</text>
          <text class="money">
            ￥
            <text>236</text>
          </text>
        </view>
      </view>
    </view>
    <view class="person-box">
      <view class="person-in">
        <image
          class="group-leader"
          src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-groupleader.png"
          mode="aspectFit"
        />
        <open-data class="avatar image-round" type="userAvatarUrl"></open-data>
      </view>
      <view class="tip-success">恭喜你拼团成功！</view>
    </view>
    <view class="footer success-footer">
      <view class="go-home" @tap="goHome">返回首页</view>
      <view class="check-order">查看订单详情</view>
    </view>
  </view>
</template>
<script>
export default {
  methods: {
    // 点击返回首页按钮，跳转到首页
    goHome() {
      this.$uni.reLaunch({
        url: `/pages/tabbar/tabbar-home`
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.pro-box {
  width: calc(100% - 48rpx);
  height: auto;
  background: #ffffff;
  padding: 30rpx 24rpx 40rpx 24rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  .join-success {
    position: absolute;
    right: 20rpx;
    top: 46tpx;
    width: 152rpx;
    height: 152rpx;
  }
  image {
    width: 202rpx;
    height: 202rpx;
  }
  .pro-detail {
    width: calc(100% - 222rpx);
    height: 202rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    margin-left: 20rpx;
    .name,
    .tip {
      font-weight: 400;
      color: #000000;
      font-size: 28rpx;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .tip {
      font-size: 24rpx;
      margin-top: 20rpx;
    }
    .worth {
      font-weight: bold;
      color: #000000;
      font-size: 40rpx;
      display: flex;
      align-items: center;
      .points {
        font-size: 30rpx;
        margin-left: 10rpx;
      }
      .money {
        font-weight: 400;
        color: #000000;
        font-size: 26rpx;
        text {
          font-size: 36rpx;
          font-weight: 500;
        }
      }
    }
  }
}
.person-box {
  width: calc(100% - 468rpx);
  height: 184rpx;
  background: #ffdbdc;
  border-radius: 0rpx 0rpx 10rpx 10rpx;
  padding: 40rpx 234rpx;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  .person-in {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .group-leader {
      width: 100rpx;
      height: 108rpx;
    }
    .image-round {
      width: 100rpx;
      height: 100rpx;
    }
  }
  .tip-success {
    font-weight: 400;
    color: #000000;
    font-size: 30rpx;
  }
}
.success-footer {
  width: calc(100% - 128rpx);
  padding: 16rpx 64rpx;
  position: absolute;
  background: #c70026;
  box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(0, 0, 0, 0.16);
  display: flex;
  justify-content: space-between;
  align-items: center;
  .go-home,
  .check-order {
    width: 290rpx;
    height: 50rpx;
    background: #ffdbdc;
    border-radius: 10rpx;
    text-align: center;
    line-height: 50rpx;
    font-size: 30rpx;
    font-weight: 400;
    color: #000000;
  }
  .check-order {
    background: #000000;
    color: #ffffff;
  }
}
</style>
