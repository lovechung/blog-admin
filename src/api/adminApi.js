import request from '../utils/request'

export function getAdminList(params) {
    return request({
        url: '/user/admin/list',
        method: 'get',
        params: params
    })
}

export function getAdminInfo(id) {
    return request({
        url: '/user/admin/' + id,
        method: 'get'
    })
}

export function saveAdmin(data) {
    return request({
        url: '/user/admin',
        method: 'post',
        data: data
    })
}

export function updateAdmin(data) {
    return request({
        url: '/user/admin/' + data.id,
        method: 'put',
        data: data
    })
}

export function deleteAdmin(id) {
    return request({
        url: '/user/admin/' + id,
        method: 'delete'
    })
}