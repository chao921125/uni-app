export default {
    testPath: "/test",
    basePath: "",
    paramsReauired: function(params) {
        // 参数允许为非JSON Object格式
        if (Object.keys(params).length === 0) {
			// uni.
			return false;
		}
        return true;
    }
};
