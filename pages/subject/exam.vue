<template>
	<view class="exam-box">
		<view class="time-num">
			<view class="tn-space"></view>
			<view class="cc-flex-space-between tn-fixed">
				<view class="tn-num"><text class="num-current">{{ page }}</text><text>/</text><text>{{ subjectObj.totalnum || 1 }}</text></view>
				<view class="cc-flex-center tn-time"><text class="time-title">剩余时间：</text><cd-time v-if="subjectObj.longtime" class="time-text" :type="2" :seconds="Number(subjectObj.longtime) * 60" @end="autoSubmit"></cd-time></view>
			</view>
		</view>
		<view class="body-subject"><examination :subjectInfo="subjectInfo" :typeObj="typeObj" :index="page" @change="changeAnswer"></examination></view>
		<view class="btn-fixed">
			<view class="btn-space"></view>
			<view class="cc-flex-center btn-position">
				<view class="cc-flex-space-between btn-box">
					<view class="btn-item" @click="preSubject">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconLeft"></image></view>
						<view class="cc-flex-center btn-text">上一题</view>
					</view>
					<view class="btn-item" @click="showSubmitForm">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconAnalysis"></image></view>
						<view class="cc-flex-center btn-text">交卷</view>
					</view>
					<view class="btn-item" @click="showList">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconMenu"></image></view>
						<view class="cc-flex-center btn-text">题卡</view>
					</view>
					<view class="btn-item" @click="nextSubject">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconRight"></image></view>
						<view class="cc-flex-center btn-text">下一题</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="dialogList" type="bottom">
			<view class="list-box">
				<view class="cc-flex-align-center list-header">
					<view class="header-title"><text class="title-text">提卡</text></view>
					<view class="header-num">{{ page }}/{{ subjectObj.totalnum || 1 }}</view>
				</view>
				<scroll-view scroll-y="true" class="scroll-box">
					<view class="cc-flex list-body">
						<view class="cc-flex-center list-item" v-for="(item, index) in answerList" :key="index" @click="gotoSubject(item)" :class="{'list-item-active' : item.isAnswer}">{{ item.index }}</view>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<uni-popup ref="dialogSubmit" type="center">
			<view class="submit-box">
				<view class="cc-flex-center submit-title">交卷</view>
				<view class="cc-flex-center submit-img"><image class="img" :src="images.submitImg"></image></view>
				<view class="cc-flex-space-between submit-do">
					<view class="do-num">
						<view class="cc-flex-center do-num-val">{{doVal}}</view>
						<view class="cc-flex-center do-num-title">已做</view>
					</view>
					<view class="do-num">
						<view class="cc-flex-center do-num-val">{{unDoVal}}</view>
						<view class="cc-flex-center do-num-title">未做</view>
					</view>
				</view>
				<view class="cc-flex-space-between submit-btn">
					<view class="cc-flex-center btn-box"><button class="btn btn-submit" @click="submitForm">现在交卷</button></view>
					<view class="cc-flex-center btn-box"><button class="btn btn-continue" @click="dialogClose">继续答题</button></view>
				</view>
			</view>
		</uni-popup>
		<uni-popup ref="dialogScore" type="center" :mask-click="false">
			<view class="submit-box">
				<view class="cc-flex-center submit-title">得分</view>
				<view class="cc-flex-center submit-img"><image class="img" :src="images.submitImg"></image></view>
				<view class="cc-flex-center submit-do">
					<view class="do-num">
						<view class="cc-flex-center do-num-val">{{resultScoe}}</view>
						<view class="cc-flex-center do-num-title"></view>
					</view>
				</view>
				<view class="cc-flex-center submit-btn">
					<view class="cc-flex-center btn-box"><button class="btn btn-continue" @click="closeScore">确认</button></view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import examination from "./component/examination.vue";
	import CdTime from "@/pages/component/countdown/cd-time.vue";
	import Storage from "@/common/storage.js";
	import { formatSubjectType } from "@/common/format.js";
	import { getPaper, getPaperInfo, addAnswer, addSubject } from "@/api/subject.js";
	
	export default {
		components:  {
			CdTime,
			examination
		},
		data() {
			return {
				images: {
					iconLeft: require("@/static/icon/icon-left-frame.png"),
					iconRight: require("@/static/icon/icon-right-frame.png"),
					iconAnalysis: require("@/static/icon/icon-analysis.png"),
					iconMenu: require("@/static/icon/icon-menu.png"),
					iconCollec: require("@/static/icon/icon-collec.png"),
					iconCollection: require("@/static/icon/icon-collection.png"),
					submitImg: require("@/static/images/subject-confirm.png")
				},
				userInfo: null,
				showCheck: 0,
				isShowCheck: true, // 是否验证通过
				// 试卷id
				examId: "",
				subjectObj: {},
				subjectInfo: {},
				typeObj: {
					name: "",
					value: ""
				},
				// 答题卡使用
				// { index: 1, isAnswer: false }
				answerList: [],
				userAnswer: "",
				unDoVal: 0,
				doVal: 0,
                page: 1,
				resultScoe: 0
			};
		},
		onShow() {
			this.initData();
		},
		methods: {
			initData() {
				Storage.removeStorageSync("userSubjectAnswer");
				if (Storage.getStorageSync("userInfo")) {
					this.userInfo = Storage.getStorageSync("userInfo");
					// 获取试卷
					this.getSubjectId();
				}
			},
			getSubjectId() {
				getPaper({
					uid: this.userInfo.id,
					cateid: this.userInfo.cateid
				}).then(res => {
					if (res.paper_id) {
						this.examId = res.paper_id;
						// 根据试卷获取试题
						this.getSubject();
					} else {
                        uni.showToast({
                            title: res.msg,
                            icon: "none"
                        });
                        setTimeout(() => {
                            uni.navigateBack({});
                        }, 1500);
                    }
				});
			},
			getSubject() {
				// 没有验证的情况下必须验证
				if (!this.isShowCheck) {
					this.faceUp();
				} else if (this.showCheck && this.showCheck === this.page) {
					this.isShowCheck = false;
					// 调用人脸验证
					this.faceUp();
				} else {
					this.getSubjectInfo();
				}
				
			},
			getSubjectInfo() {
				getPaperInfo({
					uid: this.userInfo.id,
					paper_id: this.examId,
					page: this.page
				}).then(res => {
					if (res.data) {
						this.subjectObj = res;
						if (!this.showCheck && res.totalnum < 30) {
							this.showCheck = Math.round(Math.random() * (20 - 10) + 10);
						} else if(!this.showCheck) {
							this.showCheck = Math.round(Math.random() * (res.totalnum - 10) + 10);
						}
						this.subjectInfo = res.data[0];
						this.typeObj.name = formatSubjectType(res.data[0].type);
						this.typeObj.value = res.data[0].type;
						if (this.answerList.length === 0) {
							this.unDoVal = res.totalnum;
							for (let i = 1; i < Number(res.totalnum) + 1; i++) {
								this.answerList.push({
									index: i,
									isAnswer: false
								});
							}
						}
						if (!Storage.getStorageSync("userSubjectAnswer")) {
							Storage.setStorageSync("userSubjectAnswer", new Array(res.totalnum + 2));
						}
					}
				});
			},
			preSubject() {
				if (this.page === 1) {
				    uni.showToast({
				        title: "已经是第一题了",
				        icon: "none"
				    });
				    return false;
				}
				this.page -= 1;
				this.submitSubject();
			},
			nextSubject() {
				if (!this.subjectObj.totalnum) {
					return false;
				}
				if (this.subjectObj.totalnum === this.page) {
					uni.showToast({
					    title: "已经是最后一题了",
					    icon: "none"
					});
					return false;
				}
				this.page += 1;
				// 交卷只在答题模式中才可以提交，获取下一题目
				this.submitSubject();
			},
			changeAnswer(value) {
				this.$set(this.answerList, this.page - 1, { index: this.page, isAnswer: !!value });
				this.userAnswer = value;
				this.unDoVal = this.subjectObj.totalnum;
				this.doVal = 0;
				for (let i in this.answerList) {
					if (this.answerList[i].isAnswer) {
						this.unDoVal--;
						this.doVal++;
					}
				}
			},
			submitSubject() {
				// 缓存
				let answerArray = Storage.getStorageSync("userSubjectAnswer") || [];
				let selectAnswer = [];
				if (this.userAnswer.length > 1) {
					selectAnswer = this.userAnswer.split(",");
				} else {
					selectAnswer.push(this.userAnswer);
				}
				this.$set(answerArray, this.page-1, selectAnswer);
				Storage.setStorageSync("userSubjectAnswer", answerArray);
				// 提交
				addAnswer({
					uid: this.userInfo.id,
					tid: this.subjectInfo.id,
					type: this.subjectInfo.type,
					answer: this.userAnswer,
					paper_id: this.examId
				}).then(res => {
					if (Number(res.code) === 0) {
						this.getSubject();
					}
				});
			},
			// 快速跳转对应题目
			gotoSubject(item) {
				this.page = Number(item.index);
				this.dialogClose();
				this.submitSubject();
			},
			submitForm() {
				let _this = this;
				addAnswer({
					uid: this.userInfo.id,
					tid: this.subjectInfo.id,
					type: this.subjectInfo.type,
					answer: this.userAnswer,
					paper_id: this.examId
				}).then(res => {
					if (Number(res.code) === 0) {
						addSubject({
							uid: _this.userInfo.id,
							paper_id: Number(_this.examId)
						}).then(res => {
							if (res) {
								_this.resultScoe = res.totalfen;
								_this.showScore();
							}
						});
					}
				});
			},
			// 时间到，自动提交
			autoSubmit() {
				console.log("auto submit");
				this.submitForm();
			},
			// 交卷
			showSubmitForm() {
				this.$refs.dialogSubmit.open();
			},
			// 答题卡
			showList() {
				this.$refs.dialogList.open();
			},
			// 最终分数
			showScore() {
				this.$refs.dialogScore.open();
			},
			closeScore() {
				this.$refs.dialogScore.close();
				uni.switchTab({
					url: "/pages/tab-bar/index"
				});
			},
			dialogClose() {
				this.$refs.dialogList.close();
				this.$refs.dialogSubmit.close();
			},
			faceUp() {
				let _this = this;
				uni.chooseImage({
					count: 1,
					sizeType: ["original", "compressed"],
					sourceType: ["camera"],
					success: (res) => {
						// 调用摄像头用这个
						uni.getFileSystemManager().readFile({
								filePath: res.tempFilePaths[0],
								encoding: 'base64',
								success: r => { 
								let base64 = 'data:image/jpeg;base64,'  + r.data;
								_this.loginFace(base64);
							}
						});
					}
				});
			},
			loginFace(base64) {
				let _this = this;
				loginFace({
					name: this.userInfo.username,
					pic: base64
				}).then(res => {
					if (res.data) {
						_this.isShowCheck = true;
						_this.getSubjectInfo();
					} else {
						_this.isShowCheck = false;
						uni.switchTab({
							url: "/pages/tab-bar/index"
						});
					}
				}).catch(e => {
					_this.isShowCheck = false;
					console.log("login faild", e);
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.time-num {
		color: #333333;
		.tn-space {
			width: 100%;
			height: 60rpx;
		}
		.tn-fixed {
			width: 100%;
			height: 60rpx;
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			background-color: #FFFFFF;
		}
		.tn-num {
			font-size: 26rpx;
			margin-left: 20rpx;
			.num-current {
				color: #4E9BF5;
			}
		}
		.tn-time {
			font-size: 26rpx;
			margin-right: 20rpx;
		}
	}
	.body-subject {
		margin-top: 20rpx;
	}
	.btn-fixed {
		.btn-space {
			width: 100%;
			height: 120rpx;
		}
		.btn-position {
			width: 100%;
			height: 120rpx;
			background-color: #FFFFFF;
			position: fixed;
			// 底部适配
			bottom: env(safe-area-inset-bottom);;
			left: 0;
			z-index: 99;
		}
		.btn-box {
			width: calc(100% - 80rpx);
			padding: 0 40rpx;
		}
		.btn-item {
			width: calc(100% / 5);
			.btn-icon {
				.icon {
					width: 40rpx;
					height: 40rpx;
				}
			}
			.btn-text {
				margin-top: 10rpx;
				font-size: 24rpx;
				color: #4E9BF5;
			}
		}
	}
	// 题卡
	.list-box {
		.list-header {
			height: 80rpx;
			border-radius: 10rpx 10rpx 0 0;
			background-color: #FFFFFF;
			border-bottom: 1rpx solid #D6D7D8;
			.header-title {
				height: 40rpx;	
				font-size: 28rpx;
				line-height: 40rpx;
				color: #333333;
				border-left: 8rpx solid #6DB5FB;
				.title-text {
					margin-left: 10rpx;
				}
			}
			.header-num {
				margin-left: 30rpx;
				font-size: 24rpx;
				color: #7A7D7C;
			}
		}
		.scroll-box {
			height: 600rpx;
		}
		.list-body {
			background-color: #FFFFFF;
			padding: 0 10rpx 10rpx;
			min-height: 600rpx;
			flex-wrap: wrap;
			.list-item {
				width: 70rpx;
				height: 70rpx;
				border-radius: 50%;
				background-color: #F2F1F8;
				color: #333333;
				font-size: 28rpx;
				margin: 10rpx;
			}
			.list-item-active {
				background-color: #6DB5FB;
				color: #FFFFFF;
			}
		}
	}
	// 提交
	.submit-box {
		width: 560rpx;
		height: auto;
		background-color: #FFFFFF;
		border-radius: 10rpx;
		.submit-title {
			height: 80rpx;
			border-bottom: 1rpx solid #D6D7D8;
			font-size: 26rpx;
			color: #333333;
			margin-top: 10rpx;
		}
		.submit-img {
			height: 200rpx;
			.img {
				width: 180rpx;
				height: 180rpx;
			}
		}
		.submit-do {
			margin-top: 30rpx;
			.do-num {
				width: 50%;
				font-size: 26rpx;
				color: #333333;
			}
		}
		.submit-btn {
			margin-top: 30rpx;
			padding-bottom: 50rpx;
			.btn-box {
				width: 50%;
			}
			.btn {
				width: 200rpx;
				height: 80rpx;
				font-size: 30rpx;
				border-radius: 40rpx;
			}
			.btn-submit {
				color: #6DB5FB;
				background-color: #FFFFFF;
				border: 1rpx solid #6DB5FB;
			}
			.btn-continue {
				color: #FFFFFF;
				background-color: #6DB5FB;
				border: 1rpx solid #FFFFFF;
			}
		}
	}
</style>
