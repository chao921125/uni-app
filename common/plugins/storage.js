/**
 * UniApp 缓存工具模块（生产级优化版）
 * 功能：异步 Promise / 同步操作 / 过期时间 / 批量操作 / 类型安全
 */

// ==================== 内部工具函数 ====================
import Constants from "@/common/utils/constants.js";

/**
 * 安全序列化：统一处理所有类型
 */
function serialize(value) {
	try {
		// 原始类型直接转字符串，避免 "true" -> true 的歧义
		if (value === null || value === undefined) {
			return JSON.stringify({
				__value: value,
				__type: "null",
			});
		}
		if (typeof value !== "object") {
			return JSON.stringify({
				__value: value,
				__type: typeof value,
			});
		}
		// 对象/数组直接序列化
		return JSON.stringify(value);
	} catch (e) {
		console.warn("[Storage] Serialize failed:", e);
		return JSON.stringify({
			__value: null,
			__type: "error",
		});
	}
}

/**
 * 安全反序列化：自动识别类型 + 捕获异常
 */
function deserialize(raw) {
	if (typeof raw !== "string") return raw;

	try {
		const parsed = JSON.parse(raw);

		// 兼容旧数据（直接存的对象/字符串）
		if (parsed && typeof parsed === "object" && "__value" in parsed) {
			const { __value, __type } = parsed;
			// 还原原始类型
			if (__type === "number" && typeof __value === "string") {
				return Number(__value);
			}
			if (__type === "boolean") {
				return Boolean(__value);
			}
			if (__type === "null") {
				return null;
			}
			return __value;
		}

		// 旧格式：直接返回解析结果
		return parsed;
	} catch {
		// 解析失败返回原始字符串
		return raw;
	}
}

/**
 * 校验缓存是否过期
 */
function isExpired(item) {
	if (!item?.expire) return false;
	return Date.now() > item.expire;
}

/**
 * 包装带过期时间的数据
 */
function wrapWithExpire(value, expireSeconds) {
	if (!expireSeconds)
		return {
			value,
		};
	return {
		value,
		expire: Date.now() + expireSeconds * 1000,
	};
}

// ==================== 异步方法（Promise 化） ====================

export const storage = {
	/**
	 * 异步设置缓存
	 * @param {string} key - 缓存键
	 * @param {any} value - 缓存值（支持任意类型）
	 * @param {number} expire - 过期时间（秒），可选
	 */
	async set(key, value, expire = null) {
		const data = serialize(wrapWithExpire(value, expire));
		return new Promise((resolve, reject) => {
			uni.setStorage({
				key,
				data,
				success: () => resolve(true),
				fail: (err) => {
					console.error("[Storage] set failed:", err);
					reject(err);
				},
			});
		});
	},

	/**
	 * 异步获取缓存
	 * @param {string} key - 缓存键
	 * @returns {Promise<any>} 缓存值，不存在或过期返回 null
	 */
	async get(key) {
		return new Promise((resolve) => {
			uni.getStorage({
				key,
				success: (res) => {
					const item = deserialize(res.data);
					// 校验过期
					if (isExpired(item)) {
						this.remove(key); // 自动清理
						resolve(null);
					} else {
						resolve(item.value ?? item); // 兼容无过期时间的旧数据
					}
				},
				fail: () => resolve(null),
			});
		});
	},

	/**
	 * 异步删除缓存
	 */
	async remove(key) {
		return new Promise((resolve) => {
			uni.removeStorage({
				key,
				success: () => resolve(true),
				fail: () => resolve(false),
			});
		});
	},

	/**
	 * 异步清空所有缓存
	 */
	async clear() {
		return new Promise((resolve) => {
			uni.clearStorage({
				success: () => resolve(true),
				fail: () => resolve(false),
			});
		});
	},

	/**
	 * 异步批量设置缓存
	 * @param {Object} data - { key1: value1, key2: { value, expire } }
	 */
	async setMulti(data) {
		const tasks = Object.entries(data).map(([key, item]) => {
			const value = item?.value ?? item;
			const expire = item?.expire ?? null;
			return this.set(key, value, expire);
		});
		return Promise.all(tasks);
	},

	/**
	 * 异步批量获取缓存
	 * @param {string[]} keys - 缓存键数组
	 * @returns {Promise<Object>} { key1: value1, key2: value2 }
	 */
	async getMulti(keys) {
		const tasks = keys.map((key) =>
			this.get(key).then((value) => ({
				key,
				value,
			})),
		);
		const results = await Promise.all(tasks);
		return results.reduce((acc, { key, value }) => {
			acc[key] = value;
			return acc;
		}, {});
	},

	// ==================== 同步方法（保持原有签名） ====================

	setSync(key, value, expire = null) {
		try {
			const data = serialize(wrapWithExpire(value, expire));
			uni.setStorageSync(key, data);
			return true;
		} catch (e) {
			console.error("[Storage] setSync failed:", e);
			return false;
		}
	},

	getSync(key) {
		try {
			const raw = uni.getStorageSync(key);
			if (raw === "" || raw == null) return null;

			const item = deserialize(raw);
			if (isExpired(item)) {
				this.removeSync(key);
				return null;
			}
			return item.value ?? item;
		} catch {
			return null;
		}
	},

	removeSync(key) {
		try {
			uni.removeStorageSync(key);
			return true;
		} catch {
			return false;
		}
	},

	clearSync() {
		try {
			uni.clearStorageSync();
			return true;
		} catch {
			return false;
		}
	},

	// ==================== 辅助方法 ====================

	/**
	 * 检查缓存是否存在（不过期）
	 */
	async has(key) {
		const value = await this.get(key);
		return value !== null;
	},

	/**
	 * 同步检查缓存是否存在
	 */
	hasSync(key) {
		return this.getSync(key) !== null;
	},

	/**
	 * 获取缓存剩余时间（秒），不存在返回 -1
	 */
	async getExpire(key) {
		try {
			const raw = await new Promise((resolve) => {
				uni.getStorage({
					key,
					success: (res) => resolve(res.data),
					fail: () => resolve(null),
				});
			});
			if (!raw) return -1;

			const item = deserialize(raw);
			if (!item?.expire) return -1;
			if (isExpired(item)) return -1;

			return Math.floor((item.expire - Date.now()) / 1000);
		} catch {
			return -1;
		}
	},

	/**
	 * 调试：打印所有缓存键（开发环境用）
	 */
	debug() {
		if (process?.env?.NODE_ENV !== "development") return;

		uni.getStorageInfo({
			success: (res) => {
				console.group("🗄️ Storage Debug");
				console.log("Keys:", res.keys);
				console.log("CurrentSize:", res.currentSize, "KB");
				console.log("LimitSize:", res.limitSize, "KB");
				console.groupEnd();
			},
		});
	},
	setToken(value) {
		this.setSync(Constants.key.Token, value);
	},
	getToken() {
		this.getSync(Constants.key.Token);
	},
	setUser(value) {
		this.setSync(Constants.key.UserInfo, value);
	},
	getUser() {
		this.getSync(Constants.key.UserInfo);
	},
};

// ==================== 默认导出（兼容旧写法） ====================
export default storage;
