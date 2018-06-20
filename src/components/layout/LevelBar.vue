<template>
    <nav class="level app-levelbar">
        <div class="level-left">
            <div class="level-item">
                <h3 class="title is-5">
                    <strong>{{ name }}</strong>
                </h3>
            </div>
        </div>

        <div class="level-right is-hidden-mobile">
            <breadcrumb :list="list"/>
        </div>
    </nav>
</template>

<script>
    import Breadcrumb from 'vue-bulma-breadcrumb'

    export default {
        data() {
            return {
                list: null
            }
        },
        components: {
            Breadcrumb
        },
        created() {
            this.getList()
        },
        computed: {
            name() {
                return this.$route.name
            }
        },
        methods: {
            getList() {
                let matched = this.$route.matched.filter(item => item.name);
                let first = matched[0];
                if (first && (first.name !== 'Home' || first.path !== '')) {
                    matched = [{name: 'Home', path: '/'}].concat(matched)
                }
                this.list = matched
            }
        },
        watch: {
            $route() {
                this.getList()
            }
        }

    }
</script>
