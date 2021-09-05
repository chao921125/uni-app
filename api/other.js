import config from './index';
import request from '../plugins/request';

// 获取banner列表
export function getBanner(data) {
    return request({
        url: config.basePath + '/index/getbanner',
        method: 'POST',
        data: data
    });
}

/**
 * 获取统计信息
 * @param {Object} data
 * uid
 * cateid 分类id
 */
export function getIndexCount(data) {
    return request({
        url: config.basePath + '/index/getresult',
        method: 'POST',
        data: data
    });
}

/**
 * 获取排行榜
 * @param {Object} data
 * uid
 */
export function getRank(data) {
    return request({
        url: config.basePath + '/index/ranklist',
        method: 'POST',
        data: data
    });
}

/**
 * 反馈
 * @param {Object} data
 * uid
 * relation
 * content
 */
export function addFeedback(data) {
    return request({
        url: config.basePath + '/index/subcontent',
        method: 'POST',
        data: data
    });
}
