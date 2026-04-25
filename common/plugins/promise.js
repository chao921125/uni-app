/**
 * UniApp API Promise 化统一封装
 * 处理 Vue2/Vue3 返回格式差异 + 错误捕获 + 条件编译
 */

// Vue2/Vue3 格式检测
const isVue3 = typeof Promise !== "undefined" && Promise.toString().includes("[native code]");

/**
 * 将回调式 API 转为 Promise
 * @param {Function} apiFn - uni.xxx 函数
 * @param {Object} options - 调用参数
 * @param {Object} config - 配置项
 */
export function promisify(apiFn, options = {}, config = {}) {
	const {
		transform = (res) => res, // 响应转换器
		errorHandler = null, // 自定义错误处理
		skipPromise = false, // 跳过 Promise 化（用于 create/manager 类 API）
	} = config;

	// 如果传入回调参数，保持原始行为
	if (options.success || options.fail || options.complete) {
		return apiFn(options);
	}

	// 跳过 Promise 化的 API（如 createAnimation、getRecorderManager）
	if (skipPromise || typeof apiFn !== "function") {
		return apiFn(options);
	}

	return new Promise((resolve, reject) => {
		apiFn({
			...options,
			success: (res) => {
				try {
					const result = transform(res);
					// Vue2: [err, data], Vue3: data
					isVue3 ? resolve(result) : resolve([null, result]);
				} catch (e) {
					const err = errorHandler?.(e) || e;
					isVue3 ? reject(err) : resolve([err, null]);
				}
			},
			fail: (err) => {
				const error = errorHandler?.(err) || err;
				isVue3 ? reject(error) : resolve([error, null]);
			},
		});
	});
}

/**
 * 批量封装模块方法
 * @param {Object} apiModule - uni.xxx 模块
 * @param {Object} rules - 封装规则 { methodName: { transform, errorHandler, skipPromise } }
 */
export function createModule(apiModule, rules = {}) {
	const module = {};

	for (const [key, apiFn] of Object.entries(apiModule)) {
		if (typeof apiFn !== "function") {
			module[key] = apiFn;
			continue;
		}

		const rule = rules[key] || {};
		module[key] = (...args) => {
			// 同步方法（以 Sync 结尾）直接调用
			if (key.endsWith("Sync")) {
				return apiFn(...args);
			}
			// 参数处理：支持 (options) 或 (url, options) 等形式
			const options = args[0] && typeof args[0] === "object" && !Array.isArray(args[0]) ? args[0] : rule.paramsAdapter ? rule.paramsAdapter(...args) : {};

			return promisify(apiFn, options, rule);
		};
	}

	return module;
}

export default {
	promisify,
	createModule,
	isVue3,
};
