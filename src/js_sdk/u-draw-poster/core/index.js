import { __spreadValues } from "../chunk-GSFXI7XO.js";
import { onReady } from "../helpers/internal";
import { helper } from "../helpers/params";
import { createContext } from "./context";
import { Plugins } from "./plugin";
function useDraw(...args) {
	const dp = createContext(helper(...args), onReady);
	dp.mount();
	return dp;
}
function createDraw(...args) {
	const options = __spreadValues({ immediate: true }, helper(...args));
	const dp = createContext(options);
	if (options.immediate) dp.mount();
	return dp;
}
export { Plugins, createDraw, useDraw };
