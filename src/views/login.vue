<template>
    <div class="content has-text-centered is-centered">
        <br/><br/>
        <h1 class="is-title is-bold">请登录</h1>
        <div class="columns is-vcentered">
            <div class="column is-4 is-offset-4">
                <div class="box">
                    <b-field label="用户名">
                        <b-input v-model="loginInfo.username"
                                 maxlength="10" minlength="5"
                                 placeholder="请输入用户名"
                                 required></b-input>
                    </b-field>

                    <b-field label="密码">
                        <b-input type="password" v-model="loginInfo.password"
                                 placeholder="请输入密码"
                                 password-reveal
                                 required
                                 @keyup.enter.native="login"></b-input>
                    </b-field>

                    <p class="control">
                        <b-checkbox v-model="rememberMe">Remember me</b-checkbox>
                    </p>

                    <hr>
                    <p class="control">
                        <button class="button is-primary" @click="login">登录</button>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {openMessage} from '../utils/extends'

    export default {
        data() {
            return {
                loginInfo: {
                    username: 'admin',
                    password: 'admin123'
                },
                rememberMe: false
            }
        },
        methods: {
            login() {
                this.$store.dispatch('Login', this.loginInfo).then(() => {
                    openMessage({
                        message: '登录成功！',
                        type: 'success'
                    });
                    setTimeout(() => {
                        this.$router.push('/');
                    }, 2000);
                });
            }
        }
    }
</script>

<style scoped>
    .content {
        padding: 30px;
    }
</style>