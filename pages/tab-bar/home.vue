<template>
    <view class="container">
        <uni-notice-bar show-icon scrollable :speed="50" text="为了方便大家,特此做出一个小小工具.请大家关注支持!!!" />
        <van-row gutter="20" class="re-mt-20">
            <van-col span="24">
                <view class="re-pb-20">
                    <van-button @click="openDialog"><van-icon name="wap-nav" size="24" /></van-button>
                    <text class="re-ml-20">当前分类：{{ webSiteArray.websiteType[webSiteActive].label }}</text>
                    <view class="re-mt-20 website-tips">点击名称即可完成复制,在手机浏览器打开即可</view>
                </view>
            </van-col>
            <van-col span="24" v-for="(item, index) in webSiteArray.websiteType[webSiteActive].child" :key="index">
                <view class="re-mt-20 re-flex">
                    <van-image width="15" height="15" :src="item.icon"></van-image>
                    <uni-link
                        class="re-ml-30"
                        color="#000000"
                        :href="item.url"
                        :text="item.name"
                        showUnderLine="false"
                        copyTips="已复制,请在浏览器打开"
                    ></uni-link>
                </view>
            </van-col>
        </van-row>
        <re-van-tab-bar></re-van-tab-bar>
    </view>
    <van-popup
        :show="isShowDialog"
        closeable
        position="left"
        class="home-dialog"
        custom-style="width: 50%; height: 100%;"
        @close="closeDialog"
        @click-overlay="closeDialog"
    >
        <van-sidebar :active-key="webSiteActive" class="home-sidebar" @change="changeWebSite">
            <van-sidebar-item v-for="(item, index) in webSiteArray.websiteType" :key="index" :title="item.label" :dot="item.isRecommend" />
        </van-sidebar>
    </van-popup>
</template>

<script setup>
import ReVanTabBar from '@/pages/comonents/re-van-tab-bar.vue';
import { ref } from 'vue';
import webSiteArray from '@/common/api/data.json';

const isShowDialog = ref(false);
const openDialog = () => {
    isShowDialog.value = true;
};
const closeDialog = () => {
    isShowDialog.value = false;
};
const webSiteActive = ref(0);
const changeWebSite = (e) => {
    console.log('active', e.detail);
    webSiteActive.value = e.detail;
    closeDialog();
};
// https://wenshu.court.gov.cn/website/wenshu/181107ANFZ0BXSK4/index.html?docId=rxLVW1QZMc15xc1anR6VQ6RpwTP57ez7JsVdXFe4QErIgJT4deCP4p/dgBYosE2gXlwaJez63rKkpQ0i3SSnRtavYjmV3fpKzjgAYaM/n+FQHg8NDVboBJv/Z/lfIkZJ
// https://wenshu.court.gov.cn/website/wenshu/181107ANFZ0BXSK4/index.html?docId=HSIbTIHYRKI5LHHYsLc85Z2AC+jPMl0IiQDcJnRMWWdvjtuLyU1gfZ/dgBYosE2gXlwaJez63rKkpQ0i3SSnRtavYjmV3fpKzjgAYaM/n+FQHg8NDVboBBLmnDWLKvik
</script>

<style lang="scss">
.website-tips {
    color: #999999;
    font-size: 20rpx;
}
.home-dialog {
    .home-sidebar {
        width: 100%;
        > view {
            width: 100%;
        }
        ::v-deep .van-sidebar {
            width: 100%;
        }
    }
}
</style>
