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