<script setup>
import { reactive, ref } from "vue";

const emit = defineEmits(["switch-tab"]);

const statusBarHeight = (uni.getWindowInfo ? uni.getWindowInfo() : uni.getSystemInfoSync()).statusBarHeight || 0;

const banners = ref([
	{ title: "AI 赋能教育", desc: "智能学习，高效成长", bg: "linear-gradient(135deg, #6366f1, #8b5cf6)" },
	{ title: "名师在线课程", desc: "从基础到高阶，全程陪伴", bg: "linear-gradient(135deg, #ec4899, #f43f5e)" },
	{ title: "AI 智能助手", desc: "随时提问，即时解答", bg: "linear-gradient(135deg, #0ea5e9, #06b6d4)" },
]);

const quickEntries = reactive([
	{ icon: "chat", label: "AI 对话", color: "#6366f1" },
	{ icon: "bookmark", label: "课程中心", color: "#ec4899" },
	{ icon: "account", label: "学习社区", color: "#0ea5e9" },
	{ icon: "checkmark-circle", label: "每日签到", color: "#f59e0b" },
]);

const courses = reactive([
	{ title: "AI 基础入门", desc: "零基础了解人工智能核心概念", price: "免费", tag: "基础", students: "2.3万", bg: "#6366f1" },
	{ title: "机器学习实战", desc: "手把手教你搭建第一个ML模型", price: "¥99", tag: "进阶", students: "1.5万", bg: "#ec4899" },
	{ title: "深度学习精讲", desc: "神经网络与深度学习原理", price: "¥199", tag: "高阶", students: "8600", bg: "#0ea5e9" },
]);

const products = reactive([
	{ title: "AI 学习手册", desc: "涵盖AI基础到进阶全知识点", price: "¥49", original: "¥99", sales: 328 },
	{ title: "智能题库会员", desc: "AI出题+智能批改+错题分析", price: "¥29/月", original: "¥59/月", sales: 512 },
	{ title: "1v1 AI辅导课", desc: "个性化AI辅导，定制学习路径", price: "¥199", original: "¥399", sales: 156 },
	{ title: "AI 实战训练营", desc: "30天集训，项目驱动学习", price: "¥599", original: "¥1299", sales: 89 },
]);

const onQuickTap = (item) => {
	if (item.label === "AI 对话") {
		emit("switch-tab", 1);
	} else if (item.label === "课程中心") {
		emit("switch-tab", 2);
	} else {
		uni.showToast({ title: item.label, icon: "none" });
	}
};

const onCourseTap = (course) => {
	uni.showToast({ title: course.title, icon: "none" });
};

const onProductTap = (product) => {
	uni.showToast({ title: product.title, icon: "none" });
};
</script>

<template>
	<view class="page">
		<view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="nav-content">
				<text class="nav-title">CCNET</text>
				<view class="nav-right">
					<u-icon name="search" size="20" color="#333" @click="uni.showToast({ title: '搜索', icon: 'none' })"></u-icon>
				</view>
			</view>
		</view>

		<scroll-view scroll-y class="content" :style="{ paddingTop: statusBarHeight + 44 + 'px' }">
			<view class="banner-wrap">
				<u-swiper :list="banners" indicator indicatorMode="line" radius="16" height="160" :autoplay="true" interval="3000">
					<template #default="{ item }">
						<view class="banner-item" :style="{ background: item.bg }">
							<text class="banner-title">{{ item.title }}</text>
							<text class="banner-desc">{{ item.desc }}</text>
						</view>
					</template>
				</u-swiper>
			</view>

			<view class="section">
				<view class="quick-grid">
					<view v-for="item in quickEntries" :key="item.label" class="quick-item" @click="onQuickTap(item)">
						<view class="quick-icon" :style="{ background: item.color + '15' }">
							<u-icon :name="item.icon" size="24" :color="item.color"></u-icon>
						</view>
						<text class="quick-label">{{ item.label }}</text>
					</view>
				</view>
			</view>

			<view class="section">
				<view class="section-header">
					<text class="section-title">AI 基础教育课程</text>
					<text class="section-more" @click="emit('switch-tab', 2)">查看全部 ></text>
				</view>
				<scroll-view scroll-x class="course-scroll" show-scrollbar="false">
					<view v-for="course in courses" :key="course.title" class="course-card" @click="onCourseTap(course)">
						<view class="course-cover" :style="{ background: course.bg }">
							<text class="course-tag">{{ course.tag }}</text>
						</view>
						<text class="course-title">{{ course.title }}</text>
						<text class="course-desc">{{ course.desc }}</text>
						<view class="course-footer">
							<text class="course-price" :style="{ color: course.price === '免费' ? '#10b981' : '#f59e0b' }">{{ course.price }}</text>
							<text class="course-students">{{ course.students }}人在学</text>
						</view>
					</view>
				</scroll-view>
			</view>

			<view class="section">
				<view class="section-header">
					<text class="section-title">产品信息</text>
				</view>
				<view class="info-card">
					<view class="info-item">
						<u-icon name="checkmark-circle-fill" size="18" color="#10b981"></u-icon>
						<text class="info-text">AI 智能辅导：基于大模型技术，提供个性化学习方案</text>
					</view>
					<view class="info-item">
						<u-icon name="checkmark-circle-fill" size="18" color="#10b981"></u-icon>
						<text class="info-text">海量课程资源：覆盖AI全领域，从入门到精通</text>
					</view>
					<view class="info-item">
						<u-icon name="checkmark-circle-fill" size="18" color="#10b981"></u-icon>
						<text class="info-text">社区学习：与同行交流，共同进步</text>
					</view>
				</view>
			</view>

			<view class="section">
				<view class="section-header">
					<text class="section-title">热销商品</text>
					<text class="section-more">更多 ></text>
				</view>
				<view class="product-grid">
					<view v-for="product in products" :key="product.title" class="product-card" @click="onProductTap(product)">
						<view class="product-cover">
							<u-icon name="shopping-cart" size="32" color="#6366f1"></u-icon>
						</view>
						<text class="product-title">{{ product.title }}</text>
						<text class="product-desc">{{ product.desc }}</text>
						<view class="product-footer">
							<view class="price-wrap">
								<text class="product-price">{{ product.price }}</text>
								<text class="product-original">{{ product.original }}</text>
							</view>
							<text class="product-sales">已售{{ product.sales }}</text>
						</view>
					</view>
				</view>
			</view>

			<view class="bottom-space"></view>
		</scroll-view>
	</view>
