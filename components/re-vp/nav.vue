<template>
	<view class="biz-navbar" :class="{ 'is-fixed': fixed }" :style="wrapperStyle">
		<!-- 背景层 -->
		<view v-if="bgImage || bgGradient" class="navbar-bg" :style="bgStyle"></view>

		<up-navbar
			ref="navbarRef"
			:title="title"
			:left-text="leftText"
			:right-text="rightText"
			:left-icon="leftIcon"
			:right-icon="rightIcon"
			:bg-color="bgColor"
			:fixed="false"
			:placeholder="false"
			:border="border"
			:safe-area-inset-top="false"
			:auto-back="autoBack"
			:title-width="titleWidth"
			:title-style="titleStyle"
			:left-icon-size="leftIconSize"
			:left-icon-color="leftIconColor"
			:height="navHeight"
			:z-index="zIndex"
			@left-click="handleLeftClick"
			@right-click="handleRightClick">
			<!-- 自定义左侧插槽 -->
			<template v-if="$slots.left" #left>
				<slot name="left"></slot>
			</template>

			<!-- 自定义中间插槽 -->
			<template v-if="$slots.center" #center>
				<slot name="center"></slot>
			</template>

			<!-- 自定义右侧插槽 -->
			<template v-if="$slots.right" #right>
				<slot name="right"></slot>
			</template>
		</up-navbar>

		<!-- 占位层 -->
		<view v-if="placeholder" class="navbar-placeholder" :style="{ height: totalHeight + 'px' }"></view>
	</view>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";

const props = defineProps({
	// ===== 基础配置 =====
	title: { type: String, default: "" },
	leftText: { type: String, default: "" },
	rightText: { type: String, default: "" },
	leftIcon: { type: String, default: "arrow-left" },
	rightIcon: { type: String, default: "" },

	// ===== 背景配置 =====
	bgColor: { type: String, default: "#ffffff" },
	bgImage: { type: String, default: "" },
	bgGradient: { type: String, default: "" },
	bgOpacity: { type: Number, default: 1 },
	bgSize: { type: String, default: "cover" },
	bgPosition: { type: String, default: "center" },

	// ===== 布局配置 =====
	fixed: { type: Boolean, default: true },
	placeholder: { type: Boolean, default: false },
	border: { type: Boolean, default: true },
	safeAreaInsetTop: { type: Boolean, default: true },
	autoBack: { type: Boolean, default: true },

	// ===== 样式配置 =====
	titleWidth: { type: [String, Number], default: "400rpx" },
	titleStyle: { type: [Object, String], default: "" },
	leftIconSize: { type: [String, Number], default: "20px" },
	leftIconColor: { type: String, default: "" },
	navHeight: { type: [String, Number], default: 44 },
	zIndex: { type: [String, Number], default: 999 },
});

const emit = defineEmits(["leftClick", "rightClick", "ready"]);

const navbarRef = ref(null);
const statusBarHeight = ref(uni.getSystemInfoSync?.().statusBarHeight || 0);

// 总高度计算
const totalHeight = computed(() => {
	const navHeightNum = parseInt(props.navHeight) || 44;
	return statusBarHeight.value + navHeightNum;
});

// 外层样式
const wrapperStyle = computed(() => {
	const style = {
		zIndex: props.zIndex,
	};
	if (props.border) {
		style.borderBottom = "1px solid rgba(0,0,0,0.1)";
	}
	return style;
});

// 背景样式
const bgStyle = computed(() => {
	const style = {
		opacity: props.bgOpacity,
	};

	if (props.bgGradient) {
		style.background = props.bgGradient;
	} else if (props.bgImage) {
		style.backgroundImage = `url(${props.bgImage})`;
		style.backgroundSize = props.bgSize;
		style.backgroundPosition = props.bgPosition;
		style.backgroundRepeat = "no-repeat";
	}

	return style;
});

// 事件处理
const handleLeftClick = (e) => {
	if (props.autoBack && uni.getCurrentPages?.().length > 1) {
		uni.navigateBack();
	}
	emit("leftClick", e);
};

const handleRightClick = (e) => {
	emit("rightClick", e);
};

// 生命周期
onMounted(() => {
	emit("ready", {
		statusBarHeight: statusBarHeight.value,
		totalHeight: totalHeight.value,
	});
});

// 暴露方法
defineExpose({
	navbarRef,
	refresh: () => {
		statusBarHeight.value = uni.getSystemInfoSync?.().statusBarHeight || 0;
	},
	totalHeight,
});
</script>

<style lang="scss" scoped>
.biz-navbar {
	position: relative;
	width: 100%;

	&.is-fixed {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}
}

.navbar-bg {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0;
	pointer-events: none;
}

.navbar-placeholder {
	width: 100%;
	pointer-events: none;
}

// 确保 up-navbar 背景透明
:deep(.u-navbar) {
	background-color: transparent !important;
}

:deep(.u-navbar__content) {
	background-color: transparent !important;
}
</style>
