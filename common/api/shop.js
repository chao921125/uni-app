/**
 * 专家相关
 */
import config from "@/common/api/index.js";
import http from "@/common/plugins/http.js";

/**
 * 领域列表
 * @param {Object} params
 */
export function subjectList(params) {
	return http.request(config.basePath + "/area/list", "POST", params, false, false);
}

/**
 * 专家列表
 * @param {Object} params
 * pageSize: 10 分页条数
 * pageNum: 1 当前页码
 * field: 领域id
 * proficNo: 专家编号
 * proficVx: 专家vx
 * proficName: 专家名称
 * proficTel: 联系方式
 */
export function expertList(params) {
	return http.request(config.basePath + "/profic/list", "POST", params, false, false);
}

/**
 * 专家
 * @param {Object} params
 * proficNo: 专家编号
 */
export function expertDetail(params) {
	return http.request(config.basePath + "/profic/list/nopage", "POST", params, false, false);
}

/**
 * 商品列表
 * @param {Object} params
 * currentPage: number
 * pageSize: number
 */
export function selectShopList(params) {
	return http.request(config.basePath + "/system/shop/front/queryShopsList", "POST", params, false, false);
}

/**
 * 商品详情
 * @param {Object} params
 * currentPage: number
 * pageSize: number
 */
export function shopDetail(params) {
	return http.request(config.basePath + "/system/shop/front/queryShopsList", "POST", params, false, false);
}
