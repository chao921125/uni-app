<script setup>
import { reactive, ref, nextTick } from "vue";
import { onLoad } from "@dcloudio/uni-app";
import CustomTabbar from "@/components/custom-tabbar.vue";

const statusBarHeight = (uni.getWindowInfo ? uni.getWindowInfo() : uni.getSystemInfoSync()).statusBarHeight || 0;
const navBarHeight = statusBarHeight + 44;

const messages = reactive([
	{
		role: "ai",
		content: "你好！我是 CCNET AI 助手 🤖\n我可以帮你解答 AI 相关的学习问题，推荐课程，或者陪你聊天~\n\n有什么我可以帮你的吗？",
		time: "",
	},
]);

const inputText = ref("");
const scrolling = ref(false);
const scrollTop = ref(0);

const suggestions = reactive([
	"什么是人工智能？",
	"AI 基础入门学什么？",
	"机器学习和深度学习的区别？",
	"推荐一门适合初学者的课程",
]);

const aiResponses = {
	"什么是人工智能？": "人工智能（AI）是计算机科学的一个分支，致力于创建能够模拟人类智能行为的系统。它包括学习、推理、感知、语言理解等能力。\n\nAI 的核心领域包括：\n• 机器学习\n• 深度学习\n• 自然语言处理\n• 计算机视觉\n• 强化学习",
	"AI 基础入门学什么？": "AI 基础入门建议从以下方面学习：\n\n1. 数学基础：线性代数、概率论、微积分\n2. Python 编程语言\n3. 机器学习基本概念和算法\n4. 实践项目：手写数字识别、房价预测等\n\n我们平台有《AI 基础入门》课程，非常适合零基础学习者！",
	"机器学习和深度学习的区别？": "机器学习（ML）和深度学习（DL）的主要区别：\n\n• 机器学习：需要人工设计特征，算法相对简单（决策树、SVM等）\n• 深度学习：自动学习特征，使用多层神经网络，需要更多数据和算力\n\n简单说，深度学习是机器学习的一个子集，但更强大也更复杂。",
	"推荐一门适合初学者的课程": "强烈推荐《AI 基础入门》！\n\n这门课程专为零基础学习者设计，涵盖：\n✅ AI 发展历史与核心概念\n✅ Python 编程快速上手\n✅ 机器学习经典算法实战\n✅ 结业证书 + 就业指导\n\n目前免费开放中，快来学习吧！",
};

const defaultResponse = "这是一个很好的问题！让我来为你解答...\n\nAI 技术正在快速发展，建议你结合我们的课程体系进行系统学习。你可以先从基础课程开始，逐步深入到进阶和高阶内容。\n\n如果你有更具体的问题，随时告诉我哦~";

const scrollToBottom = () => {
	nextTick(() => {
		scrollTop.value = scrollTop.value === 0 ? 1 : 0;
		nextTick(() => {
			scrollTop.value = 99999;
		});
	});
};

const sendMessage = (text) => {
	const content = text || inputText.value.trim();
	if (!content) return;

	messages.push({ role: "user", content, time: "" });
	inputText.value = "";
	scrollToBottom();

	setTimeout(() => {
		const response = aiResponses[content] || defaultResponse;
		messages.push({ role: "ai", content: response, time: "" });
		scrollToBottom();
	}, 800);
};

const onSuggestion = (suggestion) => {
	sendMessage(suggestion);
};

onLoad(() => {
	scrollToBottom();
});
</script>

