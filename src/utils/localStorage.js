import {USER_TOKEN, USER_ID} from './constant'

export function getToken() {
    return localStorage.getItem(USER_TOKEN)
}

export function setToken(token) {
    return localStorage.setItem(USER_TOKEN, token)
}

export function removeToken() {
    return localStorage.removeItem(USER_TOKEN)
}

export function getUid() {
    return localStorage.getItem(USER_ID)
}

export function setUid(uid) {
    return localStorage.setItem(USER_ID, uid)
}

export function removeUid() {
    return localStorage.removeItem(USER_ID)
}