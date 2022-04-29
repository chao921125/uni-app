/**
 * 用户相关
 */
import config from "@/common/api/index.js";
import http from "@/common/plugins/http.js";


/**
 * 登录
 * @param {Object} params
 * userNo: 用户编号，唯一
 * imgUrl: 头像地址
 * userName: 用户名
 */
export function login(params) {
    return http.request(config.basePath + "/profic/user/login", "POST", params, false, false);
}
