<template>
	<view v-if="!expertList || expertList.length === 0" class="re-flex-row-center">
	    <NoData></NoData>
	</view>
	<view v-else>
	    <uni-card v-for="(item, index) in expertList" :key="index" @click="toOrderPay(item.proficNo)">
	        <view class="re-flex-row home-expert">
	            <view><cover-image class="avatar-circle" v-if="imgPath" :src="item.avatar || imgPath.UserAvatar"></cover-image></view>
	            <view class="expert-info">
	                <view class="expert-name"><text class="title-sub-h1 expert-title">专家：</text><text>{{item.name}}</text></view>
	                <view class="expert-desc"><text class="title-sub-h1 expert-title">简介：</text><text>{{item.desc}}</text></view>
	            </view>
	        </view>
	    </uni-card>
	    <uni-load-more :status="loadMoreOption.status" :contentText="loadMoreOption.contentText" @clickLoadMore="getMoreSubjectList"></uni-load-more>
	</view>
</template>

<script>
    import NoData from "@/components/no-data/NoData.vue";
	import { onLoad, onShow, } from "@dcloudio/uni-app";
	import utils from "@/common/plugins/utils.js";
	import defaultConfig from "@/common/config/index.js";
	import { expertList } from "@/common/api/expert.js";
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
            this.getMoreSubjectList();
        },
		methods: {
            getExpertList() {
                expertList({ pageNum: this.pageOption.page, pageSize: this.pageOption.pageSize, field: this.id }).then((res) => {
					if (this.expertList.length > 0 &&  this.expertList.length < res.data.total) {
						this.expertList = this.expertList.concat(res.data.rows);
					} else if (this.expertList.length === 0) {
						this.expertList = res.data.rows;
					} else {
						this.loadMoreOption.status = "no-more";
					}
				});
            },
            getMoreSubjectList() {
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
