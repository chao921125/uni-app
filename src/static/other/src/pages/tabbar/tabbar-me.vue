<template>
  <view style="margin-bottom:20rpx;">
    <view class="header">
      <view class="user-box">
        <open-data class="avatar image-round" type="userAvatarUrl"></open-data>
        <open-data class="nickname-text" type="userNickName" />
      </view>
      <view class="points-box">
        <view class="points-info">2699</view>
        <view class="points-name">积分</view>
      </view>
    </view>
    <view class="tab-box">
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-metab.png"
        mode="aspectFit"
      />
    </view>
    <!-- banner轮播模块 -->
    <swiper class="swiper" circular :autoplay="true" :interval="4200" :duration="500">
      <swiper-item v-for="(item, index) in swiperArr" :key="index">
        <view class="swiper-item">
          <image style="height: 220rpx; width: 730rpx;" :src="item.img" />
        </view>
      </swiper-item>
    </swiper>
    <view class="me-group">
      <view class="group-title">
        <image
          src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/group-title.png"
          mode="aspectFit"
        />
      </view>
      <view class="group-tab">
        <image
          src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-grouptab2.png"
          mode="aspectFit"
          @tap="goGroupDetail"
        />
        <image
          src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-grouptab1.png"
          mode="aspectFit"
        />
        <image
          class="group-tab3"
          src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-grouptab3.png"
          mode="aspectFit"
        />
      </view>
    </view>
    <view class="article-box">
      <view
        class="text-box"
        v-for="(item,index) in productList"
        :key="index"
        @tap="goDetail(item.id)"
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
      <!-- <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/me-article1.png"
        mode="aspectFit"
        @tap="goDetail"
      />
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/me-article2.png"
        mode="aspectFit"
      />-->
    </view>
    <view class="me-bottom" @tap="goDetail(productObj.id)">
      <view class="head-picture">
        <image :src="productObj.img" mode="aspectFit" />
      </view>
      <view class="info-box">
        <view class="name">{{productObj.name}}</view>
        <view class="specifications-box">
          <view class="num">{{productObj.spec}}</view>
          <view class="shop-info">
            {{productObj.points}}
            <text class="points">积分 +</text>
            <text class="money">
              ￥
              <text>{{productObj.sellingPrice}}</text>
            </text>
          </view>
        </view>
      </view>
      <!-- <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/me-bottom.png"
        mode="aspectFit"
      />-->
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      swiperArr: [
        { img: 'https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-banner1.png' },
        { img: 'https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-banner2.png' }
      ],
      productList: [],
      productObj: {}
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
        this.productObj = res.filter(obj => {
          return obj.type === 20;
        })[0];
      });
    },
    // 跳转到详情页面
    goDetail(id) {
      this.$uni.navigateTo({
        url: `/pages2/shop/detail?id=${id}`
      });
    },
    // 跳转到团购详情页面
    goGroupDetail() {
      this.$uni.navigateTo({
        url: `/pages2/group/group-detail`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  width: calc(100% - 52rpx);
  height: 215rpx;
  background-image: url("https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-mehead.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 32rpx 26rpx 0 26rpx;
  display: flex;
  justify-content: space-between;
  .user-box {
    width: 50%;
    height: 150rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .image-round {
      width: 150rpx;
      height: 150rpx;
    }
    .nickname-text {
      width: calc(100% - 160rpx);
      margin-left: 10rpx;
      font-weight: 500;
      color: #ffffff;
      font-size: 44rpx;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .points-box {
    width: 50%;
    height: 150rpx;
    display: flex;
    flex-direction: column;
    text-align: right;
    line-height: 1;
    margin-top: 24rpx;
    .points-info {
      font-weight: normal;
      color: #ffffff;
      font-size: 70rpx;
    }
    .points-name {
      font-weight: 400;
      color: #ffffff;
      font-size: 28rpx;
      margin-top: 4rpx;
    }
  }
}
.tab-box {
  width: 100%;
  height: 183rpx;
  margin-top: 10rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
// 轮播图
.swiper {
  height: 228rpx;
  margin-top: 16rpx;
  .swiper-item {
    display: block;
    text-align: center;
  }
}
.me-group {
  width: 710rpx;
  height: 458rpx;
  background: #ffdbdc;
  box-shadow: 0px 0px 14rpx 0rpx rgba(0, 0, 0, 0.15);
  border-radius: 10rpx;
  margin: 0 auto;
  padding-top: 32rpx;
  margin-top: 10rpx;
  .group-title {
    width: 672rpx;
    height: 29rpx;
    margin: 0 auto;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .group-tab {
    width: 690rpx;
    margin-left: 20rpx;
    height: 358rpx;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30rpx;
    image {
      width: 252rpx;
      height: 358rpx;
    }
    .group-tab3 {
      width: 146rpx;
    }
  }
}
.article-box {
  width: 700rpx;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  margin-top: 20rpx;
  .text-box {
    width: 342rpx;
    height: 544rpx;
    box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(0, 0, 0, 0.15);
    border-radius: 10rpx;
    background: #fefefe;
    margin-right: 18rpx;
    margin-top: 24rpx;
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
  .text-box:first-child,
  .text-box:nth-child(2) {
    margin-top: 8rpx;
  }
  .text-box:nth-of-type(2n) {
    margin-right: 0;
  }
}
.me-bottom {
  width: 710rpx;
  height: 454rpx;
  margin: 0 auto;
  margin-top: 24rpx;
  border-radius: 10rpx;
  .head-picture {
    width: 100%;
    height: 342rpx;
    border-radius: 10rpx 10rpx 0 0;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .info-box {
    width: calc(100% - 40rpx);
    height: 112rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0 20rpx;
    background: #f47d8a;
    .name {
      font-weight: 500;
      color: #000000;
      font-size: 28rpx;
      display: block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    .specifications-box {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 14rpx;
      .num {
        font-weight: 400;
        color: #000000;
        font-size: 24rpx;
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
}
</style>
