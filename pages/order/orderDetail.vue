<template>
	<view class="body-padding">
        <view class="re-margin-top-30">
            <text class="title-sub-h1">问题</text>
            <text class="re-margin-left-20">{{orderObject.title}}</text>
        </view>
        <view class="re-margin-top-30">
            <text class="title-sub-h1">问题描述</text>
            <text class="re-margin-left-20">{{orderObject.text}}</text>
        </view>
	</view>
    <view class="re-margin-top-30 line-default"></view>
    <view v-if="orderContentList.length > 0" class="body-padding">
		<template v-for="(item, index) in orderContentList">
			<view v-if="item.contentType === 'P'" :key="index" class="re-flex-row-start re-margin-top-30">
			    <view class="title-sub-h1">专家</view>
			    <view class="re-margin-left-20">{{ item.content }}</view>
			</view>
			<view  v-if="item.contentType === 'U'" :key="index" class="re-flex-row-end re-margin-top-30">
			    <view class="re-margin-right-20">{{ item.content }}</view>
			    <view class="title-sub-h1">我</view>
			</view>
		</template>
		<uni-load-more :status="loadMoreOption.status" :contentText="loadMoreOption.contentText" @clickLoadMore="getMoreList"></uni-load-more>
    </view>
	<view v-else class="re-flex-row-center">
	    <NoData></NoData>
	</view>
    <MessageInput @click="addContent"></MessageInput>
</template>

<script>
    import NoData from "@/components/no-data/NoData.vue";
    import MessageInput from "../components/order/MessageInput.vue";
	import { ref } from "vue";
	import { onLoad, onShow, } from "@dcloudio/uni-app";
	import utils from "@/common/plugins/utils.js";
	import defaultConfig from "@/common/config/index.js";
	import { orderDetail, orderContentList, orderContentUser } from "@/common/api/order.js";
	import { expertDetail } from "@/common/api/expert.js";
	
	export default {
        components: {
            NoData,
            MessageInput
        },
		data() {
			return {
				timeObject: null,
				timeLoading: false,
				orderObject: {},
				orderContentList: [],
                pageOption: {
                    page: 1,
                    pageSize: 100,
                },
                loadMoreOption: {
                    status: "more",
                    contentText: {
                        contentdown: "上拉加载更多",
                        contentrefresh: "正在加载...",
                        contentnomore: "没有数据了",
                    }
                },
			};
		},
		setup() {
			const expertId = ref("");
			const orderId = ref("");
			onLoad((option) => {
				expertId.value = option.expertId;
				orderId.value = option.orderId;
			});
			return { expertId, orderId };
		},
		onLoad() {
			this.orderContentList = [];
			this.getOrder();
			this.getOrderContentList();
			this.setIntervalContent();
		},
		onHide() {
			clearInterval(this.timeObject);
		},
        onReachBottom(e) {
            this.getMoreList();
        },
		methods: {
			setIntervalContent() {
				this.timeObject = setInterval(() => {
					this.timeLoading = true;
					if (!this.timeLoading) {
						this.orderContentList = [];
						this.getOrderContentList();
					}
				}, 10000)
			},
			getExpertDetail() {
				if (!uni.getStorageSync(defaultConfig.tokenKey)) utils.href(defaultConfig.routePath.loginPermission, false);
				expertDetail({ proficNo: this.id }).then((res) => {
					this.orderObject = res.data;
				});
			},
			getOrder() {
				if (!uni.getStorageSync(defaultConfig.tokenKey)) utils.href(defaultConfig.routePath.loginPermission, false);
				orderDetail({ orderNo: this.orderId, fuserNo: uni.getStorageSync(defaultConfig.tokenKey) }).then((res) => {
					this.orderObject = res.data;
				});
			},
			getOrderContentList() {
				if (!uni.getStorageSync(defaultConfig.tokenKey)) utils.href(defaultConfig.routePath.loginPermission, false);
				orderContentList({ pageNum: this.pageOption.page, pageSize: this.pageOption.pageSize, orderNo: this.orderId, fuserNo: uni.getStorageSync(defaultConfig.tokenKey) }).then((res) => {
					this.timeLoading = false;
					if (this.orderContentList.length > 0 &&  this.orderContentList.length < res.data.total) {
						this.orderContentList = this.orderContentList.concat(res.data.rows);
					} else if (this.orderContentList.length === 0) {
						this.orderContentList = res.data.rows;
					} else {
						this.loadMoreOption.status = "no-more";
					}
				});
			},
            getMoreList() {
                this.pageOption.page++;
                this.loadMoreOption.status = "loading";
				this.getOrderContentList();
            },
			addContent(val) {
				if (!val) return false;
				this.orderContentList = [];
				orderContentUser({ orderNo: this.orderId, fuserNo: uni.getStorageSync(defaultConfig.tokenKey), content: val }).then((res) => {
					this.getOrderContentList();
				});
			}
		}
	}
</script>

<style lang="scss">

</style>
