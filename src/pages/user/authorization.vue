<template>
  <view>
    <button class="user-info-btn" open-type="getUserInfo"
            @getuserinfo="GetUserInfo"
            withCredentials="true">123</button>
  </view>
</template>

<script>
export default {
  name: "authorization",
  onShow() {
    uni.authorize({
      scope: 'scope.userInfo',
      success(res) {
        console.log(res);
        uni.login({
          provider: 'weixin',
          success: function (loginRes) {
            console.log(loginRes.authResult);
            // 获取用户信息
            uni.getUserInfo({
              provider: 'weixin',
              success: function (infoRes) {
                console.log('用户昵称为：' + infoRes.userInfo.nickName);
              }
            });
          }
        });
      },
      fail() {
        uni.openSetting({
          success(authSetting) {
            console.log(authSetting);
          }
        })
      }
    })
  },
  methods: {
    GetUserInfo(res) {
      console.log(res);
    }
  }
}
</script>

<style scoped>

</style>
