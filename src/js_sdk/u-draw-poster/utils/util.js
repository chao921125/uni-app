import { __async, __spreadProps, __spreadValues } from "../chunk-GSFXI7XO.js";
function promisify(api) {
	return (...args) =>
		__async(this, null, function* () {
			return new Promise((resolve, reject) => {
				const [options, ...other] = args;
				api(__spreadProps(__spreadValues({}, options), { success: resolve, fail: reject }), ...other);
			});
		});
}
function queryFields(selector, componentThis, options) {
	const query = componentThis ? uni.createSelectorQuery().in(componentThis) : uni.createSelectorQuery();
	return new Promise((resolve) => {
		query
			.select(selector)
			.fields(options || {}, (result) => {
				if (Array.isArray(result)) result = result[0];
				resolve(result);
			})
			.exec();
	});
}
function createAnimationFrame(canvas) {
	let requestAnimationFrame = (callback) => {
		return setInterval(callback, 60);
	};
	let cancelAnimationFrame = clearInterval;
	requestAnimationFrame = (canvas == null ? void 0 : canvas.requestAnimationFrame) || (window == null ? void 0 : window.requestAnimationFrame) || requestAnimationFrame;
	cancelAnimationFrame = (canvas == null ? void 0 : canvas.cancelAnimationFrame) || (window == null ? void 0 : window.cancelAnimationFrame) || cancelAnimationFrame;
	return { requestAnimationFrame, cancelAnimationFrame };
}
export { createAnimationFrame, promisify, queryFields };
