<template>
	<view>
		<!-- 日期选择器 -->
		<view class="content">
			<!-- 默认标题 -->
			<!-- 	<view class="content_box" v-if="!showTitle" @click="getPopup()">
				<view>{{y + "年" + m + "月" + d +"日"}}</view>
			</view> -->
			<!-- 自定义标题 -->
			<!-- <view class="title" v-if="showTitle" @click="getPopup()">
				{{title}}
			</view> -->
			<!-- <uni-popup ref="popup" type="bottom"> -->
			<!-- <view class="popup_body"> -->
			<!-- 关闭弹框 -->
			<!-- <view class="close_popup">
						<text class="iconfont iconerror" @click="close()"></text>
					</view> -->
			<!-- 关闭弹框end -->
			<view class="calendar-wrapper">
				<!-- 选择月份 -->
				<view class="header" v-if="headerBar">
					<view class="iconfont iconarrow-left-bold pre" @click="changeMonth('pre')"></view>
					<view>{{ y + "-" + formatNum(m) + "" }}</view>
					<view class="iconfont iconarrow-left-bold-copy next" @click="changeMonth('next')"></view>
				</view>
				<!-- 星期栏 -->
				<view class="week">
					<view class="week-day" v-for="(item, index) in weekDay" :key="index">{{ item }}</view>
				</view>
				<!-- {{choose}} -->
				<!-- 日历数字 -->
				<view class="content" :style="{ height: height }">
					<view :style="{ top: positionTop + 'rpx' }" class="days">
						<view class="item" v-for="(item, index) in dates" :key="index">
							<view
								class="day"
								@click="selectOne(item, $event)"
								:class="{
									choose: getActday(`${item.year}-${item.month}-${item.date}`) && item.isCurM, //选中的日期
									chooseMarkDay: getChoose(`${item.year}-${item.month}-${item.date}`),
									nolm: !item.isCurM, //不在本月的日
									today: isToday(item.year, item.month, item.date), //当日日期
									isWorkDay: isWorkDay(item.year, item.month, item.date), //周一至周五
								}">
								{{ Number(item.date) }}
							</view>
							<view class="iconfont iconyixuanzhong" :class="{ markDays: getChoose(`${item.year}-${item.month}-${item.date}`) }" v-if="getChoose(`${item.year}-${item.month}-${item.date}`) && !isMarkDay(item.year, item.month, item.date) && item.isCurM"></view>
							<!-- <view :class="{markDay:getChoose(`${item.year}-${item.month}-${item.date}`)}"
										v-if="getChoose(`${item.year}-${item.month}-${item.date}`) && !isMarkDay(item.year, item.month, item.date)&&item.isCurM">
										已投标</view> -->
						</view>
					</view>
				</view>
			</view>
			<!-- </view> -->
			<!-- </uni-popup> -->
		</view>
	</view>
