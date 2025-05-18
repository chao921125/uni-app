<script setup>
	import { onMounted, ref } from "vue";
	import webSiteArray from "@/plugins/api/data.json";

	const isLoading = ref(true);

	const isShowDialog = ref(false);
	const openDialog = () => {
		isShowDialog.value = true;
	};
	const closeDialog = () => {
		isShowDialog.value = false;
	};
	const webSiteActive = ref(0);
	const changeWebSite = (e) => {
		webSiteActive.value = e.detail;
		closeDialog();
	};

	const copyData = (url) => {
		uni.setClipboardData({
			data: url,
			success: () => {
				uni.showToast({
					title: "已复制",
				});
			},
		});
	};

	onMounted(() => {
		setTimeout(() => {
			isLoading.value = false;
		}, 1500);
	});
	// https://wenshu.court.gov.cn/website/wenshu/181107ANFZ0BXSK4/index.html?docId=rxLVW1QZMc15xc1anR6VQ6RpwTP57ez7JsVdXFe4QErIgJT4deCP4p/dgBYosE2gXlwaJez63rKkpQ0i3SSnRtavYjmV3fpKzjgAYaM/n+FQHg8NDVboBJv/Z/lfIkZJ
	// https://wenshu.court.gov.cn/website/wenshu/181107ANFZ0BXSK4/index.html?docId=HSIbTIHYRKI5LHHYsLc85Z2AC+jPMl0IiQDcJnRMWWdvjtuLyU1gfZ/dgBYosE2gXlwaJez63rKkpQ0i3SSnRtavYjmV3fpKzjgAYaM/n+FQHg8NDVboBBLmnDWLKvik
</script>

<template>
	<view class="container">
		<van-row gutter="20">
			<van-col span="24">
				<van-notice-bar
					left-icon="volume-o"
					text="文章持续更新中，内容最后更新时间：2023-11-03 21:12:21" />
			</van-col>
			<van-col span="24">
				<view class="re-pb-20 re-mt-20 re-flex-row-between">
					<text class="">当前分类：{{ webSiteArray.websiteType[webSiteActive].label }}</text>
					<van-button @tap="openDialog"
						><van-icon
							name="wap-nav"
							size="30"
					/></van-button>
				</view>
				<view class="re-mt-20 website-tips">点击名称即可完成复制,在手机浏览器打开即可</view>
			</van-col>
			<van-col span="24">
				<van-skeleton
					row="3"
					:border="false"
					clickable
					:loading="isLoading">
					<van-grid column-num="2">
						<van-grid-item
							use-slot
							v-for="(item, index) in webSiteArray.websiteType[webSiteActive].children"
							:key="index">
							<view class="re-mt-10 re-mr-20 re-flex cc-card home-website">
								<van-image
									class="card-icon"
									width="15"
									height="15"
									:src="item.icon"></van-image>
								<view class="re-ml-30">
									<view class="card-title">
										<uni-link
											color="#000000"
											:href="item.url"
											:text="item.name"
											showUnderLine="false"
											copyTips="已复制,请在浏览器打开"
											@click="copyData(item.url)"
											@tap="copyData(item.url)">
										</uni-link>
									</view>
									<view class="card-desc">{{ item.desc }}</view>
								</view>
							</view>
						</van-grid-item>
					</van-grid>
				</van-skeleton>
			</van-col>
		</van-row>
	</view>
	<van-popup
		:show="isShowDialog"
		closeable
		position="left"
		safe-area-inset-top
		safe-area-tab-bar
		class="home-dialog"
		custom-class="home-dialog"
		custom-style="width: 50%; height: 100%; padding-top: 50px;"
		@close="closeDialog"
		@click-overlay="closeDialog">
		<van-sidebar
			:active-key="webSiteActive"
			class="home-sidebar"
			@change="changeWebSite">
			<van-sidebar-item
				v-for="(item, index) in webSiteArray.websiteType"
				:key="index"
				:title="item.label"
				:dot="item.isRecommend" />
		</van-sidebar>
	</van-popup>
</template>

<style lang="scss">
	.website-tips {
		font-family: "SF-Pro-Rounded-Bold";
		color: #999999;
		font-size: 20rpx;
	}
	.home-dialog {
		height: 100%;
		.home-sidebar {
			width: 100%;
			height: 100%;
			> view {
				width: 100%;
				height: 100%;
			}
			:deep .van-sidebar {
				width: 100%;
			}
		}
	}
	.home-website {
		padding: 5rpx 10rpx;
		border-radius: 5rpx;
	}
</style>
