<template>
	<view class="re-tab" :style="fixed == true ? 'position: fixed;' : ''">
		<!-- 导航 -->
		<view class="tabs" data-ind="0" v-for="(item, indexNav) in tabnav" :key="item.name" :class="type === item.type ? 'tabss' : ''" @click="typefun(indexNav, item.type)">
			<text class="text">{{ item.name }}</text>
		</view>

		<!-- 进度 -->
		<view class="speed" :style="'left:' + dataInd * (750 / tabnav.length) + 'rpx;width:' + 720 / tabnav.length + 'rpx'">
			<view class="speed-box" :style="'width:' + (lineW || (720 / tabnav.length) * 0.5) + 'rpx;' + lineStyle"></view>
		</view>
	</view>
</template>

<script>
export default {
	name: "re-tab",
	props: {
		// 线条宽度
		lineW: {
			type: [Number, String],
			default: 0,
		},
		// 线条颜色
		lineStyle: {
			type: [String],
			default: "",
		},
		// 是否固定
		fixed: {
			type: Boolean,
			default: true,
		},
		// 菜单导航
		tabnav: {
			type: Array,
			default: [
				{
					type: "", //状态值
					name: "全部",
					list: [], //数据
				},
				{
					type: "0", //状态值
					name: "待付款",
					list: [], //数据
				},
				{
					type: "2", //状态值
					name: "待收货",
					list: [], //数据
				},
				{
					type: "3", //状态值
					name: "已完成",
					list: [], //数据
				},
				{
					type: "5", //状态值
					name: "售后",
					list: [], //数据
				},
			],
		},
	},
	data() {
		return {
			btnbb: true,
			userId: "",
			pageSize: 10,
			pageNum: 1,
			type: "", //当前选择类型
			dataInd: 0, //当前选择的索引
			orderStatus: "",
			deliveryId: "",
			navigateLastPage: 0, //总页数
			list: [],
		};
	},
	methods: {
		typefun(ind) {
			this.dataInd = ind;
			this.type = this.tabnav[ind].type;
			this.pageNum = 1;

			// 判断当前有没有数据
			if (this.tabnav[ind].list.length == 0) {
			}

			this.$emit("ontype_", this.tabnav[ind]);
		},
	},
};
</script>

<style lang="scss">
.re-tab {
	height: 80rpx;
	line-height: 80rpx;
	background: #fff;
	position: relative;
	width: 750rpx;
	left: 0px;
	top: 0px;
	z-index: 1;

	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	justify-content: space-around;
	.speed {
		position: absolute;
		bottom: 0rpx;
		left: 0;
		width: 150rpx;
		transition: left 0.3s;

		align-items: center;

		.speed-box {
			margin: auto;
			height: 6rpx;
			background: #fd383f;
			border-radius: 10px;
		}
	}

	.tabs {
		width: 150rpx;
		text-align: center;

		.text {
			text-align: center;
			color: #666666;
			font-size: 28rpx;
		}
	}

	.tabss {
		.text {
			font-size: 28rpx;
			font-weight: 600;
			color: #333333;
		}
	}
}
</style>
