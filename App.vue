<script>
export default {
    onLaunch: function () {
        wx.showShareMenu({
            withShareTicket: true,
            menus: ['shareAppMessage', 'shareTimeline']
        });
        console.log('App Launch');
    },
    onShow: function () {
        console.log('App Show');
    },
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
