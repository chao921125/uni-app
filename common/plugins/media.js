/**
 * UniApp 媒体模块封装
 * 功能：图片/视频/音频/相机/文件管理
 * 平台：全平台兼容（App/小程序/H5）
 */

import { createModule } from "./promise.js";
import Platform from "./platform.js";

// 封装规则
const rules = {
	// 图片相关
	chooseImage: {
		transform: (res) => ({
			tempFilePaths: res.tempFilePaths || [],
			tempFiles: res.tempFiles || [],
		}),
	},
	previewImage: {},
	getImageInfo: {
		transform: (res) => ({
			width: res.width,
			height: res.height,
			path: res.path,
			type: res.type,
			orientation: res.orientation,
			exif: res.exif,
		}),
	},
	saveImageToPhotosAlbum: {},
	compressImage: {},

	// 视频相关
	chooseVideo: {
		transform: (res) => ({
			tempFilePath: res.tempFilePath,
			duration: res.duration,
			size: res.size,
			width: res.width,
			height: res.height,
			thumbTempFilePath: res.thumbTempFilePath,
		}),
	},
	saveVideoToPhotosAlbum: {},
	getVideoInfo: {},

	// 音频相关
	playVoice: {},
	pauseVoice: {},
	stopVoice: {},
	setInnerAudioOption: {},

	// 录音管理（skipPromise，因为返回 manager）
	startRecord: { skipPromise: true },
	stopRecord: { skipPromise: true },

	// 背景音频管理（skipPromise）
	getBackgroundAudioManager: { skipPromise: true },

	// 文件相关
	saveFile: {},
	getSavedFileList: {},
	removeSavedFile: {},
	openDocument: {},
	getFileInfo: {},
};

const media = createModule(uni, rules);

// ==================== 图片工具方法 ====================

