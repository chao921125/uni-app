<template>
	<up-navbar
		:title="title"
		:left-text="leftText"
		:right-text="rightText"
		:left-icon="leftIcon"
		:right-icon="rightIcon"
		:title-width="titleWidth"
		:title-style="titleStyle"
		:left-icon-size="leftIconSize"
		:left-icon-color="leftIconColor"
		:bg-color="bgColor"
		:fixed="fixed"
		:placeholder="placeholder"
		:border="border"
		:safe-area-inset-top="safeAreaInsetTop"
		:auto-back="autoBack"
		:height="height"
		:z-index="zIndex"
		v-bind="$attrs"
		@leftClick="emit('leftClick', $event)"
		@rightClick="emit('rightClick', $event)">
		<template #left><slot name="left"></slot></template>
		<template #center><slot name="center"></slot></template>
		<template #right><slot name="right"></slot></template>
	</up-navbar>
</template>

<script setup>
// ✅ Vue3 关键：关闭属性继承，防止污染根节点
defineOptions({ inheritAttrs: false });

const props = defineProps({
	// ===== 内容配置 =====
	title: { type: String, default: "" }, // 标题文字
	leftText: { type: String, default: "" }, // 左侧文字
	rightText: { type: String, default: "" }, // 右侧文字
	leftIcon: { type: String, default: "arrow-left" }, // 左侧图标
	rightIcon: { type: String, default: "" }, // 右侧图标

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

// ✅ 声明事件（与 uview-plus 官方事件名保持一致，驼峰命名）
const emit = defineEmits(["leftClick", "rightClick"]);
</script>
