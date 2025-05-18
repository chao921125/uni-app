import "../chunk-GSFXI7XO.js";
class Consola {
	constructor(dp) {
		this.dp = dp;
		this.$color = "#3489fd";
		this.log = (message, color = this.$color, ...args) => {
			var _a, _b;
			if (!((_b = (_a = this.dp) == null ? void 0 : _a.$options) == null ? void 0 : _b.debug)) return;
			console.log(`%c${this.dp.id} -> ${message}`, `color: ${color}`, ...args);
		};
		this.success = (message, ...args) => {
			this.log(`\u{1F389} ${message}`, "#19be6b", ...args);
		};
		this.error = (message, ...args) => {
			this.log(`\u{1F389} ${message}`, "#fa3534", ...args);
		};
	}
}
export { Consola };
