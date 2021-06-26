<template>
  <view>
    <button class="user-info-btn" open-type="getUserInfo"
            @getuserinfo="GetUserInfo"
            withCredentials="true">123</button>
    <van-button @click="loginUser">test api</van-button>
  </view>
</template>

<script>
import { login } from '@/api/user';

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
    },
    loginUser() {
      login( { jsCode: 'test123' } ).then(res => {
        console.log(res);
      }).cache(err => {
        console.log(err);
      });
    }
  }
}
</script>

<style scoped>

</style>
