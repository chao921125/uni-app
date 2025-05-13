<template>
	<view class="container">
		<van-row gutter="20" class="re-mt-20">
			<van-col span="8"><van-button class="remt-20" @click="toPageLottery">抽奖</van-button></van-col>
			<van-col span="8"><van-button class="re-mt-20" @click="toPageI18n">国际化</van-button></van-col>
		</van-row>

		<re-van-tab-bar></re-van-tab-bar>
	</view>
</template>

<script setup>
import ReVanTabBar from "@/pages/comonents/re-van-tab-bar.vue";
import Constants from "@/common/utils/constants.js";

const toPageI18n = () => {
	uni.navigateTo({
		url: Constants.pages.language,
	});
};

const toPageLottery = () => {
	uni.navigateTo({
		url: Constants.pages.lottery,
	});
};
</script>

<style lang="scss"></style>