</template>

<style scoped lang="scss">
.page {
	min-height: 100vh;
	background: #f5f5f5;
}
.nav-bar {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: 100;
	background: #ffffff;
	box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.04);
}
.nav-content {
	height: 44px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20rpx;
}
.nav-title {
	font-size: 18px;
	font-weight: 700;
	color: #1f2937;
}
.nav-right {
	padding: 8rpx;
}
.content {
	height: 100vh;
	box-sizing: border-box;
}
.banner-wrap {
	padding: 16rpx 20rpx;
}
.banner-item {
	height: 100%;
	border-radius: 16rpx;
	padding: 32rpx;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.banner-title {
	font-size: 22px;
	font-weight: 700;
	color: #fff;
	margin-bottom: 8rpx;
}
.banner-desc {
	font-size: 14px;
	color: rgba(255, 255, 255, 0.85);
}
.section {
	margin: 16rpx 20rpx;
	background: #fff;
	border-radius: 16rpx;
	padding: 24rpx;
}
.section-header {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 20rpx;
}
.section-title {
	font-size: 16px;
	font-weight: 600;
	color: #1f2937;
}
.section-more {
	font-size: 12px;
	color: #9ca3af;
}
.quick-grid {
	display: flex;
	justify-content: space-around;
}
.quick-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 8rpx;
}
.quick-icon {
	width: 80rpx;
	height: 80rpx;
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.quick-label {
	font-size: 12px;
	color: #4b5563;
}
.course-scroll {
	white-space: nowrap;
}
.course-card {
	display: inline-block;
	width: 280rpx;
	margin-right: 16rpx;
	vertical-align: top;
}
.course-cover {
	height: 140rpx;
	border-radius: 12rpx;
	display: flex;
	align-items: flex-start;
	justify-content: flex-end;
	padding: 12rpx;
}
.course-tag {
	font-size: 10px;
	color: #fff;
	background: rgba(255, 255, 255, 0.3);
	padding: 4rpx 12rpx;
	border-radius: 8rpx;
}
.course-title {
	font-size: 14px;
	font-weight: 600;
	color: #1f2937;
	margin-top: 12rpx;
	display: block;
}
.course-desc {
	font-size: 12px;
	color: #6b7280;
	margin-top: 4rpx;
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.course-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 12rpx;
}
.course-price {
	font-size: 14px;
	font-weight: 600;
}
.course-students {
	font-size: 11px;
	color: #9ca3af;
}
.info-card {
	background: #f0fdf4;
	border-radius: 12rpx;
	padding: 20rpx;
}
.info-item {
	display: flex;
	align-items: flex-start;
	gap: 12rpx;
	margin-bottom: 12rpx;
	&:last-child {
		margin-bottom: 0;
	}
}
.info-text {
	font-size: 13px;
	color: #374151;
	flex: 1;
	line-height: 1.6;
}
.product-grid {
	display: flex;
	flex-wrap: wrap;
	gap: 16rpx;
}
.product-card {
	width: calc(50% - 8rpx);
	background: #f9fafb;
	border-radius: 12rpx;
	overflow: hidden;
}
.product-cover {
	height: 120rpx;
	background: #f3f4f6;
	display: flex;
	align-items: center;
	justify-content: center;
	border-radius: 12rpx 12rpx 0 0;
}
.product-title {
	font-size: 14px;
	font-weight: 600;
	color: #1f2937;
	padding: 12rpx 12rpx 0;
	display: block;
}
.product-desc {
	font-size: 11px;
	color: #6b7280;
	padding: 4rpx 12rpx 0;
	display: block;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.product-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 12rpx;
}
.price-wrap {
	display: flex;
	align-items: baseline;
	gap: 8rpx;
}
.product-price {
	font-size: 14px;
	font-weight: 700;
	color: #f43f5e;
}
.product-original {
	font-size: 11px;
	color: #9ca3af;
	text-decoration: line-through;
}
.product-sales {
	font-size: 10px;
	color: #9ca3af;
}
.bottom-space {
	height: calc(60px + env(safe-area-inset-bottom));
}
</style>