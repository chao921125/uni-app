/**
 * UniApp 工具函数集合模块
 * 功能：数据验证/格式化/加密/防抖节流/深拷贝等
 * 平台：全平台兼容
 */

import Platform from "./platform.js";

// ==================== 数据验证 ====================

export const validate = {
	/**
	 * 验证手机号
	 * @param {string} phone - 手机号
	 * @returns {boolean}
	 */
	isPhone(phone) {
		return /^1[3-9]\d{9}$/.test(phone);
	},

	/**
	 * 验证邮箱
	 * @param {string} email - 邮箱地址
	 * @returns {boolean}
	 */
	isEmail(email) {
		return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
	},

	/**
	 * 验证身份证号
	 * @param {string} idCard - 身份证号
	 * @returns {boolean}
	 */
	isIdCard(idCard) {
		return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idCard);
	},

	/**
	 * 验证URL
	 * @param {string} url - URL地址
	 * @returns {boolean}
	 */
	isUrl(url) {
		return /^https?:\/\/.+/.test(url);
	},

	/**
	 * 验证是否为空
	 * @param {any} value - 待验证值
	 * @returns {boolean}
	 */
	isEmpty(value) {
		if (value === null || value === undefined) return true;
		if (typeof value === "string") return value.trim() === "";
		if (Array.isArray(value)) return value.length === 0;
		if (typeof value === "object") return Object.keys(value).length === 0;
		return false;
	},

	/**
	 * 验证是否为数字
	 * @param {any} value - 待验证值
	 * @returns {boolean}
	 */
	isNumber(value) {
		return typeof value === "number" && !isNaN(value);
	},

	/**
	 * 验证是否为整数
	 * @param {any} value - 待验证值
	 * @returns {boolean}
	 */
	isInteger(value) {
		return Number.isInteger(value);
	},

	/**
	 * 验证是否为布尔值
	 * @param {any} value - 待验证值
	 * @returns {boolean}
	 */
	isBoolean(value) {
		return typeof value === "boolean";
	},

	/**
	 * 验证是否为对象
	 * @param {any} value - 待验证值
	 * @returns {boolean}
	 */
	isObject(value) {
		return value !== null && typeof value === "object" && !Array.isArray(value);
	},

	/**
	 * 验证是否为数组
	 * @param {any} value - 待验证值
	 * @returns {boolean}
	 */
	isArray(value) {
		return Array.isArray(value);
	},

	/**
	 * 验证是否为函数
	 * @param {any} value - 待验证值
	 * @returns {boolean}
	 */
	isFunction(value) {
		return typeof value === "function";
	},

	/**
	 * 验证是否为日期
	 * @param {any} value - 待验证值
	 * @returns {boolean}
	 */
	isDate(value) {
		return value instanceof Date && !isNaN(value.getTime());
	},

	/**
	 * 验证是否为JSON字符串
	 * @param {string} str - 待验证字符串
	 * @returns {boolean}
	 */
	isJSON(str) {
		try {
			JSON.parse(str);
			return true;
		} catch {
			return false;
		}
	},
};

// ==================== 数据格式化 ====================

