export default {
	// #ifndef H5
	getBaseUrl: function() {
		if (process.env.NODE_ENV === "development") {
			return "https://project6.online/arts"; // qe & 本地环境
		} else {
			return "https://project6.online/arts"; // 生产环境
		}
	},
	// #endif
	// #ifdef H5
	getBaseUrl: function() {
		if (process.env.NODE_ENV === "development") {
			return "/arts"; // qe & 本地环境
		} else {
			return "/arts"; // 生产环境
		}
	},
	// #endif
	httpCode: {
		unLogin: 1001,
		error: 5000,
		success: 9999
	},
	httpCodeStr: {}
}
