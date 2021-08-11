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

export function openBrowserUrl(url) {
    if (!url) return ;
    plus.runtime.openURL(url);
}
