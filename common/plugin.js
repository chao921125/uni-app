import Storage from "@/common/storage.js";

/**
 * 判断当前是否已经登录
 */
export function isGotoLogin() {
    let routes = getCurrentPages();
    if (!routes[routes.length - 1]) return ;
    let curRoute = routes[routes.length - 1].route;
    if (!Storage.getStorageSync('userInfo') && !(curRoute.includes("/login") || curRoute.includes("/home"))) {
        uni.navigateTo({
            url: "/pages/login/login"
        });
    }
}

/**
 * 获取当前路由，返回完整路径
 */
export function getRouterCurrent() {
    let routes = getCurrentPages();
    if (!routes[routes.length - 1]) return ;
    return "/" + routes[routes.length - 1].route;
}

// 打开url在浏览器中
export function openBrowserUrl(url) {
    if (!url) return ;
    plus.runtime.openURL(url);
}
/**
 * if you want to get other params, please set them in App.vue.
 * onLaunch() {}
 */
export function getParamsApp() {
    try {
        // 存放至缓存中或者其他地方
        Storage.removeStorageSync("arguments");
        Storage.setStorageSync("arguments", plus.runtime.arguments);
        // 这是必须的，否则无法在下次唤醒的时候触发该函数
        plus.globalEvent.addEventListener('newintent', (e)=>{
             // 检测启动参数
            Storage.setStorageSync("arguments", plus.runtime.arguments);
        });
    } catch(e) {
        console.log(e);
    }
}

/**
 * 打开APP
 * @param {Object} openParmas
 * pname
 * action
 * extra
 * 所有跳转的URL必须为绝对路径
 */
export function openApp(openParmas) {
    // if (!openParmas) return ;
    // if (!openParmas.pname || !openParmas.action) return ;
    let params = {
        // "com.advokate.nft" "io.dcloud.HBuilder"
        pname: openParmas.pname || "com.DefaultCompany.JacksonWang",
        action: openParmas.action || "weixin://",
        extra: openParmas.extra || {url: "https://www.baidu.com/"}
    };
    if (plus.runtime.isApplicationExist(params)) {
        console.log("openApp openParmas", openParmas);
        // if(plus.runtime.launcher=='shortcut'){  
            // 表示通过快捷方式启动，一般支持touch才会触发
        // }
        if (plus.os.name == "Android") {
            plus.runtime.launchApplication(params, function (e) {
                // 找不到此APP可以跳转到下载或者应用商店等等
                console.log('Open system default browser failed: ' + e.message);
            });
        }
        if (plus.os.name == "iOS") {
            delete params.pname;
            plus.runtime.launchApplication(params, function (e) {
                console.log('Open system default browser failed: ' + e.message);
            });
        }
    } else {
        openBrowserUrl(url);
    }
}

// 获取cookie APP没有document对象所以无法正确获得cookie
export function getCookie(cName) {
    if (!document.cookie) return '';
    let name = cName + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

// 获取当前APP列表
export function getAppList() {  
    plus.android.importClass('java.util.ArrayList');  
    plus.android.importClass('android.content.pm.PackageInfo');    
    plus.android.importClass('android.content.pm.PackageManager');  
    var ApplicationInfo = plus.android.importClass('android.content.pm.ApplicationInfo');  
    var MainActivity = plus.android.runtimeMainActivity();    
    var PackageManager = MainActivity.getPackageManager();    
    var pinfo = plus.android.invoke(PackageManager, 'getInstalledPackages', 0)    
    if (pinfo != null) {  
        var apklist = []  
        for (var i = 0; i < pinfo.size(); i++) {    
            //PackageInfo{4b45699f9d  com.tencent.mobileqq}    
            var pkginfo = pinfo.get(i);  
            var issysapk = ((pkginfo.plusGetAttribute("applicationInfo").plusGetAttribute("flags") & ApplicationInfo.FLAG_SYSTEM) != 0) ? true : false  
            if(issysapk == false){  
                const apkinfo = {  
                    appName:pkginfo.plusGetAttribute("applicationInfo").loadLabel(PackageManager).toString(),  
                    packageName:pkginfo.plusGetAttribute("packageName"),  
                    versionName:pkginfo.plusGetAttribute("versionName"),  
                    versionCode:pkginfo.plusGetAttribute("versionCode")  
                }  
                apklist.push(apkinfo)  
            }  

        }  
        //this.appList = apklist  
        //打印出所有的APP名称，包名，版本  
        console.log(JSON.stringify(apklist))  
    }  
}

/**
 * 强制横屏竖屏
 */
export function scren() {
    // plus.screen.lockOrientation('landscape-primary'); 
    // plus.screen.lockOrientation('portrait-primary'); 
    // plus.screen.unlockOrientation(); 
}

/**
 * 获取已经授权的列表
 */
export function getOpenSetting() {
	return new Promise((resolve, reject) => {
		uni.getSetting({
			success(res) {
				resolve(res.authSetting);
			},
			fail(e) {
				reject(e);
			}
		});
	});
}
/**
 * 判断当前权限是否已经开启
 * @param {Object} type
 */
export function isOpenSetting(type) {
	if (!type) return false;
	type = Number(type);
	return new Promise((resolve, reject) => {
		let key = "";
		switch(type) {
			case 1: key = "scope.userInfo"; break; // 用户信息 uni.getUserInfo
			case 2: key = "scope.userLocation"; break; // 地理位置 uni.getLocation, uni.chooseLocation
			case 3: key = "scope.userLocationBackground"; break; // 后台定位 wx.userLocationBackground
			case 4: key = "scope.address"; break; // 通信地址 uni.chooseAddress
			case 5: key = "scope.record"; break; // 录音功能 uni.getRecorderManager
			case 6: key = "scope.writePhotosAlbum"; break; // 保存到相册 uni.saveImageToPhotosAlbum, uni.saveVideoToPhotosAlbum
			case 7: key = "scope.camera"; break; // 摄像头 <camera />
			case 8: key = "scope.invoice"; break; // 获取发票 wx.chooseInvoice
			case 9: key = "scope.invoiceTitle"; break; // 发票抬头 uni.chooseInvoiceTitle
			case 10: key = "scope.werun"; break; // 微信运动步数 wx.getWeRunData
			default: key = ""; break;
		}
		if (!key) resolve(false);
		uni.getSetting({
			success(res) {
				if (!res.authSetting[key]) {
					uni.authorize({
						scope: key,
						success: (res) => {
							resolve(res);
						},
						fail: (e) => {
							uni.showModal({
								title: "提示",
								content: "是否拒绝授权？",
								confirmText: "确认",
								cancelText: "取消",
								success: (res) => {
									if (res.confirm) {
										uni.openSetting({
											success(res) {
												res.authSetting[key] = true;
												resolve(res);
											},
											fail(e) {
												reject(e);
											}
										});
									}
								},
								fail: (e) => {
									reject(e);
								}
							});
						}
					});
				} else {
					resolve(res);
				}
			},
			fail(e) {
				reject(e);
			}
		});
		// 打开已经授权的设置
		// uni.openSetting({
		// 	success(res) {
		// 		resolve(res.authSetting[key]);
		// 	},
		// 	fail(e) {
		// 		reject(e);
		// 	}
		// });
	});
	
}

/**
 * 授权登录
 */
export function oauthWX() {
	uni.getProvider({
		service: "oauth	",
		success: function(res) {
			console.log(res);
		},
		fail: function() {
			uni.showToast({
			    title: "error",
			    icon: 'none'
			});
		},
		complete: function() {}
	})
}
