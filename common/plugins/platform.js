/**
 * 平台检测工具（条件编译，仅小程序端）
 * 支持：微信/支付宝/百度/字节/QQ/快手/飞书/京东/小红书/鸿蒙元服务/钉钉
 */

export const Platform = {
	get name() {
		// 编译时替换，零运行时开销
		// #ifdef MP-WEIXIN
		return "mp-weixin";
		// #endif
		// #ifdef MP-DINGTALK
		return "mp-dingtalk";
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
		// #ifdef MP-KUAISHOU
		return "mp-kuaishou";
		// #endif
		// #ifdef MP-LARK
		return "mp-lark";
		// #endif
		// #ifdef MP-JD
		return "mp-jd";
		// #endif
		// #ifdef MP-XHS
		return "mp-xhs";
		// #endif
		// #ifdef MP-HARMONY
		return "mp-harmony";
		// #endif
		return "unknown";
	},

	is(type) {
		return this.name === type;
	},

	isMp() {
		return this.name?.startsWith("mp-");
	},

	// 平台能力检测（小程序端）
	supports: {
		// 是否支持 WebSocket
		websocket: () => !["mp-toutiao", "mp-qq"].includes(Platform.name),
		// 是否支持蓝牙
		bluetooth: () => Platform.isMp(),
		// 是否支持支付
		payment: () => ["mp-weixin", "mp-alipay", "mp-dingtalk"].includes(Platform.name),
		// 是否支持分享
		share: () => Platform.isMp(),
		// 是否支持推送
		push: () => false,
	},
};

export default Platform;