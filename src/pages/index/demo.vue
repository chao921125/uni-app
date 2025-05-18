<script setup>
	import router from "@/config/router.js";

	const toPage = (url) => {
		uni.navigateTo({
			url: url,
		});
	};
</script>

<template>
	<view class="container">
		<view class="re-flex-wrap">
			<view class="re-mb-10 re-mr-20"
				><van-button
					class="re-mb-20"
					@tap="toPage(router.DemoLottery)"
					>抽奖</van-button
				></view
			>
			<view class="re-mb-10 re-mr-20"
				><van-button
					class="re-mb-20"
					@tap="toPage(router.DemoLotteryBasic)"
					>抽奖（基础）</van-button
				></view
			>
			<view class="re-mb-10 re-mr-20"
				><van-button
					class="re-mb-20"
					@tap="toPage(router.DemoLuckyWheel)"
					>抽奖（大转盘）</van-button
				></view
			>
			<view class="re-mb-10 re-mr-20"
				><van-button
					class="re-mb-20"
					@tap="toPage(router.DemoLuckyGrid)"
					>抽奖（九宫格）</van-button
				></view
			>
			<view class="re-mb-10 re-mr-20"
				><van-button
					class="re-mb-20"
					@tap="toPage(router.DemoLuckyMachine)"
					>抽奖（老虎机）</van-button
				></view
			>
			<view class="re-mb-10 re-mr-20"
				><van-button
					class="re-mb-20"
					@tap="toPage(router.DemoLanguage)"
					>国际化</van-button
				></view
			>
		</view>
		<van-row
			gutter="20"
			class="re-mt-20">
			<van-col span="8"> </van-col>
			<van-col
				span="12"
				class="re-mb-20">
			</van-col>
			<van-col
				span="12"
				class="re-mb-20">
			</van-col>
			<van-col
				span="12"
				class="re-mb-20">
			</van-col>
			<van-col
				span="8"
				class="re-mb-20">
			</van-col>
		</van-row>
	</view>
</template>

<style lang="scss"></style>
