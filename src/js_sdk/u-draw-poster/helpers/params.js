import { __spreadValues } from "../chunk-GSFXI7XO.js";
import { isMpWeixin } from "@uni-helper/uni-env";
import { isFunction, isObject, isString } from "../utils/is";
import { globalPlugins } from "./internal";
function helper(...args) {
	const _default = {
		selector: "",
		componentThis: void 0,
		type: isMpWeixin ? "2d" : "context",
		debug: false,
	};
	let _overrides;
	if (isObject(args[0])) {
		_overrides = args[0];
	} else if (isObject(args[1])) {
		_overrides = args[1];
		_overrides.selector = args[0];
	} else {
		_overrides = { selector: args[0] };
	}
	const options = __spreadValues(__spreadValues({}, _default), _overrides);
	options.selector = options.selector.replace("#", "");
	if (options.type === "2d") options.selector = `#${options.selector}`;
	return options;
}
function helperPluginParams(plugins, ...args) {
	if (!args[0]) throw new Error("DrawPoster Error: plugins arguments required");
	let _options = { name: "" };
	if (isString(args[0]) && isFunction(args[1])) {
		_options.name = args[0];
		_options.mounted = args[1];
	}
	if (isString(args[0]) && isObject(args[1])) _options = __spreadValues({ name: args[0] }, args[1]);
	if (isObject(args[0])) _options = args[0];
	if (![...globalPlugins, ...plugins].some((v) => _options.name === v.name)) {
		plugins.push(_options);
		return _options;
	}
	console.warn(`\u8BE5\u6269\u5C55\u5DF2\u5B58\u5728: ${_options.name}`);
}
export { helper, helperPluginParams };
