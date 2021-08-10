'use strict';

if (process.env.NODE_ENV === 'development') {
  // exports.AXIOS_BASE = 'http://172.19.8.238/api';
  exports.AXIOS_BASE = 'https://test-trace.advokate-bj.com/api';
} else {
  // 正式版
  exports.AXIOS_BASE = 'https://trace.advokate-bj.com/api';
}
