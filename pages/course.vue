<script setup>
import { reactive, ref, computed } from "vue";
import { onPullDownRefresh } from "@dcloudio/uni-app";
import CustomTabbar from "@/components/custom-tabbar.vue";

const statusBarHeight = (uni.getWindowInfo ? uni.getWindowInfo() : uni.getSystemInfoSync()).statusBarHeight || 0;

const categories = reactive([
	{ name: "全部", key: "all" },
	{ name: "基础", key: "basic" },
	{ name: "进阶", key: "intermediate" },
	{ name: "高阶", key: "advanced" },
	{ name: "少儿", key: "kids" },
	{ name: "职场", key: "professional" },
]);

const currentCategory = ref(0);
const filterFree = ref(false);

const allCourses = reactive([
	{ title: "AI 基础入门", desc: "零基础了解人工智能核心概念与应用场景", level: "基础", audience: "全部", isFree: true, price: 0, students: "2.3万", rating: 4.8, bg: "#6366f1" },
	{ title: "Python for AI", desc: "掌握AI编程必备语言，从语法到实战", level: "基础", audience: "全部", isFree: true, price: 0, students: "1.8万", rating: 4.7, bg: "#0ea5e9" },
	{ title: "AI 启蒙课", desc: "用趣味方式带孩子认识AI世界", level: "基础", audience: "少儿", isFree: true, price: 0, students: "5600", rating: 4.9, bg: "#f59e0b" },
	{ title: "机器学习实战", desc: "手把手教你搭建第一个ML模型", level: "进阶", audience: "全部", isFree: false, price: 99, students: "1.5万", rating: 4.6, bg: "#ec4899" },
	{ title: "NLP 自然语言处理", desc: "文本处理、情感分析、对话系统", level: "进阶", audience: "职场", isFree: false, price: 149, students: "8200", rating: 4.5, bg: "#8b5cf6" },
	{ title: "AI 办公提效", desc: "用AI工具提升工作效率", level: "进阶", audience: "职场", isFree: true, price: 0, students: "3.1万", rating: 4.7, bg: "#10b981" },
	{ title: "深度学习精讲", desc: "神经网络与深度学习原理深入剖析", level: "高阶", audience: "全部", isFree: false, price: 199, students: "8600", rating: 4.8, bg: "#0ea5e9" },
	{ title: "AI 模型部署", desc: "从训练到上线的完整流程", level: "高阶", audience: "职场", isFree: false, price: 299, students: "4300", rating: 4.6, bg: "#f43f5e" },
	{ title: "AI 创意编程", desc: "让孩子用AI创作故事和游戏", level: "高阶", audience: "少儿", isFree: false, price: 129, students: "2100", rating: 4.9, bg: "#f59e0b" },
]);

const filteredCourses = computed(() => {
	let result = allCourses;
	if (currentCategory.value > 0) {
		const cat = categories[currentCategory.value];
		if (cat.key === "kids") {
			result = result.filter((c) => c.audience === "少儿");
		} else if (cat.key === "professional") {
			result = result.filter((c) => c.audience === "职场");
		} else {
			result = result.filter((c) => c.level === cat.name);
		}
	}
	if (filterFree.value) {
		result = result.filter((c) => c.isFree);
	}
	return result;
});

const onCategoryChange = (index) => {
	currentCategory.value = index;
};

const onCourseTap = (course) => {
	if (course.isFree) {
		uni.showToast({ title: `开始学习：${course.title}`, icon: "none" });
	} else {
		uni.showToast({ title: `购买课程：¥${course.price}`, icon: "none" });
	}
};

onPullDownRefresh(() => {
	setTimeout(() => uni.stopPullDownRefresh(), 1000);
});
</script>

