import Main from '../views/main';

// 懒加载
const Login = () => import('../views/login');
const Page403 = () => import('../views/error/403');
const Page404 = () => import('../views/error/404');
const Page500 = () => import('../views/error/500');
const Home = () => import('../views/home');
const Admin = () => import('../views/system/admin');
const Demo = () => import('../views/test/demo');
const Chat = () => import('../views/chat');
const Me = () => import('../views/me');

export const constantRouter = [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: '登录'
        },
        hidden: true,
        component: Login
    },
    {
        path: '/403',
        name: 'error-403',
        meta: {
            title: '权限不足'
        },
        hidden: true,
        component: Page403
    },
    {
        path: '/404',
        name: 'error-404',
        meta: {
            title: '页面不存在'
        },
        hidden: true,
        component: Page404
    },
    {
        path: '/500',
        name: 'error-500',
        meta: {
            title: '服务端错误'
        },
        hidden: true,
        component: Page500
    }
];

export const asyncRouter = [
    {
        path: '/',
        redirect: '/home',
        meta: {
            icon: 'fa-tachometer',
            expanded: false
        },
        component: Main,
        children: [
            {
                path: 'home',
                name: '首页',
                meta: {
                    title: '首页'
                },
                component: Home
            }
        ]
    },
    {
        path: '/system',
        name: '系统管理',
        meta: {
            icon: 'fa-table',
            expanded: false,
            roles: ['admin']
        },
        alwaysShow: true,
        component: Main,
        children: [
            {
                path: 'admin',
                name: '管理员列表',
                meta: {
                    title: '管理员列表'
                },
                component: Admin
            }
        ]
    },
    {
        path: '/test',
        name: 'test',
        meta: {
            icon: 'fa-table',
            expanded: false
        },
        component: Main,
        children: [
            {
                path: 'demo1',
                name: 'demo1',
                meta: {
                    title: 'demo1'
                },
                component: Demo
            },
            {
                path: 'demo2',
                name: 'demo2',
                meta: {
                    title: 'demo2'
                },
                component: Demo
            }
        ]
    },
    {
        path: '/chat',
        meta: {
            icon: 'fa-comments',
            expanded: false
        },
        component: Main,
        children: [
            {
                path: '',
                name: '聊天室',
                meta: {
                    title: '聊天室'
                },
                component: Chat
            }
        ]
    },
    {
        path: '/me',
        component: Me,
        name: '个人中心',
        meta: {
            title: '个人中心'
        }
    },
    {
        path: '*',
        redirect: '/404',
        hidden: true
    }
];
