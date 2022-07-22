<template>
	<view v-if="isStart" class="shop-box">
		<uni-grid v-if="shopList && shopList.length > 0" :showBorder="false" :column="2" @change="toPlayerDetail">
			<uni-grid-item v-for="(item, index) in shopList" :index="index" :key="index" style="padding-bottom: 30rpx;">
				<view class="re-flex-column-center shop-item">
					<view class="re-flex-row-center shop-img-body">
						<cover-image class="shop-img" v-if="item.imgUrlList" :src="item.imgUrlList[0] || imgPath.DemoBg"></cover-image>
						<view v-if="item.status === 2" class="re-flex-row-center shop-img-tips">已售罄</view>
					</view>
					<view class="shop-name">{{item.name}}-{{item.code}}</view>
					<view class="shop-person">产品所属 {{item.name}}</view>
					<view class="shop-price">￥{{item.price}}</view>
				</view>
			</uni-grid-item>
		</uni-grid>
		<view v-else>
			<NoData :text="暂无艺术品"></NoData>
		</view>
	</view>
	<view v-else class="shop-end re-flex-row-center">
		<text class="tips-text">未在营业时间</text>
	</view>
</template>

<script>
	import NoData from "@/components/re-no-data/NoData.vue";
	import defaultConfig from "@/common/config/index.js";
	import utils from "@/common/plugins/uniUtils.js";
	import { selectShopList } from "@/common/api/shop.js";
	
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
				isStart: true,
				shopList: []
			};
		},
		onShow() {
			this.shopList = [];
			this.init();
		},
		onPullDownRefresh() {
			this.shopList = [];
            this.pageOption.page = 1;
			this.init();
		},
        onReachBottom(e) {
			this.getMoreList();
        },
		methods: {
			init() {
				selectShopList({currentPage: this.pageOption.page, pageSize: this.pageOption.pageSize}).then((res) => {
					this.loadMoreOption.isShow = this.shopList.length >= this.pageOption.pageSize;
					if (res.code === 2222) {
						this.isStart = false;
					} else if (this.shopList.length > 0 && res.data && res.data.length > 0) {
						this.shopList = this.shopList.concat(res.data);
					} else if (this.shopList.length === 0) {
						this.shopList = res.data;
					} else {
						this.loadMoreOption.status = "no-more";
					}
				});
			},
            getMoreList() {
                this.pageOption.page++;
                this.loadMoreOption.status = "loading";
				this.init();
            },
			toPlayerDetail(e) {
				uni.setStorageSync("shopInfo", this.shopList[e.detail.index]);
				utils.gotoUrl(defaultConfig.routePath.shopDetail + `?id=${this.shopList[e.detail.index].id}`, true);
			}
		}
	}
</script>

<style lang="scss">
	.shop-end {
		height: 100vh;
		.tips-text {
			color: #FF0000;
		}
	}
	.shop-box {
		padding: 30rpx 20rpx;
		.shop-item {
			padding: 0 20rpx;
		}
		.shop-img-body {
			position: relative;
			z-index: 1;
			.shop-img {
				width: 100%;
				height: 260rpx;
			}
			.shop-img-tips {
				width: 100%;
				height: 260rpx;
				position: absolute;
				z-index: 2;
				background-color: #CCC;
				color: #000;
				font-weight: bold;
				opacity: 0.8;
			}
		}
		.shop-name {
			width: 100%;
			color: #000;
			font-size: 30rpx;
			line-height: 36rpx;
		}
		.shop-person {
			width: 100%;
			color: #CCC;
			font-size: 26rpx;
			line-height: 36rpx;
		}
		.shop-price {
			width: 100%;
			color: #FF0000;
			font-size: 26rpx;
			line-height: 36rpx;
		}
	}
</style>
