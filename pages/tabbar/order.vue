<template>
    <view v-if="!orderList || orderList.length === 0" class="re-flex-row-center">
        <NoData></NoData>
    </view>
    <view v-else>
        <uni-card v-for="(item, index) in orderList" :key="index" @click="toDetail(item.proNo, item.orderNo)" class="home-expert">
            <view class="re-flex-row-center-start">
                <view><cover-image class="avatar-circle" v-if="imgPath" :src="item.avatar || imgPath.UserAvatar"></cover-image></view>
                <view class="expert-info">
                    <view class="expert-name"><text class="expert-title title-sub-h1">专家：</text><text>{{item.profileName}}</text></view>
                    <view class="expert-desc"><text class="expert-title title-sub-h1">价格：</text><text>{{item.price}}元</text></view>
                </view>
            </view>
            <view class="expert-desc"><text class="expert-title title-sub-h1">问题：</text><text>{{item.title}}</text></view>
        </uni-card>
        <uni-load-more :status="loadMoreOption.status" :contentText="loadMoreOption.contentText" @clickLoadMore="getMoreList"></uni-load-more>
    </view>
</template>

<script>
    import NoData from "@/components/no-data/NoData.vue";
	import utils from "@/common/plugins/utils.js";
	import defaultConfig from "@/common/config/index.js";
	import { orderList } from "@/common/api/order.js";
	
    export default {
        components: {
            NoData
        },
        data() {
            return {
                imgPath: defaultConfig.imgPath,
                orderList: [],
                pageOption: {
                    page: 1,
                    pageSize: 10,
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
		onShow() {
			this.orderList = [];
			this.getOrderList();
		},
        onReachBottom(e) {
            this.getMoreList();
        },
		methods: {
            getOrderList() {
				if (!uni.getStorageSync(defaultConfig.tokenKey)) utils.href(defaultConfig.routePath.loginPermission, false);
                orderList({ pageNum: this.pageOption.page, pageSize: this.pageOption.pageSize, fuserNo: uni.getStorageSync(defaultConfig.tokenKey) }).then((res) => {
					if (this.orderList.length > 0 &&  this.orderList.length < res.data.total) {
						this.orderList = this.orderList.concat(res.data.rows);
					} else if (this.orderList.length === 0) {
						this.orderList = res.data.rows;
					} else {
						this.loadMoreOption.status = "no-more";
					}
				});
            },
            getMoreList() {
                this.pageOption.page++;
                this.loadMoreOption.status = "loading";
				this.getExpertList();
            },
			toDetail(expertId, orderId) {
				utils.href(defaultConfig.routePath.orderDetail + `?expertId=${expertId}&orderId=${orderId}`, true);
			}
		}
    }
</script>

<style lang="scss">
.home-expert {
    .expert-title {
        color: #000000;
        font-weight: bold;
    }
    .expert-info {
        padding-left: 20rpx;
    }
}
</style>
