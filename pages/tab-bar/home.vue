<template>
    <view class="container">
        <uni-notice-bar show-icon scrollable :speed="50" text="为了方便大家,特此做出一个小小工具.请大家关注支持!!!" />
        <van-row gutter="20" class="re-mt-20">
            <van-col span="24">
                <view class="re-pb-20">
                    <van-button @click="openDialog"><van-icon name="wap-nav" size="24" /></van-button>
                    <text class="re-ml-20">分类：{{ webSiteArray.websiteType[webSiteActive].label }}</text>
                </view>
            </van-col>
            <van-col span="12" v-for="(item, index) in webSiteArray.websiteType[webSiteActive].child" :key="index">
                <van-button class="re-mt-20">
                    <view class="re-flex-row-center">
                        <van-image width="15" height="15" :src="item.icon"></van-image>
                        <text class="re-ml-10">{{ item.name }}</text>
                    </view>
                </van-button>
            </van-col>
        </van-row>
        <re-van-tab-bar></re-van-tab-bar>
    </view>
    <van-popup :show="isShowDialog" closeable position="left" custom-style="width: 50%; height: 100%;" @close="closeDialog" @click-overlay="closeDialog">
        <van-sidebar :active-key="webSiteActive" custom-class="home-dialog" @change="changeWebSite">
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
</script>

<style lang="scss">
.home-dialog {
    width: 100%;
    .van-sidebar {
        width: 100% !important;
    }
}
</style>
