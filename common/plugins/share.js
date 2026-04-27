export function initShare(options = {}) {
	const { title = "默认分享标题", path = "", imageUrl = "", withShareTicket = true, menus = ["shareAppMessage", "shareTimeline"] } = options;

	return new Promise((resolve, reject) => {
		// 1. 检查平台
		if (process.env.UNI_PLATFORM !== "mp-weixin") {
			resolve({ supported: false, reason: "not-weixin" });
			return;
		}

		// 2. 检查基础库版本
		const sys = uni.getSystemInfoSync?.();
		if (sys?.SDKVersion && sys.SDKVersion < "1.2.0") {
			resolve({ supported: false, reason: "low-version" });
			return;
		}

		// 3. 调用 showShareMenu
		uni.showShareMenu({
			withShareTicket,
			menus,
			success: () => {
				console.log("✅ 分享菜单初始化成功");
				resolve({ supported: true });
			},
			fail: (err) => {
				console.warn("⚠️ 分享菜单初始化失败:", err);
				// 不 reject，避免阻塞主流程
				resolve({ supported: false, reason: err.errMsg || "unknown" });
			},
		});
	});
}
