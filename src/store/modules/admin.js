import * as adminApi from '../../api/adminApi'
import * as types from "../types";

const state = {
    adminList: [],
    adminTotalCount: '',
    adminInfo: {}
};

const getters = {
    adminList: state => state.adminList,
    adminTotalCount: state => state.adminTotalCount,
    adminInfo: state => state.adminInfo
};

const actions = {
    // 获取后台用户列表
    GetAdminList({commit}, params) {
        return new Promise((resolve, reject) => {
            adminApi.getAdminList(params).then(response => {
                const data = response.data;
                commit(types.GET_ADMIN_LIST, data);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    CleanAdminInfo({commit}) {
        commit(types.CLEAN_ADMIN_INFO);
    },

    // 获取后台用户信息
    GetAdminInfo({commit}, id) {
        return new Promise((resolve, reject) => {
            adminApi.getAdminInfo(id).then(response => {
                const data = response.data;
                commit(types.GET_ADMIN_INFO, data);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 保存后台用户信息
    SaveAdmin({commit}, data) {
        return new Promise((resolve, reject) => {
            adminApi.saveAdmin(data).then(response => {
                commit(types.SAVE_ADMIN);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 更新后台用户信息
    UpdateAdmin({commit}, data) {
        return new Promise((resolve, reject) => {
            adminApi.updateAdmin(data).then(response => {
                commit(types.UPDATE_ADMIN);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    },

    // 删除后台用户
    DeleteAdmin({commit}, id) {
        return new Promise((resolve, reject) => {
            adminApi.deleteAdmin(id).then(response => {
                commit(types.DELETE_ADMIN);
                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })
    }
};

const mutations = {
    [types.GET_ADMIN_LIST](state, data) {
        state.adminList = data.list;
        state.adminTotalCount = data.count;
    },
    [types.CLEAN_ADMIN_INFO](state) {
        state.adminInfo = {}
    },
    [types.GET_ADMIN_INFO](state, data) {
        state.adminInfo = data
    },
    [types.SAVE_ADMIN](state) {
    },
    [types.UPDATE_ADMIN](state) {
    },
    [types.DELETE_ADMIN](state) {
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}