import type { Plugin, Plugins } from "../core/plugin";
import type { DrawInstance } from "../core/types";
export declare const globalPlugins: Plugin[];
export declare function getCurrentInstance(selector: string): DrawInstance;
export declare function setCurrentInstance(dp: Partial<DrawInstance>, ps: Plugins): void;
export declare function onReady(callback?: Function): void;
