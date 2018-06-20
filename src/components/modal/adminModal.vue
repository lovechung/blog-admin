<template>
    <card-modal :visible="visible" :title="title" :closable="true"
                :okText="okText" :cancelText="cancelText" :cancelButtonClass="{'is-text':true}"
                @close="close" @ok="ok" @cancel="close">
        <b-field horizontal label="用户名/密码">
            <b-input v-model="user.uname" placeholder="请输入用户名" maxlength="10" minlength="5" required expanded></b-input>
            <b-input v-model="user.pwd" placeholder="请输入密码" required expanded></b-input>
        </b-field>

        <b-field horizontal label="昵称">
            <b-input v-model="user.nick" placeholder="请输入昵称" class="is-primary"></b-input>
        </b-field>

        <b-field horizontal label="角色">
            <b-input v-model="user.role" placeholder="请输入角色" class="is-primary"></b-input>
        </b-field>
    </card-modal>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {CardModal} from 'vue-bulma-modal'
    import {openMessage} from '../../utils/extends'

    export default {
        components: {
            CardModal
        },
        props: {
            visible: Boolean,
            title: String,
            isSave: Boolean
        },
        data() {
            return {
                loading: null,
                okText: '保存',
                cancelText: '取消',
                user: {}
            }
        },
        computed: {
            ...mapGetters([
                'adminInfo'
            ])
        },
        methods: {
            ok() {
                this.loading = this.$loading.open();
                this.$store.dispatch(this.isSave ? 'SaveAdmin' : 'UpdateAdmin', this.user).then(() => {
                    openMessage({
                        message: this.title + '成功！',
                        type: 'success'
                    });
                    // 关闭modal
                    setTimeout(() => this.close(), 800);
                    // 调用父组件刷新table
                    this.$emit('reload');
                });
                // 关闭loading
                setTimeout(() => this.loading.close(), 500);
            },
            close() {
                this.$emit('close')
            }
        },
        watch: {
            adminInfo(val) {
                this.user = val
            }
        }
    }
</script>
