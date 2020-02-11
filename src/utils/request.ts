import axios from 'axios';
import * as qs from 'qs';
import { message } from 'antd';

axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
axios.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

axios.interceptors.request.use((config: any) => {
    if (config.url.indexOf('?') !== -1) {
        config.url += `&t=${new Date().getTime()}`;
    } else {
        config.url += `?t=${new Date().getTime()}`;
    }
    config.transformRequest = [(data: any) => {
        return qs.stringify(data, { allowDots: true });
    }];
    config.paramsSerializer = (params: any) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
    };
    let auth = window.localStorage.getItem('Authorization');
    if (auth) {
        config.headers.common['Authorization'] = auth;
    }
    return config;
}, (error: any) => {
    return Promise.reject(error);
});

axios.interceptors.response.use((resp: any) => {
    const { data } = resp;
    /* if (data.status.code === 1003) {
        window.location.href="/admin/login?from="+window.location.href
    } */
    if (data.status.code !== 1) {
        message.error(data.status.message);
    }
    return resp;
}, (error: any) => {
    return Promise.reject(error);
});

export default axios;
