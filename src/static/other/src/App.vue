<script>
export default {
  onLaunch: function() {
    // 刘海屏幕
    uni.getSystemInfo({
      success: res => {
        // const modelStr = res.model.substr(0, 8);
        const system = res.system.substr(0, 3);
        this.$options.globalData.isIpx = system === 'iOS' && res.screenHeight > 736;
      }
    });
  },
  onShow: function() {
    // if (!this.$route.matched || this.$route.matched.length === 0) {
    //   this.$router.push({ path: '/pages/tabbar/tabbar-home' });
    // }
  },
  onHide: function() { },
  globalData: {
    isIpx: false
  }
};
</script>

<style lang="scss">
@import "./common/global.scss";
/* 条件编译，仅在H5平台生效 */
// #ifdef H5
body::-webkit-scrollbar,
html::-webkit-scrollbar {
  display: none;
}
// #endif
</style>
