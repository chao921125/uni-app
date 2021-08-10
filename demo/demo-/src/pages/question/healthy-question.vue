<template>
  <view>
    <view class="qa-box">
      <view class="title">75%的酒精能用来消毒吗？</view>
      <view class="btn-box">
        <image
          class="question-yes"
          src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-questionyes.png"
          mode="aspectFit"
          @tap="goAnswer('yes')"
        />
        <view class="or">OR</view>
        <image
          class="question-no"
          src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/question-no.png"
          mode="aspectFit"
          @tap="goAnswer('no')"
        />
      </view>
    </view>
    <view class="question-title">
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-questiontitle.png"
        mode="aspectFit"
      />
    </view>
    <view class="article-box">
      <!-- <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/question-article1.png"
        mode="aspectFit"
      />-->
      <view class="text-box" @tap="goArticleDetail(articleOne)">
        <view class="head-picture">
          <image :src="articleOne.img" mode="aspectFit" />
        </view>
        <view class="article-info">
          <view class="content">{{articleOne.title}}</view>
          <view class="time">发布时间: {{articleOne.updatedAt}}</view>
          <view class="thumbs-box">
            <view>
              阅读
              <text>{{articleOne.readCount}}</text>
            </view>
            <view>
              点赞
              <text>{{articleOne.thumbCount}}</text>
            </view>
          </view>
        </view>
      </view>
      <image
        class="question-article2"
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-questionarticle2.png"
        mode="aspectFit"
        @tap="goDetail"
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
      <!-- <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/question-bottom.png"
        mode="aspectFit"
      />-->
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      productList: [],
      articleOne: {}
    };
  },
  onLoad() {
    this.pageInit();
  },
  onShow() {
    this.getArticleList();
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
    // 获取文章列表
    getArticleList() {
      this.$axios.get({
        url: `/app-article/`,
        data: {
          pageNum: '1',
          pageSize: '3'
        }
      }).then(res => {
        this.articleOne = res[0];
      });
    },
    // 跳转到回答页面
    goAnswer(answer) {
      this.$uni.navigateTo({
        url: `/pages/question/healthy-answer?answer=${answer}`
      });
    },
    // 跳转到视频文章详情页面
    goDetail() {
      this.$uni.navigateTo({
        url: `/pages/question/article-detail`
      });
    },
    // 跳转到商品详情页面
    goProductDetail(id) {
      this.$uni.navigateTo({
        url: `/pages2/shop/detail?id=${id}`
      });
    },
    // 跳转到文章详情页面
    goArticleDetail(article) {
      this.$uni.navigateTo({
        url: `/pages2/article/article-detail?article=${JSON.stringify(article)}`
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.qa-box {
  width: 706rpx;
  height: 272rpx;
  background: #fefefe;
  box-shadow: 0rpx 0rpx 14rpx 0rpx rgba(0, 0, 0, 0.15);
  border-radius: 20rpx;
  margin: 0 auto;
  margin-top: 36rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding-top: 10rpx;
  .title {
    font-weight: bold;
    color: #000000;
    font-size: 32rpx;
  }
  .btn-box {
    width: 622rpx;
    height: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 40rpx;
    .question-yes,
    .question-no {
      width: 249rpx;
      height: 99rpx;
    }
    .or {
      font-weight: 400;
      color: #000000;
      font-size: 30rpx;
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
.article-box {
  width: 700rpx;
  height: auto;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  margin-top: 36rpx;
  .question-article2 {
    width: 342rpx;
    height: 520rpx;
    box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(0, 0, 0, 0.15);
    border-radius: 10rpx 10rpx 0rpx 0rpx;
  }
  .text-box {
    width: 342rpx;
    height: 516rpx;
    border-radius: 10rpx;
    background: #ebf8f7;
    margin-top: 4rpx;
    box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(0, 0, 0, 0.15);
    // overflow: hidden;
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
      padding: 0 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      line-height: 1;
      .content,
      .time {
        width: 100%;
        font-size: 24rpx;
        font-weight: 400;
        color: #999999;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .time {
        margin-top: 32rpx;
      }
      .thumbs-box {
        width: 100%;
        height: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30rpx;
        view {
          font-weight: 500;
          color: #000000;
          font-size: 28rpx;
          text {
            color: #80d3cb;
            margin-left: 4rpx;
          }
        }
      }
    }
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
  .text-box:nth-of-type(2n) {
    margin-right: 0;
  }
}
</style>
