<template>
  <view class="me-body">
    <view class="head-box">
      <view class="tip" v-if="articleObj.tag">{{articleObj.tag}}</view>
      <view class="title">{{articleObj.title}}</view>
    </view>
    <view class="para-one" v-html="articleObj.content">{{articleObj.content}}</view>
    <view class="footer article-footer">
      <view class="data-box">
        <view class="read-box">阅读: {{articleObj.readCount}}</view>
        <view class="data-tip"></view>
        <view class="fabulous-box">点赞: {{articleObj.thumbCount}}</view>
      </view>
      <view class="btn-box-other" @tap="goCollect(2)" v-if="hasCollect">
        <image
          src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/collectioned.png"
          mode="aspectFit"
        />
        <view>已点</view>
      </view>
      <view class="btn-box" @tap="goCollect(1)" v-else>
        <image
          src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/collection.png"
          mode="aspectFit"
        />
        <view>点赞</view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      id: '',
      articleObj: {
        readCount: '',
        thumbCount: ''
      },
      hasCollect: undefined
    };
  },
  onLoad(option) {
    if (option.id) {
      this.id = option.id;
    }
    this.pageInit();
  },
  methods: {
    pageInit() {
      this.$axios.get({
        url: `/wx/article/detail`,
        data: {
          id: this.id
        }
      }).then(res => {
        if (res && (res.code === '0' || res.code === 0)) {
          this.articleObj = res.data;
          if (this.articleObj.like === 1 || this.articleObj.like === '1') {
            this.hasCollect = true;
          } else {
            this.hasCollect = false;
          }
          return;
        }
        this.$uni.showToast(res.message);
      });
    },
    // 点赞
    goCollect(flag) {
      this.$axios.post({
        url: `/wx/article/articleThumb`,
        data: {
          id: this.id,
          thumbFlag: flag === 1 ? '1' : '-1'
        }
      }).then(res => {
        if (res && (res.code === '0' || res.code === 0)) {
          if (res.data.likeStatus === 1 || res.data.likeStatus === '1') {
            this.hasCollect = true;
          } else {
            this.hasCollect = false;
          }
          this.articleObj.thumbCount = res.data.thumbCount;
          return;
        }
        this.$uni.showToast(res.message);
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.me-body {
  width: 100%;
  height: calc(100% - 120rpx);
  padding: 30rpx 0 120rpx 0;
}
.head-box {
  width: 700rpx;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
  .tip {
    width: 68rpx;
    height: 36rpx;
    background: #c70026;
    border-radius: 4rpx;
    text-align: center;
    line-height: 36rpx;
    font-size: 24rpx;
    font-weight: 400;
    color: #ffffff;
  }
  .title {
    font-weight: 500;
    color: #000000;
    font-size: 40rpx;
    margin-left: 10rpx;
  }
}
.para-one {
  width: 700rpx;
  height: auto;
  font-size: 26rpx;
  font-weight: 400;
  color: #000000;
  margin: 0 auto;
}
.article-footer {
  position: fixed;
  bottom: 0;
  background: #c70026;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .data-box {
    width: calc(100% - 210rpx);
    height: auto;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .read-box,
    .fabulous-box {
      font-weight: 400;
      color: #ffffff;
      font-size: 26rpx;
    }
    .data-tip {
      width: 2rpx;
      height: 30rpx;
      background: #ffffff;
      margin-left: 20rpx;
    }
    .fabulous-box {
      margin-left: 20rpx;
    }
  }
  .btn-box-other,
  .btn-box {
    width: 110rpx;
    height: 50rpx;
    margin-left: 20rpx;
    background: #000000;
    border-radius: 10rpx;
    font-size: 28rpx;
    font-weight: 500;
    color: #ffffff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40rpx;
    image {
      width: 35rpx;
      height: 30rpx;
    }
  }
  .btn-box-other {
    background: none;
    color: #ffffff;
  }
}
</style>
