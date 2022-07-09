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
    <view class="body-padding">热门</view>
    <view v-if="!expertList || expertList.length === 0" class="re-flex-row-center">
        <NoData></NoData>
    </view>
    <scroll-view v-else :scroll-y="true" :style="{height: loadMoreOption.scrollHeight}" @scrolltolower="getMoreSubjectList">
        <uni-card v-for="(item, index) in expertList" :key="index">
            <view class="re-flex-row-center-start home-expert">
                <view><cover-image class="avatar-circle" v-if="imgPath" :src="item.avatar || imgPath.UserAvatar"></cover-image></view>
                <view class="expert-info">
                    <view class="expert-name"><text class="expert-title">专家：</text><text>{{item.name}}</text></view>
                    <view class="expert-desc"><text class="expert-title">简介：</text><text>{{item.desc}}</text></view>
                </view>
            </view>
        </uni-card>
        <uni-load-more :status="loadMoreOption.status" :contentText="loadMoreOption.contentText" @clickLoadMore="getMoreSubjectList"></uni-load-more>
    </scroll-view>
</template>

<script>
    import NoData from "@/components/re-no-data/NoData.vue";
	import utils from "@/common/plugins/utils.js";
	import defaultConfig from "@/common/config/index.js";
	import { subjectList } from "@/common/api/expert.js";
	
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
                    scrollHeight: "0",
                    status: "more",
                    contentText: {
                        contentdown: "上拉加载更多",
                        contentrefresh: "正在加载...",
                        contentnomore: "没有数据了",
                    }
                },
            };
        },
		created() {
			this.initScrollHeight();
			// this.getSubjectList();
			this.getExpertList();
		},
        onReachBottom(e) {
            console.log(e);
        },
		methods: {
            initScrollHeight() {
                let _this = this;
                uni.getSystemInfo({
                    success: function(res) {
                        _this.loadMoreOption.scrollHeight = res.windowHeight + "px";
                    }
                });
            },
			getSubjectList() {
                this.loadMoreOption.status = "more";
				subjectList().then((res) => {
					this.subjectList = res.data;
				});
			},
            getExpertList() {
                let tempArr = [];
                for (let i = 0; i < 10; i++) {
                    tempArr.push({
                        avatar: "",
                        name: "1" + i,
                        desc: "i`m" + i,
                    });
                }
                this.expertList = tempArr;
            },
			toExpert(e) {
				utils.href(defaultConfig.routePath.orderExpert + `?id=${this.subjectList[e.detail.index].value}`, true);
			},
            getMoreSubjectList() {
                this.pageOption.page++;
                this.loadMoreOption.status = "loading";
                console.log("1");
                setTimeout(() => {
                    let tempArr = [];
                    for (let i = 0; i < 10; i++) {
                        tempArr.push({
                            avatar: "",
                            name: "1" + i,
                            desc: "i`m" + i,
                        });
                    }
                    
                    this.expertList = this.expertList.concat(tempArr);
                    this.loadMoreOption.status = "no-more";
                }, 3000);
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
