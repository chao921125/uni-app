/**
 * UniApp 路由模块封装
 * 功能：页面跳转/返回/事件通信/页面栈管理/登录拦截/路径处理
 * 特点：Promise 化 / 条件编译 / 多平台兼容 / TypeScript 支持
 */
import Platform from "./platform.js"

// ==================== 常量配置 ====================
const CONFIG = {
	// 路由白名单（无需登录校验）
	whiteList: ["/pages/login/index", "/pages/register/index", "/pages/protocol/index", "/pages/webview/index"],
	// 默认动画配置（App 端）
	animation: {
		type: "pop-in",
		duration: 300,
	},
	// 页面栈最大层级（小程序限制 10 层）
	maxStack: 10,
	// 登录页路径
	loginPath: "/pages/login/index",
};

// ==================== 内部工具函数 ====================

/**
 * 安全执行回调，避免未捕获错误
 */
function safeCallback(fn, ...args) {
	try {
		return typeof fn === "function" ? fn(...args) : undefined;
	} catch (e) {
		console.error("[Router] Callback error:", e);
	}
}

/**
 * 处理路径：小程序自动加 / 前缀，参数编码
 */
function processPath(url, params = {}) {
	if (!url) return "";

	// 分离路径和查询参数
	const [path, query] = url.split("?");

	// 小程序路径需以 / 开头
	const normalizedPath = Platform.isMp() && !path.startsWith("/") ? `/${path}` : path;

	// 合并参数
	const allParams = { ...parseQuery(query), ...params };
	const queryStr = Object.entries(allParams)
		.filter(([_, v]) => v != null)
		.map(([k, v]) => {
			// 对象/数组自动 JSON 编码
			const val = typeof v === "object" ? JSON.stringify(v) : String(v);
			return `${encodeURIComponent(k)}=${encodeURIComponent(val)}`;
		})
		.join("&");

	return queryStr ? `${normalizedPath}?${queryStr}` : normalizedPath;
}

/**
 * 解析查询字符串
 */
function parseQuery(query) {
	if (!query) return {};
	return query.split("&").reduce((acc, pair) => {
		const [key, val] = pair.split("=");
		if (key) {
			try {
				acc[decodeURIComponent(key)] = decodeURIComponent(val || "");
			} catch {
				acc[key] = val || "";
			}
		}
		return acc;
	}, {});
}

/**
 * 检查是否需要登录校验
 */
function needAuth(url, options = {}) {
	// 显式关闭校验
	if (options.auth === false) return false;
	// 白名单免校验
	const path = url.split("?")[0];
	if (CONFIG.whiteList.some((w) => path.startsWith(w) || path === w)) {
		return false;
	}
	return true;
}

/**
 * 获取登录页路径（支持重定向参数）
 */
function getLoginUrl(redirectUrl, customLoginPath) {
	const loginPath = customLoginPath || CONFIG.loginPath;
	const target = encodeURIComponent(redirectUrl);
	return `${loginPath}?redirect=${target}`;
}

/**
 * 检查页面栈是否已满（小程序限制 10 层）
 */
function isStackFull() {
	const pages = getCurrentPages?.() || [];
	return pages.length >= CONFIG.maxStack;
}

/**
 * 判断是否为 tabBar 页面（需读取 pages.json，此处简化处理）
 */