media.image = {
	/**
	 * 选择并上传图片（带压缩）
	 * @param {Object} options - 配置项
	 * @returns {Promise<string[]>} 上传后的图片URL数组
	 */
	async chooseAndUpload(options = {}) {
		const {
			count = 9,
			sizeType = ["original", "compressed"],
			sourceType = ["album", "camera"],
			compress = true,
			uploadUrl = null,
			onProgress = null,
		} = options;

		try {
			// 1. 选择图片
			const chooseRes = await media.chooseImage({
				count,
				sizeType,
				sourceType,
			});

			let filePaths = chooseRes.tempFilePaths;

			// 2. 压缩图片（如果需要）
			if (compress && Platform.isApp()) {
				filePaths = await Promise.all(
					filePaths.map(async (path) => {
						try {
							const compressRes = await media.compressImage({
								src: path,
								quality: 80,
							});
							return compressRes.tempFilePath;
						} catch {
							return path; // 压缩失败返回原图
						}
					}),
				);
			}

			// 3. 上传到服务器（如果提供上传接口）
			if (uploadUrl) {
				const uploadPromises = filePaths.map((path) =>
					new Promise((resolve, reject) => {
						uni.uploadFile({
							url: uploadUrl,
							filePath: path,
							name: "file",
							success: (res) => {
								try {
									const data = JSON.parse(res.data);
									resolve(data.url || data.path);
								} catch {
									reject(new Error("Upload response parse failed"));
								}
							},
							fail: reject,
						});
					}),
				);

				return await Promise.all(uploadPromises);
			}

			return filePaths;
		} catch (err) {
			console.error("[Media] Choose and upload failed:", err);
			throw err;
		}
	},

	/**
	 * 批量预览图片
	 * @param {string[]} urls - 图片URL数组
	 * @param {number} current - 当前显示的图片索引
	 */
	preview(urls, current = 0) {
		if (!urls || urls.length === 0) return;
		return media.previewImage({
			current: urls[current],
			urls,
		});
	},

	/**
	 * 保存图片到相册（带权限检查）
	 * @param {string} url - 图片URL或本地路径
	 */
	async saveToAlbum(url) {
		try {
			// App端需要先下载网络图片
			let filePath = url;
			if (url.startsWith("http") && Platform.isApp()) {
				const downloadRes = await new Promise((resolve, reject) => {
					uni.downloadFile({
						url,
						success: resolve,
						fail: reject,
					});
				});
				filePath = downloadRes.tempFilePath;
			}

			await media.saveImageToPhotosAlbum({
				filePath,
			});

			uni.showToast?.({
				title: "保存成功",
				icon: "success",
			});

			return true;
		} catch (err) {
			// 权限被拒绝
			if (err?.errMsg?.includes("auth")) {
				uni.showModal?.({
					title: "需要相册权限",
					content: "请在设置中开启相册访问权限",
					confirmText: "去设置",
					success: (res) => {
						if (res.confirm) {
							// 调用权限模块打开设置
							import("./permission.js").then(({ Permission }) => {
								Permission.openAppSetting();
							});
						}
					},
				});
			} else {
				uni.showToast?.({
					title: "保存失败",
					icon: "none",
				});
			}
			throw err;
		}
	},

	/**
	 * 获取图片Base64
	 * @param {string} path - 图片路径
	 * @returns {Promise<string>} Base64字符串
	 */
	async toBase64(path) {
		return new Promise((resolve, reject) => {
			// #ifdef H5
			// H5端使用Canvas转换
			const img = new Image();
			img.crossOrigin = "anonymous";
			img.onload = () => {
				const canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				const ctx = canvas.getContext("2d");
				ctx.drawImage(img, 0, 0);
				resolve(canvas.toDataURL("image/png"));
			};
			img.onerror = reject;
			img.src = path;
			// #endif

			// #ifndef H5
			// 小程序和App端使用FileSystemManager
			const fs = uni.getFileSystemManager?.();
			if (!fs) {
				reject(new Error("FileSystemManager not supported"));
				return;
			}

			fs.readFile({
				filePath: path,
				encoding: "base64",
				success: (res) => {
					resolve(`data:image/png;base64,${res.data}`);
				},
				fail: reject,
			});
			// #endif
		});
	},
};

// ==================== 视频工具方法 ====================

media.video = {
	/**
	 * 选择并上传视频
	 * @param {Object} options - 配置项
	 * @returns {Promise<string>} 上传后的视频URL
	 */
	async chooseAndUpload(options = {}) {
		const {
			sourceType = ["album", "camera"],
			compressed = true,
			maxDuration = 60,
			camera = "back",
			uploadUrl = null,
		} = options;

		try {
			// 1. 选择视频
			const chooseRes = await media.chooseVideo({
				sourceType,
				compressed,
				maxDuration,
				camera,
			});

			// 2. 上传到服务器
			if (uploadUrl) {
				return new Promise((resolve, reject) => {
					uni.uploadFile({
						url: uploadUrl,
						filePath: chooseRes.tempFilePath,
						name: "video",
						success: (res) => {
							try {
								const data = JSON.parse(res.data);
								resolve(data.url || data.path);
							} catch {
								reject(new Error("Upload response parse failed"));
							}
						},
						fail: reject,
					});
				});
			}

			return chooseRes.tempFilePath;
		} catch (err) {
			console.error("[Media] Video upload failed:", err);
			throw err;
		}
	},

	/**
	 * 保存视频到相册
	 * @param {string} filePath - 视频路径
	 */
	async saveToAlbum(filePath) {
		try {
			await media.saveVideoToPhotosAlbum({ filePath });
			uni.showToast?.({ title: "保存成功", icon: "success" });
			return true;
		} catch (err) {
			uni.showToast?.({ title: "保存失败", icon: "none" });
			throw err;
		}
	},
};

// ==================== 音频工具方法 ====================

