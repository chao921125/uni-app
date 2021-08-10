<template>
  <view>
    <view class="detail-head">
      <video
        id="myVideo"
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-video.mp4"
        controls
        auto-pause-if-open-native
      ></video>
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/fabulous.png"
        mode="aspectFit"
        class="fabulous"
      />
    </view>
    <view class="tip-box">
      <view class="tip-title">每日健康小帖士</view>
      <view class="tip-info">#视频；健康；医疗</view>
      <view class="tip-enable">
        阅读
        <text class="tip-text">45</text>点赞
        <text class="tip-text2">4</text>
      </view>
    </view>
    <view class="question-title">
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-questiontitle.png"
        mode="aspectFit"
      />
    </view>
    <view class="question-bottom">
      <view
        class="text-box"
        v-for="(item,index) in productList"
        :key="index"
        @tap="goProductDetail(item.id)"
      >
        <view class="head-picture">
          <image :src="item.img" mode="aspectFit" />
        </view>
        <view class="article-info">
          <view class="info-in">
            <view class="name">{{item.name}}</view>
            <view class="num">{{item.spec}}</view>
          </view>
          <view class="shop-info">
            {{item.points}}
            <text class="points">积分 +</text>
            <text class="money">
              ￥
              <text>{{item.sellingPrice}}</text>
            </text>
          </view>
        </view>
      </view>
    </view>
    <!-- <view class="article-box">
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/me-article1.png"
        mode="aspectFit"
      />
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/me-article2.png"
        mode="aspectFit"
      />
    </view>-->
  </view>
</template>
<script>
export default {
  data() {
    return {
      productList: []
    };
  },
  onLoad() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      this.$axios.get({
        url: `/app-product/`,
        data: {
          pageNum: '1',
          pageSize: '3'
        }
      }).then(res => {
        this.productList = res.filter(obj => {
          return obj.type === 10;
        });
      });
    },
    // 跳转到商品详情页面
    goProductDetail(id) {
      this.$uni.navigateTo({
        url: `/pages2/shop/detail?id=${id}`
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.detail-head {
  width: 100%;
  height: 750rpx;
  position: relative;
  video {
    width: 100%;
    height: 100%;
  }
  .fabulous {
    position: absolute;
    width: 50rpx;
    height: 50rpx;
    right: 18rpx;
    bottom: 26rpx;
  }
}
.tip-box {
  width: calc(100% - 40rpx);
  height: 164rpx;
  background: #c70026;
  box-shadow: 0rpx 0rpx 14rpx 0rpx rgba(0, 0, 0, 0.15);
  border-radius: 0rpx 0rpx 20rpx 20rpx;
  padding: 16rpx 20rpx 0 20rpx;
  .tip-title {
    font-weight: 500;
    color: #ffffff;
    font-size: 36rpx;
  }
  .tip-info {
    font-weight: 400;
    color: #ffffff;
    font-size: 26rpx;
    margin-top: 18rpx;
  }
  .tip-enable {
    text-align: right;
    font-size: 28rpx;
    font-weight: 500;
    color: #ffffff;
    text {
      color: #ffffff;
    }
    .tip-text,
    .tip-text2 {
      margin-left: 10rpx;
      margin-right: 20rpx;
    }
    .tip-text2 {
      margin-right: 5rpx;
    }
  }
}
.question-title {
  width: 342rpx;
  height: 46rpx;
  margin: 0 auto;
  margin-top: 40rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
.question-bottom {
  width: 700rpx;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  // justify-content: space-between;
  margin: 0 auto;
  padding-bottom: 20rpx;
  .text-box {
    width: 342rpx;
    height: 544rpx;
    box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(0, 0, 0, 0.15);
    border-radius: 10rpx;
    background: #fefefe;
    margin-right: 18rpx;
    margin-top: 30rpx;
    .head-picture {
      width: 100%;
      height: 342rpx;
      border-radius: 10rpx 10rpx 0 0;
      image {
        width: 100%;
        height: 100%;
      }
    }
    .article-info {
      width: calc(100% - 40rpx);
      height: 174rpx;
      padding: 14rpx 20rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .info-in {
        line-height: 1;
        .name,
        .num {
          font-weight: 500;
          color: #000000;
          font-size: 28rpx;
        }
        .num {
          font-weight: 400;
          font-size: 24rpx;
          margin-top: 20rpx;
        }
      }
      .shop-info {
        font-weight: bold;
        color: #000000;
        font-size: 30rpx;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .points {
          font-weight: 400;
          color: #000000;
          font-size: 22rpx;
          margin-left: 10rpx;
        }
        .money {
          font-weight: 400;
          color: #000000;
          font-size: 24rpx;
          text {
            font-size: 30rpx;
            font-weight: 500;
          }
        }
      }
    }
  }
  .text-box:nth-of-type(2n) {
    margin-right: 0;
  }
}
// .article-box {
//   width: 700rpx;
//   height: auto;
//   display: flex;
//   justify-content: space-between;
//   margin: 0 auto;
//   margin-top: 40rpx;
//   padding-bottom: 20rpx;
//   image {
//     width: 342rpx;
//     height: 545rpx;
//     box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(0, 0, 0, 0.15);
//     border-radius: 10rpx 10rpx 0rpx 0rpx;
//   }
// }
</style>
