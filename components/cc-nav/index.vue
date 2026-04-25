<template>
	<view class="custom-navbar">
		<!-- 导航栏主体 -->
		<view
			class="navbar-wrapper"
			:class="{
				'is-fixed': fixed,
				'is-transparent': transparent,
				'has-bg-image': !!bgImage,
				'has-blur': blur,
			}"
			:style="wrapperStyle">
			<!-- 背景层（支持图片/渐变/纯色 + 遮罩） -->
			<view v-if="bgImage || bgGradient || bgColor" class="navbar-bg" :style="bgStyle">
				<!-- 遮罩层（提升文字可读性） -->
				<view v-if="overlay" class="navbar-overlay" :style="overlayStyle"></view>
			</view>

			<!-- 状态栏安全区 -->
			<view class="status-bar" :style="{ height: statusBarHeight + 'px' }"></view>

			<!-- 导航栏内容区 -->
			<view class="nav-content" :style="{ height: navHeightNum + 'px' }">
				<!-- 左侧区域 -->
				<view v-if="showLeft" class="nav-side nav-left" @click.stop="handleLeft">
					<image v-if="leftIcon" class="side-icon" :src="leftIcon" mode="aspectFit" />
					<text v-if="leftText" class="side-text" :style="{ color: textColor }">{{ leftText }}</text>
					<slot name="left"></slot>
				</view>
				<view v-else class="nav-side nav-placeholder"></view>

				<!-- 中间区域（绝对居中） -->
				<view class="nav-center">
					<text v-if="title" class="nav-title" :style="computedTitleStyle">{{ title }}</text>
					<slot name="center"></slot>
				</view>

				<!-- 右侧区域 -->
				<view v-if="showRight" class="nav-side nav-right" @click.stop="handleRight">
					<slot name="right"></slot>
					<text v-if="rightText" class="side-text" :style="{ color: textColor }">{{ rightText }}</text>
					<image v-if="rightIcon" class="side-icon" :src="rightIcon" mode="aspectFit" />
				</view>
				<view v-else class="nav-side nav-placeholder"></view>
			</view>
		</view>

		<!-- 占位层：防止 fixed 脱离文档流导致内容塌陷 -->
		<view v-if="placeholder" class="navbar-placeholder" :style="{ height: totalHeight + 'px' }"></view>
	</view>
</template>

<script setup>
// ✅ Vue3 必须显式导入所有使用的 API
import { computed, ref, watch, onMounted } from "vue";

const props = defineProps({
	// ===== 基础配置 =====
	title: { type: String, default: "" },
	titleStyle: { type: [Object, String], default: "" },
	navHeight: { type: [Number, String], default: 44 }, // 导航栏内容高度（不含状态栏）
	placeholder: { type: Boolean, default: true }, // 是否自动占位
	fixed: { type: Boolean, default: true }, // 是否固定顶部

	// ===== 背景配置 =====
	bgColor: { type: String, default: "transparent" }, // 背景色
	bgImage: { type: String, default: "" }, // 背景图路径
	bgGradient: { type: String, default: "" }, // 渐变：'linear-gradient(...)'
	bgOpacity: { type: Number, default: 1 }, // 背景透明度 0-1
	bgSize: { type: String, default: "cover" }, // 背景图尺寸
	bgPosition: { type: String, default: "center" }, // 背景图位置

	// ===== 透明模式 =====
	transparent: { type: Boolean, default: false }, // 是否透明穿透
	blur: { type: Boolean, default: false }, // 是否毛玻璃效果
	blurStrength: { type: Number, default: 10 }, // 毛玻璃强度（px）

	// ===== 文字颜色 =====
	textColor: { type: String, default: "#303133" }, // 左右文字颜色
	titleColor: { type: String, default: "#303133" }, // 标题颜色（优先级更高）

	// ===== 遮罩配置 =====
	overlay: { type: Boolean, default: false }, // 是否显示遮罩
	overlayColor: { type: String, default: "rgba(0,0,0,0.3)" },

	// ===== 左右侧配置 =====
	showLeft: { type: Boolean, default: true },
	showRight: { type: Boolean, default: true },
	leftIcon: { type: String, default: "" },
	leftText: { type: String, default: "" },
	rightIcon: { type: String, default: "" },
	rightText: { type: String, default: "" },
	autoBack: { type: Boolean, default: true }, // 左侧是否自动返回

	// ===== 其他 =====
	borderBottom: { type: Boolean, default: false }, // 底部边框
	borderColor: { type: String, default: "rgba(0,0,0,0.1)" },
});

const emit = defineEmits(["leftClick", "rightClick", "ready"]);

