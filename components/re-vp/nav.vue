<template>
	<!-- ✅ 移除所有 v-if / computed / $attrs 干扰，采用显式直绑 -->
	<up-navbar
		:title="title"
		:border="border"
		:left-text="leftText"
		:left-icon="leftIcon"
		:fixed="fixed"
		:placeholder="placeholder"
		:bg-color="bgColor"
		:safe-area-inset-top="safeAreaInsetTop"
		:height="height"
		:auto-back="autoBack"
		:title-style="titleStyle"
		@leftClick="handleLeftClick"
		@rightClick="handleRightClick" />
</template>

<script setup>
// ⚠️ 必须关闭属性继承，防止父级未声明的样式污染根节点
defineOptions({ inheritAttrs: false });

const props = defineProps({
	title: { type: String, default: "" },
	border: { type: Boolean, default: true },
	leftText: { type: String, default: "" },
	leftIcon: { type: String, default: "arrow-left" },
	fixed: { type: Boolean, default: true },
	placeholder: { type: Boolean, default: true },
	bgColor: { type: String, default: "#ffffff" },
	safeAreaInsetTop: { type: Boolean, default: true },
	height: { type: [String, Number], default: 44 },
	autoBack: { type: Boolean, default: true },
	titleStyle: { type: [Object, String], default: null },
});

const emit = defineEmits(["leftClick", "rightClick"]);

// 可选：运行时打印确认 Props 是否接收成功
import { onMounted } from "vue";
onMounted(() => console.log("📦 Navbar Props:", props));

const handleLeftClick = () => {
	if (props.autoBack) uni.navigateBack();
	emit("leftClick");
};
const handleRightClick = (e) => emit("rightClick", e);
</script>
