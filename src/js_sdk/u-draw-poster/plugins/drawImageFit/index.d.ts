import type { Plugin } from "../../core/plugin";
import type { ObjectFit, ObjectPosition, Size } from "./object-sizing";
declare module "../../core/types" {
	interface CanvasContext {
		/** 绘制 Object-Fit 模式图片
		 *
		 * 说明文档: https://tuimao233.gitee.io/mao-blog/my-extends/u-draw-poste
		 */
		drawImageFit(url: string, opts?: ImageFitOption): Promise<boolean>;
	}
}
export interface ImageFitOption {
	radius?: number;
	objectFit?: ObjectFit;
	intrinsicSize?: Size;
	specifiedSize?: Size;
	intrinsicPosition?: ObjectPosition;
	specifiedPosition?: [number, number];
}
declare const _default: () => Plugin;
export default _default;
