<template>
	<view>
		<view class="status_bar"></view>
		<view>
			<view class="cc-flex-center select-body" @click="showOptions">
				<text class="select-value">{{ selected.label }}</text>
				<uni-icons v-if="isShowOptions" type="arrowup" size="16" class="select-icon"></uni-icons>
				<uni-icons v-else type="arrowdown" size="16" class="select-icon"></uni-icons>
			</view>
			<scroll-view class="options-box" v-show="isShowOptions">
				<view class="options-body">
					<view class="options-item cc-flex-space-between" v-for="(item, index) in typeList" :key="index" @click="selectValue(item)">
						<view class="options-count cc-flex-center" :class="{'selected-bg' : item.pid === selected.id}">{{ item.name }}</view>
						<view v-show="item.pid === selected.id" class="options-icon cc-flex-center" :class="{'selected-bg' : item.pid === selected.id}"><uni-icons type="checkmarkempty" size="16"></uni-icons></view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import Storage from "@/common/storage.js";
	import { getIndexSubjectType } from "@/api/subject.js";
	
	export default {
		data() {
			return {
				userInfo: {},
				typeList: [],
				selectList: [],
				selected: {
					id: "",
					label: "请选择"
				},
				isShowOptions: false
			};
		},
		mounted() {
			this.initData();
		},
		methods: {
			initData() {
				if (Storage.getStorageSync("userInfo")) {
					this.userInfo = Storage.getStorageSync("userInfo");
					this.getTypes();
				}
			},
			getTypes() {
				getIndexSubjectType({ uid: this.userInfo.id }).then(res => {
					if (res) {
						this.typeList = res.data;
						this.selected.id = res.data[0].pid;
						this.selected.label = res.data[0].name;
						this.userInfo.cateid = res.data[0].pid;
						Storage.setStorageSync("userInfo", this.userInfo);
					}
				});
			},
			showOptions() {
				this.isShowOptions = !this.isShowOptions;
			},
			selectValue(item) {
				this.selected.id = item.pid;
				this.selected.label = item.name;
				this.userInfo.cateid = item.pid;
				Storage.setStorageSync("userInfo", this.userInfo);
				this.isShowOptions = !this.isShowOptions;
                this.$emit("change");
			}
		}
	}
</script>

<style lang="scss">
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
	.select-body {
		height: 100rpx;
	}
	.select-icon {
		margin-left: 20rpx;
	}
	.options-box {
		position: absolute;
		height: auto;
		background-color: #FFFFFF;
		box-shadow: 0 5rpx 20rpx #CCCCCC;
		z-index: 100;
	}
	.options-body {
		padding: 20rpx 30rpx;
		.options-item {
			margin: 5rpx 0;
			&:hover, &:active {
				background-color: #6DB5FB;
			}
		}
		.options-count {
			width: calc(100% - 100rpx);
		}
		.options-icon {
			width: 100rpx;
		}
		.selected-bg {
			background-color: #6DB5FB;
		}
	}
</style>
