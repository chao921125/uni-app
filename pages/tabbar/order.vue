<template>
    <view v-if="!expertList || expertList.length === 0" class="re-flex-row-center">
        <NoData></NoData>
    </view>
    <view v-else>
        <uni-card v-for="(item, index) in expertList" :key="index" @click="toDetail(item.name)" class="home-expert">
            <view class="re-flex-row-center-start">
                <view><cover-image class="avatar-circle" v-if="imgPath" :src="item.avatar || imgPath.UserAvatar"></cover-image></view>
                <view class="expert-info">
                    <view class="expert-name"><text class="expert-title title-sub-h1">专家：</text><text>{{item.name}}</text></view>
                    <view class="expert-desc"><text class="expert-title title-sub-h1">简介：</text><text>{{item.desc}}</text></view>
                </view>
            </view>
            <view class="expert-desc"><text class="expert-title title-sub-h1">问题：</text><text>{{item.desc}}</text></view>
            <view class="expert-desc"><text class="expert-title title-sub-h1">描述：</text><text>{{item.desc}}</text></view>
        </uni-card>
        <uni-load-more :status="loadMoreOption.status" :contentText="loadMoreOption.contentText" @clickLoadMore="getMoreSubjectList"></uni-load-more>
    </view>
</template>

<script>
    import NoData from "@/components/no-data/NoData.vue";
	import utils from "@/common/plugins/utils.js";
	import defaultConfig from "@/common/config/index.js";
	
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
		created() {
			this.getExpertList();
		},
        onReachBottom(e) {
            this.getMoreSubjectList();
        },
		methods: {
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
            getMoreSubjectList() {
                this.pageOption.page++;
                this.loadMoreOption.status = "loading";
                console.log("1");
                setTimeout(() => {
                    if (this.pageOption.page < 3) {
                        let tempArr = [];
                        for (let i = 0; i < 10; i++) {
                            tempArr.push({
                                avatar: "",
                                name: "1" + i,
                                desc: "i`m" + i,
                            });
                        }
                        
                        this.expertList = this.expertList.concat(tempArr);
                    }
                    this.loadMoreOption.status = "no-more";
                }, 3000);
            },
			toDetail(id) {
                console.log(id);
				utils.href(defaultConfig.routePath.orderDetail + `?id=${id}`, true);
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
