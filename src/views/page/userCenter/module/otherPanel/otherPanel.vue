<template>
    <div class="otherPanel-container">
        <van-cell-group>
<!--            <van-cell title="常用信息管理" is-link>-->
<!--                <van-icon slot="icon"-->
<!--                          size="20px"-->
<!--                          color="#999"-->
<!--                          name="newspaper-o">-->
<!--                </van-icon>-->
<!--            </van-cell>-->
<!--            <van-cell title="反馈与建议" is-link>-->
<!--                <van-icon slot="icon"-->
<!--                          size="20px"-->
<!--                          color="#999"-->
<!--                          name="records">-->
<!--                </van-icon>-->
<!--            </van-cell>-->
<!--            <van-cell title="消息通知" is-link>-->
<!--                <van-icon slot="icon"-->
<!--                          size="20px"-->
<!--                          color="#999"-->
<!--                          name="bell">-->
<!--                </van-icon>-->
<!--            </van-cell>-->
            <van-cell title="隐私协议" is-link url="/privacyPolicy">
                <img slot="icon" class="icon" src="../../images/yins-icon.png" alt="">
            </van-cell>
        </van-cell-group>
        <div class="version-panel">
            姑墨交通出行司机端 V{{versionName}}
        </div>
    </div>
</template>

<script>
    export default {
        name: 'votherPanel',
        data () {
            return {
                versionName: ''
            };
        },
        mounted() {
            this.getNewVersion();
        },
        methods: {
            // 获取最新版本号
            getNewVersion() {
                this.$http({
                    method: 'get',
                    url: '/lastVersion',
                    params: {
                        platform: 'android',  // 平台
                        appType: 'driver'     // 用户端： 'user' ;  司机端： 'driver'
                    }
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.versionName = res.data || '';
                    }
                })
            }
        }
    }
</script>

<style lang="scss" >
    .otherPanel-container {
        padding: 10px;
        .van-cell {
            line-height: 45px;
            .icon {
                margin-top: 11px;
                margin-right: 11px;
                width: 23px;
                height: 23px;
            }
        }
        .van-icon {
            margin-top: 11px;
            padding-right: 5px;
        }
        .version-panel {
            padding-top: 10px;
            text-align: center;
            line-height: 30px;
            font-size: 12px;
        }
    }
</style>