media.audio = {
	/**
	 * 创建音频上下文（统一管理）
	 * @param {string} src - 音频URL
	 * @returns {InnerAudioContext} 音频实例
	 */
	createPlayer(src) {
		const audio = uni.createInnerAudioContext?.() || uni.getBackgroundAudioManager?.();

		if (audio) {
			audio.src = src;
			audio.autoplay = false;

			// 错误处理
			audio.onError?.((err) => {
				console.error("[Media] Audio playback error:", err);
				uni.showToast?.({
					title: "音频播放失败",
					icon: "none",
				});
			});
		}

		return audio;
	},

	/**
	 * 播放提示音
	 * @param {string} sound - 音效类型（success/error/warning）
	 */
	playSound(sound = "success") {
		const sounds = {
			success: "https://cdn.example.com/sounds/success.mp3",
			error: "https://cdn.example.com/sounds/error.mp3",
			warning: "https://cdn.example.com/sounds/warning.mp3",
		};

		const audio = this.createPlayer(sounds[sound]);
		if (audio) {
			audio.play?.();
		}
	},
};

// ==================== 文件工具方法 ====================

media.file = {
	/**
	 * 下载文件（带进度和缓存）
	 * @param {string} url - 文件URL
	 * @param {Object} options - 配置项
	 * @returns {Promise<string>} 本地文件路径
	 */
	async download(url, options = {}) {
		const {
			onProgress = null,
			cache = true,
			timeout = 30000,
		} = options;

		// 检查缓存
		if (cache) {
			const storage = await import("./storage.js");
			const cached = await storage.default.get(`file_cache_${url}`);
			if (cached) return cached;
		}

		return new Promise((resolve, reject) => {
			const task = uni.downloadFile({
				url,
				timeout,
				success: async (res) => {
					if (res.statusCode === 200) {
						// 缓存文件路径
						if (cache) {
							const storage = await import("./storage.js");
							await storage.default.set(`file_cache_${url}`, res.tempFilePath, 3600); // 缓存1小时
						}
						resolve(res.tempFilePath);
					} else {
						reject(new Error(`Download failed with status ${res.statusCode}`));
					}
				},
				fail: reject,
			});

			// 监听进度
			if (onProgress && task?.onProgressUpdate) {
				task.onProgressUpdate(onProgress);
			}
		});
	},

	/**
	 * 打开文档（支持PDF、Word、Excel等）
	 * @param {string} filePath - 文件路径
	 * @param {string} fileType - 文件类型（pdf/doc/xls/ppt）
	 */
	async open(filePath, fileType = "pdf") {
		try {
			await media.openDocument({
				filePath,
				fileType,
				showMenu: true,
			});
			return true;
		} catch (err) {
			uni.showToast?.({
				title: "无法打开文件",
				icon: "none",
			});
			throw err;
		}
	},

	/**
	 * 清理临时文件
	 */
	async cleanTemp() {
		const fs = uni.getFileSystemManager?.();
		if (!fs) return false;

		try {
			const savedList = await media.getSavedFileList();
			await Promise.all(
				(savedList.fileList || []).map((file) =>
					media.removeSavedFile({ filePath: file.filePath }).catch(() => {}),
				),
			);
			return true;
		} catch {
			return false;
		}
	},
};

// ==================== 扫码工具 ====================

media.scan = {
	/**
	 * 扫描二维码/条形码
	 * @param {Object} options - 配置项
	 * @returns {Promise<string>} 扫描结果
	 */
	async code(options = {}) {
		const {
			scanType = ["qrCode", "barCode"],
			autoZoom = true,
			onlyFromCamera = false,
		} = options;

		return new Promise((resolve, reject) => {
			uni.scanCode({
				scanType,
				autoZoom,
				onlyFromCamera,
				success: (res) => {
					resolve({
						result: res.result,
						type: res.scanType,
						charSet: res.charSet,
						path: res.path,
					});
				},
				fail: reject,
			});
		});
	},
};

export default media;
