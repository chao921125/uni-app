<template>
  <view class="me-body">
    <view class="code">
      <text class="code-title">区块链编码</text>
      <text class="code-info">{{traceObj.txId}}</text>
    </view>
    <view class="count" v-if="showWicth">
      <view class="head">产品认证信息</view>
      <view class="info-box">
        <view class="enterprise-box" style="margin-top: 20rpx">
          <view class="name">品名</view>
          <view class="info">{{traceObj.productName}}</view>
        </view>
        <view class="enterprise-box">
          <view class="name">规格</view>
          <view class="info">{{traceObj.specifications}}</view>
        </view>
        <view class="enterprise-box">
          <view class="name">原产地</view>
          <view class="info">中国深圳</view>
          <!-- <view class="info">{{traceObj.originPlace}}</view> -->
        </view>
        <!-- <view class="enterprise-box">
          <view class="name">贸易商</view>
          <view class="info">{{traceObj.marketerName}}</view>
        </view>-->
        <view class="enterprise-box2">
          <view class="name">图片</view>
          <image :src="traceObj.productUrl" mode="aspectFit" class="traceability-pro1" />
        </view>
      </view>
    </view>
    <view class="count" v-else>
      <view class="head">厂家认证信息</view>
      <view class="info-box">
        <view class="enterprise-box" style="margin-top: 20rpx">
          <view class="name">企业名</view>
          <view class="info">{{traceObj.companyName}}</view>
        </view>
        <view class="enterprise-box3">
          <view class="name">厂家地址</view>
          <view class="info">{{traceObj.officeAddress}}</view>
        </view>
        <view class="enterprise-box2" style="height: 243rpx;">
          <view class="name">资格证书</view>
          <image
            :src="traceObj.qualificationsUrl"
            mode="aspectFit"
            class="traceability-pro2"
            @tap="getPreviewImage(traceObj.qualificationsUrl)"
          />
        </view>
        <!-- <view class="enterprise-box2" style="height: 243rpx;margin-top: 40rpx;">
          <view class="name">实地认证</view>
          <image
            :src="traceObj.authUrl"
            mode="aspectFit"
            class="traceability-pro3"
            @tap="getPreviewImage(traceObj.authUrl)"
          />
        </view>-->
      </view>
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      drugsObj: {},
      showWicth: undefined,
      traceObj: {}
    };
  },
  onLoad(option) {
    this.drugsObj = JSON.parse(option.drugsObj);
    if (this.drugsObj.num === '2') {
      this.showWicth = false;
      return;
    }
    this.showWicth = true;
  },
  mounted() {
    this.pageInit();
  },
  methods: {
    pageInit() {
      this.$axios.get({
        url: `/wx/scan`,
        data: {
          code: this.drugsObj.id
        }
      }).then(res => {
        // this.traceObj = res;
        if (res && (res.code === '0' || res.code === 0)) {
          this.traceObj = res.data;
          return;
        }
        this.$uni.showToast(res.message);
      });
    },
    // 预览大图
    getPreviewImage(image) {
      let imgArr = [];
      imgArr.push(image);
      // 预览图片
      uni.previewImage({
        urls: imgArr,
        current: imgArr[0]
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.me-body {
  width: calc(100% - 48rpx);
  height: calc(100% - 146rpx);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    360deg,
    #f8f8f8 0%,
    #f9f9f9 77%,
    #d5445f 88%,
    #c70026 100%
  );
  overflow: hidden;
  padding: 54rpx 24rpx 92rpx 24rpx;
}
.code {
  width: calc(100% - 40rpx);
  height: 66rpx;
  padding: 0 20rpx;
  border-radius: 33rpx;
  border: 2rpx solid #ffffff;
  text-align: center;
  line-height: 66rpx;
  font-size: 30rpx;
  font-weight: 500;
  color: #ffffff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text {
    display: block;
  }
  .code-title {
    width: 160rpx;
  }
  .code-info {
    max-width: calc(100% - 178rpx);
    font-weight: bold;
    font-size: 36rpx;
    margin-left: 18rpx;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
.count {
  width: 100%;
  height: auto;
  background: #ffffff;
  box-shadow: 0rpx 0rpx 13rpx 0rpx rgba(23, 157, 145, 0.2);
  border-radius: 10rpx;
  margin-top: 20rpx;
  padding-bottom: 50rpx;
  .head {
    width: 100%;
    height: 82rpx;
    background: #ebf8f7;
    border-radius: 10rpx 10rpx 0rpx 0rpx;
    text-align: center;
    line-height: 82rpx;
    font-size: 30rpx;
    font-weight: 400;
    color: #000000;
  }
  .info-box {
    width: calc(100% - 72rpx);
    height: auto;
    padding: 0 36rpx;
    .enterprise-box,
    .enterprise-box2 {
      width: 100%;
      height: 70rpx;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .name {
        width: 200rpx;
        font-weight: 400;
        color: #000000;
        font-size: 30rpx;
      }
      .info {
        width: calc(100% - 200rpx);
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-weight: 400;
        color: #000000;
        font-size: 30rpx;
      }
      .traceability-pro1 {
        width: 324rpx;
        height: 324rpx;
      }
    }
    .enterprise-box2 {
      height: 324rpx;
      align-items: flex-start;
      margin-top: 20rpx;
      .traceability-pro2,
      .traceability-pro3 {
        width: 389rpx;
        height: 243rpx;
      }
    }
    .enterprise-box3 {
      width: 100%;
      min-height: 70rpx;
      display: flex;
      justify-content: flex-start;
      margin-top: 20rpx;
      .name {
        width: 200rpx;
        font-weight: 400;
        color: #000000;
        font-size: 30rpx;
      }
      .info {
        width: calc(100% - 200rpx);
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        font-weight: 400;
        color: #000000;
        font-size: 30rpx;
      }
    }
  }
}
</style>
