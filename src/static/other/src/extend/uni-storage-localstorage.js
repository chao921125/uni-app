class LocalStorage {
  set(key, data) {
    // #ifdef H5
    sessionStorage.setItem(key, JSON.stringify(data));
    // #endif
    return uni.setStorageSync(key, data);
  }
  get(key, defaultValue) {
    let value = uni.getStorageSync(key);
    // #ifdef H5
    let sessionValue = sessionStorage.getItem(key);
    value = JSON.parse(sessionValue) || uni.getStorageSync(key);
    // #endif
    return value || defaultValue;
  }
  getInfo() {
    return uni.getStorageInfoSync();
  }
  remove(key) {
    // #ifdef H5
    sessionStorage.removeItem(key);
    // #endif
    return uni.removeStorageSync(key);
  }
  clear(key) {
    // #ifdef H5
    sessionStorage.clear();
    // #endif
    return uni.clearStorageSync();
  }
}
module.exports = new LocalStorage();
