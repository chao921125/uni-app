<template>
	<view>
		<view class="nav-status nav-bar-safe"></view>
		<view
			class="nav-status nav-status-fixed"
			:style="{ 'background-color': props.statusBackground, color: props.statusColor }"></view>
		<view v-if="isShowNav">
			<!-- :statusBar="true" -->
			<uni-nav-bar
				class="nav-bar"
				:fixed="true"
				:border="false"
				@click-left="onClickLeft"
				@tapRight="onClickRight">
				<block v-slot:left>
					<image
						v-if="props.isShowLeft"
						:src="isDefault ? props.leftIcon : '/static/images/icons/back-round.png'"
						mode="aspectFit"
						:class="isDefault ? 'back-img' : 'back-img-ot'"></image>
				</block>
				<view class="re-flex-row-center nav-title">{{ props.title }}</view>
				<block v-slot:right>
					<view
						v-if="props.isShowRight"
						class="re-flex-row-center nav-text-right">
						{{ props.rightText }}
					</view>
				</block>
			</uni-nav-bar>
		</view>
	</view>
</template>

<script setup name="">
	const props = defineProps({
		isShowNav: {
			require: false,
			type: Boolean,
			default: true,
		},
		isDefault: {
			require: false,
			type: Boolean,
			default: true,
		},
		title: {
			required: false,
			type: String,
			default: "",
		},
		isClickLeft: {
			type: Boolean,
			default: false,
		},
		isShowLeft: {
			required: false,
			type: Boolean,
			default: true,
		},
		leftText: {
			required: false,
			type: String,
			default: "",
		},
		leftIcon: {
			required: false,
			type: String,
			default: "/static/images/icons/left.png",
		},
		isShowRight: {
			required: false,
			type: Boolean,
			default: false,
		},
		rightText: {
			required: false,
			type: String,
			default: "",
		},
		rightIcon: {
			required: false,
			type: String,
			default: "/static/images/icons/right.png",
		},
		statusBackground: {
			required: false,
			type: String,
			default: "#ffffff",
		},
		statusColor: {
			required: false,
			type: String,
			default: "#000000",
		},
	});
	const emits = defineEmits(["left", "right"]);
	const onClickLeft = () => {
		if (props.isShowLeft) {
			if (props.isClickLeft) {
				emits("left", true);
			} else {
				uni.navigateBack(1);
			}
		}
	};
	const onClickRight = () => {
		if (props.isShowRight) {
			emits("right", true);
		}
	};
	defineExpose({
		onClickLeft,
		onClickRight,
	});
</script>

<style scoped lang="scss">
	.nav-bar-safe {
		background-color: #fff;
	}
	.nav-bar {
		width: 100%;
		height: 88rpx;
		background-color: #fff;
	}
	.nav-title {
		width: 100%;
		font-size: 36rpx;
		font-family: SFPro-Bold, SFPro;
		font-weight: bold;
		color: #000000;
	}
	.back-img {
		width: 18rpx;
		height: 32rpx;
	}
	.back-img-ot {
		width: 60rpx;
		height: 60rpx;
	}
	.nav-text-right {
		font-size: 26rpx;
		font-family: SFPro-Regular, SFPro;
		font-weight: 400;
		color: #00ffff;
		line-height: 26rpx;
	}
	.nav-status-fixed {
		position: fixed;
		z-index: 998;
		top: 0;
	}
</style>
