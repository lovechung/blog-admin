<template>
    <aside class="menu app-sidebar animated" :class="{ slideInLeft: show, slideOutLeft: !show }">
        <ul class="menu-list">
            <li v-for="(item, index) in accessRouters" v-if="!item.hidden && item.children">
                <!-- 只有一级菜单 -->
                <router-link
                        v-if="hasOneShowingChildren(item.children) && !item.children[0].children && !item.alwaysShow"
                        :to="item.path" exact>
                    <b-icon :class="['fa', item.meta.icon]" size="is-small"></b-icon>
                    {{ item.children[0].name || item.children[0].meta.title }}
                </router-link>

                <!-- 多级菜单 -->
                <router-link v-else :to="item.path" :aria-expanded="isExpanded(item)"
                             @click.native="toggle(index, item)" exact>
                    <b-icon :class="['fa', item.meta.icon]" size="is-small"></b-icon>
                    {{ item.name }}
                    <span class="icon is-small is-angle">
                        <i class="fa fa-angle-down"></i>
                    </span>
                </router-link>

                <!-- 展示次级菜单 -->
                <expanding>
                    <ul v-show="isExpanded(item)">
                        <li v-for="subItem in item.children">
                            <router-link :to="item.path + '/' + subItem.path">
                                {{ subItem.name }}
                            </router-link>
                        </li>
                    </ul>
                </expanding>
            </li>
        </ul>
    </aside>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'
    import Expanding from 'vue-bulma-expanding'

    export default {
        components: {
            Expanding
        },
        props: {
            show: Boolean
        },
        computed: {
            ...mapGetters([
                'accessRouters'
            ])
        },
        methods: {
            ...mapActions([
                'ExpandMenu'
            ]),
            toggle(index, item) {
                this.ExpandMenu({
                    index: index,
                    expanded: !item.meta.expanded
                })
            },
            isExpanded(item) {
                return item.meta.expanded
            },
            hasOneShowingChildren(children) {
                const showingChildren = children.filter(item => {
                    return !item.hidden
                });
                return showingChildren.length === 1;
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~bulma/sass/utilities/_all';

    .app-sidebar {
        position: fixed;
        /*top: 47px;*/
        left: 0;
        bottom: 0;
        padding: 20px 0 50px;
        width: 180px;
        min-width: 45px;
        max-height: 100vh;
        height: calc(100% - 45px);
        z-index: 1024 - 1;
        background: #FFF;
        box-shadow: 0 2px 3px rgba(17, 17, 17, 0.1), 0 0 0 1px rgba(17, 17, 17, 0.1);
        overflow-y: auto;
        overflow-x: hidden;

        @include mobile() {
            transform: translate3d(-180px, 0, 0);
        }

        .icon {
            vertical-align: baseline;
            &.is-angle {
                position: absolute;
                right: 10px;
                transition: transform .377s ease;
            }
        }

        .menu-label {
            padding-left: 5px;
        }

        .menu-list {
            li a {
                &[aria-expanded="true"] {
                    .is-angle {
                        transform: rotate(180deg);
                    }
                }
            }

            li a + ul {
                margin: 0 10px 0 15px;
            }
        }
    }
</style>
