<template>
    <div class="login-container">
        <van-tabs class="my-tabs" v-model="activeName">
            <van-tab title="登 录" name="login">
                <div class="tab-box">
                    <vLog></vLog>
                </div>
            </van-tab>
            <!--<van-tab title="注 册" name="register">-->
                <!--<div class="tab-box">-->
                    <!--<vRegister></vRegister>-->
                <!--</div>-->
            <!--</van-tab>-->
        </van-tabs>
    </div>
</template>

<script>
    import vLog from './log';
    import vRegister from './register';
    export default {
        name: 'vLogin',
        components: {vLog, vRegister},
        data () {
            return {
                activeName: 'login'
            };
        }
    }
</script>

<style lang="scss" scoped>
    .login-container {
        position: relative;
        padding-top: 131px;
        height: 100%;
        &::before {
            display: block;
            position: absolute;
            content: " ";
            top: 0;
            left: 0;
            right: 0;
            height: 175px;
            background:linear-gradient(314deg,rgba(50,164,255,1) 0%,rgba(26,216,226,1) 100%);
        }

        .tab-box {
            padding: 67px 35px 0;
        }
    }
</style>
<style lang="scss">
    .login-container {
        .my-tabs {
            .van-tabs__wrap {
                &::after {
                    display: none;
                }
                .van-tabs__nav {
                    background-color: transparent;

                    .van-tab {
                        color: #FFF;
                        font-size: 18px;
                        font-weight:bold;
                    }

                    .van-tabs__line {
                        position: absolute;
                        bottom: 15px;
                        left: 0;
                        z-index: 1;
                        height: 3px;
                        background-color: #FFF;
                        border-radius: 3px;
                    }
                }
            }
        }
    }
</style>
