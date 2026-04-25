/**
 * UniApp 地图与位置服务模块封装
 * 功能：定位/地图/路线规划/地理编码
 * 平台：全平台兼容（集成高德、腾讯地图SDK）
 */

import { createModule } from "./promise.js";
import Platform from "./platform.js";

// 封装规则
const rules = {
	// 位置相关
	getLocation: {
		transform: (res) => ({
			latitude: res.latitude,
			longitude: res.longitude,
			speed: res.speed,
			accuracy: res.accuracy,
			altitude: res.altitude,
			verticalAccuracy: res.verticalAccuracy,
			horizontalAccuracy: res.horizontalAccuracy,
			address: res.address,
		}),
	},
	chooseLocation: {},
	openLocation: {},

	// 地图上下文（skipPromise）
	createMapContext: { skipPromise: true },
};

const location = createModule(uni, rules);

// ==================== 核心定位方法 ====================

location.service = {
	/**
	 * 获取当前位置（带权限检查和降级方案）
	 * @param {Object} options - 配置项
	 * @returns {Promise<Object>} 位置信息
	 */
	async getCurrentPosition(options = {}) {
		const {
			type = "gcj02", // wgs84/gcj02
			isHighAccuracy = false,
			timeout = 10000,
			fallbackToIP = true,
		} = options;

		try {
			// 1. 尝试GPS定位
			const pos = await new Promise((resolve, reject) => {
				const timer = setTimeout(() => {
					reject(new Error("Location timeout"));
				}, timeout);

				location.getLocation({
					type,
					isHighAccuracy,
					success: (res) => {
						clearTimeout(timer);
						resolve(res);
					},
					fail: (err) => {
						clearTimeout(timer);
						reject(err);
					},
				});
			});

			return {
				...pos,
				source: "gps",
			};
		} catch (gpsErr) {
			console.warn("[Location] GPS定位失败:", gpsErr);

			// 2. 降级到IP定位
			if (fallbackToIP) {
				try {
					return await this.getIPLocation();
				} catch (ipErr) {
					console.error("[Location] IP定位也失败:", ipErr);
					throw new Error("无法获取位置信息");
				}
			}

			throw gpsErr;
		}
	},

	/**
	 * IP定位（降级方案）
	 * @returns {Promise<Object>}
	 */
	async getIPLocation() {
		// 使用高德地图IP定位API
		const AMAP_KEY = "your_amap_key"; // 从配置文件读取

		return new Promise((resolve, reject) => {
			uni.request({
				url: "https://restapi.amap.com/v3/ip",
				data: {
					key: AMAP_KEY,
				},
				success: (res) => {
					if (res.data.status === "1") {
						resolve({
							latitude: parseFloat(res.data.rectangle?.split(";")[0]?.split(",")[1] || 0),
							longitude: parseFloat(res.data.rectangle?.split(";")[0]?.split(",")[0] || 0),
							city: res.data.city,
							province: res.data.province,
							source: "ip",
						});
					} else {
						reject(new Error("IP定位失败"));
					}
				},
				fail: reject,
			});
		});
	},

	/**
	 * 持续监听位置变化
	 * @param {Function} callback - 位置变化回调
	 * @returns {Function} 取消监听的函数
	 */
	watchPosition(callback) {
		let watchId = null;

		// #ifdef MP-WEIXIN
		// 微信小程序使用startLocationUpdateBackground
		wx.startLocationUpdateBackground?.({
			success: () => {
				wx.onLocationChange?.(callback);
				watchId = true;
			},
		});
		// #endif

		// #ifndef MP-WEIXIN
		// 其他平台使用标准API
		location.startLocationUpdate?.({
			success: () => {
				uni.onLocationChange?.(callback);
				watchId = true;
			},
		});
		// #endif

		// 返回取消监听函数
		return () => {
			if (watchId) {
				// #ifdef MP-WEIXIN
				wx.offLocationChange?.(callback);
				wx.stopLocationUpdate?.();
				// #endif

				// #ifndef MP-WEIXIN
				uni.offLocationChange?.(callback);
				location.stopLocationUpdate?.();
				// #endif
			}
		};
	},
};

