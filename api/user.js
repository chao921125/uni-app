import config from './index';
import request from '../plugins/request';

/**
 * 登录
 * @param {Object} data
 * name password
 */
export function login(data) {
    return request({
        url: config.basePath + '/index/login',
        method: 'POST',
        data: data
    });
}

/**
 * 我的成绩接口
 * @param {Object} data
 * uid
 * cateid 分类id
 */
export function myresult(data) {
    return request({
        url: config.basePath + '/index/myresult',
        method: 'POST',
        data: data
    });
}
