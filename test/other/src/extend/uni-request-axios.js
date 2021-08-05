/*
 * @Author: 冯杰
 * @Date: 2019-08-16 14:51:52
 * @Last Modified by: 侯琳
 * @Last Modified time: 2021-02-08 11:13:40
 */
import { AXIOS_BASE } from './const-base.js';
import store from '../store';
// import Storage from '../extend/uni-storage-localstorage.js';

class Axios {
  constructor() {
    this.baseUrl = AXIOS_BASE;
    // #ifdef H5
    this.baseUrl = '/api';
    // #endif
    this.header = {
      'content-type': 'application/json',
      'accept': 'application/json'
    };
  }

  deleteData(data) {
    data && Object.keys(data).forEach(p => {
      !data[p] && delete data[p];
    });
    return data;
  }

  // axios GET
  get({ url, data, dataType = 'json', config } = {}) {
    if (store.getters.authorization) {
      this.header.authorization = store.getters.authorization;
    }
    return this.request({ url, data, method: 'GET', dataType, config });
  }

  // axios POST

  post({ url, data, dataType = 'json', config, header } = {}) {
    if (store.getters.authorization) {
      this.header.authorization = store.getters.authorization;
    }
    return this.request({
      url,
      data,
      method: 'POST',
      dataType,
      config,
      header
    });
  }

  /**
   * axios PUT 支付宝不支持
   */
  put({ url, data, dataType = 'json', config, header } = {}) {
    if (store.getters.authorization) {
      this.header.authorization = store.getters.authorization;
    }
    return this.request({ url, data, method: 'PUT', dataType, config, header });
  }

  /**
   * axios DELETE 支付宝不支持、头条不支持
   */
  delete({
    url,
    data,
    dataType = 'json',
    config
  } = {}) {
    if (store.getters.authorization) {
      this.header.authorization = store.getters.authorization;
    }
    return this.request({
      url,
      data,
      method: 'DELETE',
      dataType,
      config
    });
  }

  async request({
    url,
    data,
    method = 'GET',
    dataType = 'json',
    config,
    header
  } = {}) {
    // this.header.authorization = store.getters.token;
    // if (Storage.get('i18n.locale') === 'zh-en') {
    //   this.header.lang = 'en_us';
    // } else {
    //   this.header.lang = 'en_id';
    // }
    // Object.assign(this.header, header);
    this.deleteData(data);
    // this.deleteData(this.header);
    return new Promise((resolve, reject) => {
      uni.request({
        url: `${this.baseUrl}${url}`,
        data,
        dataType,
        header: this.header,
        method,
        success: (res) => {
          // uni.showModal({
          //   title: '提示',
          //   content: JSON.stringify(res),
          //   success: (rest) => { }
          // });
          if (res.statusCode === 200) {
            resolve(res.data);
          } else if (res.statusCode === 511 || res.statusCode === 512) {
            uni.showToast({
              title: res.data.message,
              icon: 'none'
            });
            reject(res);
          } else if (res.statusCode === 401 && res.data.code === 401.1) {
            uni.showToast({
              title: '请登录',
              icon: 'none'
            });
          }
          reject(res);
        },
        fail: (err) => {
          reject(err);
        }
      });
    });
  }
}
module.exports = new Axios();
