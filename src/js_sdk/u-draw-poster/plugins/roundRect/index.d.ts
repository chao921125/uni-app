import type { Plugin } from "../../core/plugin";
declare module "../../core/types" {
	interface CanvasContext {
		/**
		 * 绘制圆角矩形（原型）
		 */
		roundRect(x: number, y: number, w: number, h: number, r: number, fill?: boolean, stroke?: boolean): void;
	}
}
declare const _default: () => Plugin;
export default _default;
