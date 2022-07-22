/**
 * 订单相关
 */
import config from "@/common/api/index.js";
import http from "@/common/plugins/http.js";


/**
 * 下单
 * @param {Object} params
 * requestNo: string 时间戳
 * shopId: number
 */
export function orderCreate(params) {
    return http.request(config.basePath + "/system/forder/front/makeOrder", "POST", params, false, false);
}

/**
 * 订单列表
 * @param {Object} params
 * status: string
 */
export function orderSelectList(params) {
    return http.request(config.basePath + "/system/forder/front/getOrderLists", "POST", params, false, false);
}

/**
 * 收款订单列表
 * @param {Object} params
 * id: number 订单id
 */
export function orderSelectAmount(params) {
    return http.request(config.basePath + "/system/forder/front/getSurePayOrderList", "POST", params, false, false);
}

/**
 * 上架
 * @param {Object} params
 * id: number 订单id
 */
export function orderCreateShop(params) {
    return http.request(config.basePath + "/system/forder/front/upShopApprove", "POST", params, false, false);
}

/**
 * 确认付款
 * @param {Object} params
 * id: number 订单id
 */
export function orderUpdatePay(params) {
    return http.request(config.basePath + "/system/forder/front/buyUserSurePay", "POST", params, false, false);
}

/**
 * 确认收款
 * @param {Object} params
 * priceType: number 价格类型1:2000-3000  2：3001-8000 3 8000以上
 */
export function orderUpdateAmount(params) {
    return http.request(config.basePath + "/system/forder/front/surePayOrder", "POST", params, false, false);
}

/**
 * 预约列表
 * @param {Object} params
 */
export function selectBookingList(params = {}) {
    return http.request(config.basePath + "/system/appointment/front/getUserAppointList", "POST", params, false, false);
}

/**
 * 预约
 * @param {Object} params
 * id: number 订单id
 */
export function createBooking(params) {
    return http.request(config.basePath + "/system/appointment/front/saveUserAppoint", "POST", params, false, false);
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
    return http.request(config.basePath + "/profic/order/insertOrderContent", "POST", params, false, true);
}
