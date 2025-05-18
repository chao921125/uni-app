import type { Plugin } from "../../core/plugin";
declare module "../../core/types" {
	interface CanvasContext {
		/** 绘制二维码
		 *
		 * 说明文档: https://tuimao233.gitee.io/mao-blog/my-extends/u-draw-poste
		 */
		drawQrCode(options: DrawQrCodeOptions): void;
	}
}
/** 绘制二维码配置 */
export interface DrawQrCodeOptions {
	text: string;
	x?: number;
	y?: number;
	size?: number;
	margin?: number;
	backgroundColor?: string;
	foregroundColor?: string;
}
export declare const errorCorrectLevel: {
	L: number;
	M: number;
	Q: number;
	H: number;
};
declare const _default: () => Plugin;
export default _default;
