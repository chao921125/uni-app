<template>
    <view>
        <van-tabbar :active="active" @change="changePage" active-color="#1989fa">
            <van-tabbar-item name="index" icon="home-o">首页</van-tabbar-item>
            <van-tabbar-item name="article" icon="description">文章</van-tabbar-item>
            <van-tabbar-item name="api" icon="coupon-o">API</van-tabbar-item>
            <van-tabbar-item name="demo" icon="cashier-o">示例</van-tabbar-item>
        </van-tabbar>
    </view>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const pages = getCurrentPages();
const current = pages[pages.length - 1].route;

const active = ref('');

const changePage = (event) => {
    if (current.includes(event.detail)) return false;
    uni.switchTab({
        url: `/pages/tab-bar/${event.detail}`
    });
};

onMounted(() => {
    console.log('current=============', current.substring(current.lastIndexOf('/') + 1));
    active.value = current.substring(current.lastIndexOf('/') + 1);
});
</script>

<style lang="scss"></style>
