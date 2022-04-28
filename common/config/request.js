export default {
	getBaseUrl: function() {
		if (process.env.NODE_ENV === "development") {
			return "http://127.0.0.1"; // qe & 本地环境
		} else {
			return "https://192.168.1.10"; // 生产环境
		}
	},
	httpCode: {
		unLogin: 1001
	},
	httpCodeStr: {}
}
