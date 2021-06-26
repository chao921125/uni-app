<script>
  import { mapMutations } from 'vuex';
  import constants from '@/utils/constants';

	export default {
		onLaunch: function() {
			console.log('App Launch');
      // 版本更新检查
      /*const updateManager = uni.getUpdateManager();
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
      });*/
      let userInfo = uni.getStorageSync('userInfo') || '';
      if(userInfo.id){
        //更新登陆状态
        uni.getStorage({
          key: 'userInfo',
          success: (res) => {
            this.login(res.data);
          }
        });
      } else {
        uni.redirectTo({ url: constants.routerList.authorization.url });
      }
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
