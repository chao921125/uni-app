let BASE_URL = '';
// http://101.201.121.81
if (process.env.NODE_ENV === 'development') {
    BASE_URL = 'http://101.201.121.81'; // qe环境
} else {
    BASE_URL = 'http://101.201.121.81'; // 生产环境
}

export default {
    tokenKey: 'user-access-token',
    historySearchKey: 'local-history-search',
    baseUrl: BASE_URL,
    appId: 'wxeb407bb6c397aa4c', // 无法动态读取配置，此项作为备选
    appKey: '675aeecfdac05b6b82b9910a8fd00e88'
}
