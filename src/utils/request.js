import axios from 'axios'
import store from '../store'
import NProgress from 'nprogress'
import {BASE_URL, USER_TOKEN, USER_ID} from './constant'
import {getToken, getUid} from './localStorage'
import {openMessage} from './extends'

// 创建axios实例
const service = axios.create({
    baseURL: BASE_URL, // api的base_url
    timeout: 5000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(config => {
    NProgress.start();
    if (store.getters.uid && store.getters.token) {
        config.headers[USER_ID] = getUid();
        config.headers[USER_TOKEN] = getToken()
    }
    return config
}, error => {
    console.log('requestErr: ' + error);
    Promise.reject(error)
});

// respone拦截器
service.interceptors.response.use(
    response => {
        const res = response.data;
        if (res.status === 1000) {
            NProgress.done();
            return res;
        } else {
            openMessage({
                message: res.msg,
                type: 'danger'
            });
            // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
            if (res.status === 50008 || res.status === 50012 || res.status === 50014) {
                openMessage({
                    message: res.msg,
                    type: 'warning'
                }).then(() => {
                    store.dispatch('FedLogout').then(() => {
                        location.reload(); // 重新实例化vue-router对象
                    });
                })
            }
            NProgress.done();
            return Promise.reject('error');
        }
    },
    error => {
        console.log('responseErr: ' + error);
        openMessage({
            message: error.message,
            type: 'danger'
        });
        NProgress.done();
        return Promise.reject(error)
    });

export default service;
