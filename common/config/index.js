function getBaseUrl() {
	if (process.env.NODE_ENV === "development") {
		return "http://127.0.0.1"; // qe & 本地环境
	} else {
		return "https://192.168.1.10"; // 生产环境
	}
}

import NoData from "@/static/images/toast/img_nodata.png";
import UserAvatar from "@/static/images/my/user-avatar.png";
import PaySuccess from "@/static/images/mall/pay/icon_pay_weixin.png";
const imgPath = {
    NoData: NoData,
    UserAvatar: UserAvatar,
    PaySuccess: PaySuccess,
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
    },
    imgPath: imgPath
};
