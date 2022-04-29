/**
 * 用户相关
 */
import config from "@/common/api/index.js";


/**
 * @param {Object} params
 * userNo: 123
 * imgUrl: 123
 * userName: 123
 */
export function login(params) {
    return http.request(config.basePath + "/profic/user/login", "POST", params, false, false);
}