function isTabBarPage(url) {
	// 实际项目中可从 pages.json 解析 tabBar.list
	const tabBarPaths = []; // 动态配置或从全局获取
	const path = url.split("?")[0].replace(/^\//, "");
	return tabBarPaths.includes(path);
}

// ==================== EventChannel 封装 ====================

export class EventChannel {
	constructor(task) {
		this._task = task;
		this._listeners = new Map();
	}

	/**
	 * 触发事件
	 * @param {string} eventName - 事件名称
	 * @param {any} args - 事件参数
	 */
	emit(eventName, args) {
		if (this._task?.emit) {
			return this._task.emit(eventName, args);
		}
		// 降级：调用本地监听
		const listeners = this._listeners.get(eventName) || [];
		listeners.forEach((fn) => safeCallback(fn, args));
		return this;
	}

	/**
	 * 监听事件（持续）
	 */
	on(eventName, fn) {
		if (this._task?.on) {
			this._task.on(eventName, fn);
		} else {
			const list = this._listeners.get(eventName) || [];
			list.push(fn);
			this._listeners.set(eventName, list);
		}
		return this;
	}

	/**
	 * 监听事件（一次）
	 */
	once(eventName, fn) {
		const wrapper = (...args) => {
			fn(...args);
			this.off(eventName, wrapper);
		};
		return this.on(eventName, wrapper);
	}

	/**
	 * 取消监听
	 */
	off(eventName, fn) {
		if (this._task?.off) {
			this._task.off(eventName, fn);
		} else if (fn) {
			const list = this._listeners.get(eventName) || [];
			const idx = list.indexOf(fn);
			if (idx > -1) list.splice(idx, 1);
		} else {
			this._listeners.delete(eventName);
		}
		return this;
	}

	/**
	 * 获取原生 task（高级用法）
	 */
	getTask() {
		return this._task;
	}
}

// ==================== 核心路由模块 ====================

export const Router = {
	// 配置
	config(newConfig) {
		Object.assign(CONFIG, newConfig);
		return this;
	},

	/**
	 * 保留当前页，跳转到新页面（支持事件通信）
	 * @param {string} url - 目标路径
	 * @param {Object} options - 配置项
	 * @returns {Promise<{ eventChannel?: EventChannel }>}
	 */
	async navigateTo(url, options = {}) {
		const {
			params = {}, // 附加参数（自动编码）
			auth = true, // 是否校验登录
			loginPath, // 自定义登录页
			animationType, // App 动画类型
			animationDuration, // App 动画时长
			events = {}, // 页面间事件监听
			success,
			fail,
			complete, // 回调函数（兼容旧写法）
		} = options;

		// 登录校验
		if (auth && needAuth(url, options)) {
			const token = uni.getStorageSync?.("token");
			if (!token) {
				const targetUrl = processPath(url, params);
				return this.navigateTo(getLoginUrl(targetUrl, loginPath), { auth: false, ...options });
			}
		}

		// 处理路径和参数
		const targetUrl = processPath(url, params);

		// 构建调用参数
		const navOptions = {
			url: targetUrl,
			success: (res) => {
				// 封装 EventChannel
				const eventChannel = res?.eventChannel ? new EventChannel(res.eventChannel) : null;
				safeCallback(success, { ...res, eventChannel });
				return { ...res, eventChannel };
			},
			fail: (err) => {
				// 页面栈满自动降级为 redirectTo
				if (err?.errMsg?.includes("max") || err?.errMsg?.includes("limit")) {
					console.warn("[Router] navigateTo 页面栈满，自动降级为 redirectTo");
					return this.redirectTo(url, { ...options, params, auth: false })
						.then((res) => safeCallback(success, res) || res)
						.catch((e) => {
							safeCallback(fail, e);
							return Promise.reject(e);
						});
				}
				safeCallback(fail, err);
				return Promise.reject(err);
			},
			complete: (res) => safeCallback(complete, res),
		};

		// App 端动画配置
		if (Platform.isApp()) {
			navOptions.animationType = animationType || CONFIG.animation.type;
			navOptions.animationDuration = animationDuration ?? CONFIG.animation.duration;
		}

		// 事件通信配置（2.8.9+）
		if (Object.keys(events).length > 0) {
			navOptions.events = events;
		}

		return new Promise((resolve, reject) => {
			uni.navigateTo({
				...navOptions,
				success: (res) => resolve(navOptions.success(res)),
				fail: (err) => {
					const result = navOptions.fail(err);
					if (result?.then) {
						result.then(resolve).catch(reject);
					} else {
						reject(err);
					}
				},
			});
		});
	},

	/**
	 * 关闭当前页，跳转到新页面
	 */
	async redirectTo(url, options = {}) {
		const { params = {}, auth = true, loginPath, success, fail, complete } = options;

		// 登录校验
		if (auth && needAuth(url, options)) {
			const token = uni.getStorageSync?.("token");
			if (!token) {
				const targetUrl = processPath(url, params);
				return this.redirectTo(getLoginUrl(targetUrl, loginPath), { auth: false, ...options });
			}
		}

		const targetUrl = processPath(url, params);

		return new Promise((resolve, reject) => {
			uni.redirectTo({
				url: targetUrl,
				success: (res) => {
					safeCallback(success, res);
					resolve(res);
				},
				fail: (err) => {
					safeCallback(fail, err);
					reject(err);
				},
				complete: (res) => safeCallback(complete, res),
			});
		});
	},

	/**
	 * 关闭所有页面，打开新页面
	 */
	async reLaunch(url, options = {}) {
		const { params = {}, auth = true, loginPath, success, fail, complete } = options;

		// 登录校验
		if (auth && needAuth(url, options)) {
			const token = uni.getStorageSync?.("token");
			if (!token) {
				const targetUrl = processPath(url, params);
				return this.reLaunch(getLoginUrl(targetUrl, loginPath), { auth: false, ...options });
			}
		}

		// tabBar 页面不能带参数
		const targetUrl = isTabBarPage(url) ? url.split("?")[0] : processPath(url, params);

		return new Promise((resolve, reject) => {
			uni.reLaunch({
				url: targetUrl,
				success: (res) => {
					safeCallback(success, res);
					resolve(res);
				},
				fail: (err) => {
					safeCallback(fail, err);
					reject(err);
				},
				complete: (res) => safeCallback(complete, res),
			});
		});
	},

	/**
	 * 跳转到 tabBar 页面
	 */
	async switchTab(url, options = {}) {
		const { auth = true, loginPath, success, fail, complete } = options;

		// tabBar 页面通常不需要登录校验，但保留选项
		if (auth && needAuth(url, options)) {
			const token = uni.getStorageSync?.("token");
			if (!token) {
				return this.switchTab(getLoginUrl(url, loginPath), { auth: false, ...options });
			}
		}

		// tabBar 路径不能带参数，自动清理
		const cleanUrl = url.split("?")[0];
		const targetUrl = Platform.isMp() && !cleanUrl.startsWith("/") ? `/${cleanUrl}` : cleanUrl;

		return new Promise((resolve, reject) => {
			uni.switchTab({
				url: targetUrl,
				success: (res) => {
					safeCallback(success, res);
					resolve(res);
				},
				fail: (err) => {
					safeCallback(fail, err);
					reject(err);
				},
				complete: (res) => safeCallback(complete, res),
			});
		});
	},

	/**
	 * 返回上一页或多级页面
	 */
	async navigateBack(options = {}) {
		const {
			delta = 1, // 返回层级
			animationType, // App 关闭动画
			animationDuration, // App 动画时长
			success,
			fail,
			complete,
		} = options;

		// 安全处理 delta
		const pages = getCurrentPages?.() || [];
		const safeDelta = Math.min(delta, Math.max(1, pages.length - 1));

		const navOptions = { delta: safeDelta };

		// App 端动画配置
		if (Platform.isApp()) {
			navOptions.animationType = animationType || "pop-out";
			navOptions.animationDuration = animationDuration ?? CONFIG.animation.duration;
		}

		return new Promise((resolve, reject) => {
			uni.navigateBack({
				...navOptions,
				success: (res) => {
					safeCallback(success, res);
					resolve(res);
				},
				fail: (err) => {
					safeCallback(fail, err);
					reject(err);
				},
				complete: (res) => safeCallback(complete, res),
			});
		});
	},

	// ==================== 便捷方法 ====================

	/**
	 * 快捷跳转：保留当前页（navigateTo 别名）
	 */
	to: (url, opts) => Router.navigateTo(url, opts),

	/**
	 * 快捷跳转：关闭当前页（redirectTo 别名）
	 */
	replace: (url, opts) => Router.redirectTo(url, opts),

	/**
	 * 快捷跳转：关闭所有页（reLaunch 别名）
	 */
	relaunch: (url, opts) => Router.reLaunch(url, opts),

	/**
	 * 快捷跳转：切换到 tabBar（switchTab 别名）
	 */
	tab: (url, opts) => Router.switchTab(url, opts),

	/**
	 * 快捷返回（navigateBack 别名）
	 */
	back: (delta = 1) => Router.navigateBack({ delta }),

	// ==================== 页面栈管理 ====================

	/**
	 * 获取当前页面栈
	 * @returns {Array<Page>} 页面实例数组
	 */
	getPages() {
		return getCurrentPages?.() || [];
	},

	/**
	 * 获取当前页面实例
	 * @returns {Page | null}
	 */
	getCurrentPage() {
		const pages = this.getPages();
		return pages[pages.length - 1] || null;
	},

	/**
	 * 获取当前页面路径
	 * @returns {string}
	 */
	getCurrentPath() {
		const page = this.getCurrentPage();
		return page?.route || page?.$page?.fullpath?.split("?")[0] || "";
	},

	/**
	 * 获取当前页面参数
	 * @returns {Object}
	 */
	getParams() {
		const page = this.getCurrentPage();
		return page?.options || {};
	},

	/**
	 * 获取上一页实例
	 * @param {number} delta - 上几页（1=上一页）
	 * @returns {Page | null}
	 */
	getPrevPage(delta = 1) {
		const pages = this.getPages();
		const idx = pages.length - 1 - delta;
		return pages[idx] || null;
	},

	/**
	 * 判断是否为首页
	 * @returns {boolean}
	 */
	isHome() {
		const pages = this.getPages();
		return pages.length <= 1;
	},

	// ==================== 参数工具 ====================

	/**
	 * 编码参数（用于 URL 拼接）
	 */
	encodeParams(params) {
		if (!params) return "";
		return Object.entries(params)
			.filter(([_, v]) => v != null)
			.map(([k, v]) => {
				const val = typeof v === "object" ? JSON.stringify(v) : String(v);
				return `${encodeURIComponent(k)}=${encodeURIComponent(val)}`;
			})
			.join("&");
	},

	/**
	 * 解码参数（用于 onLoad 接收）
	 */
	decodeParams(query) {
		return parseQuery(query);
	},

	/**
	 * 拼接路径和参数
	 */
	buildPath(path, params) {
		const query = this.encodeParams(params);
		return query ? `${path}?${query}` : path;
	},

	// ==================== 预加载支持 ====================

	/**
	 * 预加载页面（提升跳转速度，仅部分平台支持）
	 * @param {string} url - 目标路径
	 * @returns {Promise | null}
	 */
	preload(url) {
		if (typeof uni.preloadPage === "function") {
			return new Promise((resolve) => {
				uni.preloadPage({
					url: processPath(url),
					success: resolve,
					fail: resolve,
				});
			});
		}
		return Promise.resolve();
	},
};

// ==================== 默认导出（兼容旧写法） ====================
export default Router;
