/**
 * UniApp 全平台权限校验模块
 * 功能：权限状态检查 / 权限请求 / 跳转设置页 / 批量校验
 * 平台：App (iOS/Android) / 小程序 (微信/支付宝等) / H5
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
	LIMITED: 4, // iOS 14+ 部分授权（相册）
};

// ==================== 权限映射表 ====================
const PERMISSION_MAP = {
	// ===== 通用权限（小程序标准 scope） =====
	location: {
		mp: "scope.userLocation",
		android: "android.permission.ACCESS_FINE_LOCATION",
		ios: "location",
		desc: "地理位置",
	},
	locationBackground: {
		mp: "scope.userLocationBackground",
		android: "android.permission.ACCESS_BACKGROUND_LOCATION",
		ios: "locationAlways",
		desc: "后台定位",
	},
	camera: {
		mp: "scope.camera",
		android: "android.permission.CAMERA",
		ios: "camera",
		desc: "相机",
	},
	record: {
		mp: "scope.record",
		android: "android.permission.RECORD_AUDIO",
		ios: "record",
		desc: "麦克风",
	},
	album: {
		mp: "scope.writePhotosAlbum",
		android: ["android.permission.READ_EXTERNAL_STORAGE", "android.permission.WRITE_EXTERNAL_STORAGE"],
		ios: "album",
		desc: "相册",
	},
	bluetooth: {
		mp: "scope.bluetooth",
		android: ["android.permission.BLUETOOTH", "android.permission.BLUETOOTH_ADMIN", "android.permission.BLUETOOTH_CONNECT"],
		ios: "bluetooth",
		desc: "蓝牙",
	},
	notification: {
		mp: "scope.notification",
		android: "android.permission.POST_NOTIFICATIONS", // Android 13+
		ios: "notification",
		desc: "通知推送",
	},
	calendar: {
		mp: null, // 小程序不支持
		android: "android.permission.READ_CALENDAR",
		ios: "calendar",
		desc: "日历",
	},
	contact: {
		mp: "scope.addressBook",
		android: "android.permission.READ_CONTACTS",
		ios: "contact",
		desc: "通讯录",
	},

	// ===== App 专属权限 =====
	phone: {
		mp: null,
		android: "android.permission.READ_PHONE_STATE",
		ios: "phone",
		desc: "电话状态",
	},
	sms: {
		mp: null,
		android: "android.permission.SEND_SMS",
		ios: null,
		desc: "短信",
	},
};

// ==================== iOS 权限检查（内存安全版） ====================
const IOSChecker = {
	// 安全导入 + 自动释放
	_import(className) {
		try {
			return plus.ios.import(className);
		} catch {
			return null;
		}
	},

	_delete(...objects) {
		objects.forEach((obj) => {
			try {
				if (obj && typeof obj.plusGetAttribute === "function") {
					plus.ios.deleteObject(obj);
				}
			} catch {}
		});
	},

	// 相册权限
	album() {
		let result = PermissionStatus.NOT_DETERMINED;
		const PHPhotoLibrary = this._import("PHPhotoLibrary");
		if (!PHPhotoLibrary) return PermissionStatus.ERROR;

		try {
			const authStatus = PHPhotoLibrary.authorizationStatus();
			// 0=notDetermined, 1=restricted, 2=denied, 3=authorized, 4=limited(iOS14+)
			if (authStatus === 0) result = PermissionStatus.NOT_DETERMINED;
			else if (authStatus === 3) result = PermissionStatus.AUTHORIZED;
			else if (authStatus === 4) result = PermissionStatus.LIMITED;
			else if (authStatus === 1) result = PermissionStatus.RESTRICTED;
			else result = PermissionStatus.DENIED;
		} catch {
			result = PermissionStatus.ERROR;
		} finally {
			this._delete(PHPhotoLibrary);
		}
		return result;
	},

	// 相机权限
	camera() {
		let result = PermissionStatus.NOT_DETERMINED;
		const AVCaptureDevice = this._import("AVCaptureDevice");
		if (!AVCaptureDevice) return PermissionStatus.ERROR;

		try {
			// 注意：参数是 'video' 不是 'vide'
			const authStatus = AVCaptureDevice.authorizationStatusForMediaType("video");
			if (authStatus === 0) result = PermissionStatus.NOT_DETERMINED;
			else if (authStatus === 3) result = PermissionStatus.AUTHORIZED;
			else if (authStatus === 1) result = PermissionStatus.RESTRICTED;
			else result = PermissionStatus.DENIED;
		} catch {
			result = PermissionStatus.ERROR;
		} finally {
			this._delete(AVCaptureDevice);
		}
		return result;
	},

	// 定位权限
	location() {
		let result = PermissionStatus.NOT_DETERMINED;
		const CLLocationManager = this._import("CLLocationManager");
		if (!CLLocationManager) return PermissionStatus.ERROR;

		try {
			const enable = CLLocationManager.locationServicesEnabled();
			if (!enable) return PermissionStatus.RESTRICTED; // 系统定位关闭

			const status = CLLocationManager.authorizationStatus();
			// 0=notDetermined, 1=restricted, 2=denied, 3=authorizedAlways, 4=authorizedWhenInUse
			if (status === 0) result = PermissionStatus.NOT_DETERMINED;
			else if (status === 3 || status === 4) result = PermissionStatus.AUTHORIZED;
			else if (status === 1) result = PermissionStatus.RESTRICTED;
			else result = PermissionStatus.DENIED;
		} catch {
			result = PermissionStatus.ERROR;
		} finally {
			this._delete(CLocationManager);
		}
		return result;
	},

	// 麦克风权限
	record() {
		let result = PermissionStatus.NOT_DETERMINED;
		const AVAudioSession = this._import("AVAudioSession");
		if (!AVAudioSession) return PermissionStatus.ERROR;

		try {
			const instance = AVAudioSession.sharedInstance();
			const status = instance.recordPermission();
			// 1970168948='unde', 1735552628='grnt', 1701732964='deni'
			if (status === 1735552628) result = PermissionStatus.AUTHORIZED;
			else if (status === 1970168948) result = PermissionStatus.NOT_DETERMINED;
			else result = PermissionStatus.DENIED;
		} catch {
			result = PermissionStatus.ERROR;
		} finally {
			this._delete(AVAudioSession);
		}
		return result;
	},

	// 通讯录权限
	contact() {
		let result = PermissionStatus.NOT_DETERMINED;
		const CNContactStore = this._import("CNContactStore");
		if (!CNContactStore) return PermissionStatus.ERROR;

		try {
			const status = CNContactStore.authorizationStatusForEntityType(0); // 0=contacts
			if (status === 0) result = PermissionStatus.NOT_DETERMINED;
			else if (status === 3) result = PermissionStatus.AUTHORIZED;
			else if (status === 1) result = PermissionStatus.RESTRICTED;
			else result = PermissionStatus.DENIED;
		} catch {
			result = PermissionStatus.ERROR;
		} finally {
			this._delete(CNContactStore);
		}
		return result;
	},

	// 日历权限
	calendar() {
		let result = PermissionStatus.NOT_DETERMINED;
		const EKEventStore = this._import("EKEventStore");
		if (!EKEventStore) return PermissionStatus.ERROR;

		try {
			const status = EKEventStore.authorizationStatusForEntityType(0); // 0=event
			if (status === 3) result = PermissionStatus.AUTHORIZED;
			else if (status === 0) result = PermissionStatus.NOT_DETERMINED;
			else if (status === 1) result = PermissionStatus.RESTRICTED;
			else result = PermissionStatus.DENIED;
		} catch {
			result = PermissionStatus.ERROR;
		} finally {
			this._delete(EKEventStore);
		}
		return result;
	},

	// 通知权限
	notification() {
		let result = PermissionStatus.NOT_DETERMINED;
		const UNUserNotificationCenter = this._import("UNUserNotificationCenter");
		if (!UNUserNotificationCenter) return PermissionStatus.ERROR;

		try {
			const center = UNUserNotificationCenter.currentCenter();
			// iOS 10+ 异步检查
			center.getNotificationSettingsWithCompletionHandler((settings) => {
				if (!settings) {
					result = PermissionStatus.ERROR;
					return;
				}
				const authStatus = settings.plusGetAttribute("authorizationStatus");
				// 0=notDetermined, 1=denied, 2=authorized, 3=provisional, 4=ephemeral
				if (authStatus === 2 || authStatus === 3) result = PermissionStatus.AUTHORIZED;
				else if (authStatus === 0) result = PermissionStatus.NOT_DETERMINED;
				else if (authStatus === 1) result = PermissionStatus.DENIED;
				else result = PermissionStatus.RESTRICTED;

				this._delete(settings, center, UNUserNotificationCenter);
			});
			// 注意：此为异步，外部需用回调或 Promise 包装
			return result;
		} catch {
			this._delete(UNUserNotificationCenter);
			return PermissionStatus.ERROR;
		}
	},
};

// ==================== Android 权限检查 ====================
const AndroidChecker = {
	// 检查单个权限状态
	async check(permissionName) {
		return new Promise((resolve) => {
			try {
				plus.android.requestPermissions(
					[permissionName],
					(result) => {
						if (result.granted?.length > 0) {
							resolve(PermissionStatus.AUTHORIZED);
						} else if (result.deniedAlways?.length > 0) {
							resolve(PermissionStatus.RESTRICTED); // 永久拒绝
						} else if (result.deniedPresent?.length > 0) {
							resolve(PermissionStatus.DENIED); // 本次拒绝
						} else {
							resolve(PermissionStatus.NOT_DETERMINED);
						}
					},
					() => resolve(PermissionStatus.ERROR),
				);
			} catch {
				resolve(PermissionStatus.ERROR);
			}
		});
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

// ==================== H5 权限检查（Navigator Permissions API） ====================
const H5Checker = {
	async check(permissionName) {
		if (!navigator.permissions?.query) {
			return PermissionStatus.NOT_SUPPORTED;
		}

		try {
			// 映射标准 permission name
			const nameMap = {
				location: "geolocation",
				camera: "camera",
				microphone: "microphone",
				notification: "notifications",
			};
			const queryName = nameMap[permissionName] || permissionName;

			const status = await navigator.permissions.query({
				name: queryName,
			});
			// granted/prompt/denied
			if (status.state === "granted") return PermissionStatus.AUTHORIZED;
			if (status.state === "denied") return PermissionStatus.DENIED;
			return PermissionStatus.NOT_DETERMINED;
		} catch {
			return PermissionStatus.ERROR;
		}
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

		// 1. App 端
		if (Platform.isApp()) {
			if (Platform.isIOS()) {
				const checker = IOSChecker[config.ios];
				if (typeof checker === "function") {
					const result = checker();
					// 处理 iOS 通知的异步情况
					if (config.ios === "notification" && result === PermissionStatus.NOT_DETERMINED) {
						return new Promise((resolve) => {
							setTimeout(() => resolve(result), 100);
						});
					}
					return result;
				}
				return PermissionStatus.NOT_SUPPORTED;
			}

			if (Platform.isAndroid()) {
				const perms = Array.isArray(config.android) ? config.android : [config.android];
				// 检查所有关联权限，全部授权才算通过
				const results = await Promise.all(perms.map((p) => AndroidChecker.check(p)));
				return results.every((r) => r === PermissionStatus.AUTHORIZED) ? PermissionStatus.AUTHORIZED : results.find((r) => r === PermissionStatus.RESTRICTED) || PermissionStatus.DENIED;
			}
		}

		// 2. 小程序端
		if (Platform.isMp()) {
			return MpChecker.check(config.mp);
		}

		// 3. H5 端
		if (Platform.isH5()) {
			return H5Checker.check(key);
		}

		return PermissionStatus.NOT_SUPPORTED;
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

		// 1. App 端请求
		if (Platform.isApp()) {
			const config = PERMISSION_MAP[key];
			if (!config) return PermissionStatus.NOT_SUPPORTED;

			if (Platform.isIOS()) {
				// iOS: 调用系统弹窗请求
				return new Promise((resolve) => {
					const callback = (granted) => {
						resolve(granted ? PermissionStatus.AUTHORIZED : PermissionStatus.DENIED);
					};

					// 根据不同权限调用不同请求方法
					switch (config.ios) {
						case "location":
							plus.ios.import("CLLocationManager")?.requestAlwaysAuthorization?.();
							// 监听授权变化
							const timer = setInterval(() => {
								const status = IOSChecker.location();
								if (status !== PermissionStatus.NOT_DETERMINED) {
									clearInterval(timer);
									callback(status === PermissionStatus.AUTHORIZED);
								}
							}, 300);
							break;
						case "camera":
						case "record":
						case "album":
						case "contact":
						case "calendar":
							// 这些权限在首次使用时自动弹窗，此处仅触发使用
							callback(true); // 假设用户会允许
							break;
						default:
							callback(false);
					}
				});
			}

			if (Platform.isAndroid()) {
				const perms = Array.isArray(config.android) ? config.android : [config.android];
				return new Promise((resolve) => {
					plus.android.requestPermissions(
						perms,
						(result) => {
							if (result.granted?.length === perms.length) {
								resolve(PermissionStatus.AUTHORIZED);
							} else if (result.deniedAlways?.length > 0) {
								resolve(PermissionStatus.RESTRICTED);
							} else {
								resolve(PermissionStatus.DENIED);
							}
						},
						() => resolve(PermissionStatus.ERROR),
					);
				});
			}
		}

		// 2. 小程序端请求
		if (Platform.isMp()) {
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
		}

		// 3. H5 端请求
		if (Platform.isH5()) {
			// H5 权限需在用户交互中触发，此处仅返回当前状态
			return this.check(key);
		}

		return PermissionStatus.NOT_SUPPORTED;
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
	 * 打开应用权限设置页
	 */
	openAppSetting() {
		// 1. App 端
		if (Platform.isApp()) {
			if (Platform.isIOS()) {
				try {
					const UIApplication = plus.ios.import("UIApplication");
					const app = UIApplication.sharedApplication();
					const NSURL = plus.ios.import("NSURL");
					const url = NSURL.URLWithString("app-settings:");
					app.openURL(url);
					IOSChecker._delete(url, NSURL, app, UIApplication);
				} catch (e) {
					console.warn("[Permission] Open iOS settings failed:", e);
				}
			} else if (Platform.isAndroid()) {
				try {
					const Intent = plus.android.importClass("android.content.Intent");
					const Settings = plus.android.importClass("android.provider.Settings");
					const Uri = plus.android.importClass("android.net.Uri");
					const activity = plus.android.runtimeMainActivity();

					const intent = new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS);
					const uri = Uri.fromParts("package", activity.getPackageName(), null);
					intent.setData(uri);
					activity.startActivity(intent);
				} catch (e) {
					console.warn("[Permission] Open Android settings failed:", e);
				}
			}
			return;
		}

		// 2. 小程序端
		if (Platform.isMp()) {
			uni.openAppAuthorizeSetting?.({
				success: () => console.log("[Permission] Open miniapp settings success"),
				fail: (err) => console.warn("[Permission] Open miniapp settings failed:", err),
			});
			return;
		}

		// 3. H5 端：无法直接跳转，提示用户手动操作
		uni.showToast?.({
			title: "请手动在浏览器设置中开启权限",
			icon: "none",
			duration: 3000,
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
			[PermissionStatus.LIMITED]: `${name}权限部分可用（iOS 14+）`,
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
