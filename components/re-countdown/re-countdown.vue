<template>
	<view class="countdown text-success" :class="{ 'is-disabled': isClick }" @click="getCode">{{ codeText }}</view>
</template>

<script>
	import { ref, reactive, watchEffect } from "vue";

	export default {
		props: {
			defaultClick: {
				require: true,
				type: Boolean,
				default: false,
			},
			defaultText: {
				type: String,
				default: "发送验证码",
			},
			defaultTextTips: {
				type: String,
				default: "s",
			},
			defaultTime: {
				type: Number,
				default: 120,
			},
		},
		setup(props, context) {
			// setup(props, {emit})
			const clickBtn = ref(props.defaultClick);
			// 展示文案
			const codeText = ref(props.defaultText);
			// 倒计时s
			const timeOut = ref(props.defaultTime);
			// 是否已经点击，防止重复点击
			const isClick = ref(false);
			// 倒计时对象
			const timeObj = ref(null);

			// 奇葩玩意，父组件变更，子组件监听不到。
			watchEffect(() => {
				clickBtn.value = props.defaultClick;
			});

			function getCode() {
				if (isClick.value) return false;
				context.emit("click", true);
				if (!clickBtn.value) return false;
				isClick.value = true;
				codeText.value = `${timeOut.value} s`;
				timeObj.value = setInterval(() => {
					timeOut.value -= 1;
					codeText.value = `${timeOut.value} s`;
					if (!timeOut.value) {
						clearInterval(timeObj.value);
						codeText.value = props.defaultText;
						timeOut.value = props.defaultTime;
						isClick.value = false;
						timeObj.value = null;
					}
				}, 1000);
			}
			return {
				codeText,
				isClick,
				getCode,
			};
		},
	};
</script>

<style lang="scss" scoped>
	.countdown {
		width: auto;
		display: inline-block;
		text-align: center;
	}
	.is-disabled {
		color: #ccc;
	}
</style>
