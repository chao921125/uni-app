<template>
    <view class="container">
        <view class="re-mb-20">以下是进入各个DEMO的入口</view>
        <van-row gutter="20">
            <van-col span="6"><van-button class="remt-20" @click="toPageLottery">抽奖</van-button></van-col>
            <van-col span="6"><van-button class="re-mt-20" @click="toPageI18n">国际化</van-button></van-col>
        </van-row>
    </view>
</template>

<script setup>
import Constants from '../../common/utils/constants.js';

const toPageI18n = () => {
    uni.redirectTo({
        url: Constants.pages.language
    });
};

const toPageLottery = () => {
    uni.redirectTo({
        url: Constants.pages.lottery
    });
};
</script>

<style lang="scss"></style>
