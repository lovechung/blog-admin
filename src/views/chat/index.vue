<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent">
            <div class="tile is-child box">
                <div class="columns is-mobile">
                    <div class="column">
                        <p class="title is-6">当前在线人数: {{userCount}} 人</p>
                    </div>
                </div>
                <div class="columns is-mobile">
                    <div class="column">
                        <div class="chat">
                            <ul>
                                <li v-for="item in content">
                                    <!--<p class="chat-time">{{item.time}}</p>-->
                                    <p class="chat-content">{{item.nick}} : {{item.msg}}</p>
                                </li>
                            </ul>
                        </div>
                        <div class="send">
                            <div class="arrow"></div>
                        </div>
                    </div>
                </div>
                <div class="columns is-mobile">
                    <div class="column">
                        <b-field>
                            <b-input type="textarea" placeholder="请按 ctrl+回车 发送消息" rows="3"
                                     class="is-primary" v-model="msg" @keyup.ctrl.enter.native="sendMsg"></b-input>
                        </b-field>
                        <a class="button is-primary" @click="sendMsg">发送</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {WEBSOCKET_URL} from '../../utils/constant'
    import {openMessage} from '../../utils/extends'

    export default {
        data() {
            return {
                content: [],
                msg: '',
                isAuth: false,
                userCount: 0
            }
        },
        methods: {
            initWebSocket() {
                this.websock = new WebSocket(WEBSOCKET_URL);
                this.websock.onopen = this.onopen;
                this.websock.onclose = this.onclose;
                this.websock.onmessage = this.onmessage;
            },
            onmessage(e) {
                const data = eval("(" + e.data + ")");
                switch (data.uri) {
                    case 1:
                    case 2: // 心跳
                        this.send(this.isAuth, {code: 10002});
                        break;
                    case 3: // 系统消息
                        this.sysInvoke(data);
                        break;
                    case 4: // 错误消息
                        this.closeInvoke();
                        break;
                    case 5: // 普通消息
                        this.broadcastInvoke(data);
                        break;
                }
            },
            onopen() {
                console.log("connection success!");
                const obj = {
                    code: 10000,
                    uid: this.uid,
                    nick: this.nick
                };
                this.send(true, obj)
            },
            onclose() {
                console.log("connection closed");
                this.closeInvoke();
            },
            send(auth, msg) { // 发送消息
                if (this.websock.readyState === WebSocket.OPEN || auth) {
                    this.websock.send(JSON.stringify(msg));
                } else {
                    openMessage({
                        message: '连接已断开，请重新登录！',
                        type: 'danger'
                    })
                }
            },
            closeInvoke() { // 关闭时调用
                this.websock = null;
                this.isAuth = false;
                this.userCount = 0;
                openMessage({
                    message: '获取数据失败，网络连接异常！',
                    type: 'danger'
                })
            },
            sysInvoke(data) {
                switch (data.extend.code) {
                    case 20001: // 在线用户数
                        this.userCount = data.extend.msg;
                        break;
                    case 20002: // 认证结果
                        this.isAuth = data.extend.msg;
                        break;
                    case 20003: // 系统消息
                        break;
                }
            },
            broadcastInvoke(data) {
                const obj = {
                    nick: data.extend.nick,
                    msg: data.body,
                    time: data.extend.time
                };
                this.content.push(obj);
                // if (obj.nick === 'admin') {
                //     openNotification({
                //         title: obj.nick + ':',
                //         message: obj.msg,
                //         type: 'success'
                //     })
                // }
            },
            sendMsg() {
                const obj = {
                    code: 10003,
                    msg: this.msg
                };
                this.send(true, obj);
                this.msg = ''
            }
        },
        computed: {
            ...mapGetters([
                'uid',
                'nick'
            ])
        },
        created() {
            this.initWebSocket()
        }
    }
</script>

<style lang="scss" scoped>
    .chat {
        height: 350px;
        overflow-y: auto;

        .chat-time {
            text-align: center;
            font-size: small
        }

        .chat-content {

        }
    }
</style>