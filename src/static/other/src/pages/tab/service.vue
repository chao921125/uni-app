<template>
  <view class="service-body">
    <!-- <view class="service-img">
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/other-service.png"
        mode="aspectFit"
      />
    </view>
    <view class="footer service-footer">
      <view class="inp"></view>
      <view class="send-btn">发送</view>
    </view>-->
    <view class="title">
      请关注
      <text>诗乐氏官方公众号</text>
    </view>
    <view class="tip">联系在线客服</view>
    <view class="code-box">
      <image
        src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/image/mini-service-qrcode.png"
        mode="aspectFit"
        @tap="getPreviewImage('https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/image/mini-service-qrcode.png')"
      />
    </view>
  </view>
</template>
<script>
export default {
  data() {
    return {
      srcUrl: ''
    };
  },
  methods: {
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
.service-body {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #ffffff;
}
.title,
.tip {
  text-align: center;
  font-size: 30rpx;
  font-family: SourceHanSansCN-Medium, SourceHanSansCN;
  font-weight: 500;
  color: #000000;
  margin-top: 208rpx;
  text {
    color: #b11926;
  }
}
.tip {
  margin-top: 6rpx;
}
.code-box {
  width: 256rpx;
  height: 256rpx;
  margin: 0 auto;
  margin-top: 60rpx;
  image {
    width: 100%;
    height: 100%;
  }
}
// .service-img {
//   width: 694rpx;
//   height: 80rpx;
//   margin: 0 auto;
//   margin-top: 32rpx;
//   image {
//     width: 100%;
//     height: 100%;
//   }
// }
// .service-footer {
//   position: absolute;
//   background: #c70026;
//   box-shadow: 0rpx 0rpx 10rpx 0rpx rgba(0, 0, 0, 0.16);
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   .inp {
//     width: 540rpx;
//     height: 60rpx;
//     background: #ffffff;
//     border-radius: 10rpx;
//   }
//   .send-btn {
//     width: 150rpx;
//     height: 60rpx;
//     background: #000000;
//     border-radius: 10rpx;
//     line-height: 60rpx;
//     text-align: center;
//     font-size: 28rpx;
//     font-weight: 500;
//     color: #ffffff;
//     margin-left: 28rpx;
//   }
// }
</style>
