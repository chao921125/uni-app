<template>
    <view>
        <view v-if="!subjectList || subjectList.length === 0" class="re-flex-row-center">
            <NoData></NoData>
        </view>
        <uni-grid v-else :column="5" :showBorder="false"  :square="false" @change="toExpert">
			<uni-grid-item v-for="(item, index) in subjectList" :key="index" :index="index">
				<view class="re-flex re-flex-row-center"><icon class="iconfont icon-zhuanjia"></icon></view>
				<view class="re-flex re-flex-row-center">{{item.name}}</view>
			</uni-grid-item>
        </uni-grid>
    </view>
    <view class="body-padding title-h2 re-margin-top-40">热门</view>
    <view v-if="!expertList || expertList.length === 0" class="re-flex-row-center">
        <NoData></NoData>
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
        <uni-load-more :status="loadMoreOption.status" :contentText="loadMoreOption.contentText" @clickLoadMore="getMoreList"></uni-load-more>
    </view>
</template>

<script>
    import NoData from "@/components/no-data/NoData.vue";
	import utils from "@/common/plugins/utils.js";
	import defaultConfig from "@/common/config/index.js";
	import { subjectList, expertList } from "@/common/api/expert.js";
	
    export default {
        components: {
            NoData
        },
        data() {
            return {
                imgPath: defaultConfig.imgPath,
                subjectList: [],
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
		onShow() {
			this.subjectList = [];
			this.expertList = [];
			this.getSubjectList();
			this.getExpertList();
		},
        onReachBottom(e) {
            this.getMoreList();
        },
		methods: {
			getSubjectList() {
                this.loadMoreOption.status = "more";
				subjectList({ value: "" }).then((res) => {
					this.subjectList = res.data;
				});
			},
            getExpertList() {
				expertList({ pageNum: this.pageOption.page, pageSize: this.pageOption.pageSize }).then((res) => {
					if (this.expertList.length > 0 &&  this.expertList.length < res.data.total) {
						this.expertList = this.expertList.concat(res.data.rows);
					} else if (this.expertList.length === 0) {
						this.expertList = res.data.rows;
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
			toExpert(e) {
				utils.href(defaultConfig.routePath.orderExpert + `?id=${this.subjectList[e.detail.index].value}`, false);
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
