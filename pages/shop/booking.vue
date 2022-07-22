<template>
	<view class="body-contains">
		<view class="tab-header re-margin-top-30">
			<view class="re-flex-row-between header-text-body">
				<view class="re-flex-row-center header-text" :class="{ 'tab-active-text' : tabOption.index === 1 }" :style="{ width: `calc(100% / 2)` }" @click="tabChange(1)">我要预约</view>
				<view class="re-flex-row-center header-text" :class="{ 'tab-active-text' : tabOption.index === 2 }" :style="{ width: `calc(100% / 2)` }" @click="tabChange(2)">我的预约</view>
			</view>
			<view class="re-flex-row-between header-line-body">
				<view class="re-flex-row-center header-line" :class="{ 'tab-active-line' : tabOption.index === 1 }" :style="{ width: `calc(100% / 2)` }"></view>
				<view class="re-flex-row-center header-line" :class="{ 'tab-active-line' : tabOption.index === 2 }" :style="{ width: `calc(100% / 2)` }"></view>
			</view>
		</view>
		<view v-if="tabOption.index === 1" class="tab-body">
			<view class="form-box">
				<view class="form-item">
					<view class="form-label">预约</view>
					<view class="">{{artsInfo.deptName}}</view>
				</view>
				<view class="form-item">
					<view class="form-label">状态</view>
					<view class="">{{artsInfo.statusDesc}}</view>
				</view>
				<view class="form-item">
					<view class="form-label">营业时间</view>
					<view class="">{{artsInfo.openTime}}</view>
				</view>
				<view class="form-item">
					<view class="form-label">价格范围</view>
					<view class="">
						<picker @change="getChange" :value="selectOption.index" range-key="lable" :range="selectOption.options">
							<view class="uni-input">{{selectOption.options[selectOption.index].lable}}</view>
						</picker>
					</view>
				</view>
			</view>
			<view class="re-flex-row-center">
				<button type="primary" @click="openModalConfirm">确定预约</button>
			</view>
		</view>
		<view v-if="tabOption.index === 2" class="tab-body">
			<view v-if="bookingList && bookingList.length > 0" class="table-book">
				<view class="table-tr" v-for="(item, index) in bookingList" :key="index">
					<view class="re-flex-row-between table-td">
						<view class="td-title">{{item.detpName || "画室"}}</view>
						<view class="td-title">{{enumOption.BookingStatus[item.status].name || "预约成功"}}</view>
					</view>
					<view class="re-flex-row-between table-td">
						<view class="td-value">{{item.createDate || "0000-00-00"}}</view>
						<view class="td-value">价格区间：{{enumOption.PriceRange[item.priceType].name}}</view>
					</view>
				</view>
			</view>
			<view v-else class="re-flex-row-center">
				<text>暂时没有预约</text>
			</view>
		</view>
	</view>
	<uni-popup ref="modalConfirm" type="center" :is-mask-click="false">
		<view class="re-padding-20 bg-color-white re-flex-column-center modal-body">
			<view class="re-margin-bottom-20">是否确认预约</view>
			<view class="re-flex-row-between modal-btn-box">
				<button type="warn" size="mini" @click="closeModalConfirm">取消</button>
				<button type="primary" size="mini" @click="addBooking">确认</button>
			</view>
		</view>
	</uni-popup>
	<ModalInfo ref="modalUser"></ModalInfo>
</template>

<script>
	import ModalInfo from "@/pages/components/re-modal/ModalInfo.vue";
	import utils from "@/common/plugins/uniUtils.js";
	import { selectUserInfo, selectArtsInfo } from "@/common/api/user.js";
	import { createBooking, selectBookingList } from "@/common/api/order.js";
	import enums from "@/common/utils/enums.js";
	
	export default {
		components: {
			ModalInfo,
		},
		data() {
			return {
				enumOption: enums,
				userInfo: {},
				artsInfo: {},
				bookingList: [],
				// 下拉加载更多 start
                pageOption: {
                    page: 1,
                    pageSize: 10,
                    pageTotal: 0,
                },
                loadMoreOption: {
					isShow: true,
                    status: "more",
                    contentText: {
                        contentdown: "上拉加载更多",
                        contentrefresh: "正在加载...",
                        contentnomore: "没有数据了",
                    }
                },
				// 下拉加载更多 end
				selectOption: {
					options: enums.PriceRangeList,
					index: 0
				},
				tabOption: {
					index: 1
				}
			};
		},
		onShow() {
			this.init();
		},
		onReachBottom(e) {
			this.getMoreList();
		},
		methods: {
			init() {
				selectUserInfo({}).then((res) => {
					this.userInfo = res.data;
				});
				this.getArtsInfo();
				this.getBooking();
			},
			getArtsInfo() {
				selectArtsInfo({}).then((res) => {
					this.artsInfo = res.data;
				});
			},
			getChange(e) {
				this.selectOption.index = e.detail.value;
			},
			getBooking() {
				let _this = this;
				selectBookingList({currentPage: this.pageOption.page, pageSzie: this.pageOption.pageSize}).then((res) => {
					_this.bookingList = res.data;
				});
			},
			addBooking(e) {
				let _this = this;
				if (this.userInfo.artBankcard.id && this.userInfo.userAddress.id) {
					createBooking({ priceType: this.selectOption.options[this.selectOption.index].value }).then((res) => {
						if (res.code === 3333) {
							utils.toast(res.msg);
						}
						if (!res.code) {
							_this.tabChange(2);
							_this.closeModalConfirm();
						}
					});
				} else {
					this.$refs.modalUser.openModal();
				}
			},
			tabChange(index) {
				this.tabOption.index = index;
				this.init();
			},
            getMoreList() {
                this.pageOption.page++;
                this.loadMoreOption.status = "loading";
				this.init();
            },
			openModalConfirm() {
				this.$refs.modalConfirm.open();
			},
			closeModalConfirm() {
				this.$refs.modalConfirm.close();
			},
		}
	}
</script>

<style lang="scss" scoped>
	.tab-header {
		.header-text-body {
			.header-text {}
			.tab-active-text {
				color: #FF0000;
			}
		}
		.header-line-body {
			margin-top: 20rpx;
			.header-line {
				height: 6rpx;
				background-color: #999;
			}
			.tab-active-line {
				background-color: #FF0000;
			}
		}
	}
	.tab-body {
		.form-box {
			padding: 0 50rpx;
		}
		.form-item {
			border-bottom: 1rpx solid #CCC;
		}
		.form-label {
			width: 150rpx;
		}
		.table-book {
			padding: 40rpx 0;
		}
		.table-tr {
			border-bottom: 1px solid #CCC;
			margin-bottom: 30rpx;
			.table-td {
				margin: 5rpx 0;
			}
			.td-title {
				font-weight: bold;
			}
			.td-value {
				font-size: 30rpx;
				color: #999;
			}
		}
	}
</style>
