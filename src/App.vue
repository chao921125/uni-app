<script>
  import { mapMutations } from 'vuex';
  // import constants from '@/common/constants';
  // import { updateApp } from '@/api/app';

	export default {
		onLaunch: function() {
			console.log('App Launch');
      // 版本更新检查
      /*
      updateApp().then(res => {
        const updateManager = uni.getUpdateManager();
        updateManager.onCheckForUpdate(function(res) {
          // 请求完新版本信息的回调
          console.log(res.hasUpdate);
        });
        updateManager.onUpdateReady(function(res) {
          uni.showModal({
            title: '更新提示',
            content: '发现新版本，是否重启应用？',
            success(res) {
              if (res.confirm) {
                // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
                updateManager.applyUpdate();
              }
            }
          });
        });
        updateManager.onUpdateFailed(function(res) {
          // 新的版本下载失败
        });
      });
      */
      // #ifdef APP-PLUS
      // App平台检测升级，服务端代码是通过uniCloud的云函数实现的，详情可参考：https://ext.dcloud.net.cn/plugin?id=2226
      if(plus.runtime.appid !== 'HBuilder'){ // 真机运行不需要检查更新，真机运行时appid固定为'HBuilder'，这是调试基座的appid
        uni.request({
          url: 'https://7a3e3fa9-7820-41d0-be80-11927ac2026c.bspapp.com/http/update', //检查更新的服务器地址
          data: {
            appid: plus.runtime.appid,
            version: plus.runtime.version,
            imei: plus.device.imei
          },
          success: (res) => {
            if (res.statusCode == 200 && res.data.isUpdate) {
              // 提醒用户更新
              uni.showModal({
                title: '更新提示',
                content: res.data.note ? res.data.note : '是否选择更新',
                success: (ee) => {
                  if (ee.confirm) {
                    plus.runtime.openURL(res.data.url);
                  }
                }
              })
            }
          }
        })
      }
      // 一键登录预登陆，可以显著提高登录速度
      uni.preLogin({
        provider: 'univerify',
        success: (res) => {
          // 成功
          console.log("preLogin success: ", res);
        },
        fail: (res) => {
          // 失败
          console.log("preLogin fail res: ", res);
        }
      })
      // #endif
      // let userInfo = uni.getStorageSync('userInfo') || '';
      // if(userInfo.id){
      //   //更新登陆状态
      //   uni.getStorage({
      //     key: 'userInfo',
      //     success: (res) => {
      //       this.login(res.data);
      //     }
      //   });
      // } else {
      //   uni.redirectTo({ url: constants.routerList.authorization.url });
      // }
		},
		onShow: function() {
			console.log('App Show');
		},
		onHide: function() {
			console.log('App Hide');
		},
    methods: {
      ...mapMutations(['login'])
    },
	}
</script>

<style lang='scss'>
	/*每个页面公共css */
</style>
