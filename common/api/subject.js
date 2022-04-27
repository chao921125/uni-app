/**
 * 题目相关
 */
import config from "@/common/api/index.js";
import http from "@/common/plugins/http.js";

/**
 * 领域列表
 * @param {Object} params
 */
export function subjectList(params) {
	return http.request(config.basePath + "/area/list", "POST", null, false, false);
}

/**
 * 专家列表
 * @param {Object} params
 * {
 * 	pageSize: 10
 * 	pageNum: 1
 * 	field: 111
 * 	proficNo: P59168520220423
 * 	proficVx: 123321
 * 	proficName: 
 * 	proficTel: 
 * }
 */
export function expertList(params) {
	return http.request(config.basePath + "/profic/list", "POST", null, false, false);
}
