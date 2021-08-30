import config from './index';
import request from '../plugins/request';

// jsCode
export function login(data) {
    return request({
        url: config.basePath + '/wx/login',
        method: 'POST',
        data: data
    });
}
