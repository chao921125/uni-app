<template>
    <view>
        <van-tabbar :active="active" @change="changePage">
            <van-tabbar-item name="index" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item name="article" icon="description">文章</van-tabbar-item>
            <van-tabbar-item name="api" icon="coupon-o">API</van-tabbar-item>
            <van-tabbar-item name="demo" icon="cashier-o">示例</van-tabbar-item>
        </van-tabbar>
    </view>
</template>

<script setup>
import { ref } from 'vue';

const pages = getCurrentPages();
const current = pages[pages.length - 1].route;

const active = ref(current);

const changePage = (event) => {
    console.log(event);
    uni.switchTab({
        url: `/pages/tab-bar/${event.detail}`
    });
};
</script>

<style lang="scss"></style>
