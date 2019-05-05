import request from '../utils/request'

export function getAdminList(params) {
    return request({
        url: '/user/list',
        method: 'get',
        params: params
    })
}

export function getAdminInfo(id) {
    return request({
        url: '/user/' + id,
        method: 'get'
    })
}

export function saveAdmin(data) {
    return request({
        url: '/user',
        method: 'post',
        data: data
    })
}

export function updateAdmin(data) {
    return request({
        url: '/user/' + data.id,
        method: 'put',
        data: data
    })
}

export function deleteAdmin(id) {
    return request({
        url: '/user/' + id,
        method: 'delete'
    })
}