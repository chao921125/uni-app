<template>
	<view class="order-box">
		<view class="tab-header re-margin-top-30">
			<view class="re-flex-row-between header-text-body">
				<view class="re-flex-row-center header-text" :class="{ 'tab-active-text' : tabOption.index === 1 }" :style="{ width: `calc(100% / 5)` }" @click="tabChange(1)">全部</view>
				<view class="re-flex-row-center header-text" :class="{ 'tab-active-text' : tabOption.index === 2 }" :style="{ width: `calc(100% / 5)` }" @click="tabChange(2)">待付款</view>
				<view class="re-flex-row-center header-text" :class="{ 'tab-active-text' : tabOption.index === 3 }" :style="{ width: `calc(100% / 5)` }" @click="tabChange(3)">待收款</view>
				<view class="re-flex-row-center header-text" :class="{ 'tab-active-text' : tabOption.index === 4 }" :style="{ width: `calc(100% / 5)` }" @click="tabChange(4)">待上架</view>
				<view class="re-flex-row-center header-text" :class="{ 'tab-active-text' : tabOption.index === 5 }" :style="{ width: `calc(100% / 5)` }" @click="tabChange(5)">已售出</view>
			</view>
			<view class="re-flex-row-between header-line-body">
				<view class="re-flex-row-center header-line" :class="{ 'tab-active-line' : tabOption.index === 1 }" :style="{ width: `calc(100% / 5)` }"></view>
				<view class="re-flex-row-center header-line" :class="{ 'tab-active-line' : tabOption.index === 2 }" :style="{ width: `calc(100% / 5)` }"></view>
				<view class="re-flex-row-center header-line" :class="{ 'tab-active-line' : tabOption.index === 3 }" :style="{ width: `calc(100% / 5)` }"></view>
				<view class="re-flex-row-center header-line" :class="{ 'tab-active-line' : tabOption.index === 4 }" :style="{ width: `calc(100% / 5)` }"></view>
				<view class="re-flex-row-center header-line" :class="{ 'tab-active-line' : tabOption.index === 5 }" :style="{ width: `calc(100% / 5)` }"></view>
			</view>
		</view>
	</view>
	
	<view v-if="orderList.length <= 0">
		<NoData></NoData>
	</view>
	<view v-else class="order-list">
		<view v-for="(item, index) in orderList" class="order-item re-margin-bottom-30" :key="index">
			<view class="re-flex-row-between">
				<view class="item-text">单号：{{item.artOrder.orderNumber}}<text v-if="item.artOrder.orderNumber" class="text-link" @click="copyUser(item.artOrder.orderNumber)">复制</text></view>
				<view class="item-status">
					<text v-if="item.artOrder.status==='2'" class="text-high">待付款</text>
					<text v-if="item.artOrder.status==='4'" class="text-high">上架申请中</text>
					<text v-if="item.artOrder.status==='5'" class="text-high">上架确认</text>
					<text v-if="item.artOrder.status==='6'" class="text-high">上架中</text>
					<text v-if="item.artOrder.status==='7'" class="text-high">已关闭</text>
					<text v-if="item.artOrder.status==='8'" class="btn-text-mini text-link" @click="openModalPutShop(item.artOrder.id, item.artShop.secondSalePrice, item.artShop.secondFee)">上架</text>
					<text v-if="item.artOrder.status==='9'" class="text-high">已售出</text>
					<text v-if="item.artOrder.status==='10'" class="text-high">已付款</text>
				</view>
			</view>
			<view class="order-line"></view>
			<view class="re-flex">
				<view class="item-text">
					<!-- <cover-image v-if="imgPath" :src="imgPath.DemoBg" class="order-img"></cover-image> -->
					<cover-image v-if="item.artShop.imgUrlList" :src="item.artShop.imgUrlList[0] || imgPath.DemoBg" class="order-img"></cover-image>
				</view>
				<view>
					<view class="">{{item.artShop.name}}-{{item.artShop.code}}</view>
					<view class="">
						<text class="text-primary">卖家：</text>
						{{item.artSaleUser.uname}} [{{item.artSaleBank.bankCardTel}}]
						<text v-if="item.artSaleBank.bankCardTel" class="text-link" @click="copyUser(item.artSaleBank.bankCardTel)">复制</text>
					</view>
					<view class=""><text class="text-high">买家：</text>{{item.artBuyBuser.uname}} [{{item.artBuyBank.bankCardTel}}]</view>
				</view>
			</view>
			<view class="order-line"></view>
			<view class="re-flex-row-between">
				<view class="item-text">
					收款人：{{item.artSaleBank.bankCardName}}
					<text v-if="item.artSaleBank.bankCardName" class="text-link" @click="copyBankUser(item.artSaleBank.bankCardName)">复制</text>
				</view>
				<text class="btn-text-mini text-link" v-if="item.artOrder.status==='2'" @click="openModalOrderPay(item.artOrder.id)">确认付款</text>
			</view>
			<view class="re-flex-row-between">
				<view class="item-text">收款银行：{{item.artSaleBank.bankName}}</view>
			</view>
			<view class="re-flex-row-between">
				<view class="item-text">
					收款银行卡号：{{item.artSaleBank.bankCode}}
					<text v-if="item.artSaleBank.bankCode" class="text-link" @click="copyBankCode(item.artSaleBank.bankCode)">复制</text>
				</view>
			</view>
			<view class="order-line"></view>
			<view class="re-flex-row-between">
				<view class="item-text">下单时间：{{item.artOrder.createDate}}</view>
				<view class="item-status">运费：<text class="text-high">{{item.artOrder.expressFee}}</text></view>
			</view>
			<view class="order-line"></view>
			<view class="re-flex-row-between">
				<view class="item-text">变更时间：{{item.artOrder.updateDate}}</view>
				<view class="item-status">实付：<text class="text-high">{{item.artOrder.sumPrice}}</text></view>
			</view>
			<view class="order-line" v-if="item.artOrder.status==='3'"></view>
			<view class="re-flex-row-between" v-if="item.artOrder.status==='3'">
				<view class="item-text"></view>
				<view class="item-status">
					<text class="btn-text-mini text-link" @click="openModalConfirmAmount(item.artOrder.id)">确认收款</text>
				</view>
			</view>
		</view>
	</view>
	<uni-popup ref="modalConfirmAmount" type="center" :is-mask-click="false">
		<view class="re-padding-20 bg-color-white re-flex-column-center modal-body">
			<view class="re-margin-bottom-20">确认已收到货款</view>
			<view class="re-flex-row-between modal-btn-box">
				<button type="warn" size="mini" @click="closeModalConfirmAmount">取消</button>
				<button type="primary" size="mini" @click="editOrderAmount">确认</button>
			</view>
		</view>
	</uni-popup>
	<uni-popup ref="modalPutShop" type="center" :is-mask-click="false">
		<view class="re-padding-20 bg-color-white re-flex-column-center modal-body">
			<view class="re-margin-bottom-20">确认是否上架商品</view>
			<view class="form-box">
				<view class="form-item">
					<view class="form-label">商品价格：</view>
					<view class="">{{formTemp.shopPrice}}</view>
				</view>
				<view class="form-item">
					<view class="form-label">手续费：</view>
					<view class="">{{formTemp.shopFee}}</view>
				</view>
			</view>
			<view class="re-flex-row-between modal-btn-box">
				<button type="warn" size="mini" @click="closeModalPutShop">取消</button>
				<button type="primary" size="mini" @click="addOrderShop">确认</button>
			</view>
		</view>
	</uni-popup>
	<uni-popup ref="modalOrderPay" type="center" :is-mask-click="false">
		<view class="re-padding-20 bg-color-white re-flex-column-center modal-body">
			<view class="re-margin-bottom-20">您确定已经给卖家付款了吗？</view>
			<view class="re-flex-row-between modal-btn-box">
				<button type="warn" size="mini" @click="closeModalOrderPay">取消</button>
				<button type="primary" size="mini" @click="editOrderPay">确认</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
	import defaultConfig from "@/common/config/index.js";
	import NoData from "@/components/re-no-data/NoData.vue";
	import { orderSelectList, orderSelectAmount, orderCreateShop, orderUpdateAmount, orderUpdatePay } from "@/common/api/order.js";
	
	export default {
		components: {
			NoData
		},
		data() {
			return {
				imgPath: defaultConfig.imgPath,
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
				orderList: [],
				searchOption: {
					status: ""
				},
				tabOption: {
					index: 1
				},
				formTemp: {
					orderId: 0,
					shopPrice: 0,
					shopFee: 0,
				}
			};
		},
		onShow() {
			this.tabOption.index = 1;
			uni.startPullDownRefresh();
			this.init();
		},
		onPullDownRefresh() {
            this.pageOption.page = 1;
			if (this.tabOption.index === 3) {
				this.getOrderAmount();
			} else {
				this.init();
			}
		},
		onReachBottom(e) {
			this.getMoreList();
		},
		methods: {
			init() {
				if (this.tabOption.index === 3) {
					this.getOrderAmount();
				} else {
					this.getOrderList();
				}
			},
			getOrderList() {
				let _this = this;
				orderSelectList({ status: this.searchOption.status }).then((res) => {
					_this.orderList = res.data;
				});
			},
			tabChange(index) {
				this.tabOption.index = index;
				switch(index) {
					case 1: ; this.searchOption.status = ""; break;
					case 2: ; this.searchOption.status = "2"; break;
					case 3: ; this.searchOption.status = "3"; break;
					case 4: ; this.searchOption.status = "8"; break;
					case 5: ; this.searchOption.status = "9"; break;
					default: this.searchOption.status = ""; break;
				}
				if (index === 3) {
					this.getOrderAmount();
				} else {
					this.init();
				}
			},
			getOrderAmount() {
				let _this = this;
				this.orderList = [];
				orderSelectAmount({}).then((res) => {
					_this.orderList = res.data;
				});
			},
			editOrderAmount() {
				let _this = this;
				orderUpdateAmount({id: this.formTemp.orderId}).then(() => {
					_this.getOrderAmount();
					_this.closeModalConfirmAmount();
				});
			},
			addOrderShop() {
				let _this = this;
				orderCreateShop({id: this.formTemp.orderId}).then(() => {
					_this.init();
					_this.closeModalPutShop();
				});
			},
			editOrderPay() {
				let _this = this;
				orderUpdatePay({id: this.formTemp.orderId}).then(() => {
					_this.init();
					_this.closeModalOrderPay();
				});
			},
            getMoreList() {
                this.pageOption.page++;
                this.loadMoreOption.status = "loading";
				this.init();
            },
			openModalConfirmAmount(orderId) {
				this.formTemp.orderId = orderId;
				this.$refs.modalConfirmAmount.open();
			},
			closeModalConfirmAmount() {
				this.$refs.modalConfirmAmount.close();
			},
			openModalPutShop(orderId, price, fee) {
				this.formTemp.orderId = orderId;
				this.formTemp.shopPrice = price;
				this.formTemp.shopFee = fee;
				this.$refs.modalPutShop.open();
			},
			closeModalPutShop() {
				this.$refs.modalPutShop.close();
			},
			openModalOrderPay(orderId) {
				this.formTemp.orderId = orderId;
				this.$refs.modalOrderPay.open();
			},
			closeModalOrderPay() {
				this.$refs.modalOrderPay.close();
			},
			copyUser(value) {
				uni.setClipboardData({
					data: value,//要被复制的内容
					success:()=>{//复制成功的回调函数
						uni.showToast({//提示
							title:'复制成功'
						});
					}
				});
			},
			copyBankUser(value) {
				uni.setClipboardData({
					data: value,//要被复制的内容
					success:()=>{//复制成功的回调函数
						uni.showToast({//提示
							title:'复制成功'
						});
					}
				});
			},
			copyBankCode(value) {
				uni.setClipboardData({
					data: value,//要被复制的内容
					success:()=>{//复制成功的回调函数
						uni.showToast({//提示
							title:'复制成功'
						});
					}
				});
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
	.order-list {
		min-height: calc(100vh - 140rpx);
		font-size: 30rpx;
		background-color: #EEE;
		padding: 30rpx 0;
		.order-item {
			background-color: #FFF;
			border-top: 1rpx solid #999;
			border-bottom: 1rpx solid #999;
			padding: 20rpx 20rpx;
		}
		.order-img {
			width: 200rpx;
			height: 140rpx;
			margin-right: 20rpx;
		}
		.order-line {
			width: 100%;
			height: 1rpx;
			background-color: #CCC;
			margin: 15rpx 0;
		}
		.text-primary {
			color: #03c03c;
		}
		.text-high {
			color: #FF0000;
		}
	}
</style>
