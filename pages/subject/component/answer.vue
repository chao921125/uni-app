<template>
	<view class="comp-box">
		<view class="cc-flex-align-center body-title">
			<view class="order">第{{ index }}题</view>
			<view class="cc-flex-center type">{{ typeObj.name }}</view>
		</view>
		<view class="body-content" v-html="subjectInfo.name"></view>
		<!-- 判断是否展示答案 -->
		<view v-if="isShowIf" class="body-answer">
			<template v-for="(item, index) in subjectInfo.anwer">
				<view v-if="Number(item.is_true) === 1" class="answer-item answer-right" :key="index" @click="changeSelect(item.id)">
					<text v-if="typeObj.value === 1 || typeObj.value === 2">{{ item.name }}.</text><text class="answer-select">{{ item.value }}</text>
				</view>
				<view v-else-if="selectAnswer.includes(item.id.toString())" class="answer-item answer-wrong" :key="index" @click="changeSelect(item.id)">
					<text v-if="typeObj.value === 1 || typeObj.value === 2">{{ item.name }}.</text><text class="answer-select">{{ item.value }}</text>
				</view>
				<view v-else class="answer-item" :key="index" @click="changeSelect(item.id)">
					<text v-if="typeObj.value === 1 || typeObj.value === 2">{{ item.name }}.</text><text class="answer-select">{{ item.value }}</text>
				</view>
			</template>
		</view>
		<view v-else class="body-answer">
			<template v-for="(item, index) in subjectInfo.anwer">
				<view v-if="selectAnswer.includes(item.id.toString())" class="answer-item answer-right" :key="index" @click="changeSelect(item.id)">
					<text v-if="typeObj.value === 1 || typeObj.value === 2">{{ item.name }}.</text><text class="answer-select">{{ item.value }}</text>
				</view>
				<view v-else class="answer-item" :key="index" @click="changeSelect(item.id)">
					<text v-if="typeObj.value === 1 || typeObj.value === 2">{{ item.name }}.</text><text class="answer-select">{{ item.value }}</text>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
    import Storage from "@/common/storage.js";
	
	export default {
		props: {
            subjectInfo: {
                type: Object,
                default: () => { return {}; }
            },
			typeObj: {
				type: Object,
				default: () => { return {}; }
			},
			index: {
				type: [String, Number],
				default: "1"
			}
		},
		data() {
			return {
				answerArray: [],
				selectAnswer: [],
				isShowIf: false
			};
		},
		watch: {
			subjectInfo() {
				this.answerArray = Storage.getStorageSync("userSubjectAnswer") || [];
				this.selectAnswer = this.answerArray[this.index] || [];
				if (this.typeObj.value === 3) {
					this.isShowIf = this.selectAnswer.length === 1;
				} else {
					this.isShowIf = this.selectAnswer.length === this.subjectInfo.correct_answer.length;
				}
			}
		},
		methods: {
			changeSelect(item) {
				// 选择和已选择重复，则取消
				let isHasIndex = this.selectAnswer.indexOf(item.toString());
				if (isHasIndex > -1) {
					// 移除当前选择的答案
					this.selectAnswer.splice(isHasIndex, 1);
					this.isShowIf = false;
					this.changeAnswer();
					// 移除对象数据
					return false;
				}
				// 长度相等则无法继续选择
				if (this.typeObj.value === 3) {
					let isIf = this.selectAnswer.length === 1;
					if (isIf) return false;
					this.selectAnswer.push(item.toString());
					this.changeAnswer();
					this.isShowIf = this.selectAnswer.length === 1;
					// 提交答案
					this.submitForm();
				} else {
					let isIf = this.selectAnswer.length === this.subjectInfo.correct_answer.length;
					if (isIf) return false;
					this.selectAnswer.push(item.toString());
					this.changeAnswer();
					this.isShowIf = this.selectAnswer.length === this.subjectInfo.correct_answer.length;
					// 提交答案
					if (this.isShowIf) {
						this.submitForm();
					}
				}
			},
			changeAnswer() {
				let answerResult = this.selectAnswer.join("");
				if (this.selectAnswer.length > 1) {
					answerResult = this.selectAnswer.join(",");
				}
				this.$emit("change", answerResult);
			},
			submitForm() {
				let answerResult = this.selectAnswer.join("");
				if (this.selectAnswer.length > 1) {
					answerResult = this.selectAnswer.join(",");
				}
				this.$emit("submit", answerResult);
			},
		}
	}
</script>

<style scoped lang="scss">
	.comp-box {
		background-color: #FFFFFF;
		padding: 30rpx 30rpx 50rpx;
		color: #333333;
	}
	.body-title {
		.order {
			font-size: 34rpx;
			color: #000000;
		}
		.type {
			font-size: 24rpx;
			color: #FFFFFF;
			width: 100rpx;
			height: 40rpx;
			border-radius: 20rpx;
			margin-left: 15rpx;
			background-color: #6DB5FB;
		}
	}
	.body-content {
		width: 100%;
		word-break: break-word;
		white-space: pre-wrap;
		font-size: 26rpx;
		line-height: 46rpx;
	}
	.body-answer {
		margin-top: 20rpx;
		.answer-item {
		font-size: 26rpx;
			margin-top: 20rpx;
			background-color: #F4F4F4;
			padding: 15rpx 20rpx;
			border-radius: 5rpx;
		}
		.answer-select {
			margin-left: 10rpx;
		}
		.answer-right {
			border: 1rpx solid #6CBAE2;
			background-color: #EBF4F7;
		}
		.answer-wrong {
			border: 1rpx solid #DAB9BC;
			background-color: #FEEBEF;
		}
	}
</style>
