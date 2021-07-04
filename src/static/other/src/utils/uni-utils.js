/*
 * @Author: 吴占超
 * @Date: 2019-08-22 20:29:35
 * @Last Modified by: 侯琳
 * @Last Modified time: 2021-06-25 16:58:06
 */
// import store from '../store';
// import { routelist } from './route-list';
// import store from '../store/index';
// import { routelist } from './route-list';
// import { getItem } from './set-storage';
// import { codeList } from '../../constant.config';
import store from '../store/index';
import { routelist } from './route-list';
import Stro from '../utils/set-storage';
const navigate = Symbol('navigate');
const findToUrl = Symbol('findToUrl');
// eslint-disable-next-line no-unused-vars
const _lastTime = undefined;

class UniUtils {
  showToast(text) {
    this[navigate]({
      title: text,
      icon: 'none'
    }, 'showToast');
  }
  [findToUrl](url) {
    const route = url.indexOf('?') !== -1 ? url.match(/(\S*)\?/)[1] : url;
    if (process.env.NODE_ENV === 'development' && !Stro.getItem('codeMall')) {
      return '/pages/login/check-code';
    } else if (process.env.NODE_ENV !== 'development' && (!store.getters.authorization && !routelist.includes(route))) {
      return '/pages/login/login';
    } else {
      return url;
    }
    // return url;
  }
  /**
   * 保留当前页面，跳转到应用内的某个页面，使用uni.navigateBack可以返回到原页面。
   */
  navigateTo({ url, animationType = 'pop-in', animationDuration = 300, success = undefined, fail = undefined, complete = undefined } = {}) {
    const newUrl = this[findToUrl](url);
    // console.log(newUrl);
    this[navigate]({
      url: newUrl, animationType, animationDuration, success, fail, complete
    });
  }
  // 关闭当前页面，跳转到应用内的某个页面。
  redirectTo({ url, success = undefined, fail = undefined, complete = undefined } = {}) {
    const newUrl = this[findToUrl](url);
    this[navigate]({
      url: newUrl, success, fail, complete
    }, 'redirectTo');
  }
  // 关闭所有页面，打开到应用内的某个页面。
  reLaunch({ url, success = undefined, fail = undefined, complete = undefined } = {}) {
    const newUrl = this[findToUrl](url);
    this[navigate]({
      url: newUrl, success, fail, complete
    }, 'reLaunch');
  }
  // 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面。
  switchTab({ url, success = undefined, fail = undefined, complete = undefined } = {}) {
    const newUrl = this[findToUrl](url);
    this[navigate]({
      url: newUrl, success, fail, complete
    }, 'switchTab');
  }
  // 关闭当前页面，返回上一页面或多级页面。
  navigateBack(delta = 1) {
    // #ifndef H5
    this[navigate]({ delta }, 'navigateBack');
    // #endif
    // #ifdef H5
    history.back();
    // #endif
  }
  // 模态弹窗，类比html的alert和confirm
  async showModal({
    title,
    content,
    showCancel = true,
    cancelText = '取消',
    cancelColor = '#cccccc',
    confirmText = '確定',
    confirmColor = '#353535'
  } = {}) {
    return new Promise((resolve, reject) => {
      // eslint-disable-next-line no-undef
      uni.showModal({
        title,
        content,
        showCancel,
        cancelText,
        cancelColor,
        confirmText,
        confirmColor,
        success: result => {
          resolve(result);
        },
        fail: err => {
          reject(err);
        }
      });
    });
  }
  // 分流函数（方法名，分流时间）
  throttle(fn, gapTime) {
    // return () => {
    //   let _nowTime = new Date();
    //   if (_nowTime - this._lastTime > gapTime || !this._lastTime) {
    //     fn();
    //     this._lastTime = _nowTime;
    //   }
    // };
  }
  [navigate](param, actionName = 'navigateTo') {
    // eslint-disable-next-line no-undef
    uni[actionName](param);
  }
}
module.exports = new UniUtils();
