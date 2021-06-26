import { basePath } from './index';
import request from '../plugins/request';

// jsCode
export function login(data) {
    console.log(data, basePath);
    return request({
        url: basePath + '/wx/login',
        method: 'POST',
        data: data
    });
}
