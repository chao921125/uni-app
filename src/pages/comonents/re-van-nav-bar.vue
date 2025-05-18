<script setup>
	const props = defineProps({
		title: {
			type: String,
			default: "",
		},
		isToHome: {
			type: Boolean,
			default: false,
		},
		isShowLeft: {
			type: Boolean,
			default: true,
		},
		isLeftClick: {
			type: Boolean,
			default: false,
		},
		leftText: {
			type: String,
			default: "",
		},
	});

	const emits = defineEmits(["left"]);
	const clickLeft = () => {
		if (!props.isShowLeft) return false;
		if (props.isLeftClick) {
			emits("left", true);
		} else {
			if (props.isToHome) {
				uni.navigateTo({
					url: "/pages/index/index?index=0",
				});
			} else {
				uni.navigateBack(1);
			}
		}
	};
</script>

<template>
	<view>
		<!-- 手机状态 -->
		<!-- #ifdef APP-PLUS -->
		<view class="nav-status"></view>
		<!-- #endif -->
		<van-nav-bar
			:left-arrow="props.isShowLeft"
			@click-left="clickLeft">
			<template v-slot:title>{{ props.title }}</template>
		</van-nav-bar>
	</view>
</template>

<style lang="scss">
	.nav-status {
		height: var(--status-bar-height);
		width: 100%;
	}
</style>