export const format = {
	/**
	 * 格式化日期
	 * @param {Date|string|number} date - 日期
	 * @param {string} fmt - 格式字符串（默认：YYYY-MM-DD HH:mm:ss）
	 * @returns {string}
	 */
	date(date, fmt = "YYYY-MM-DD HH:mm:ss") {
		if (!date) return "";

		const d = new Date(date);
		if (isNaN(d.getTime())) return "";

		const o = {
			"M+": d.getMonth() + 1,
			"D+": d.getDate(),
			"h+": d.getHours() % 12 === 0 ? 12 : d.getHours() % 12,
			"H+": d.getHours(),
			"m+": d.getMinutes(),
			"s+": d.getSeconds(),
			"q+": Math.floor((d.getMonth() + 3) / 3),
			S: d.getMilliseconds(),
		};

		let result = fmt;

		if (/(Y+)/.test(result)) {
			result = result.replace(RegExp.$1, `${d.getFullYear()}`.substr(4 - RegExp.$1.length));
		}

		for (const k in o) {
			if (new RegExp(`(${k})`).test(result)) {
				result = result.replace(
					RegExp.$1,
					RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length),
				);
			}
		}

		return result;
	},

	/**
	 * 格式化金额
	 * @param {number} amount - 金额
	 * @param {number} decimals - 小数位数（默认2）
	 * @param {string} symbol - 货币符号（默认¥）
	 * @returns {string}
	 */
	money(amount, decimals = 2, symbol = "¥") {
		if (amount === null || amount === undefined) return `${symbol}0.00`;

		const num = parseFloat(amount);
		if (isNaN(num)) return `${symbol}0.00`;

		const formatted = num.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		return `${symbol}${formatted}`;
	},

	/**
	 * 格式化文件大小
	 * @param {number} bytes - 字节数
	 * @param {number} decimals - 小数位数（默认2）
	 * @returns {string}
	 */
	fileSize(bytes, decimals = 2) {
		if (bytes === 0) return "0 B";

		const k = 1024;
		const sizes = ["B", "KB", "MB", "GB", "TB"];
		const i = Math.floor(Math.log(bytes) / Math.log(k));

		return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
	},

	/**
	 * 格式化数字（千分位）
	 * @param {number} num - 数字
	 * @param {number} decimals - 小数位数
	 * @returns {string}
	 */
	number(num, decimals = 0) {
		if (num === null || num === undefined) return "0";

		const n = parseFloat(num);
		if (isNaN(n)) return "0";

		return n.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	},

	/**
	 * 格式化百分比
	 * @param {number} value - 数值（0-1）
	 * @param {number} decimals - 小数位数（默认0）
	 * @returns {string}
	 */
	percent(value, decimals = 0) {
		if (value === null || value === undefined) return "0%";

		const num = parseFloat(value);
		if (isNaN(num)) return "0%";

		return `${(num * 100).toFixed(decimals)}%`;
	},

	/**
	 * 格式化电话号码
	 * @param {string} phone - 手机号
	 * @returns {string} 例如：138****1234
	 */
	phone(phone) {
		if (!phone) return "";
		return phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
	},

	/**
	 * 格式化身份证号
	 * @param {string} idCard - 身份证号
	 * @returns {string} 例如：110***********1234
	 */
	idCard(idCard) {
		if (!idCard) return "";
		return idCard.replace(/(\d{3})\d{11}(\w{4})/, "$1***********$2");
	},

	/**
	 * 格式化姓名（隐藏中间字）
	 * @param {string} name - 姓名
	 * @returns {string} 例如：张*三
	 */
	name(name) {
		if (!name) return "";
		if (name.length <= 1) return name;
		if (name.length === 2) return `${name[0]}*`;
		return `${name[0]}*${name[name.length - 1]}`;
	},

	/**
	 * 相对时间格式化
	 * @param {Date|string|number} date - 日期
	 * @returns {string} 例如：刚刚、5分钟前、2小时前、昨天、3天前
	 */
	relativeTime(date) {
		if (!date) return "";

		const now = new Date();
		const target = new Date(date);
		const diff = now.getTime() - target.getTime();

		const seconds = Math.floor(diff / 1000);
		const minutes = Math.floor(seconds / 60);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);
		const months = Math.floor(days / 30);
		const years = Math.floor(months / 12);

		if (seconds < 60) return "刚刚";
		if (minutes < 60) return `${minutes}分钟前`;
		if (hours < 24) return `${hours}小时前`;
		if (days < 30) return `${days}天前`;
		if (months < 12) return `${months}个月前`;
		return `${years}年前`;
	},
};

// ==================== 防抖与节流 ====================

export const throttle = {
	/**
	 * 防抖函数
	 * @param {Function} fn - 目标函数
	 * @param {number} delay - 延迟时间（毫秒）
	 * @param {boolean} immediate - 是否立即执行
	 * @returns {Function}
	 */
	debounce(fn, delay = 300, immediate = false) {
		let timer = null;
		let executed = false;

		return function (...args) {
			const context = this;

			if (timer) clearTimeout(timer);

			if (immediate && !executed) {
				fn.apply(context, args);
				executed = true;
			}

			timer = setTimeout(() => {
				if (!immediate) {
					fn.apply(context, args);
				}
				executed = false;
				timer = null;
			}, delay);
		};
	},

	/**
	 * 节流函数
	 * @param {Function} fn - 目标函数
	 * @param {number} interval - 间隔时间（毫秒）
	 * @returns {Function}
	 */
	throttle(fn, interval = 300) {
		let lastTime = 0;
		let timer = null;

		return function (...args) {
			const context = this;
			const now = Date.now();
			const remaining = interval - (now - lastTime);

			if (timer) clearTimeout(timer);

			if (remaining <= 0) {
				lastTime = now;
				fn.apply(context, args);
			} else {
				timer = setTimeout(() => {
					lastTime = Date.now();
					fn.apply(context, args);
					timer = null;
				}, remaining);
			}
		};
	},

	/**
	 * 请求AnimationFrame节流
	 * @param {Function} fn - 目标函数
	 * @returns {Function}
	 */
	rafThrottle(fn) {
		let rafId = null;

		return function (...args) {
			const context = this;

			if (rafId) return;

			rafId = requestAnimationFrame(() => {
				fn.apply(context, args);
				rafId = null;
			});
		};
	},
};

