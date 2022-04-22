let BASE_URL = "";
if (process.env.NODE_ENV === "development") {
    BASE_URL = "https://tiku.ilovenever.com"; // qe & 本地环境
} else {
    BASE_URL = "https://tiku.ilovenever.com"; // 生产环境
}

export default {
    baseUrl: BASE_URL,
    tokenKey: "user-access-token",
    userKey: "user-info",
    historySearchKey: "local-history-search",
    appId: "wxeb407bb6c397aa4c", // 无法动态读取配置，此项作为备选
    appKey: "675aeecfdac05b6b82b9910a8fd00e88",
    routePath: {
        login: "/login"
    }
};
