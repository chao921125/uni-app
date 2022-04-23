/**
 * 测试接口
 */
import config from "@/common/api/index.js";
import http from "@/common/plugins/http.js";

export function test() {
	return http.request(config.testPath + "/user/1", "GET", null, false, false);
}
