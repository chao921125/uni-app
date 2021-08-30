import config from './index';
import request from '../plugins/request';

/**
 * 乱序/顺序/专项刷题接口
 * @param {Object} data
 * uid
 * cateid
 * type 0乱序1顺序
 * is_refur 是否刷新默认0，1刷新
 * page 页码
 */
export function disorder(data) {
    return request({
        url: config.basePath + '/index/disorder',
        method: 'POST',
        data: data
    });
}

/**
 * 题型刷题、未作题接口
 * @param {Object} data
 * uid
 * cateid
 * type 0未作题1单选2多选3判断4填空5简答
 * page 页码
 */
export function getti(data) {
    return request({
        url: config.basePath + '/index/getti',
        method: 'POST',
        data: data
    });
}

/**
 * 获取题型接口
 * @param {Object} data
 * uid
 */
export function getType(data) {
    return request({
        url: config.basePath + '/index/get_type',
        method: 'POST',
        data: data
    });
}

/**
 * 获取分类接口
 * @param {Object} data
 * uid
 */
export function getCate(data) {
    return request({
        url: config.basePath + '/index/get_cate',
        method: 'POST',
        data: data
    });
}

/**
 * 提交答案接口（练习和试卷都是这个）
 * @param {Object} data
 * uid
 * tid 	题id
 * type 问题类型1单选2多选3判断4填空5简答
 * answer 答案 单选 答案id 多选 答案id逗号分隔 判断 答案id
 * paper_id 试卷id 没有传0
 */
export function addanswer(data) {
    return request({
        url: config.basePath + '/index/addanswer',
        method: 'POST',
        data: data
    });
}

/**
 * 全部提交接口（试卷交卷）
 * @param {Object} data
 * paper_id
 */
export function subtijiao(data) {
    return request({
        url: config.basePath + '/index/subtijiao',
        method: 'POST',
        data: data
    });
}

/**
 * 模拟考试接口
 * @param {Object} data
 * uid
 * cateid
 */
export function paper(data) {
    return request({
        url: config.basePath + '/index/paper',
        method: 'POST',
        data: data
    });
}

/**
 * 试卷详情接口
 * @param {Object} data
 * uid
 * paper_id
 */
export function paperinfo(data) {
    return request({
        url: config.basePath + '/index/paperinfo',
        method: 'POST',
        data: data
    });
}