</template>
<script>
export default {
	props: {
		//自定义标题
		// showTitle: {
		// 	type: Boolean,
		// 	default: false
		// },
		// //必须开启自定义标题，才能设置
		// title: {
		// 	type: String,
		// 	default: "自定义标题" //默认值
		// },
		// 星期几为第一天(0为星期日)
		weekstart: {
			type: Number,
			default: 0,
		},
		// 标记的日期
		markDays: {
			type: Array,
			default: () => {
				return [];
			},
		},
		//是否展示月份切换按钮
		headerBar: {
			type: Boolean,
			default: true,
		},
		// 是否展开
		open: {
			type: Boolean,
			default: true,
		},
		//过去日期是否不可点击
		disabledAfter: {
			type: Boolean,
			default: false,
		},
		//接收用户选择的参数
		actDay: {
			type: Array,
			default: [],
		},
		//接受已经被选择的参数
		chooseDay: {
			type: Array,
			default: [],
		},
	},
	data() {
		return {
			weektext: ["日", "一", "二", "三", "四", "五", "六"],
			y: new Date().getFullYear(), // 年
			m: new Date().getMonth() + 1, // 月
			d: new Date().getDate(), //日
			dates: [], // 当前月的日期数据
			positionTop: 0,
			choose: "",
			chooseArr: [],
		};
	},
	created() {
		this.dates = this.monthDay(this.y, this.m);
		console.log("");
	},
	mounted() {
		// this.choose = this.getToday().date;
	},
	computed: {
		// 顶部星期栏
		weekDay() {
			return this.weektext.slice(this.weekstart).concat(this.weektext.slice(0, this.weekstart));
		},
		height() {
			return (this.dates.length / 7) * 80 + "rpx";
		},
	},
	methods: {
		//已被投标的日期
		getChoose(day) {
			for (let i = 0; i < this.chooseDay.length; i++) {
				if (day == this.chooseDay[i]) {
					return true;
				}
			}
		},
		//用户选择的日期
		getActday(day) {
			for (let i = 0; i < this.actDay.length; i++) {
				if (day == this.actDay[i] && !this.getChoose(day)) {
					console.log("选中了", this.actDay);
					return true;
				}
			}
		},
		//弹框模式
		// getPopup() {
		// 	// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
		// 	this.$refs.popup.open('bottom')
		// },
		// //关闭弹窗
		// close() {
		// 	this.$refs.popup.close()
		// },
		formatNum(num) {
			let res = Number(num);
			return res < 10 ? "0" + res : res;
		},
		getToday() {
			let date = new Date();
			let y = date.getFullYear();
			let m = date.getMonth();
			let d = date.getDate();
			let week = new Date().getDay();
			let weekText = ["日", "一", "二", "三", "四", "五", "六"];
			let formatWeek = "星期" + weekText[week];
			let today = {
				date: y + "-" + this.formatNum(m + 1) + "-" + this.formatNum(d),
				week: formatWeek,
			};
			return today;
		},
		// 获取当前月份数据
		monthDay(y, month) {
			let dates = [];
			let m = Number(month);
			let firstDayOfMonth = new Date(y, m - 1, 1).getDay(); // 当月第一天星期几
			let lastDateOfMonth = new Date(y, m, 0).getDate(); // 当月最后一天
			let lastDayOfLastMonth = new Date(y, m - 2, 0).getDate(); // 上一月的最后一天
			let weekstart = this.weekstart == 7 ? 0 : this.weekstart;
			let startDay = (() => {
				// 周初有几天是上个月的
				if (firstDayOfMonth == weekstart) {
					return 0;
				} else if (firstDayOfMonth > weekstart) {
					return firstDayOfMonth - weekstart;
				} else {
					return 7 - weekstart + firstDayOfMonth;
				}
			})();
			let endDay = 7 - ((startDay + lastDateOfMonth) % 7); // 结束还有几天是下个月的
			for (let i = 1; i <= startDay; i++) {
				dates.push({
					date: this.formatNum(lastDayOfLastMonth - startDay + i),
					day: weekstart + i - 1 || 7,
					month: m - 1 >= 0 ? this.formatNum(m - 1) : 12,
					year: m - 1 >= 0 ? y : y - 1,
				});
			}
			for (let j = 1; j <= lastDateOfMonth; j++) {
				dates.push({
					date: this.formatNum(j),
					day: (j % 7) + firstDayOfMonth - 1 || 7,
					month: this.formatNum(m),
					year: y,
					isCurM: true, //是否当前月份
				});
			}
			for (let k = 1; k <= endDay; k++) {
				dates.push({
					date: this.formatNum(k),
					day: (lastDateOfMonth + startDay + weekstart + k - 1) % 7 || 7,
					month: m + 1 <= 11 ? this.formatNum(m + 1) : 0,
					year: m + 1 <= 11 ? y : y + 1,
				});
			}
			// console.log(dates); //日期
			return dates;
		},
		isWorkDay(y, m, d) {
			//是否工作日
			let ymd = `${y}/${m}/${d}`;
			let formatDY = new Date(ymd.replace(/-/g, "/"));
			let week = formatDY.getDay();
			if (week == 0 || week == 6) {
				return false;
			} else {
				return true;
			}
		},
		isFutureDay(y, m, d) {
			//是否未来日期
			let ymd = `${y}/${m}/${d}`;
			let formatDY = new Date(ymd.replace(/-/g, "/"));
			let showTime = formatDY.getTime();
			let curTime = new Date().getTime();
			if (showTime > curTime) {
				return true;
			} else {
				return false;
			}
		},
		// 标记日期
		isMarkDay(y, m, d) {
			let flag = false;
			for (let i = 0; i < this.markDays.length; i++) {
				let dy = `${y}-${m}-${d}`;
				if (this.markDays[i] == dy) {
					flag = true;
					break;
				}
			}
			return flag;
		},
		isToday(y, m, d) {
			let checkD = y + "-" + m + "-" + d;
			let today = this.getToday().date;
			if (checkD == today) {
				return true;
			} else {
				return false;
			}
		},
		// 点击回调
		selectOne(i, event) {
			let date = `${i.year}-${i.month}-${i.date}`;
			let selectD = new Date(date).getTime();
			let curTime = new Date().getTime();
			let week = new Date(date).getDay();
			let weekText = ["日", "一", "二", "三", "四", "五", "六"];
			let formatWeek = "星期" + weekText[week];
			let response = {
				date: date,
				week: formatWeek,
			};
			if (!i.isCurM) {
				console.log("不在当前月范围内");
				return false;
			}
			if (selectD < curTime) {
				if (this.disabledAfter) {
					console.log("过去日期不可选");
					return false;
				} else {
					this.choose = date;
					this.$emit("onDayClick", response);
				}
			} else {
				this.choose = date;
				this.chooseArr.push(date);
				this.$emit("onDayClick", response);
			}
			// console.log(response);
		},
		//改变年月
		changYearMonth(y, m) {
			this.dates = this.monthDay(y, m);
			this.y = y;
			this.m = m;
		},
		changeMonth(type) {
			if (type == "pre") {
				if (this.m + 1 == 2) {
					this.m = 12;
					this.y = this.y - 1;
				} else {
					this.m = this.m - 1;
				}
			} else {
				if (this.m + 1 == 13) {
					this.m = 1;
					this.y = this.y + 1;
				} else {
					this.m = this.m + 1;
				}
			}
			this.dates = this.monthDay(this.y, this.m);
		},
	},
};
</script>
<style lang="scss">
.content {
	.content_box {
	}

	// .popup_body {
	// height: 800rpx;
	// border-radius: 20rpx 20rpx 0 0;
	// background-color: #fff;

	// .close_popup {
	// 	display: flex;
	// 	flex-direction: row-reverse;
	// 	padding: 20rpx;

	// 	.iconfont {
	// 		font-size: 36rpx;
	// 	}
	// }

	.calendar-wrapper {
		color: #6f6d6d;
		font-size: 28rpx;
		text-align: center;
		background-color: #fff;
		padding-bottom: 10rpx;
		border-radius: 20rpx;

		.header {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 88rpx;
			color: #42464a;
			font-size: 32rpx;
			font-weight: bold;
			border-bottom: 2rpx solid #f2f2f2;

			.pre,
			.next {
				font-size: 28rpx;
				padding: 8rpx 15rpx;
				border-radius: 10rpx;
				// border: 2rpx solid #dcdfe6;
			}

			.pre {
				margin-right: 30rpx;
			}

			.next {
				margin-left: 30rpx;
			}
		}

		.week {
			display: flex;
			align-items: center;
			height: 80rpx;
			line-height: 80rpx;
			border-bottom: 1rpx solid rgba(255, 255, 255, 0.2);

			view {
				flex: 1;
			}
		}

		.content {
			position: relative;
			overflow: hidden;
			transition: height 0.4s ease;

			.days {
				transition: top 0.3s;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				position: relative;

				.item {
					position: relative;
					display: block;
					height: 80rpx;
					line-height: 80rpx;
					width: calc(100% / 7);

					.day {
						font-style: normal;
						display: inline-block;
						vertical-align: middle;
						width: 60rpx;
						height: 60rpx;
						line-height: 60rpx;
						overflow: hidden;
						border-radius: 60rpx;

						&.choose {
							background-color: #4bcdc4;
							color: #fff;
						}

						&.chooseMarkDay {
							//已被投标的日期
							// background-color: #43a761;
							color: #5b5b5b;
						}

						&.nolm {
							color: #fff;
							opacity: 0;
						}
					}

					.isWorkDay {
						color: #25272a;
					}

					.notSigned {
						font-style: normal;
						width: 8rpx;
						height: 8rpx;
						background: #fa7268;
						border-radius: 10rpx;
						position: absolute;
						left: 50%;
						bottom: 0;
						pointer-events: none;
					}

					.today {
						color: #fff;
						background-color: #a0eac1;
					}

					.workDay {
						font-style: normal;
						width: 8rpx;
						height: 8rpx;
						background: #4d7df9;
						border-radius: 10rpx;
						position: absolute;
						left: 50%;
						bottom: 0;
						pointer-events: none;
					}

					.markDays {
						font-style: normal;
						position: absolute;
						top: 2rpx;
						right: 11rpx;
						pointer-events: none;
						font-size: 80rpx;
						color: rgba(160, 234, 193, 0.5);
					}

					.markDay {
						font-style: normal;
						// width: 8rpx;
						// height: 8rpx;
						// background: #fc7a64;
						// border-radius: 10rpx;
						position: absolute;
						// left: 50rpx;
						top: 40rpx;
						bottom: 0;
						pointer-events: none;
						color: #fc7a64;
					}
				}
			}
		}
	}
	// }
}
</style>
