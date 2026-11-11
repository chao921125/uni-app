/**
 * UniApp 权限校验模块（仅小程序端，基于 uni.getSetting/uni.authorize 通用封装）
 * 功能：权限状态检查 / 权限请求 / 跳转设置页 / 批量校验
 * 状态码：-2=不支持 | -1=错误 | 0=未请求 | 1=已授权 | 2=已拒绝 | 3=系统关闭
 */
import Platform from "./platform";

// ==================== 状态码枚举 ====================
export const PermissionStatus = {
	NOT_SUPPORTED: -2, // 平台不支持
	ERROR: -1, // 检查/请求过程出错
	NOT_DETERMINED: 0, // 未请求/用户未决定
	AUTHORIZED: 1, // 已授权
	DENIED: 2, // 用户拒绝（可再次请求）
	RESTRICTED: 3, // 系统限制/永久拒绝/功能关闭
};

// ==================== 权限映射表（小程序 scope） ====================
const PERMISSION_MAP = {
	location: {
		mp: "scope.userLocation",
		desc: "地理位置",
	},
	locationBackground: {
		mp: "scope.userLocationBackground",
		desc: "后台定位",
	},
	camera: {
		mp: "scope.camera",
		desc: "相机",
	},
	record: {
		mp: "scope.record",
		desc: "麦克风",
	},
	album: {
		mp: "scope.writePhotosAlbum",
		desc: "相册",
	},
	bluetooth: {
		mp: "scope.bluetooth",
		desc: "蓝牙",
	},
	notification: {
		mp: "scope.notification",
		desc: "通知推送",
	},
	calendar: {
		mp: null, // 小程序不支持
		desc: "日历",
	},
	contact: {
		mp: "scope.addressBook",
		desc: "通讯录",
	},
};

// ==================== 小程序权限检查 ====================
const MpChecker = {
	// 检查 scope 权限状态
	async check(scope) {
		if (!scope) return PermissionStatus.NOT_SUPPORTED;

		return new Promise((resolve) => {
			uni.getSetting?.({
				success: (res) => {
					const auth = res.authSetting?.[scope];
					if (auth === true) resolve(PermissionStatus.AUTHORIZED);
					else if (auth === false) resolve(PermissionStatus.DENIED);
					else resolve(PermissionStatus.NOT_DETERMINED);
				},
				fail: () => resolve(PermissionStatus.ERROR),
			}) || resolve(PermissionStatus.NOT_SUPPORTED);
		});
	},
};

// ==================== 核心权限模块 ====================
export const Permission = {
	/**
	 * 检查单个权限状态
	 * @param {string} key - 权限标识 (location/camera/album 等)
	 * @returns {Promise<number>} PermissionStatus
	 */
	async check(key) {
		const config = PERMISSION_MAP[key];
		if (!config) return PermissionStatus.NOT_SUPPORTED;
		return MpChecker.check(config.mp);
	},

	/**
	 * 请求单个权限
	 * @param {string} key - 权限标识
	 * @param {Object} options - 配置项
	 * @returns {Promise<number>} PermissionStatus
	 */
	async request(key, options = {}) {
		const { tip = `需要${PERMISSION_MAP[key]?.desc || "此"}权限才能正常使用` } = options;
		const current = await this.check(key);

		// 已授权直接返回
		if (current === PermissionStatus.AUTHORIZED) {
			return PermissionStatus.AUTHORIZED;
		}

		// 系统关闭/永久拒绝，引导去设置页
		if (current === PermissionStatus.RESTRICTED) {
			if (options.autoOpenSetting !== false) {
				uni.showModal?.({
					title: "权限受限",
					content: `${tip}，请在系统设置中开启`,
					confirmText: "去设置",
					cancelText: "取消",
					success: (res) => {
						if (res.confirm) this.openAppSetting();
					},
				});
			}
			return PermissionStatus.RESTRICTED;
		}

		const config = PERMISSION_MAP[key];
		if (!config?.mp) return PermissionStatus.NOT_SUPPORTED;

		return new Promise((resolve) => {
			uni.authorize?.({
				scope: config.mp,
				success: () => resolve(PermissionStatus.AUTHORIZED),
				fail: (err) => {
					// 用户拒绝，引导去设置
					if (err?.errMsg?.includes("deny")) {
						uni.showModal?.({
							title: "权限请求",
							content: tip,
							confirmText: "去设置",
							success: (res) => {
								if (res.confirm) this.openAppSetting();
								resolve(PermissionStatus.DENIED);
							},
						});
					} else {
						resolve(PermissionStatus.DENIED);
					}
				},
			}) || resolve(PermissionStatus.NOT_SUPPORTED);
		});
	},

	/**
	 * 批量检查权限
	 * @param {string[]} keys - 权限标识数组
	 * @returns {Promise<Record<string, number>>} { location: 1, camera: 0, ... }
	 */
	async checkMulti(keys) {
		const results = {};
		await Promise.all(
			keys.map(async (key) => {
				results[key] = await this.check(key);
			}),
		);
		return results;
	},

	/**
	 * 批量请求权限（按顺序，遇到拒绝则停止）
	 * @param {string[]} keys - 权限标识数组
	 * @param {Object} options - 配置项
	 * @returns {Promise<{ success: string[], failed: Record<string, number> }>}
	 */
	async requestMulti(keys, options = {}) {
		const success = [];
		const failed = {};

		for (const key of keys) {
			const status = await this.request(key, options);
			if (status === PermissionStatus.AUTHORIZED) {
				success.push(key);
			} else {
				failed[key] = status;
				if (options.stopOnFail !== false) break;
			}
		}

		return {
			success,
			failed,
		};
	},

	/**
	 * 打开小程序权限设置页
	 */
	openAppSetting() {
		uni.openAppAuthorizeSetting?.({
			success: () => console.log("[Permission] Open miniapp settings success"),
			fail: (err) => console.warn("[Permission] Open miniapp settings failed:", err),
		});
	},

	/**
	 * 权限检查并请求（便捷方法）
	 * @param {string} key - 权限标识
	 * @param {Object} options - 配置项
	 * @returns {Promise<boolean>} 是否最终获得授权
	 */
	async ensure(key, options = {}) {
		const status = await this.check(key);
		if (status === PermissionStatus.AUTHORIZED) return true;
		if (status === PermissionStatus.RESTRICTED) return false;

		const result = await this.request(key, options);
		return result === PermissionStatus.AUTHORIZED;
	},

	/**
	 * 获取权限描述文本
	 * @param {string} key - 权限标识
	 * @param {number} status - 权限状态
	 */
	getStatusText(key, status) {
		const name = PERMISSION_MAP[key]?.desc || key;
		const map = {
			[PermissionStatus.NOT_SUPPORTED]: `${name}权限当前平台不支持`,
			[PermissionStatus.ERROR]: `检查${name}权限时出错`,
			[PermissionStatus.NOT_DETERMINED]: `尚未请求${name}权限`,
			[PermissionStatus.AUTHORIZED]: `${name}权限已授权`,
			[PermissionStatus.DENIED]: `${name}权限已被拒绝，可重新请求`,
			[PermissionStatus.RESTRICTED]: `${name}权限被系统限制，请去设置页开启`,
		};
		return map[status] || "未知权限状态";
	},

	// 导出状态码供外部使用
	Status: PermissionStatus,

	// 导出平台工具
	Platform,
};

// ==================== 默认导出（兼容旧写法） ====================
export default Permission;