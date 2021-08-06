<template>
	<view class="s-page-wrapper">
		<view class="search-pop">
			<view class="main-title">
				<view class="search-tab search_wrap">
					<view class="close-src" @tap="navigateBack"><text class="iconfont icon-zuojiantou"></text></view>
					<view class="search_wraps">
						<icon type="search" size="18" />
						<input type="text" maxlength="-1" :value="keywords" @confirm="submitSearch" :placeholder="placeholder"
							class="search_area" @input="searchInput" />
					</view>
					<view class="search_txt" @tap="submitSearch">搜索</view>
				</view>

			</view>
		</view>

		<view class="search-cat">
			<view class="system"></view>
			<!-- 流程 -->
			<view class="line">
				<image src="../../static/img/search/copy.png"></image>
				<text>复制商品标题</text>
				<image style="width:56rpx;height:18rpx;" src="../../static/img/search/arr.png"></image>
				<image src="../../static/img/search/rsearch.png"></image>
				<text>粘贴搜索</text>
				<image style="width:56rpx;height:18rpx;" src="../../static/img/search/arr.png"></image>
				<image src="../../static/img/search/yh.png"></image>
				<text>领劵购买</text>
			</view>

			<view v-if="recentKeyword.length > 0">
				<view class="search-cat-tit">
					<text class="up-menu" style="font-size: 32upx;">
						<text style="margin-right: 70%;">搜索历史</text>
						<text @tap="deleteKeyword" class="del_img"></text>
					</text>
				</view>
				<view class="src-content">
					<view class="main-src">
						<scroll-view scroll-y="true" style="height: fit-content;max-height: 300upx;">
							<block v-for="(key, index) in recentKeyword">
								<view v-if="key&&key.keyword&&key.keyword.length > 15" class="src-item " style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;width: 100%"
								 @click="addKeyword(key.keyword)">
									{{ key.keyword }}
								</view>
								<view v-else class="src-item " style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden" @click="addKeyword(key.keyword)">
									{{ key.keyword }}
								</view>
							</block>
						</scroll-view>
					</view>
				</view>
				<!-- <view class="src-content">
					<view class="main-src">
						<block v-for="(key, index) in recentKeyword">
							<view v-if="key&&key.keyword&&key.keyword.length > 15" class="src-item "
								style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden;width: 100%"
								@click="addKeyword(key.keyword)">
								{{ key.keyword }}
							</view>
							<view v-else class="src-item "
								style="white-space: nowrap;text-overflow: ellipsis;overflow: hidden"
								@click="addKeyword(key.keyword)">
								{{ key.keyword }}
							</view>
						</block>
					</view>
				</view> -->
			</view>
			<swiper class="swiper" @change="swiperChange" :current="current">
				<swiper-item>
					<view>
						<view class="search-cat-tit" v-if="keywordlist.length > 0"><text class="up-menu"
								style="font-size: 16px">热门搜索</text></view>
						<view class="src-content">
							<view class="main-src">
								<view class="src-item " v-for="(key, index) in keywordlist" :key="index"
									@click="addKeywords(index)">{{ key.keyword }}</view>
							</view>
						</view>
					</view>
				</swiper-item>
				<swiper-item>
					<view class="search-default">
						<view class="help-tips has-mgtb-10 is-size-18">搜索方法：</view>
						<view class="help-tips color999">1、打开手机淘宝/天猫/京东/拼多多，长按拷贝商品标题</view>
						<view class="help-tips color999">2、将商品标题粘贴到搜索框中进行搜索</view>
						<view class="help-tips color999 has-mgt-10">"全网超级搜"功能中的商品信息均来自于互联网</view>
						<view class="help-tips color999">商品准确信息请与商品所属店铺经营者沟通确认</view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	import simpleModal from '@/components/simple-pro/customModal.vue';

	export default {
		components: {
			simpleModal
		},
		onShareAppMessage(res) {
			return {
				title: '购物先领券，一年省一半',
				path: '/pages/index/index'
			};
		},
		data() {
			return {
				placeholder: '输入关键字或粘贴宝贝标题',
				keywords: '',
				keywordlist: [],
				recentKeyword: [],
				copyTklStatus: '',
				localKeyword: 'orange-tyh-keyword',
				current: 0
			};
		},
		onShow() {
			this.recentKeyword = this.$queue.get(this.localKeyword);
		},
		onLoad() {
			//#ifdef H5
			if (window.location.href.indexOf('?invitation=') !== -1 || window.location.href.indexOf('&invitation=') !== -
				1) {
				if (window.location.href.indexOf('?invitation=') !== -1) {
					this.$queue.setData('relation', window.location.href.split('?invitation=')[1].split('&')[0]);
				} else {
					this.invitation = window.location.href.split('&invitation=')[1].split('&')[0];
					this.$queue.setData('relation', window.location.href.split('&invitation=')[1].split('&')[0]);
				}
			}
			//#endif
			this.$Request.get('/api/hot_key/apikey/maxd').then(res => {
				if (res.code === 1) {
					this.keywordlist = [];
					for (let i = 0; i < res.data.length; i++) {
						this.keywordlist.push(res.data[i]);
						if (i === 18) {
							break;
						}
					}
				} else {
					this.loadingType = 2;
				}
			});
			let userId = this.$queue.getData('userId');
			if (!userId) {
				this.$Request.getT('/user/' + userId).then(res => {
					if (res.status === 0) {
						this.$queue.setData('image_url', res.data.image_url);
						this.$queue.setData('mobile', res.data.phone);
						this.$queue.setData('nickName', res.data.nickName);
						this.$queue.setData('relation_id', res.data.relationId);
						this.$queue.setData('gender', parseInt(res.data.gender));
					}
				});
			}
		},
		methods: {
			goSearch() {
				uni.navigateTo({
					url: '/pages/search/search?keywords=' + this.copyTklStatus
				});
				this.$refs.simpleModalTkl.hide();
				this.copyTklStatus = '';
				uni.setClipboardData({
					data: '',
					success: r => {
						uni.showToast({
							icon: 'none',
							title: '搜索中',
							duration: 1500
						});
					}
				});
			},

			clearInput() {
				this.keywords = '';
			},
			navigateBack: function() {
				uni.navigateBack();
			},
			searchInput: function(e) {
				this.keywords = e.detail.value;
			},
			deleteKeyword() {
				//清空最近搜索的关键词
				this.recentKeyword = [];
				this.$queue.remove(this.localKeyword);
			},

			submitSearch: function() {
				if (this.$queue.getSearchKeys(this.keywords) != -1) {
					uni.showToast({
						title: "输入内容带有非法关键字请重新输入",
						mask: false,
						duration: 1500,
						icon: "none"
					});
					this.keywords = '';
				} else {
					this.$queue.showLoading('搜索中...');
					let keywords = this.$queue.get(this.localKeyword);
					if (JSON.stringify(keywords).indexOf(this.keywords) === -1) {
						this.$queue.insert({
							key: this.localKeyword,
							value: {
								keyword: this.keywords
							},
							capacityNum: 20 //队列容量
						});
					}
					let that = this;
					that.$Request.postT('/order/selectItemIdByUrl?content=' + encodeURIComponent(this.keywords))
						.then(res => {
							uni.hideLoading();
							if (res.status === 0) {
								if (res.data) {
									//0 淘宝  1 京东  2拼多多  3苏宁  4 考拉  5 唯品会
									if (this.$queue.getData('relation_id')) {
										if (res.data.type === 0) {
											uni.navigateTo({
												url: '/pages/detail/goodsinfo?itemid=' + res.data.id +
													'&relation_id=' + this.$queue
													.getData('relation_id')
											});
										} else if (res.data.type === 1) {
											uni.navigateTo({
												url: '/pages/detail/jd?itemid=' + res.data.id +
													'&relation_id=' + this.$queue
													.getData('relation_id')
											});
										} else if (res.data.type === 2) {
											uni.navigateTo({
												url: '/pages/detail/pdd?itemid=' + res.data.id +
													'&relation_id=' + this.$queue
													.getData('relation_id')
											});
										}else{
											uni.navigateTo({
												url: '/pages/search/search?keywords=' + this.keywords
											});
										}
									} else {
			
										if (res.data.type === 0) {
											uni.navigateTo({
												url: '/pages/detail/goodsinfo?itemid=' + res.data.id +
													'&relation_id=' + this.$queue
													.getInvitation()
											});
										} else if (res.data.type === 1) {
											uni.navigateTo({
												url: '/pages/detail/jd?itemid=' + res.data.id +
													'&relation_id=' + this.$queue
													.getInvitation()
											});
										} else if (res.data.type === 2) {
											uni.navigateTo({
												url: '/pages/detail/pdd?itemid=' + res.data.id +
													'&relation_id=' + this.$queue
													.getInvitation()
											});
										}else{
											uni.navigateTo({
												url: '/pages/search/search?keywords=' + this.keywords
											});
										}
									}
								} else {
									uni.navigateTo({
										url: '/pages/search/search?keywords=' + this.keywords
									});
								}
							} else {
								uni.navigateTo({
									url: '/pages/search/search?keywords=' + this.keywords
								});
							}
						});
				}
			
			},
			swiperChange: function(e) {
				this.current = e.detail.current;
			},
			switchTab: function(current) {
				this.current = current;
			},
			addKeywords(current) {
				this.keywords = this.keywordlist[current].keyword;
				uni.navigateTo({
					url: '/pages/search/search?keywords=' + this.keywords
				});
			},
			addKeyword(keywords) {
				this.keywords = keywords;
				let id = '';
				if (keywords.indexOf('&id=') != -1) {
					id = keywords.split('&id=')[1].split('&')[0];
				}
				if (keywords.indexOf('?id=') != -1) {
					id = keywords.split('?id=')[1].split('&')[0];
				}
				console.error(id)
				if (id) {
					if (this.$queue.getData('relation_id')) {
						uni.navigateTo({
							url: '/pages/detail/goodsinfo?itemid=' + id + '&relation_id=' + this.$queue.getData(
								'relation_id')
						});
					} else {
						uni.navigateTo({
							url: '/pages/detail/goodsinfo?itemid=' + id + '&relation_id=' + this.$queue
								.getInvitation()
						});
					}
				} else {
					uni.navigateTo({
						url: '/pages/search/search?keywords=' + this.keywords
					});
				}
			}
		}
	};