// ===== 系统信息 =====
const statusBarHeight = ref(uni.getSystemInfoSync?.().statusBarHeight || 0);
const navHeightNum = computed(() => parseInt(props.navHeight) || 44);
const totalHeight = computed(() => statusBarHeight.value + navHeightNum.value);

// ===== 样式计算 =====

// 主体背景样式
const wrapperStyle = computed(() => {
	const style = {
		backgroundColor: props.transparent ? "transparent" : props.bgColor,
	};
	if (props.borderBottom) {
		style.borderBottom = `1px solid ${props.borderColor}`;
	}
	return style;
});

// 背景层样式（优先级：渐变 > 图片 > 纯色）
const bgStyle = computed(() => {
	const style = {
		opacity: props.bgOpacity,
		backgroundSize: props.bgSize,
		backgroundPosition: props.bgPosition,
		backgroundRepeat: "no-repeat",
	};
	if (props.bgGradient) {
		style.backgroundImage = props.bgGradient;
	} else if (props.bgImage) {
		style.backgroundImage = `url(${props.bgImage})`;
	} else if (props.bgColor && !props.transparent) {
		style.backgroundColor = props.bgColor;
	}
	return style;
});

// 遮罩层样式
const overlayStyle = computed(() => ({
	backgroundColor: props.overlayColor,
}));

// 标题样式（合并默认值 + 用户配置）
const computedTitleStyle = computed(() => {
	const color = props.titleColor || props.textColor;
	const base = {
		fontSize: "32rpx",
		fontWeight: "500",
		color,
		textShadow: props.transparent ? "0 1px 2px rgba(0,0,0,0.3)" : "none",
	};
	if (typeof props.titleStyle === "string") return props.titleStyle;
	if (typeof props.titleStyle === "object") return { ...base, ...props.titleStyle };
	return base;
});

// ===== 事件处理 =====

const handleLeft = () => {
	if (props.autoBack && uni.getCurrentPages?.().length > 1) {
		uni.navigateBack();
	}
	emit("leftClick");
};

const handleRight = () => {
	emit("rightClick");
};

// ===== 生命周期 =====

onMounted(() => {
	// 通知父组件导航栏已就绪
	emit("ready", {
		statusBarHeight: statusBarHeight.value,
		navHeight: navHeightNum.value,
		totalHeight: totalHeight.value,
	});
});

// 监听状态栏高度变化（横屏/热更新时）
watch(
	() => uni.getSystemInfoSync?.()?.statusBarHeight,
	(newVal) => {
		if (newVal != null) statusBarHeight.value = newVal;
	},
);

// ===== 暴露方法 =====

defineExpose({
	refresh: () => {
		statusBarHeight.value = uni.getSystemInfoSync?.().statusBarHeight || 0;
	},
	statusBarHeight,
	totalHeight,
});
</script>

<style lang="scss" scoped>
.custom-navbar {
	width: 100%;
	box-sizing: border-box;
}

.navbar-wrapper {
	width: 100%;
	box-sizing: border-box;
	position: relative;

	&.is-fixed {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 999;
	}

	&.is-transparent {
		background-color: transparent !important;
	}

	&.has-blur {
		// 毛玻璃效果（部分平台需开启硬件加速）
		/* #ifdef H5 || APP-PLUS */
		backdrop-filter: blur(v-bind('props.blurStrength + "px"'));
		-webkit-backdrop-filter: blur(v-bind('props.blurStrength + "px"'));
		/* #endif */
	}
}

.navbar-bg {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 0;
	transition: background 0.3s ease;
}

.navbar-overlay {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 1;
}

.status-bar {
	width: 100%;
	background-color: v-bind('props.transparent ? "transparent" : "inherit"');
	z-index: 2;
	position: relative;
}

.nav-content {
	width: 100%;
	display: flex;
	align-items: center;
	position: relative;
	box-sizing: border-box;
	padding: 0 24rpx;
	z-index: 3;
}

.nav-side {
	flex: 1;
	display: flex;
	align-items: center;
	height: 100%;
	z-index: 2;
	box-sizing: border-box;
}

.nav-left {
	justify-content: flex-start;
}
.nav-right {
	justify-content: flex-end;
}
.nav-placeholder {
	pointer-events: none;
}

.nav-center {
	position: absolute;
	left: 50%;
	top: 0;
	bottom: 0;
	transform: translateX(-50%);
	display: flex;
	align-items: center;
	justify-content: center;
	max-width: 60%;
	z-index: 1;
	overflow: hidden;
}

.nav-title {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;

	.is-transparent & {
		text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
	}
}

.side-icon {
	width: 36rpx;
	height: 36rpx;
	margin-right: 8rpx;

	.is-transparent & {
		filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3));
	}
}

.side-text {
	font-size: 28rpx;
}

.navbar-placeholder {
	width: 100%;
	pointer-events: none;
}
</style>
