<template>
    <view><cover-image class="logo-bg" v-if="imgPath" :src="imgPath.DemoLogo"></cover-image></view>
	<view class="re-flex-row-between re-margin-top-50">
		<view class="re-flex-row-center text-click">
			<view class="re-flex-row-center re-padding-20 text-circle text-line-height btn-left" @click="toShop">
				<uni-icons type="shop" size="20"></uni-icons>
				<text class="re-margin-left-15">山川</text>
			</view>
		</view>
		<view class="re-flex-row-center text-click">
			<view class="re-flex-row-center re-padding-20 text-circle text-line-height btn-right" @click="toBooking">
				<uni-icons type="calendar" size="20"></uni-icons>
				<text class="re-margin-left-15">云海</text>
			</view>
		</view>
	</view>
	<view class="re-margin-top-50">
		<uni-grid :showBorder="false" @change="toPlayerDetail">
			<uni-grid-item v-for="(item, index) in userAll" :index="index" :key="index">
				<view class="re-flex-column-center">
					<view class="re-flex-row-center">
						<cover-image class="avatar-circle" v-if="item.imgOne" :src="item.imgOne"></cover-image>
						<cover-image class="avatar-circle" v-else :src="imgPath.UserAvatar"></cover-image>
					</view>
					<view class="re-flex-row-center">{{item.name}}</view>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
    <view><cover-image class="logo-bg" v-if="imgPath" :src="imgPath.DemoBg"></cover-image></view>
</template>

<script>
	import defaultConfig from "@/common/config/index.js";
	import utils from "@/common/plugins/uniUtils.js";
	import requestConfig from "@/common/config/request.js";
	
    export default {
		data() {
			return {
				imgPath: defaultConfig.imgPath,
				userAll: [],
				requestUrl: window.location.origin,
			}
		},
		onShow() {
			utils.checkPermiss();
			this.getPlayer();
			// this.userAll = [
			// 	{
			// 		name: "吕尧臣",
			// 		detail: "吕尧臣，男，汉族，宜兴人，生于1941年，中国工艺美术大师。随紫砂名家吴云根学艺。四十余年的陶艺生涯，新品层出，风格韵秀而古朴。尤独创之“吕氏绞泥”出神入化，堪称一绝，海外有“壶艺魔术师”之称，作品与“黄金争价”，屡为“故宫博物院”、国务院、“紫光阁”等单位收藏。",
			// 		avatar: `${this.requestUrl}/profile/upload/2022/07/18/3b3ca832-d710-4154-9835-565c8fb6939b.png`,
			// 		images: [`${this.requestUrl}/profile/upload/2022/07/18/066adfb6-c5b6-4336-9951-713fb08f39a7.png`],
			// 	},
			// 	{
			// 		name: "葛军",
			// 		detail: "葛军，中国工艺美术大师，中国陶瓷设计艺术大师，中国工美行业艺术大师 ，四个“国大师”称号的杰出陶艺人才。中国陶瓷文化研究所紫砂文化研究中心主任 ，联合国教科文组织认定国际著名陶瓷文化艺术大师，宜兴市陶人葛紫砂陶艺研究所所长。多件作品被国家体育总局等单位定为国际交往礼品，被故宫博物院、中国人民革命军事博物馆、中国美术馆、中国文化部、中南海紫光阁等单位及诸多名人政要收藏。其先后到亚、美、澳、欧四大洲的30多个国家和地区访问、交流、讲学，被20多个国际知名学府聘为客座教授。",
			// 		avatar: `${this.requestUrl}/profile/upload/2022/07/18/9b04a5f1-e67d-4ee6-80d0-943df931c40e.png`,
			// 		images: [`${this.requestUrl}/profile/upload/2022/07/18/b80c2fb5-ccaa-4bf1-8c67-83412d597c7d.png`],
			// 	},
			// 	{
			// 		name: "毛国强",
			// 		detail: "毛国强，男，艺名一粟，1945年生于江苏宜兴，中国工艺美术大师 ，江苏省工艺美术大师、研究员级高级工艺美术师，中国陶瓷艺术大师。中国手指画研究会终身理事、中国工艺美术学会会员、中国民间艺术家协会会员。哈尔滨师范大学客座教授。作品被美国洛杉矶艺术馆、亚泰博物馆、中南海紫光阁、天津博物馆、故宫博物院收藏和展示。先后和书画艺术大师陆俨少、程十发、唐云、韩美林、范曾先生交流紫砂作品，受到他们的赞誉。",
			// 		avatar: `${this.requestUrl}/profile/upload/2022/07/18/5d2ef25d-c49c-45ee-aa40-b9ed7cd8cb16.png`,
			// 		images: [`${this.requestUrl}/profile/upload/2022/07/18/54342c84-08c7-4548-bf2c-b39203470596.png`],
			// 	}
			// ];
		},
		onPullDownRefresh() {
			uni.stopPullDownRefresh();
		},
		methods: {
			getPlayer() {
				this.userAll = [];
				selectPlayer({}).then((res) => {
					this.userAll = res.data;
				});
			},
			toShop() {
				utils.gotoUrl(defaultConfig.routePath.shopList, false);
			},
			toBooking() {
				utils.gotoUrl(defaultConfig.routePath.booking, false);
			},
			toPlayerDetail(e) {
				uni.setStorageSync("player_info", this.userAll[e.detail.index]);
				utils.gotoUrl(defaultConfig.routePath.player, false);
			}
		},
    }
</script>

<style lang="scss" scoped>
	.logo-bg {
		height: 400rpx;
	}
	.text-click {
		width: 50%;
		.text-circle {
			text-align: center;
			display: block;
			width: 210rpx;
			height: 60rpx;
			border: 1px solid #000;
			border-radius: 20rpx;
		}
		.text-line-height {
			line-height: 60rpx;
		}
		.btn-left {
			background-color: beige;
		}
		.btn-right {
			background-color: blanchedalmond;
		}
	}
</style>
