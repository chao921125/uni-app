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
    import NoData from "@/components/no-data/NoData.vue";
	import { onLoad, onShow, } from "@dcloudio/uni-app";
	import utils from "@/common/plugins/uni-methods.js";
	import defaultConfig from "@/common/config/index.js";
	import { expertList } from "@/common/api/expert.js";
	import { defineProps, defineEmits, ref, reactive } from "vue";
	
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
				// setup() {
		  //           const imgPath = reactive(defaultConfig.imgPath);
					
				// 	const formData = ref({
				// 		uname: "",
				// 		upassword: "",
				// 		inviteCode: "",
				// 		tel: "",
				// 		code: "",
				// 		rePassword: "",
				// 	});
				// 	const rules = ref({
				// 			uname: {
				// 				rules: [
				// 					{ required: true, errorMessage: '请输入用户名', },
				// 					{ validateFunction: (rule, value, data, callback) => {
				// 						if (value.length < 2) {
				// 							callback('请至少勾选两个兴趣爱好')
				// 						}
				// 						return true
				// 					}
				// 				}]
				// 			}
				// 		});
				// 	const refForm = ref(null);
					
				// 	function submit() {
				// 		refForm.value.validate().then((res) => {
				// 			console.log('表单数据信息：', res);
				// 		}).catch(err =>{
				// 			console.log('表单错误信息：', err);
				// 		})
				// 	}
				// 	function getCode(value) {
				// 		refForm.value.validate([""]).then((res) => {
				// 			getPhoneCode({tel: formData, codeType: "1"}).then((res) => {
				// 				utils.toast("get code success");
				// 				console.log(res);
				// 			});
				// 		});
				// 	}
				// 	return {
				// 		imgPath,
				// 		imgAvatar,
				// 		refForm,
				// 		formData,
				// 		rules,
				// 		getCode,
				// 		submit
				// 	}
				// },
				// onReady() {
				// 	// 需要在onReady中设置规则
				// 	this.$refs.refForm.setRules(this.rules)
				// },

		setup() {
			const id = ref("");
			const id = reactive({});

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
                expertList({ pageNum: this.pageOption.page, pageSize: this.pageOption.pageSize, field: this.id }).then((res) => {
					this.loadMoreOption.isShow = this.expertList.length >= 10;
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
