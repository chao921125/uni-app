/*
 * @Author: 王肇峰
 * @Date: 2020-05-08 15:36:09
 * @Last Modified by: 冯杰
 * @Last Modified time: 2020-10-27 14:25:52
 */

/**
 * 工具类
 */
class Tools {
  // 判断页面是否在WebView中打开
  openInWebview() {
    const ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      // 微信浏览器判断
      return false;
    } else if (ua.match(/QQ/i) == 'qq') {
      // QQ浏览器判断
      return false;
    } else if (ua.match(/WeiBo/i) == 'weibo') {
      return false;
    } else {
      if (ua.match(/Android/i) != null) {
        return ua.match(/browser/i) == null;
      } else if (ua.match(/iPhone/i) != null) {
        return ua.match(/safari/i) == null;
      } else {
        return ua.match(/macintosh/i) == null && ua.match(/windows/i) == null;
      }
    }
  }
}
module.exports = new Tools();
