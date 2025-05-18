import type { DrawInstance } from "./types";
export declare class Consola {
	private dp;
	private $color;
	constructor(dp: Partial<DrawInstance>);
	log: (message: string, color?: string, ...args: any[]) => void;
	success: (message: string, ...args: any[]) => void;
	error: (message: string, ...args: any[]) => void;
}
