// AI生成
/**
 * 平台检测工具（条件编译 + 运行时降级）
 */

export const Platform = {
	get name() {
		// 编译时替换，零运行时开销
		// #ifdef MP-WEIXIN
		return "mp-weixin";
		// #endif
		// #ifdef MP-ALIPAY
		return "mp-alipay";
		// #endif
		// #ifdef MP-BAIDU
		return "mp-baidu";
		// #endif
		// #ifdef MP-TOUTIAO
		return "mp-toutiao";
		// #endif
		// #ifdef MP-QQ
		return "mp-qq";
		// #endif
		// 运行时降级
		if (typeof process !== "undefined" && process.env?.UNI_PLATFORM) {
			return process.env.UNI_PLATFORM;
		}
		return "unknown";
	},

	is(type) {
		return this.name === type;
	},

	isMp() {
		return this.name?.startsWith("mp-");
	},

	isApp() {
		return this.name === "app-plus";
	},

	isH5() {
		return this.name === "h5";
	},

	// 平台能力检测
	supports: {
		// 是否支持 WebSocket
		websocket: () => !["mp-toutiao", "mp-qq"].includes(Platform.name),
		// 是否支持蓝牙
		bluetooth: () => Platform.isMp(),
		// 是否支持支付
		payment: () => ["mp-weixin", "mp-alipay"].includes(Platform.name),
		// 是否支持分享
		share: () => Platform.isMp(),
		// 是否支持推送
		push: () => false,
	},
};

export default Platform;
