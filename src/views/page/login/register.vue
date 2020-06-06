<template>
    <div class="register-container">
        <div class="field-group">
            <van-field
                    v-model="formData.userName"
                    placeholder="学生姓名">
                <van-icon slot="left-icon" class-prefix="icon iconfont iconyonghu" name="extra" />
            </van-field>
            <van-field
                    v-model="formData.phone"
                    left-icon="phone"
                    placeholder="手机号码"></van-field>
            <van-field
                    v-model="sms"
                    center
                    clearable
                    placeholder="请输入短信验证码">
                <van-icon slot="left-icon" class-prefix="icon iconfont iconyanzhengma" name="extra" />
                <van-button slot="button" size="small" type="primary">发送验证码</van-button>
            </van-field>
            <van-field
                    v-model="formData.password"
                    type="password"
                    left-icon="lock"
                    placeholder="设置密码"></van-field>
            <van-field
                    v-model="formData.phone"
                    placeholder="家长姓名">
                <van-icon slot="left-icon" class-prefix="icon iconfont iconparent" name="extra" />
            </van-field>

            <div class="van-cell"></div>
        </div>
        <div>
            <van-button round type="info" size="large">注册</van-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'vregister',
        data () {
            return {
                formData: {
                    userName: '',
                    phone: '',
                    code: ''
                }
            };
        }
    }
</script>

<style lang="scss" scoped>
    .register-container {
    }
</style>
<style lang="scss">
    .register-container {
        .van-field__left-icon {
            margin-right: 15px;
        }
    }
</style>
