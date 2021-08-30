import config from './index';
import request from '../common/request';

// 获取banner列表
export function bannerGet(data) {
    return request({
        url: config.basePath + '/index/getbanner',
        method: 'POST',
        data: data
    });
}