// ==================== 深拷贝与合并 ====================

export const object = {
	/**
	 * 深拷贝
	 * @param {any} obj - 源对象
	 * @returns {any}
	 */
	deepClone(obj) {
		if (obj === null || typeof obj !== "object") return obj;
		if (obj instanceof Date) return new Date(obj.getTime());
		if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);
		if (obj instanceof Map) {
			const map = new Map();
			obj.forEach((val, key) => {
				map.set(key, this.deepClone(val));
			});
			return map;
		}
		if (obj instanceof Set) {
			const set = new Set();
			obj.forEach((val) => {
				set.add(this.deepClone(val));
			});
			return set;
		}

		const clone = Array.isArray(obj) ? [] : {};
		Object.keys(obj).forEach((key) => {
			clone[key] = this.deepClone(obj[key]);
		});

		return clone;
	},

	/**
	 * 深合并
	 * @param {Object} target - 目标对象
	 * @param {...Object} sources - 源对象
	 * @returns {Object}
	 */
	deepMerge(target, ...sources) {
		if (!sources.length) return target;

		const source = sources.shift();

		if (this.isObject(target) && this.isObject(source)) {
			Object.keys(source).forEach((key) => {
				if (this.isObject(source[key])) {
					if (!target[key]) Object.assign(target, { [key]: {} });
					this.deepMerge(target[key], source[key]);
				} else {
					Object.assign(target, { [key]: source[key] });
				}
			});
		}

		return this.deepMerge(target, ...sources);
	},

	/**
	 * 判断是否为对象
	 * @param {any} value - 待判断值
	 * @returns {boolean}
	 */
	isObject(value) {
		return value !== null && typeof value === "object" && !Array.isArray(value);
	},

	/**
	 * 扁平化对象
	 * @param {Object} obj - 源对象
	 * @param {string} prefix - 前缀
	 * @returns {Object}
	 */
	flatten(obj, prefix = "") {
		const result = {};

		Object.keys(obj).forEach((key) => {
			const value = obj[key];
			const newKey = prefix ? `${prefix}.${key}` : key;

			if (this.isObject(value) && !Array.isArray(value)) {
				Object.assign(result, this.flatten(value, newKey));
			} else {
				result[newKey] = value;
			}
		});

		return result;
	},

	/**
	 * 从扁平对象还原
	 * @param {Object} obj - 扁平对象
	 * @returns {Object}
	 */
	unflatten(obj) {
		const result = {};

		Object.keys(obj).forEach((key) => {
			const keys = key.split(".");
			let current = result;

			keys.forEach((k, index) => {
				if (index === keys.length - 1) {
					current[k] = obj[key];
				} else {
					current[k] = current[k] || {};
					current = current[k];
				}
			});
		});

		return result;
	},
};

// ==================== 数组工具 ====================

