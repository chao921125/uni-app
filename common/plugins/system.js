/**
 * UniApp 系统指标工具模块（仅小程序端）
 */

let cachedMetrics = null;
let resizeListener = null;

// ==================== 安全工具函数 ====================

/**
 * 获取平台标识（编译时条件编译，覆盖全部小程序平台）
 */
function getPlatform() {
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
}

/**
 * 安全判断是否为某平台
 */
function isPlatform(target) {
	return getPlatform() === target;
}

// ==================== 核心方法 ====================

/**
 * 获取系统指标（带缓存）
 * @returns {SystemMetrics}
 */
export function getSystemMetrics() {
	if (cachedMetrics) return cachedMetrics;

	const sys = uni.getWindowInfo ? uni.getWindowInfo() : uni.getSystemInfoSync();

	const statusBar = sys.statusBarHeight || 0;
	const navHeight = 44;
	const safeArea = sys.safeArea || { bottom: sys.screenHeight };
	const safeBottom = sys.screenHeight - safeArea.bottom;
	const platform = getPlatform();

	cachedMetrics = {
		// 高度相关
		statusBarHeight: statusBar,
		navBarHeight: navHeight,
		totalHeaderHeight: statusBar + navHeight,
		safeAreaBottom: safeBottom,
		safeAreaTop: safeArea.top || statusBar,

		// 窗口尺寸
		windowHeight: sys.windowHeight,
		windowWidth: sys.windowWidth,
		screenHeight: sys.screenHeight,
		screenWidth: sys.screenWidth,

		// 设备标识
		isIphoneX: safeBottom > 20,
		platform,
		brand: sys.brand || "",
		model: sys.model || "",
		pixelRatio: sys.pixelRatio || 1,

		// 平台标识
		isMp: platform.startsWith("mp-"),
		isWeixin: isPlatform("mp-weixin"),
	};

	return cachedMetrics;
}

/**
 * 获取系统指标并返回（小程序端无 DOM，CSS 变量由页面自行处理）
 */
export function injectSystemVars() {
	return getSystemMetrics();
}

/**
 * 监听屏幕变化
 */
export function watchSystemChange(callback) {
	if (resizeListener) {
		uni.offWindowResize?.(resizeListener);
		resizeListener = null;
	}

	const handler = () => {
		cachedMetrics = null;
		const newMetrics = getSystemMetrics();
		callback?.(newMetrics);
	};

	uni.onWindowResize?.(handler);
	resizeListener = handler;

	return () => {
		uni.offWindowResize?.(handler);
		resizeListener = null;
	};
}

/**
 * 获取小程序胶囊按钮位置（微信/支付宝系支持，其余平台返回 null）
 */
export function getCapsuleRect() {
	try {
		const host = typeof wx !== "undefined" ? wx : typeof my !== "undefined" ? my : null;
		if (typeof host?.getMenuButtonBoundingClientRect !== "function") {
			return null;
		}

		const rect = host.getMenuButtonBoundingClientRect();
		if (!rect) return null;

		return {
			top: rect.top,
			right: rect.right,
			bottom: rect.bottom,
			left: rect.left,
			width: rect.width,
			height: rect.height,
			centerX: rect.left + rect.width / 2,
			centerY: rect.top + rect.height / 2,
			safeRight: rect.right + 10,
		};
	} catch (e) {
		console.warn?.("[System] getCapsuleRect failed", e);
		return null;
	}
}

/**
 * 清除缓存
 */
export function clearCache() {
	cachedMetrics = null;
}

/**
 * 获取调试信息
 */
export function getDebugInfo() {
	const m = getSystemMetrics();
	const capsule = getCapsuleRect();

	return {
		metrics: m,
		capsule,
		env: {
			platform: getPlatform(),
			hasUni: typeof uni !== "undefined",
		},
	};
}

// ==================== 默认导出 ====================
export default {
	getSystemMetrics,
	injectSystemVars,
	watchSystemChange,
	getCapsuleRect,
	clearCache,
	getDebugInfo,
	// 导出工具函数供外部使用
	getPlatform,
	isPlatform,
};