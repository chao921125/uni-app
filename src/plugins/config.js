let BASE_URL = '';
if (process.env.NODE_ENV == 'development') {
    BASE_URL = 'http://mylocal.com/'; // qe环境
} else {
    BASE_URL = 'https://47.98.228.230/'; // 生产环境
}

export default {
    base_url: BASE_URL,
    appId: 'wxeb407bb6c397aa4c', // 无法动态读取配置，此项作为备选
    appKey: '675aeecfdac05b6b82b9910a8fd00e88'
}
