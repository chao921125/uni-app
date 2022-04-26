<template>
	<view v-if="!expertList || expertList.length === 0" class="re-flex-row-center">
	    <NoData></NoData>
	</view>
	<view v-else>
	    <uni-card v-for="(item, index) in expertList" :key="index" @click="toDetail(item.name)">
	        <view class="re-flex-row-center-start home-expert">
	            <view><cover-image class="avatar-circle" v-if="imgPath" :src="item.avatar || imgPath.UserAvatar"></cover-image></view>
	            <view class="expert-info">
	                <view class="expert-name"><text class="expert-title">专家：</text><text>{{item.name}}</text></view>
	                <view class="expert-desc"><text class="expert-title">简介：</text><text>{{item.desc}}</text></view>
	            </view>
	        </view>
	    </uni-card>
	    <uni-load-more :status="loadMoreOption.status" :contentText="loadMoreOption.contentText" @clickLoadMore="getMoreSubjectList"></uni-load-more>
	</view>
</template>

<script>
    import NoData from "@/components/no-data/NoData.vue";
	import { onLoad, onShow, } from "@dcloudio/uni-app";
	import utils from "@/common/plugins/common.utils.js";
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
		setup() {
			// const props = defineProps({ id: { type: String }, });
			// onLoad 接受 A 页面传递的参数
			onLoad((option) => {
			  console.log("B 页面 onLoad:", option); //B 页面 onLoad: {id: '1', name: 'uniapp'}
			});
			onShow(() => {
			  console.log("B 页面 onShow");
			});
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
			toOrderPay(type) {
				utils.href(defaultConfig.routePath.orderPay + `?id=${type}`, false);
			}
		}
	}
</script>

<style lang="scss">

</style>
