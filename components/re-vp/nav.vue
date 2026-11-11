<template>
	<view class="re-vp-nav" :class="{ 're-vp-nav--no-placeholder': fixed && !placeholder }">
		<t-navbar
			:fixed="fixed"
			:safe-area-inset-top="safeAreaInsetTop"
			:delta="0"
			:custom-style="navbarStyle"
			:t-class="border ? 're-vp-nav--border' : ''"
			v-bind="$attrs"
			@right-click="onRightClick"
		>
			<template #left>
				<view class="re-vp-nav__left" @click="onLeftClick">
					<slot name="left">
						<t-icon
							v-if="leftIcon"
							:name="leftIcon"
							:size="leftIconSize"
							:color="leftIconColor"
						></t-icon>
						<text
							v-if="leftText"
							class="re-vp-nav__text"
							:style="{ color: leftIconColor }"
						>{{ leftText }}</text>
					</slot>
				</view>
			</template>
			<template #title>
				<view class="re-vp-nav__center" :style="{ width: titleWidth }">
					<slot name="center">
						<text :style="titleStyle">{{ title }}</text>
					</slot>
				</view>
			</template>
			<template #right>
				<view v-if="hasRight" class="re-vp-nav__right">
					<slot name="right">
						<t-icon
							v-if="rightIcon"
							:name="rightIcon"
							size="20"
							:color="leftIconColor"
						></t-icon>
						<text v-if="rightText" class="re-vp-nav__text">{{ rightText }}</text>
					</slot>
				</view>
			</template>
		</t-navbar>
	</view>
</template>

<script setup>
import { computed, useSlots } from "vue";

// ✅ Vue3 关键：关闭属性继承，防止污染根节点
defineOptions({ inheritAttrs: false });

const props = defineProps({
	// ===== 内容配置 =====
	title: { type: String, default: "" }, // 标题文字
	leftText: { type: String, default: "" }, // 左侧文字
	rightText: { type: String, default: "" }, // 右侧文字
	leftIcon: { type: String, default: "arrow-left" }, // 左侧图标（TDesign 图标名）
	rightIcon: { type: String, default: "" }, // 右侧图标（TDesign 图标名）

	// ===== 标题样式 =====
	titleWidth: { type: [String, Number], default: "400rpx" }, // 标题宽度
	titleStyle: { type: [Object, String], default: null }, // 标题自定义样式

	// ===== 图标样式 =====
	leftIconSize: { type: [String, Number], default: "20px" }, // 左侧图标大小
	leftIconColor: { type: String, default: "#303133" }, // 左侧图标颜色

	// ===== 背景与布局 =====
	bgColor: { type: String, default: "#ffffff" }, // 背景颜色
	fixed: { type: Boolean, default: true }, // 是否固定顶部
	placeholder: { type: Boolean, default: false }, // 是否生成占位
	border: { type: Boolean, default: true }, // 是否显示下边框
	safeAreaInsetTop: { type: Boolean, default: true }, // 是否开启顶部安全区适配
	autoBack: { type: Boolean, default: true }, // 点击左侧是否自动返回

	// ===== 尺寸与层级 =====
	height: { type: [String, Number], default: 44 }, // 导航栏高度（不含状态栏，单位 px）
	zIndex: { type: [String, Number], default: 999 }, // z-index 层级
});

// ✅ 声明事件（保持原有事件名，驼峰命名）
const emit = defineEmits(["leftClick", "rightClick"]);

const slots = useSlots();

const addUnit = (value) => {
	if (value === "" || value === null || value === undefined) return "";
	return /^-?\d+(\.\d+)?$/.test(String(value)) ? `${value}px` : String(value);
};

const navbarStyle = computed(() => {
	return [
		`--td-navbar-background: ${props.bgColor}`,
		`--td-navbar-height: ${addUnit(props.height)}`,
		`--re-vp-nav-z-index: ${props.zIndex}`,
	].join("; ");
});

const hasRight = computed(() => Boolean(props.rightText || props.rightIcon || slots.right));

const onLeftClick = (e) => {
	emit("leftClick", e);
	if (props.autoBack) {
		uni.navigateBack({ delta: 1 });
	}
};

const onRightClick = (e) => {
	emit("rightClick", e);
};
</script>

<style scoped lang="scss">
.re-vp-nav {
	position: relative;
}
.re-vp-nav__left {
	display: flex;
	align-items: center;
	gap: 8rpx;
	padding: 8rpx 0;
}
.re-vp-nav__center {
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
}
.re-vp-nav__text {
	font-size: 14px;
}
.re-vp-nav__right {
	display: flex;
	align-items: center;
	gap: 8rpx;
}
</style>

<style lang="scss">
/* t-navbar styleIsolation: shared，覆盖其内部样式 */
.re-vp-nav .t-navbar--fixed .t-navbar__content {
	z-index: var(--re-vp-nav-z-index, 999);
}
.re-vp-nav--border .t-navbar__content {
	border-bottom: 1rpx solid #e5e5e5;
}
.re-vp-nav--no-placeholder .t-navbar__placeholder {
	display: none;
}
/* #ifdef MP-WEIXIN */
/* 微信小程序右侧内容避开胶囊按钮 */
.re-vp-nav .t-navbar__right {
	margin-right: var(--td-navbar-right, 95px);
}
/* #endif */
</style>