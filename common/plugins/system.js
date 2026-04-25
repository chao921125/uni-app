/**
 * UniApp 系统指标工具模块（全平台兼容版）
 * 修复：process is not defined 问题
 */

let cachedMetrics = null;
let resizeListener = null;

// ==================== 安全工具函数 ====================

/**
 * 安全获取平台标识（兼容 process 未定义的环境）
 */
function getPlatform() {
	// 1. 优先使用 UniApp 条件编译（编译时替换，最安全）
	// #ifdef H5
	return "h5";
	// #endif
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
	// #ifdef APP-PLUS
	return "app-plus";
	// #endif

	// 2. 运行时降级方案（当条件编译未生效时）
	if (typeof process !== "undefined" && process.env?.UNI_PLATFORM) {
		return process.env.UNI_PLATFORM;
	}

	// 3. 通过 uni 对象推断
	if (typeof uni !== "undefined") {
		const sys = uni.getSystemInfoSync?.() || {};
		if (sys.platform) return sys.platform;
		if (sys.system?.toLowerCase().includes("ios")) return "ios";
		if (sys.system?.toLowerCase().includes("android")) return "android";
	}

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

		// 平台标识（安全获取）
		isMp: platform.startsWith("mp-"),
		isWeixin: isPlatform("mp-weixin"),
		isApp: isPlatform("app-plus"),
		isH5: isPlatform("h5"),
	};

	return cachedMetrics;
}

/**
 * 全局注入 CSS 变量
 */
export function injectSystemVars() {
	const m = getSystemMetrics();

	// 兼容小程序：部分基础库不支持 document
	const root = typeof document !== "undefined" ? document.documentElement || document.body : null;

	if (root) {
		const set = (key, val) => {
			try {
				const value = typeof val === "number" ? `${val}px` : String(val);
				root.style.setProperty(key, value);
			} catch (e) {
				console.warn?.(`[System] CSS var failed: ${key}`, e);
			}
		};

		set("--status-bar-height", m.statusBarHeight);
		set("--nav-bar-height", m.navBarHeight);
		set("--total-header-height", m.totalHeaderHeight);
		set("--safe-area-bottom", m.safeAreaBottom);
		set("--safe-area-top", m.safeAreaTop);
		set("--window-height", m.windowHeight);
		set("--window-width", m.windowWidth);
		set("--screen-height", m.screenHeight);
		set("--screen-width", m.screenWidth);
		set("--is-iphonex", m.isIphoneX ? 1 : 0);
		set("--platform", m.platform);
		set("--pixel-ratio", m.pixelRatio);
	}

	return m;
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
		injectSystemVars();
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
 * 获取微信小程序胶囊位置（仅 mp-weixin 有效）
 */
export function getCapsuleRect() {
	// 安全判断：先确认是微信小程序，再调用微信专属 API
	if (!isPlatform("mp-weixin")) return null;

	try {
		// 微信专属 API 安全调用
		const wxApi = typeof wx !== "undefined" ? wx : typeof my !== "undefined" ? my : null;
		if (typeof wxApi?.getMenuButtonBoundingClientRect !== "function") {
			return null;
		}

		const rect = wxApi.getMenuButtonBoundingClientRect();
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
	const capsule = isPlatform("mp-weixin") ? getCapsuleRect() : null;

	return {
		metrics: m,
		capsule,
		env: {
			platform: getPlatform(),
			hasProcess: typeof process !== "undefined",
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
