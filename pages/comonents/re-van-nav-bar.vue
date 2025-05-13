<template>
	<view>
		<!-- 手机状态 -->
		<!-- #ifdef APP-PLUS -->
		<view class="nav-status"></view>
		<!-- #endif -->
		<van-nav-bar title="" left-text="" :left-arrow="props.isShowLeft">
			<template v-slot:title>{{ props.title }}</template>
		</van-nav-bar>
	</view>
</template>

<script setup>
const props = defineProps({
	title: {
		type: String,
		default: "",
	},
	isShowLeft: {
		type: Boolean,
		default: true,
	},
	leftText: {
		type: String,
		default: "",
	},
});
</script>

<style lang="scss">
.nav-status {
	height: var(--status-bar-height);
	width: 100%;
}
</style>
