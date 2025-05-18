import type { Consola } from "./consola";
import type { DrawInstance } from "./types";
declare class DrawProcess {
	dp: Partial<DrawInstance>;
	consola: Consola;
	/** 进程堆栈 */
	stacks: Array<() => Promise<any>>;
	/** 是否阻止运行 */
	prevent: boolean;
	constructor(dp: Partial<DrawInstance>, consola: Consola);
	push: (callback: Function) => void;
	stop(): void;
	walk(): Promise<void>;
	runs(): Promise<void>;
}
export default DrawProcess;
