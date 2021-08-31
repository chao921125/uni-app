import config from '@/plugins/config';
import Storage from "@/common/storage.js";
import { isGotoLogin, toLogin } from "@/common/plugin.js";
const defaultHeader = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Max-Age': '3600',
    'Access': 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
    'accept': 'application/json'
};
// 同时发送异步代码的次数，防止一次点击中有多次请求，用于处理
let ajaxTimes = 1;
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
    isGotoLogin();
    let url = options.url || '', data = options.data || {}, method = options.method || 'GET', header = options.header || {};
    return new Promise((resolve, reject) => {
        console.log("request url : ", config.baseUrl + url);
        console.log("request data : ", data);
        console.log("request header : ", defaultHeader);
        const toke = Storage.getStorageSync('userInfo') ? Storage.getStorageSync('userInfo').authorization : '';
        Object.assign(defaultHeader, {'authorization': toke});
        uni.request({
            url: config.baseUrl + url,
            data: data,
            header: Object.assign(defaultHeader, header),
            method: method.toUpperCase(),
            timeout: 60000,
            dataType: 'json',
            success: (res) => {
                // data statusCode header cookies
                console.log("response success : ", res);
                resolve(res.data);
            },
            fail: (err) => {
                // 如果不处理异常信息，这里可以统一处理
                console.log("response err : ", err);
				toLogin();
                reject(err);
            },
            complete: () => {
                ajaxTimes--;
                if (ajaxTimes <= 0){
                    // 关闭正在等待的图标
                    uni.hideLoading();
                }
            }
        });
    });
}

export default request;
