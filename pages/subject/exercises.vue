<template>
	<view class="view-box">
		<view class="cc-flex-center exer-model">
			<views class="cc-flex-center btn-box">
				<button class="cc-flex-center btn btn-answer" :class="{ 'btn-select' : !isShowRecite }" @click="changeModel(false)">答题模式</button>
				<button class="cc-flex-center btn btn-recite" :class="{ 'btn-select' : isShowRecite }" @click="changeModel(true)">背题模式</button>
			</views>
		</view>
		<view v-if="!isShowRecite" class="body-subject"><answer :subjectInfo="subjectInfo" :typeObj="typeObj" :index="page" @submit="submitAnswer" @change="changeAnswer"></answer></view>
		<view v-else class="body-subject"><recite :subjectInfo="subjectInfo" :typeObj="typeObj" :index="page"></recite></view>
		<view v-show="isShowAnalysis" class="body-an"><analysis :subjectInfo="subjectInfo"></analysis></view>
		<view class="btn-fixed">
			<view class="btn-space"></view>
			<view class="cc-flex-center btn-position">
				<view class="cc-flex-space-between btn-box">
					<view class="btn-item" @click="preSubject">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconLeft"></image></view>
						<view class="cc-flex-center btn-text">上一题</view>
					</view>
					<view class="btn-item" @click="showAnalysis">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconAnalysis"></image></view>
						<view class="cc-flex-center btn-text">解析</view>
					</view>
					<view class="btn-item">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconMenu"></image></view>
						<view class="cc-flex-center btn-text">{{ page }}/{{ subjectObj.totalnum || 1 }}</view>
					</view>
					<view v-if="isCollection || is_store" class="btn-item" @click="addRemoveCollect(false)">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconCollection"></image></view>
						<view class="cc-flex-center btn-text"><text>取消收藏</text></view>
					</view>
					<view v-else class="btn-item" @click="addRemoveCollect(true)">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconCollec"></image></view>
						<view class="cc-flex-center btn-text"><text>加入收藏</text></view>
					</view>
					<view class="btn-item" @click="nextSubject">
						<view class="cc-flex-center btn-icon"><image class="icon" :src="images.iconRight"></image></view>
						<view class="cc-flex-center btn-text">下一题</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import answer from "./component/answer.vue";
	import recite from "./component/recite.vue";
	import analysis from "./component/analysis.vue";
    import Storage from "@/common/storage.js";
	import { formatSubjectType } from "@/common/format.js";
    import { getDisorder, getSubjectType, addAnswer, addCollect, getWrong, getCollect } from "@/api/subject.js";
    
	export default {
		components: {
			answer,
			recite,
			analysis
		},
		data() {
			return {
				images: {
					iconLeft: require("@/static/icon/icon-left-frame.png"),
					iconRight: require("@/static/icon/icon-right-frame.png"),
					iconAnalysis: require("@/static/icon/icon-analysis.png"),
					iconMenu: require("@/static/icon/icon-menu.png"),
					iconCollec: require("@/static/icon/icon-collec.png"),
					iconCollection: require("@/static/icon/icon-collection.png")
				},
				isShowRecite: false,
				isShowAnalysis: false,
				isCollection: false,
				userInfo: null,
				subjectObj: {},
				subjectInfo: {},
				typeObj: {
					name: "",
					value: ""
				},
				userAnswer: "",
                page: 1,
                cateid: 1,
				// 1 乱序 顺序 专项 2 题型 未作 3 错题 4 收藏
                methods: 1,
                type: 0,
				// 0全部 1今天
				isTody: 0
			};
		},
        onLoad(options) {
            this.page = 1;
            if (options.methods) {
                this.methods = Number(options.methods);
            }
            if (options.type) {
                this.type = options.type;
            }
			if (options.cateid) {
				this.cateid = options.cateid;
			}
			if (options.isTody) {
				this.isTody = options.isTody;
			}
        },
		onShow() {
			this.initData();
		},
		methods: {
			initData() {
				Storage.removeStorageSync("userSubjectAnswer");
				if (Storage.getStorageSync("userInfo")) {
					this.userInfo = Storage.getStorageSync("userInfo");
				}
				this.getSubject();
			},
            getSubject() {
				this.isCollection = false;
                if (!this.isShowRecite) {
                    this.isShowAnalysis = false;
                }
                if (this.methods === 1) {
                    // type 0乱序 1顺序 cateid 专项
                    getSubjectType({
                        uid: this.userInfo.id,
                        cateid: this.userInfo.cateid,
                        type: this.type,
                        is_refur: 1,
                        page: this.page
                    }).then(res => {
                        if (res.data) {
							this.subjectObj = res;
                            this.subjectInfo = res.data[0];
							this.typeObj.name = formatSubjectType(res.data[0].type);
							this.typeObj.value = res.data[0].type;
							if (!Storage.getStorageSync("userSubjectAnswer")) {
								Storage.setStorageSync("userSubjectAnswer", new Array(res.totalnum + 2));
							}
                        }
                    }).catch(() => {
                        uni.showToast({
                            title: "已经是最后一题了",
                            icon: "none"
                        });
                    });
                } else if (this.methods === 2) {
                    // type 0未作题1单选2多选3判断4填空5简答
                    getDisorder({
                        uid: this.userInfo.id,
                        cateid: this.userInfo.cateid,
                        type: this.type,
                        page: this.page
                    }).then(res => {
                        if (res.data) {
							this.subjectObj = res;
                            this.subjectInfo = res.data[0];
							this.typeObj.name = formatSubjectType(res.data[0].type);
							this.typeObj.value = res.data[0].type;
							if (!Storage.getStorageSync("userSubjectAnswer")) {
								Storage.setStorageSync("userSubjectAnswer", new Array(res.totalnum + 2));
							}
                        }
                    }).catch(() => {
                        uni.showToast({
                            title: "已经是最后一题了",
                            icon: "none"
                        });
                    });
                } else if (this.methods === 3) {
					// type 0未作题1单选2多选3判断4填空5简答
					getWrong({
					    uid: this.userInfo.id,
					    cateid: this.userInfo.cateid,
					    type: this.type,
					    page: this.page,
					    isTody: this.isTody
					}).then(res => {
					    if (res.data) {
							this.subjectObj = res;
					        this.subjectInfo = res.data[0];
							this.typeObj.name = formatSubjectType(res.data[0].type);
							this.typeObj.value = res.data[0].type;
							if (!Storage.getStorageSync("userSubjectAnswer")) {
								Storage.setStorageSync("userSubjectAnswer", new Array(res.totalnum + 2));
							}
					    }
					}).catch(() => {
					    uni.showToast({
					        title: "已经是最后一题了",
					        icon: "none"
					    });
					});
				} else {
					// type 0未作题1单选2多选3判断4填空5简答
					getCollect({
					    uid: this.userInfo.id,
					    cateid: this.userInfo.cateid,
					    type: this.type,
					    page: this.page
					}).then(res => {
					    if (res.data) {
							this.subjectObj = res;
					        this.subjectInfo = res.data[0];
							this.typeObj.name = formatSubjectType(res.data[0].type);
							this.typeObj.value = res.data[0].type;
							if (!Storage.getStorageSync("userSubjectAnswer")) {
								Storage.setStorageSync("userSubjectAnswer", new Array(res.totalnum + 2));
							}
					    }
					}).catch(() => {
					    uni.showToast({
					        title: "已经是最后一题了",
					        icon: "none"
					    });
					});
				}
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
                this.getSubject();
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
				if (!this.isShowRecite) {
					this.submitSubject();
				} else {
					this.getSubject();
				}
			},
      changeAnswer(value) {
				this.userAnswer = value;
			},
			submitAnswer(value) {
				this.userAnswer = value;
				this.nextSubject();
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
					paper_id: 0
				}).then(res => {
					if (Number(res.code) === 0) {
						this.getSubject();
					}
				});
			},
			changeModel(val) {
				this.isShowRecite = val;
			},
			showAnalysis() {
				this.isShowAnalysis = !this.isShowAnalysis;
			},
			addRemoveCollect(val) { // 是否加入收藏
				addCollect({
					uid: this.userInfo.id,
					tid: this.subjectInfo.id,
				}).then(res => {
					if (Number(res.code) === 0) {
						this.isCollection = val;
					}
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.exer-model {
		background-color: #FFFFFF;
		padding: 10rpx 0;
		.btn-box {
			border-radius: 8rpx;
			height: 50rpx;
			background-color: #4E9BF5;
			padding: 2rpx;
			.btn {
				width: 130rpx;
				height: 50rpx;
				padding: 0;
				font-size: 22rpx;
				border-radius: 0;
				background-color: #FFFFFF;
				color: #6DB5FB;
			}
			::v-deep.btn::after {
				border: none;
				border-radius: 0;
			}
			.btn-answer {
				border-radius: 8rpx 0 0 8rpx;
			}
			.btn-recite {
				border-radius: 0 8rpx 8rpx 0;
			}
			.btn-select {
				background-color: #6DB5FB;
				color: #FFFFFF;
			}
		}
	}
	.body-subject {
		margin-top: 10rpx;
	}
	.body-an {
		margin-top: 10rpx;
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
</style>
