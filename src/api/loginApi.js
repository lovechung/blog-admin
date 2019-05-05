import request from '../utils/request'

export function login(uname, pwd) {
    return request({
        url: '/login',
        method: 'get',
        params: {
            uname,
            pwd
        }
    })
}

export function logout() {
    return request({
        url: '/logout',
        method: 'get'
    })
}
