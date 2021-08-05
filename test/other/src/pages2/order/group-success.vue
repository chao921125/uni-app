<template>
  <view>
    <view class="pro-box">
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-grouporderImg.png"
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
      <image
        class="group-leader"
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-groupleader.png"
        mode="aspectFit"
      />
      <image
        class="group-joiner"
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-groupjoiner.png"
        mode="aspectFit"
      />
    </view>
    <button class="invita-btn" open-type="share">邀请好友参团</button>
  </view>
</template>
<script>
export default {
  onShareAppMessage() {
    let shareObj = {
      title: `邀请参团`,
      imageUrl: 'https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-grouporderImg.png',
      path: '/pages2/join/join-detail?isInvita=yes'
    };
    return shareObj;
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
  height: 194rpx;
  background: #ffdbdc;
  border-radius: 0rpx 0rpx 10rpx 10rpx;
  padding: 0 234rpx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .group-leader {
    width: 100rpx;
    height: 108rpx;
  }
  .group-joiner {
    width: 100rpx;
    height: 100rpx;
  }
}
.invita-btn {
  width: 238rpx;
  height: 70rpx;
  background: #000000;
  border-radius: 10rpx;
  text-align: center;
  line-height: 70rpx;
  font-size: 30rpx;
  font-weight: 400;
  color: #ffffff;
  margin: 0 auto;
  margin-top: 140rpx;
}
</style>
