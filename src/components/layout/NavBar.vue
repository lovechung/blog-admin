<template>
    <nav class="navbar is-bold app-navbar animated" :class="{ slideInDown: show, slideOutDown: !show }">
        <div class="navbar-brand">
            <a class="navbar-item is-hidden-mobile">
                <router-link :to="'/'">
                    <img src="../../assets/iishoni.png" width="112" height="28">
                </router-link>
            </a>
            <a class="navbar-item is-hidden-tablet" @click="ToggleSidebar({opened: !sidebar.opened})">
                <b-icon icon="home" aria-hidden="true" v-show="!sidebar.hidden"></b-icon>
            </a>
            <div class="navbar-burger burger" data-target="navMenu" @click="showBurger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div class="navbar-menu" id="navMenu">
            <div class="navbar-start">
            </div>

            <div class="navbar-end">
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link" href="#">
                        {{ nick }}
                    </a>
                    <div class="navbar-dropdown is-right">
                        <router-link class="navbar-item" :to="'/me'">
                            个人中心
                        </router-link>
                        <hr class="navbar-divider">
                        <label>
                            <a class="navbar-item is-warning" href="#">
                                <span @click="logout">注销</span>
                            </a>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import {openMessage} from '../../utils/extends'

    export default {
        props: {
            show: Boolean
        },
        computed: {
            ...mapGetters([
                'sidebar',
                'nick'
            ])
        },
        methods: {
            ...mapActions([
                'ToggleSidebar'
            ]),
            logout() {
                this.$store.dispatch('Logout').then(() => {
                    openMessage({
                        message: '安全退出！',
                        type: 'success'
                    });
                    setTimeout(() => {
                        this.$router.push('/login');
                    }, 2000);
                });
            },
            showBurger() {
                const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
                if ($navbarBurgers.length > 0) {
                    $navbarBurgers.forEach(function ($el) {
                        const target = $el.dataset.target;
                        const $target = document.getElementById(target);
                        $el.classList.toggle('is-active');
                        $target.classList.toggle('is-active');
                    });
                }
            },
            hideBurger() {
                const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
                if ($navbarBurgers.length > 0) {
                    $navbarBurgers.forEach(function ($el) {
                        const target = $el.dataset.target;
                        const $target = document.getElementById(target);
                        $el.classList.remove('is-active');
                        $target.classList.remove('is-active');
                    });
                }
            }
        },
        mounted() {
            const handler = () => {
                this.hideBurger()
            };
            window.addEventListener('scroll', handler);
        }
    }
</script>

<style lang="scss" scoped>
    .app-navbar {
        position: fixed;
        min-width: 100%;
        z-index: 1024;
        box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
    }
</style>
