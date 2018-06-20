import Vue from 'vue'
import Vuex from 'vuex'

import layout from './modules/layout'
import login from './modules/login'
import admin from './modules/admin'

Vue.use(Vuex);

const state = {
    requesting: false,
    error: {}
};

const getters = {
    requesting: state => state.requesting,
    error: state => state.error
};

export default new Vuex.Store({
    state,
    getters,
    modules: {
        layout,
        login,
        admin
    }
});