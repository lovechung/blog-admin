import request from '../utils/request'

export function login(uname, pwd) {
    return request({
        url: '/admin/login',
        method: 'get',
        params: {
            uname,
            pwd
        }
    })
}

export function logout() {
    return request({
        url: '/admin/logout',
        method: 'get'
    })
}
