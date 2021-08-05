class Storage {
  constructor(name) {
    this.name = 'storage';
  }
  // 设置缓存
  setItem(params) {
    let obj = {
      name: '',
      value: '',
      expires: '',
      // 记录何时将值存入缓存，毫秒值
      startTime: new Date().getTime()
    };
    let options = {};
    // 将obj和传进来的params合并
    Object.assign(options, obj, params);
    if (options.expires) {
      // 如果options.expires设置了的话
      // 以options.name为key，options为值放进去
      uni.setStorageSync(options.name, JSON.stringify(options));
    } else {
      // 如果options.expires没有设置，就判断一下value的类型
      let type = Object.prototype.toString.call(options.value);
      // 如果value是对象或者数组对象的类型，就先用JSON.stringify转一下，再存进去
      if (Object.prototype.toString.call(options.value) === '[object Object]') {
        options.value = JSON.stringify(options.value);
      }
      if (Object.prototype.toString.call(options.value) === '[object Array]') {
        options.value = JSON.stringify(options.value);
      }
      uni.setStorageSync(options.name, options.value);
    }
  }
  // 拿到缓存
  getItem(name) {
    let item = uni.getStorageSync(name);
    // 先将拿到的试着进行json转为对象的形式
    // try {
    //   item = JSON.parse(item);
    // } catch {
    //   // 如果不行就不是json的字符串，就直接返回
    //   item = item;
    // }
    if (!item) {
      return false;
    }
    item = JSON.parse(item);
    // 如果有startTime的值，说明设置了失效时间
    if (item.startTime) {
      let date = new Date().getTime();
      // 何时将值取出减去刚存入的时间，与item.expires比较，如果大于就是过期了，如果小于或等于就还没过期
      if (date - item.startTime > item.expires) {
        // 缓存过期，清除缓存，返回false
        uni.removeStorageSync(name);
        return false;
      } else {
        // 缓存未过期，返回值
        return item.value;
      }
    } else {
      // 如果没有设置失效时间，直接返回值
      return item;
    }
  }
  // 移出缓存
  removeItem(name) {
    uni.removeStorageSync(name);
  }
  // 移出全部缓存
  clear() {
    uni.clearStorageSync();
  }
}
module.exports = new Storage();
