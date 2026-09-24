<script setup>
import { reactive, ref } from "vue";
import CustomTabbar from "@/components/custom-tabbar.vue";

const statusBarHeight = (uni.getWindowInfo ? uni.getWindowInfo() : uni.getSystemInfoSync()).statusBarHeight || 0;

const userInfo = reactive({
	name: "AI 学习者",
	phone: "138****8888",
	avatar: "",
});

const aiCoins = ref(1280);

const stats = reactive([
	{ label: "学习天数", value: 32 },
	{ label: "已学课程", value: 5 },
	{ label: "获得证书", value: 2 },
]);

const menuGroups = reactive([
	{
		items: [
			{ icon: "order", label: "我的订单", color: "#6366f1" },
			{ icon: "bookmark", label: "学习记录", color: "#ec4899" },
			{ icon: "star", label: "我的收藏", color: "#f59e0b" },
		],
	},
	{
		items: [
			{ icon: "rmb", label: "充值记录", color: "#10b981" },
			{ icon: "gift", label: "兑换商城", color: "#8b5cf6" },
			{ icon: "integral", label: "我的证书", color: "#0ea5e9" },
		],
	},
	{
		items: [
			{ icon: "setting", label: "设置", color: "#6b7280" },
			{ icon: "info-circle", label: "关于我们", color: "#6b7280" },
		],
	},
]);

const onRecharge = () => {
	uni.showToast({ title: "充值功能开发中", icon: "none" });
};

const onMenuTap = (item) => {
	uni.showToast({ title: item.label, icon: "none" });
};
</script>

<template>
	<view class="page">
		<!-- 头部背景 -->
		<view class="header-bg" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="header-content">
				<!-- 用户信息 -->
				<view class="user-row">
					<view class="user-avatar">
						<u-icon name="account-fill" size="32" color="#fff"></u-icon>
					</view>
					<view class="user-info">
						<text class="user-name">{{ userInfo.name }}</text>
						<text class="user-phone">{{ userInfo.phone }}</text>
					</view>
					<u-icon name="arrow-right" size="16" color="rgba(255,255,255,0.7)"></u-icon>
				</view>

				<!-- AI 币卡片 -->
				<view class="coin-card">
					<view class="coin-left">
						<view class="coin-icon">
							<u-icon name="rmb-circle-fill" size="20" color="#f59e0b"></u-icon>
						</view>
						<view class="coin-info">
							<text class="coin-label">AI 币余额</text>
							<text class="coin-value">{{ aiCoins }}</text>
						</view>
					</view>
					<view class="recharge-btn" @click="onRecharge">
						<text class="recharge-text">充值</text>
					</view>
				</view>
			</view>
		</view>

		<scroll-view scroll-y class="content" :style="{ paddingTop: statusBarHeight + 220 + 'px' }">
			<!-- 统计数据 -->
			<view class="stats-card">
				<view v-for="stat in stats" :key="stat.label" class="stat-item">
					<text class="stat-value">{{ stat.value }}</text>
					<text class="stat-label">{{ stat.label }}</text>
				</view>
			</view>

			<!-- 菜单列表 -->
			<view v-for="(group, gi) in menuGroups" :key="gi" class="menu-group">
				<view v-for="item in group.items" :key="item.label" class="menu-item" @click="onMenuTap(item)">
					<view class="menu-icon" :style="{ background: item.color + '15' }">
						<u-icon :name="item.icon" size="18" :color="item.color"></u-icon>
					</view>
					<text class="menu-label">{{ item.label }}</text>
					<u-icon name="arrow-right" size="14" color="#d1d5db"></u-icon>
				</view>
			</view>

			<view class="bottom-space"></view>
		</scroll-view>

		<custom-tabbar :current="3"></custom-tabbar>
	</view>
</template>

<style scoped lang="scss">
.page {
	min-height: 100vh;
	background: #f5f5f5;
}

.header-bg {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	background: linear-gradient(135deg, #6366f1, #8b5cf6);
	height: 220px;
}
.header-content {
	padding: 20rpx 24rpx;
}

.user-row {
	display: flex;
	align-items: center;
	gap: 20rpx;
}
.user-avatar {
	width: 96rpx;
	height: 96rpx;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.25);
	display: flex;
	align-items: center;
	justify-content: center;
}
.user-info {
	flex: 1;
}
.user-name {
	font-size: 18px;
	font-weight: 600;
	color: #fff;
	display: block;
}
.user-phone {
	font-size: 13px;
	color: rgba(255, 255, 255, 0.8);
	margin-top: 4rpx;
	display: block;
}

.coin-card {
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: rgba(255, 255, 255, 0.15);
	border-radius: 16rpx;
	padding: 24rpx;
	margin-top: 24rpx;
}
.coin-left {
	display: flex;
	align-items: center;
	gap: 16rpx;
}
.coin-icon {
	width: 64rpx;
	height: 64rpx;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.2);
	display: flex;
	align-items: center;
	justify-content: center;
}
.coin-info {
	display: flex;
	flex-direction: column;
}
.coin-label {
	font-size: 12px;
	color: rgba(255, 255, 255, 0.85);
}
.coin-value {
	font-size: 24px;
	font-weight: 700;
	color: #fff;
	margin-top: 4rpx;
}
.recharge-btn {
	background: #fff;
	border-radius: 24rpx;
	padding: 12rpx 32rpx;
}
.recharge-text {
	font-size: 13px;
	font-weight: 600;
	color: #6366f1;
}

.content {
	height: 100vh;
	box-sizing: border-box;
}

.stats-card {
	display: flex;
	background: #fff;
	border-radius: 16rpx;
	margin: 0 20rpx;
	padding: 28rpx 0;
}
.stat-item {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8rpx;
}
.stat-value {
	font-size: 22px;
	font-weight: 700;
	color: #1f2937;
}
.stat-label {
	font-size: 12px;
	color: #6b7280;
}

.menu-group {
	background: #fff;
	border-radius: 16rpx;
	margin: 16rpx 20rpx;
	overflow: hidden;
}
.menu-item {
	display: flex;
	align-items: center;
	gap: 20rpx;
	padding: 24rpx;
	border-bottom: 1rpx solid #f3f4f6;
	&:last-child {
		border-bottom: none;
	}
}
.menu-icon {
	width: 64rpx;
	height: 64rpx;
	border-radius: 12rpx;
	display: flex;
	align-items: center;
	justify-content: center;
}
.menu-label {
	flex: 1;
	font-size: 14px;
	color: #1f2937;
}

.bottom-space {
	height: 120rpx;
}
</style>