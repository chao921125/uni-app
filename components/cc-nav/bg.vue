<template>
	<view class="top-nav">
		<!-- 背景层（优先级：渐变 > 图片 > 纯色） -->
		<view class="nav-bg" :style="bgStyle"></view>

		<!-- 状态栏占位 -->
		<view :style="{ height: statusBar + 'px' }"></view>

		<!-- 内容区（开放插槽） -->
		<view class="nav-content" :style="{ height: navHeightNum + 'px' }">
			<slot></slot>
		</view>

		<!-- 占位层：防止 fixed 导致内容塌陷 -->
		<view v-if="placeholder" :style="{ height: totalHeight + 'px' }"></view>
	</view>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
	bgColor: { type: String, default: "" }, // 纯色背景
	bgImage: { type: String, default: "" }, // 背景图路径
	bgGradient: { type: String, default: "" }, // 渐变色：'linear-gradient(...)'
	navHeight: { type: [Number, String], default: 60 }, // 导航栏内容高度（不含状态栏）
	statusBarHeight: { type: [Number, String], default: 0 }, // 状态栏高度（0 则自动获取）
	placeholder: { type: Boolean, default: true }, // 是否自动占位
});

// 状态栏高度：传入值 > 自动获取
const statusBar = computed(() => {
	const val = parseInt(props.statusBarHeight);
	return val > 0 ? val : uni.getSystemInfoSync?.().statusBarHeight || 0;
});

const navHeightNum = computed(() => parseInt(props.navHeight) || 60);
const totalHeight = computed(() => statusBar.value + navHeightNum.value);

// 背景样式计算
const bgStyle = computed(() => {
	if (props.bgGradient) {
		return { backgroundImage: props.bgGradient };
	}
	if (props.bgImage) {
		return {
			backgroundImage: `url(${props.bgImage})`,
			backgroundSize: "cover",
			backgroundPosition: "center",
			backgroundRepeat: "no-repeat",
		};
	}
	if (props.bgColor) {
		return { backgroundColor: props.bgColor };
	}
	return {};
});
</script>

<style lang="scss" scoped>
.top-nav {
	position: relative;
	width: 100%;
	overflow: hidden;
}

.nav-bg {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0;
}

.nav-content {
	position: relative;
	z-index: 1;
	display: flex;
	align-items: center;
	padding: 0 24rpx;
	box-sizing: border-box;
}
</style>