<template>
	<view class="page">
		<!-- 自定义导航栏 -->
		<view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="nav-content">
				<text class="nav-title">课程中心</text>
				<view class="nav-right">
					<u-icon name="search" size="20" color="#333" @click="uni.showToast({ title: '搜索课程', icon: 'none' })"></u-icon>
				</view>
			</view>
		</view>

		<scroll-view scroll-y class="content" :style="{ paddingTop: statusBarHeight + 44 + 'px' }">
			<!-- 分类标签 -->
			<scroll-view scroll-x class="category-bar" show-scrollbar="false">
				<view class="category-list">
					<view
						v-for="(cat, index) in categories"
						:key="cat.key"
						:class="['category-item', currentCategory === index ? 'active' : '']"
						@click="onCategoryChange(index)"
					>
						<text class="category-text">{{ cat.name }}</text>
					</view>
				</view>
			</scroll-view>

			<!-- 筛选栏 -->
			<view class="filter-bar">
				<view class="filter-item" @click="filterFree = !filterFree">
					<view :class="['filter-check', filterFree ? 'checked' : '']">
						<u-icon v-if="filterFree" name="checkmark" size="12" color="#fff"></u-icon>
					</view>
					<text class="filter-label">仅看免费</text>
				</view>
				<text class="filter-count">共 {{ filteredCourses.length }} 门课程</text>
			</view>

			<!-- 课程列表 -->
			<view class="course-list">
				<view v-for="course in filteredCourses" :key="course.title" class="course-card" @click="onCourseTap(course)">
					<view class="course-cover" :style="{ background: course.bg }">
						<view class="cover-top">
							<text class="level-tag">{{ course.level }}</text>
							<text class="audience-tag">{{ course.audience }}</text>
						</view>
						<view class="cover-bottom">
							<text class="rating-text">⭐ {{ course.rating }}</text>
						</view>
					</view>
					<view class="course-info">
						<text class="course-title">{{ course.title }}</text>
						<text class="course-desc">{{ course.desc }}</text>
						<view class="course-footer">
							<view class="price-wrap">
								<text v-if="course.isFree" class="price-free">免费</text>
								<text v-else class="price-paid">¥{{ course.price }}</text>
							</view>
							<text class="students-count">{{ course.students }}人在学</text>
						</view>
					</view>
				</view>
			</view>

			<view v-if="filteredCourses.length === 0" class="empty-state">
				<u-icon name="info-circle" size="48" color="#d1d5db"></u-icon>
				<text class="empty-text">暂无相关课程</text>
			</view>

			<view class="bottom-space"></view>
		</scroll-view>

		<custom-tabbar :current="2"></custom-tabbar>
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
	background: #fff;
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

.category-bar {
	white-space: nowrap;
	background: #fff;
	padding: 16rpx 0;
}
.category-list {
	display: inline-flex;
	gap: 12rpx;
	padding: 0 20rpx;
}
.category-item {
	padding: 12rpx 28rpx;
	border-radius: 24rpx;
	background: #f3f4f6;
	transition: all 0.2s;
	&.active {
		background: #6366f1;
		.category-text {
			color: #fff;
		}
	}
}
.category-text {
	font-size: 13px;
	color: #4b5563;
}

.filter-bar {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 16rpx 20rpx;
}
.filter-item {
	display: flex;
	align-items: center;
	gap: 8rpx;
}
.filter-check {
	width: 28rpx;
	height: 28rpx;
	border-radius: 6rpx;
	border: 2rpx solid #d1d5db;
	display: flex;
	align-items: center;
	justify-content: center;
	&.checked {
		background: #6366f1;
		border-color: #6366f1;
	}
}
.filter-label {
	font-size: 13px;
	color: #4b5563;
}
.filter-count {
	font-size: 12px;
	color: #9ca3af;
}

.course-list {
	padding: 0 20rpx;
}
.course-card {
	display: flex;
	background: #fff;
	border-radius: 16rpx;
	overflow: hidden;
	margin-bottom: 16rpx;
}
.course-cover {
	width: 240rpx;
	height: 180rpx;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 16rpx;
}
.cover-top {
	display: flex;
	gap: 8rpx;
}
.level-tag, .audience-tag {
	font-size: 10px;
	color: #fff;
	background: rgba(255, 255, 255, 0.25);
	padding: 4rpx 12rpx;
	border-radius: 8rpx;
}
.cover-bottom {
	display: flex;
	justify-content: flex-end;
}
.rating-text {
	font-size: 11px;
	color: rgba(255, 255, 255, 0.9);
}
.course-info {
	flex: 1;
	padding: 16rpx;
	display: flex;
	flex-direction: column;
}
.course-title {
	font-size: 15px;
	font-weight: 600;
	color: #1f2937;
}
.course-desc {
	font-size: 12px;
	color: #6b7280;
	margin-top: 8rpx;
	flex: 1;
	line-height: 1.5;
}
.course-footer {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 12rpx;
}
.price-free {
	font-size: 16px;
	font-weight: 700;
	color: #10b981;
}
.price-paid {
	font-size: 16px;
	font-weight: 700;
	color: #f43f5e;
}
.students-count {
	font-size: 11px;
	color: #9ca3af;
}

.empty-state {
	display: flex;
	flex-direction: column;
	align-items: center;
	padding: 120rpx 0;
	gap: 20rpx;
}
.empty-text {
	font-size: 14px;
	color: #9ca3af;
}

.bottom-space {
	height: 120rpx;
}
</style>