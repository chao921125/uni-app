// utils/permission.d.ts

export enum PermissionStatus {
	NOT_SUPPORTED = -2, // 平台不支持
	ERROR = -1, // 检查/请求过程出错
	NOT_DETERMINED = 0, // 未请求/用户未决定
	AUTHORIZED = 1, // 已授权
	DENIED = 2, // 用户拒绝（可再次请求）
	RESTRICTED = 3, // 系统限制/永久拒绝/功能关闭
	LIMITED = 4, // iOS 14+ 部分授权（相册）
}

export type PermissionKey = "location" | "locationBackground" | "camera" | "record" | "album" | "bluetooth" | "notification" | "calendar" | "contact" | "phone" | "sms";

export interface PermissionConfig {
	mp: string | null;
	android: string | string[];
	ios: string | null;
	desc: string;
}

export interface PermissionOptions {
	tip?: string;
	autoOpenSetting?: boolean;
	stopOnFail?: boolean;
}

export interface PermissionResult {
	success: PermissionKey[];
	failed: Record<PermissionKey, PermissionStatus>;
}

export interface PlatformInfo {
	name: string;
	isMp(): boolean;
	isApp(): boolean;
	isH5(): boolean;
	isIOS(): boolean;
	isAndroid(): boolean;
}

export interface PermissionAPI {
	// 核心方法
	check(key: PermissionKey): Promise<PermissionStatus>;
	request(key: PermissionKey, options?: PermissionOptions): Promise<PermissionStatus>;
	checkMulti(keys: PermissionKey[]): Promise<Record<PermissionKey, PermissionStatus>>;
	requestMulti(keys: PermissionKey[], options?: PermissionOptions): Promise<PermissionResult>;
	ensure(key: PermissionKey, options?: PermissionOptions): Promise<boolean>;

	// 辅助方法
	openAppSetting(): void;
	getStatusText(key: PermissionKey, status: PermissionStatus): string;

	// 导出
	Status: typeof PermissionStatus;
	Platform: PlatformInfo;
}

declare const permission: PermissionAPI;
export default permission;
