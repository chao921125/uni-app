import type { Plugin } from "../../core/plugin";
declare module "../../core/types" {
	interface CanvasContext {
		/** 绘制圆角矩形（填充）
		 *
		 * 说明文档: https://tuimao233.gitee.io/mao-blog/my-extends/u-draw-poste
		 */
		fillRoundRect(x: number, y: number, w: number, h: number, r: number): void;
	}
}
declare const _default: () => Plugin;
export default _default;
