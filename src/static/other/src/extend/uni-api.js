'use strict';
/**
 * 登陆
 */
exports.login = (provider = 'weixin') => {
  return new Promise((resolve, reject) => {
    uni.login({
      provider,
      success: (loginRes) => {
        resolve(loginRes);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};

/**
 * 检查session
 */
exports.checkSession = () => {
  return new Promise((resolve, reject) => {
    uni.checkSession(() => {
      resolve();
    }, (err) => {
      reject(err);
    });
  });
};

/**
 * 获取用户信息
 */
exports.getUserInfo = (provider = 'weixin') => {
  return new Promise((resolve, reject) => {
    uni.getUserInfo({
      provider,
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};

/**
 * 微信用户授权
 */
exports.authUserInfo = (provider = 'weixin') => {
  return new Promise((resolve, reject) => {
    uni.authorize({
      scope: 'scope.userInfo',
      success: (res) => {
        resolve(res);
      },
      fail: (err) => {
        reject(err);
      }
    });
  });
};
