/**
 * 测试接口
 */
import config from "@/api/index.js";
import Http from "@/common/plugins/http.js";

const demo = config.testPath + "/demo";

export function testGet() {
	return Http.request(demo + "/demo", "GET", null, false, false);
}

export function testPost(params = {}) {
	return Http.request(demo + "/demo", "POST", params, false, false);
}
