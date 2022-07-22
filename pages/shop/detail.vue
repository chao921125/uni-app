<template>
	<view class="body-contains">
		<view class="form-box">
			<view class="form-item">
				<view class="form-label">名称：</view>
				<view>{{shopDetail.name}}-{{shopDetail.code}}</view>
			</view>
			<view class="form-item">
				<view class="form-label">价格：</view>
				<view class="text-error">￥{{shopDetail.price}}</view>
			</view>
			<view class="form-item">
				<view class="form-label">作者：</view>
				<view>{{shopDetail.auth}}</view>
			</view>
			<view class="form-item">
				<view class="form-label">所属画室：</view>
				<view>{{shopDetail.deptName}}</view>
			</view>
			<view class="form-item">
				<view class="form-label">描述：</view>
				<view class="shop-desc">{{shopDetail.descr}}</view>
			</view>
			<view class="form-item">
				<view class="form-label">上架时间：</view>
				<view>{{shopDetail.upDate}}</view>
			</view>
			<view class="form-item">
				<view class="form-label">所属人：</view>
				<view>{{shopDetail.uName}}</view>
			</view>
			<view class="form-item">
				<view class="form-label">材质：</view>
				<view>{{shopDetail.cz}}</view>
			</view>
			<view class="form-item">
				<view class="form-label">容量：</view>
				<view>{{shopDetail.rl}}</view>
			</view>
			<view class="form-item">
				<view class="form-label">工艺：</view>
				<view>{{shopDetail.gy}}</view>
			</view>
			<view class="form-item">
				<view class="form-label">商品图片：</view>
			</view>
		</view>
	</view>
	<view v-if="shopDetail.imgUrlList">
		<cover-image class="shop-imgs re-margin-bottom-20" v-for="(item, index) in shopDetail.imgUrlList" :key="index" :src="item"></cover-image>
	</view>
	<BtnBottom defaultConfirm="下单" @confirm="orderBuyConfirm" :disabled="shopDetail.status === 2"></BtnBottom>
	<uni-popup ref="popup" type="center" :is-mask-click="false">
		<view class="re-padding-20 bg-color-white re-flex-column-center modal-body">
			<view class="re-margin-bottom-20">确认是否购买该商品</view>
			<view class="re-flex-row-between modal-btn-box">
				<button type="warn" size="mini" @click="closeModal">取消</button>
				<button type="primary" size="mini" @click="orderBuy">确认</button>
			</view>
		</view>
	</uni-popup>
	<ModalInfo ref="modalUser"></ModalInfo>
</template>

<script>
	import BtnBottom from "@/pages/components/re-button/BtnBottom.vue";
	import ModalInfo from "@/pages/components/re-modal/ModalInfo.vue";
	import defaultConfig from "@/common/config/index.js";
	import utils from "@/common/plugins/uniUtils.js";
	import { selectUserInfo } from "@/common/api/user.js";
	import { orderCreate } from "@/common/api/order.js";
	
	export default {
		components: {
			BtnBottom,
			ModalInfo,
		},
		data() {
			return {
				imgPath: defaultConfig.imgPath,
				userInfo: {},
				shopDetail: {},
			};
		},
		onLoad(options) {
			console.log(options);
			this.shopDetail = uni.getStorageSync("shopInfo");
			this.init();
		},
		onHide() {
			uni.removeStorageSync("shopInfo");
		},
		methods: {
			init() {
				selectUserInfo({}).then((res) => {
					this.userInfo = res.data;
				});
			},
			orderBuyConfirm() {
				if (this.userInfo.artBankcard.id && this.userInfo.userAddress.id) {
					this.openModal();
				} else {
					this.$refs.modalUser.openModal();
				}
			},
			openModal() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.open();
			},
			closeModal() {
				// 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
				this.$refs.popup.close();
			},
			orderBuy() {
				orderCreate({ requestNo: new Date().getTime().toString(), shopId: this.shopDetail.id }).then((res) => {
					if (!res.code) this.toShopList();
				});
			},
			toShopList() {
				utils.gotoTab(defaultConfig.routePath.tabbarOrder, true);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.form-label {
		width: 180rpx;
		text-align: right;
	}
	.shop-desc {
		width: calc(100% - 200rpx);
	}
</style>
