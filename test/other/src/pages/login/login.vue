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
    <image
      src="https://traceability-1259661131.cos.ap-hongkong.myqcloud.com/page/login-logo.png"
      mode="aspectFit"
      class="login-logo"
    />
    <button class="auth-btn" open-type="getUserProfile" lang="zh_CN" @click="getUserProfile">授权</button>
  </view>
</template>

<script>
export default {

  data: () => ({
    receiveShow: false
  }),
  onLoad() {
  },
  methods: {
    // 点击授权
    getUserProfile(e) {
      uni.getUserProfile({
        desc: '登录',
        success: (res) => {
          this.$axios.post({
            url: '/wx/wxLogin',
            data: {
              avatar: res.userInfo.avatarUrl,
              nickName: res.userInfo.nickName,
              openId: this.$store.getters.openId,
              unionid: this.$store.getters.unionid
            }
          }).then(res => {
            if (res && (res.code === '0' || res.code === 0)) {
              let login = this.$store.getters.login;
              login.isUpd = 1;
              this.$store.dispatch('loginId', login);
              // this.$store.dispatch('loginId', res.data);
              this.$uni.reLaunch({
                url: `/pages/tabbar/tabbar-home`
              });
              return;
            }
            this.$uni.showToast(res.message);
          });
        },
        fail: (err) => {
          console.log(err);
        }
      });
    }
    // onGotUserInfo(e) {
    //   if (!e.detail) {
    //     return;
    //   }
    //   this.$axios.post({
    //     url: '/app-user/upd-info',
    //     data: {
    //       address: e.detail.userInfo.address,
    //       avatarUrl: e.detail.userInfo.avatarUrl,
    //       birthday: e.detail.userInfo.birthday,
    //       city: e.detail.userInfo.city,
    //       country: e.detail.userInfo.country,
    //       email: e.detail.userInfo.email,
    //       gender: e.detail.userInfo.gender.toString(),
    //       nickName: e.detail.userInfo.nickName,
    //       openid: this.$store.getters.openid,
    //       appid: this.$store.getters.appid,
    //       sessionKey: this.$store.getters.sessionKey,
    //       province: e.detail.userInfo.province,
    //       encryptedData: e.detail.encryptedData,
    //       iv: e.detail.iv,
    //       language: e.detail.userInfo.language,
    //       rawData: e.detail.rawData,
    //       signature: e.detail.signature
    //     }
    //   }).then(result => {
    //     let login = this.$store.getters.login;
    //     login.isUpd = 1;
    //     this.$store.dispatch('loginId', login);
    //     let invitaObj = uni.getStorageSync('invitaObj');
    //     if (invitaObj != '') {
    //       this.$uni.reLaunch({
    //         url: `/pages2/join/join-detail`
    //       });
    //       uni.removeStorageSync('invitaObj');
    //     } else {
    //       this.$uni.reLaunch({
    //         url: `/pages/tabbar/tabbar-home`
    //       });
    //     }
    //   });
    // }
  }
};
</script>

<style lang="scss">
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
  .login-logo {
    width: 146rpx;
    height: 112rpx;
    margin-top: 330rpx;
  }
  .auth-btn {
    width: 266rpx;
    height: 80rpx;
    background: #000000;
    border-radius: 20rpx;
    line-height: 80rpx;
    text-align: center;
    font-size: 34rpx;
    font-weight: normal;
    color: #ffffff;
    margin: 0 auto;
    margin-top: 430rpx;
  }
}
</style>
