<script>
  import { mapMutations } from 'vuex';
  import constants from '@/utils/constants';

	export default {
		onLaunch: function() {
			console.log('App Launch')
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
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
    methods: {
      ...mapMutations(['login'])
    },
	}
</script>

<style lang='scss'>
	/*每个页面公共css */
</style>