// ==================== 地图工具方法 ====================

location.map = {
	/**
	 * 在地图上显示位置
	 * @param {Object} options - 配置项
	 */
	show(options = {}) {
		const {
			latitude,
			longitude,
			name = "",
			address = "",
			scale = 15,
		} = options;

		return location.openLocation({
			latitude,
			longitude,
			name,
			address,
			scale,
		});
	},

	/**
	 * 选择地图位置
	 * @param {Object} options - 配置项
	 * @returns {Promise<Object>} 选择的位置信息
	 */
	choose(options = {}) {
		const {
			latitude = 0,
			longitude = 0,
		} = options;

		return new Promise((resolve, reject) => {
			location.chooseLocation({
				latitude,
				longitude,
				success: resolve,
				fail: reject,
			});
		});
	},

	/**
	 * 创建地图上下文（用于高级操作）
	 * @param {string} mapId - 地图组件ID
	 * @param {Object} componentInstance - 组件实例
	 * @returns {MapContext}
	 */
	createContext(mapId, componentInstance) {
		return location.createMapContext(mapId, componentInstance);
	},

	/**
	 * 计算两点间距离（米）
	 * @param {number} lat1 - 起点纬度
	 * @param {number} lng1 - 起点经度
	 * @param {number} lat2 - 终点纬度
	 * @param {number} lng2 - 终点经度
	 * @returns {number} 距离（米）
	 */
	calculateDistance(lat1, lng1, lat2, lng2) {
		const R = 6371e3; // 地球半径（米）
		const φ1 = (lat1 * Math.PI) / 180;
		const φ2 = (lat2 * Math.PI) / 180;
		const Δφ = ((lat2 - lat1) * Math.PI) / 180;
		const Δλ = ((lng2 - lng1) * Math.PI) / 180;

		const a =
			Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
			Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

		return R * c;
	},
};

// ==================== 地理编码（地址解析） ====================

location.geocoder = {
	/**
	 * 地理编码：地址转坐标
	 * @param {string} address - 地址文字
	 * @param {string} city - 城市（可选）
	 * @returns {Promise<Object>} 坐标信息
	 */
	async geocode(address, city = "") {
		// 使用高德地图地理编码API
		const AMAP_KEY = "your_amap_key"; // 从配置文件读取

		return new Promise((resolve, reject) => {
			uni.request({
				url: "https://restapi.amap.com/v3/geocode/geo",
				data: {
					key: AMAP_KEY,
					address,
					city,
				},
				success: (res) => {
					if (res.data.status === "1" && res.data.geocodes?.length > 0) {
						const geo = res.data.geocodes[0];
						const [longitude, latitude] = geo.location.split(",");

						resolve({
							latitude: parseFloat(latitude),
							longitude: parseFloat(longitude),
							formattedAddress: geo.formatted_address,
							country: geo.country,
							province: geo.province,
							city: geo.city,
							district: geo.district,
						});
					} else {
						reject(new Error("Geocode failed"));
					}
				},
				fail: reject,
			});
		});
	},

	/**
	 * 逆地理编码：坐标转地址
	 * @param {number} latitude - 纬度
	 * @param {number} longitude - 经度
	 * @returns {Promise<Object>} 地址信息
	 */
	async reverseGeocode(latitude, longitude) {
		const AMAP_KEY = "your_amap_key";

		return new Promise((resolve, reject) => {
			uni.request({
				url: "https://restapi.amap.com/v3/geocode/regeo",
				data: {
					key: AMAP_KEY,
					location: `${longitude},${latitude}`,
					radius: 1000,
					extensions: "all",
				},
				success: (res) => {
					if (res.data.status === "1") {
						const regeo = res.data.regeocode;
						resolve({
							formattedAddress: regeo.formatted_address,
							addressComponent: regeo.addressComponent,
							pois: regeo.pois || [],
						});
					} else {
						reject(new Error("Reverse geocode failed"));
					}
				},
				fail: reject,
			});
		});
	},
};

