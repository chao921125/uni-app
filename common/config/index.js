import routerPath from "./routers.js";
import imgPath from "./images.js";
import httpConfig from "./http.config.js";

import color from "./color.js";
import emoji from "./emoji.js";

export default {
    color: color,
    emoji: emoji,
    baseUrl: httpConfig.getBaseUrl(),
	httpCode: httpConfig.httpCode,
    tokenKey: "user-access-token",
    userKey: "user-info",
    historySearchKey: "local-history-search",
	// 无法动态读取配置，此项作为备选
    appId: "wxeb407bb6c397aa4c",
    appKey: "675aeecfdac05b6b82b9910a8fd00e88",
	// 路由去需要添加 / 作为根路径
    routePath: routerPath,
    imgPath: imgPath
};
