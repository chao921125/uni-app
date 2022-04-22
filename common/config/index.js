function getBaseUrl() {
	if (process.env.NODE_ENV === "development") {
		return "https://tiku.ilovenever.com"; // qe & 本地环境
	} else {
		return "https://tiku.ilovenever.com"; // 生产环境
	}
}

export default {
    baseUrl: getBaseUrl(),
    tokenKey: "user-access-token",
    userKey: "user-info",
    historySearchKey: "local-history-search",
	// 无法动态读取配置，此项作为备选
    appId: "wxeb407bb6c397aa4c",
    appKey: "675aeecfdac05b6b82b9910a8fd00e88",
	// 路由去需要添加 / 作为根路径
    routePath: {
        tabbarHome: "/pages/tabbar/home",
        tabbarOrder: "/pages/tabbar/order",
        tabbarUser: "/pages/tabbar/user",
        orderExpert: "/pages/order/expert",
        orderPay: "/pages/order/orderPay",
        orderPayResult: "/pages/order/payResult",
        orderList: "/pages/order/list",
    }
};
