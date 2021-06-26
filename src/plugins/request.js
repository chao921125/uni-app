import config from '@/plugins/config';
const defaultHeader = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Max-Age': '3600',
    'Access': 'application/json',
    'Content-Type': 'application/json;charset=utf-8'
};
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
    debugger;
    let url = options.url || '', data = options.data || {}, method = options.method || 'GET', header = options.header || {};
    return new Promise((resolve, reject) => {
        uni.request({
            url: config.baseUrl + url,
            data: data,
            header: Object.assign(defaultHeader, header),
            method: method.toUpperCase(),
            timeout: 60000,
            dataType: 'json',
            success: (res) => {
                debugger;
                // data statusCode header cookies
                resolve(res);
            },
            fail: (err) => {
                debugger;
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
