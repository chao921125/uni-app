/**
 * 订单相关
 */
import config from "@/common/api/index.js";
import http from "@/common/plugins/http.js";


/**
 * 下单
 * @param {Object} params
 * fuserNo: 用户编号
 * proNo: 专家号
 * title: 咨询标题
 * text: 咨询内容
 */
export function orderUser(params) {
    return http.request(config.basePath + "/profic/user/order", "POST", params, false, false);
}

/**
 * 订单列表
 * @param {Object} params
 * fuserNo: 用户编号
 * orderNo: 订单编号
 */
export function orderList(params) {
    return http.request(config.basePath + "/profic/order/list", "POST", params, false, false);
}

/**
 * 订单详情
 * @param {Object} params
 * fuserNo: 用户编号
 * orderNo: 订单编号
 */
export function orderDetail(params) {
    return http.request(config.basePath + "/profic/order/alone", "POST", params, false, false);
}

/**
 * 订单聊天详情
 * @param {Object} params
 * orderNo: 订单编号
 */
export function orderContentList(params) {
    return http.request(config.basePath + "/profic/order/contentList", "POST", params, false, true);
}

/**
 * 订单聊天
 * @param {Object} params
 * fuserNo: 用户编号
 * orderNo: 订单编号
 * content: 聊天内容
 */
export function orderContentUser(params) {
    return http.request(config.basePath + "/profic/order/insertOrderContent", "POST", params, false, false);
}
