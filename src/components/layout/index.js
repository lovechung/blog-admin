import LevelBar from './LevelBar'
import SideBar from './SideBar'
import NavBar from './NavBar'
import FooterBar from './FooterBar'

export default (Vue) => {
    // 注册组件
    Vue.component('level-bar', LevelBar);
    Vue.component('nav-bar', NavBar);
    Vue.component('side-bar', SideBar);
    Vue.component('footer-bar', FooterBar);
}