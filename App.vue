<script>
export default {
    globalData: {
        title: 'CC APP'
    },
    // 只能在App.vue里监听应用的生命周期
    onLaunch: function () {
        // 设置小程序分享
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        });
        // 隐藏原生的tabbar，太丑了
        uni.hideTabBar();
    },
    // 只能在App.vue里监听应用的生命周期
    onShow: function () {
        // 隐藏原生的tabbar，太丑了
        uni.hideTabBar();
    },
    // 只能在App.vue里监听应用的生命周期
    onHide: function () {
        console.log('App Hide');
    },
    onError: function () {
        console.log('App Error');
    },
    onUniNViewMessage: function () {
        console.log('App UniNViewMessage');
    },
    onUnhandledRejection: function () {
        console.log('App UnhandledRejection');
    },
    onPageNotFound: function () {
        console.log('App PageNotFound');
    },
    onThemeChange: function () {
        console.log('App ThemeChange');
    }
};
</script>
