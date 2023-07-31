import routerPath from "./routers.js";
import imgPath from "./images.js";
import request from "./request.js";

import color from "./color.js";
import emoji from "./emoji.js";

export default {
	color: color,
	emoji: emoji,
	baseUrl: request.getBaseUrl(),
	httpCode: request.httpCode,
	tokenKey: "user-access-token",
	userKey: "user-info",
	historySearchKey: "local-history-search",
	// 无法动态读取配置，此项作为备选
	appId: "wxa52bb659b38d1ae2",
	secret: "8f20daae39de4842271b28c5e8c9a5e9",
	// 路由去需要添加 / 作为根路径
	routePath: routerPath,
	imgPath: imgPath,
};
