/**
 * UniApp 全局错误处理工具
 * 功能：捕获未处理的Promise错误、统一错误上报
 */

export const errorHandler = {
	/**
	 * 初始化全局错误处理
	 */
	init() {
		// #ifndef H5
		// 小程序和App环境
		if (typeof Promise !== "undefined") {
			const originalThen = Promise.prototype.then;
			const originalCatch = Promise.prototype.catch;

			// 拦截 Promise.prototype.then
			Promise.prototype.then = function (onFulfilled, onRejected) {
				return originalThen.call(
					this,
					onFulfilled,
					onRejected ||
						function (reason) {
							// 如果没有提供 rejection 处理器，记录错误
							errorHandler.log("Unhandled Promise Rejection in .then()", reason);
							throw reason;
						},
				);
			};

			// 拦截 Promise.prototype.catch
			Promise.prototype.catch = function (onRejected) {
				return originalCatch.call(this, function (reason) {
					// 如果 catch 中也没有处理，记录错误
					if (!onRejected) {
						errorHandler.log("Unhandled Promise Rejection in .catch()", reason);
						throw reason;
					}
					return onRejected(reason);
				});
			};
		}
		// #endif

		// #ifdef H5
		// H5环境使用 window.onerror 和 unhandledrejection
		window.addEventListener("unhandledrejection", (event) => {
			errorHandler.log("Unhandled Rejection (H5)", event.reason);
			// 阻止默认行为（控制台错误）
			event.preventDefault();
		});

		window.addEventListener("error", (event) => {
			errorHandler.log("Global Error (H5)", event.error || event.message);
		});
		// #endif

		console.log("[ErrorHandler] Global error handler initialized");
	},

	/**
	 * 记录错误
	 * @param {string} type - 错误类型
	 * @param {any} error - 错误对象
	 */
	log(type, error) {
		const errorInfo = {
			type,
			message: error?.message || String(error),
			stack: error?.stack,
			timestamp: new Date().toISOString(),
		};

		// 开发环境：详细日志
		// #ifdef DEV
		console.error(`[${type}]`, error);
		if (error?.stack) {
			console.error("Stack:", error.stack);
		}
		// #endif

		// 生产环境：简化日志
		// #ifndef DEV
		console.error(`[${type}]`, errorInfo.message);
		// #endif

		// 这里可以集成错误上报服务
		// errorHandler.report(errorInfo);
	},

	/**
	 * 上报错误到服务器（可选）
	 * @param {Object} errorInfo - 错误信息
	 */
	async report(errorInfo) {
		try {
			// 示例：上报到错误监控服务
			// await uni.request({
			//   url: 'https://your-error-tracking.com/api/errors',
			//   method: 'POST',
			//   data: errorInfo
			// });
		} catch (e) {
			// 上报失败不应影响主流程
			console.warn("Error report failed:", e);
		}
	},

	/**
	 * 安全执行异步函数，捕获所有错误
	 * @param {Function} fn - 异步函数
	 * @param {Function} onError - 错误回调
	 * @returns {Promise<any>}
	 */
	async safeExecute(fn, onError) {
		try {
			return await fn();
		} catch (error) {
			errorHandler.log("SafeExecute Error", error);
			if (onError) {
				onError(error);
			}
			return null;
		}
	},

	/**
	 * 批量安全执行
	 * @param {Array<Function>} fns - 异步函数数组
	 * @returns {Promise<Array>}
	 */
	async safeExecuteAll(fns) {
		const results = [];
		for (const fn of fns) {
			try {
				results.push(await fn());
			} catch (error) {
				errorHandler.log("SafeExecuteAll Error", error);
				results.push(null);
			}
		}
		return results;
	},
};

export default errorHandler;
