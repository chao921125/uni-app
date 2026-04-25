/**
 * 设备模块封装
 * 功能：系统信息/网络/蓝牙/传感器/生物认证等
 */

import { createModule } from "./promise.js";
import Platform from "./platform.js";

// 缓存系统信息，避免重复调用
let cachedSystemInfo = null;

// 封装规则
const rules = {
	// 微信小程序拆分获取（新 API 性能更好）
	getSystemInfo: {
		transform: async (res) => {
			if (Platform.is("mp-weixin")) {
				try {
					const [device, wind, app, auth, setting] = await Promise.all([
						uni.getDeviceInfo?.() || {},
						uni.getWindowInfo?.() || {},
						uni.getAppBaseInfo?.() || {},
						uni.getAppAuthorizeSetting?.() || {},
						uni.getSystemSetting?.() || {},
					]);
					return {
						...device,
						...wind,
						...app,
						...auth,
						...setting,
					};
				} catch {
					return res; // 降级返回原始结果
				}
			}
			return res;
		},
	},
	// 同步方法直接返回
	getSystemInfoSync: {},
	// 蓝牙类需要特殊处理
	openBluetoothAdapter: {
		errorHandler: (err) => {
			// 蓝牙不可用时的友好提示
			if (err?.errMsg?.includes("not supported")) {
				return new Error("当前设备不支持蓝牙功能");
			}
			return err;
		},
	},
	// 传感器类返回监听器
	onAccelerometerChange: {
		skipPromise: true,
	},
	onCompassChange: {
		skipPromise: true,
	},
	onGyroscopeChange: {
		skipPromise: true,
	},
};

const device = createModule(uni, rules);

// 增强 getSystemInfo
const originalGetSystemInfo = device.getSystemInfo;
device.getInfo = async (force = false) => {
	if (!force && cachedSystemInfo) return cachedSystemInfo;

	const info = await originalGetSystemInfo();
	cachedSystemInfo = {
		...info,
		// 计算衍生字段
		isNotch: info.screenHeight - (info.safeArea?.bottom || info.screenHeight) > 20,
		statusBarHeight: info.statusBarHeight || 0,
		navBarHeight: 44, // 标准导航栏高度
		totalHeaderHeight: (info.statusBarHeight || 0) + 44,
		// 平台标识
		platform: Platform.name,
		isMp: Platform.isMp(),
		isApp: Platform.isApp(),
		isH5: Platform.isH5(),
	};
	return cachedSystemInfo;
};

// 快捷判断方法
device.isAndroid = () => uni.getDeviceInfo?.()?.platform?.toLowerCase() === "android";
device.isIOS = () => uni.getDeviceInfo?.()?.platform?.toLowerCase() === "ios";
device.isPhone = () => {
	const model = (uni.getDeviceInfo?.()?.model || "").toLowerCase();
	return /iphone|android/.test(model);
};

// 网络状态监听封装
device.onNetworkChange = (callback) => {
	return uni.onNetworkStatusChange?.((res) => {
		callback({
			connected: res.isConnected,
			type: res.networkType, // wifi/2g/3g/4g/5g/unknown
			subtype: res.subtype, // 网络子类型
		});
	});
};

// 蓝牙工具方法
device.bluetooth = {
	// 初始化并检查可用性
	async init() {
		try {
			await device.openBluetoothAdapter();
			const state = await device.getBluetoothAdapterState();
			return state.available && state.discovering;
		} catch {
			return false;
		}
	},

	// 搜索设备（带超时）
	async search(timeout = 10000) {
		await device.startBluetoothDevicesDiscovery({
			allowDuplicatesKey: false,
		});

		return new Promise((resolve) => {
			const devices = [];
			const timer = setTimeout(() => {
				device.stopBluetoothDevicesDiscovery();
				resolve(devices);
			}, timeout);

			uni.onBluetoothDeviceFound?.(({ devices: found }) => {
				devices.push(...found);
			});
		});
	},
};

export default device;
