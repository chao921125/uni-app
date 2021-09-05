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
 * 用户信息
 * @param {Object} data
 * uid
 */
export function getUserInfo(data) {
    return request({
        url: config.basePath + '/index/mycenter',
        method: 'POST',
        data: data
    });
}

/**
 * 用户信息修改
 * @param {Object} data
 * uid
 */
export function updateUserInfo(data) {
    return request({
        url: config.basePath + '/index/putset',
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
export function getUserScore(data) {
    return request({
        url: config.basePath + '/index/myresult',
        method: 'POST',
        data: data
    });
}

/**
 * 我的错题数据
 * @param {Object} data
 * uid
 */
export function getWrongNum(data) {
    return request({
        url: config.basePath + '/index/mywrongnum',
        method: 'POST',
        data: data
    });
}
