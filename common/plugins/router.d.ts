// utils/router.d.ts

export interface NavigateOptions {
	params?: Record<string, any>;
	auth?: boolean;
	loginPath?: string;
	animationType?: "slide-in-right" | "slide-in-left" | "slide-in-top" | "slide-in-bottom" | "pop-in" | "fade-in" | "zoom-out" | "zoom-fade-out" | "none";
	animationDuration?: number;
	events?: Record<string, (args: any) => void>;
	success?: (res: any) => void;
	fail?: (err: any) => void;
	complete?: (res: any) => void;
}

export interface BackOptions {
	delta?: number;
	animationType?: "pop-out" | "slide-out-right" | "slide-out-left" | "slide-out-top" | "slide-out-bottom" | "fade-out" | "zoom-in" | "zoom-fade-in" | "none";
	animationDuration?: number;
	success?: (res: any) => void;
	fail?: (err: any) => void;
	complete?: (res: any) => void;
}

export interface EventChannel {
	emit(eventName: string, args: any): this;
	on(eventName: string, fn: (args: any) => void): this;
	once(eventName: string, fn: (args: any) => void): this;
	off(eventName: string, fn?: (args: any) => void): this;
	getTask(): any;
}

export interface NavigateResult {
	eventChannel?: EventChannel;
	[key: string]: any;
}

export interface RouterAPI {
	// 配置
	config(newConfig: Partial<{ whiteList: string[]; animation: any; maxStack: number; loginPath: string }>): RouterAPI;

	// 核心方法
	navigateTo(url: string, options?: NavigateOptions): Promise<NavigateResult>;
	redirectTo(url: string, options?: NavigateOptions): Promise<any>;
	reLaunch(url: string, options?: NavigateOptions): Promise<any>;
	switchTab(url: string, options?: Omit<NavigateOptions, "params">): Promise<any>;
	navigateBack(options?: BackOptions): Promise<any>;

	// 便捷方法
	to(url: string, opts?: NavigateOptions): Promise<NavigateResult>;
	replace(url: string, opts?: NavigateOptions): Promise<any>;
	relaunch(url: string, opts?: NavigateOptions): Promise<any>;
	tab(url: string, opts?: Omit<NavigateOptions, "params">): Promise<any>;
	back(delta?: number): Promise<any>;

	// 页面栈管理
	getPages(): UniApp.Page[];
	getCurrentPage(): UniApp.Page | null;
	getCurrentPath(): string;
	getParams(): Record<string, string>;
	getPrevPage(delta?: number): UniApp.Page | null;
	isHome(): boolean;

	// 参数工具
	encodeParams(params: Record<string, any>): string;
	decodeParams(query: string): Record<string, string>;
	buildPath(path: string, params: Record<string, any>): string;

	// 预加载
	preload(url: string): Promise<void> | null;
}

declare const router: RouterAPI;
export default router;
