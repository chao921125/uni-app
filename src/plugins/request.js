const baseUrl = process.env.NODE_ENV === 'production' ? 'https://unidemo.dcloud.net.cn' : 'https://unidemo.dcloud.net.cn';
const defaultHeader = {};
// 同时发送异步代码的次数，防止一次点击中有多次请求，用于处理
let ajaxTimes=0;
// method
/**
 * GET POST PUT DELETE CONNECT HEAD OPTIONS TRACE
 * @param options
 * @returns {Promise<unknown>}
 */
const request = (options) => {
    uni.showLoading({
        title: "Loading...",
        mask: true,
    });
    let url = options.url || '', date = options.date || {}, type = options.type || 'GET', header = options.header || {};
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + url,
            data: date,
            header: Object.assign(defaultHeader, header),
            method: type.toUpperCase(),
            timeout: 60000,
            dataType: 'json',
            success: (res) => {
                // data statusCode header cookies
                resolve(res);
            },
            fail: (err) => {
                // 如果不处理异常信息，这里可以统一处理
                reject(err);
            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes === 0){
                    // 关闭正在等待的图标
                    uni.hideLoading();
                }
            }
        });
    });
}

export default request;
