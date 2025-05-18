import type { Plugin } from "./plugin";
import { Plugins } from "./plugin";
import type { DrawInstance, DrawOptions } from "./types";
/**
 * 创建 dp 绘制（仅支持 vue3 setup 中使用）
 * @param selector
 * @param options
 */
declare function useDraw(selector: string, options?: Partial<Omit<DrawOptions, "selector">>): DrawInstance;
declare function useDraw(options: DrawOptions): DrawInstance;
declare function createDraw(selector: string, options?: Partial<Omit<DrawOptions, "selector">>): DrawInstance;
declare function createDraw(options: DrawOptions): DrawInstance;
export { useDraw, createDraw, Plugins };
export type { Plugin, DrawOptions, DrawInstance };
