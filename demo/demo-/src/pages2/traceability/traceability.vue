<template>
  <view class="me-body">
    <view class="head-box">
      <view class="code-box">
        <view class="qrcode-box">
          <canvas class="canvas-code" canvas-id="myQrcode" />
        </view>
        <view class="info-box">
          <view class="info-title">追溯码验证通过</view>
          <view class="info-num">{{productObj.txId}}</view>
        </view>
      </view>
      <view class="right-box">
        <image
          src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/tracebility-right.png"
          mode="aspectFit"
        />
      </view>
    </view>
    <view class="sale-box">
      <view class="sale-img">
        <image
          src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-address.png"
          mode="aspectFit"
        />
      </view>
      <view class="sale-name">销售渠道：诗乐氏官方旗舰店</view>
    </view>
    <view class="count">
      <view class="head">产品认证信息</view>
      <view class="info-box">
        <view class="enterprise-box" style="margin-top: 20rpx">
          <view class="name">品名</view>
          <view class="info">{{productObj.productName}}</view>
        </view>
        <view class="enterprise-box">
          <view class="name">规格</view>
          <view class="info">{{productObj.specifications}}</view>
        </view>
        <view class="enterprise-box">
          <view class="name">原产地</view>
          <view class="info">中国深圳</view>
        </view>
        <!-- <view class="enterprise-box">
          <view class="name">贸易商</view>
          <view class="info">诗乐氏集团股份有限公司</view>
        </view>-->
        <view class="enterprise-box">
          <view class="name">有效期</view>
          <view class="info">{{productObj.period}}</view>
        </view>
        <view class="enterprise-box2">
          <view class="name">图片</view>
          <image :src="productObj.productUrl" mode="aspectFit" class="traceability-pro1" />
        </view>
      </view>
    </view>
    <view class="count">
      <view class="head">厂家认证信息</view>
      <view class="info-box">
        <view class="enterprise-box" style="margin-top: 20rpx">
          <view class="name">企业名</view>
          <view class="info">{{productObj.companyName}}</view>
        </view>
        <view class="enterprise-box3">
          <view class="name">厂家地址</view>
          <view class="info">{{productObj.officeAddress}}</view>
        </view>
        <view class="enterprise-box2" style="height: 243rpx;">
          <view class="name">资格证书</view>
          <image
            :src="productObj.qualificationsUrl"
            mode="aspectFit"
            class="traceability-pro2"
            @tap="getPreviewImage(productObj.qualificationsUrl)"
          />
        </view>
        <!-- <view class="enterprise-box2" style="height: 243rpx;margin-top: 40rpx;">
          <view class="name">实地认证</view>
          <image
            :src="productObj.authUrl"
            mode="aspectFit"
            class="traceability-pro3"
            @tap="getPreviewImage(productObj.authUrl)"
          />
        </view>-->
      </view>
    </view>
  </view>
</template>
<script>
import _ from 'lodash';
import QRCode from '../../utils/qrcode';
export default {
  data() {
    return {
      code: '',
      productObj: {
        qrcode: '',
        code: '',
        productName: '',
        specifications: '',
        period: '',
        periodUnit: '',
        companyName: '',
        officeAddress: ''
      },
      // 有效期列表
      dateArr: [
        { value: 'YEAR', label: '年' },
        { value: 'MONTH', label: '月' },
        { value: 'DAY', label: '天' },
        { value: 'HOUR', label: '时' },
        { value: 'MINUTE', label: '分' },
        { value: 'SECOND', label: '秒' }
      ],
      // 当前有效期
      curStatus: {}
    };
  },
  onLoad(option) {
    if (option.code) {
      this.code = option.code;
      this.pageInit();
    }
  },
  methods: {
    pageInit() {
      this.$axios.get({
        url: `/wx/productDetail`,
        data: {
          code: this.code
        }
      }).then(res => {
        if (res && (res.code === 0 || res.code === '0')) {
          this.productObj = res.data;
          this.curStatus = _(this.dateArr).find({
            value: this.productObj.periodUnit
          });
          this.productObj.period = res.data.period + this.curStatus.label;
          this.getCodeImg();
          return;
        }
        this.$uni.showToast(res.message);
      });
    },
    // 二维码图片生成
    getCodeImg() {
      new QRCode('myQrcode', {
        text: this.productObj.codeUrl,
        width: 66,
        height: 66,
        padding: 2,
        colorDark: '#000',
        colorLight: '#fff',
        correctLevel: QRCode.CorrectLevel.L // 二维码可辨识度
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
  height: calc(100% - 122rpx);
  background: linear-gradient(
    360deg,
    #f8f8f8 0%,
    #f9f9f9 77%,
    #d5445f 88%,
    #c70026 100%
  );
  overflow: hidden;
  padding: 30rpx 24rpx 92rpx 24rpx;
}
.head-box {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .code-box {
    width: calc(100% - 123rpx);
    height: 118rpx;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .qrcode-box {
      width: 128rpx;
      height: 128rpx;
      .canvas-code {
        width: 100%;
        height: 100%;
      }
    }
    .info-box {
      width: calc(100% - 148rpx);
      height: 96rpx;
      margin-left: 20rpx;
      .info-title {
        font-weight: bold;
        color: #ffffff;
        font-size: 40rpx;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .info-num {
        font-weight: 400;
        color: #ffffff;
        font-size: 28rpx;
        display: block;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }
  .right-box {
    width: 103rpx;
    height: 118rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
}
.sale-box {
  width: 100%;
  height: auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  .sale-img {
    width: 25rpx;
    height: 29rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .sale-name {
    width: calc(100% - 38rpx);
    margin-left: 12rpx;
    font-size: 26rpx;
    font-weight: 400;
    color: #ffffff;
    display: block;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: 8rpx;
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
    background: #ffdbdc;
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
