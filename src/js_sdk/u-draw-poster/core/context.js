import { __async } from "../chunk-GSFXI7XO.js";
import { getCurrentInstance, setCurrentInstance } from "../helpers/internal";
import { createAnimationFrame, promisify, queryFields } from "../utils";
import { Consola } from "./consola";
import { Plugins } from "./plugin";
import DrawProcess from "./process";
function createContext(options, wait) {
	const instance = getCurrentInstance(options.selector);
	if (instance) return instance;
	const context = { $options: options };
	const ps = new Plugins(context);
	const consola = new Consola(context);
	const pcs = new DrawProcess(context, consola);
	Object.assign(context, {
		id: options.selector,
		plugins: ps.plugins,
		renderAnimation,
		mount,
	});
	function build() {
		return __async(this, null, function* () {
			var _a;
			const { $instance, $options } = context;
			const { selector = "", componentThis } = $options || {};
			if ($instance) return yield $instance;
			const nodeInfo = yield queryFields(selector, componentThis, { node: true, size: true });
			const { width, height } = nodeInfo;
			const canvas = (nodeInfo == null ? void 0 : nodeInfo.node) || {};
			const ctx = ((_a = canvas.getContext) == null ? void 0 : _a.call(canvas, "2d")) || uni.createCanvasContext(selector, componentThis);
			if (width && height) {
				canvas.width = width;
				canvas.height = height;
			}
			return { canvas, ctx };
		});
	}
	let locked = false;
	function mount() {
		return __async(this, null, function* () {
			if (locked) return ready();
			locked = true;
			ps.run("beforeMount");
			Object.assign(context, { render, create, ready });
			Object.assign(context, { draw: pcs.push, stop: pcs.stop, use: ps.use });
			yield wait == null ? void 0 : wait();
			const { canvas, ctx } = yield build();
			Object.assign(context, { canvas, ctx });
			ps.run("mounted");
			resolved(context);
			return context;
		});
	}
	function ready() {
		return __async(this, null, function* () {
			yield promised;
			return context;
		});
	}
	function render() {
		return __async(this, null, function* () {
			yield ready();
			yield pcs.walk();
			if (options.type === "context") yield new Promise((resolve) => context.ctx.draw(true, resolve));
		});
	}
	function renderAnimation(renderer) {
		const { cancelAnimationFrame, requestAnimationFrame } = createAnimationFrame(context.canvas);
		const timer = requestAnimationFrame(() =>
			__async(this, null, function* () {
				yield ready();
				yield renderer();
				yield pcs.runs();
			}),
		);
		return () => cancelAnimationFrame(timer);
	}
	function create() {
		return __async(this, arguments, function* (overrides = {}) {
			if (pcs.stacks.length > 0) yield context.render();
			const config = overrides;
			if (options.type === "2d") config.canvas = context.canvas;
			if (options.type === "context") config.canvasId = context.id;
			const { tempFilePath } = yield promisify(uni.canvasToTempFilePath)(config);
			return tempFilePath;
		});
	}
	let resolved;
	let promised = new Promise((resolve) => (resolved = resolve));
	setCurrentInstance(context, ps);
	return context;
}
export { createContext };
