import {asyncRouter, constantRouter} from '../../router/router'
import {filterAsyncRouter} from '../../utils'
import * as types from '../types'

const state = {
    device: {
        isMobile: false,
        isTablet: false
    },
    sidebar: {
        opened: false,
        hidden: false
    },
    effect: {
        translate3d: true
    },
    accessRouters: constantRouter,
    addRouters: []
};

const getters = {
    device: state => state.device,
    sidebar: state => state.sidebar,
    effect: state => state.effect,
    accessRouters: state => state.accessRouters,
    addRouters: state => state.addRouters
};

const actions = {
    ToggleDevice({commit}, device) {
        commit(types.TOGGLE_DEVICE, device)
    },

    ToggleSidebar({commit}, config) {
        if (config instanceof Object) {
            commit(types.TOGGLE_SIDEBAR, config)
        }
    },

    SwitchEffect({commit}, effectItem) {
        if (effectItem) {
            commit(types.SWITCH_EFFECT, effectItem)
        }
    },

    ExpandMenu({commit}, menuItem) {
        commit(types.EXPAND_MENU, menuItem)
    },

    GenerateRoutes({commit}, role) {
        return new Promise(resolve => {
            let accessRouters;
            if (role === 'admin') {
                accessRouters = asyncRouter
            } else {
                accessRouters = filterAsyncRouter(asyncRouter, role)
            }
            commit(types.SET_ROUTERS, accessRouters);
            resolve()
        })
    }
};

const mutations = {
    [types.TOGGLE_DEVICE](state, device) {
        state.device.isMobile = device === 'mobile';
        state.device.isTablet = device === 'tablet'
    },
    [types.TOGGLE_SIDEBAR](state, config) {
        if (state.device.isMobile && config.hasOwnProperty('opened')) {
            state.sidebar.opened = config.opened
        } else {
            state.sidebar.opened = true
        }
        if (config.hasOwnProperty('hidden')) {
            state.sidebar.hidden = config.hidden
        }
    },
    [types.SWITCH_EFFECT](state, effectItem) {
        for (let name in effectItem) {
            state.effect[name] = effectItem[name]
        }
    },
    [types.EXPAND_MENU](state, menuItem) {
        if (menuItem.index > -1) {
            if (state.accessRouters[menuItem.index] && state.accessRouters[menuItem.index].meta) {
                state.accessRouters[menuItem.index].meta.expanded = menuItem.expanded
            }
        }
    },
    [types.SET_ROUTERS](state, routers) {
        state.accessRouters = constantRouter.concat(routers);
        state.addRouters = routers
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
