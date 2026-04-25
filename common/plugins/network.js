/**
 * UniApp 网络与WebSocket模块封装
 * 功能：HTTP请求/WebSocket/下载/上传/网络状态监听
 * 平台：全平台兼容
 */

import Constants from "@/common/utils/constants.js";
import Platform from "./platform.js";
import Storage from "./storage.js";

// ==================== HTTP请求封装（增强版） ====================

export const http = {
	// 默认配置
	defaultConfig: {
		baseURL: Constants.baseUrl || "",
		timeout: 30000,
		header: {
			"Content-Type": "application/json;charset=utf-8",
		},
	},

	// 拦截器
	interceptors: {
		request: [],
		response: [],
	},

	/**
	 * 添加请求拦截器
	 * @param {Function} fn - 拦截函数 (config) => config | Promise<config>
	 */
	addRequestInterceptor(fn) {
		this.interceptors.request.push(fn);
	},

	/**
	 * 添加响应拦截器
	 * @param {Function} fn - 拦截函数 (response) => response | Promise<response>
	 */
	addResponseInterceptor(fn) {
		this.interceptors.response.push(fn);
	},

	/**
	 * 执行请求拦截器
	 */
	async runRequestInterceptors(config) {
		let finalConfig = config;
		for (const interceptor of this.interceptors.request) {
			finalConfig = await interceptor(finalConfig);
		}
		return finalConfig;
	},

	/**
	 * 执行响应拦截器
	 */
	async runResponseInterceptors(response) {
		let finalResponse = response;
		for (const interceptor of this.interceptors.response) {
			finalResponse = await interceptor(finalResponse);
		}
		return finalResponse;
	},

	/**
	 * 通用请求方法
	 * @param {Object} config - 请求配置
	 * @returns {Promise<any>}
	 */
	async request(config) {
		const {
			url,
			method = "GET",
			data = {},
			params = {},
			header = {},
			timeout = this.defaultConfig.timeout,
			showLoading = true,
			loadingText = "加载中...",
			auth = true,
		} = config;

		// 构建完整URL
		let fullUrl = url.startsWith("http") ? url : `${this.defaultConfig.baseURL}${url}`;

		// 拼接查询参数
		if (method === "GET" && Object.keys(params).length > 0) {
			const queryString = Object.entries(params)
				.map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
				.join("&");
			fullUrl += `?${queryString}`;
		}

		// 构建请求配置
		let requestConfig = {
			url: fullUrl,
			method,
			data: method !== "GET" ? data : undefined,
			header: {
				...this.defaultConfig.header,
				...header,
			},
			timeout,
		};

		// 添加Token
		if (auth) {
			const token = Storage.getToken?.() || uni.getStorageSync?.("token");
			if (token) {
				requestConfig.header["Authorization"] = `Bearer ${token}`;
				requestConfig.header["token"] = token;
			}
		}

		// 显示Loading
		if (showLoading) {
			uni.showLoading?.({ title: loadingText, mask: true });
		}

		try {
			// 执行请求拦截器
			requestConfig = await this.runRequestInterceptors(requestConfig);

			// 发起请求
			const response = await new Promise((resolve, reject) => {
				uni.request({
					...requestConfig,
					success: resolve,
					fail: reject,
				});
			});

			// 执行响应拦截器
			const finalResponse = await this.runResponseInterceptors(response);

			// 隐藏Loading
			if (showLoading) {
				uni.hideLoading?.();
			}

			// 处理业务逻辑
			const { statusCode, data: resData } = finalResponse;

			if (statusCode === 200) {
				// 根据后端返回的code判断
				if (resData.code === 1111) {
					// 未登录
					Storage.removeToken?.();
					uni.reLaunch?.({ url: "/pages-auth/login" });
					throw new Error("未登录");
				} else if (resData.code === 301 || resData.code === 500) {
					// 业务错误
					uni.showToast?.({
						title: resData.msg || "请求失败",
						icon: "none",
					});
					throw new Error(resData.msg);
				} else {
					return resData.data || resData;
				}
			} else {
				throw new Error(`HTTP ${statusCode}`);
			}
		} catch (error) {
			if (showLoading) {
				uni.hideLoading?.();
			}

			// 网络错误提示
			if (!error.message.includes("未登录")) {
				uni.showToast?.({
					title: error.message || "网络异常",
					icon: "none",
				});
			}

			throw error;
		}
	},

	/**
	 * GET请求
	 */
	get(url, params = {}, config = {}) {
		return this.request({
			url,
			method: "GET",
			params,
			...config,
		});
	},

	/**
	 * POST请求
	 */
	post(url, data = {}, config = {}) {
		return this.request({
			url,
			method: "POST",
			data,
			...config,
		});
	},

	/**
	 * PUT请求
	 */
	put(url, data = {}, config = {}) {
		return this.request({
			url,
			method: "PUT",
			data,
			...config,
		});
	},

	/**
	 * DELETE请求
	 */
	delete(url, config = {}) {
		return this.request({
			url,
			method: "DELETE",
			...config,
		});
	},

	/**
	 * 文件上传
	 * @param {string} url - 上传接口
	 * @param {Object} options - 配置项
	 * @returns {Promise<Object>}
	 */
	async upload(url, options = {}) {
		const {
			filePath,
			files = [],
			name = "file",
			formData = {},
			onProgress = null,
			showLoading = true,
		} = options;

		const token = Storage.getToken?.() || uni.getStorageSync?.("token");

		return new Promise((resolve, reject) => {
			if (showLoading) {
				uni.showLoading?.({ title: "上传中...", mask: true });
			}

			const task = uni.uploadFile({
				url: `${this.defaultConfig.baseURL}${url}`,
				filePath,
				files,
				name,
				formData,
				header: {
					Authorization: token ? `Bearer ${token}` : "",
					token: token || "",
				},
				success: (res) => {
					if (showLoading) {
						uni.hideLoading?.();
					}

					try {
						const data = JSON.parse(res.data.replace(/\ufeff/g, ""));
						if (data.code % 100 === 0) {
							resolve(data.data);
						} else {
							uni.showToast?.({ title: data.msg || "上传失败", icon: "none" });
							reject(new Error(data.msg));
						}
					} catch {
						reject(new Error("Response parse failed"));
					}
				},
				fail: (err) => {
					if (showLoading) {
						uni.hideLoading?.();
					}
					uni.showToast?.({ title: "上传失败", icon: "none" });
					reject(err);
				},
			});

			// 监听进度
			if (onProgress && task?.onProgressUpdate) {
				task.onProgressUpdate(onProgress);
			}
		});
	},

	/**
	 * 文件下载
	 * @param {string} url - 下载地址
	 * @param {Object} options - 配置项
	 * @returns {Promise<string>} 本地文件路径
	 */
	async download(url, options = {}) {
		const {
			onProgress = null,
			showLoading = true,
			timeout = 30000,
		} = options;

		return new Promise((resolve, reject) => {
			if (showLoading) {
				uni.showLoading?.({ title: "下载中...", mask: true });
			}

			const task = uni.downloadFile({
				url: url.startsWith("http") ? url : `${this.defaultConfig.baseURL}${url}`,
				timeout,
				success: (res) => {
					if (showLoading) {
						uni.hideLoading?.();
					}

					if (res.statusCode === 200) {
						resolve(res.tempFilePath);
					} else {
						reject(new Error(`Download failed: ${res.statusCode}`));
					}
				},
				fail: (err) => {
					if (showLoading) {
						uni.hideLoading?.();
					}
					reject(err);
				},
			});

			if (onProgress && task?.onProgressUpdate) {
				task.onProgressUpdate(onProgress);
			}
		});
	},
};

