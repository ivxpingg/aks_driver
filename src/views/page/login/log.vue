<template>
    <div class="log-container">
        <div class="field-group">
            <van-field
                    v-model="formData.userName"
                    left-icon="phone"
                    placeholder="手机号">
            </van-field>
            <van-field
                    v-model="formData.password"
                    :type="onFocus ? 'text': 'password'"
                    left-icon="lock"
                    @focus="pwdFocus"
                    @blur="onFocus = false"
                    placeholder="密码"></van-field>
            <!--<van-field-->
                    <!--v-model="formData.code"-->
                    <!--center-->
                    <!--clearable-->
                    <!--left-icon="lock"-->
                    <!--placeholder="请输入短信验证码">-->
                <!--<van-button slot="button"-->
                            <!--size="small"-->
                            <!--type="primary"-->
                            <!--:disabled="second !== 0"-->
                            <!--@click="sendCode">{{btnText}}</van-button>-->
            <!--</van-field>-->
        </div>
        <div>
            <van-button round type="info"
                        color="rgb(26,216,226)"
                        size="large"
                        @click="login">登 录</van-button>

            <van-button round type="info"
                        color="rgb(26,216,226)"
                        size="large"
                        @click="com_goto('register')" style="margin-top: 20px;">注 册</van-button>
        </div>

    </div>
</template>

<script>
    import comMixin from '../../../lib/mixins/comMixin';
    import { mapActions } from 'vuex';
    import MD5 from 'md5';
    import Config from '../../../config/index';
    export default {
        name: 'vlog',
        mixins: [comMixin],
        computed: {
            btnText() {
                if (this.second === 0) {
                    return '发送验证码';
                }
                else {
                    return `发送验证码(${this.second}s)`;
                }
            }
        },
        data () {
            return {
                onFocus: false,
                loading: false,
                formData: {
                    userName: '', // 98765432101
                    password: '',
                    code: '11'
                },
                // 计时器
                timer: null,
                second: 0  // 倒数几秒后可以重新发送短信验证码
            };
        },
        methods: {
            // 密码框获取焦点
            pwdFocus() {
                this.onFocus = true;
            },
            ...mapActions([
                'handleLogin',
                'getMenuList'
            ]),
            sendCode() {
                this.second = 60;
                this.timer = setInterval(() => {
                    --this.second;
                    if (this.second === 0) {
                        clearInterval(this.timer);
                    }
                }, 1000);
            },
            validate() {
                if (this.formData.userName.trim() === '') {
                    this.$toast('请输入手机号');
                    return false;
                }

                if (this.formData.code.trim() === '') {
                    this.$toast('请输入短信验证码');
                    return false;
                }
                return true;
            },
            login() {
                // this.validate();
                // this.$router.push({name: 'home'});

                if (this.validate()) {
                    this.loading = true;
                    let pwd = MD5(this.formData.password + Config.passwordKey);
                    this.handleLogin({
                        loginName: this.formData.userName,
                        password: pwd }).then(res => {
                        if (this.$route.query.redirect) {
                            this.$router.push(this.$route.query.redirect);
                        } else {
                            this.$router.push({name: 'home'});
                        }
                    }).catch(() => {
                        this.loading = false;
                    });
                }
            },
            register() {}
        }
    }
</script>

<style lang="scss" scoped>
    .log-container {
        .field-group {
            .van-cell {
                margin-bottom: 20px;
            }
        }

        .btn-text {
            text-align: right;
            padding-bottom: 30px;
            .ivu-btn-text {
                color: #2d8cf0;
                &:active, &:focus, &:hover {
                    border-radius: 0;
                    box-shadow: none;
                }
            }
        }
    }
</style>

<style lang="scss">
    .log-container {
        .van-field__left-icon {
            margin-right: 15px;
        }
    }
</style>
