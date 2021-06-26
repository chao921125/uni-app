import api from './index';
import request from '../plugins/request';

// jsCode
export function login(data) {
    console.log(data, api.basePath);
    return request({
        url: api.basePath + '/wx/login',
        method: 'POST',
        data: data
    });
}