export const array = {
	/**
	 * 去重
	 * @param {Array} arr - 源数组
	 * @param {string} key - 去重字段（可选）
	 * @returns {Array}
	 */
	unique(arr, key) {
		if (!key) {
			return [...new Set(arr)];
		}

		const seen = new Map();
		return arr.filter((item) => {
			const value = item[key];
			if (seen.has(value)) return false;
			seen.set(value, true);
			return true;
		});
	},

	/**
	 * 分组
	 * @param {Array} arr - 源数组
	 * @param {Function|string} keyFn - 分组函数或字段名
	 * @returns {Object}
	 */
	groupBy(arr, keyFn) {
		const result = {};

		arr.forEach((item) => {
			const key = typeof keyFn === "function" ? keyFn(item) : item[keyFn];
			if (!result[key]) {
				result[key] = [];
			}
			result[key].push(item);
		});

		return result;
	},

	/**
	 * 树形结构转换
	 * @param {Array} list - 平铺列表
	 * @param {Object} options - 配置项
	 * @returns {Array}
	 */
	toTree(list, options = {}) {
		const {
			idKey = "id",
			parentKey = "parentId",
			childrenKey = "children",
			rootValue = 0,
		} = options;

		const map = {};
		const tree = [];

		// 创建映射
		list.forEach((item) => {
			map[item[idKey]] = { ...item, [childrenKey]: [] };
		});

		// 构建树
		list.forEach((item) => {
			const node = map[item[idKey]];
			const parent = map[item[parentKey]];

			if (parent) {
				parent[childrenKey].push(node);
			} else if (item[parentKey] === rootValue) {
				tree.push(node);
			}
		});

		return tree;
	},

	/**
	 * 树形结构扁平化
	 * @param {Array} tree - 树形数组
	 * @param {string} childrenKey - 子节点字段名
	 * @returns {Array}
	 */
	flattenTree(tree, childrenKey = "children") {
		const result = [];

		function traverse(nodes) {
			nodes.forEach((node) => {
				const { [childrenKey]: children, ...rest } = node;
				result.push(rest);
				if (children && children.length > 0) {
					traverse(children);
				}
			});
		}

		traverse(tree);
		return result;
	},

	/**
	 * 随机打乱数组
	 * @param {Array} arr - 源数组
	 * @returns {Array}
	 */
	shuffle(arr) {
		const result = [...arr];
		for (let i = result.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[result[i], result[j]] = [result[j], result[i]];
		}
		return result;
	},

	/**
	 * 求和
	 * @param {Array} arr - 数组
	 * @param {Function|string} iteratee - 迭代函数或字段名
	 * @returns {number}
	 */
	sum(arr, iteratee) {
		return arr.reduce((total, item) => {
			const value = typeof iteratee === "function" ? iteratee(item) : item[iteratee];
			return total + (parseFloat(value) || 0);
		}, 0);
	},

	/**
	 * 平均值
	 * @param {Array} arr - 数组
	 * @param {Function|string} iteratee - 迭代函数或字段名
	 * @returns {number}
	 */
	average(arr, iteratee) {
		if (arr.length === 0) return 0;
		return this.sum(arr, iteratee) / arr.length;
	},

	/**
	 * 最大值
	 * @param {Array} arr - 数组
	 * @param {Function|string} iteratee - 迭代函数或字段名
	 * @returns {number}
	 */
	max(arr, iteratee) {
		if (arr.length === 0) return -Infinity;
		return Math.max(...arr.map((item) => {
			const value = typeof iteratee === "function" ? iteratee(item) : item[iteratee];
			return parseFloat(value) || 0;
		}));
	},

	/**
	 * 最小值
	 * @param {Array} arr - 数组
	 * @param {Function|string} iteratee - 迭代函数或字段名
	 * @returns {number}
	 */
	min(arr, iteratee) {
		if (arr.length === 0) return Infinity;
		return Math.min(...arr.map((item) => {
			const value = typeof iteratee === "function" ? iteratee(item) : item[iteratee];
			return parseFloat(value) || 0;
		}));
	},
};

// ==================== 字符串工具 ====================

export const string = {
	/**
	 * 首字母大写
	 * @param {string} str - 源字符串
	 * @returns {string}
	 */
	capitalize(str) {
		if (!str) return "";
		return str.charAt(0).toUpperCase() + str.slice(1);
	},

	/**
	 * 驼峰转短横线
	 * @param {string} str - 源字符串
	 * @returns {string}
	 */
	camelToKebab(str) {
		return str.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
	},

	/**
	 * 短横线转驼峰
	 * @param {string} str - 源字符串
	 * @returns {string}
	 */
	kebabToCamel(str) {
		return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
	},

	/**
	 * 截断字符串
	 * @param {string} str - 源字符串
	 * @param {number} length - 最大长度
	 * @param {string} suffix - 后缀（默认...）
	 * @returns {string}
	 */
	truncate(str, length = 100, suffix = "...") {
		if (!str) return "";
		if (str.length <= length) return str;
		return str.slice(0, length) + suffix;
	},

	/**
	 * 去除HTML标签
	 * @param {string} html - HTML字符串
	 * @returns {string}
	 */
	stripHtml(html) {
		if (!html) return "";
		return html.replace(/<[^>]*>/g, "");
	},

	/**
	 * 生成随机字符串
	 * @param {number} length - 长度（默认32）
	 * @returns {string}
	 */
	random(length = 32) {
		const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		let result = "";
		for (let i = 0; i < length; i++) {
			result += chars.charAt(Math.floor(Math.random() * chars.length));
		}
		return result;
	},

	/**
	 * UUID v4
	 * @returns {string}
	 */
	uuid() {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			const r = (Math.random() * 16) | 0;
			const v = c === "x" ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	},
};

// ==================== 默认导出 ====================
export default {
	validate,
	format,
	throttle,
	object,
	array,
	string,
};
