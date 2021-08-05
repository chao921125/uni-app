<template>
  <view class="me-body">
    <image
      src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/login-bg1.png"
      mode="aspectFit"
      class="login-bg1"
    />
    <image
      src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/login-bg2.png"
      mode="aspectFit"
      class="login-bg2"
    />
    <view class="tip">该平台目前仅为内部使用，请输入访问口令</view>
    <input type="text" class="check-input" v-model="code" />
    <view class="check-btn" @tap="goCheck">确定</view>
  </view>
</template>
<script>
import Stro from '../../utils/set-storage';
import store from '../../store';
export default {
  data() {
    return {
      code: ''
    };
  },
  methods: {
    goCheck() {
      if (this.code.includes(' ') || !this.code) {
        this.$uni.showToast('口令错误');
        return false;
      }
      this.$axios.get({
        url: `/wx/appReleaseCode/checkCode`,
        data: {
          code: this.code
        }
      }).then(res => {
        if (res && (res.code === 0 || res.code === '0')) {
          Stro.setItem({
            name: 'codeMall',
            value: 'true',
            expires: '86400000'
          });
          if (store.getters.authorization) {
            this.$uni.switchTab({ url: '/pages/tabbar/tabbar-home' });
          } else {
            this.$uni.redirectTo({ url: '/pages/login/login' });
          }
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
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #80d3cb linear-gradient(316deg, #b11a26 0%, #c70026 100%);
  overflow: hidden;
  text-align: center;
}
.login-bg1 {
  width: 325rpx;
  height: 256rpx;
  position: absolute;
  left: 0;
  top: 0;
}
.login-bg2 {
  width: 363rpx;
  height: 257rpx;
  position: absolute;
  right: 0;
  bottom: 0;
}
.tip {
  font-weight: 400;
  color: #ffffff;
  font-size: 30rpx;
  margin-top: 432rpx;
}
.check-input {
  width: 520rpx;
  height: 70rpx;
  background: #ffffff;
  border-radius: 10rpx;
  padding: 0 20rpx;
  line-height: 70rpx;
  font-weight: 400;
  color: #000000;
  font-size: 30rpx;
  margin: 0 auto;
  margin-top: 30rpx;
}
.check-btn {
  width: 266rpx;
  height: 80rpx;
  line-height: 80rpx;
  background: #000000;
  border-radius: 10rpx;
  font-size: 34rpx;
  font-weight: normal;
  color: #ffffff;
  text-align: center;
  margin: 0 auto;
  margin-top: 300rpx;
}
</style>