</script>

<style>
	@import '../../static/css/index.css';

	.swiper {
		height: 100%;
	}

	.help-tips {
		font-size: 13px;
		color: #999;
		line-height: 26px;
		padding: 0 0 0 30px;
		margin: 0;
		width: 80%;
		text-align: left;
	}

	.help-tips.color999 {
		color: #999999;
	}

	.search-default {
		text-align: center;
		height: 150px;
		margin: auto;
	}

	.search-default image {
		display: block;
		margin: auto;
		width: 80%;
	}

	.search-cat {
		position: fixed;
		top: 0;
		bottom: 0;
		/*  */
		/* padding-top: 132rpx;*/
		padding-top: var(--status-bar-height);

		width: 100%;
		height: 100%;
		padding-bottom: 11px;
		background-color: #fff;
	}

	.search-cat .search-cat-tit {
		position: relative;
		height: 10px;
		margin: 13px 3% 20px;
	}

	.search-cat .search-cat-tit .up-menu {
		display: block;
		height: 20px;
		line-height: 20px;
		font-size: 0.9em;
		color: #999;
	}

	.src-content {
		margin: 20px 0 30px;
		width: 97%;
	}

	.main-src .src-item {
		float: left;
		border-radius: 22px;
		padding: 0 10px;
		height: 23px;
		line-height: 23px;
		background-color: #f6f6f6;
		margin: 10px;
		position: relative;
		font-size: 13px;
		color: #333;
	}

	.main-title {
		/* height: 150px; */
	}

	.main-title {
		/* background: -webkit-linear-gradient(left, #FF2638 0, #FF2638 100%);
		background: -o-linear-gradient(left, #FF2638 0, #FF2638 100%);
		background: -ms-linear-gradient(left, #FF2638 0, #FF2638 100%);
		background: -webkit-gradient(linear, right top, left top, color-stop(0, #FF2638), to(#FF2638));
		background: -o-linear-gradient(right, #FF2638 0, #FF2638 100%);
		background: linear-gradient(to left, #FF2638 0, #FF2638 100%); */

		/* background: #FF2638; */
		border-bottom-color: transparent;
		/* border-bottom-color: 1px solid lightblue;  */
		padding: 8px 10px;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 120;
		display: block;
		box-sizing: border-box;
	}

	.clear {
		width: 70upx;
		background: white;
		color: crimson;
		position: absolute;
		z-index: 999;
		font-size: 18px;

		/* height: 60upx; */
		margin-left: 98upx;
		margin-top: -40px;
	}

	.clears {
		float: right;
		color: crimson;
		margin-left: 8px;
		z-index: 100;
	}

	.uni-input-input,
	.uni-input-placeholder {
		/* width: 93%; */
	}

	.search-pop {
		height: 132upx;
	}

	.search-pop .search-tab {
		margin: 5px 0 10px;
		color: #fff;
		font-size: 15px;
		text-align: center;
		/* #ifdef APP-PLUS */
		padding-top: var(--status-bar-height);
		/* #endif */
	}

	.system {
		height: 132upx;
	}

	.search-pop .search-tab .my-sub-src {
		/* margin: 0 auto 0 20px; */
		display: inline-block;
		color: #fff;
		line-height: 30px;
		margin-bottom: 10px !important;
	}

	.search-pop .search-tab .my-sub-src:nth-child(1) {
		margin-left: 0px !important;
	}

	.main-title .search-tab .cur {
		opacity: 1;
		border-bottom: 1px solid #fff;
	}

	.main-title .search-tab .close-src {
		/* position: absolute; */
		/* left: 32upx; */
		display: block;
		/* float: left; */
		color: #555151;
		margin-top: 8upx;
	}

	.main-title .search-tab .close-src .iconfont {
		font-size: 20px;
	}

	.main-title .search {
		background-color: #fff;
		border-radius: 20px;
		width: 78%;
		margin-left: 12%;
		position: relative;
		padding: 0 9px;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		margin-top: 10px;
		margin-bottom: 20upx;
	}

	.uni-input-wrapper {
		width: 87% !important;
	}

	.search_submit {
		width: 25%;
		height: 40px;
		background: #ffb925;
		color: #fff;
		float: right;
		margin-top: -40px;
		position: relative;
		border-radius: 20px;
		margin-right: -20px;
		z-index: 30;
	}

	.main-title .search input {
		border: none;
		outline: 0;
		height: 40px;
		font-size: 14px;
		line-height: 40px;
		background: #fff;
		color: #666;
		border-radius: 5px;
		padding: 0 0 0 5px;
		text-align: left;
	}

	.main-title .search input.search_area {
		background-color: transparent;
		position: relative;
		z-index: 99;
		color: #333;
		font-size: 20upx !important;
		text-align: left;
	}

	.search_wrap {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}

	.search_wraps {
		width: 544rpx;
		height: 70rpx;
		border-radius: 35rpx;
		background: #EDF1F7;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.search_wraps>icon {
		margin-left: 30rpx;
		margin-right: 10rpx;
	}

	.search_wraps>input {
		width: 432rpx;
		color: #CCCCCC;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.search_txt {

		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #1F1E24;
	}

	.line {
		padding: 0 30rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 36rpx;
	}

	.line>image {
		width: 50rpx;
		height: 50rpx;
	}

	.del_img {
		width: 36rpx;
		height: 36rpx;
		display: inline-block;
		background: url(../../static/img/search/del.png);
		background-size: cover;
		position: relative;
		
	}

</style>
