import config from './index';
import request from '../plugins/request';

// jsCode
export function updateApp() {
    return request({
        url: config.basePath + '/wx/upApp',
        method: 'GET'
    });
}
