<template>
  <view>
    <!-- 视频播放模块 -->
    <view class="video-box">
      <video
        id="myVideo"
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-video.mp4"
        poster="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-videoimg.png"
        controls
        object-fit="fill"
        auto-pause-if-open-native
      ></video>
    </view>
    <!-- banner轮播模块(type为4的文章列表) -->
    <swiper class="swiper" circular :autoplay="true" :interval="4200" :duration="500">
      <swiper-item
        v-for="(item, index) in articleListBanner"
        :key="index"
        @tap="goArticleDetail(item.id)"
      >
        <view class="swiper-item">
          <image style="height: 250rpx;width: 700rpx;" :src="item.img" />
        </view>
      </swiper-item>
    </swiper>
    <!-- type为 1 && 2 的文章列表 -->
    <view class="article-box">
      <view
        class="text-box"
        v-for="(item, index) in articleList"
        :key="index"
        @tap="goArticleDetail(item.id)"
      >
        <view class="head-picture">
          <image :src="item.img" mode="aspectFit" />
        </view>
        <view class="article-info">
          <view class="content">{{item.title}}</view>
          <view class="thumbs-box">
            <view>
              阅读
              <text>{{item.readCount}}</text>
            </view>
            <view>
              点赞
              <text>{{item.thumbCount}}</text>
            </view>
          </view>
        </view>
      </view>
      <view
        class="text-box"
        v-for="(item, index) in articleListTwo"
        :key="index"
        @tap="goArticleDetail(item.id)"
      >
        <view class="head-picture">
          <image :src="item.img" mode="aspectFit" />
        </view>
        <view class="article-info">
          <view class="content">{{item.title}}</view>
          <view class="thumbs-box">
            <view>
              阅读
              <text>{{item.readCount}}</text>
            </view>
            <view>
              点赞
              <text>{{item.thumbCount}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- type为3的文章列表 -->
    <view
      class="healthy-bottom"
      v-for="(item, index) in articleListThree"
      :key="index"
      @tap="goArticleDetail(item.id)"
    >
      <view class="head-picture">
        <image :src="item.img" mode="aspectFit" />
      </view>
      <view class="article-info">
        <view class="content">{{item.title}}</view>
        <view class="data-box">
          <view class="thumbs-box">
            <view>
              阅读
              <text>{{item.readCount}}</text>
            </view>
            <view style="margin-left:20rpx;">
              点赞
              <text>{{item.thumbCount}}</text>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!-- 占位模块 -->
    <view class="home-bottom"></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      articleList: [],
      articleListTwo: [],
      articleListThree: [],
      articleListBanner: [],
      articleOne: {},
      articleTwo: {}
    };
  },
  onLoad() {

  },
  onShow() {
    this.getArticleList();
  },
  methods: {
    // 获取文章列表
    getArticleList() {
      this.$axios
        .get({
          url: `/wx/article/list`,
          data: {
            pageType: '2'
          }
        })
        .then((res) => {
          if (res && (res.code === '0' || res.code === 0)) {
            this.articleList = res.data[1];
            this.articleListTwo = res.data[2];
            this.articleListThree = res.data[3];
            this.articleListBanner = res.data[4];
            return;
          }
          this.$uni.showToast(res.message);
        });
    },
    // 跳转到健康问答页面
    goQuestion() {
      this.$uni.navigateTo({
        url: `/pages/question/healthy-question`
      });
    },
    // 跳转到文章详情页面
    goArticleDetail(id) {
      this.$uni.navigateTo({
        url: `/pages2/article/article-detail?id=${id}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.video-box {
  width: 700rpx;
  height: 354rpx;
  margin: 0 auto;
  margin-top: 20rpx;
  video {
    width: 100%;
    height: 100%;
    border-radius: 20rpx;
  }
}
.article-box {
  width: 700rpx;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  .text-box {
    width: 342rpx;
    height: 520rpx;
    border-radius: 10rpx;
    background: #ffdbdc;
    box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(0, 0, 0, 0.15);
    border-radius: 10rpx 10rpx 0rpx 0rpx;
    overflow: hidden;
    margin-right: 16rpx;
    margin-top: 20rpx;
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
      height: 114rpx;
      padding: 30rpx 20rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      line-height: 1;
      .content,
      .time {
        width: 100%;
        font-size: 24rpx;
        font-weight: 400;
        line-height: 1.2;
        color: #999999;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
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
        view {
          font-weight: 500;
          color: #000000;
          font-size: 28rpx;
          text {
            color: #c70026;
            margin-left: 4rpx;
          }
        }
      }
    }
  }
  .text-box:nth-of-type(2n) {
    margin-right: 0;
  }
}
// 轮播图
.swiper {
  height: 250rpx;
  margin-top: 20rpx;
  .swiper-item {
    display: block;
    text-align: center;
  }
}
.healthy-bottom {
  // width: 710rpx;
  // height: 517rpx;
  // margin: 0 auto;
  // padding-bottom: 20rpx;
  width: 710rpx;
  height: 518rpx;
  background: #ffffff;
  border-radius: 10rpx;
  margin: 0 auto;
  margin-top: 20rpx;
  box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(0, 0, 0, 0.15);
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
    height: 114rpx;
    padding: 30rpx 20rpx;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    line-height: 1;
    .content {
      width: 100%;
      font-size: 24rpx;
      font-weight: 400;
      color: #999999;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      line-height: 1.2;
    }
    .data-box {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      // margin-top: 40rpx;
      .thumbs-box {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        view {
          font-weight: 500;
          color: #000000;
          font-size: 28rpx;
          text {
            color: #c70026;
            margin-left: 4rpx;
          }
        }
      }
      .time {
        font-size: 24rpx;
        font-weight: 400;
        color: #999999;
      }
    }
  }
  // image {
  //   width: 100%;
  //   height: 100%;
  // }
}
.home-bottom {
  padding-bottom: 20rpx;
}
</style>
