<template>
    <div id="main">
        <nav-bar :show="true"/>
        <side-bar :show="sidebar.opened && !sidebar.hidden"/>
        <section class="app-main" :style="[hiddenSidebarStyle]">
            <div class="container is-fluid is-marginless app-content">
                <level-bar/>
                <transition mode="out-in"
                            enter-active-class="fadeIn"
                            leave-active-class="fadeOut"
                            appear>
                    <keep-alive>
                        <router-view class="animated"/>
                    </keep-alive>
                </transition>
            </div>
        </section>
        <!--<footer-bar/>-->
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        data() {
            return {
                width: 768,
                ratio: 3
            }
        },
        computed: {
            ...mapGetters([
                'sidebar'
            ]),
            hiddenSidebarStyle() {
                return this.sidebar.hidden ? {'margin-left': 0} : null
            }
        },
        methods: {
            ...mapActions([
                'ToggleDevice',
                'ToggleSidebar'
            ]),
            handleSidebar() {
                if (!document.hidden) {
                    let rect = document.body.clientWidth;
                    let isMobile = rect - this.ratio < this.width;
                    this.ToggleDevice(isMobile ? 'mobile' : 'other');
                    this.ToggleSidebar({opened: !isMobile})
                }
            }
        },
        mounted() {
            // 因为监听DOMContentLoaded失效，故加载前先执行一次
            this.handleSidebar();
            const handler = () => {
                this.handleSidebar()
            };
            window.addEventListener('scroll', handler);
            window.addEventListener('resize', handler);
            document.addEventListener('visibilitychange', handler)
        }
    }
</script>

<style lang="scss" scoped>
    @import '~bulma/sass/utilities/_all';

    .app-main {
        padding-top: 50px;
        margin-left: 180px;
        transform: translate3d(0, 0, 0);

        @include mobile() {
            margin-left: 0;
        }

    }

    .app-content {
        padding: 20px;
    }
</style>
