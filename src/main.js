import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as filters from './filters'
import './components'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'

Vue.use(Buefy, {defaultIconPack: 'fa'});

Vue.config.devtools = true;
Vue.config.productionTip = false;

Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

new Vue({
    el: '#app',
    router,
    store,
    ...App
});