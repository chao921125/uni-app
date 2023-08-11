<template>
    <view v-if="!isShowHome" class="re-wh-full re-wh-fill re-text-center welcome-box">
        <van-loading type="spinner" color="#1989fa">加载中...</van-loading>
    </view>
    <Home v-if="isShowHome"></Home>
</template>

<script setup>
import Home from './home.vue';
import { onMounted, onUnmounted, ref } from 'vue';
const timer = ref(null);
const isShowHome = ref(false);
onMounted(() => {
    timer.value = setTimeout(() => {
        isShowHome.value = true;
        clearTimeout(timer.value);
        timer.value = null;
    }, 1500);
});
</script>

<style lang="scss">
.welcome-box {
    margin-top: 50%;
}
</style>
