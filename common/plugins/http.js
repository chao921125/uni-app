import defaultConfig from "@/common/config/index.js";
import utils from "@/common/plugins/common.utils.js";

let ajaxTimes = 1;
let defaultHeader = {
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Max-Age": "3600",
	"Access": "application/json",
	"Content-Type": "application/json;charset=utf-8",
	"accept": "application/json",
	"Authorization": utils.getToken()
};
let defaultHeaderFile = {
	"Authorization": utils.getToken()
};
export default {
	/**
	 * 请求数据处理
	 * @param string url 请求地址
	 * @param string method 请求方式
	 *  GET or POST
	 * @param {*} postData 请求参数
	 * @param boolean isForm 数据格式
	 *  true: "application/x-www-form-urlencoded"
	 *  false:"application/json"
	 * @param boolean hideLoading 是否隐藏loading
	 *  true: 隐藏
	 *  false:显示
	 */
	request: async function(url, method, params, isForm = false, hideLoading = false) {
		//接口请求
		let loadding = false;
		if (!hideLoading) {
            loadding = true;
            utils.showLoading();
		}
        if (isForm) {
            Object.assign(defaultHeader, { "Content-Type": "application/x-www-form-urlencoded" })
        }

		return new Promise((resolve, reject) => {
			uni.request({
				url: defaultConfig.baseUrl + url,
				data: params,
				header: defaultHeader,
				method: method, //"GET","POST"
				dataType: "json",
				success: (res) => {
					if (loadding && !hideLoading) {
						uni.hideLoading();
					}
					// if () {}
					resolve(res.data);
				},
				fail: (res) => {
                    uni.hideLoading();
					utils.toast("网络不给力，请稍后再试~");
					reject(res);
				},
                complete: () => {
                    ajaxTimes--;
                    if (ajaxTimes <= 0){
                        // 关闭正在等待的图标
                        uni.hideLoading();
                    }
                }
			})
		})
	},
	/**
	 * 上传文件
	 * @param string url 请求地址
	 * @param string src 文件路径
	 */
	uploadFile: function(url, src) {
		utils.showLoading()
		return new Promise((resolve, reject) => {
			const uploadTask = uni.uploadFile({
				url: defaultConfig.baseUrl + url,
				filePath: src,
				name: "imageFile",
				header: defaultHeaderFile,
				formData: {},
				success: function(res) {
					uni.hideLoading()
					let d = JSON.parse(res.data.replace(/\ufeff/g, "") || "{}")
					if (d.code % 100 == 0) {
						//返回图片地址
						let fileObj = d.data;
						resolve(fileObj)
					} else {
						that.toast(res.msg);
					}
				},
				fail: function(res) {
					reject(res)
					that.toast(res.msg);
				}
			})
		})
	},
	httpJsonp: function(url, callback, callbackname) {
		// #ifdef H5
		window[callbackname] = callback;
		let httpScript = document.createElement("script");
		httpScript.src = url;
		httpScript.type = "text/javascript";
		document.head.appendChild(httpScript);
		document.head.removeChild(httpScript);
		// #endif
	},
};
