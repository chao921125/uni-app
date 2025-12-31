import routerPath from "./constants/color.js";
import imgPath from "./constants/images.js";

import request from "./constants/request.js";
import color from "./constants/color.js";
import emoji from "./constants/emoji.js";
import storage from "./constants/storage.js";

export default {
	baseUrl: request.getBaseUrl(),
	httpCode: request.httpCode,
	tokenKey: "user-access-token",
	userKey: "user-info",
	historySearchKey: "local-history-search",
	// 无法动态读取配置，此项作为备选
	appId: "小程序appid",
	secret: "小程序安全码",
	// 路由去需要添加 / 作为根路径
	page: routerPath,
	img: imgPath,
	key: storage,
	color: color,
	emoji: emoji,
};
