import type { DrawInstance } from "./types";
export interface DrawLifeCycle<I = Required<DrawInstance>, O = Record<string, any>> {
	(instance: I, options?: O): void;
}
export interface DrawLifeCycles {
	/** 创建实例前 */
	beforeMount?: DrawLifeCycle<Partial<DrawInstance>>;
	/** 创建实例后 */
	mounted?: DrawLifeCycle;
	/** 卸载实例前 */
	beforeUnmount?: DrawLifeCycle;
	/** 卸载实例后 */
	unmounted?: DrawLifeCycle;
	/** 创建绘图前 */
	beforeCreate?: DrawLifeCycle;
	/** 创建绘图后 */
	created?: DrawLifeCycle;
}
export interface Plugin extends DrawLifeCycles {
	/** 扩展名称 */
	name: string;
}
export interface PluginUse {
	(name: string, lifeCycle: DrawLifeCycle): void;
	(name: string, options: DrawLifeCycles): void;
	(options: Plugin): void;
}
export declare class Plugins {
	dp: Partial<DrawInstance>;
	/** 当前示例中挂在的所有 plugins （不包含 global plugins） */
	private $plugins;
	/** 当前示例中挂在的所有 plugins（包含 global plugins） */
	get plugins(): Plugin[];
	constructor(dp: Partial<DrawInstance>);
	/**
	 * 全局插件挂载
	 * @param args
	 */
	static use: PluginUse;
	/**
	 * 局部插件挂载
	 * @param args
	 */
	use: PluginUse;
	run: (lifeCycleName: keyof DrawLifeCycles) => void;
}
