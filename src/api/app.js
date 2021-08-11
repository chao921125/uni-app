import api from './index';
import request from '../plugins/request';

// jsCode
export function updateApp() {
    return request({
        url: api.basePath + '/wx/upApp',
        method: 'GET'
    });
}
