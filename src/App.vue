<script>
  import { mapMutations } from 'vuex';
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
