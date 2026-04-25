/**
 * UniApp 插件统一导出
 * 方便一次性导入所有模块（不推荐，建议按需导入）
 */

// 基础模块
export { default as platform } from "./platform.js";
export { default as promise } from "./promise.js";
export { default as device } from "./device.js";
export { default as system } from "./system.js";

// 业务模块
export { default as storage } from "./storage.js";
export { Router, EventChannel } from "./router.js";
export { Permission, PermissionStatus } from "./permission.js";

// 增强模块
export { http, websocket, network } from "./network.js";
export { default as media } from "./media.js";
export { UI } from "./ui.js";
export { default as location } from "./location.js";

// 工具模块
export { default as utils } from "./utils.js";
export { validate, format, throttle, object, array, string } from "./utils.js";

// 默认导出（兼容旧写法）
export default {
	platform,
	promise,
	device,
	system,
	storage,
	Router,
	EventChannel,
	Permission,
	PermissionStatus,
	http,
	websocket,
	network,
	media,
	UI,
	location,
	utils,
	validate,
	format,
	throttle,
	object,
	array,
	string,
};
