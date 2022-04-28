/**
 * 用户相关
 */
import config from "@/common/api/index.js";

export default {
    /**
     * @param {Object} params
     * userNo: 123
     * imgUrl: 123
     * userName: 123
     */
    login: function(params) {
        return http.request(config.basePath + "/profic/user/login", "POST", params, false, false);
    },
    logout: function() {
        
    }
}