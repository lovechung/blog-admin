import * as ls from '../../utils/localStorage'
import * as types from "../types";
import {login, logout} from '../../api/loginApi'
import {getAdminInfo} from "../../api/adminApi";

const state = {
    uid: '',
    uname: '',
    nick: '',
    avatar: '',
    state: '',
    lastLoginTime: '',
    token: '',
    role: ''
};

const getters = {
    uid: state => state.uid,
    nick: state => state.nick,
    role: state => state.role
};

const actions = {
    // 登录
    Login({commit}, adminInfo) {
        const uname = adminInfo.username.trim();
        const pwd = adminInfo.password.trim();
        return new Promise((resolve, reject) => {
            login(uname, pwd).then(response => {
                const data = response.data;
                commit(types.SET_UID, data.id);
                commit(types.SET_TOKEN, data.token);
                ls.setUid(data.id);
                ls.setToken(data.token);
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 获取登录用户信息
    GetLoginInfo({commit}) {
        return new Promise((resolve, reject) => {
            getAdminInfo(ls.getUid()).then(response => {
                const data = response.data;
                commit(types.SET_UNAME, data.uname);
                commit(types.SET_NICK, data.nick);
                commit(types.SET_AVATAR, data.avatar);
                commit(types.SET_ROLE, data.role);
                commit(types.SET_LASTLOGINTIME, data.lastLoginTime);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 登出
    Logout({commit}) {
        return new Promise((resolve, reject) => {
            logout().then(() => {
                commit(types.SET_TOKEN, '');
                commit(types.SET_ROLE, '');
                ls.removeUid();
                ls.removeToken();
                resolve()
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 前端登出
    FedLogout({commit}) {
        return new Promise(resolve => {
            commit(types.SET_TOKEN, '');
            ls.removeUid();
            ls.removeToken();
            resolve()
        })
    },

    // 动态修改权限
    // ChangeRole({commit}, role) {
    //     return new Promise(resolve => {
    //         commit(types.SET_TOKEN, role);
    //         setToken(role);
    //         getAdminInfo(role).then(response => {
    //             const data = response.data;
    //             commit(types.SET_ROLE, data.role);
    //             commit(types.SET_UNAME, data.uname);
    //             commit(types.SET_AVATAR, data.avatar);
    //             commit(types.SET_LASTLOGINTIME, data.lastLoginTime);
    //             resolve()
    //         })
    //     })
    // }
};

const mutations = {
    [types.SET_UID](state, userId) {
        state.uid = userId;
    },
    [types.SET_UNAME](state, uname) {
        state.uname = uname;
    },
    [types.SET_NICK](state, nick) {
        state.nick = nick
    },
    [types.SET_AVATAR](state, avatar) {
        state.avatar = avatar
    },
    [types.SET_LASTLOGINTIME](state, lastLoginTime) {
        state.lastLoginTime = lastLoginTime
    },
    [types.SET_TOKEN](state, token) {
        state.token = token
    },
    [types.SET_ROLE](state, role) {
        state.role = role
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}