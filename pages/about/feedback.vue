<template>
	<view class="fb-box">
		<view class="body-item body-contact"><input class="contact" placeholder="请输入你的联系方式" v-model="form.contact"/></view>
		<view class="body-item body-feedback"><textarea class="feedback" placeholder="请输入反馈信息,我们将及时改进" auto-height v-model="form.feedback"/></view>
		<view class="cc-flex-center body-btn"><button class="btn">提交</button></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					contact: "",
					feedback: ""
				}
			};
		},
		methods: {
			submitForm() {
			}
		}
	}
</script>

<style scoped lang="scss">
	.fb-box {
		min-height: 100vh;
		background-color: #F2F1F8;
		padding-top: 20rpx;
	}
	.body-item {
		background-color: #FFFFFF;
		padding: 20rpx 40rpx;
		font-size: 26rpx;
		.contact {
			font-size: 26rpx;
		}
		.feedback {
			font-size: 26rpx;
			min-height: 260rpx;
		}
	}
	.body-feedback {
		margin-top: 10rpx;
	}
	.body-btn {
		margin-top: 80rpx;
		.btn {
			width: 500rpx;
			height: 60rpx;
			font-size: 24rpx;
			background-color: #6DB5FB;
			color: #FFFFFF;
		}
	}
</style>
