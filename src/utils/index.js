/**
 * 通过 meta.roles 判断是否与当前用户权限匹配
 */
export function hasPermission(role, route) {
    if (route.meta && route.meta.roles) {
        return route.meta.roles.indexOf(role) >= 0
    }
    return true
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 */
export function filterAsyncRouter(asyncRouter, role) {
    return asyncRouter.filter(route => {
        if (hasPermission(role, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, role)
            }
            return true
        }
        return false
    })
}