// ==================== 路线规划 ====================

location.route = {
	/**
	 * 驾车路线规划
	 * @param {Object} options - 配置项
	 * @returns {Promise<Object>} 路线信息
	 */
	async driving(options = {}) {
		const {
			origin, // 起点 "lng,lat"
			destination, // 终点 "lng,lat"
			waypoints = [], // 途经点数组
		} = options;

		const AMAP_KEY = "your_amap_key";

		return new Promise((resolve, reject) => {
			uni.request({
				url: "https://restapi.amap.com/v3/direction/driving",
				data: {
					key: AMAP_KEY,
					origin,
					destination,
					waypoints: waypoints.join("|"),
					extensions: "all",
				},
				success: (res) => {
					if (res.data.status === "1") {
						const route = res.data.route?.paths?.[0];
						resolve({
							distance: route?.distance || 0, // 米
							duration: route?.duration || 0, // 秒
							steps: route?.steps || [],
						});
					} else {
						reject(new Error("Route planning failed"));
					}
				},
				fail: reject,
			});
		});
	},

	/**
	 * 步行路线规划
	 * @param {Object} options - 配置项
	 */
	async walking(options = {}) {
		const { origin, destination } = options;
		const AMAP_KEY = "your_amap_key";

		return new Promise((resolve, reject) => {
			uni.request({
				url: "https://restapi.amap.com/v3/direction/walking",
				data: {
					key: AMAP_KEY,
					origin,
					destination,
				},
				success: (res) => {
					if (res.data.status === "1") {
						const route = res.data.route?.paths?.[0];
						resolve({
							distance: route?.distance || 0,
							duration: route?.duration || 0,
							steps: route?.steps || [],
						});
					} else {
						reject(new Error("Walking route failed"));
					}
				},
				fail: reject,
			});
		});
	},

	/**
	 * 公交路线规划
	 * @param {Object} options - 配置项
	 */
	async transit(options = {}) {
		const {
			origin,
			destination,
			city,
		} = options;

		const AMAP_KEY = "your_amap_key";

		return new Promise((resolve, reject) => {
			uni.request({
				url: "https://restapi.amap.com/v3/direction/transit/integrated",
				data: {
					key: AMAP_KEY,
					origin,
					destination,
					city,
				},
				success: (res) => {
					if (res.data.status === "1") {
						const route = res.data.route?.transits?.[0];
						resolve({
							distance: route?.distance || 0,
							duration: route?.duration || 0,
							cost: route?.cost || 0,
							segments: route?.segments || [],
						});
					} else {
						reject(new Error("Transit route failed"));
					}
				},
				fail: reject,
			});
		});
	},
};

// ==================== 附近搜索 ====================

location.search = {
	/**
	 * 搜索附近地点
	 * @param {Object} options - 配置项
	 * @returns {Promise<Array>} 地点列表
	 */
	async nearby(options = {}) {
		const {
			keywords, // 关键词
			latitude,
			longitude,
			radius = 1000, // 搜索半径（米）
			page = 1,
			pageSize = 20,
		} = options;

		const AMAP_KEY = "your_amap_key";

		return new Promise((resolve, reject) => {
			uni.request({
				url: "https://restapi.amap.com/v3/place/around",
				data: {
					key: AMAP_KEY,
					keywords,
					location: `${longitude},${latitude}`,
					radius,
					page,
					offset: pageSize,
					extensions: "all",
				},
				success: (res) => {
					if (res.data.status === "1") {
						resolve(
							(res.data.pois || []).map((poi) => ({
								id: poi.id,
								name: poi.name,
								latitude: parseFloat(poi.location?.split(",")[1] || 0),
								longitude: parseFloat(poi.location?.split(",")[0] || 0),
								address: poi.address,
								tel: poi.tel,
								type: poi.type,
								distance: parseInt(poi.distance || 0),
							})),
						);
					} else {
						reject(new Error("Search failed"));
					}
				},
				fail: reject,
			});
		});
	},
};

export default location;
