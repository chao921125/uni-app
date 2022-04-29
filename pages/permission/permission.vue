<template>
	<view>
        <!-- #ifdef APP-PLUS || MP-ALIPAY || MP-TOUTIAO -->
		<page-head></page-head>
        <!-- #endif -->
		<view class="uni-padding-wrap">
			<view style="background:#FFF; padding:40rpx;">
				<block v-if="hasUserInfo === false">
                    <view style="padding:30rpx 0; text-align:center;">
                        <image class="userinfo-avatar" :src="imgPath.UserAvatar"></image>
                    </view>
					<view class="uni-hello-text uni-center">
						<text>请点击下方按钮获取用户头像及昵称或手机号</text>
					</view>
				</block>
				<block v-if="hasUserInfo === true">
					<view class="uni-h4 uni-center uni-common-mt">{{userInfo.nickName || userInfo.nickname || userInfo.gender || userInfo.email || userInfo.phoneNumber}}</view>
					<view v-if="userInfo.avatarUrl || userInfo.avatar_url " style="padding:30rpx 0; text-align:center;">
						<image class="userinfo-avatar" :src="userInfo.avatarUrl||userInfo.avatar_url"></image>
					</view>
				</block>
			</view>
			<view class="uni-btn-v">
				<!-- #ifdef APP-PLUS || MP-ALIPAY || MP-TOUTIAO -->
				<button type="primary" :loading="btnLoading" @click="getUserInfo">获取用户信息</button>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN || MP-BAIDU || MP-QQ  || MP-JD -->
				<button type="primary" open-type="getUserInfo" withCredentials="true" @getuserinfo="mpGetUserInfo">获取用户信息</button>
                <!-- <button open-type="getPhoneNumber" @getphonenumber="onGetPhoneNumber">onGetPhoneNumber</button> -->
				<!-- #endif -->
			</view>
		</view>
	</view>
</template>
<script>
	import { mapState, mapMutations, mapActions } from 'vuex';
	import defaultConfig from "@/common/config/index.js";
	import utils from "@/common/plugins/utils.js";
    import { login } from "@/common/api/user.js";

	export default {
		data() {
			return {
                imgPath: defaultConfig.imgPath,
				hasUserInfo: false,
                openId: "",
				userInfo: {},
				btnLoading: false
			}
		},
		onLoad() {
			// this.checkLogin();
		},
		computed: {
			...mapState([
				'loginProvider',
				'isUniverifyLogin'
			])
		},
		methods: {
			...mapActions(['getPhoneNumber']),
			// 获取用户信息 API 在小程序可直接使用，在 5+App 里面需要先登录才能调用
			getUserInfo() {
				this.btnLoading = true;
				if (this.isUniverifyLogin) {
					// 一键登录
					this.getPhoneNumber(uni.getStorageSync('univerifyInfo')).then(phoneNumber => {
						this.hasUserInfo = true;
						this.userInfo = {
							phoneNumber
						};
					}).catch(err => {
						console.error('getUserInfo fail:', err);
						this.hasUserInfo = false;
					}).finally(() => {
						this.btnLoading = false;
					})
					return;
				}

				if(this.loginProvider === 'apple'){
					const nickname = uni.getStorageSync('apple_nickname')
					if(nickname){
						this.hasUserInfo = true;
						this.userInfo = { nickName:nickname }
						this.btnLoading = false;
						return;
					}
				}

				uni.getUserInfo({
					provider: this.loginProvider,
					success: (result) => {
						this.hasUserInfo = true;
						this.userInfo = result.userInfo;
					},
					fail: (error) => {
						console.log('getUserInfo fail', error);
						let content = error.errMsg;
						if (~content.indexOf('uni.login')) {
							content = '请在登录页面完成登录操作';
						}
						// #ifndef APP-PLUS
						uni.getSetting({
							success: (res) => {
								let authStatus = res.authSetting['scope.userInfo'];
								if (!authStatus) {
									uni.showModal({
										title: '授权失败',
										content: 'Hello uni-app需要获取您的用户信息，请在设置界面打开相关权限',
										success: (res) => {
											if (res.confirm) {
												uni.openSetting()
											}
										}
									})
								} else {
									uni.showModal({
										title: '获取用户信息失败',
										content: '错误原因' + content,
										showCancel: false
									});
								}
							}
						})
						// #endif
						// #ifdef APP-PLUS
						uni.showModal({
							title: '获取用户信息失败',
							content: '错误原因' + content,
							showCancel: false
						});
						// #endif
					},
					complete: () => {
						this.btnLoading = false;
					}
				});
			},
			mpGetUserInfo(result) {
				console.log('mpGetUserInfo', result);
                
				if (result.detail.errMsg !== 'getUserInfo:ok') {
					uni.showModal({
						title: '获取用户信息失败',
						content: '错误原因' + result.detail.errMsg,
						showCancel: false
					});
					return;
				}
                
                // uni.getUserInfo({
                // 	provider: 'weixin',
                // 	success: (result) => {
                //         uni.setStorageSync(defaultConfig.userKey, result.userInfo);
                // 	},
                // 	fail: (error) => {
                // 		console.log('getUserInfo fail', error);
                // 	},
                // 	complete: () => {}
                // });
                
				this.hasUserInfo = true;
				if(result.detail && result.detail.userInfo){
					this.userInfo = result.detail.userInfo;
                    uni.setStorageSync(defaultConfig.userKey, result.detail.userInfo);
                    this.checkLogin();
				}else{
					// #ifdef MP-JD
					this.userInfo = result.detail.user_info;
					// #endif
				}
			},
            onGetPhoneNumber(result) {
                console.log(result);
            },
			clear() {
				this.hasUserInfo = false;
				this.userInfo = {};
			},
            checkLogin() {
                let _this = this;
                /**
                 * provider: String uni.getProvider()
                 * scopes: String/Array
                 * timeout: Number
                 * univerifyStyle: Object
                 * onlyAuthorize: Boolean
                 */
                // uni.checkSession({
                //     success: (res) => {
                //         console.log("checkSession success", res);
                //     },
                //     fail: (err) => {
                //         console.log("checkSession fail", err);
                //     },
                //     complete: () => {},
                // });
                uni.login({
                    onlyAuthorize: true,
                    success: (res) => {
                        let url = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + defaultConfig.appId + '&secret=' + defaultConfig.secret + '&js_code=' + res.code + '&grant_type=authorization_code';
                        uni.request({
                          url: url, // 请求路径
                          method: 'GET', //请求方式
                          success: result => {
                            this.openId = result.data.openid;
                            uni.setStorageSync(defaultConfig.tokenKey, result.data.openid);
                            this.loginUser();
                          },
                          fail: err => {} //失败
                        });
                    },
                    fail: () => {},
                    complete: () => {},
                })
            },
            loginUser() {
                login({
                    userNo: this.openId,
                    imgUrl: this.userInfo.avatarUrl,
                    userName: this.userInfo.nickName,
                }).then((res) => {
                    if (res) {
                        utils.hrefTabbar(defaultConfig.routePath.tabbarHome, false);
                    }
                });
            }
		}
	}
</script>

<style lang="scss">
	.userinfo-avatar {
		border-radius: 128rpx;
		width: 128rpx;
		height: 128rpx;
	}
</style>
