<script setup>
import { ref } from "vue";
import TabHome from "@/components/tab-home.vue";
import TabAi from "@/components/tab-ai.vue";
import TabCourse from "@/components/tab-course.vue";
import TabMy from "@/components/tab-my.vue";

const current = ref(0);

const tabs = [
	{ text: "首页", icon: "home" },
	{ text: "AI", icon: "chat" },
	{ text: "课程", icon: "bookmark" },
	{ text: "我", icon: "account" },
];

const onSwitchTab = (index) => {
	current.value = index;
};
</script>

<template>
	<view class="tab-page">
		<tab-home v-show="current === 0" @switch-tab="onSwitchTab"></tab-home>
		<tab-ai v-show="current === 1"></tab-ai>
		<tab-course v-show="current === 2"></tab-course>
		<tab-my v-show="current === 3"></tab-my>

		<view class="custom-tabbar">
			<view
				v-for="(tab, index) in tabs"
				:key="index"
				class="tab-item"
				@click="onSwitchTab(index)"
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
	</view>
</template>

<style scoped lang="scss">
.tab-page {
	min-height: 100vh;
	background: #f5f5f5;
}
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