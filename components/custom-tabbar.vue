<script setup>
const props = defineProps({
	current: {
		type: Number,
		default: 0,
	},
});

const tabs = [
	{ text: "首页", icon: "home", path: "/pages/home" },
	{ text: "AI", icon: "chat", path: "/pages/ai" },
	{ text: "课程", icon: "bookmark", path: "/pages/course" },
	{ text: "我", icon: "account", path: "/pages/my" },
];

const onChange = (index) => {
	if (index === props.current) return;
	uni.switchTab({ url: tabs[index].path });
};
</script>

<template>
	<view class="custom-tabbar">
		<view
			v-for="(tab, index) in tabs"
			:key="index"
			class="tab-item"
			@click="onChange(index)"
		>
			<u-icon
				:name="tab.icon"
				size="24"
				:color="current === index ? '#6366f1' : '#9ca3af'"
			></u-icon>
			<text
				class="tab-text"
				:style="{ color: current === index ? '#6366f1' : '#9ca3af' }"
			>{{ tab.text }}</text>
		</view>
	</view>
</template>

<style scoped lang="scss">
.custom-tabbar {
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	height: 50px;
	display: flex;
	align-items: center;
	justify-content: space-around;
	background: #ffffff;
	box-shadow: 0 -2rpx 8rpx rgba(0, 0, 0, 0.04);
	padding-bottom: env(safe-area-inset-bottom);
	z-index: 999;
}
.tab-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4rpx;
}
.tab-text {
	font-size: 10px;
}
</style>