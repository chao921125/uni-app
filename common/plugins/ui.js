/**
 * UniApp UI交互模块封装
 * 功能：Toast/Modal/Loading/ActionSheet/Picker等UI组件
 * 平台：全平台兼容
 */

import Platform from "./platform.js";

export const UI = {
	// ==================== Toast提示 ====================

	/**
	 * 显示成功提示
	 * @param {string} title - 提示内容
	 * @param {number} duration - 持续时间（毫秒）
	 */
	success(title = "操作成功", duration = 1500) {
		return uni.showToast?.({
			title,
			icon: "success",
			duration,
		});
	},

	/**
	 * 显示错误提示
	 * @param {string} title - 提示内容
	 * @param {number} duration - 持续时间
	 */
	error(title = "操作失败", duration = 2000) {
		return uni.showToast?.({
			title,
			icon: "error",
			duration,
		});
	},

	/**
	 * 显示警告提示
	 * @param {string} title - 提示内容
	 */
	warning(title = "请注意", duration = 2000) {
		return uni.showToast?.({
			title,
			icon: "none",
			image: "/static/images/warning.png", // 自定义图标
			duration,
		});
	},

	/**
	 * 显示纯文本提示（无图标）
	 * @param {string} title - 提示内容
	 */
	info(title, duration = 1500) {
		return uni.showToast?.({
			title,
			icon: "none",
			duration,
		});
	},

	/**
	 * 显示加载提示
	 * @param {string} title - 提示内容
	 */
	loading(title = "加载中...") {
		return uni.showLoading?.({
			title,
			mask: true,
		});
	},

	/**
	 * 隐藏加载提示
	 */
	hideLoading() {
		return uni.hideLoading?.();
	},

	// ==================== Modal对话框 ====================

	/**
	 * 显示确认对话框
	 * @param {Object} options - 配置项
	 * @returns {Promise<boolean>} 用户是否点击确定
	 */
	confirm(options = {}) {
		const {
			title = "提示",
			content = "",
			confirmText = "确定",
			cancelText = "取消",
			showCancel = true,
			cancelColor = "#000000",
			confirmColor = "#3CC51F",
		} = options;

		return new Promise((resolve) => {
			uni.showModal?.({
				title,
				content,
				showCancel,
				cancelText,
				confirmText,
				cancelColor,
				confirmColor,
				success: (res) => {
					resolve(res.confirm);
				},
				fail: () => {
					resolve(false);
				},
			});
		});
	},

	/**
	 * 显示警告对话框
	 * @param {string} content - 警告内容
	 */
	alert(content, title = "警告") {
		return this.confirm({
			title,
			content,
			showCancel: false,
			confirmText: "我知道了",
		});
	},

	/**
	 * 显示输入对话框
	 * @param {Object} options - 配置项
	 * @returns {Promise<string|null>} 用户输入的内容
	 */
	prompt(options = {}) {
		const {
			title = "请输入",
			placeholder = "",
			defaultValue = "",
			maxLength = 140,
		} = options;

		return new Promise((resolve) => {
			// #ifdef H5
			// H5端使用原生prompt
			const result = window.prompt(`${title}\n${placeholder}`, defaultValue);
			resolve(result);
			// #endif

			// #ifndef H5
			// 小程序和App端使用自定义弹窗
			uni.showModal?.({
				title,
				content: placeholder,
				editable: true,
				placeholderText: placeholder,
				success: (res) => {
					if (res.confirm) {
						resolve(res.content || defaultValue);
					} else {
						resolve(null);
					}
				},
				fail: () => resolve(null),
			});
			// #endif
		});
	},

	// ==================== ActionSheet操作菜单 ====================

	/**
	 * 显示操作菜单
	 * @param {string[]} itemList - 按钮文字数组
	 * @param {Object} options - 配置项
	 * @returns {Promise<number>} 用户点击的按钮索引
	 */
	actionSheet(itemList, options = {}) {
		const {
			itemColor = "#000000",
			alertText = null,
		} = options;

		return new Promise((resolve, reject) => {
			uni.showActionSheet?.({
				itemList,
				itemColor,
				alertText,
				success: (res) => {
					resolve(res.tapIndex);
				},
				fail: (err) => {
					reject(err);
				},
			});
		});
	},

	/**
	 * 显示分享菜单
	 * @param {Object} options - 配置项
	 */
	async shareMenu(options = {}) {
		const actions = [
			"微信好友",
			"朋友圈",
			"复制链接",
			"生成海报",
		];

		try {
			const index = await this.actionSheet(actions, {
				alertText: options.title || "分享到",
			});

			switch (index) {
				case 0:
					// 分享给微信好友
					if (Platform.isMp()) {
						uni.share?.({
							provider: "weixin",
							scene: "WXSceneSession",
							type: 0,
							href: options.url,
							title: options.title,
							summary: options.summary,
							imageUrl: options.imageUrl,
						});
					}
					break;
				case 1:
					// 分享到朋友圈
					if (Platform.isMp()) {
						uni.share?.({
							provider: "weixin",
							scene: "WXSenceTimeline",
							type: 0,
						});
					}
					break;
				case 2:
					// 复制链接
					this.copyToClipboard(options.url || "");
					break;
				case 3:
					// 生成海报（需要额外实现）
					console.log("Generate poster");
					break;
			}
		} catch {
			// 用户取消
		}
	},

	// ==================== Picker选择器 ====================

	/**
	 * 显示日期选择器
	 * @param {Object} options - 配置项
	 * @returns {Promise<string>} 选择的日期
	 */
	datePicker(options = {}) {
		const {
			value = new Date().toISOString().split("T")[0],
			start = "1900-01-01",
			end = "2100-12-31",
			fields = "day", // year/month/day
		} = options;

		return new Promise((resolve, reject) => {
			uni.showDatePicker?.({
				value,
				start,
				end,
				fields,
				success: (res) => {
					resolve(res.date);
				},
				fail: reject,
			}) || reject(new Error("showDatePicker not supported"));
		});
	},

	/**
	 * 显示时间选择器
	 * @param {Object} options - 配置项
	 * @returns {Promise<string>} 选择的时间
	 */
	timePicker(options = {}) {
		const {
			value = "12:00",
			start = "00:00",
			end = "23:59",
		} = options;

		return new Promise((resolve, reject) => {
			uni.showTimePicker?.({
				value,
				start,
				end,
				success: (res) => {
					resolve(res.time);
				},
				fail: reject,
			}) || reject(new Error("showTimePicker not supported"));
		});
	},

	/**
	 * 显示多列选择器
	 * @param {Array[]} range - 选择范围（二维数组）
	 * @param {Object} options - 配置项
	 * @returns {Promise<number[]>} 选择的索引数组
	 */
	multiSelector(range, options = {}) {
		const {
			defaultValue = range.map(() => 0),
			title = "请选择",
		} = options;

		return new Promise((resolve, reject) => {
			uni.showMultiSelector?.({
				range,
				defaultValue,
				title,
				success: (res) => {
					resolve(res.index);
				},
				fail: reject,
			}) || reject(new Error("showMultiSelector not supported"));
		});
	},

	// ==================== 剪贴板 ====================

	/**
	 * 复制内容到剪贴板
	 * @param {string} data - 要复制的内容
	 * @returns {Promise<boolean>}
	 */
	copyToClipboard(data) {
		return new Promise((resolve, reject) => {
			uni.setClipboardData?.({
				data: String(data),
				success: () => {
					this.success("已复制");
					resolve(true);
				},
				fail: reject,
			});
		});
	},

	/**
	 * 从剪贴板读取内容
	 * @returns {Promise<string>}
	 */
	readFromClipboard() {
		return new Promise((resolve, reject) => {
			uni.getClipboardData?.({
				success: (res) => {
					resolve(res.data);
				},
				fail: reject,
			});
		});
	},

	// ==================== 导航栏 ====================

	/**
	 * 设置页面标题
	 * @param {string} title - 标题文字
	 */
	setTitle(title) {
		uni.setNavigationBarTitle?.({ title });
	},

	/**
	 * 显示导航栏加载动画
	 */
	showNavigationBarLoading() {
		uni.showNavigationBarLoading?.();
	},

	/**
	 * 隐藏导航栏加载动画
	 */
	hideNavigationBarLoading() {
		uni.hideNavigationBarLoading?.();
	},

	/**
	 * 设置TabBar样式
	 * @param {Object} options - 配置项
	 */
	setTabBarStyle(options = {}) {
		const {
			color,
			selectedColor,
			backgroundColor,
			borderStyle,
		} = options;

		return uni.setTabBarStyle?.({
			color,
			selectedColor,
			backgroundColor,
			borderStyle,
		});
	},

	/**
	 * 设置TabBar徽标
	 * @param {number} index - TabBar索引
	 * @param {string} text - 徽标文字
	 */
	setTabBarBadge(index, text) {
		return uni.setTabBarBadge?.({
			index,
			text,
		});
	},

	/**
	 * 移除TabBar徽标
	 * @param {number} index - TabBar索引
	 */
	removeTabBarBadge(index) {
		return uni.removeTabBarBadge?.({ index });
	},

	/**
	 * 显示TabBar红点
	 * @param {number} index - TabBar索引
	 */
	showTabBarRedDot(index) {
		return uni.showTabBarRedDot?.({ index });
	},

	/**
	 * 隐藏TabBar红点
	 * @param {number} index - TabBar索引
	 */
	hideTabBarRedDot(index) {
		return uni.hideTabBarRedDot?.({ index });
	},

	// ==================== 下拉刷新 ====================

	/**
	 * 开始下拉刷新动画
	 */
	startPullDownRefresh() {
		return uni.startPullDownRefresh?.();
	},

	/**
	 * 停止下拉刷新动画
	 */
	stopPullDownRefresh() {
		return uni.stopPullDownRefresh?.();
	},

	// ==================== 滚动 ====================

	/**
	 * 页面滚动到指定位置
	 * @param {number} scrollTop - 滚动距离
	 * @param {Object} options - 配置项
	 */
	pageScrollTo(scrollTop, options = {}) {
		const {
			duration = 300,
			selector = "",
		} = options;

		return uni.pageScrollTo?.({
			scrollTop,
			duration,
			selector,
		});
	},

	// ==================== 震动反馈 ====================

	/**
	 * 短震动
	 */
	vibrateShort() {
		return uni.vibrateShort?.({
			type: "light", // light/medium/heavy
		});
	},

	/**
	 * 长震动
	 */
	vibrateLong() {
		return uni.vibrateLong?.();
	},
};

// ==================== 默认导出 ====================
export default UI;
