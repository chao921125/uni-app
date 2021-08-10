<template>
  <view>
    <view class="detail-head">
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-groupimg.png"
        mode="aspectFit"
      />
    </view>
    <view class="info-box">
      <view class="tip-title">
        <view class="group-num">2人团</view>
        <view class="name">天喜堂天喜丸</view>
      </view>
      <view class="tip-info">60毫升x6包</view>
    </view>
    <view class="detail-box">
      <view class="title">
        参团
        <text>(2人团)</text>
      </view>
      <view class="join-box">
        <view class="tab-box">
          <view class="img-box">
            <image
              src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-jointab1.png"
              mode="aspectFit"
            />
          </view>
          <view class="join-btn" @tap="goJoin">参团</view>
        </view>
        <view class="tab-box1">
          <view class="img-box">
            <image
              src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-jointab2.png"
              mode="aspectFit"
            />
          </view>
          <view class="join-btn" @tap="goJoin">参团</view>
        </view>
        <view class="tab-box2">
          <view class="img-box">
            <image
              src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-jointab3.png"
              mode="aspectFit"
            />
          </view>
          <view class="join-btn" @tap="goJoin">参团</view>
        </view>
      </view>
      <view class="more-box">
        <view class="more">查看更多</view>
      </view>
    </view>
    <view class="detail-img">
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-groupdetail.png"
        mode="aspectFit"
      />
    </view>
    <view class="footer shop-footer">
      <view class="shop-info">
        2600
        <text class="points">积分 +</text>
        <text class="money">
          ￥
          <text>236</text>
        </text>
      </view>
      <view class="exchange-btn" @tap="goGroupOrder">开团</view>
    </view>
  </view>
</template>
<script>
export default {
  methods: {
    // 点击参团按钮，跳转到参团页面
    goJoin() {
      this.$uni.navigateTo({
        url: `/pages2/join/join-detail`
      });
    },
    // 跳转到确认团购订单页面
    goGroupOrder() {
      this.$uni.navigateTo({
        url: `/pages2/order/group-order`
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
  border-top: 1rpx solid #e8e8e8;
  padding: 16rpx 20rpx 0 20rpx;
  .tip-title {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .group-num {
      width: 90rpx;
      height: 40rpx;
      background: #ffdbdc;
      border-radius: 6rpx;
      text-align: center;
      line-height: 40rpx;
      font-size: 24rpx;
      font-weight: normal;
      color: #000000;
    }
    .name {
      font-weight: 500;
      color: #343434;
      font-size: 36rpx;
      margin-left: 10rpx;
    }
  }
  .tip-info {
    font-weight: 400;
    color: #c70026;
    font-size: 28rpx;
    margin-top: 18rpx;
  }
}
.detail-box {
  width: 714rpx;
  height: auto;
  background: #ffffff;
  box-shadow: 0rpx 0rpx 14rpx 0rpx rgba(0, 0, 0, 0.14);
  border-radius: 10rpx;
  text-align: center;
  margin: 0 auto;
  margin-top: 20rpx;
  .title {
    font-weight: normal;
    color: #000000;
    font-size: 34rpx;
    height: 84rpx;
    line-height: 84rpx;
    text {
      color: #c70026;
    }
  }
  .join-box {
    width: calc(100% - 44rpx);
    height: auto;
    background: #ffdbdc;
    border-radius: 16rpx;
    padding: 20rpx 22rpx;
    .tab-box,
    .tab-box1,
    .tab-box2 {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .img-box {
        width: 450rpx;
        height: 106rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
      .join-btn {
        width: 144rpx;
        height: 52rpx;
        background: #000000;
        border-radius: 6rpx;
        text-align: center;
        line-height: 52rpx;
        font-size: 28rpx;
        font-weight: 400;
        color: #ffffff;
      }
    }
    .tab-box1,
    .tab-box2 {
      margin-top: 30rpx;
      .img-box {
        width: 362rpx;
        height: 106rpx;
        image {
          width: 100%;
          height: 100%;
        }
      }
    }
  }
  .more-box {
    width: 100%;
    height: 92rpx;
    display: flex;
    align-items: center;
    .more {
      width: 172rpx;
      height: 46rpx;
      background: #000000;
      border-radius: 6rpx;
      text-align: center;
      line-height: 46rpx;
      font-size: 24rpx;
      font-weight: normal;
      color: #ffffff;
      margin: 0 auto;
    }
  }
}
.detail-img {
  width: 740rpx;
  height: 945rpx;
  margin: 0 auto;
  margin-top: 20rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.shop-footer {
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
