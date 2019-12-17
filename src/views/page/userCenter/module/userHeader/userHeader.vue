<template>
    <div class="userHeader-container">
        <div class="header-info">
            <img src="/img/user/head-img.jpg" alt="">
            <div>
                <div class="name">{{$store.state.user.userName}}</div>
                <div class="start">
                    <span>服务星级：</span>
                    <van-rate v-model="starNum" readonly size="16px" />
                </div>
                <div class="count">
                    <span>总订单数：</span>
                    <span>{{orderNum}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'vuserHeader',
        data () {
            return {
                starNum: 5,
                orderNum: 0
            };
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                this.$http({
                    method: 'get',
                    url: '/user/query'
                }).then((res) => {
                    if (res.code === 'SUCCESS') {
                        this.starNum = res.data.starNum || 0;
                        this.orderNum = res.data.orderNum || 0;
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .userHeader-container {
        position: relative;
        height: 150px;
        overflow: hidden;

        &:before {
            position: absolute;
            display: block;
            content: " ";
            width: 1000px;
            height: 1000px;
            background-color: #1AD8E2;
            border-radius: 50%;
            top: -1000px;
            left: -500px;
            margin-top: 140px;
            margin-left: 50%;
        }

        .header-info {
            position: relative;
            display: flex;
            padding: 26px;
            > img {
                height: 60px;
                width: 60px;
                border-radius: 50%;
            }
            .name {
                padding-left: 10px;
                font-size: 16px;
                color: #FFF;
                line-height: 40px;
                font-weight: 700;
            }
            .start, .count {
                padding-left: 10px;
                font-size: 12px;
                color: #FFF;
                line-height: 26px;
            }
        }
    }
</style>