// ==================== WebSocket封装 ====================

export const websocket = {
	// 连接实例
	socketTask: null,

	// 连接状态
	connected: false,

	// 重连配置
	reconnectConfig: {
		maxAttempts: 5,
		interval: 3000,
		currentAttempt: 0,
	},

	// 事件监听器
	listeners: {
		open: [],
		close: [],
		error: [],
		message: [],
	},

	/**
	 * 创建WebSocket连接
	 * @param {string} url - WebSocket地址
	 * @param {Object} options - 配置项
	 */
	connect(url, options = {}) {
		const {
			protocols = [],
			autoReconnect = true,
			onOpen = null,
			onClose = null,
			onError = null,
			onMessage = null,
		} = options;

		return new Promise((resolve, reject) => {
			this.socketTask = uni.connectSocket({
				url,
				protocols,
				success: () => {
					console.log("[WebSocket] Connection initiated");
				},
				fail: (err) => {
					console.error("[WebSocket] Connection failed:", err);
					reject(err);
				},
			});

			// 监听连接打开
			this.socketTask.onOpen((res) => {
				this.connected = true;
				this.reconnectConfig.currentAttempt = 0;
				console.log("[WebSocket] Connected");

				// 触发回调
				this.listeners.open.forEach((fn) => fn(res));
				if (onOpen) onOpen(res);

				resolve(res);
			});

			// 监听消息
			this.socketTask.onMessage((res) => {
				console.log("[WebSocket] Message received:", res.data);

				// 触发回调
				this.listeners.message.forEach((fn) => fn(res));
				if (onMessage) onMessage(res);
			});

			// 监听关闭
			this.socketTask.onClose((res) => {
				this.connected = false;
				console.log("[WebSocket] Closed");

				// 触发回调
				this.listeners.close.forEach((fn) => fn(res));
				if (onClose) onClose(res);

				// 自动重连
				if (autoReconnect && this.reconnectConfig.currentAttempt < this.reconnectConfig.maxAttempts) {
					this.reconnect();
				}
			});

			// 监听错误
			this.socketTask.onError((err) => {
				console.error("[WebSocket] Error:", err);

				// 触发回调
				this.listeners.error.forEach((fn) => fn(err));
				if (onError) onError(err);

				if (!this.connected) {
					reject(err);
				}
			});
		});
	},

	/**
	 * 发送消息
	 * @param {string|Object} data - 消息内容
	 */
	send(data) {
		if (!this.connected || !this.socketTask) {
			console.warn("[WebSocket] Not connected");
			return false;
		}

		const message = typeof data === "object" ? JSON.stringify(data) : data;

		return this.socketTask.send({
			data: message,
			success: () => {
				console.log("[WebSocket] Message sent");
			},
			fail: (err) => {
				console.error("[WebSocket] Send failed:", err);
			},
		});
	},

	/**
	 * 关闭连接
	 */
	close(code = 1000, reason = "") {
		if (this.socketTask) {
			this.socketTask.close({ code, reason });
			this.socketTask = null;
			this.connected = false;
		}
	},

	/**
	 * 重连
	 */
	reconnect() {
		this.reconnectConfig.currentAttempt++;
		console.log(
			`[WebSocket] Reconnecting (${this.reconnectConfig.currentAttempt}/${this.reconnectConfig.maxAttempts})`,
		);

		setTimeout(() => {
			// 需要重新调用connect，这里简化处理
			this.connected = false;
		}, this.reconnectConfig.interval);
	},

	/**
	 * 添加事件监听
	 * @param {string} event - 事件类型（open/close/error/message）
	 * @param {Function} callback - 回调函数
	 */
	on(event, callback) {
		if (this.listeners[event]) {
			this.listeners[event].push(callback);
		}
	},

	/**
	 * 移除事件监听
	 * @param {string} event - 事件类型
	 * @param {Function} callback - 回调函数
	 */
	off(event, callback) {
		if (this.listeners[event]) {
			const index = this.listeners[event].indexOf(callback);
			if (index > -1) {
				this.listeners[event].splice(index, 1);
			}
		}
	},
};

// ==================== 网络状态监听 ====================

export const network = {
	/**
	 * 获取当前网络状态
	 * @returns {Promise<Object>}
	 */
	getStatus() {
		return new Promise((resolve, reject) => {
			uni.getNetworkType({
				success: resolve,
				fail: reject,
			});
		});
	},

	/**
	 * 监听网络状态变化
	 * @param {Function} callback - 回调函数
	 * @returns {Function} 取消监听的函数
	 */
	onStatusChange(callback) {
		uni.onNetworkStatusChange?.(callback);

		// 返回取消监听函数
		return () => {
			uni.offNetworkStatusChange?.(callback);
		};
	},

	/**
	 * 检查是否为WiFi网络
	 */
	async isWiFi() {
		const res = await this.getStatus();
		return res.networkType === "wifi";
	},

	/**
	 * 检查网络是否可用
	 */
	async isConnected() {
		const res = await this.getStatus();
		return res.networkType !== "none";
	},
};

// ==================== 默认导出 ====================
export default {
	http,
	websocket,
	network,
};
