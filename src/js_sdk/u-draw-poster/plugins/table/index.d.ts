import type { Plugin } from "../../core/plugin";
declare module "../../core/types" {
	interface DrawInstance {
		createLayer: (afterOptions: CreateLayerOptions, rowList: DrawRowOpt[]) => number;
		table: {
			height: number;
			padding: number;
			margin: number;
		};
	}
}
export interface CreateLayerOptions {
	background?: string;
	self?: boolean;
	line?: boolean;
	lineHeight?: number;
}
export interface DrawRowOpt {
	text?: string;
	font?: string;
	color?: string;
	align?: "left" | "center" | "right";
	width?: number;
}
declare const _default: (options?: { height?: number; padding?: number; margin?: number }) => Plugin;
export default _default;
