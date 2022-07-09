<template>
	<view v-if="!expertList || expertList.length === 0" class="re-flex-row-center">
	    <NoData text="该领域下暂无专家"></NoData>
	</view>
	<view v-else>
	    <uni-card v-for="(item, index) in expertList" :key="index" @click="toOrderPay(item.proficNo)">
	        <view class="re-flex-row home-expert">
	            <view><cover-image class="avatar-circle" v-if="imgPath" :src="item.avatar || imgPath.UserAvatar"></cover-image></view>
	            <view class="expert-info">
					<view class="expert-name re-flex-row-between">
						<view><text class="title-sub-h1 expert-title">专家：</text><text>{{item.proficName}}</text></view>
						<view><text class="title-sub-h1 expert-title">价格：</text><text>{{item.price}}元</text></view>
					</view>
	                <view class="expert-desc"><text class="title-sub-h1 expert-title">简介：</text><text>{{item.desc}}</text></view>
	            </view>
	        </view>
	    </uni-card>
	    <uni-load-more v-if="loadMoreOption.isShow" :status="loadMoreOption.status" :contentText="loadMoreOption.contentText" @clickLoadMore="getMoreList"></uni-load-more>
	</view>
</template>

<script>
    import NoData from "@/components/re-no-data/NoData.vue";
	import { onLoad, onShow, } from "@dcloudio/uni-app";
	import utils from "@/common/plugins/utils.js";
	import defaultConfig from "@/common/config/index.js";
	// import { expertList } from "@/common/api/expert.js";
	import { defineProps, defineEmits, ref } from "vue";
	
	export default {
        components: {
            NoData
        },
		data() {
			return {
                imgPath: defaultConfig.imgPath,
                expertList: [],
                pageOption: {
                    page: 1,
                    pageSize: 10,
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
            };
		},
		setup() {
			const id = ref("");
			onLoad((option) => {
				id.value = option.id;
			});
			return { id };
		},
		onLoad() {
			this.getExpertList();
		},
        onReachBottom(e) {
            this.getMoreList();
        },
		methods: {
            getExpertList() {
    //             expertList({ pageNum: this.pageOption.page, pageSize: this.pageOption.pageSize, field: this.id }).then((res) => {
				// 	this.loadMoreOption.isShow = this.expertList.length >= 10;
				// 	if (this.expertList.length > 0 &&  this.expertList.length < res.data.total) {
				// 		this.expertList = this.expertList.concat(res.data.rows);
				// 	} else if (this.expertList.length === 0) {
				// 		this.expertList = res.data.rows;
				// 	} else {
				// 		this.loadMoreOption.status = "no-more";
				// 	}
				// });
            },
            getMoreList() {
                this.pageOption.page++;
                this.loadMoreOption.status = "loading";
				this.getExpertList();
            },
			toOrderPay(id) {
				utils.href(defaultConfig.routePath.orderPay + `?id=${id}`, true);
			}
		}
	}
</script>

<style lang="scss">
.home-expert {
    .expert-info {
        padding-left: 20rpx;
        .expert-title {
            color: #000000;
            font-weight: bold;
        }
    }
}
</style>
