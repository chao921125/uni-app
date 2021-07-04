<template>
  <view class="code-body">
    <!-- <view class="header">
      <view class="tab-box">
        <view
          v-for="(item, index) in rangeArr"
          :key="index"
          class="order-tab"
          :class="item.chooseClass"
        >
          {{item.name}}
          <view :class="item.chooseClass ? 'header-bg' : 'header-bg-none'"></view>
        </view>
      </view>
    </view>-->
    <!-- <view class="code-tab1">
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-codetab1.png"
        mode="aspectFit"
        @tap="goTraceability()"
      />
    </view>
    <view class="code-tab2">
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-codetab2.png"
        mode="aspectFit"
      />
    </view>-->
    <view v-if="hasCodeList">
      <view
        class="every-list"
        v-for="(item, index) in codeList"
        :key="index"
        @tap="goTraceability(item.code)"
      >
        <view class="pro-img">
          <image :src="item.productUrl" mode="aspectFit" />
        </view>
        <div class="info-box">
          <view class="top">
            <view class="name">{{item.name}}</view>
            <view class="code">区块链编码:{{item.txId}}</view>
          </view>
          <view class="time">{{item.modifiedDate}}</view>
        </div>
        <view class="pro-go">
          <image
            src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/image/mini-code-go.png"
            mode="aspectFit"
          />
        </view>
      </view>
    </view>
    <view class="no-list" v-else>暂时没有扫码记录</view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      // rangeArr: [
      //   { name: '药品', chooseClass: 'tab-item-text', value: undefined, text: 'video' },
      //   { name: '商品', chooseClass: '', value: 20, text: 'music' },
      //   { name: '异常', chooseClass: '', value: 10, text: 'book' }
      // ]
      pageIndex: 1,
      pageSize: 10,
      totalRows: 0,
      codeList: [],
      // 是否有扫码记录
      hasCodeList: false
    };
  },
  onLoad() { },
  onShow() {
    this.codeList = [];
    this.totalRows = 0;
    this.pageIndex = 1;
    this.getCodeList();
  },
  // 上拉加載
  onReachBottom() {
    this.totalRows > this.codeList.length && this.nextPage();
  },
  methods: {
    // 获取扫码列表
    getCodeList() {
      this.$axios.get({
        url: `/wx/scanList`,
        data: {
          current: this.pageIndex,
          size: this.pageSize
        }
      }).then(res => {
        if (res && (res.code === 0 || res.code === '0')) {
          this.codeList = res.data.data;
          if (this.codeList && this.codeList.length > 0) {
            this.hasCodeList = true;
          } else {
            this.hasCodeList = false;
          }
          this.totalRows = res.data.dataCount;
          return;
        }
        this.$uni.showToast(res.message);
      });
    },
    // 翻页
    nextPage() {
      this.pageIndex++;
      this.$axios.get({
        url: `/wx/scanList`,
        data: {
          current: this.pageIndex,
          size: this.pageSize
        }
      }).then(res => {
        if (res && (res.code === 0 || res.code === '0')) {
          this.codeList = this.codeList.concat(res.data.data);
          this.totalRows = res.data.dataCount;
          return;
        }
        this.$uni.showToast(res.message);
      });
    },
    // 跳转到区块链溯源页面
    goTraceability(code) {
      this.$uni.navigateTo({
        url: `/pages2/traceability/traceability?code=${code}`
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.code-body {
  width: calc(100% - 40rpx);
  padding: 0 20rpx;
  height: 100%;
}
.every-list {
  width: calc(100% - 40rpx);
  height: auto;
  background: #ffffff;
  box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(0, 0, 0, 0.15);
  border-radius: 10rpx;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx;
  margin-top: 20rpx;
  .pro-img {
    width: 160rpx;
    height: 160rpx;
    border-radius: 10rpx;
    border: 1rpx solid #eeeeee;
    image {
      width: 100%;
      height: 100%;
      border-radius: 10rpx;
    }
  }
  .info-box {
    width: calc(100% - 240rpx);
    height: 160rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .top {
      margin-top: 4rpx;
      .name,
      .code {
        width: 100%;
        font-size: 34rpx;
        font-family: SourceHanSansCN-Medium, SourceHanSansCN;
        font-weight: 500;
        color: #000000;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .code {
        font-size: 24rpx;
        font-weight: 400;
      }
    }
    .time {
      font-size: 24rpx;
      font-family: SourceHanSansCN-Normal, SourceHanSansCN;
      font-weight: 400;
      color: #999999;
    }
  }
  .pro-go {
    width: 20rpx;
    height: 41rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
.every-list:last-child {
  margin-bottom: 20rpx;
}
.no-list {
  width: 100%;
  text-align: center;
  font-size: 30rpx;
  font-family: SourceHanSansCN-Bold, SourceHanSansCN;
  font-weight: bold;
  color: #000000;
  margin: 0 auto;
  margin-top: 100rpx;
}
// .header {
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   height: 88rpx;
//   background: #c70026;
//   overflow: hidden;
// }
// .tab-box {
//   width: 100%;
//   margin: 0 auto;
//   height: auto;
// }
// .order-tab,
// .tab-item-text {
//   display: block;
//   width: 33%;
//   text-align: center;
//   font-size: 30rpx;
//   font-weight: 400;
//   color: #ffffff;
//   line-height: 50rpx;
//   font-size: 30rpx;
//   float: left;
//   position: relative;
// }
// .tab-item-text {
//   font-weight: 500;
// }
// .header-bg {
//   width: 120rpx;
//   height: 5rpx;
//   position: absolute;
//   top: 62rpx;
//   left: 26%;
//   bottom: 0;
//   background: #000000;
// }
// .header-bg-none {
//   display: none;
//   width: 120rpx;
//   height: 8rpx;
//   position: absolute;
//   top: 60rpx;
//   left: 3%;
// }
// .code-tab1,
// .code-tab2 {
//   width: 100%;
//   height: 228rpx;
//   margin: 0 auto;
//   margin-top: 10rpx;
//   image {
//     width: 100%;
//     height: 100%;
//   }
// }
// .code-tab2 {
//   margin-top: 0;
// }
</style>
