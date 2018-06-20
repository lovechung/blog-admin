import Vue from 'vue';
import VueRouter from 'vue-router';
import {constantRouter} from './router';
import store from '../store'
import {hasPermission} from '../utils'
import {getToken} from '../utils/localStorage'
import {openMessage} from '../utils/extends'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter);

// 路由配置
const router = new VueRouter({
    mode: 'history',
    linkActiveClass: 'is-active',
    scrollBehavior: () => ({y: 0}),
    routes: constantRouter
});

NProgress.configure({showSpinner: false, easing: 'ease', speed: 500, minimum: 0.1});

// 免登录白名单
const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
    NProgress.start();
    window.document.title = to.meta.title || 'Vue Admin';
    if (getToken()) { // 是否存在token
        if (to.path === '/login') {
            next('/');
            NProgress.done()
        } else {
            if (store.getters.role === '') {
                store.dispatch('GetLoginInfo').then(res => {
                    store.dispatch('GenerateRoutes', res.data.role).then(() => { // 根据roles权限生成可访问的路由表
                        router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
                        next({...to, replace: true})
                    })
                }).catch(() => {
                    store.dispatch('FedLogout').then(() => {
                        openMessage({
                            message: '验证信息失败，请重新登录',
                            type: 'warning'
                        });
                        next('/')
                    })
                })
            } else {
                if (hasPermission(store.getters.role, to)) {
                    next()
                } else {
                    next({path: '/403', replace: true, query: {noGoBack: true}})
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
            next()
        } else {
            next('/login'); // 否则全部重定向到登录页
            NProgress.done()
        }
    }
});
router.afterEach(() => {
    NProgress.done();
});

export default router;
