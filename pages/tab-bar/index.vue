<template>
    <view class="container">
        <button class="remt-20" @click="toPageLottery">去抽奖</button>
        <button class="re-mt-20" @click="toPageI18n" disabled="true">to i18n</button>
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