<template>
	<view class="page">
		<!-- 自定义导航栏 -->
		<view class="nav-bar" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="nav-content">
				<view class="nav-left">
					<view class="ai-badge">
						<u-icon name="chat" size="16" color="#fff"></u-icon>
					</view>
					<text class="nav-title">AI 助手</text>
				</view>
				<view class="nav-status">
					<view class="status-dot"></view>
					<text class="status-text">在线</text>
				</view>
			</view>
		</view>

		<!-- 聊天区域 -->
		<scroll-view
			scroll-y
			class="chat-area"
			:style="{ paddingTop: navBarHeight + 'px', paddingBottom: 'calc(200rpx + env(safe-area-inset-bottom))' }"
			:scroll-top="scrollTop"
			:scroll-with-animation="true"
		>
			<view class="chat-list">
				<view v-for="(msg, index) in messages" :key="index" :class="['msg-wrap', msg.role === 'user' ? 'msg-user' : 'msg-ai']">
					<view v-if="msg.role === 'ai'" class="msg-avatar">
						<u-icon name="chat" size="20" color="#fff"></u-icon>
					</view>
					<view :class="['msg-bubble', msg.role === 'user' ? 'bubble-user' : 'bubble-ai']">
						<text class="msg-text">{{ msg.content }}</text>
					</view>
				</view>
			</view>
		</scroll-view>

		<!-- 快捷建议 -->
		<view v-if="messages.length <= 1" class="suggestions" :style="{ top: navBarHeight + 20 + 'px' }">
			<text class="suggestions-title">💡 你可以问我：</text>
			<view class="suggestions-list">
				<view v-for="s in suggestions" :key="s" class="suggestion-chip" @click="onSuggestion(s)">
					<text class="suggestion-text">{{ s }}</text>
				</view>
			</view>
		</view>

		<!-- 输入栏 -->
		<view class="input-bar" :style="{ bottom: 'calc(50px + env(safe-area-inset-bottom))' }">
			<u-input
				v-model="inputText"
				placeholder="输入你的问题..."
				border="none"
				shape="circle"
				:clearable="false"
				class="input-field"
				@confirm="sendMessage()"
			></u-input>
			<view class="send-btn" :class="{ active: inputText.trim() }" @click="sendMessage()">
				<u-icon name="arrow-up" size="18" :color="inputText.trim() ? '#fff' : '#9ca3af'"></u-icon>
			</view>
		</view>

		<custom-tabbar :current="1"></custom-tabbar>
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
	background: linear-gradient(135deg, #6366f1, #8b5cf6);
}
.nav-content {
	height: 44px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 0 20rpx;
}
.nav-left {
	display: flex;
	align-items: center;
	gap: 12rpx;
}
.ai-badge {
	width: 48rpx;
	height: 48rpx;
	border-radius: 50%;
	background: rgba(255, 255, 255, 0.25);
	display: flex;
	align-items: center;
	justify-content: center;
}
.nav-title {
	font-size: 17px;
	font-weight: 600;
	color: #fff;
}
.nav-status {
	display: flex;
	align-items: center;
	gap: 8rpx;
}
.status-dot {
	width: 12rpx;
	height: 12rpx;
	border-radius: 50%;
	background: #10b981;
}
.status-text {
	font-size: 12px;
	color: rgba(255, 255, 255, 0.9);
}

.chat-area {
	height: 100vh;
	box-sizing: border-box;
}
.chat-list {
	padding: 20rpx;
}
.msg-wrap {
	display: flex;
	margin-bottom: 24rpx;
	gap: 12rpx;
}
.msg-user {
	flex-direction: row-reverse;
}
.msg-avatar {
	width: 64rpx;
	height: 64rpx;
	border-radius: 50%;
	background: linear-gradient(135deg, #6366f1, #8b5cf6);
	display: flex;
	align-items: center;
	justify-content: center;
	flex-shrink: 0;
}
.msg-bubble {
	max-width: 70%;
	padding: 20rpx 24rpx;
	border-radius: 16rpx;
}
.bubble-ai {
	background: #fff;
	border-top-left-radius: 4rpx;
}
.bubble-user {
	background: #6366f1;
	border-top-right-radius: 4rpx;
}
.msg-text {
	font-size: 14px;
	line-height: 1.6;
	white-space: pre-wrap;
}
.bubble-ai .msg-text {
	color: #1f2937;
}
.bubble-user .msg-text {
	color: #fff;
}

.suggestions {
	position: fixed;
	left: 20rpx;
	right: 20rpx;
	z-index: 50;
}
.suggestions-title {
	font-size: 13px;
	color: #6b7280;
	margin-bottom: 16rpx;
	display: block;
}
.suggestions-list {
	display: flex;
	flex-wrap: wrap;
	gap: 12rpx;
}
.suggestion-chip {
	background: #fff;
	border: 1rpx solid #e5e7eb;
	border-radius: 24rpx;
	padding: 12rpx 24rpx;
}
.suggestion-text {
	font-size: 13px;
	color: #4b5563;
}

.input-bar {
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	align-items: center;
	gap: 16rpx;
	padding: 16rpx 20rpx;
	background: #fff;
	border-top: 1rpx solid #e5e7eb;
	padding-bottom: calc(16rpx + env(safe-area-inset-bottom));
}
.input-field {
	flex: 1;
}
.send-btn {
	width: 72rpx;
	height: 72rpx;
	border-radius: 50%;
	background: #e5e7eb;
	display: flex;
	align-items: center;
	justify-content: center;
	transition: all 0.2s;
	&.active {
		background: #6366f1;
	}
}
</style>