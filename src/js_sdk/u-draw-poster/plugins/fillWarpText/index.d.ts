import type { Plugin } from "../../core/plugin";
declare module "../../core/types" {
	interface TextInfo {
		text: string;
		y: number;
		x: number;
		w: number;
		h: number;
	}
	interface CanvasContext {
		/** 绘制二维码
		 *
		 * 说明文档: https://tuimao233.gitee.io/mao-blog/my-extends/u-draw-poste
		 */
		fillWarpText(options: FillWarpTextOptions): TextInfo[];
	}
}
/** 绘制换行配置 */
export interface FillWarpTextOptions {
	content: string;
	maxWidth?: number;
	lineHeight?: number;
	layer?: number;
	x?: number;
	y?: number;
	separator?: string;
	draw?: boolean;
}
declare const _default: () => Plugin;
export default _default;
